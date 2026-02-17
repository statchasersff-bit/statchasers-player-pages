<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', 'sc_register_rewrite_rules' );
add_filter( 'query_vars', 'sc_register_query_vars' );
add_action( 'parse_request', 'sc_parse_request_fallback', 1 );
add_action( 'pre_get_posts', 'sc_hijack_query', 1 );
add_filter( 'the_posts', 'sc_force_container_posts', 10, 2 );
add_filter( 'the_content', 'sc_inject_content', 99 );
add_filter( 'body_class', 'sc_add_body_class' );

function sc_detect_route() {
    $slug     = get_query_var( 'sc_player_slug', '' );
    $is_index = get_query_var( 'sc_players_index', '' );

    if ( $is_index ) {
        return array( 'route' => 'index', 'slug' => '' );
    }
    if ( $slug ) {
        return array( 'route' => 'player', 'slug' => $slug );
    }

    $request = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '';
    $path    = trim( parse_url( $request, PHP_URL_PATH ), '/' );

    if ( preg_match( '#^nfl/players/([^/]+)$#', $path, $m ) ) {
        return array( 'route' => 'player', 'slug' => $m[1] );
    }
    if ( preg_match( '#^nfl/players/?$#', $path ) ) {
        return array( 'route' => 'index', 'slug' => '' );
    }

    return null;
}

function sc_parse_request_fallback( $wp ) {
    $request = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '';
    $path    = trim( parse_url( $request, PHP_URL_PATH ), '/' );

    if ( preg_match( '#^nfl/players/([^/]+)$#', $path, $m ) ) {
        $wp->query_vars['sc_player_slug'] = $m[1];
        unset( $wp->query_vars['pagename'], $wp->query_vars['name'], $wp->query_vars['page_id'] );
    } elseif ( preg_match( '#^nfl/players/?$#', $path ) ) {
        $wp->query_vars['sc_players_index'] = '1';
        unset( $wp->query_vars['pagename'], $wp->query_vars['name'], $wp->query_vars['page_id'] );
    }
}

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

function sc_register_rewrite_rules() {
    add_rewrite_rule(
        '^nfl/players/([^/]+)/?$',
        'index.php?sc_player_slug=$matches[1]',
        'top'
    );
    add_rewrite_rule(
        '^nfl/players/?$',
        'index.php?sc_players_index=1',
        'top'
    );
}

function sc_register_query_vars( $vars ) {
    $vars[] = 'sc_player_slug';
    $vars[] = 'sc_players_index';
    return $vars;
}

function sc_hijack_query( $query ) {
    if ( is_admin() ) return;
    if ( ! $query->is_main_query() ) return;

    $r = sc_detect_route();
    if ( ! $r ) return;

    if ( $r['route'] === 'player' && $r['slug'] ) {
        $player = sc_get_player_by_slug( $r['slug'] );
        if ( ! $player ) {
            $query->set_404();
            status_header( 404 );
            return;
        }
    }

    $container_id = (int) get_option( 'scpp_container_page_id', 0 );
    $container_post = $container_id ? get_post( $container_id ) : null;

    if ( ! $container_post || $container_post->post_type !== 'page' || $container_post->post_status !== 'publish' ) {
        $query->set_404();
        status_header( 404 );
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

function sc_force_container_posts( $posts, $query ) {
    if ( is_admin() ) return $posts;
    if ( ! $query->is_main_query() ) return $posts;

    $r = sc_detect_route();
    if ( ! $r ) return $posts;

    $container_id = (int) get_option( 'scpp_container_page_id', 0 );
    $container_post = $container_id ? get_post( $container_id ) : null;

    if ( ! $container_post || $container_post->post_type !== 'page' || $container_post->post_status !== 'publish' ) {
        $query->set_404();
        return $posts;
    }

    $query->posts       = array( $container_post );
    $query->post        = $container_post;
    $query->found_posts = 1;
    $query->post_count  = 1;
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

function sc_inject_content( $content ) {
    $r = sc_detect_route();
    if ( ! $r ) return $content;

    $container_id = (int) get_option( 'scpp_container_page_id', 0 );
    if ( ! $container_id ) return $content;

    if ( ! is_page() ) return $content;
    if ( (int) get_queried_object_id() !== $container_id ) return $content;
    if ( ! in_the_loop() ) return $content;

    $route = $r['route'];
    $slug  = $r['slug'];

    $debug = '<!-- SCPP v0.3.0: container page ID=' . $container_id . ', route=' . esc_html( $route );
    if ( $slug ) {
        $debug .= ', slug=' . esc_html( $slug );
    }
    $debug .= ' -->';

    if ( $route === 'index' ) {
        ob_start();
        include SC_PLUGIN_DIR . 'templates/index.php';
        return $debug . "\n" . ob_get_clean();
    }

    if ( $route === 'player' && $slug ) {
        $player = sc_get_player_by_slug( $slug );
        if ( $player ) {
            set_query_var( 'sc_player', $player );
            ob_start();
            include SC_PLUGIN_DIR . 'templates/player.php';
            return $debug . "\n" . ob_get_clean();
        }
    }

    return $content;
}

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
