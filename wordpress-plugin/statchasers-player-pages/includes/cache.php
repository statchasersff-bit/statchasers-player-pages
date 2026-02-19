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

function sc_get_game_logs_dir() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/game_logs/';
}

function sc_get_game_log_path( $season ) {
    return sc_get_game_logs_dir() . $season . '.json';
}

function sc_get_game_scores_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/game_scores.json';
}

function sc_get_available_seasons() {
    $dir = sc_get_game_logs_dir();
    if ( ! is_dir( $dir ) ) return array();
    $files = scandir( $dir );
    $seasons = array();
    foreach ( $files as $f ) {
        if ( substr( $f, -5 ) === '.json' ) {
            $year = intval( str_replace( '.json', '', $f ) );
            if ( $year > 0 ) $seasons[] = $year;
        }
    }
    rsort( $seasons );
    return $seasons;
}

function sc_load_game_logs( $season ) {
    static $cache = array();
    if ( isset( $cache[ $season ] ) ) return $cache[ $season ];
    $path = sc_get_game_log_path( $season );
    if ( ! file_exists( $path ) ) {
        $cache[ $season ] = array();
        return $cache[ $season ];
    }
    $data = json_decode( file_get_contents( $path ), true );
    $cache[ $season ] = is_array( $data ) ? $data : array();
    return $cache[ $season ];
}

function sc_load_game_scores() {
    static $cache = null;
    if ( null !== $cache ) return $cache;
    $path = sc_get_game_scores_path();
    if ( ! file_exists( $path ) ) {
        $cache = array();
        return $cache;
    }
    $data = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : array();
    return $cache;
}

function sc_get_game_score( $season, $team, $week ) {
    if ( empty( $team ) ) return null;
    $scores = sc_load_game_scores();
    $season_scores = isset( $scores[ (string) $season ] ) ? $scores[ (string) $season ] : null;
    if ( ! $season_scores ) return null;
    $normalized = sc_normalize_team( $team );
    $key = $normalized . '_' . $week;
    if ( ! isset( $season_scores[ $key ] ) ) return null;
    $entry = $season_scores[ $key ];
    return array(
        'r'   => isset( $entry['r'] ) ? $entry['r'] : null,
        'tm'  => isset( $entry['tm'] ) ? (int) $entry['tm'] : 0,
        'opp' => isset( $entry['opp'] ) ? (int) $entry['opp'] : 0,
    );
}

function sc_compute_ppr_points_raw( $s ) {
    $pts = 0;
    $pts += ( isset( $s['pass_yd'] ) ? $s['pass_yd'] : 0 ) * 0.04;
    $pts += ( isset( $s['pass_td'] ) ? $s['pass_td'] : 0 ) * 4;
    $pts += ( isset( $s['pass_int'] ) ? $s['pass_int'] : 0 ) * -1;
    $pts += ( isset( $s['rush_yd'] ) ? $s['rush_yd'] : 0 ) * 0.1;
    $pts += ( isset( $s['rush_td'] ) ? $s['rush_td'] : 0 ) * 6;
    $pts += ( isset( $s['rec'] ) ? $s['rec'] : 0 ) * 1;
    $pts += ( isset( $s['rec_yd'] ) ? $s['rec_yd'] : 0 ) * 0.1;
    $pts += ( isset( $s['rec_td'] ) ? $s['rec_td'] : 0 ) * 6;
    $pts += ( isset( $s['fum_lost'] ) ? $s['fum_lost'] : 0 ) * -2;
    $pts += ( isset( $s['pass_2pt'] ) ? $s['pass_2pt'] : 0 ) * 2;
    $pts += ( isset( $s['rush_2pt'] ) ? $s['rush_2pt'] : 0 ) * 2;
    $pts += ( isset( $s['rec_2pt'] ) ? $s['rec_2pt'] : 0 ) * 2;
    return round( $pts * 100 ) / 100;
}

function sc_extract_player_stats( $stats, $position ) {
    $s = is_array( $stats ) ? $stats : array();
    $pts_ppr = isset( $s['pts_ppr'] ) ? $s['pts_ppr'] : sc_compute_ppr_points_raw( $s );
    $pts_half = isset( $s['pts_half_ppr'] ) ? $s['pts_half_ppr'] : null;
    $base = array( 'pts_ppr' => $pts_ppr, 'pts_half_ppr' => $pts_half );

    if ( $position === 'QB' ) {
        return array_merge( $base, array(
            'pass_att' => isset( $s['pass_att'] ) ? $s['pass_att'] : 0,
            'pass_cmp' => isset( $s['pass_cmp'] ) ? $s['pass_cmp'] : 0,
            'pass_yd'  => isset( $s['pass_yd'] ) ? $s['pass_yd'] : 0,
            'pass_td'  => isset( $s['pass_td'] ) ? $s['pass_td'] : 0,
            'pass_int' => isset( $s['pass_int'] ) ? $s['pass_int'] : 0,
            'rush_att' => isset( $s['rush_att'] ) ? $s['rush_att'] : 0,
            'rush_yd'  => isset( $s['rush_yd'] ) ? $s['rush_yd'] : 0,
            'rush_td'  => isset( $s['rush_td'] ) ? $s['rush_td'] : 0,
        ) );
    }

    if ( $position === 'RB' ) {
        return array_merge( $base, array(
            'rush_att' => isset( $s['rush_att'] ) ? $s['rush_att'] : 0,
            'rush_yd'  => isset( $s['rush_yd'] ) ? $s['rush_yd'] : 0,
            'rush_td'  => isset( $s['rush_td'] ) ? $s['rush_td'] : 0,
            'rec_tgt'  => isset( $s['rec_tgt'] ) ? $s['rec_tgt'] : 0,
            'rec'      => isset( $s['rec'] ) ? $s['rec'] : 0,
            'rec_yd'   => isset( $s['rec_yd'] ) ? $s['rec_yd'] : 0,
            'rec_td'   => isset( $s['rec_td'] ) ? $s['rec_td'] : 0,
        ) );
    }

    if ( $position === 'WR' || $position === 'TE' ) {
        return array_merge( $base, array(
            'rec_tgt'  => isset( $s['rec_tgt'] ) ? $s['rec_tgt'] : 0,
            'rec'      => isset( $s['rec'] ) ? $s['rec'] : 0,
            'rec_yd'   => isset( $s['rec_yd'] ) ? $s['rec_yd'] : 0,
            'rec_td'   => isset( $s['rec_td'] ) ? $s['rec_td'] : 0,
            'rush_att' => isset( $s['rush_att'] ) ? $s['rush_att'] : 0,
            'rush_yd'  => isset( $s['rush_yd'] ) ? $s['rush_yd'] : 0,
            'rush_td'  => isset( $s['rush_td'] ) ? $s['rush_td'] : 0,
        ) );
    }

    if ( $position === 'K' ) {
        return array_merge( $base, array(
            'fgm'     => isset( $s['fgm'] ) ? $s['fgm'] : 0,
            'fga'     => isset( $s['fga'] ) ? $s['fga'] : 0,
            'fgm_lng' => isset( $s['fgm_lng'] ) ? $s['fgm_lng'] : 0,
            'xpm'     => isset( $s['xpm'] ) ? $s['xpm'] : 0,
            'xpa'     => isset( $s['xpa'] ) ? $s['xpa'] : 0,
        ) );
    }

    return $base;
}

function sc_fetch_game_logs( $seasons = array( 2023, 2024, 2025 ) ) {
    $players = sc_get_players();
    if ( empty( $players ) ) {
        error_log( 'StatChasers: No players loaded for game log fetch.' );
        return false;
    }

    $player_map = array();
    foreach ( $players as $p ) {
        $player_map[ $p['id'] ] = $p;
    }

    $valid_positions = array( 'QB', 'RB', 'WR', 'TE', 'K' );
    $logs_dir = sc_get_game_logs_dir();
    if ( ! file_exists( $logs_dir ) ) {
        wp_mkdir_p( $logs_dir );
    }

    foreach ( $seasons as $season ) {
        $season_data = array();

        for ( $week = 1; $week <= 18; $week++ ) {
            $url = 'https://api.sleeper.com/stats/nfl/' . $season . '/' . $week . '?season_type=regular';
            $response = wp_remote_get( $url, array( 'timeout' => 60 ) );

            if ( is_wp_error( $response ) ) {
                error_log( 'StatChasers: Failed to fetch ' . $url . ' - ' . $response->get_error_message() );
                continue;
            }

            $body = wp_remote_retrieve_body( $response );
            $week_data = json_decode( $body, true );
            if ( ! is_array( $week_data ) ) continue;

            foreach ( $week_data as $entry ) {
                $player_id = isset( $entry['player_id'] ) ? (string) $entry['player_id'] : '';
                if ( empty( $player_id ) ) continue;

                $player = isset( $player_map[ $player_id ] ) ? $player_map[ $player_id ] : null;
                if ( ! $player ) continue;

                $position = isset( $player['position'] ) ? $player['position'] : '';
                if ( ! in_array( $position, $valid_positions, true ) ) continue;

                $stats = isset( $entry['stats'] ) ? $entry['stats'] : array();
                if ( empty( $stats ) ) continue;
                if ( ! isset( $stats['gp'] ) && $stats['gp'] !== 0 ) continue;

                $opp = sc_normalize_team( isset( $entry['opponent'] ) ? $entry['opponent'] : '' );
                $extracted = sc_extract_player_stats( $stats, $position );

                if ( ! isset( $season_data[ $player_id ] ) ) {
                    $season_data[ $player_id ] = array();
                }
                $season_data[ $player_id ][] = array(
                    'week' => $week,
                    'opp'  => ! empty( $opp ) && $opp !== 'FA' ? $opp : "\xE2\x80\x94",
                    'stats' => $extracted,
                );
            }

            usleep( 250000 );
        }

        $out_path = sc_get_game_log_path( $season );
        file_put_contents( $out_path, wp_json_encode( $season_data ) );
    }

    update_option( 'sc_gamelogs_last_fetch', current_time( 'mysql' ) );
    return true;
}

function sc_fetch_game_scores( $seasons = array( 2023, 2024, 2025 ) ) {
    $all_scores = array();

    foreach ( $seasons as $season ) {
        $season_scores = array();

        for ( $week = 1; $week <= 18; $week++ ) {
            $url = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=' . $season . '&seasontype=2&week=' . $week . '&limit=100';
            $response = wp_remote_get( $url, array( 'timeout' => 60 ) );

            if ( is_wp_error( $response ) ) {
                error_log( 'StatChasers: Failed to fetch ESPN scores - ' . $response->get_error_message() );
                continue;
            }

            $body = wp_remote_retrieve_body( $response );
            $data = json_decode( $body, true );
            if ( ! is_array( $data ) || ! isset( $data['events'] ) ) continue;

            foreach ( $data['events'] as $event ) {
                $comp = isset( $event['competitions'][0] ) ? $event['competitions'][0] : null;
                if ( ! $comp ) continue;

                $competitors = isset( $comp['competitors'] ) ? $comp['competitors'] : array();
                if ( count( $competitors ) !== 2 ) continue;

                $home = null;
                $away = null;
                foreach ( $competitors as $c ) {
                    if ( isset( $c['homeAway'] ) && $c['homeAway'] === 'home' ) $home = $c;
                    if ( isset( $c['homeAway'] ) && $c['homeAway'] === 'away' ) $away = $c;
                }
                if ( ! $home || ! $away ) continue;

                $home_team  = sc_normalize_team( isset( $home['team']['abbreviation'] ) ? $home['team']['abbreviation'] : '' );
                $away_team  = sc_normalize_team( isset( $away['team']['abbreviation'] ) ? $away['team']['abbreviation'] : '' );
                $home_score = isset( $home['score'] ) ? (int) $home['score'] : 0;
                $away_score = isset( $away['score'] ) ? (int) $away['score'] : 0;

                if ( $home_team && $home_team !== 'FA' ) {
                    $key = $home_team . '_' . $week;
                    $season_scores[ $key ] = array(
                        'tm'  => $home_score,
                        'opp' => $away_score,
                        'r'   => $home_score > $away_score ? 'W' : ( $home_score < $away_score ? 'L' : 'T' ),
                    );
                }

                if ( $away_team && $away_team !== 'FA' ) {
                    $key = $away_team . '_' . $week;
                    $season_scores[ $key ] = array(
                        'tm'  => $away_score,
                        'opp' => $home_score,
                        'r'   => $away_score > $home_score ? 'W' : ( $away_score < $home_score ? 'L' : 'T' ),
                    );
                }
            }

            usleep( 250000 );
        }

        $all_scores[ (string) $season ] = $season_scores;
    }

    $out_path = sc_get_game_scores_path();
    $sc_dir = dirname( $out_path );
    if ( ! file_exists( $sc_dir ) ) {
        wp_mkdir_p( $sc_dir );
    }
    file_put_contents( $out_path, wp_json_encode( $all_scores ) );
    update_option( 'sc_gamescores_last_fetch', current_time( 'mysql' ) );
    return true;
}

function sc_compute_fantasy_points( $stats, $format = 'ppr' ) {
    $pts = 0;
    $pts += ( isset( $stats['pass_yd'] ) ? $stats['pass_yd'] : 0 ) * 0.04;
    $pts += ( isset( $stats['pass_td'] ) ? $stats['pass_td'] : 0 ) * 4;
    $pts += ( isset( $stats['pass_int'] ) ? $stats['pass_int'] : 0 ) * -1;
    $pts += ( isset( $stats['rush_yd'] ) ? $stats['rush_yd'] : 0 ) * 0.1;
    $pts += ( isset( $stats['rush_td'] ) ? $stats['rush_td'] : 0 ) * 6;
    $pts += ( isset( $stats['rec_yd'] ) ? $stats['rec_yd'] : 0 ) * 0.1;
    $pts += ( isset( $stats['rec_td'] ) ? $stats['rec_td'] : 0 ) * 6;
    $pts += ( isset( $stats['fgm'] ) ? $stats['fgm'] : 0 ) * 3;
    $pts += ( isset( $stats['xpm'] ) ? $stats['xpm'] : 0 ) * 1;
    if ( $format === 'ppr' ) {
        $pts += ( isset( $stats['rec'] ) ? $stats['rec'] : 0 ) * 1;
    } elseif ( $format === 'half' ) {
        $pts += ( isset( $stats['rec'] ) ? $stats['rec'] : 0 ) * 0.5;
    }
    return round( $pts * 100 ) / 100;
}

function sc_get_entry_points( $stats, $format = 'ppr' ) {
    if ( $format === 'ppr' && isset( $stats['pts_ppr'] ) ) return $stats['pts_ppr'];
    if ( $format === 'half' && isset( $stats['pts_half_ppr'] ) && $stats['pts_half_ppr'] !== null ) return $stats['pts_half_ppr'];
    return sc_compute_fantasy_points( $stats, $format );
}

function sc_has_participation( $stats, $position ) {
    if ( $position === 'QB' ) {
        return ( isset( $stats['pass_att'] ) ? $stats['pass_att'] : 0 ) > 0
            || ( isset( $stats['rush_att'] ) ? $stats['rush_att'] : 0 ) > 0;
    }
    if ( $position === 'K' ) {
        return ( isset( $stats['fga'] ) ? $stats['fga'] : 0 ) > 0
            || ( isset( $stats['xpa'] ) ? $stats['xpa'] : 0 ) > 0;
    }
    return ( isset( $stats['rec_tgt'] ) ? $stats['rec_tgt'] : 0 ) > 0
        || ( isset( $stats['rec'] ) ? $stats['rec'] : 0 ) > 0
        || ( isset( $stats['rush_att'] ) ? $stats['rush_att'] : 0 ) > 0
        || ( isset( $stats['pass_att'] ) ? $stats['pass_att'] : 0 ) > 0;
}

function sc_get_bye_weeks() {
    return array();
}

function sc_fill_missing_weeks( $entries, $team, $season, $max_week = 18 ) {
    $existing = array();
    foreach ( $entries as &$e ) {
        $existing[ $e['week'] ] = true;
        $e['game_status'] = 'active';
        $e['score'] = sc_get_game_score( $season, $team, $e['week'] );
    }
    unset( $e );

    for ( $w = 1; $w <= $max_week; $w++ ) {
        if ( isset( $existing[ $w ] ) ) continue;
        $entries[] = array(
            'week'        => $w,
            'opp'         => "\xE2\x80\x94",
            'stats'       => array( 'pts_ppr' => 0 ),
            'game_status' => 'out',
            'score'       => null,
        );
    }

    usort( $entries, function( $a, $b ) {
        return $a['week'] - $b['week'];
    } );

    return $entries;
}

function sc_build_weekly_ranks( $season, $all_logs, $players, $format = 'ppr' ) {
    static $cache = array();
    $cache_key = $season . '_' . $format;
    if ( isset( $cache[ $cache_key ] ) ) return $cache[ $cache_key ];

    $player_pos = array();
    foreach ( $players as $p ) {
        if ( ! empty( $p['position'] ) ) {
            $player_pos[ $p['id'] ] = $p['position'];
        }
    }

    $week_pos_buckets = array();
    foreach ( $all_logs as $player_id => $entries ) {
        $pos = isset( $player_pos[ $player_id ] ) ? $player_pos[ $player_id ] : null;
        if ( ! $pos ) continue;
        foreach ( $entries as $entry ) {
            $stats = isset( $entry['stats'] ) ? $entry['stats'] : array();
            if ( ! sc_has_participation( $stats, $pos ) ) continue;
            $week = $entry['week'];
            if ( ! isset( $week_pos_buckets[ $week ] ) ) $week_pos_buckets[ $week ] = array();
            if ( ! isset( $week_pos_buckets[ $week ][ $pos ] ) ) $week_pos_buckets[ $week ][ $pos ] = array();
            $week_pos_buckets[ $week ][ $pos ][] = array(
                'id'  => $player_id,
                'pts' => sc_get_entry_points( $stats, $format ),
            );
        }
    }

    $ranks = array();
    foreach ( $week_pos_buckets as $week => $pos_buckets ) {
        foreach ( $pos_buckets as $pos => $bucket ) {
            usort( $bucket, function( $a, $b ) {
                if ( $b['pts'] == $a['pts'] ) return 0;
                return $b['pts'] > $a['pts'] ? 1 : -1;
            } );
            foreach ( $bucket as $i => $item ) {
                if ( ! isset( $ranks[ $item['id'] ] ) ) $ranks[ $item['id'] ] = array();
                $ranks[ $item['id'] ][ $week ] = $i + 1;
            }
        }
    }

    $cache[ $cache_key ] = $ranks;
    return $ranks;
}

function sc_build_opp_ranks( $season, $all_logs, $players, $format = 'ppr' ) {
    static $cache = array();
    $cache_key = $season . '_' . $format;
    if ( isset( $cache[ $cache_key ] ) ) return $cache[ $cache_key ];

    $player_info = array();
    foreach ( $players as $p ) {
        if ( ! empty( $p['position'] ) && ! empty( $p['team'] ) ) {
            $player_info[ $p['id'] ] = array( 'position' => $p['position'], 'team' => $p['team'] );
        }
    }

    $opp_pts = array();
    foreach ( $all_logs as $player_id => $entries ) {
        $info = isset( $player_info[ $player_id ] ) ? $player_info[ $player_id ] : null;
        if ( ! $info ) continue;
        $pos = $info['position'];
        foreach ( $entries as $entry ) {
            $stats = isset( $entry['stats'] ) ? $entry['stats'] : array();
            if ( ! sc_has_participation( $stats, $pos ) ) continue;
            $opp = sc_normalize_team( isset( $entry['opp'] ) ? $entry['opp'] : '' );
            if ( empty( $opp ) || $opp === 'FA' ) continue;
            $key = $opp . ':' . $pos;
            if ( ! isset( $opp_pts[ $key ] ) ) $opp_pts[ $key ] = array();
            $opp_pts[ $key ][] = sc_get_entry_points( $stats, $format );
        }
    }

    $pos_groups = array();
    foreach ( $opp_pts as $key => $pts_arr ) {
        $parts = explode( ':', $key );
        $team = $parts[0];
        $pos  = $parts[1];
        $avg  = array_sum( $pts_arr ) / count( $pts_arr );
        if ( ! isset( $pos_groups[ $pos ] ) ) $pos_groups[ $pos ] = array();
        $pos_groups[ $pos ][] = array( 'team' => $team, 'avg' => $avg );
    }

    $rank_map = array();
    foreach ( $pos_groups as $pos => $teams ) {
        usort( $teams, function( $a, $b ) {
            if ( $a['avg'] == $b['avg'] ) return 0;
            return $a['avg'] < $b['avg'] ? -1 : 1;
        } );
        foreach ( $teams as $i => $t ) {
            $rank_map[ $t['team'] . ':' . $pos ] = $i + 1;
        }
    }

    $cache[ $cache_key ] = $rank_map;
    return $rank_map;
}
