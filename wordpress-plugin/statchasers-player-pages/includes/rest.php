<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'rest_api_init', 'sc_register_rest_routes' );

function sc_register_rest_routes() {
    /* Player search */
    register_rest_route( 'statchasers/v1', '/players', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_search_players',
        'permission_callback' => '__return_true',
        'args' => [
            'q' => [
                'required'          => false,
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '',
            ],
        ],
    ]);

    /* Indexed players for directory */
    register_rest_route( 'statchasers/v1', '/indexed-players', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_indexed_players',
        'permission_callback' => '__return_true',
    ]);

    /* Full player profile */
    register_rest_route( 'statchasers/v1', '/player/(?P<slug>[a-z0-9\-]+)', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_player_profile',
        'permission_callback' => '__return_true',
        'args' => [
            'slug'   => [ 'required' => true, 'sanitize_callback' => 'sanitize_title' ],
            'format' => [ 'required' => false, 'sanitize_callback' => 'sanitize_text_field', 'default' => 'ppr' ],
            'season' => [ 'required' => false, 'sanitize_callback' => 'absint', 'default' => 0 ],
        ],
    ]);

    /* Game log only */
    register_rest_route( 'statchasers/v1', '/player/(?P<slug>[a-z0-9\-]+)/game-log', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_player_game_log',
        'permission_callback' => '__return_true',
        'args' => [
            'slug'   => [ 'required' => true, 'sanitize_callback' => 'sanitize_title' ],
            'format' => [ 'required' => false, 'sanitize_callback' => 'sanitize_text_field', 'default' => 'ppr' ],
            'season' => [ 'required' => false, 'sanitize_callback' => 'absint', 'default' => 0 ],
        ],
    ]);

    /* Related players */
    register_rest_route( 'statchasers/v1', '/player/(?P<slug>[a-z0-9\-]+)/related', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_player_related',
        'permission_callback' => '__return_true',
        'args' => [
            'slug'   => [ 'required' => true, 'sanitize_callback' => 'sanitize_title' ],
            'format' => [ 'required' => false, 'sanitize_callback' => 'sanitize_text_field', 'default' => 'ppr' ],
            'season' => [ 'required' => false, 'sanitize_callback' => 'absint', 'default' => 0 ],
        ],
    ]);

    /* Advanced stats (static, bundled per position+season) */
    register_rest_route( 'statchasers/v1', '/advanced-stats/(?P<pos>[a-z]+)/(?P<season>[a-z0-9]+)', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_advanced_stats',
        'permission_callback' => '__return_true',
        'args' => [
            'pos'    => [ 'required' => true, 'sanitize_callback' => 'sanitize_key' ],
            'season' => [ 'required' => true, 'sanitize_callback' => 'sanitize_key' ],
        ],
    ]);

    /* Player production by season (static snapshot) — drives the Season-End
       Finishes timeline. Path segment is the Sleeper player id. */
    register_rest_route( 'statchasers/v1', '/player/(?P<id>[a-z0-9\-]+)/production', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_player_production',
        'permission_callback' => '__return_true',
        'args' => [
            'id'      => [ 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ],
            'scoring' => [ 'required' => false, 'sanitize_callback' => 'sanitize_key', 'default' => 'ppr' ],
        ],
    ]);

    /* Player injury & health history (static snapshot). The path segment is the
       Sleeper player id (numeric), matching the Express /api/players/:id/injuries. */
    register_rest_route( 'statchasers/v1', '/player/(?P<id>[a-z0-9\-]+)/injuries', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_player_injuries',
        'permission_callback' => '__return_true',
        'args' => [
            'id'   => [ 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ],
            'name' => [ 'required' => false, 'sanitize_callback' => 'sanitize_text_field', 'default' => '' ],
        ],
    ]);

    /* Team injury report card (static snapshot) */
    register_rest_route( 'statchasers/v1', '/team/injury', [
        'methods'             => 'GET',
        'callback'            => 'sc_rest_team_injury',
        'permission_callback' => '__return_true',
        'args' => [
            'team'        => [ 'required' => false, 'sanitize_callback' => 'sanitize_text_field', 'default' => '' ],
            'player_name' => [ 'required' => false, 'sanitize_callback' => 'sanitize_text_field', 'default' => '' ],
            'week_label'  => [ 'required' => false, 'sanitize_callback' => 'sanitize_text_field', 'default' => '' ],
        ],
    ]);
}

/* ------------------------------------------------------------------
 * Player search
 * ------------------------------------------------------------------ */
function sc_rest_search_players( $request ) {
    $q       = strtolower( trim( $request->get_param( 'q' ) ) );
    $players = sc_get_players();
    $results = [];

    foreach ( $players as $p ) {
        $name_match = empty( $q ) || strpos( strtolower( $p['name'] ), $q ) !== false;
        $team_match = ! empty( $p['team'] ) && strpos( strtolower( $p['team'] ), $q ) !== false;
        if ( ! empty( $q ) && ! $name_match && ! $team_match ) continue;
        $results[] = [
            'id'       => $p['id'],
            'name'     => $p['name'],
            'slug'     => $p['slug'],
            'team'     => $p['team'],
            'position' => $p['position'],
        ];
        if ( ! empty( $q ) && count( $results ) >= 20 ) break;
    }

    return new WP_REST_Response( $results, 200 );
}

/* ------------------------------------------------------------------
 * Indexed players for directory
 * ------------------------------------------------------------------ */
function sc_rest_indexed_players( $request ) {
    return new WP_REST_Response( [
        'slugs'  => sc_get_indexed_slugs(),
        'byTeam' => sc_get_indexed_by_team(),
    ], 200 );
}

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */
function sc_parse_scoring_format( $param ) {
    if ( $param === 'standard' || $param === 'half' || $param === 'ppr' ) return $param;
    return 'ppr';
}

/* ------------------------------------------------------------------
 * Full player profile (mirrors Express /api/players/:slug response)
 * ------------------------------------------------------------------ */
function sc_rest_player_profile( $request ) {
    $slug   = $request->get_param( 'slug' );
    $player = sc_get_player_by_slug( $slug );
    if ( ! $player ) {
        return new WP_REST_Response( [ 'error' => 'not_found' ], 404 );
    }

    $all_players = sc_get_players();
    $seasons     = sc_get_available_seasons();
    $format      = sc_parse_scoring_format( $request->get_param( 'format' ) );
    $season_req  = (int) $request->get_param( 'season' );

    /* Allow caller to specify a season; default to first season with data */
    if ( $season_req > 0 && in_array( $season_req, $seasons, true ) ) {
        /* rebuild the profile for the requested season */
        $seasons_for_profile = array_merge(
            [ $season_req ],
            array_filter( $seasons, function( $s ) use ( $season_req ) { return $s !== $season_req; } )
        );
    } else {
        $seasons_for_profile = $seasons;
    }

    $profile = sc_compute_player_profile( $player, $all_players, $seasons_for_profile, $format );

    /* Precomputed, source-blended 2026 outlook (preferred over render-time generation) */
    $outlook_all = sc_load_fantasy_outlook_2026();
    $fantasy_outlook_2026 = isset( $outlook_all[ $player['id'] ] ) ? $outlook_all[ $player['id'] ] : null;

    /* Merge player fields + computed profile (matches Express flat response) */
    $response = array_merge( $player, [
        'headshotUrl'            => isset( $player['headshotUrl'] ) ? $player['headshotUrl'] : null,
        'season'                 => $profile['activeSeason'],
        'seasonLabel'            => $profile['seasonLabel'],
        'seasonRank'             => $profile['seasonRank'],
        'seasonTeam'             => isset( $profile['seasonTeam'] ) ? $profile['seasonTeam'] : null,
        'historicalSeasonTeam'   => isset( $profile['seasonTeam'] ) ? $profile['seasonTeam'] : null,
        'trends'                 => $profile['trends'],
        'gameLog'                => $profile['gameLog'],
        'news'                   => isset( $player['news'] ) ? $player['news'] : [],
        'availableSeasons'       => $seasons,
        'multiSeasonStats'       => $profile['multiSeasonStats'],
        'careerSeasonStats'      => $profile['careerSeasonStats'],
        'careerProfile'          => $profile['careerProfile'],
        'dynasty'                => $profile['dynasty'],
        'productionRiskBenchmarks' => null,
        'bio'                    => $profile['bio'],
        'fantasyOutlook2026'     => $fantasy_outlook_2026,
    ]);

    return new WP_REST_Response( $response, 200 );
}

/* ------------------------------------------------------------------
 * Game log only
 * ------------------------------------------------------------------ */
function sc_rest_player_game_log( $request ) {
    $slug   = $request->get_param( 'slug' );
    $player = sc_get_player_by_slug( $slug );
    if ( ! $player ) {
        return new WP_REST_Response( [ 'error' => 'not_found' ], 404 );
    }

    $all_players = sc_get_players();
    $seasons     = sc_get_available_seasons();
    $format      = sc_parse_scoring_format( $request->get_param( 'format' ) );
    $season_req  = (int) $request->get_param( 'season' );
    $season      = ( $season_req > 0 && in_array( $season_req, $seasons, true ) )
        ? $season_req : ( ! empty( $seasons ) ? $seasons[0] : (int) date( 'Y' ) );

    $position  = isset( $player['position'] ) ? $player['position'] : '';
    $team      = isset( $player['team'] )     ? $player['team']     : '';
    $all_logs  = sc_load_game_logs( $season );
    $p_logs    = isset( $all_logs[ $player['id'] ] ) ? $all_logs[ $player['id'] ] : [];

    $ranks     = sc_build_weekly_ranks( $season, $all_logs, $all_players, $format );
    $opp_ranks = sc_build_opp_ranks( $season, $all_logs, $all_players, $format );

    foreach ( $p_logs as &$e ) {
        $week = $e['week'];
        $e['pos_rank'] = ( isset( $ranks[ $player['id'] ] ) && isset( $ranks[ $player['id'] ][ $week ] ) )
            ? $ranks[ $player['id'] ][ $week ] : null;
        $opp_key = sc_normalize_team( isset( $e['opp'] ) ? $e['opp'] : '' ) . ':' . $position;
        $e['opp_rank_vs_pos'] = isset( $opp_ranks[ $opp_key ] ) ? $opp_ranks[ $opp_key ] : null;
    }
    unset( $e );

    $p_logs = sc_enrich_with_team_metrics( $p_logs, $team, $season, $all_logs, $all_players );
    $p_logs = sc_fill_missing_weeks( $p_logs, $team, $season );

    return new WP_REST_Response( $p_logs, 200 );
}

/* ------------------------------------------------------------------
 * Related players (mirrors Express /api/players/:slug/related)
 * ------------------------------------------------------------------ */
function sc_rest_player_related( $request ) {
    $slug   = $request->get_param( 'slug' );
    $player = sc_get_player_by_slug( $slug );
    if ( ! $player ) {
        return new WP_REST_Response( [ 'error' => 'not_found' ], 404 );
    }

    $all_players = sc_get_players();
    $format      = sc_parse_scoring_format( $request->get_param( 'format' ) );
    $seasons     = sc_get_available_seasons();
    $season_req  = (int) $request->get_param( 'season' );

    $position = isset( $player['position'] ) ? $player['position'] : '';
    if ( ! $position ) return new WP_REST_Response( [], 200 );

    // Index players by id once (avoids an O(n^2) lookup per game-log row).
    $player_map = [];
    foreach ( $all_players as $ap ) { $player_map[ $ap['id'] ] = $ap; }

    // Candidate seasons: a specific requested one, else newest→oldest. Fall
    // through to an earlier season when the newest has no usable logs (e.g. the
    // offseason, or an empty cached game-log file) so the rail still renders.
    $candidates = ( $season_req > 0 && in_array( $season_req, $seasons, true ) )
        ? [ $season_req ]
        : ( ! empty( $seasons ) ? $seasons : [ (int) date( 'Y' ) ] );

    $season        = $candidates[0];
    $ppg_by_player = [];
    $current_idx   = -1;

    foreach ( $candidates as $try_season ) {
        $all_logs = sc_load_game_logs( $try_season );
        if ( empty( $all_logs ) ) continue;

        $list = [];
        foreach ( $all_logs as $pid => $p_logs ) {
            $p = isset( $player_map[ $pid ] ) ? $player_map[ $pid ] : null;
            if ( ! $p || ( isset( $p['position'] ) ? $p['position'] : '' ) !== $position ) continue;
            $played = array_filter( $p_logs, function( $e ) use ( $position ) {
                return sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $position );
            });
            if ( count( $played ) < 4 ) continue;
            $total = 0;
            foreach ( $played as $e ) $total += sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format );
            $list[] = [ 'id' => $pid, 'ppg' => $total / count( $played ), 'gp' => count( $played ), 'total' => $total ];
        }

        usort( $list, function( $a, $b ) {
            if ( $b['ppg'] == $a['ppg'] ) return 0;
            return $b['ppg'] > $a['ppg'] ? 1 : -1;
        });

        $idx = -1;
        foreach ( $list as $i => $item ) {
            if ( $item['id'] === $player['id'] ) { $idx = $i; break; }
        }

        // Use the first season that actually contains this player; otherwise
        // remember the first non-empty season so we still report something.
        if ( $idx >= 0 ) { $season = $try_season; $ppg_by_player = $list; $current_idx = $idx; break; }
        if ( empty( $ppg_by_player ) && ! empty( $list ) ) { $season = $try_season; $ppg_by_player = $list; }
    }

    if ( $current_idx < 0 ) return new WP_REST_Response( [ 'neighbors' => [], 'currentRank' => null, 'season' => $season, 'format' => $format, 'position' => $position ], 200 );

    $radius    = 3;
    $start     = max( 0, $current_idx - $radius );
    $end       = min( count( $ppg_by_player ), $current_idx + $radius + 1 );
    $neighbors = array_slice( $ppg_by_player, $start, $end - $start );
    $neighbors = array_filter( $neighbors, function( $n ) use ( $player ) { return $n['id'] !== $player['id']; });

    $result = [];
    foreach ( $neighbors as $n ) {
        $p = null;
        foreach ( $all_players as $ap ) {
            if ( $ap['id'] === $n['id'] ) { $p = $ap; break; }
        }
        $rank = -1;
        foreach ( $ppg_by_player as $ri => $item ) {
            if ( $item['id'] === $n['id'] ) { $rank = $ri + 1; break; }
        }
        $result[] = [
            'id'       => $n['id'],
            'name'     => $p ? $p['name'] : '',
            'slug'     => $p ? $p['slug'] : '',
            'team'     => $p ? ( isset( $p['team'] ) ? $p['team'] : '' ) : '',
            'position' => $p ? ( isset( $p['position'] ) ? $p['position'] : '' ) : '',
            'posRank'  => $rank > 0 ? $rank : null,
            'ppg'      => round( $n['ppg'] * 10 ) / 10,
        ];
    }

    return new WP_REST_Response( [
        'neighbors'   => array_values( $result ),
        'currentRank' => $current_idx + 1,
        'season'      => $season,
        'format'      => $format,
        'position'    => $position,
    ], 200 );
}

/* ------------------------------------------------------------------
 * Advanced stats — static, bundled per position+season.
 * Mirrors Express GET /api/advanced-stats/:pos/:season (raw file body).
 * ------------------------------------------------------------------ */
function sc_rest_advanced_stats( $request ) {
    $pos    = strtolower( (string) $request->get_param( 'pos' ) );
    $season = strtolower( (string) $request->get_param( 'season' ) );

    if ( ! in_array( $pos, [ 'qb', 'rb', 'wr', 'te' ], true ) ) {
        return new WP_REST_Response( [ 'error' => 'invalid_position' ], 400 );
    }
    if ( $season !== 'all' && ! preg_match( '/^20\d{2}$/', $season ) ) {
        return new WP_REST_Response( [ 'error' => 'invalid_season' ], 400 );
    }

    $path = plugin_dir_path( dirname( __FILE__ ) ) . 'data/advanced_stats/' . $pos . '_' . $season . '.json';
    if ( ! file_exists( $path ) ) {
        return new WP_REST_Response( [ 'error' => 'not_found' ], 404 );
    }
    $data = json_decode( file_get_contents( $path ), true );
    if ( $data === null ) {
        return new WP_REST_Response( [ 'error' => 'read_failed' ], 500 );
    }
    return new WP_REST_Response( $data, 200 );
}

/* ------------------------------------------------------------------
 * Player production by season — static snapshot keyed by Sleeper id. Each
 * season carries std/half/ppr finish data, so one snapshot serves every
 * scoring. Mirrors Express GET /api/players/:id/production.
 * ------------------------------------------------------------------ */
function sc_load_player_production() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $path = plugin_dir_path( dirname( __FILE__ ) ) . 'data/player_production.json';
    if ( ! file_exists( $path ) ) { $cache = []; return $cache; }
    $data  = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : [];
    return $cache;
}

function sc_rest_player_production( $request ) {
    $id      = (string) $request->get_param( 'id' );
    $scoring = (string) $request->get_param( 'scoring' );
    if ( ! in_array( $scoring, [ 'std', 'half', 'ppr' ], true ) ) $scoring = 'ppr';
    $all = sc_load_player_production();
    $seasons = ( $id !== '' && isset( $all[ $id ] ) ) ? $all[ $id ] : [];
    return new WP_REST_Response( [ 'playerId' => $id, 'scoring' => $scoring, 'seasons' => $seasons ], 200 );
}

/* ------------------------------------------------------------------
 * Player injury & health history — static snapshot keyed by Sleeper id.
 * Mirrors Express GET /api/players/:id/injuries → { playerId, injuries }.
 * ------------------------------------------------------------------ */
function sc_load_player_injuries() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $path = plugin_dir_path( dirname( __FILE__ ) ) . 'data/player_injuries.json';
    if ( ! file_exists( $path ) ) { $cache = []; return $cache; }
    $data  = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : [];
    return $cache;
}

function sc_rest_player_injuries( $request ) {
    $id  = (string) $request->get_param( 'id' );
    $all = sc_load_player_injuries();
    $injuries = ( $id !== '' && isset( $all[ $id ] ) ) ? $all[ $id ] : null;
    return new WP_REST_Response( [ 'playerId' => $id, 'injuries' => $injuries ], 200 );
}

/* ------------------------------------------------------------------
 * Team injury report card — static snapshot. The build step precomputes the
 * full per-player response (including the blurb) keyed by team → normalized
 * name, so PHP only normalizes the requested name and looks it up.
 * Mirrors Express GET /api/team/injury.
 * ------------------------------------------------------------------ */
function sc_load_team_injuries() {
    static $cache = null;
    if ( $cache !== null ) return $cache;
    $path = plugin_dir_path( dirname( __FILE__ ) ) . 'data/team_injuries.json';
    if ( ! file_exists( $path ) ) { $cache = []; return $cache; }
    $data  = json_decode( file_get_contents( $path ), true );
    $cache = is_array( $data ) ? $data : [];
    return $cache;
}

/* Mirrors normName() in routes.ts */
function sc_norm_name( $name ) {
    $n = strtolower( (string) $name );
    $n = str_replace( [ '.', "'", "\u{2019}", "\u{2018}" ], '', $n );
    $n = preg_replace( '/\s+(jr|sr|ii|iii|iv|v)\b/', '', $n );
    $n = preg_replace( '/\s+/', ' ', $n );
    return trim( $n );
}

function sc_rest_team_injury( $request ) {
    $team        = strtoupper( trim( (string) $request->get_param( 'team' ) ) );
    $player_name = trim( (string) $request->get_param( 'player_name' ) );

    if ( $player_name === '' ) return new WP_REST_Response( [ 'error' => 'player_name is required' ], 400 );
    if ( $team === '' ) return new WP_REST_Response( [ 'error' => 'team is required' ], 400 );

    $all  = sc_load_team_injuries();
    $teamData = isset( $all[ $team ] ) ? $all[ $team ] : null;
    $norm = sc_norm_name( $player_name );

    if ( $teamData && isset( $teamData['players'] ) && isset( $teamData['players'][ $norm ] ) ) {
        return new WP_REST_Response( $teamData['players'][ $norm ], 200 );
    }

    /* Not found on the report — mirror the Express not-found payload. */
    $source     = $teamData && isset( $teamData['source'] ) ? $teamData['source'] : null;
    $source_url = $teamData && isset( $teamData['source_url'] ) ? $teamData['source_url'] : null;
    $report_label = $teamData && isset( $teamData['report_label'] ) ? $teamData['report_label'] : '';
    $report_updated_at = $teamData && isset( $teamData['report_updated_at'] ) ? $teamData['report_updated_at'] : null;

    return new WP_REST_Response( [
        'found'             => false,
        'player_name'       => $player_name,
        'team'              => $team,
        'blurb'             => 'No injury designation listed for ' . $player_name . ' on the latest report.',
        'source'            => $source,
        'source_url'        => $source_url,
        'report_label'      => $report_label,
        'report_updated_at' => $report_updated_at,
        'fetched_at'        => null,
    ], 200 );
}
