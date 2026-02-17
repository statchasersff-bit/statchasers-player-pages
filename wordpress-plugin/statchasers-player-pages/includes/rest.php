<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'rest_api_init', 'sc_register_rest_routes' );

function sc_register_rest_routes() {
    register_rest_route( 'statchasers/v1', '/players', array(
        'methods'             => 'GET',
        'callback'            => 'sc_rest_search_players',
        'permission_callback' => '__return_true',
        'args'                => array(
            'q' => array(
                'required'          => false,
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '',
            ),
        ),
    ) );

    register_rest_route( 'statchasers/v1', '/indexed-players', array(
        'methods'             => 'GET',
        'callback'            => 'sc_rest_indexed_players',
        'permission_callback' => '__return_true',
    ) );
}

function sc_rest_search_players( $request ) {
    $q = strtolower( trim( $request->get_param( 'q' ) ) );
    $players = sc_get_players();
    $results = array();

    if ( empty( $q ) ) {
        foreach ( array_slice( $players, 0, 20 ) as $p ) {
            $results[] = array(
                'id'       => $p['id'],
                'name'     => $p['name'],
                'slug'     => $p['slug'],
                'team'     => $p['team'],
                'position' => $p['position'],
            );
        }
    } else {
        foreach ( $players as $p ) {
            $name_match = strpos( strtolower( $p['name'] ), $q ) !== false;
            $team_match = $p['team'] && strpos( strtolower( $p['team'] ), $q ) !== false;
            if ( $name_match || $team_match ) {
                $results[] = array(
                    'id'       => $p['id'],
                    'name'     => $p['name'],
                    'slug'     => $p['slug'],
                    'team'     => $p['team'],
                    'position' => $p['position'],
                );
                if ( count( $results ) >= 20 ) break;
            }
        }
    }

    return new WP_REST_Response( $results, 200 );
}

function sc_rest_indexed_players( $request ) {
    $slugs   = sc_get_indexed_slugs();
    $by_team = sc_get_indexed_by_team();

    return new WP_REST_Response( array(
        'slugs'  => $slugs,
        'byTeam' => $by_team,
    ), 200 );
}
