<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', 'sc_register_sitemap_rewrite' );
add_action( 'template_redirect', 'sc_serve_sitemap' );

function sc_register_sitemap_rewrite() {
    add_rewrite_rule(
        '^sitemap-players\.xml$',
        'index.php?sc_player_sitemap=1',
        'top'
    );
}

add_filter( 'query_vars', function( $vars ) {
    $vars[] = 'sc_player_sitemap';
    return $vars;
} );

function sc_serve_sitemap() {
    if ( ! get_query_var( 'sc_player_sitemap' ) ) return;

    $base_url = 'https://statchasers.com';
    $today = gmdate( 'Y-m-d' );

    $indexed_slugs = sc_get_indexed_slugs();

    header( 'Content-Type: application/xml; charset=UTF-8' );
    header( 'Cache-Control: public, max-age=3600' );

    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    if ( ! empty( $indexed_slugs ) ) {
        foreach ( $indexed_slugs as $slug ) {
            echo '  <url>' . "\n";
            echo '    <loc>' . esc_url( $base_url . '/nfl/players/' . $slug . '/' ) . '</loc>' . "\n";
            echo '    <lastmod>' . $today . '</lastmod>' . "\n";
            echo '    <changefreq>weekly</changefreq>' . "\n";
            echo '    <priority>0.6</priority>' . "\n";
            echo '  </url>' . "\n";
        }
    } else {
        $players = sc_get_players();
        $count = 0;
        foreach ( $players as $p ) {
            if ( $count >= 300 ) break;
            echo '  <url>' . "\n";
            echo '    <loc>' . esc_url( $base_url . '/nfl/players/' . $p['slug'] . '/' ) . '</loc>' . "\n";
            echo '    <lastmod>' . $today . '</lastmod>' . "\n";
            echo '    <changefreq>weekly</changefreq>' . "\n";
            echo '    <priority>0.6</priority>' . "\n";
            echo '  </url>' . "\n";
            $count++;
        }
    }

    echo '</urlset>';
    exit;
}
