<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', 'sc_register_rewrite_rules' );
add_filter( 'query_vars', 'sc_register_query_vars' );
add_action( 'pre_get_posts', 'sc_hijack_query', 1 );
add_filter( 'the_content', 'sc_inject_content', 99 );
add_filter( 'body_class', 'sc_add_body_class' );

function sc_add_body_class( $classes ) {
    if ( get_query_var( 'sc_player_slug' ) || get_query_var( 'sc_players_index' ) ) {
        $classes[] = 'sc-players-page';
        $classes = array_diff( $classes, array( 'et_right_sidebar', 'et_left_sidebar' ) );
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
    if ( ! $query->is_main_query() || is_admin() ) {
        return;
    }

    $slug     = $query->get( 'sc_player_slug' );
    $is_index = $query->get( 'sc_players_index' );

    if ( ! $slug && ! $is_index ) {
        return;
    }

    if ( $slug ) {
        $player = sc_get_player_by_slug( $slug );
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

    $query->is_page     = true;
    $query->is_singular = true;
    $query->is_single   = false;
    $query->is_home     = false;
    $query->is_archive  = false;
    $query->is_404      = false;
    $query->is_category = false;
    $query->is_tag      = false;

    $query->queried_object    = $container_post;
    $query->queried_object_id = $container_post->ID;

    $query->posts      = array( $container_post );
    $query->post       = $container_post;
    $query->found_posts = 1;
    $query->post_count  = 1;

    $query->set( 'page_id', $container_post->ID );
    $query->set( 'post_type', 'page' );

    global $post;
    $post = $container_post;
    setup_postdata( $post );
}

function sc_inject_content( $content ) {
    if ( ! is_main_query() || ! in_the_loop() ) {
        return $content;
    }

    $slug     = get_query_var( 'sc_player_slug' );
    $is_index = get_query_var( 'sc_players_index' );

    if ( $is_index ) {
        ob_start();
        include SC_PLUGIN_DIR . 'templates/index.php';
        return ob_get_clean();
    }

    if ( $slug ) {
        $player = sc_get_player_by_slug( $slug );
        if ( $player ) {
            set_query_var( 'sc_player', $player );
            ob_start();
            include SC_PLUGIN_DIR . 'templates/player.php';
            return ob_get_clean();
        }
    }

    return $content;
}
