<?php
/**
 * Plugin Name: StatChasers Player Pages
 * Plugin URI:  https://statchasers.com
 * Description: Programmatic SEO-friendly NFL player pages powered by the Sleeper API. Adds /nfl/players/ index and /nfl/players/{slug}/ profile pages that use your theme's header/footer.
 * Version:     1.0.0
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
define( 'SC_PLAYERS_OPTION', 'sc_players_data' );
define( 'SC_LAST_REFRESH_OPTION', 'sc_players_last_refresh' );
define( 'SC_PLAYERS_COUNT_OPTION', 'sc_players_count' );
define( 'SC_CRON_HOOK', 'sc_daily_player_refresh' );

class StatChasers_Player_Pages {

    private static $instance = null;
    private $players_cache = null;
    private $players_by_slug = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action( 'init', array( $this, 'register_rewrite_rules' ) );
        add_filter( 'query_vars', array( $this, 'register_query_vars' ) );
        add_action( 'template_redirect', array( $this, 'load_custom_template' ) );
        add_action( 'wp_head', array( $this, 'inject_seo_meta' ), 1 );
        add_filter( 'pre_get_document_title', array( $this, 'filter_document_title' ), 999 );
        add_filter( 'document_title_parts', array( $this, 'filter_title_parts' ), 999 );
        add_action( 'admin_menu', array( $this, 'add_admin_page' ) );
        add_action( 'admin_init', array( $this, 'handle_admin_actions' ) );
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
        add_action( SC_CRON_HOOK, array( $this, 'refresh_players_data' ) );
        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
    }

    /* =========================================================================
       ACTIVATION / DEACTIVATION
    ========================================================================= */

    public function activate() {
        $this->register_rewrite_rules();
        flush_rewrite_rules();
        if ( ! wp_next_scheduled( SC_CRON_HOOK ) ) {
            wp_schedule_event( time(), 'daily', SC_CRON_HOOK );
        }
        if ( ! $this->get_players() ) {
            $this->refresh_players_data();
        }
    }

    public function deactivate() {
        flush_rewrite_rules();
        wp_clear_scheduled_hook( SC_CRON_HOOK );
    }

    /* =========================================================================
       REWRITE RULES & QUERY VARS
    ========================================================================= */

    public function register_rewrite_rules() {
        add_rewrite_rule(
            '^nfl/players/([^/]+)/?$',
            'index.php?sc_player_slug=$matches[1]',
            'top'
        );
        add_rewrite_rule(
            '^nfl/players/?$',
            'index.php?sc_player_index=1',
            'top'
        );
    }

    public function register_query_vars( $vars ) {
        $vars[] = 'sc_player_slug';
        $vars[] = 'sc_player_index';
        return $vars;
    }

    /* =========================================================================
       TEMPLATE ROUTING
    ========================================================================= */

    public function load_custom_template() {
        $slug = get_query_var( 'sc_player_slug' );
        $is_index = get_query_var( 'sc_player_index' );

        if ( $slug ) {
            $player = $this->get_player_by_slug( $slug );
            if ( ! $player ) {
                global $wp_query;
                $wp_query->set_404();
                status_header( 404 );
                nocache_headers();
                include get_404_template();
                exit;
            }
            set_query_var( 'sc_player', $player );
            include SC_PLUGIN_DIR . 'templates/player.php';
            exit;
        }

        if ( $is_index ) {
            include SC_PLUGIN_DIR . 'templates/index.php';
            exit;
        }
    }

    /* =========================================================================
       SEO: TITLE + META
    ========================================================================= */

    public function filter_document_title( $title ) {
        $slug = get_query_var( 'sc_player_slug' );
        if ( $slug ) {
            $player = $this->get_player_by_slug( $slug );
            if ( $player ) {
                return $player['name'] . ' Fantasy Football Profile | StatChasers';
            }
        }
        $is_index = get_query_var( 'sc_player_index' );
        if ( $is_index ) {
            return 'NFL Player Database | StatChasers';
        }
        return $title;
    }

    public function filter_title_parts( $parts ) {
        $slug = get_query_var( 'sc_player_slug' );
        if ( $slug ) {
            $player = $this->get_player_by_slug( $slug );
            if ( $player ) {
                $parts['title'] = $player['name'] . ' Fantasy Football Profile | StatChasers';
                unset( $parts['site'] );
                unset( $parts['tagline'] );
                return $parts;
            }
        }
        $is_index = get_query_var( 'sc_player_index' );
        if ( $is_index ) {
            $parts['title'] = 'NFL Player Database | StatChasers';
            unset( $parts['site'] );
            unset( $parts['tagline'] );
            return $parts;
        }
        return $parts;
    }

    public function inject_seo_meta() {
        $slug = get_query_var( 'sc_player_slug' );
        if ( $slug ) {
            $player = $this->get_player_by_slug( $slug );
            if ( $player ) {
                $pos  = $player['position'] ? $player['position'] : 'NFL';
                $team = $player['team'] ? $player['team'] : 'FA';
                $name = esc_attr( $player['name'] );
                $desc = esc_attr( "Fantasy profile for {$player['name']} ({$pos} - {$team}). Stats, trends, and StatChasers insights." );
                $canonical = esc_url( home_url( '/nfl/players/' . $player['slug'] . '/' ) );
                $title = esc_attr( "{$player['name']} Fantasy Football Profile | StatChasers" );

                echo '<meta name="description" content="' . $desc . '" />' . "\n";
                echo '<meta property="og:title" content="' . $title . '" />' . "\n";
                echo '<meta property="og:description" content="' . $desc . '" />' . "\n";
                echo '<meta property="og:type" content="profile" />' . "\n";
                echo '<meta property="og:url" content="' . $canonical . '" />' . "\n";
                echo '<link rel="canonical" href="' . $canonical . '" />' . "\n";

                $json_ld = array(
                    '@context' => 'https://schema.org',
                    '@type'    => 'Person',
                    'name'     => $player['name'],
                    'sport'    => 'American Football',
                    'url'      => home_url( '/nfl/players/' . $player['slug'] . '/' ),
                );
                if ( $player['team'] ) {
                    $json_ld['memberOf'] = array(
                        '@type' => 'SportsTeam',
                        'name'  => $player['team'],
                    );
                }
                echo '<script type="application/ld+json">' . wp_json_encode( $json_ld, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
            }
        }

        $is_index = get_query_var( 'sc_player_index' );
        if ( $is_index ) {
            $idx_title = 'NFL Player Database | StatChasers';
            $desc = 'Search and browse fantasy football profiles for over 4,000 NFL players. Stats, trends, and insights.';
            $canonical = esc_url( home_url( '/nfl/players/' ) );
            echo '<meta name="description" content="' . esc_attr( $desc ) . '" />' . "\n";
            echo '<meta property="og:title" content="' . esc_attr( $idx_title ) . '" />' . "\n";
            echo '<meta property="og:description" content="' . esc_attr( $desc ) . '" />' . "\n";
            echo '<meta property="og:type" content="website" />' . "\n";
            echo '<meta property="og:url" content="' . $canonical . '" />' . "\n";
            echo '<link rel="canonical" href="' . $canonical . '" />' . "\n";
        }
    }

    /* =========================================================================
       PLAYER DATA: FETCHING, CACHING, LOOKUP
    ========================================================================= */

    public function refresh_players_data() {
        $response = wp_remote_get( 'https://api.sleeper.app/v1/players/nfl', array(
            'timeout' => 60,
        ) );

        if ( is_wp_error( $response ) ) {
            error_log( 'StatChasers: Failed to fetch Sleeper API - ' . $response->get_error_message() );
            return false;
        }

        $body = wp_remote_retrieve_body( $response );
        $players_map = json_decode( $body, true );

        if ( ! is_array( $players_map ) ) {
            error_log( 'StatChasers: Invalid response from Sleeper API.' );
            return false;
        }

        $valid_positions = array( 'QB', 'RB', 'WR', 'TE', 'K', 'DEF' );
        $players = array();
        $slug_set = array();

        foreach ( $players_map as $player_id => $p ) {
            if ( empty( $p['full_name'] ) && ( ! isset( $p['position'] ) || $p['position'] !== 'DEF' ) ) {
                continue;
            }
            if ( ! isset( $p['position'] ) || ! in_array( $p['position'], $valid_positions, true ) ) {
                continue;
            }

            $name = isset( $p['full_name'] ) ? $p['full_name'] : trim( ( isset( $p['first_name'] ) ? $p['first_name'] : '' ) . ' ' . ( isset( $p['last_name'] ) ? $p['last_name'] : '' ) );
            $slug = $this->build_slug( $name );
            if ( empty( $slug ) ) {
                continue;
            }

            if ( isset( $slug_set[ $slug ] ) ) {
                $slug = $slug . '-' . $player_id;
            }
            $slug_set[ $slug ] = true;

            $players[] = array(
                'id'            => (string) $player_id,
                'name'          => $name,
                'slug'          => $slug,
                'position'      => isset( $p['position'] ) ? $p['position'] : null,
                'team'          => isset( $p['team'] ) ? $p['team'] : null,
                'status'        => isset( $p['status'] ) ? $p['status'] : null,
                'injury_status' => isset( $p['injury_status'] ) ? $p['injury_status'] : null,
                'age'           => isset( $p['age'] ) ? $p['age'] : null,
                'height'        => isset( $p['height'] ) ? $p['height'] : null,
                'weight'        => isset( $p['weight'] ) ? $p['weight'] : null,
            );
        }

        usort( $players, function ( $a, $b ) {
            $pos_order = array( 'QB' => 0, 'RB' => 1, 'WR' => 2, 'TE' => 3, 'K' => 4, 'DEF' => 5 );
            $pa = isset( $pos_order[ $a['position'] ] ) ? $pos_order[ $a['position'] ] : 99;
            $pb = isset( $pos_order[ $b['position'] ] ) ? $pos_order[ $b['position'] ] : 99;
            if ( $pa !== $pb ) {
                return $pa - $pb;
            }
            return strcmp( $a['name'], $b['name'] );
        } );

        $upload_dir = wp_upload_dir();
        $sc_dir = $upload_dir['basedir'] . '/statchasers';
        if ( ! file_exists( $sc_dir ) ) {
            wp_mkdir_p( $sc_dir );
        }
        $json_path = $sc_dir . '/players.json';
        $json_data = wp_json_encode( $players );
        $written = file_put_contents( $json_path, $json_data );

        if ( false === $written ) {
            error_log( 'StatChasers: Failed to write players.json to ' . $json_path . '. Falling back to WP options.' );
            update_option( SC_PLAYERS_OPTION, $json_data, false );
        }

        update_option( SC_LAST_REFRESH_OPTION, current_time( 'mysql' ) );
        update_option( SC_PLAYERS_COUNT_OPTION, count( $players ) );

        $this->players_cache = null;
        $this->players_by_slug = null;

        return true;
    }

    private function build_slug( $name ) {
        if ( empty( $name ) ) {
            return '';
        }
        $slug = strtolower( $name );
        $slug = preg_replace( '/[^a-z0-9\s-]/', '', $slug );
        $slug = preg_replace( '/\s+/', '-', $slug );
        $slug = preg_replace( '/-+/', '-', $slug );
        $slug = trim( $slug, '-' );
        return $slug;
    }

    public function get_players() {
        if ( null !== $this->players_cache ) {
            return $this->players_cache;
        }

        $upload_dir = wp_upload_dir();
        $json_path = $upload_dir['basedir'] . '/statchasers/players.json';

        $raw = null;
        if ( file_exists( $json_path ) ) {
            $raw = file_get_contents( $json_path );
        }

        if ( empty( $raw ) ) {
            $raw = get_option( SC_PLAYERS_OPTION, '' );
        }

        if ( ! empty( $raw ) ) {
            $this->players_cache = json_decode( $raw, true );
            if ( is_array( $this->players_cache ) ) {
                $this->players_by_slug = array();
                foreach ( $this->players_cache as $p ) {
                    $this->players_by_slug[ $p['slug'] ] = $p;
                }
                return $this->players_cache;
            }
        }

        $this->players_cache = array();
        $this->players_by_slug = array();
        return $this->players_cache;
    }

    public function get_player_by_slug( $slug ) {
        if ( null === $this->players_by_slug ) {
            $this->get_players();
        }
        return isset( $this->players_by_slug[ $slug ] ) ? $this->players_by_slug[ $slug ] : null;
    }

    /* =========================================================================
       WP-ADMIN PAGE
    ========================================================================= */

    public function add_admin_page() {
        add_management_page(
            'StatChasers Players',
            'StatChasers Players',
            'manage_options',
            'statchasers-players',
            array( $this, 'render_admin_page' )
        );
    }

    public function handle_admin_actions() {
        if ( ! isset( $_POST['sc_refresh_players'] ) ) {
            return;
        }
        if ( ! check_admin_referer( 'sc_refresh_players_nonce', 'sc_nonce' ) ) {
            return;
        }
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }
        $result = $this->refresh_players_data();
        if ( $result ) {
            add_settings_error( 'statchasers', 'refresh_success', 'Player index refreshed successfully!', 'success' );
        } else {
            add_settings_error( 'statchasers', 'refresh_error', 'Failed to refresh player index. Check the error log.', 'error' );
        }
    }

    public function render_admin_page() {
        $last_refresh = get_option( SC_LAST_REFRESH_OPTION, 'Never' );
        $player_count = get_option( SC_PLAYERS_COUNT_OPTION, 0 );
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
                        <td>Daily via WP-Cron (<?php echo wp_next_scheduled( SC_CRON_HOOK ) ? 'Scheduled' : 'Not scheduled'; ?>)</td>
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
                    <li><a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>" target="_blank">Player Search Page</a></li>
                    <li><a href="<?php echo esc_url( rest_url( 'statchasers/v1/players' ) ); ?>" target="_blank">Players REST Endpoint</a></li>
                    <li><a href="<?php echo esc_url( rest_url( 'statchasers/v1/player-sitemap' ) ); ?>" target="_blank">Sitemap Endpoint (first 300 players)</a></li>
                </ul>
            </div>

            <div class="card" style="max-width: 600px; padding: 20px; margin-top: 20px;">
                <h2>Sitemap Instructions</h2>
                <p>The sitemap endpoint returns the first 300 player page URLs as JSON. To submit to Google:</p>
                <ol style="padding-left: 20px;">
                    <li>Go to <a href="https://search.google.com/search-console" target="_blank">Google Search Console</a></li>
                    <li>Select your property (statchasers.com)</li>
                    <li>Navigate to <strong>Sitemaps</strong> in the left menu</li>
                    <li>If you have a sitemap plugin (e.g. Yoast, Rank Math, XML Sitemaps), you can add the player URLs to it. See the filter hook documentation below.</li>
                    <li>Alternatively, you can use the <strong>URL Inspection</strong> tool to submit individual URLs</li>
                </ol>
                <h3>Adding to Yoast Sitemap</h3>
                <p>Add this to your theme's <code>functions.php</code> to include player pages in your Yoast XML sitemap:</p>
                <pre style="background: #f1f1f1; padding: 10px; overflow-x: auto; font-size: 13px;">
add_filter( 'wpseo_sitemap_index', function( $sitemap_index ) {
    $sitemap_index .= '&lt;sitemap&gt;
        &lt;loc&gt;' . home_url( '/statchasers-players-sitemap.xml' ) . '&lt;/loc&gt;
        &lt;lastmod&gt;' . date( 'c' ) . '&lt;/lastmod&gt;
    &lt;/sitemap&gt;';
    return $sitemap_index;
} );

add_action( 'init', function() {
    global $wpseo_sitemaps;
    if ( isset( $wpseo_sitemaps ) ) {
        $wpseo_sitemaps->register_sitemap( 'statchasers-players', 'sc_yoast_player_sitemap' );
    }
} );

function sc_yoast_player_sitemap() {
    $sc = StatChasers_Player_Pages::get_instance();
    $players = $sc->get_players();
    $sitemap = '&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;';
    $count = 0;
    foreach ( $players as $p ) {
        if ( $count >= 300 ) break;
        $sitemap .= '&lt;url&gt;&lt;loc&gt;' . home_url('/nfl/players/' . $p['slug'] . '/') . '&lt;/loc&gt;&lt;/url&gt;';
        $count++;
    }
    $sitemap .= '&lt;/urlset&gt;';
    header( 'Content-Type: text/xml; charset=UTF-8' );
    echo $sitemap;
    exit;
}
                </pre>

                <h3>Adding to Rank Math Sitemap</h3>
                <p>Add this to your theme's <code>functions.php</code>:</p>
                <pre style="background: #f1f1f1; padding: 10px; overflow-x: auto; font-size: 13px;">
add_filter( 'rank_math/sitemap/urlimages', '__return_empty_array' );
add_filter( 'rank_math/sitemap/entry', function( $url, $type, $object ) {
    return $url;
}, 10, 3 );

add_action( 'rank_math/sitemap/extra_urls', function( $sitemap ) {
    $sc = StatChasers_Player_Pages::get_instance();
    $players = $sc->get_players();
    $count = 0;
    foreach ( $players as $p ) {
        if ( $count >= 300 ) break;
        $sitemap->addUrl( home_url( '/nfl/players/' . $p['slug'] . '/' ) );
        $count++;
    }
} );
                </pre>
            </div>
        </div>
        <?php
    }

    /* =========================================================================
       REST API ENDPOINTS
    ========================================================================= */

    public function register_rest_routes() {
        register_rest_route( 'statchasers/v1', '/players', array(
            'methods'             => 'GET',
            'callback'            => array( $this, 'rest_get_players' ),
            'permission_callback' => '__return_true',
        ) );

        register_rest_route( 'statchasers/v1', '/player-sitemap', array(
            'methods'             => 'GET',
            'callback'            => array( $this, 'rest_get_sitemap' ),
            'permission_callback' => '__return_true',
        ) );
    }

    public function rest_get_players( $request ) {
        $players = $this->get_players();
        return new WP_REST_Response( $players, 200 );
    }

    public function rest_get_sitemap( $request ) {
        $players = $this->get_players();
        $urls = array();
        $count = 0;
        foreach ( $players as $p ) {
            if ( $count >= 300 ) {
                break;
            }
            $urls[] = array(
                'loc'     => home_url( '/nfl/players/' . $p['slug'] . '/' ),
                'lastmod' => gmdate( 'Y-m-d' ),
            );
            $count++;
        }
        return new WP_REST_Response( $urls, 200 );
    }
}

StatChasers_Player_Pages::get_instance();
