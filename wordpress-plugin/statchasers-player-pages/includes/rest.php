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

function sc_parse_scoring_format( $param ) {
    if ( $param === 'standard' || $param === 'half' || $param === 'ppr' ) return $param;
    return 'ppr';
}

function sc_rest_player_profile( $request ) {
    $slug = $request->get_param( 'slug' );
    $player = sc_get_player_by_slug( $slug );
    if ( ! $player ) {
        return new WP_REST_Response( array( 'error' => 'not_found' ), 404 );
    }

    $all_players = sc_get_players();
    $seasons = sc_get_available_seasons();
    $format = sc_parse_scoring_format( $request->get_param( 'format' ) );
    $season_param = (int) $request->get_param( 'season' );
    $season = ( $season_param > 0 && in_array( $season_param, $seasons, true ) ) ? $season_param : ( ! empty( $seasons ) ? $seasons[0] : (int) date( 'Y' ) );

    $all_logs = sc_load_game_logs( $season );
    $player_logs = isset( $all_logs[ $player['id'] ] ) ? $all_logs[ $player['id'] ] : array();

    $ranks = sc_build_weekly_ranks( $season, $all_logs, $all_players, $format );
    $opp_ranks = sc_build_opp_ranks( $season, $all_logs, $all_players, $format );
    $position = isset( $player['position'] ) ? $player['position'] : '';

    foreach ( $player_logs as &$entry ) {
        $pid = $player['id'];
        $week = $entry['week'];
        $entry['pos_rank'] = ( isset( $ranks[ $pid ] ) && isset( $ranks[ $pid ][ $week ] ) ) ? $ranks[ $pid ][ $week ] : null;
        $opp_team = sc_normalize_team( isset( $entry['opp'] ) ? $entry['opp'] : '' );
        $opp_key = $opp_team . ':' . $position;
        $entry['opp_rank_vs_pos'] = isset( $opp_ranks[ $opp_key ] ) ? $opp_ranks[ $opp_key ] : null;
    }
    unset( $entry );

    $player_logs = sc_fill_missing_weeks( $player_logs, isset( $player['team'] ) ? $player['team'] : '', $season );

    $played_logs = array_filter( $player_logs, function( $e ) { return isset( $e['game_status'] ) && $e['game_status'] === 'active'; } );
    $played_logs = array_values( $played_logs );
    $games_played = count( $played_logs );

    $total_pts = 0;
    $best_week = null;
    $worst_week = null;
    $goose_eggs = 0;
    $weekly_pts = array();

    foreach ( $played_logs as $e ) {
        $stats = isset( $e['stats'] ) ? $e['stats'] : array();
        $fpts = sc_get_entry_points( $stats, $format );
        $total_pts += $fpts;
        $weekly_pts[] = $fpts;

        if ( $fpts <= 0 ) $goose_eggs++;

        $week_info = array( 'week' => $e['week'], 'fpts' => $fpts, 'opp' => isset( $e['opp'] ) ? $e['opp'] : '' );
        if ( $best_week === null || $fpts > $best_week['fpts'] ) $best_week = $week_info;
        if ( $worst_week === null || $fpts < $worst_week['fpts'] ) $worst_week = $week_info;
    }

    $ppg = $games_played > 0 ? round( ( $total_pts / $games_played ) * 100 ) / 100 : 0;

    $volatility = 0;
    if ( $games_played > 1 ) {
        $mean = $ppg;
        $variance = 0;
        foreach ( $weekly_pts as $v ) {
            $variance += pow( $v - $mean, 2 );
        }
        $variance /= ( $games_played - 1 );
        $volatility = round( sqrt( $variance ) * 100 ) / 100;
    }

    $bust_thresh = ( $position === 'QB' || $position === 'TE' ) ? 18 : ( $position === 'WR' ? 36 : 30 );
    $has_tier3 = $bust_thresh > 24;
    $pos1 = 0; $pos2 = 0; $pos3 = 0; $bust = 0;
    $ranked_played = array_filter( $played_logs, function( $e ) { return isset( $e['pos_rank'] ) && $e['pos_rank'] !== null; } );
    foreach ( $ranked_played as $e ) {
        $r = $e['pos_rank'];
        if ( $r >= 1 && $r <= 12 ) $pos1++;
        elseif ( $r >= 13 && $r <= ( $has_tier3 ? 24 : $bust_thresh ) ) $pos2++;
        elseif ( $has_tier3 && $r >= 25 && $r <= $bust_thresh ) $pos3++;
        elseif ( $r > $bust_thresh ) $bust++;
    }

    $stats_result = array(
        'gamesPlayed' => $games_played,
        'totalPts'    => round( $total_pts * 100 ) / 100,
        'ppg'         => $ppg,
        'pos1Pct'     => $games_played > 0 ? round( ( $pos1 / $games_played ) * 100 ) : 0,
        'pos2Pct'     => $games_played > 0 ? round( ( $pos2 / $games_played ) * 100 ) : 0,
        'pos3Pct'     => $games_played > 0 ? round( ( $pos3 / $games_played ) * 100 ) : 0,
        'bustPct'     => $games_played > 0 ? round( ( $bust / $games_played ) * 100 ) : 0,
        'volatility'  => $volatility,
        'gooseEggPct' => $games_played > 0 ? round( ( $goose_eggs / $games_played ) * 100 ) : 0,
        'bestWeek'    => $best_week,
        'worstWeek'   => $worst_week,
    );

    $season_rank = null;
    if ( $games_played > 0 && ! empty( $position ) ) {
        $ppg_by_player = array();
        foreach ( $all_logs as $pid => $p_logs ) {
            $p = null;
            foreach ( $all_players as $ap ) {
                if ( $ap['id'] === $pid ) { $p = $ap; break; }
            }
            if ( ! $p || ( isset( $p['position'] ) ? $p['position'] : '' ) !== $position ) continue;
            $p_played = array_filter( $p_logs, function( $e ) use ( $p ) {
                return sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : array(), isset( $p['position'] ) ? $p['position'] : '' );
            } );
            if ( count( $p_played ) < 4 ) continue;
            $p_total = 0;
            foreach ( $p_played as $e ) {
                $p_total += sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : array(), $format );
            }
            $ppg_by_player[] = array( 'id' => $pid, 'ppg' => $p_total / count( $p_played ) );
        }
        usort( $ppg_by_player, function( $a, $b ) {
            if ( $b['ppg'] == $a['ppg'] ) return 0;
            return $b['ppg'] > $a['ppg'] ? 1 : -1;
        } );
        foreach ( $ppg_by_player as $i => $item ) {
            if ( $item['id'] === $player['id'] ) {
                $season_rank = $i + 1;
                break;
            }
        }
    }

    return new WP_REST_Response( array(
        'player'           => $player,
        'season'           => $season,
        'availableSeasons' => $seasons,
        'format'           => $format,
        'gamelog'          => $player_logs,
        'stats'            => $stats_result,
        'seasonRank'       => $season_rank,
    ), 200 );
}

function sc_rest_player_game_log( $request ) {
    $slug = $request->get_param( 'slug' );
    $player = sc_get_player_by_slug( $slug );
    if ( ! $player ) {
        return new WP_REST_Response( array( 'error' => 'not_found' ), 404 );
    }

    $all_players = sc_get_players();
    $seasons = sc_get_available_seasons();
    $format = sc_parse_scoring_format( $request->get_param( 'format' ) );
    $season_param = (int) $request->get_param( 'season' );
    $season = ( $season_param > 0 && in_array( $season_param, $seasons, true ) ) ? $season_param : ( ! empty( $seasons ) ? $seasons[0] : (int) date( 'Y' ) );

    $all_logs = sc_load_game_logs( $season );
    $player_logs = isset( $all_logs[ $player['id'] ] ) ? $all_logs[ $player['id'] ] : array();
    $position = isset( $player['position'] ) ? $player['position'] : '';

    $ranks = sc_build_weekly_ranks( $season, $all_logs, $all_players, $format );
    $opp_ranks = sc_build_opp_ranks( $season, $all_logs, $all_players, $format );

    foreach ( $player_logs as &$entry ) {
        $pid = $player['id'];
        $week = $entry['week'];
        $entry['pos_rank'] = ( isset( $ranks[ $pid ] ) && isset( $ranks[ $pid ][ $week ] ) ) ? $ranks[ $pid ][ $week ] : null;
        $opp_team = sc_normalize_team( isset( $entry['opp'] ) ? $entry['opp'] : '' );
        $opp_key = $opp_team . ':' . $position;
        $entry['opp_rank_vs_pos'] = isset( $opp_ranks[ $opp_key ] ) ? $opp_ranks[ $opp_key ] : null;
    }
    unset( $entry );

    $player_logs = sc_fill_missing_weeks( $player_logs, isset( $player['team'] ) ? $player['team'] : '', $season );

    return new WP_REST_Response( $player_logs, 200 );
}
