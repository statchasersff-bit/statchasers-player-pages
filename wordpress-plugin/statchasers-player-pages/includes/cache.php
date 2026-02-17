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

function sc_get_team_alias_map() {
    return array(
        'JAC' => 'JAX',
        'WSH' => 'WAS',
        'OAK' => 'LV',
        'STL' => 'LAR',
        'SD'  => 'LAC',
        'LA'  => 'LAR',
    );
}

function sc_normalize_team( $abbr ) {
    if ( empty( $abbr ) ) return 'FA';
    $upper = strtoupper( trim( $abbr ) );
    $aliases = sc_get_team_alias_map();
    return isset( $aliases[ $upper ] ) ? $aliases[ $upper ] : $upper;
}

function sc_get_team_full_names() {
    return array(
        'ARI' => 'Arizona Cardinals', 'ATL' => 'Atlanta Falcons', 'BAL' => 'Baltimore Ravens',
        'BUF' => 'Buffalo Bills', 'CAR' => 'Carolina Panthers', 'CHI' => 'Chicago Bears',
        'CIN' => 'Cincinnati Bengals', 'CLE' => 'Cleveland Browns', 'DAL' => 'Dallas Cowboys',
        'DEN' => 'Denver Broncos', 'DET' => 'Detroit Lions', 'GB' => 'Green Bay Packers',
        'HOU' => 'Houston Texans', 'IND' => 'Indianapolis Colts', 'JAX' => 'Jacksonville Jaguars',
        'KC' => 'Kansas City Chiefs', 'LAC' => 'Los Angeles Chargers', 'LAR' => 'Los Angeles Rams',
        'LV' => 'Las Vegas Raiders', 'MIA' => 'Miami Dolphins', 'MIN' => 'Minnesota Vikings',
        'NE' => 'New England Patriots', 'NO' => 'New Orleans Saints', 'NYG' => 'New York Giants',
        'NYJ' => 'New York Jets', 'PHI' => 'Philadelphia Eagles', 'PIT' => 'Pittsburgh Steelers',
        'SEA' => 'Seattle Seahawks', 'SF' => 'San Francisco 49ers', 'TB' => 'Tampa Bay Buccaneers',
        'TEN' => 'Tennessee Titans', 'WAS' => 'Washington Commanders',
    );
}

function sc_normalize_name( $name ) {
    if ( empty( $name ) ) return '';
    $name = str_replace(
        array( "\xE2\x80\x98", "\xE2\x80\x99", "\xE2\x80\x9A", "\xE2\x80\x9B", "\x60", "\xC2\xB4" ),
        "'",
        $name
    );
    $name = str_replace(
        array( "\xE2\x80\x9C", "\xE2\x80\x9D", "\xE2\x80\x9E", "\xE2\x80\x9F" ),
        '"',
        $name
    );
    $name = str_replace( array( "\xE2\x80\x93", "\xE2\x80\x94" ), '-', $name );
    return trim( $name );
}

function sc_build_slug( $name ) {
    if ( empty( $name ) ) return '';
    $slug = strtolower( $name );
    $slug = preg_replace( "/[''`\xC2\xB4\xE2\x80\x98\xE2\x80\x99\xE2\x80\x9A\xE2\x80\x9B]/", '', $slug );
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
    $teams_with_def = array();

    foreach ( $players_map as $player_id => $p ) {
        if ( empty( $p['full_name'] ) && ( ! isset( $p['position'] ) || $p['position'] !== 'DEF' ) ) {
            continue;
        }
        if ( ! isset( $p['position'] ) || ! in_array( $p['position'], $valid_positions, true ) ) {
            continue;
        }

        $raw_name = isset( $p['full_name'] ) ? $p['full_name'] : trim( ( isset( $p['first_name'] ) ? $p['first_name'] : '' ) . ' ' . ( isset( $p['last_name'] ) ? $p['last_name'] : '' ) );
        $name = sc_normalize_name( $raw_name );
        $slug = sc_build_slug( $name );
        if ( empty( $slug ) ) continue;

        if ( isset( $slug_set[ $slug ] ) ) {
            $slug = $slug . '-' . $player_id;
        }
        $slug_set[ $slug ] = true;

        $team = sc_normalize_team( isset( $p['team'] ) ? $p['team'] : '' );

        if ( $p['position'] === 'DEF' && $team !== 'FA' ) {
            $teams_with_def[ $team ] = true;
        }

        $players[] = array(
            'id'            => (string) $player_id,
            'name'          => $name,
            'slug'          => $slug,
            'position'      => isset( $p['position'] ) ? $p['position'] : null,
            'team'          => $team,
            'status'        => isset( $p['status'] ) ? $p['status'] : null,
            'injury_status' => isset( $p['injury_status'] ) ? $p['injury_status'] : null,
            'age'              => isset( $p['age'] ) ? $p['age'] : null,
            'height'           => isset( $p['height'] ) ? $p['height'] : null,
            'weight'           => isset( $p['weight'] ) ? $p['weight'] : null,
            'depth_chart_order' => isset( $p['depth_chart_order'] ) ? $p['depth_chart_order'] : null,
            'years_exp'        => isset( $p['years_exp'] ) ? $p['years_exp'] : null,
        );
    }

    $nfl_teams_list = array_keys( sc_get_team_full_names() );
    $full_names = sc_get_team_full_names();
    foreach ( $nfl_teams_list as $t ) {
        if ( ! isset( $teams_with_def[ $t ] ) ) {
            $def_name = isset( $full_names[ $t ] ) ? $full_names[ $t ] : $t;
            $def_slug = sc_build_slug( $def_name );
            if ( ! isset( $slug_set[ $def_slug ] ) ) {
                $slug_set[ $def_slug ] = true;
                $players[] = array(
                    'id'               => 'DEF-' . $t,
                    'name'             => $def_name,
                    'slug'             => $def_slug,
                    'position'         => 'DEF',
                    'team'             => $t,
                    'status'           => 'Active',
                    'injury_status'    => null,
                    'age'              => null,
                    'height'           => null,
                    'weight'           => null,
                    'depth_chart_order' => 1,
                    'years_exp'        => null,
                );
            }
        }
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

function sc_get_indexed_json_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/indexed_players.json';
}

function sc_get_indexed_by_team_json_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/indexed_players_by_team.json';
}

function sc_get_indexed_slugs() {
    static $cache = null;
    if ( null !== $cache ) {
        return $cache;
    }

    $path = sc_get_indexed_json_path();
    if ( ! file_exists( $path ) ) {
        $cache = array();
        return $cache;
    }

    $raw = file_get_contents( $path );
    $data = json_decode( $raw, true );
    if ( is_array( $data ) && isset( $data['slugs'] ) && is_array( $data['slugs'] ) ) {
        $cache = $data['slugs'];
    } else {
        $cache = array();
    }

    return $cache;
}

function sc_get_indexed_by_team() {
    static $cache = null;
    if ( null !== $cache ) {
        return $cache;
    }

    $path = sc_get_indexed_by_team_json_path();
    if ( ! file_exists( $path ) ) {
        $cache = array();
        return $cache;
    }

    $raw = file_get_contents( $path );
    $data = json_decode( $raw, true );
    if ( is_array( $data ) ) {
        $cache = $data;
    } else {
        $cache = array();
    }

    return $cache;
}

function sc_generate_indexed_players() {
    $players = sc_get_players();
    if ( empty( $players ) ) {
        return false;
    }

    $position_limits = array(
        'QB'  => 2,
        'RB'  => 2,
        'WR'  => 3,
        'TE'  => 2,
        'K'   => 1,
        'DEF' => 1,
    );

    $nfl_teams = array_keys( sc_get_team_full_names() );

    $team_players = array();
    foreach ( $players as $p ) {
        $team = sc_normalize_team( isset( $p['team'] ) ? $p['team'] : '' );
        $pos  = isset( $p['position'] ) ? $p['position'] : '';
        if ( empty( $team ) || $team === 'FA' || ! in_array( $team, $nfl_teams, true ) ) {
            continue;
        }
        if ( ! isset( $position_limits[ $pos ] ) ) {
            continue;
        }
        if ( ! isset( $team_players[ $team ] ) ) {
            $team_players[ $team ] = array();
        }
        if ( ! isset( $team_players[ $team ][ $pos ] ) ) {
            $team_players[ $team ][ $pos ] = array();
        }
        $team_players[ $team ][ $pos ][] = $p;
    }

    $all_slugs = array();
    $by_team = array();
    $counts = array( 'total' => 0, 'QB' => 0, 'RB' => 0, 'WR' => 0, 'TE' => 0, 'K' => 0, 'DEF' => 0 );

    foreach ( $nfl_teams as $team ) {
        $by_team[ $team ] = array();
        foreach ( $position_limits as $pos => $limit ) {
            if ( ! isset( $team_players[ $team ][ $pos ] ) || empty( $team_players[ $team ][ $pos ] ) ) {
                $by_team[ $team ][ $pos ] = array();
                continue;
            }

            $group = $team_players[ $team ][ $pos ];

            usort( $group, function ( $a, $b ) {
                $a_dco = isset( $a['depth_chart_order'] ) ? $a['depth_chart_order'] : null;
                $b_dco = isset( $b['depth_chart_order'] ) ? $b['depth_chart_order'] : null;
                if ( $a_dco === null && $b_dco === null ) {
                } elseif ( $a_dco === null ) {
                    return 1;
                } elseif ( $b_dco === null ) {
                    return -1;
                } elseif ( $a_dco !== $b_dco ) {
                    return $a_dco - $b_dco;
                }

                $a_active = ( isset( $a['status'] ) && $a['status'] === 'Active' ) ? 0 : 1;
                $b_active = ( isset( $b['status'] ) && $b['status'] === 'Active' ) ? 0 : 1;
                if ( $a_active !== $b_active ) {
                    return $a_active - $b_active;
                }

                $a_yrs = isset( $a['years_exp'] ) ? (int) $a['years_exp'] : 0;
                $b_yrs = isset( $b['years_exp'] ) ? (int) $b['years_exp'] : 0;
                if ( $a_yrs !== $b_yrs ) {
                    return $b_yrs - $a_yrs;
                }

                return strcmp( $a['name'], $b['name'] );
            } );

            $selected = array_slice( $group, 0, $limit );
            $pos_entries = array();

            foreach ( $selected as $rank => $p ) {
                $rank_label = $pos . ( $rank + 1 );
                $pos_entries[] = array(
                    'id'                => $p['id'],
                    'name'              => $p['name'],
                    'slug'              => $p['slug'],
                    'team'              => $p['team'],
                    'position'          => $p['position'],
                    'depth_chart_order' => isset( $p['depth_chart_order'] ) ? $p['depth_chart_order'] : null,
                    'years_exp'         => isset( $p['years_exp'] ) ? $p['years_exp'] : null,
                    'status'            => isset( $p['status'] ) ? $p['status'] : null,
                    'rank_label'        => $rank_label,
                );
                $all_slugs[] = $p['slug'];
                $counts[ $pos ]++;
                $counts['total']++;
            }

            $by_team[ $team ][ $pos ] = $pos_entries;
        }
    }

    $indexed_data = array(
        'generated_at' => current_time( 'mysql' ),
        'source'       => 'sleeper_depth_chart',
        'counts'       => $counts,
        'slugs'        => $all_slugs,
    );

    $upload_dir = wp_upload_dir();
    $sc_dir = $upload_dir['basedir'] . '/statchasers';
    if ( ! file_exists( $sc_dir ) ) {
        wp_mkdir_p( $sc_dir );
    }

    $written1 = file_put_contents( sc_get_indexed_json_path(), wp_json_encode( $indexed_data ) );
    $written2 = file_put_contents( sc_get_indexed_by_team_json_path(), wp_json_encode( $by_team ) );

    if ( false === $written1 || false === $written2 ) {
        error_log( 'StatChasers: Failed to write indexed player files.' );
        return false;
    }

    return true;
}
