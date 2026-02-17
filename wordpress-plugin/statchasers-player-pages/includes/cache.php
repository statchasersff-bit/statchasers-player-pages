<?php
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'SC_PLAYERS_OPTION', 'sc_players_data' );
define( 'SC_LAST_REFRESH_OPTION', 'sc_players_last_refresh' );
define( 'SC_PLAYERS_COUNT_OPTION', 'sc_players_count' );

function sc_get_json_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/players.json';
}

function sc_get_players() {
    static $cache = null;
    if ( null !== $cache ) {
        return $cache;
    }

    $json_path = sc_get_json_path();
    $raw = null;

    if ( file_exists( $json_path ) ) {
        $raw = file_get_contents( $json_path );
    }

    if ( empty( $raw ) ) {
        $raw = get_option( SC_PLAYERS_OPTION, '' );
    }

    if ( ! empty( $raw ) ) {
        $cache = json_decode( $raw, true );
        if ( is_array( $cache ) ) {
            return $cache;
        }
    }

    $cache = array();
    return $cache;
}

function sc_get_players_by_slug() {
    static $map = null;
    if ( null !== $map ) {
        return $map;
    }
    $map = array();
    foreach ( sc_get_players() as $p ) {
        $map[ $p['slug'] ] = $p;
    }
    return $map;
}

function sc_get_player_by_slug( $slug ) {
    $map = sc_get_players_by_slug();
    return isset( $map[ $slug ] ) ? $map[ $slug ] : null;
}

function sc_build_slug( $name ) {
    if ( empty( $name ) ) return '';
    $slug = strtolower( $name );
    $slug = preg_replace( '/[^a-z0-9\s-]/', '', $slug );
    $slug = preg_replace( '/\s+/', '-', $slug );
    $slug = preg_replace( '/-+/', '-', $slug );
    return trim( $slug, '-' );
}

function sc_refresh_players_data() {
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
        $slug = sc_build_slug( $name );
        if ( empty( $slug ) ) continue;

        if ( isset( $slug_set[ $slug ] ) ) {
            $slug = $slug . '-' . $player_id;
        }
        $slug_set[ $slug ] = true;

        $players[] = array(
            'id'            => (string) $player_id,
            'name'          => $name,
            'slug'          => $slug,
            'position'      => isset( $p['position'] ) ? $p['position'] : null,
            'team'          => isset( $p['team'] ) ? $p['team'] : 'FA',
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
        if ( $pa !== $pb ) return $pa - $pb;
        return strcmp( $a['name'], $b['name'] );
    } );

    $upload_dir = wp_upload_dir();
    $sc_dir = $upload_dir['basedir'] . '/statchasers';
    if ( ! file_exists( $sc_dir ) ) {
        wp_mkdir_p( $sc_dir );
    }

    $json_data = wp_json_encode( $players );
    $written = file_put_contents( $sc_dir . '/players.json', $json_data );

    if ( false === $written ) {
        error_log( 'StatChasers: Failed to write players.json. Falling back to WP options.' );
        update_option( SC_PLAYERS_OPTION, $json_data, false );
    }

    update_option( SC_LAST_REFRESH_OPTION, current_time( 'mysql' ) );
    update_option( SC_PLAYERS_COUNT_OPTION, count( $players ) );

    return true;
}
