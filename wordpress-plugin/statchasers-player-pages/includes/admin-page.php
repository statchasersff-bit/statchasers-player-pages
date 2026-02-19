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
        add_settings_error( 'statchasers', 'container_saved', 'Container page saved. Now re-save Permalinks.', 'success' );
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

    if ( isset( $_POST['sc_flush_rewrite'] ) ) {
        if ( ! check_admin_referer( 'sc_admin_nonce', 'sc_nonce' ) ) return;
        sc_register_rewrite_rules();
        flush_rewrite_rules();
        add_settings_error( 'statchasers', 'flush_success', 'Rewrite rules flushed successfully!', 'success' );
    }

    if ( isset( $_POST['sc_generate_indexed'] ) ) {
        if ( ! check_admin_referer( 'sc_admin_nonce', 'sc_nonce' ) ) return;
        $result = sc_generate_indexed_players();
        if ( $result ) {
            add_settings_error( 'statchasers', 'indexed_success', 'Indexed player list generated successfully!', 'success' );
        } else {
            add_settings_error( 'statchasers', 'indexed_error', 'Failed to generate indexed player list. Check the error log.', 'error' );
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
    sc_register_rewrite_rules();
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
        <h1>StatChasers Player Pages <small style="font-size: 12px; color: #999;">v0.3.1</small></h1>

        <?php settings_errors( 'statchasers' ); ?>

        <?php if ( ! $container_id || ! $container_post ) : ?>
            <div class="notice notice-error" style="padding: 12px;">
                <strong>Container page is not set!</strong> Player pages will not render correctly.
                Use the dropdown below to select a page, or click "Auto-Create NFL/Players Pages."
            </div>
        <?php endif; ?>

        <!-- Container Page -->
        <div class="card" style="max-width: 700px; padding: 20px;">
            <h2>Container Page</h2>
            <p style="color: #666;">Select the WordPress page that hosts player content. Plugin routes (<code>/nfl/players/</code>) render inside this page's template.</p>
            <form method="post">
                <?php wp_nonce_field( 'sc_admin_nonce', 'sc_nonce' ); ?>
                <table class="form-table">
                    <tr>
                        <th><label for="scpp_container_page_id">Container Page</label></th>
                        <td>
                            <select name="scpp_container_page_id" id="scpp_container_page_id" style="min-width: 300px;">
                                <option value="0">&mdash; Select a page &mdash;</option>
                                <?php foreach ( $pages as $pg ) : ?>
                                    <option value="<?php echo esc_attr( $pg->ID ); ?>" <?php selected( $container_id, $pg->ID ); ?>>
                                        <?php echo esc_html( $pg->post_title ); ?> (ID: <?php echo esc_html( $pg->ID ); ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                            <?php if ( $container_post ) : ?>
                                <p class="description" style="margin-top: 6px;">
                                    Currently: <strong><?php echo esc_html( $container_post->post_title ); ?></strong>
                                    (type: <?php echo esc_html( $container_post->post_type ); ?>, status: <?php echo esc_html( $container_post->post_status ); ?>, ID: <?php echo esc_html( $container_post->ID ); ?>)
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
                <p style="color: #666;">Or auto-create the required pages (NFL &rarr; Players) and set as container:</p>
                <p>
                    <input type="submit" name="sc_auto_create_pages" class="button" value="Auto-Create NFL/Players Pages and Set Container" />
                </p>
            </form>
        </div>

        <!-- Routing Debug -->
        <div class="card" style="max-width: 700px; padding: 20px; margin-top: 20px;">
            <h2>Routing Debug</h2>
            <?php
            $sc_rules = sc_get_rewrite_diagnostics();
            $permalink_structure = get_option( 'permalink_structure', '' );
            ?>
            <table class="form-table">
                <tr>
                    <th>Plugin Version</th>
                    <td><code>0.3.1</code></td>
                </tr>
                <tr>
                    <th>Container Page</th>
                    <td>
                        <?php if ( $container_post ) : ?>
                            <code>ID=<?php echo esc_html( $container_id ); ?></code> &mdash;
                            "<?php echo esc_html( $container_post->post_title ); ?>"
                            (type: <?php echo esc_html( $container_post->post_type ); ?>, status: <?php echo esc_html( $container_post->post_status ); ?>)
                        <?php elseif ( $container_id ) : ?>
                            <span style="color:red;">ID=<?php echo esc_html( $container_id ); ?> NOT FOUND</span>
                        <?php else : ?>
                            <span style="color:red;">NOT SET</span>
                        <?php endif; ?>
                    </td>
                </tr>
                <tr>
                    <th>Permalink Structure</th>
                    <td><code><?php echo esc_html( $permalink_structure ? $permalink_structure : '(Plain/Default)' ); ?></code></td>
                </tr>
                <tr>
                    <th>Registered Rewrite Rules</th>
                    <td>
                        <?php if ( empty( $sc_rules ) ) : ?>
                            <span style="color:red; font-weight:bold;">NO StatChasers rewrite rules found!</span><br/>
                            <small>Click "Flush Rewrite Rules Now" below, or go to Settings &gt; Permalinks and Save.</small>
                        <?php else : ?>
                            <?php foreach ( $sc_rules as $pattern => $target ) : ?>
                                <code style="background:#f0f0f0; padding: 2px 6px;"><?php echo esc_html( $pattern ); ?></code><br/>
                                &rarr; <code><?php echo esc_html( $target ); ?></code><br/><br/>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php
                $simulated_public_vars = apply_filters( 'query_vars', array() );

                $qv_slug   = in_array( 'sc_player_slug', $simulated_public_vars, true ) ? 'YES' : 'NO';
                $qv_index  = in_array( 'sc_players_index', $simulated_public_vars, true ) ? 'YES' : 'NO';
                $qv_sitemap= in_array( 'sc_player_sitemap', $simulated_public_vars, true ) ? 'YES' : 'NO';

                echo '<tr><th>Query Vars Registered</th><td>';
                echo 'sc_player_slug: <strong>' . esc_html( $qv_slug ) . '</strong><br>';
                echo 'sc_players_index: <strong>' . esc_html( $qv_index ) . '</strong><br>';
                echo 'sc_player_sitemap: <strong>' . esc_html( $qv_sitemap ) . '</strong>';
                echo '</td></tr>';
                ?>
                <tr>
                    <th>Current Request URI</th>
                    <td><code><?php echo esc_html( isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '(unknown)' ); ?></code></td>
                </tr>
            </table>
            <form method="post" style="margin-top: 12px;">
                <?php wp_nonce_field( 'sc_admin_nonce', 'sc_nonce' ); ?>
                <input type="submit" name="sc_flush_rewrite" class="button button-secondary" value="Flush Rewrite Rules Now" />
            </form>
        </div>

        <!-- Player Index Status -->
        <div class="card" style="max-width: 700px; padding: 20px; margin-top: 20px;">
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

        <!-- Indexed Players -->
        <div class="card" style="max-width: 700px; padding: 20px; margin-top: 20px;">
            <h2>Indexed Players</h2>
            <?php
            $indexed_path = sc_get_indexed_json_path();
            $indexed_data = null;
            if ( file_exists( $indexed_path ) ) {
                $indexed_raw = file_get_contents( $indexed_path );
                $indexed_data = json_decode( $indexed_raw, true );
            }
            $indexed_count = ( $indexed_data && isset( $indexed_data['counts']['total'] ) ) ? $indexed_data['counts']['total'] : 0;
            $indexed_generated = ( $indexed_data && isset( $indexed_data['generated_at'] ) ) ? $indexed_data['generated_at'] : 'Never';
            ?>
            <table class="form-table">
                <tr>
                    <th>Indexed Player Count</th>
                    <td><strong><?php echo esc_html( number_format( $indexed_count ) ); ?></strong></td>
                </tr>
                <tr>
                    <th>Last Generated</th>
                    <td><strong><?php echo esc_html( $indexed_generated ); ?></strong></td>
                </tr>
                <?php if ( $indexed_data && isset( $indexed_data['counts'] ) ) : ?>
                <tr>
                    <th>Position Breakdown</th>
                    <td>
                        <?php
                        $positions = array( 'QB', 'RB', 'WR', 'TE', 'K', 'DEF' );
                        foreach ( $positions as $pos ) :
                            $pos_count = isset( $indexed_data['counts'][ $pos ] ) ? $indexed_data['counts'][ $pos ] : 0;
                        ?>
                            <strong><?php echo esc_html( $pos ); ?>:</strong> <?php echo esc_html( $pos_count ); ?>&nbsp;&nbsp;
                        <?php endforeach; ?>
                    </td>
                </tr>
                <?php endif; ?>
            </table>
            <form method="post">
                <?php wp_nonce_field( 'sc_admin_nonce', 'sc_nonce' ); ?>
                <p>
                    <input type="submit" name="sc_generate_indexed" class="button button-primary" value="Generate Indexed Player List" />
                </p>
            </form>
        </div>

        <!-- Quick Links -->
        <div class="card" style="max-width: 700px; padding: 20px; margin-top: 20px;">
            <h2>Quick Links</h2>
            <ul style="list-style: disc; padding-left: 20px;">
                <li><a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>" target="_blank">Player Directory</a></li>
                <li><a href="<?php echo esc_url( home_url( '/nfl/players/tyreek-hill/' ) ); ?>" target="_blank">Test Player Page (Tyreek Hill)</a></li>
                <li><a href="<?php echo esc_url( home_url( '/sitemap-players.xml' ) ); ?>" target="_blank">Player Sitemap (XML)</a></li>
                <li><a href="<?php echo esc_url( rest_url( 'statchasers/v1/players' ) ); ?>" target="_blank">Players REST Endpoint</a></li>
            </ul>
        </div>

        <!-- Setup Steps -->
        <div class="card" style="max-width: 700px; padding: 20px; margin-top: 20px;">
            <h2>Setup Steps</h2>
            <ol style="padding-left: 20px;">
                <li>Click <strong>Auto-Create NFL/Players Pages and Set Container</strong> above (or select an existing page).</li>
                <li>Click <strong>Flush Rewrite Rules Now</strong> above, OR go to <strong>Settings &gt; Permalinks</strong> and click <strong>Save Changes</strong>.</li>
                <li>Visit <a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>" target="_blank">/nfl/players/</a> to verify.</li>
                <li>View page source and search for <code>&lt;!-- SCPP v0.3.1</code> to confirm new code is live.</li>
            </ol>
        </div>
    </div>
    <?php
}
