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
    if ( ! current_user_can( 'manage_options' ) ) return;

    if ( isset( $_POST['sc_refresh_players'] ) ) {
        if ( ! check_admin_referer( 'sc_admin_nonce', 'sc_nonce' ) ) return;
        $result = sc_refresh_players_data();
        if ( $result ) {
            add_settings_error( 'statchasers', 'refresh_success', 'Player index refreshed successfully!', 'success' );
        } else {
            add_settings_error( 'statchasers', 'refresh_error', 'Failed to refresh player index. Check the error log.', 'error' );
        }
    }

    if ( isset( $_POST['sc_save_container_page'] ) ) {
        if ( ! check_admin_referer( 'sc_admin_nonce', 'sc_nonce' ) ) return;
        $page_id = isset( $_POST['scpp_container_page_id'] ) ? (int) $_POST['scpp_container_page_id'] : 0;
        update_option( 'scpp_container_page_id', $page_id );
        add_settings_error( 'statchasers', 'container_saved', 'Container page saved.', 'success' );
    }

    if ( isset( $_POST['sc_auto_create_pages'] ) ) {
        if ( ! check_admin_referer( 'sc_admin_nonce', 'sc_nonce' ) ) return;
        $created = sc_auto_create_container_pages();
        if ( $created ) {
            add_settings_error( 'statchasers', 'pages_created', 'Container pages created and saved. Please re-save your Permalinks.', 'success' );
        } else {
            add_settings_error( 'statchasers', 'pages_exists', 'Container pages already exist or could not be created.', 'warning' );
        }
    }
}

function sc_auto_create_container_pages() {
    $nfl_page = get_page_by_path( 'nfl' );
    $nfl_id = 0;
    if ( $nfl_page && $nfl_page->post_status === 'publish' ) {
        $nfl_id = $nfl_page->ID;
    } else {
        $nfl_id = wp_insert_post( array(
            'post_title'  => 'NFL',
            'post_name'   => 'nfl',
            'post_status' => 'publish',
            'post_type'   => 'page',
            'post_content' => '',
        ) );
        if ( is_wp_error( $nfl_id ) || ! $nfl_id ) {
            return false;
        }
    }

    $players_page = get_page_by_path( 'nfl/players' );
    $players_id = 0;
    if ( $players_page && $players_page->post_status === 'publish' ) {
        $players_id = $players_page->ID;
    } else {
        $players_id = wp_insert_post( array(
            'post_title'  => 'Players',
            'post_name'   => 'players',
            'post_status' => 'publish',
            'post_type'   => 'page',
            'post_parent' => $nfl_id,
            'post_content' => '',
        ) );
        if ( is_wp_error( $players_id ) || ! $players_id ) {
            return false;
        }
    }

    update_option( 'scpp_container_page_id', $players_id );
    flush_rewrite_rules();
    return true;
}

function sc_render_admin_page() {
    $last_refresh    = get_option( SC_LAST_REFRESH_OPTION, 'Never' );
    $player_count    = get_option( SC_PLAYERS_COUNT_OPTION, 0 );
    $next_cron       = wp_next_scheduled( SC_CRON_HOOK );
    $container_id    = (int) get_option( 'scpp_container_page_id', 0 );
    $container_post  = $container_id ? get_post( $container_id ) : null;
    $pages           = get_pages( array( 'post_status' => 'publish', 'sort_column' => 'post_title' ) );
    ?>
    <div class="wrap">
        <h1>StatChasers Player Pages</h1>

        <?php settings_errors( 'statchasers' ); ?>

        <div class="card" style="max-width: 600px; padding: 20px;">
            <h2>Container Page</h2>
            <p style="color: #666;">Select the WordPress page that will host player content. Plugin routes (<code>/nfl/players/</code>) render inside this page's template, so Divi uses the correct header/footer and full-width layout.</p>
            <form method="post">
                <?php wp_nonce_field( 'sc_admin_nonce', 'sc_nonce' ); ?>
                <table class="form-table">
                    <tr>
                        <th><label for="scpp_container_page_id">Container Page</label></th>
                        <td>
                            <select name="scpp_container_page_id" id="scpp_container_page_id" style="min-width: 300px;">
                                <option value="0">— Select a page —</option>
                                <?php foreach ( $pages as $pg ) : ?>
                                    <option value="<?php echo esc_attr( $pg->ID ); ?>" <?php selected( $container_id, $pg->ID ); ?>>
                                        <?php echo esc_html( $pg->post_title ); ?> (ID: <?php echo esc_html( $pg->ID ); ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                            <?php if ( $container_post ) : ?>
                                <p class="description" style="margin-top: 6px;">
                                    Currently using: <strong><?php echo esc_html( $container_post->post_title ); ?></strong>
                                    (<?php echo esc_html( get_page_uri( $container_post ) ); ?>)
                                </p>
                            <?php endif; ?>
                        </td>
                    </tr>
                </table>
                <p>
                    <input type="submit" name="sc_save_container_page" class="button button-primary" value="Save Container Page" />
                </p>
            </form>
            <hr style="margin: 16px 0;" />
            <form method="post">
                <?php wp_nonce_field( 'sc_admin_nonce', 'sc_nonce' ); ?>
                <p style="color: #666;">Or auto-create the required pages (NFL &rarr; Players):</p>
                <p>
                    <input type="submit" name="sc_auto_create_pages" class="button" value="Auto-Create Container Pages" />
                </p>
            </form>
        </div>

        <div class="card" style="max-width: 600px; padding: 20px; margin-top: 20px;">
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
                <?php wp_nonce_field( 'sc_admin_nonce', 'sc_nonce' ); ?>
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
            <h2>Rewrite Diagnostics</h2>
            <p style="color: #666;">This shows whether WordPress has registered the plugin's rewrite rules. If empty, deactivate/reactivate the plugin and re-save Permalinks.</p>
            <table class="form-table">
                <tr>
                    <th>Container Page ID</th>
                    <td><code><?php echo esc_html( $container_id ? $container_id : 'NOT SET' ); ?></code>
                    <?php if ( $container_post ) : ?>
                        &mdash; <strong><?php echo esc_html( $container_post->post_title ); ?></strong>
                        (type: <?php echo esc_html( $container_post->post_type ); ?>, status: <?php echo esc_html( $container_post->post_status ); ?>)
                    <?php elseif ( $container_id ) : ?>
                        &mdash; <span style="color: red;">Post ID <?php echo esc_html( $container_id ); ?> not found or invalid!</span>
                    <?php endif; ?>
                    </td>
                </tr>
                <?php
                $sc_rules = sc_get_rewrite_diagnostics();
                ?>
                <tr>
                    <th>Registered Rewrite Rules</th>
                    <td>
                        <?php if ( empty( $sc_rules ) ) : ?>
                            <span style="color: red;">No StatChasers rewrite rules found! Deactivate/reactivate and re-save Permalinks.</span>
                        <?php else : ?>
                            <?php foreach ( $sc_rules as $pattern => $target ) : ?>
                                <code><?php echo esc_html( $pattern ); ?></code><br/>
                                &rarr; <code><?php echo esc_html( $target ); ?></code><br/><br/>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </td>
                </tr>
                <tr>
                    <th>Query Vars Registered</th>
                    <td>
                        sc_player_slug: <code><?php echo in_array( 'sc_player_slug', $GLOBALS['wp']->public_query_vars ?? array() ) ? 'YES' : 'NO'; ?></code><br/>
                        sc_players_index: <code><?php echo in_array( 'sc_players_index', $GLOBALS['wp']->public_query_vars ?? array() ) ? 'YES' : 'NO'; ?></code>
                    </td>
                </tr>
                <tr>
                    <th>Permalink Structure</th>
                    <td><code><?php echo esc_html( get_option( 'permalink_structure', '(default)' ) ); ?></code></td>
                </tr>
            </table>
        </div>

        <div class="card" style="max-width: 600px; padding: 20px; margin-top: 20px;">
            <h2>Setup Steps</h2>
            <ol style="padding-left: 20px;">
                <li>Click <strong>Auto-Create Container Pages</strong> above (or select an existing page).</li>
                <li>Go to <strong>Settings &gt; Permalinks</strong> and click <strong>Save Changes</strong>.</li>
                <li>Visit <a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>" target="_blank">/nfl/players/</a> to verify.</li>
                <li>Add <code>https://statchasers.com/sitemap-players.xml</code> to Google Search Console.</li>
            </ol>
        </div>
    </div>
    <?php
}
