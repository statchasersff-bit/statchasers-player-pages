<?php
/**
 * Plugin Name: StatChasers Player Pages
 * Plugin URI:  https://statchasers.com
 * Description: Programmatic SEO-friendly NFL player pages powered by the Sleeper API. Adds /nfl/players/ directory and /nfl/players/{slug}/ profile pages using your theme's header/footer.
 * Version:     0.6.2
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
define( 'SC_VERSION', '0.6.2' );
define( 'SC_CRON_HOOK', 'sc_daily_player_refresh' );

require_once SC_PLUGIN_DIR . 'includes/cache.php';
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

    wp_enqueue_style('sc-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap', [], null);

    $remote_base = 'https://statchasersff-bit.github.io/statchasers-player-pages/';
    $manifest_url = $remote_base . '.vite/manifest.json';
    $api_base_url = defined('SC_API_BASE_URL') ? SC_API_BASE_URL : '';

    $manifest = sc_fetch_remote_json( $manifest_url, 'sc_players_remote_manifest_v3', 10 * MINUTE_IN_SECONDS );
    $use_remote = is_array($manifest);

    // Pre-load player data server-side on the index page so React renders instantly.
    $preloaded_indexed = null;
    $preloaded_players = null;
    if ( function_exists('sc_is_players_index') && sc_is_players_index() ) {
        $preloaded_indexed = sc_fetch_remote_json(
            $remote_base . 'data/indexed-players.json',
            'sc_preload_indexed_v1',
            6 * HOUR_IN_SECONDS
        );
        $preloaded_players = sc_fetch_remote_json(
            $remote_base . 'data/players.json',
            'sc_preload_players_v1',
            6 * HOUR_IN_SECONDS
        );
    }

    $config = [
        'restUrl'    => rest_url('statchasers/v1/players'),
        'baseUrl'    => home_url('/nfl/players/'),
        'indexedUrl' => rest_url('statchasers/v1/indexed-players'),
        'apiBaseUrl' => $api_base_url,
    ];
    if ( $preloaded_indexed !== null ) $config['preloadedIndexed'] = $preloaded_indexed;
    if ( $preloaded_players !== null ) $config['preloadedPlayers'] = $preloaded_players;

    if ($use_remote) {
        $entry = $manifest['src/wp-entry.tsx'] ?? $manifest['index.html'] ?? null;
        if (!$entry || empty($entry['file'])) {
            $use_remote = false;
        } else {
            $js_file = $entry['file'];
            $css_files = $entry['css'] ?? [];
            $ver = md5($js_file);

            foreach ($css_files as $i => $css) {
                wp_enqueue_style("sc-players-css-remote-$i", $remote_base . $css, [], $ver);
            }

            wp_enqueue_script('sc-players-js', $remote_base . $js_file, [], $ver, true);
            wp_localize_script('sc-players-js', 'scPlayersConfig', $config);
            return;
        }
    }

    $js_path = plugin_dir_path(__FILE__) . 'assets/players.js';
    $ver = file_exists($js_path) ? filemtime($js_path) : SC_VERSION;

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

add_action( 'admin_notices', function() {
    if ( ! current_user_can( 'manage_options' ) ) return;
    $container_id = (int) get_option( 'scpp_container_page_id', 0 );
    if ( $container_id ) return;
    echo '<div class="notice notice-warning"><p>';
    echo '<strong>StatChasers Player Pages:</strong> No container page is set. ';
    echo 'Player pages will return 404 until you <a href="' . esc_url( admin_url( 'tools.php?page=statchasers-players' ) ) . '">configure a container page</a>.';
    echo '</p></div>';
} );
