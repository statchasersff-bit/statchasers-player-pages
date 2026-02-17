<?php
if ( ! defined( 'ABSPATH' ) ) exit;

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
            if ( $player['position'] ) $parts[] = $player['position'];
            $parts[] = $player['team'] ? $player['team'] : 'Free Agent';
            echo esc_html( implode( ' — ', $parts ) );
            ?>
        </p>
        <?php if ( $player['status'] ) : ?>
            <span style="display:inline-block;margin-top:8px;font-size:12px;font-weight:600;padding:3px 10px;border-radius:4px;background:rgba(59,130,246,0.1);color:#2563eb;">
                <?php echo esc_html( $player['status'] ); ?>
            </span>
        <?php endif; ?>
        <?php if ( $player['injury_status'] ) : ?>
            <span style="display:inline-block;margin-top:8px;margin-left:6px;font-size:12px;font-weight:600;padding:3px 10px;border-radius:4px;background:#fef2f2;color:#dc2626;">
                <?php echo esc_html( $player['injury_status'] ); ?>
            </span>
        <?php endif; ?>
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
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px;">
            <?php
            $snapshot_items = array(
                'Team'     => $player['team'] ? $player['team'] : 'FA',
                'Position' => $player['position'] ? $player['position'] : 'N/A',
                'Age'      => $player['age'] ? $player['age'] : 'N/A',
                'Height'   => $player['height'] ? $player['height'] : 'N/A',
                'Weight'   => $player['weight'] ? $player['weight'] . ' lbs' : 'N/A',
                'Status'   => $player['status'] ? $player['status'] : 'N/A',
            );
            foreach ( $snapshot_items as $label => $value ) :
            ?>
                <div style="background: #fff; border-radius: 6px; padding: 12px 16px;">
                    <span style="display: block; font-size: 0.75em; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;"><?php echo esc_html( $label ); ?></span>
                    <span style="font-size: 1.1em; font-weight: 600;"><?php echo esc_html( $value ); ?></span>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
            <h2 style="font-size: 1.15em; margin: 0 0 8px 0;">Trends</h2>
            <p style="color: #9ca3af; font-size: 0.9em; margin: 0;">
                Week-over-week fantasy scoring trends for <?php echo esc_html( $player['name'] ); ?> coming soon.
            </p>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
            <h2 style="font-size: 1.15em; margin: 0 0 8px 0;">Game Log</h2>
            <p style="color: #9ca3af; font-size: 0.9em; margin: 0;">
                Game-by-game stats for <?php echo esc_html( $player['name'] ); ?> will be available once the season begins.
            </p>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
            <h2 style="font-size: 1.15em; margin: 0 0 8px 0;">Rankings & Projections</h2>
            <p style="color: #9ca3af; font-size: 0.9em; margin: 0;">
                Expert rankings and season projections for <?php echo esc_html( $player['name'] ); ?> coming soon.
            </p>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
            <h2 style="font-size: 1.15em; margin: 0 0 8px 0;">News & Articles</h2>
            <p style="color: #9ca3af; font-size: 0.9em; margin: 0;">
                News and analysis related to <?php echo esc_html( $player['name'] ); ?> will appear here as published.
            </p>
        </div>
    </div>

    <?php
    $players_all = sc_get_players();
    $related = array();
    foreach ( $players_all as $rp ) {
        if ( $rp['position'] === $player['position'] && $rp['slug'] !== $player['slug'] && $rp['team'] !== 'FA' ) {
            $related[] = $rp;
        }
    }
    shuffle( $related );
    $related = array_slice( $related, 0, 6 );
    if ( ! empty( $related ) ) :
    ?>
    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
        <h2 style="font-size: 1.3em; margin: 0 0 16px 0;">Related <?php echo esc_html( $player['position'] ); ?>s</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;">
            <?php foreach ( $related as $rp ) : ?>
                <a href="<?php echo esc_url( home_url( '/nfl/players/' . $rp['slug'] . '/' ) ); ?>" style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#fff;border-radius:6px;text-decoration:none;color:inherit;border:1px solid #e5e7eb;transition:border-color 0.15s;">
                    <div style="width:34px;height:34px;border-radius:6px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <span style="font-size:10px;font-weight:700;color:#6b7280;"><?php echo esc_html( $rp['position'] ); ?></span>
                    </div>
                    <div>
                        <strong style="font-size:14px;display:block;"><?php echo esc_html( $rp['name'] ); ?></strong>
                        <span style="font-size:12px;color:#9ca3af;"><?php echo esc_html( $rp['team'] ); ?></span>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;">
        <a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>" style="display:block;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;text-decoration:none;color:inherit;">
            <strong style="display:block;color:#111827;">Player Directory</strong>
            <span style="font-size:0.85em;color:#6b7280;">Search all players</span>
        </a>
        <a href="<?php echo esc_url( home_url( '/rankings/' ) ); ?>" style="display:block;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;text-decoration:none;color:inherit;">
            <strong style="display:block;color:#111827;">Rankings</strong>
            <span style="font-size:0.85em;color:#6b7280;">Fantasy football rankings</span>
        </a>
        <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" style="display:block;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;text-decoration:none;color:inherit;">
            <strong style="display:block;color:#111827;">Tools</strong>
            <span style="font-size:0.85em;color:#6b7280;">Analysis tools</span>
        </a>
        <a href="<?php echo esc_url( home_url( '/articles/' ) ); ?>" style="display:block;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;text-decoration:none;color:inherit;">
            <strong style="display:block;color:#111827;">Articles</strong>
            <span style="font-size:0.85em;color:#6b7280;">Expert analysis</span>
        </a>
    </div>

</div>

<?php get_footer(); ?>
