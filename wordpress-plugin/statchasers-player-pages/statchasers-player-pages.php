<?php
/**
 * Plugin Name: StatChasers Player Pages
 * Plugin URI:  https://statchasers.com
 * Description: Programmatic SEO-friendly NFL player pages powered by the Sleeper API. Adds /nfl/players/ directory and /nfl/players/{slug}/ profile pages using your theme's header/footer.
 * Version:     2.0.0
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
