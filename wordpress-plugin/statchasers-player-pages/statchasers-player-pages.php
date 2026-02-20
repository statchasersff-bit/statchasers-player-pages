<?php
/**
 * Plugin Name: StatChasers Player Pages
 * Plugin URI:  https://statchasers.com
 * Description: Programmatic SEO-friendly NFL player pages powered by the Sleeper API. Adds /nfl/players/ directory and /nfl/players/{slug}/ profile pages using your theme's header/footer.
 * Version:     0.3.2
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
define( 'SC_VERSION', '0.3.2' );
define( 'SC_CRON_HOOK', 'sc_daily_player_refresh' );

require_once SC_PLUGIN_DIR . 'includes/cache.php';
require_once SC_PLUGIN_DIR . 'includes/rewrite.php';
require_once SC_PLUGIN_DIR . 'includes/rest.php';
require_once SC_PLUGIN_DIR . 'includes/seo.php';
require_once SC_PLUGIN_DIR . 'includes/sitemap.php';
require_once SC_PLUGIN_DIR . 'includes/admin-page.php';

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
 * Enqueue plugin assets – remote (GitHub Pages) with local fallback.
 */
add_action('wp_enqueue_scripts', function () {
    if (!function_exists('sc_detect_route') || !sc_detect_route()) return;

    $remote_base = 'https://statchasersff-bit.github.io/statchasers-playerpages/';
    $manifest_url = $remote_base . 'manifest.json';

    $cache_key = 'sc_players_remote_manifest_v1';
    $manifest = get_transient($cache_key);

    if (!$manifest) {
        $res = wp_remote_get($manifest_url, ['timeout' => 3]);
        if (!is_wp_error($res) && wp_remote_retrieve_response_code($res) === 200) {
            $json = json_decode(wp_remote_retrieve_body($res), true);
            if (is_array($json)) {
                $manifest = $json;
                set_transient($cache_key, $manifest, 10 * MINUTE_IN_SECONDS);
            }
        }
    }

    $use_remote = is_array($manifest);

    if ($use_remote) {
        $entry = $manifest['index.html'] ?? null;
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

            wp_localize_script('sc-players-js', 'scPlayersConfig', [
                'restUrl'    => rest_url('statchasers/v1/players'),
                'baseUrl'    => home_url('/nfl/players/'),
                'indexedUrl' => rest_url('statchasers/v1/indexed-players'),
            ]);

            return;
        }
    }

    $js_path = plugin_dir_path(__FILE__) . 'assets/players.js';
    $ver = file_exists($js_path) ? filemtime($js_path) : (defined('SC_VERSION') ? SC_VERSION : '1.0.0');

    wp_enqueue_script('sc-players-js', plugin_dir_url(__FILE__) . 'assets/players.js', [], $ver, true);

    wp_localize_script('sc-players-js', 'scPlayersConfig', [
        'restUrl'    => rest_url('statchasers/v1/players'),
        'baseUrl'    => home_url('/nfl/players/'),
        'indexedUrl' => rest_url('statchasers/v1/indexed-players'),
    ]);
});

add_action( 'admin_notices', function() {
    if ( ! current_user_can( 'manage_options' ) ) return;
    $container_id = (int) get_option( 'scpp_container_page_id', 0 );
    if ( $container_id ) return;
    echo '<div class="notice notice-warning"><p>';
    echo '<strong>StatChasers Player Pages:</strong> No container page is set. ';
    echo 'Player pages will return 404 until you <a href="' . esc_url( admin_url( 'tools.php?page=statchasers-players' ) ) . '">configure a container page</a>.';
    echo '</p></div>';
} );
