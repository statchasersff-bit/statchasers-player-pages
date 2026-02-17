<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_head', 'sc_inject_seo_meta', 1 );
add_filter( 'pre_get_document_title', 'sc_filter_document_title', 999 );
add_filter( 'document_title_parts', 'sc_filter_title_parts', 999 );

function sc_filter_document_title( $title ) {
    $slug = get_query_var( 'sc_player_slug' );
    if ( $slug ) {
        $player = sc_get_player_by_slug( $slug );
        if ( $player ) {
            return $player['name'] . ' Fantasy Football Profile | StatChasers';
        }
    }
    if ( get_query_var( 'sc_players_index' ) ) {
        return 'NFL Player Database | StatChasers';
    }
    return $title;
}

function sc_filter_title_parts( $parts ) {
    $slug = get_query_var( 'sc_player_slug' );
    if ( $slug ) {
        $player = sc_get_player_by_slug( $slug );
        if ( $player ) {
            $parts['title'] = $player['name'] . ' Fantasy Football Profile | StatChasers';
            unset( $parts['site'] );
            unset( $parts['tagline'] );
        }
        return $parts;
    }
    if ( get_query_var( 'sc_players_index' ) ) {
        $parts['title'] = 'NFL Player Database | StatChasers';
        unset( $parts['site'] );
        unset( $parts['tagline'] );
    }
    return $parts;
}

function sc_inject_seo_meta() {
    $slug = get_query_var( 'sc_player_slug' );
    if ( $slug ) {
        $player = sc_get_player_by_slug( $slug );
        if ( ! $player ) return;

        $pos  = $player['position'] ? $player['position'] : 'NFL';
        $team = $player['team'] ? $player['team'] : 'FA';
        $name = esc_attr( $player['name'] );
        $desc = esc_attr( "Fantasy profile for {$player['name']} ({$pos} - {$team}). Stats, trends, and StatChasers insights." );
        $canonical = esc_url( 'https://statchasers.com/nfl/players/' . $player['slug'] . '/' );
        $title = esc_attr( "{$player['name']} Fantasy Football Profile | StatChasers" );

        echo '<meta name="description" content="' . $desc . '" />' . "\n";
        echo '<meta property="og:title" content="' . $title . '" />' . "\n";
        echo '<meta property="og:description" content="' . $desc . '" />' . "\n";
        echo '<meta property="og:type" content="profile" />' . "\n";
        echo '<meta property="og:url" content="' . $canonical . '" />' . "\n";
        echo '<link rel="canonical" href="' . $canonical . '" />' . "\n";

        $json_ld = array(
            '@context' => 'https://schema.org',
            '@type'    => 'Person',
            'name'     => $player['name'],
            'sport'    => 'American Football',
            'url'      => 'https://statchasers.com/nfl/players/' . $player['slug'] . '/',
        );
        if ( $player['team'] && $player['team'] !== 'FA' ) {
            $json_ld['affiliation'] = array(
                '@type' => 'SportsTeam',
                'name'  => $player['team'],
            );
        }
        echo '<script type="application/ld+json">' . wp_json_encode( $json_ld, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
        return;
    }

    if ( get_query_var( 'sc_players_index' ) ) {
        $idx_title = 'NFL Player Database | StatChasers';
        $desc = 'Search and browse fantasy football profiles for over 4,000 NFL players. Stats, trends, and insights.';
        $canonical = esc_url( 'https://statchasers.com/nfl/players/' );
        echo '<meta name="description" content="' . esc_attr( $desc ) . '" />' . "\n";
        echo '<meta property="og:title" content="' . esc_attr( $idx_title ) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr( $desc ) . '" />' . "\n";
        echo '<meta property="og:type" content="website" />' . "\n";
        echo '<meta property="og:url" content="' . $canonical . '" />' . "\n";
        echo '<link rel="canonical" href="' . $canonical . '" />' . "\n";
    }
}
