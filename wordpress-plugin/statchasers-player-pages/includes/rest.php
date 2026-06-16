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
    $season      = ( $season_req > 0 && in_array( $season_req, $seasons, true ) )
        ? $season_req : ( ! empty( $seasons ) ? $seasons[0] : (int) date( 'Y' ) );

    $position = isset( $player['position'] ) ? $player['position'] : '';
    if ( ! $position ) return new WP_REST_Response( [], 200 );

    $all_logs    = sc_load_game_logs( $season );
    $ppg_by_player = [];

    foreach ( $all_logs as $pid => $p_logs ) {
        $p = null;
        foreach ( $all_players as $ap ) {
            if ( $ap['id'] === $pid ) { $p = $ap; break; }
        }
        if ( ! $p || ( isset( $p['position'] ) ? $p['position'] : '' ) !== $position ) continue;
        $played = array_filter( $p_logs, function( $e ) use ( $position ) {
            return sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $position );
        });
        if ( count( $played ) < 4 ) continue;
        $total = 0;
        foreach ( $played as $e ) $total += sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format );
        $ppg_by_player[] = [ 'id' => $pid, 'ppg' => $total / count( $played ), 'gp' => count( $played ), 'total' => $total ];
    }

    usort( $ppg_by_player, function( $a, $b ) {
        if ( $b['ppg'] == $a['ppg'] ) return 0;
        return $b['ppg'] > $a['ppg'] ? 1 : -1;
    });

    $current_idx = -1;
    foreach ( $ppg_by_player as $idx => $item ) {
        if ( $item['id'] === $player['id'] ) { $current_idx = $idx; break; }
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
