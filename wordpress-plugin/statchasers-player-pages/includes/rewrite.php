<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', 'sc_register_rewrite_rules' );
add_filter( 'query_vars', 'sc_register_query_vars' );
add_action( 'template_redirect', 'sc_load_custom_template' );
add_filter( 'body_class', 'sc_add_body_class' );

function sc_add_body_class( $classes ) {
    if ( get_query_var( 'sc_player_slug' ) || get_query_var( 'sc_players_index' ) ) {
        $classes[] = 'sc-players-page';
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

function sc_load_custom_template() {
    $slug = get_query_var( 'sc_player_slug' );
    $is_index = get_query_var( 'sc_players_index' );

    if ( $slug ) {
        $player = sc_get_player_by_slug( $slug );
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
