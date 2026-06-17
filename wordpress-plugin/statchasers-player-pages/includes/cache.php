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

    $valid_positions = array( 'QB', 'RB', 'WR', 'TE' );
    $players = array();
    $slug_set = array();

    foreach ( $players_map as $player_id => $p ) {
        if ( empty( $p['full_name'] ) ) {
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

    usort( $players, function ( $a, $b ) {
        $pos_order = array( 'QB' => 0, 'RB' => 1, 'WR' => 2, 'TE' => 3 );
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
        'RB'  => 4,
        'WR'  => 6,
        'TE'  => 3,
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
    $counts = array( 'total' => 0, 'QB' => 0, 'RB' => 0, 'WR' => 0, 'TE' => 0 );

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

/* ====================================================================
 * GAME LOG DATA — paths, loaders, helpers
 * ==================================================================== */

function sc_get_game_log_dir() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/game_logs';
}

function sc_get_game_scores_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/game_scores.json';
}

function sc_get_bios_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/bios.json';
}

function sc_get_dynasty_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/dynasty_rankings.json';
}

function sc_get_fantasy_outlook_2026_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/fantasy_outlook_2026.json';
}

function sc_get_bye_weeks_path() {
    $upload_dir = wp_upload_dir();
    return $upload_dir['basedir'] . '/statchasers/bye_weeks.json';
}

function sc_ensure_sc_dir() {
    $upload_dir = wp_upload_dir();
    $sc_dir = $upload_dir['basedir'] . '/statchasers';
    if ( ! file_exists( $sc_dir ) ) wp_mkdir_p( $sc_dir );
    $gl_dir = $sc_dir . '/game_logs';
    if ( ! file_exists( $gl_dir ) ) wp_mkdir_p( $gl_dir );
    return $sc_dir;
}

/**
 * Bundled game-log dir shipped inside the plugin. Used as a fallback so the
 * tool works out-of-the-box (e.g. the Nearby Positional Peers rail and weekly
 * logs) without waiting on the live Sleeper fetch that populates wp-uploads.
 * Mirrors how advanced_stats are read straight from the plugin dir.
 */
function sc_get_bundled_game_log_dir() {
    return plugin_dir_path( dirname( __FILE__ ) ) . 'data/game_logs';
}

function sc_get_available_seasons() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $seasons = [];
    foreach ( [ sc_get_game_log_dir(), sc_get_bundled_game_log_dir() ] as $dir ) {
        if ( ! is_dir( $dir ) ) continue;
        foreach ( glob( $dir . '/*.json' ) as $f ) {
            $name = basename( $f, '.json' );
            if ( is_numeric( $name ) ) $seasons[ (int) $name ] = true;
        }
    }
    $seasons = array_keys( $seasons );
    rsort( $seasons );
    $cache = $seasons;
    return $cache;
}

function sc_load_game_logs( $season ) {
    static $cache = [];
    if ( isset( $cache[ $season ] ) ) return $cache[ $season ];
    // Prefer the freshly-fetched copy in wp-uploads; fall back to the bundled
    // plugin copy. An empty/invalid uploads file must not shadow the bundle.
    foreach ( [ sc_get_game_log_dir(), sc_get_bundled_game_log_dir() ] as $dir ) {
        $file = $dir . '/' . $season . '.json';
        if ( ! file_exists( $file ) ) continue;
        $data = json_decode( file_get_contents( $file ), true );
        if ( is_array( $data ) && ! empty( $data ) ) {
            $cache[ $season ] = $data;
            return $data;
        }
    }
    $cache[ $season ] = [];
    return [];
}

function sc_get_season_max_week( $season ) {
    $logs = sc_load_game_logs( $season );
    $max  = 0;
    foreach ( $logs as $entries ) {
        foreach ( $entries as $e ) {
            if ( $e['week'] > $max ) $max = $e['week'];
        }
    }
    return max( $max, $season >= 2021 ? 18 : 17 );
}

function sc_load_game_scores() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $path = sc_get_game_scores_path();
    if ( ! file_exists( $path ) ) { $cache = []; return []; }
    $data  = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : [];
    return $cache;
}

function sc_get_game_score( $season, $team, $week ) {
    if ( ! $team ) return null;
    $scores = sc_load_game_scores();
    $season_scores = isset( $scores[ (string) $season ] ) ? $scores[ (string) $season ] : null;
    if ( ! $season_scores ) return null;
    $t   = sc_normalize_team( $team );
    $key = $t . '_' . $week;
    $entry = isset( $season_scores[ $key ] ) ? $season_scores[ $key ] : null;
    if ( ! $entry ) return null;
    return [ 'tm' => $entry['tm'], 'opp' => $entry['opp'], 'r' => $entry['r'] ];
}

function sc_load_bios() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $path = sc_get_bios_path();
    if ( ! file_exists( $path ) ) { $cache = []; return []; }
    $data  = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : [];
    return $cache;
}

function sc_load_dynasty() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $path = sc_get_dynasty_path();
    if ( ! file_exists( $path ) ) { $cache = []; return []; }
    $data  = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : [];
    return $cache;
}

function sc_load_fantasy_outlook_2026() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $path = sc_get_fantasy_outlook_2026_path();
    if ( ! file_exists( $path ) ) { $cache = []; return []; }
    $data  = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : [];
    return $cache;
}

function sc_load_bye_weeks() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $path = sc_get_bye_weeks_path();
    if ( ! file_exists( $path ) ) { $cache = []; return []; }
    $data  = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : [];
    return $cache;
}

function sc_get_bye_week( $season, $team ) {
    if ( ! $team ) return null;
    $byes = sc_load_bye_weeks();
    $season_byes = isset( $byes[ (string) $season ] ) ? $byes[ (string) $season ] : null;
    if ( ! $season_byes ) return null;
    $t = sc_normalize_team( $team );
    return isset( $season_byes[ $t ] ) ? $season_byes[ $t ] : null;
}

/* ------------------------------------------------------------------
 * Participation check (mirrors hasParticipation in routes.ts)
 * ------------------------------------------------------------------ */
function sc_has_participation( $stats, $position ) {
    $s = is_array( $stats ) ? $stats : [];
    if ( ( isset( $s['off_snp'] ) && (float) $s['off_snp'] > 0 ) ) return true;
    if ( $position === 'QB' ) {
        return ( ( isset( $s['pass_att'] ) && (float)$s['pass_att'] > 0 )
              || ( isset( $s['rush_att'] ) && (float)$s['rush_att'] > 0 ) );
    }
    if ( $position === 'K' ) {
        return ( ( isset( $s['fga'] ) && (float)$s['fga'] > 0 )
              || ( isset( $s['xpa'] ) && (float)$s['xpa'] > 0 ) );
    }
    return ( ( isset( $s['rec_tgt'] )  && (float)$s['rec_tgt']  > 0 )
          || ( isset( $s['rec'] )      && (float)$s['rec']      > 0 )
          || ( isset( $s['rush_att'] ) && (float)$s['rush_att'] > 0 )
          || ( isset( $s['pass_att'] ) && (float)$s['pass_att'] > 0 ) );
}

/* ------------------------------------------------------------------
 * Fantasy points (mirrors getEntryPoints in shared/scoring.ts)
 * ------------------------------------------------------------------ */
function sc_get_entry_points( $stats, $format = 'ppr' ) {
    $s   = is_array( $stats ) ? $stats : [];
    $ppr = isset( $s['pts_ppr'] ) ? (float)$s['pts_ppr'] : 0;
    if ( $format === 'ppr' ) return $ppr;
    if ( $format === 'half' ) {
        if ( isset( $s['pts_half_ppr'] ) && $s['pts_half_ppr'] !== null ) {
            return (float)$s['pts_half_ppr'];
        }
        $rec = isset( $s['rec'] ) ? (float)$s['rec'] : 0;
        return $ppr - ( $rec * 0.5 );
    }
    /* standard */
    $rec = isset( $s['rec'] ) ? (float)$s['rec'] : 0;
    return $ppr - $rec;
}

/* ------------------------------------------------------------------
 * Fill missing weeks (bye weeks + games not played)
 * mirrors fillMissingWeeks in routes.ts
 * ------------------------------------------------------------------ */
function sc_fill_missing_weeks( $entries, $team, $season ) {
    if ( empty( $entries ) ) return $entries;
    $bye_week      = sc_get_bye_week( $season, $team );
    $existing_weeks = [];
    foreach ( $entries as $e ) $existing_weeks[ $e['week'] ] = true;
    $max_week = sc_get_season_max_week( $season );
    $filled   = $entries;

    for ( $w = 1; $w <= $max_week; $w++ ) {
        if ( isset( $existing_weeks[ $w ] ) ) continue;
        $is_bye = ( $bye_week === $w );
        $filled[] = [
            'week'        => $w,
            'opp'         => $is_bye ? 'BYE' : "\u2014",
            'stats'       => [ 'pts_ppr' => 0 ],
            'pos_rank'    => null,
            'opp_rank_vs_pos' => null,
            'game_status' => $is_bye ? 'bye' : 'out',
        ];
    }

    usort( $filled, function( $a, $b ) { return $a['week'] - $b['week']; } );

    foreach ( $filled as &$e ) {
        if ( isset( $e['game_status'] ) && $e['game_status'] !== '' ) {
            /* already set (bye/out from the fill above, or active from original) */
            if ( $e['game_status'] === 'active' && ! isset( $e['score'] ) ) {
                $score = sc_get_game_score( $season, $team, $e['week'] );
                if ( $score ) $e['score'] = $score;
            }
            continue;
        }
        $s = isset( $e['stats'] ) ? $e['stats'] : [];
        $has = ( isset( $s['off_snp'] ) && (float)$s['off_snp'] > 0 )
            || ( isset( $s['pass_att'] ) && (float)$s['pass_att'] > 0 )
            || ( isset( $s['rush_att'] ) && (float)$s['rush_att'] > 0 )
            || ( isset( $s['rec_tgt'] )  && (float)$s['rec_tgt']  > 0 )
            || ( isset( $s['rec'] )      && (float)$s['rec']      > 0 );
        if ( $has ) {
            $e['game_status'] = 'active';
            $score = sc_get_game_score( $season, $team, $e['week'] );
            if ( $score ) $e['score'] = $score;
        } else {
            $e['game_status'] = 'out';
        }
    }
    unset( $e );

    return $filled;
}

/* ====================================================================
 * ADMIN FETCH FUNCTIONS
 * ==================================================================== */

/**
 * Fetch game logs from Sleeper API for the given seasons and save locally.
 * Returns true on success, WP_Error on failure.
 */
function sc_full_career_seasons() {
    $current = (int) date( 'Y' );
    /* Sleeper stats API has data from 2018 onwards */
    $first = 2018;
    /* If we're early in the year (before Sep) the current NFL season hasn't started yet */
    $last  = ( (int) date( 'n' ) >= 9 ) ? $current : $current - 1;
    return range( $first, $last );
}

function sc_fetch_and_save_game_logs( $seasons = null ) {
    if ( $seasons === null ) {
        $seasons = sc_full_career_seasons();
    }

    $players   = sc_get_players();
    if ( empty( $players ) ) return new WP_Error( 'no_players', 'Player index is empty. Refresh it first.' );

    $player_map = [];
    foreach ( $players as $p ) {
        $player_map[ $p['id'] ] = $p;
    }

    sc_ensure_sc_dir();
    @set_time_limit( 600 );

    $errors = [];
    foreach ( $seasons as $season ) {
        $season_data = [];
        for ( $week = 1; $week <= 18; $week++ ) {
            $url = 'https://api.sleeper.com/stats/nfl/' . $season . '/' . $week . '?season_type=regular';
            $res = wp_remote_get( $url, [ 'timeout' => 15 ] );
            if ( is_wp_error( $res ) || wp_remote_retrieve_response_code( $res ) !== 200 ) {
                continue;
            }
            $week_data = json_decode( wp_remote_retrieve_body( $res ), true );
            if ( ! is_array( $week_data ) ) continue;

            foreach ( $week_data as $entry ) {
                if ( ! is_array( $entry ) ) continue;
                $pid    = (string) ( isset( $entry['player_id'] ) ? $entry['player_id'] : '' );
                $player = isset( $player_map[ $pid ] ) ? $player_map[ $pid ] : null;
                if ( ! $player ) continue;
                $stats  = isset( $entry['stats'] ) && is_array( $entry['stats'] ) ? $entry['stats'] : [];
                if ( empty( $stats ) || ! isset( $stats['gp'] ) ) continue;
                $pos    = isset( $player['position'] ) ? $player['position'] : '';
                if ( ! in_array( $pos, [ 'QB', 'RB', 'WR', 'TE', 'K' ], true ) ) continue;
                $opp    = sc_normalize_team( isset( $entry['opponent'] ) ? $entry['opponent'] : '' );
                $team_w = sc_normalize_team( isset( $entry['team'] ) ? $entry['team'] : '' );
                if ( ! isset( $season_data[ $pid ] ) ) $season_data[ $pid ] = [];
                $season_data[ $pid ][] = [
                    'week'  => $week,
                    'opp'   => $opp ?: "\u2014",
                    'team'  => $team_w ?: null,
                    'stats' => sc_extract_player_stats( $stats, $pos ),
                ];
            }
            usleep( 250000 ); /* 250ms rate limit */
        }

        $out = sc_get_game_log_dir() . '/' . $season . '.json';
        file_put_contents( $out, wp_json_encode( $season_data ) );
    }

    update_option( 'sc_gamelogs_last_fetch', current_time( 'mysql' ) );

    /* Bust rank caches */
    foreach ( $seasons as $season ) {
        foreach ( [ 'ppr', 'half', 'standard' ] as $fmt ) {
            delete_transient( 'sc_wranks_' . $season . '_' . $fmt );
            delete_transient( 'sc_oranks_' . $season . '_' . $fmt );
            delete_transient( 'sc_team_agg_' . $season );
        }
    }

    return true;
}

function sc_extract_player_stats( $s, $position ) {
    $base = [
        'pts_ppr'      => isset( $s['pts_ppr'] )       ? round( (float)$s['pts_ppr'], 2 )      : 0,
        'pts_half_ppr' => isset( $s['pts_half_ppr'] )  ? round( (float)$s['pts_half_ppr'], 2 ) : null,
        'off_snp'      => isset( $s['off_snp'] )        ? (int)$s['off_snp']    : 0,
        'tm_off_snp'   => isset( $s['tm_off_snp'] )     ? (int)$s['tm_off_snp'] : 0,
    ];
    if ( $position === 'QB' ) {
        return array_merge( $base, [
            'pass_att' => isset( $s['pass_att'] ) ? (int)$s['pass_att'] : 0,
            'pass_cmp' => isset( $s['pass_cmp'] ) ? (int)$s['pass_cmp'] : 0,
            'pass_yd'  => isset( $s['pass_yd']  ) ? (float)$s['pass_yd'] : 0,
            'pass_td'  => isset( $s['pass_td']  ) ? (int)$s['pass_td'] : 0,
            'pass_int' => isset( $s['pass_int'] ) ? (int)$s['pass_int'] : 0,
            'rush_att' => isset( $s['rush_att'] ) ? (int)$s['rush_att'] : 0,
            'rush_yd'  => isset( $s['rush_yd']  ) ? (float)$s['rush_yd'] : 0,
            'rush_td'  => isset( $s['rush_td']  ) ? (int)$s['rush_td'] : 0,
        ]);
    }
    if ( $position === 'RB' ) {
        return array_merge( $base, [
            'rush_att' => isset( $s['rush_att'] ) ? (int)$s['rush_att'] : 0,
            'rush_yd'  => isset( $s['rush_yd']  ) ? (float)$s['rush_yd'] : 0,
            'rush_td'  => isset( $s['rush_td']  ) ? (int)$s['rush_td'] : 0,
            'rec_tgt'  => isset( $s['rec_tgt']  ) ? (int)$s['rec_tgt'] : 0,
            'rec'      => isset( $s['rec']       ) ? (int)$s['rec'] : 0,
            'rec_yd'   => isset( $s['rec_yd']   ) ? (float)$s['rec_yd'] : 0,
            'rec_td'   => isset( $s['rec_td']   ) ? (int)$s['rec_td'] : 0,
        ]);
    }
    if ( $position === 'WR' || $position === 'TE' ) {
        return array_merge( $base, [
            'rec_tgt'  => isset( $s['rec_tgt']  ) ? (int)$s['rec_tgt'] : 0,
            'rec'      => isset( $s['rec']       ) ? (int)$s['rec'] : 0,
            'rec_yd'   => isset( $s['rec_yd']   ) ? (float)$s['rec_yd'] : 0,
            'rec_td'   => isset( $s['rec_td']   ) ? (int)$s['rec_td'] : 0,
            'rush_att' => isset( $s['rush_att'] ) ? (int)$s['rush_att'] : 0,
            'rush_yd'  => isset( $s['rush_yd']  ) ? (float)$s['rush_yd'] : 0,
            'rush_td'  => isset( $s['rush_td']  ) ? (int)$s['rush_td'] : 0,
        ]);
    }
    if ( $position === 'K' ) {
        return array_merge( $base, [
            'fgm'     => isset( $s['fgm']     ) ? (int)$s['fgm'] : 0,
            'fga'     => isset( $s['fga']     ) ? (int)$s['fga'] : 0,
            'fgm_lng' => isset( $s['fgm_lng'] ) ? (int)$s['fgm_lng'] : 0,
            'xpm'     => isset( $s['xpm']     ) ? (int)$s['xpm'] : 0,
            'xpa'     => isset( $s['xpa']     ) ? (int)$s['xpa'] : 0,
        ]);
    }
    return $base;
}

/**
 * Download supplemental data (bye_weeks, game_scores, bios, dynasty) from
 * GitHub Pages and save locally. This only needs to run periodically.
 *
 * NOTE: fantasy_outlook_2026.json is intentionally excluded from this routine
 * refresh to prevent hand-crafted outlook data from being overwritten. Use
 * sc_fetch_and_save_fantasy_outlook_2026() to explicitly update it.
 */
function sc_fetch_and_save_supplemental_data() {
    sc_ensure_sc_dir();

    $plugin_data_dir = plugin_dir_path( dirname( __FILE__ ) ) . 'data/';

    /* 2026 Fantasy Outlook is NOT included here — it is protected from
     * routine overwrites. Use the dedicated admin action to refresh it. */
    $files = [
        'bye_weeks.json'        => sc_get_bye_weeks_path(),
        'game_scores.json'      => sc_get_game_scores_path(),
        'bios.json'             => sc_get_bios_path(),
        'dynasty_rankings.json' => sc_get_dynasty_path(),
    ];

    $ok = true;

    foreach ( $files as $filename => $local_path ) {
        $bundled = $plugin_data_dir . $filename;

        if ( file_exists( $bundled ) ) {
            $copied = copy( $bundled, $local_path );
            if ( ! $copied ) {
                error_log( 'StatChasers: Failed to copy bundled ' . $filename );
                $ok = false;
            }
            continue;
        }

        $remote_urls = [
            'https://raw.githubusercontent.com/statchasersff-bit/statchasers-player-pages/main/data/' . $filename,
            'https://statchasersff-bit.github.io/statchasers-player-pages/data/' . $filename,
        ];

        $saved = false;
        foreach ( $remote_urls as $url ) {
            $res = wp_remote_get( $url, [ 'timeout' => 30 ] );
            if ( is_wp_error( $res ) || wp_remote_retrieve_response_code( $res ) !== 200 ) {
                continue;
            }
            $body = wp_remote_retrieve_body( $res );
            if ( empty( $body ) || json_decode( $body ) === null ) {
                continue;
            }
            file_put_contents( $local_path, $body );
            $saved = true;
            break;
        }

        if ( ! $saved ) {
            error_log( 'StatChasers: Could not obtain ' . $filename . ' from any source.' );
            $ok = false;
        }
    }

    if ( $ok ) {
        update_option( 'sc_supplemental_last_fetch', current_time( 'mysql' ) );
        update_option( 'sc_gamescores_last_fetch', current_time( 'mysql' ) );
    }
    return $ok;
}

/**
 * Explicitly fetch and overwrite the 2026 Fantasy Outlook data.
 * This is kept separate so routine supplemental refreshes never clobber it.
 * Tries the bundled plugin data/ dir first, then GitHub Pages.
 */
function sc_fetch_and_save_fantasy_outlook_2026() {
    sc_ensure_sc_dir();

    $local_path      = sc_get_fantasy_outlook_2026_path();
    $plugin_data_dir = plugin_dir_path( dirname( __FILE__ ) ) . 'data/';
    $bundled         = $plugin_data_dir . 'fantasy_outlook_2026.json';

    if ( file_exists( $bundled ) ) {
        $copied = copy( $bundled, $local_path );
        if ( $copied ) {
            update_option( 'sc_outlook_2026_last_fetch', current_time( 'mysql' ) );
            return true;
        }
        error_log( 'StatChasers: Failed to copy bundled fantasy_outlook_2026.json' );
        return false;
    }

    $remote_urls = [
        'https://raw.githubusercontent.com/statchasersff-bit/statchasers-player-pages/main/data/fantasy_outlook_2026.json',
        'https://statchasersff-bit.github.io/statchasers-player-pages/data/fantasy_outlook_2026.json',
    ];

    foreach ( $remote_urls as $url ) {
        $res = wp_remote_get( $url, [ 'timeout' => 30 ] );
        if ( is_wp_error( $res ) || wp_remote_retrieve_response_code( $res ) !== 200 ) continue;
        $body = wp_remote_retrieve_body( $res );
        if ( empty( $body ) || json_decode( $body ) === null ) continue;
        file_put_contents( $local_path, $body );
        update_option( 'sc_outlook_2026_last_fetch', current_time( 'mysql' ) );
        return true;
    }

    error_log( 'StatChasers: Could not obtain fantasy_outlook_2026.json from any source.' );
    return false;
}
