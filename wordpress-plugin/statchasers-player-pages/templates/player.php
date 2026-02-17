<?php
/**
 * Template: Single Player Page
 *
 * Uses the active theme's header and footer (Divi compatible).
 * Receives $sc_player via set_query_var().
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$player = get_query_var( 'sc_player' );
if ( ! $player ) {
    global $wp_query;
    $wp_query->set_404();
    status_header( 404 );
    nocache_headers();
    include get_404_template();
    exit;
}

get_header();
?>

<div id="sc-player-page" style="max-width: 960px; margin: 0 auto; padding: 40px 20px;">

    <nav style="margin-bottom: 24px;">
        <a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>" style="text-decoration: none; color: #2563eb; font-size: 14px;">
            &larr; Back to Player Search
        </a>
    </nav>

    <header style="margin-bottom: 32px;">
        <h1 style="font-size: 2em; margin: 0 0 8px 0; line-height: 1.2;">
            <?php echo esc_html( $player['name'] ); ?>
        </h1>
        <p style="font-size: 1.1em; color: #6b7280; margin: 0;">
            <?php
            $parts = array();
            if ( $player['position'] ) {
                $parts[] = $player['position'];
            }
            if ( $player['team'] ) {
                $parts[] = $player['team'];
            } else {
                $parts[] = 'Free Agent';
            }
            echo esc_html( implode( ' | ', $parts ) );
            ?>
        </p>
    </header>

    <?php if ( $player['injury_status'] ) : ?>
        <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 6px; padding: 14px 18px; margin-bottom: 24px;">
            <strong style="color: #dc2626;">Injury Status:</strong>
            <span><?php echo esc_html( $player['injury_status'] ); ?></span>
            <p style="margin: 6px 0 0; color: #6b7280; font-size: 0.9em;">
                This player is currently listed with an injury designation.
            </p>
        </div>
    <?php endif; ?>

    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
        <h2 style="font-size: 1.3em; margin: 0 0 16px 0;">Player Snapshot</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;">
            <div style="background: #fff; border-radius: 6px; padding: 12px 16px;">
                <span style="display: block; font-size: 0.8em; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Age</span>
                <span style="font-size: 1.1em; font-weight: 600;"><?php echo $player['age'] ? esc_html( $player['age'] ) : 'N/A'; ?></span>
            </div>
            <div style="background: #fff; border-radius: 6px; padding: 12px 16px;">
                <span style="display: block; font-size: 0.8em; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Height</span>
                <span style="font-size: 1.1em; font-weight: 600;"><?php echo $player['height'] ? esc_html( $player['height'] ) : 'N/A'; ?></span>
            </div>
            <div style="background: #fff; border-radius: 6px; padding: 12px 16px;">
                <span style="display: block; font-size: 0.8em; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Weight</span>
                <span style="font-size: 1.1em; font-weight: 600;"><?php echo $player['weight'] ? esc_html( $player['weight'] . ' lbs' ) : 'N/A'; ?></span>
            </div>
            <div style="background: #fff; border-radius: 6px; padding: 12px 16px;">
                <span style="display: block; font-size: 0.8em; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Status</span>
                <span style="font-size: 1.1em; font-weight: 600;"><?php echo $player['status'] ? esc_html( $player['status'] ) : 'N/A'; ?></span>
            </div>
        </div>
    </div>

    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
        <h2 style="font-size: 1.3em; margin: 0 0 12px 0;">Fantasy Insights</h2>
        <p style="color: #6b7280; margin: 0 0 12px;">
            Detailed stats, trends, and projections for <?php echo esc_html( $player['name'] ); ?> are being compiled.
            Check back for updated analysis throughout the season.
        </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-bottom: 40px;">
        <a href="<?php echo esc_url( home_url( '/rankings/' ) ); ?>" style="display: block; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; text-decoration: none; color: inherit; transition: box-shadow 0.15s;">
            <strong style="display: block; color: #111827;">Rankings</strong>
            <span style="font-size: 0.85em; color: #6b7280;">Fantasy football rankings</span>
        </a>
        <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" style="display: block; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; text-decoration: none; color: inherit; transition: box-shadow 0.15s;">
            <strong style="display: block; color: #111827;">Tools</strong>
            <span style="font-size: 0.85em; color: #6b7280;">Analysis tools</span>
        </a>
        <a href="<?php echo esc_url( home_url( '/articles/' ) ); ?>" style="display: block; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; text-decoration: none; color: inherit; transition: box-shadow 0.15s;">
            <strong style="display: block; color: #111827;">Articles</strong>
            <span style="font-size: 0.85em; color: #6b7280;">Expert analysis</span>
        </a>
    </div>

</div>

<?php get_footer(); ?>
