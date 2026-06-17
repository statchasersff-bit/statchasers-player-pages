<?php
/**
 * Plugin Name: StatChasers Player Pages
 * Plugin URI:  https://statchasers.com
 * Description: Programmatic SEO-friendly NFL player pages powered by the Sleeper API. Adds /nfl/players/ directory and /nfl/players/{slug}/ profile pages using your theme's header/footer.
 * Version:     0.6.15
 * Author:      StatChasers
 * Author URI:  https://statchasers.com
 * License:     GPL-2.0+
 * Text Domain: statchasers
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'SC_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'SC_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'SC_VERSION', '0.6.15' );
define( 'SC_CRON_HOOK', 'sc_daily_player_refresh' );

require_once SC_PLUGIN_DIR . 'includes/cache.php';
require_once SC_PLUGIN_DIR . 'includes/gamelogs.php';
require_once SC_PLUGIN_DIR . 'includes/rewrite.php';
require_once SC_PLUGIN_DIR . 'includes/rest.php';
require_once SC_PLUGIN_DIR . 'includes/seo.php';
require_once SC_PLUGIN_DIR . 'includes/sitemap.php';
require_once SC_PLUGIN_DIR . 'includes/admin-page.php';
require_once SC_PLUGIN_DIR . 'includes/autolink.php';

register_activation_hook( __FILE__, 'sc_activate' );
register_deactivation_hook( __FILE__, 'sc_deactivate' );

function sc_activate() {
    sc_register_rewrite_rules();
    flush_rewrite_rules();
    if ( ! wp_next_scheduled( SC_CRON_HOOK ) ) {
        wp_schedule_event( time(), 'daily', SC_CRON_HOOK );
    }
    if ( empty( sc_get_players() ) ) {
        sc_refresh_players_data();
    }
}

function sc_deactivate() {
    flush_rewrite_rules();
    wp_clear_scheduled_hook( SC_CRON_HOOK );
}

add_action( SC_CRON_HOOK, 'sc_refresh_players_data' );

/**
 * Re-seed bundled data into wp-uploads whenever the plugin version changes.
 *
 * Supplemental data (bye weeks, game scores, bios, dynasty) and the 2026
 * outlook are served from wp-uploads and were previously only seeded on
 * activation or via manual admin buttons — so uploading a new plugin build
 * left that data stale (e.g. the 2026 outlook showed the old copy). This runs
 * the copy once per version bump. (Advanced stats, injuries and production are
 * read straight from the bundled plugin dir, so they always track the zip.)
 */
add_action( 'init', 'sc_maybe_reseed_bundled_data' );
function sc_maybe_reseed_bundled_data() {
    if ( get_option( 'sc_seeded_version' ) === SC_VERSION ) return;
    if ( function_exists( 'sc_fetch_and_save_supplemental_data' ) ) sc_fetch_and_save_supplemental_data();
    if ( function_exists( 'sc_fetch_and_save_fantasy_outlook_2026' ) ) sc_fetch_and_save_fantasy_outlook_2026();
    update_option( 'sc_seeded_version', SC_VERSION );
}

/**
 * Fetch a remote JSON file with transient caching. Returns parsed array or null.
 */
function sc_fetch_remote_json( $url, $cache_key, $ttl = HOUR_IN_SECONDS ) {
    $cached = get_transient( $cache_key );
    if ( $cached !== false ) return $cached;

    $res = wp_remote_get( $url, [ 'timeout' => 8 ] );
    if ( is_wp_error( $res ) || wp_remote_retrieve_response_code( $res ) !== 200 ) return null;

    $data = json_decode( wp_remote_retrieve_body( $res ), true );
    if ( ! is_array( $data ) ) return null;

    set_transient( $cache_key, $data, $ttl );
    return $data;
}

/**
 * Enqueue plugin assets – remote (GitHub Pages) with local fallback.
 * On the index page, pre-fetches player JSON server-side and injects it
 * so React can render instantly with no client-side loading state.
 */
add_action('wp_enqueue_scripts', function () {
    if (is_singular('post')) {
        wp_add_inline_style('wp-block-library', '
            .sc-player-link { color: #0b3a7a; text-decoration: none; font-weight: 600; border-bottom: 1px solid rgba(212,175,55,.65); transition: all .18s ease; }
            .sc-player-link:hover { color: #082a59; border-bottom-color: #d4af37; }
        ');
    }

    if (!function_exists('sc_detect_route') || !sc_detect_route()) return;
    // Don't load the tool's assets inside a page builder — let Divi edit cleanly.
    if (function_exists('sc_is_builder_request') && sc_is_builder_request()) return;

    wp_enqueue_style('sc-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap', [], null);

    /* Preload from local data — no external dependencies needed. */
    $preloaded_indexed = null;
    $preloaded_players = null;

    if ( function_exists('sc_is_players_index') && sc_is_players_index() ) {
        /* Indexed data for the directory listing. */
        $slugs  = function_exists('sc_get_indexed_slugs')   ? sc_get_indexed_slugs()   : [];
        $byTeam = function_exists('sc_get_indexed_by_team') ? sc_get_indexed_by_team() : [];
        if ( ! empty( $slugs ) || ! empty( $byTeam ) ) {
            $preloaded_indexed = [ 'slugs' => $slugs, 'byTeam' => $byTeam ];
        }

        /* Full player list for instant local search (no API round-trip). */
        $all_players = function_exists('sc_get_players') ? sc_get_players() : [];
        if ( ! empty( $all_players ) ) {
            $preloaded_players = array_values( array_map( function( $p ) {
                return [
                    'id'       => $p['id'],
                    'name'     => $p['name'],
                    'slug'     => $p['slug'],
                    'team'     => isset( $p['team'] )     ? $p['team']     : '',
                    'position' => isset( $p['position'] ) ? $p['position'] : '',
                ];
            }, $all_players ) );
        }
    }

    $config = [
        'restUrl'    => rest_url('statchasers/v1/players'),
        'restBase'   => untrailingslashit( rest_url('statchasers/v1') ),
        'baseUrl'    => home_url('/nfl/players/'),
        'indexedUrl' => rest_url('statchasers/v1/indexed-players'),
        'apiBaseUrl' => '',
    ];
    if ( $preloaded_indexed !== null ) $config['preloadedIndexed'] = $preloaded_indexed;
    if ( $preloaded_players !== null ) $config['preloadedPlayers'] = $preloaded_players;

    $js_path  = plugin_dir_path(__FILE__) . 'assets/players.js';
    $css_path = plugin_dir_path(__FILE__) . 'assets/players.css';
    $ver      = file_exists($js_path) ? filemtime($js_path) : SC_VERSION;

    if ( file_exists($css_path) ) {
        wp_enqueue_style('sc-players-css', plugin_dir_url(__FILE__) . 'assets/players.css', [], $ver);
    }

    wp_enqueue_script('sc-players-js', plugin_dir_url(__FILE__) . 'assets/players.js', [], $ver, true);
    wp_localize_script('sc-players-js', 'scPlayersConfig', $config);
});

add_filter('script_loader_tag', function ($tag, $handle) {
    if ($handle !== 'sc-players-js') return $tag;

    $tag = preg_replace('/\s*data-rocket-[a-z-]+="[^"]*"/', '', $tag);
    $tag = preg_replace('/\s*data-rocket-[a-z-]+\b/', '', $tag);
    $tag = str_replace(' defer>', '>', $tag);
    $tag = str_replace(' defer ', ' ', $tag);

    $tag = preg_replace('/type="[^"]*"/', '', $tag);
    $tag = str_replace('<script ', '<script type="module" ', $tag);

    return $tag;
}, 9999, 2);

/**
 * WP Rocket compatibility.
 *
 * Our CSS/JS are already built/minified, and our active-state classes
 * (e.g. .sc-segment__btn--active, .sc-filter-pill--active) are toggled by
 * React at RUNTIME — they aren't in the page's static HTML. WP Rocket's
 * Combine/Minify can serve a stale merged file, and "Remove Unused CSS"
 * (RUCSS) strips selectors it can't find in the HTML, which removes our
 * active-pill styling and leaves toggles looking like plain text.
 *
 * Exclude our assets from optimization and safelist our class namespace so
 * the real, version-busted files always load intact. All no-ops without
 * WP Rocket installed.
 */
add_filter( 'rocket_exclude_css', function ( $excluded ) {
    $excluded[] = 'wp-content/plugins/statchasers-player-pages/assets/players.css';
    return $excluded;
} );
add_filter( 'rocket_exclude_js', function ( $excluded ) {
    $excluded[] = 'wp-content/plugins/statchasers-player-pages/assets/players.js';
    return $excluded;
} );
add_filter( 'rocket_rucss_safelist', function ( $safelist ) {
    foreach ( array( 'scpp-root', 'sc-filter-pill', 'sc-segment', 'sc-finish2', 'sc-peer', 'sc-pill' ) as $keep ) {
        $safelist[] = $keep;
    }
    return $safelist;
} );
/* Don't let WP Rocket delay-execute our module script (breaks the React mount). */
add_filter( 'rocket_delay_js_exclusions', function ( $excluded ) {
    $excluded[] = 'statchasers-player-pages/assets/players.js';
    return $excluded;
} );

add_action( 'admin_notices', function() {
    if ( ! current_user_can( 'manage_options' ) ) return;
    $container_id = (int) get_option( 'scpp_container_page_id', 0 );
    if ( $container_id ) return;
    echo '<div class="notice notice-warning"><p>';
    echo '<strong>StatChasers Player Pages:</strong> No container page is set. ';
    echo 'Player pages will return 404 until you <a href="' . esc_url( admin_url( 'tools.php?page=statchasers-players' ) ) . '">configure a container page</a>.';
    echo '</p></div>';
} );
