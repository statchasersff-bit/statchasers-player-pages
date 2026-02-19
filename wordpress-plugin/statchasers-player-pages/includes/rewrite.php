<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Register rewrite rules at priority 9 (before default 10).
 */
add_action( 'init', 'sc_register_rewrite_rules', 9 );

/**
 * Register custom query vars (priority 1 to ensure early registration).
 */
add_filter( 'query_vars', 'scpp_register_query_vars', 1 );
add_filter( 'query_vars', 'sc_register_query_vars' );

/**
 * Intercept WP request parsing to force our query vars
 * even when WP resolves to a real page slug like nfl/players.
 */
add_action( 'parse_request', 'sc_parse_request', 1 );

/**
 * Hijack the main query to load container page context.
 */
add_action( 'pre_get_posts', 'sc_hijack_query', 1 );

/**
 * Force posts array to container page after DB query runs.
 */
add_filter( 'the_posts', 'sc_force_container_posts', 10, 2 );

/**
 * Inject plugin HTML into the container page content.
 */
add_filter( 'the_content', 'sc_inject_content', 99 );

/**
 * Fix body classes for Divi.
 */
add_filter( 'body_class', 'sc_add_body_class' );

/* ─── Disable cache for player routes (debug only) ─── */
add_action('send_headers', function () {
    if ( function_exists('sc_detect_route') ) {
        $r = sc_detect_route();
        if ( $r ) {
            header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
            header('Pragma: no-cache');
        }
    }
}, 1);


/* ─── Rewrite Rules ─── */

function sc_register_rewrite_rules() {
    add_rewrite_rule( '^nfl/players/?$', 'index.php?sc_players_index=1', 'top' );
    add_rewrite_rule( '^nfl/players/([^/]+)/?$', 'index.php?sc_player_slug=$matches[1]', 'top' );
}

function scpp_register_query_vars( $vars ) {
    if ( ! in_array( 'sc_players_index', $vars, true ) ) {
        $vars[] = 'sc_players_index';
    }
    if ( ! in_array( 'sc_player_slug', $vars, true ) ) {
        $vars[] = 'sc_player_slug';
    }
    if ( ! in_array( 'sc_player_sitemap', $vars, true ) ) {
        $vars[] = 'sc_player_sitemap';
    }
    return $vars;
}

function sc_register_query_vars( $vars ) {
    $vars[] = 'sc_players_index';
    $vars[] = 'sc_player_slug';
    $vars[] = 'sc_player_sitemap';
    return $vars;
}


/* ─── Parse Request Fallback ─── */

function sc_parse_request( $wp ) {
    $path = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '';
    $path = trim( parse_url( $path, PHP_URL_PATH ), '/' );

    if ( preg_match( '#^nfl/players/([^/]+)$#', $path, $m ) ) {
        $wp->query_vars['sc_player_slug'] = sanitize_title( $m[1] );
        unset(
            $wp->query_vars['pagename'],
            $wp->query_vars['name'],
            $wp->query_vars['page_id'],
            $wp->query_vars['p'],
            $wp->query_vars['post_type'],
            $wp->query_vars['attachment']
        );
        return;
    }

    if ( preg_match( '#^nfl/players/?$#', $path ) ) {
        $wp->query_vars['sc_players_index'] = '1';
        unset(
            $wp->query_vars['pagename'],
            $wp->query_vars['name'],
            $wp->query_vars['page_id'],
            $wp->query_vars['p'],
            $wp->query_vars['post_type'],
            $wp->query_vars['attachment']
        );
        return;
    }
}


/* ─── Route Detection Helper ─── */

function sc_detect_route() {
    $slug     = get_query_var( 'sc_player_slug', '' );
    $is_index = get_query_var( 'sc_players_index', '' );

    if ( $is_index ) {
        return array( 'route' => 'index', 'slug' => '' );
    }
    if ( $slug ) {
        return array( 'route' => 'player', 'slug' => $slug );
    }

    return null;
}


/* ─── Body Class ─── */

function sc_add_body_class( $classes ) {
    $r = sc_detect_route();
    if ( $r ) {
        $classes[] = 'sc-players-page';
        $classes[] = 'page';
        $classes = array_diff( $classes, array(
            'et_right_sidebar', 'et_left_sidebar',
            'single', 'single-post', 'blog',
        ) );
        $classes[] = 'et_no_sidebar';
        $classes[] = 'et_full_width_page';
    }
    return $classes;
}


/* ─── Query Hijacking ─── */

function sc_hijack_query( $query ) {
    if ( is_admin() ) return;
    if ( ! $query->is_main_query() ) return;

    $r = sc_detect_route();
    if ( ! $r ) return;

    $container_id   = (int) get_option( 'scpp_container_page_id', 0 );
    $container_post = $container_id ? get_post( $container_id ) : null;

    if ( ! $container_post || $container_post->post_type !== 'page' || $container_post->post_status !== 'publish' ) {
        return;
    }

    $query->set( 'page_id', $container_id );
    $query->set( 'post_type', 'page' );
    $query->set( 'posts_per_page', 1 );
    $query->set( 'name', '' );
    $query->set( 'p', '' );
    $query->set( 'pagename', '' );
    $query->set( 'category_name', '' );
    $query->set( 'tag', '' );
    $query->set( 'post__in', array( $container_id ) );

    $query->is_page     = true;
    $query->is_singular = true;
    $query->is_single   = false;
    $query->is_home     = false;
    $query->is_archive  = false;
    $query->is_404      = false;
    $query->is_category = false;
    $query->is_tag      = false;
    $query->is_tax      = false;
    $query->is_search   = false;

    $query->queried_object    = $container_post;
    $query->queried_object_id = $container_post->ID;
}


/* ─── Force Container Posts ─── */

function sc_force_container_posts( $posts, $query ) {
    if ( is_admin() ) return $posts;
    if ( ! $query->is_main_query() ) return $posts;

    $r = sc_detect_route();
    if ( ! $r ) return $posts;

    $container_id   = (int) get_option( 'scpp_container_page_id', 0 );
    $container_post = $container_id ? get_post( $container_id ) : null;

    if ( ! $container_post || $container_post->post_type !== 'page' || $container_post->post_status !== 'publish' ) {
        return $posts;
    }

    $query->posts         = array( $container_post );
    $query->post          = $container_post;
    $query->found_posts   = 1;
    $query->post_count    = 1;
    $query->max_num_pages = 1;

    $query->is_page     = true;
    $query->is_singular = true;
    $query->is_single   = false;
    $query->is_home     = false;
    $query->is_archive  = false;
    $query->is_404      = false;

    $query->queried_object    = $container_post;
    $query->queried_object_id = $container_post->ID;

    global $post;
    $post = $container_post;
    setup_postdata( $post );

    return array( $container_post );
}


/* ─── Content Injection ─── */

function sc_inject_content( $content ) {
    $r = sc_detect_route();
    if ( ! $r ) return $content;

    $container_id = (int) get_option( 'scpp_container_page_id', 0 );

    // Only inject when we're rendering the container page (Divi-safe)
    if ( ! $container_id || (int) get_queried_object_id() !== $container_id ) {
        return $content;
    }

    $route = $r['route'];
    $slug  = $r['slug'];

    $debug = '<!-- SCPP v0.3.1: container=' . $container_id . ' route=' . esc_html( $route );
    if ( $slug ) {
        $debug .= ' slug=' . esc_html( $slug );
    }
    $debug .= ' -->';

    $deploy_marker = "\n<!-- SCPP DEPLOY MARKER: 2026-02-19-02 -->\n";

    if ( $route === 'index' ) {
        ob_start();
        include SC_PLUGIN_DIR . 'templates/index.php';
        return $deploy_marker . $debug . "\n" . ob_get_clean();
    }

    if ( $route === 'player' && $slug ) {
        $player = sc_get_player_by_slug( $slug );
        if ( $player ) {
            set_query_var( 'sc_player', $player );
        }
        ob_start();
        include SC_PLUGIN_DIR . 'templates/player.php';
        return $deploy_marker . $debug . "\n" . ob_get_clean();
    }

    return $content;
}



/* ─── Rewrite Diagnostics Helper ─── */

function sc_get_rewrite_diagnostics() {
    global $wp_rewrite;
    $rules = $wp_rewrite->wp_rewrite_rules();
    $sc_rules = array();
    if ( is_array( $rules ) ) {
        foreach ( $rules as $pattern => $target ) {
            if ( strpos( $target, 'sc_player' ) !== false || strpos( $pattern, 'nfl/players' ) !== false ) {
                $sc_rules[ $pattern ] = $target;
            }
        }
    }
    return $sc_rules;
}
