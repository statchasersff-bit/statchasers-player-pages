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
 * Enqueue plugin assets with filemtime cache-busting.
 */
add_action( 'wp_enqueue_scripts', function() {
    $r = function_exists( 'sc_detect_route' ) ? sc_detect_route() : null;
    if ( ! $r ) return;

    $js_file = SC_PLUGIN_DIR . 'assets/players.js';
    $js_ver  = file_exists( $js_file ) ? filemtime( $js_file ) : SC_VERSION;

    wp_enqueue_script(
        'sc-players-js',
        SC_PLUGIN_URL . 'assets/players.js',
        array(),
        $js_ver,
        true
    );
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
