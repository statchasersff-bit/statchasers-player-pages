<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'admin_menu', 'sc_add_admin_page' );
add_action( 'admin_init', 'sc_handle_admin_actions' );

function sc_add_admin_page() {
    add_management_page(
        'StatChasers Players',
        'StatChasers Players',
        'manage_options',
        'statchasers-players',
        'sc_render_admin_page'
    );
}

function sc_handle_admin_actions() {
    if ( ! isset( $_POST['sc_refresh_players'] ) ) return;
    if ( ! check_admin_referer( 'sc_refresh_players_nonce', 'sc_nonce' ) ) return;
    if ( ! current_user_can( 'manage_options' ) ) return;

    $result = sc_refresh_players_data();
    if ( $result ) {
        add_settings_error( 'statchasers', 'refresh_success', 'Player index refreshed successfully!', 'success' );
    } else {
        add_settings_error( 'statchasers', 'refresh_error', 'Failed to refresh player index. Check the error log.', 'error' );
    }
}

function sc_render_admin_page() {
    $last_refresh = get_option( SC_LAST_REFRESH_OPTION, 'Never' );
    $player_count = get_option( SC_PLAYERS_COUNT_OPTION, 0 );
    $next_cron = wp_next_scheduled( SC_CRON_HOOK );
    ?>
    <div class="wrap">
        <h1>StatChasers Player Pages</h1>

        <?php settings_errors( 'statchasers' ); ?>

        <div class="card" style="max-width: 600px; padding: 20px;">
            <h2>Player Index Status</h2>
            <table class="form-table">
                <tr>
                    <th>Last Refresh</th>
                    <td><strong><?php echo esc_html( $last_refresh ); ?></strong></td>
                </tr>
                <tr>
                    <th>Total Players</th>
                    <td><strong><?php echo esc_html( number_format( $player_count ) ); ?></strong></td>
                </tr>
                <tr>
                    <th>Auto-Refresh</th>
                    <td>Daily via WP-Cron (<?php echo $next_cron ? 'Next: ' . esc_html( get_date_from_gmt( gmdate( 'Y-m-d H:i:s', $next_cron ), 'Y-m-d H:i:s' ) ) : 'Not scheduled'; ?>)</td>
                </tr>
            </table>
            <form method="post">
                <?php wp_nonce_field( 'sc_refresh_players_nonce', 'sc_nonce' ); ?>
                <p>
                    <input type="submit" name="sc_refresh_players" class="button button-primary" value="Refresh Player Index" />
                </p>
            </form>
        </div>

        <div class="card" style="max-width: 600px; padding: 20px; margin-top: 20px;">
            <h2>Quick Links</h2>
            <ul style="list-style: disc; padding-left: 20px;">
                <li><a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>" target="_blank">Player Directory</a></li>
                <li><a href="<?php echo esc_url( home_url( '/sitemap-players.xml' ) ); ?>" target="_blank">Player Sitemap (XML)</a></li>
                <li><a href="<?php echo esc_url( rest_url( 'statchasers/v1/players' ) ); ?>" target="_blank">Players REST Endpoint</a></li>
                <li><a href="<?php echo esc_url( rest_url( 'statchasers/v1/players?q=mahomes' ) ); ?>" target="_blank">REST Search Example (?q=mahomes)</a></li>
            </ul>
        </div>

        <div class="card" style="max-width: 600px; padding: 20px; margin-top: 20px;">
            <h2>Installation Notes</h2>
            <ol style="padding-left: 20px;">
                <li>After activating, go to <strong>Settings &gt; Permalinks</strong> and click <strong>Save Changes</strong> to flush rewrite rules.</li>
                <li>Player data is fetched automatically on activation and refreshed daily.</li>
                <li>Data is stored in <code>wp-content/uploads/statchasers/players.json</code>.</li>
                <li>Add <code>https://statchasers.com/sitemap-players.xml</code> to Google Search Console.</li>
            </ol>
        </div>
    </div>
    <?php
}
