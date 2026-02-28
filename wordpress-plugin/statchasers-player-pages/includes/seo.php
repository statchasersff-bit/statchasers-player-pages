<?php
/**
 * StatChasers Player Pages — SEO
 * - Injects meta tags + JSON-LD for:
 *   1) Player pages (/nfl/players/{slug}/)
 *   2) Players index (/nfl/players/)
 * - Provides a renderable SEO content block for the Players index page
 *   (use in templates/index.php after the React root container)
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_head', 'sc_inject_seo_meta', 1 );
add_filter( 'pre_get_document_title', 'sc_filter_document_title', 999 );
add_filter( 'document_title_parts', 'sc_filter_title_parts', 999 );

/**
 * Build <title> for player pages
 */
function sc_build_player_title( $player ) {
    return $player['name'] . ' Fantasy Football Stats, Rankings & Analysis | StatChasers';
}

/**
 * Build meta description for player pages
 */
function sc_build_player_description( $player ) {
    return 'View ' . $player['name'] . ' fantasy football stats, trends, rankings, projections, and analysis. Updated for 2026 NFL season.';
}

/**
 * Determine if we're on the Players index route.
 * (Your plugin already sets sc_players_index query var via rewrite.php)
 */
function sc_is_players_index() {
    return (bool) get_query_var( 'sc_players_index' );
}

/**
 * Determine if we're on a Player route.
 */
function sc_get_current_player_from_query() {
    $slug = get_query_var( 'sc_player_slug' );
    if ( ! $slug ) return null;

    $player = sc_get_player_by_slug( $slug );
    if ( ! $player ) return null;

    return $player;
}

/**
 * Filter the full document title (fallback)
 */
function sc_filter_document_title( $title ) {
    $player = sc_get_current_player_from_query();
    if ( $player ) {
        return sc_build_player_title( $player );
    }

    if ( sc_is_players_index() ) {
        return 'NFL Fantasy Football Player Database (2026) | StatChasers';
    }

    return $title;
}

/**
 * Filter title parts (preferred by WP themes)
 */
function sc_filter_title_parts( $parts ) {
    $player = sc_get_current_player_from_query();
    if ( $player ) {
        $parts['title'] = sc_build_player_title( $player );
        unset( $parts['site'] );
        unset( $parts['tagline'] );
        return $parts;
    }

    if ( sc_is_players_index() ) {
        $parts['title'] = 'NFL Fantasy Football Player Database (2026) | StatChasers';
        unset( $parts['site'] );
        unset( $parts['tagline'] );
    }

    return $parts;
}

/**
 * Inject meta tags + JSON-LD into <head>
 */
function sc_inject_seo_meta() {
    // Player page
    $player = sc_get_current_player_from_query();
    if ( $player ) {
        $title     = esc_attr( sc_build_player_title( $player ) );
        $desc      = esc_attr( sc_build_player_description( $player ) );
        $canonical = esc_url( home_url( '/nfl/players/' . $player['slug'] . '/' ) );

        echo '<meta name="description" content="' . $desc . '" />' . "\n";
        echo '<meta property="og:title" content="' . $title . '" />' . "\n";
        echo '<meta property="og:description" content="' . $desc . '" />' . "\n";
        echo '<meta property="og:type" content="profile" />' . "\n";
        echo '<meta property="og:url" content="' . $canonical . '" />' . "\n";
        echo '<link rel="canonical" href="' . $canonical . '" />' . "\n";

        // JSON-LD: Person (simple + safe)
        $json_ld = array(
            '@context' => 'https://schema.org',
            '@type'    => 'Person',
            'name'     => $player['name'],
            'jobTitle' => 'NFL Player',
            'sport'    => 'American Football',
            'url'      => home_url( '/nfl/players/' . $player['slug'] . '/' ),
        );

        if ( ! empty( $player['team'] ) && $player['team'] !== 'FA' ) {
            $json_ld['affiliation'] = array(
                '@type' => 'SportsTeam',
                'name'  => $player['team'],
                'sport' => 'American Football',
            );
        }

        echo '<script type="application/ld+json">' . wp_json_encode( $json_ld, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
        return;
    }

    // Players index page
    if ( sc_is_players_index() ) {
        $idx_title = 'NFL Fantasy Football Player Database (2026) | StatChasers';
        $desc      = 'Search over 4,000 NFL player profiles with advanced fantasy football analytics, rankings, dynasty values, game logs, and usage trends. Updated for 2026.';
        $canonical = esc_url( home_url( '/nfl/players/' ) );

        echo '<meta name="description" content="' . esc_attr( $desc ) . '" />' . "\n";
        echo '<meta property="og:title" content="' . esc_attr( $idx_title ) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr( $desc ) . '" />' . "\n";
        echo '<meta property="og:type" content="website" />' . "\n";
        echo '<meta property="og:url" content="' . $canonical . '" />' . "\n";
        echo '<link rel="canonical" href="' . $canonical . '" />' . "\n";

        // Optional: JSON-LD for the index page as a WebPage
        $json_ld = array(
            '@context' => 'https://schema.org',
            '@type'    => 'WebPage',
            'name'     => $idx_title,
            'url'      => $canonical,
            'description' => $desc,
        );
        echo '<script type="application/ld+json">' . wp_json_encode( $json_ld, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
    }
}

/**
 * Render crawlable SEO content under the Players Index tool.
 *
 * IMPORTANT: This does NOT automatically output anywhere.
 * You must echo it in templates/index.php AFTER your React root container.
 *
 * Example (templates/index.php):
 *   echo sc_render_players_index_seo_block();
 */
function sc_render_players_index_seo_block() {
    if ( ! sc_is_players_index() ) return '';

    $popular = array(
        array( 'Josh Allen',        'josh-allen' ),
        array( 'Breece Hall',       'breece-hall' ),
        array( 'Justin Jefferson',  'justin-jefferson' ),
        array( "Ja'Marr Chase",     'ja-marr-chase' ),
        array( 'Bijan Robinson',    'bijan-robinson' ),
        array( 'Lamar Jackson',     'lamar-jackson' ),
    );

    ob_start(); ?>
    <section class="scpp-seo" aria-labelledby="scpp-seo-title">
        <div class="scpp-seo__inner">
            <h2 id="scpp-seo-title">NFL Fantasy Football Player Profiles &amp; Analytics</h2>
            <p>
                The StatChasers NFL Player Database helps you search and analyze fantasy-relevant starters across all 32 NFL teams.
                Each player profile includes game logs, usage trends, rankings &amp; dynasty value, and the latest news — built for serious managers.
            </p>

            <h2 class="scpp-seo__h2">Popular NFL Player Profiles</h2>
            <ul class="scpp-seo__links">
                <?php foreach ( $popular as $p ) :
                    $name = esc_html( $p[0] );
                    $slug = sanitize_title( $p[1] );
                    $url  = esc_url( home_url( '/nfl/players/' . $slug . '/' ) ); ?>
                    <li><a href="<?php echo $url; ?>"><?php echo $name; ?></a></li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>
    <?php
    return ob_get_clean();
}