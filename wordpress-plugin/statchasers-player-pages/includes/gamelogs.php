<?php
/**
 * StatChasers — Game Log Computation
 * Ported from server/routes.ts: rank building, team metrics, profile aggregation.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

/* ------------------------------------------------------------------
 * Team-level aggregates (targets, pass_att, rush_att per team/week)
 * ------------------------------------------------------------------ */
function sc_build_team_aggregates( $season, $logs, $all_players ) {
    $ckey = 'sc_team_agg_' . $season;
    $cached = get_transient( $ckey );
    if ( $cached !== false ) return $cached;

    $player_team_map = [];
    foreach ( $all_players as $p ) {
        if ( ! empty( $p['team'] ) && $p['team'] !== 'FA' ) {
            $player_team_map[ $p['id'] ] = sc_normalize_team( $p['team'] );
        }
    }
    $player_pos_map = [];
    foreach ( $all_players as $p ) {
        if ( ! empty( $p['position'] ) ) {
            $player_pos_map[ $p['id'] ] = $p['position'];
        }
    }

    $agg = [];
    foreach ( $logs as $pid => $entries ) {
        $team = isset( $player_team_map[ $pid ] ) ? $player_team_map[ $pid ] : null;
        if ( ! $team ) continue;
        $pos = isset( $player_pos_map[ $pid ] ) ? $player_pos_map[ $pid ] : null;
        foreach ( $entries as $e ) {
            $s = isset( $e['stats'] ) ? $e['stats'] : [];
            $key = $team . '_' . $e['week'];
            if ( ! isset( $agg[ $key ] ) ) {
                $agg[ $key ] = [ 'tgt' => 0, 'pass_att' => 0, 'rush_att' => 0 ];
            }
            if ( $pos !== 'QB' && $pos !== 'K' ) {
                $agg[ $key ]['tgt'] += isset( $s['rec_tgt'] ) ? floatval( $s['rec_tgt'] ) : 0;
            }
            if ( $pos === 'QB' ) {
                $agg[ $key ]['pass_att'] += isset( $s['pass_att'] ) ? floatval( $s['pass_att'] ) : 0;
            }
            $agg[ $key ]['rush_att'] += isset( $s['rush_att'] ) ? floatval( $s['rush_att'] ) : 0;
        }
    }

    set_transient( $ckey, $agg, HOUR_IN_SECONDS );
    return $agg;
}

/* ------------------------------------------------------------------
 * Derive the team a player actually played for during a given season.
 * Prefers per-entry team in game logs (most common value); falls back
 * to the supplied current team. Use for historical season copy.
 * ------------------------------------------------------------------ */
function sc_derive_season_team( $entries, $fallback_team ) {
    $counts = [];
    if ( is_array( $entries ) ) {
        foreach ( $entries as $e ) {
            if ( empty( $e['team'] ) ) continue;
            $t = sc_normalize_team( $e['team'] );
            if ( ! $t || $t === 'FA' ) continue;
            if ( ! isset( $counts[ $t ] ) ) $counts[ $t ] = 0;
            $counts[ $t ]++;
        }
    }
    if ( empty( $counts ) ) {
        return ( $fallback_team && $fallback_team !== 'FA' ) ? sc_normalize_team( $fallback_team ) : null;
    }
    arsort( $counts );
    $best = array_key_first( $counts );
    return $best ?: ( ( $fallback_team && $fallback_team !== 'FA' ) ? sc_normalize_team( $fallback_team ) : null );
}

/* ------------------------------------------------------------------
 * Enrich entries with target share and team pass rate
 * ------------------------------------------------------------------ */
function sc_enrich_with_team_metrics( $entries, $player_team, $season, $all_logs, $all_players ) {
    /* Prefer team derived from the entries themselves (correct for
     * completed seasons when current team has changed in offseason). */
    $team = sc_derive_season_team( $entries, $player_team );
    if ( ! $team ) return $entries;

    $agg = sc_build_team_aggregates( $season, $all_logs, $all_players );

    $result = [];
    foreach ( $entries as $e ) {
        $key = $team . '_' . $e['week'];
        $tw = isset( $agg[ $key ] ) ? $agg[ $key ] : null;
        if ( ! $tw ) {
            $result[] = $e;
            continue;
        }
        $s = isset( $e['stats'] ) ? $e['stats'] : [];
        $tgt = isset( $s['rec_tgt'] ) ? floatval( $s['rec_tgt'] ) : 0;
        $target_share = $tw['tgt'] > 0 ? round( ( $tgt / $tw['tgt'] ) * 1000 ) / 10 : null;
        $total_att = $tw['pass_att'] + $tw['rush_att'];
        $team_pass_rate = $total_att > 0 ? round( ( $tw['pass_att'] / $total_att ) * 1000 ) / 10 : null;
        $e['stats']['target_share']   = $target_share;
        $e['stats']['team_pass_rate'] = $team_pass_rate;
        $e['stats']['team_tgt']       = $tw['tgt'];
        $e['stats']['team_pass_att']  = $tw['pass_att'];
        $result[] = $e;
    }
    return $result;
}

/* ------------------------------------------------------------------
 * Weekly positional ranks  [pid][week] = rank
 * ------------------------------------------------------------------ */
function sc_build_weekly_ranks( $season, $all_logs, $all_players, $format = 'ppr' ) {
    $ckey = 'sc_wranks_' . $season . '_' . $format;
    $cached = get_transient( $ckey );
    if ( $cached !== false ) return $cached;

    $player_pos_map = [];
    foreach ( $all_players as $p ) {
        if ( ! empty( $p['position'] ) ) {
            $player_pos_map[ $p['id'] ] = $p['position'];
        }
    }

    $week_pos_buckets = [];
    foreach ( $all_logs as $pid => $entries ) {
        $pos = isset( $player_pos_map[ $pid ] ) ? $player_pos_map[ $pid ] : null;
        if ( ! $pos ) continue;
        foreach ( $entries as $e ) {
            if ( ! sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $pos ) ) continue;
            $week = $e['week'];
            if ( ! isset( $week_pos_buckets[ $week ] ) ) $week_pos_buckets[ $week ] = [];
            if ( ! isset( $week_pos_buckets[ $week ][ $pos ] ) ) $week_pos_buckets[ $week ][ $pos ] = [];
            $week_pos_buckets[ $week ][ $pos ][] = [
                'pid' => $pid,
                'pts' => sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format ),
            ];
        }
    }

    $rank_map = [];
    foreach ( $week_pos_buckets as $week => $pos_buckets ) {
        foreach ( $pos_buckets as $pos => $bucket ) {
            usort( $bucket, function( $a, $b ) {
                if ( $b['pts'] == $a['pts'] ) return 0;
                return $b['pts'] > $a['pts'] ? 1 : -1;
            });
            foreach ( $bucket as $i => $item ) {
                if ( ! isset( $rank_map[ $item['pid'] ] ) ) $rank_map[ $item['pid'] ] = [];
                $rank_map[ $item['pid'] ][ $week ] = $i + 1;
            }
        }
    }

    set_transient( $ckey, $rank_map, HOUR_IN_SECONDS );
    return $rank_map;
}

/* ------------------------------------------------------------------
 * Opponent ranks vs position  ["TEAM:POS"] = rank (1 = toughest D)
 * ------------------------------------------------------------------ */
function sc_build_opp_ranks( $season, $all_logs, $all_players, $format = 'ppr' ) {
    $ckey = 'sc_oranks_' . $season . '_' . $format;
    $cached = get_transient( $ckey );
    if ( $cached !== false ) return $cached;

    $player_info_map = [];
    foreach ( $all_players as $p ) {
        if ( ! empty( $p['position'] ) ) {
            $player_info_map[ $p['id'] ] = [
                'position' => $p['position'],
                'team'     => isset( $p['team'] ) ? $p['team'] : '',
            ];
        }
    }

    $opp_pts_allowed = [];
    foreach ( $all_logs as $pid => $entries ) {
        $info = isset( $player_info_map[ $pid ] ) ? $player_info_map[ $pid ] : null;
        if ( ! $info ) continue;
        $pos = $info['position'];
        foreach ( $entries as $e ) {
            if ( ! sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $pos ) ) continue;
            $opp = sc_normalize_team( isset( $e['opp'] ) ? $e['opp'] : '' );
            $key = $opp . ':' . $pos;
            if ( ! isset( $opp_pts_allowed[ $key ] ) ) $opp_pts_allowed[ $key ] = [];
            $opp_pts_allowed[ $key ][] = sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format );
        }
    }

    $pos_groups = [];
    foreach ( $opp_pts_allowed as $key => $pts ) {
        $parts = explode( ':', $key, 2 );
        $team  = $parts[0];
        $pos   = isset( $parts[1] ) ? $parts[1] : '';
        $avg   = array_sum( $pts ) / count( $pts );
        if ( ! isset( $pos_groups[ $pos ] ) ) $pos_groups[ $pos ] = [];
        $pos_groups[ $pos ][] = [ 'team' => $team, 'avg' => $avg ];
    }

    $rank_map = [];
    foreach ( $pos_groups as $pos => $teams ) {
        usort( $teams, function( $a, $b ) {
            if ( $a['avg'] == $b['avg'] ) return 0;
            return $a['avg'] < $b['avg'] ? -1 : 1;
        });
        foreach ( $teams as $i => $item ) {
            $rank_map[ $item['team'] . ':' . $pos ] = $i + 1;
        }
    }

    set_transient( $ckey, $rank_map, HOUR_IN_SECONDS );
    return $rank_map;
}

/* ------------------------------------------------------------------
 * Compute full player profile data (mirrors Express API response)
 * ------------------------------------------------------------------ */
function sc_compute_player_profile( $player, $all_players, $seasons, $format = 'ppr' ) {
    $player_id = $player['id'];
    $position  = isset( $player['position'] ) ? $player['position'] : '';
    $team      = isset( $player['team'] )     ? $player['team']     : '';

    /* --- Find active season with game data --- */
    $active_season = ! empty( $seasons ) ? $seasons[0] : (int) date( 'Y' );
    $player_logs   = [];

    foreach ( $seasons as $s ) {
        $s_logs  = sc_load_game_logs( $s );
        $p_logs  = isset( $s_logs[ $player_id ] ) ? $s_logs[ $player_id ] : [];
        $has     = false;
        foreach ( $p_logs as $e ) {
            if ( sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $position ) ) {
                $has = true;
                break;
            }
        }
        if ( $has ) {
            $active_season = $s;
            $all_logs      = $s_logs;
            $ranks         = sc_build_weekly_ranks( $s, $s_logs, $all_players, $format );
            $opp_ranks     = sc_build_opp_ranks( $s, $s_logs, $all_players, $format );
            $player_logs   = $p_logs;

            /* attach pos_rank */
            foreach ( $player_logs as &$e ) {
                $week = $e['week'];
                $e['pos_rank'] = ( isset( $ranks[ $player_id ] ) && isset( $ranks[ $player_id ][ $week ] ) )
                    ? $ranks[ $player_id ][ $week ] : null;
                $opp_key = sc_normalize_team( isset( $e['opp'] ) ? $e['opp'] : '' ) . ':' . $position;
                $e['opp_rank_vs_pos'] = isset( $opp_ranks[ $opp_key ] ) ? $opp_ranks[ $opp_key ] : null;
            }
            unset( $e );

            $player_logs = sc_enrich_with_team_metrics( $player_logs, $team, $s, $all_logs, $all_players );
            $player_logs = sc_fill_missing_weeks( $player_logs, $team, $s );
            break;
        }
    }

    /* --- Season label --- */
    $played_logs  = array_values( array_filter( $player_logs, function( $e ) {
        return isset( $e['game_status'] ) && $e['game_status'] === 'active';
    }));
    $games_played = count( $played_logs );
    $max_week     = 0;
    foreach ( $played_logs as $e ) {
        if ( $e['week'] > $max_week ) $max_week = $e['week'];
    }
    $is_complete   = $max_week >= 17;
    $season_label  = $games_played > 0
        ? ( $is_complete ? $active_season . ' Season Final' : $active_season . ' Season (Through Week ' . $max_week . ')' )
        : null;

    /* --- Trends --- */
    $weekly_pts = [];
    foreach ( $played_logs as $e ) {
        $weekly_pts[] = sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format );
    }
    $trends = ! empty( $weekly_pts ) ? [ 'weeklyFantasyPoints' => $weekly_pts ] : null;

    /* --- Multi-season stats + career season stats --- */
    $multi_season_stats  = [];
    $career_season_stats = [];

    $pos_bust_thresh = ( $position === 'QB' || $position === 'TE' ) ? 18 : ( $position === 'WR' ? 36 : 30 );
    $has_tier3       = $pos_bust_thresh > 24;

    foreach ( $seasons as $s ) {
        $s_logs  = sc_load_game_logs( $s );
        $p_logs  = isset( $s_logs[ $player_id ] ) ? $s_logs[ $player_id ] : [];
        $s_played = array_values( array_filter( $p_logs, function( $e ) use ( $position ) {
            return sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $position );
        }));
        if ( empty( $s_played ) ) continue;

        $gp      = count( $s_played );
        $total   = 0;
        foreach ( $s_played as $e ) {
            $total += sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format );
        }

        /* attach ranks for this season */
        $s_ranks  = sc_build_weekly_ranks( $s, $s_logs, $all_players, $format );
        $pos2_end = $has_tier3 ? 24 : $pos_bust_thresh;
        $p1 = $p2 = $p3 = $bust = 0;
        foreach ( $p_logs as $e ) {
            if ( ! sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $position ) ) continue;
            $week = $e['week'];
            $r    = ( isset( $s_ranks[ $player_id ] ) && isset( $s_ranks[ $player_id ][ $week ] ) )
                ? $s_ranks[ $player_id ][ $week ] : null;
            if ( $r === null ) continue;
            if ( $r >= 1 && $r <= 12 )                                   $p1++;
            elseif ( $r >= 13 && $r <= $pos2_end )                       $p2++;
            elseif ( $has_tier3 && $r >= 25 && $r <= $pos_bust_thresh )  $p3++;
            elseif ( $r > $pos_bust_thresh )                             $bust++;
        }

        $multi_season_stats[] = [
            'season'     => $s,
            'ppg'        => $gp > 0 ? $total / $gp : 0,
            'gamesPlayed'=> $gp,
            'pos1Pct'    => $gp > 0 ? ( $p1 / $gp ) * 100 : 0,
            'pos2Pct'    => $gp > 0 ? ( $p2 / $gp ) * 100 : 0,
            'pos3Pct'    => $gp > 0 ? ( $p3 / $gp ) * 100 : 0,
            'bustPct'    => $gp > 0 ? ( $bust / $gp ) * 100 : 0,
        ];

        /* career season raw stats */
        $pass_att = $pass_cmp = $pass_yd = $pass_td = $pass_int = 0;
        $rush_att = $rush_yd = $rush_td = 0;
        $targets = $receptions = $rec_yd = $rec_td = 0;
        foreach ( $s_played as $e ) {
            $st = isset( $e['stats'] ) ? $e['stats'] : [];
            $pass_att  += isset( $st['pass_att'] )  ? (float)$st['pass_att']  : 0;
            $pass_cmp  += isset( $st['pass_cmp'] )  ? (float)$st['pass_cmp']  : 0;
            $pass_yd   += isset( $st['pass_yd'] )   ? (float)$st['pass_yd']   : 0;
            $pass_td   += isset( $st['pass_td'] )   ? (float)$st['pass_td']   : 0;
            $pass_int  += isset( $st['pass_int'] )  ? (float)$st['pass_int']  : 0;
            $rush_att  += isset( $st['rush_att'] )  ? (float)$st['rush_att']  : 0;
            $rush_yd   += isset( $st['rush_yd'] )   ? (float)$st['rush_yd']   : 0;
            $rush_td   += isset( $st['rush_td'] )   ? (float)$st['rush_td']   : 0;
            $targets   += isset( $st['rec_tgt'] )   ? (float)$st['rec_tgt']   : 0;
            $receptions+= isset( $st['rec'] )       ? (float)$st['rec']       : 0;
            $rec_yd    += isset( $st['rec_yd'] )    ? (float)$st['rec_yd']    : 0;
            $rec_td    += isset( $st['rec_td'] )    ? (float)$st['rec_td']    : 0;
        }

        /* season ppg rank */
        $season_ppg_all = [];
        foreach ( $s_logs as $pid2 => $pl2 ) {
            $matched = null;
            foreach ( $all_players as $ap ) {
                if ( $ap['id'] === $pid2 ) { $matched = $ap; break; }
            }
            if ( ! $matched || ( isset( $matched['position'] ) ? $matched['position'] : '' ) !== $position ) continue;
            $pp2 = array_values( array_filter( $pl2, function( $e ) use ( $position ) {
                return sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $position );
            }));
            if ( count( $pp2 ) < 4 ) continue;
            $tp2 = 0;
            foreach ( $pp2 as $e ) $tp2 += sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format );
            $season_ppg_all[] = [ 'id' => $pid2, 'ppg' => $tp2 / count( $pp2 ) ];
        }
        usort( $season_ppg_all, function( $a, $b ) {
            if ( $b['ppg'] == $a['ppg'] ) return 0;
            return $b['ppg'] > $a['ppg'] ? 1 : -1;
        });
        $pos_rank_s = null;
        foreach ( $season_ppg_all as $idx => $item ) {
            if ( $item['id'] === $player_id ) { $pos_rank_s = $idx + 1; break; }
        }

        $career_season_stats[] = [
            'season'       => $s,
            'gp'           => $gp,
            'ppg'          => $gp > 0 ? $total / $gp : 0,
            'posRank'      => $pos_rank_s,
            'pass_att'     => $pass_att,
            'pass_cmp'     => $pass_cmp,
            'pass_yd'      => $pass_yd,
            'pass_td'      => $pass_td,
            'pass_int'     => $pass_int,
            'rush_att'     => $rush_att,
            'rush_yd'      => $rush_yd,
            'rush_td'      => $rush_td,
            'targets'      => $targets,
            'receptions'   => $receptions,
            'rec_yd'       => $rec_yd,
            'rec_td'       => $rec_td,
            'total_td'     => $pass_td + $rush_td + $rec_td,
            'scrimmage_yd' => $rush_yd + $rec_yd,
        ];
    }

    /* --- Season rank --- */
    $season_rank = null;
    if ( $games_played > 0 && $position ) {
        $act_logs = sc_load_game_logs( $active_season );
        $ppg_all  = [];
        foreach ( $act_logs as $pid2 => $pl2 ) {
            $matched = null;
            foreach ( $all_players as $ap ) {
                if ( $ap['id'] === $pid2 ) { $matched = $ap; break; }
            }
            if ( ! $matched || ( isset( $matched['position'] ) ? $matched['position'] : '' ) !== $position ) continue;
            $pp2 = array_values( array_filter( $pl2, function( $e ) use ( $position ) {
                return sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $position );
            }));
            if ( count( $pp2 ) < 4 ) continue;
            $tp2 = 0;
            foreach ( $pp2 as $e ) $tp2 += sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format );
            $ppg_all[] = [ 'id' => $pid2, 'ppg' => $tp2 / count( $pp2 ) ];
        }
        usort( $ppg_all, function( $a, $b ) {
            if ( $b['ppg'] == $a['ppg'] ) return 0;
            return $b['ppg'] > $a['ppg'] ? 1 : -1;
        });
        foreach ( $ppg_all as $idx => $item ) {
            if ( $item['id'] === $player_id ) { $season_rank = $idx + 1; break; }
        }
    }

    /* --- Career profile (3-year window) --- */
    $career_profile = null;
    $three_seasons  = [ $active_season, $active_season - 1, $active_season - 2 ];
    $ty_stats       = array_filter( $multi_season_stats, function( $m ) use ( $three_seasons ) {
        return in_array( $m['season'], $three_seasons, true );
    });
    $ty_stats = array_values( $ty_stats );

    if ( count( $ty_stats ) > 1 ) {
        $all_pts = [];
        $p1t = $p2t = $p3t = $bustt = 0;
        foreach ( $three_seasons as $s ) {
            $found = false;
            foreach ( $multi_season_stats as $m ) {
                if ( $m['season'] === $s ) { $found = true; break; }
            }
            if ( ! $found ) continue;
            $s_logs   = sc_load_game_logs( $s );
            $s_played = array_values( array_filter(
                isset( $s_logs[ $player_id ] ) ? $s_logs[ $player_id ] : [],
                function( $e ) use ( $position ) {
                    return sc_has_participation( isset( $e['stats'] ) ? $e['stats'] : [], $position );
                }
            ));
            foreach ( $s_played as $e ) {
                $all_pts[] = sc_get_entry_points( isset( $e['stats'] ) ? $e['stats'] : [], $format );
            }
            $s_ranks = sc_build_weekly_ranks( $s, $s_logs, $all_players, $format );
            $pos2_end2 = $has_tier3 ? 24 : $pos_bust_thresh;
            foreach ( $s_played as $e ) {
                $week = $e['week'];
                $r = ( isset( $s_ranks[ $player_id ] ) && isset( $s_ranks[ $player_id ][ $week ] ) )
                    ? $s_ranks[ $player_id ][ $week ] : null;
                if ( $r === null ) continue;
                if ( $r <= 12 )                                         $p1t++;
                elseif ( $r <= $pos2_end2 )                             $p2t++;
                elseif ( $has_tier3 && $r <= $pos_bust_thresh )         $p3t++;
                elseif ( $r > $pos_bust_thresh )                        $bustt++;
            }
        }

        $total_gp  = count( $all_pts );
        $max_games = count( $ty_stats ) * 17;
        $total_pts = array_sum( $all_pts );
        $ppg_c     = $total_gp > 0 ? $total_pts / $total_gp : 0;
        $variance  = 0;
        if ( $total_gp > 1 ) {
            foreach ( $all_pts as $v ) $variance += pow( $v - $ppg_c, 2 );
            $variance /= ( $total_gp - 1 );
        }
        $vol      = sqrt( $variance );
        $vol_label = $vol < 6 ? 'Low' : ( $vol < 9 ? 'Moderate' : 'High' );

        $season_ppgs = [];
        foreach ( $ty_stats as $m ) {
            $season_ppgs[] = [ 'season' => $m['season'], 'ppg' => $m['ppg'] ];
        }

        $career_profile = [
            'ppg'            => $ppg_c,
            'gamesPlayed'    => $total_gp,
            'maxGames'       => $max_games,
            'durabilityPct'  => $max_games > 0 ? ( $total_gp / $max_games ) * 100 : 0,
            'pos1Pct'        => $total_gp > 0 ? ( $p1t / $total_gp ) * 100 : 0,
            'pos2Pct'        => $total_gp > 0 ? ( $p2t / $total_gp ) * 100 : 0,
            'pos3Pct'        => $total_gp > 0 ? ( $p3t / $total_gp ) * 100 : 0,
            'bustPct'        => $total_gp > 0 ? ( $bustt / $total_gp ) * 100 : 0,
            'volatility'     => $vol,
            'volatilityLabel'=> $vol_label,
            'seasons'        => count( $ty_stats ),
            'seasonPpgs'     => $season_ppgs,
            'smallSample'    => $total_gp < 8,
        ];
    }

    /* --- Dynasty + Bio --- */
    $dynasty = sc_load_dynasty();
    $dynasty_data = ( $dynasty && isset( $dynasty[ $player['slug'] ] ) ) ? $dynasty[ $player['slug'] ] : null;

    $bios = sc_load_bios();
    $bio  = ( $bios && isset( $bios[ $player['slug'] ] ) ) ? $bios[ $player['slug'] ] : null;

    /* --- Season team (team during the active/completed season, not current) --- */
    $season_team = sc_derive_season_team( $player_logs, $team );

    return [
        'activeSeason'      => $active_season,
        'seasonLabel'       => $season_label,
        'seasonRank'        => $season_rank,
        'seasonTeam'        => $season_team,
        'trends'            => $trends,
        'gameLog'           => $player_logs,
        'availableSeasons'  => $seasons,
        'multiSeasonStats'  => $multi_season_stats,
        'careerSeasonStats' => $career_season_stats,
        'careerProfile'     => $career_profile,
        'dynasty'           => $dynasty_data,
        'bio'               => $bio,
    ];
}
