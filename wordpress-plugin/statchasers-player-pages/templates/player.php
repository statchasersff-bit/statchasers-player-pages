<!-- SCPP TEMPLATE MARKER: 2026-02-19-AAA -->
<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$player = get_query_var( 'sc_player' );
if ( ! $player ) {
    echo '<p>Player not found.</p>';
    return;
}
?>
<!-- StatChasers Player Pages Template -->
<div class="sc-players">

  <nav class="sc-breadcrumb">
    <a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>">&larr; Back to Player Search</a>
  </nav>

  <header class="sc-player-header">
    <h1 class="sc-page-title"><?php echo esc_html( $player['name'] ); ?> Fantasy Football Outlook</h1>
    <p class="sc-player-meta-line">
      <?php
      $parts = array();
      if ( $player['position'] ) $parts[] = $player['position'];
      $parts[] = $player['team'] ? $player['team'] : 'Free Agent';
      echo esc_html( implode( ' — ', $parts ) );
      ?>
    </p>
    <?php if ( $player['status'] ) : ?>
      <span class="sc-badge sc-badge-status"><?php echo esc_html( $player['status'] ); ?></span>
    <?php endif; ?>
    <?php if ( $player['injury_status'] ) : ?>
      <span class="sc-badge sc-badge-injury"><?php echo esc_html( $player['injury_status'] ); ?></span>
    <?php endif; ?>
  </header>

  <?php if ( $player['injury_status'] ) : ?>
    <div class="sc-injury-alert">
      <strong>Injury Status:</strong>
      <span><?php echo esc_html( $player['injury_status'] ); ?></span>
      <p>This player is currently listed with an injury designation.</p>
    </div>
  <?php endif; ?>

  <div class="sc-card sc-snapshot">
    <h2 class="sc-card-title">Player Snapshot</h2>
    <div class="sc-snapshot-grid">
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
        <div class="sc-snapshot-item">
          <span class="sc-snapshot-label"><?php echo esc_html( $label ); ?></span>
          <span class="sc-snapshot-value"><?php echo esc_html( $value ); ?></span>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="sc-sections-grid">
    <div class="sc-card">
      <h2 class="sc-card-title">Trends</h2>
      <p class="sc-card-placeholder">Week-over-week fantasy scoring trends for <?php echo esc_html( $player['name'] ); ?> coming soon.</p>
    </div>
    <div class="sc-card">
      <h2 class="sc-card-title">Game Log</h2>
      <p class="sc-card-placeholder">Game-by-game stats for <?php echo esc_html( $player['name'] ); ?> will be available once the season begins.</p>
    </div>
    <div class="sc-card">
      <h2 class="sc-card-title">Rankings &amp; Projections</h2>
      <p class="sc-card-placeholder">Expert rankings and season projections for <?php echo esc_html( $player['name'] ); ?> coming soon.</p>
    </div>
    <div class="sc-card">
      <h2 class="sc-card-title">News &amp; Articles</h2>
      <p class="sc-card-placeholder">News and analysis related to <?php echo esc_html( $player['name'] ); ?> will appear here as published.</p>
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
  <div class="sc-card sc-related">
    <h2 class="sc-card-title">Related <?php echo esc_html( $player['position'] ); ?>s</h2>
    <div class="sc-related-grid">
      <?php foreach ( $related as $rp ) : ?>
        <a href="<?php echo esc_url( home_url( '/nfl/players/' . $rp['slug'] . '/' ) ); ?>" class="sc-related-link">
          <div class="sc-related-icon"><span><?php echo esc_html( $rp['position'] ); ?></span></div>
          <div>
            <strong class="sc-related-name"><?php echo esc_html( $rp['name'] ); ?></strong>
            <span class="sc-related-team"><?php echo esc_html( $rp['team'] ); ?></span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
  <?php endif; ?>

  <div class="sc-nav-grid">
    <a href="<?php echo esc_url( home_url( '/nfl/players/' ) ); ?>" class="sc-nav-link">
      <strong>Player Directory</strong>
      <span>Search all players</span>
    </a>
    <a href="<?php echo esc_url( home_url( '/rankings/' ) ); ?>" class="sc-nav-link">
      <strong>Rankings</strong>
      <span>Fantasy football rankings</span>
    </a>
    <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" class="sc-nav-link">
      <strong>Tools</strong>
      <span>Analysis tools</span>
    </a>
    <a href="<?php echo esc_url( home_url( '/articles/' ) ); ?>" class="sc-nav-link">
      <strong>Articles</strong>
      <span>Expert analysis</span>
    </a>
  </div>

</div>

<style>
    .sc-players { max-width: 1100px; margin: 0 auto; padding: 24px 16px; box-sizing: border-box; }
    @media (min-width: 1200px) { .sc-players { max-width: 1200px; } }
    .sc-players .sc-breadcrumb { margin-bottom: 24px; }
    .sc-players .sc-breadcrumb a { text-decoration: none; color: #2563eb; font-size: 14px; }
    .sc-players .sc-player-header { margin-bottom: 32px; }
    .sc-players .sc-page-title { font-size: 2em; margin: 0 0 8px 0; padding: 0; line-height: 1.2; }
    .sc-players .sc-player-meta-line { font-size: 1.1em; color: #6b7280; margin: 0; }
    .sc-players .sc-badge { display: inline-block; margin-top: 8px; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 4px; }
    .sc-players .sc-badge-status { background: rgba(59,130,246,0.1); color: #2563eb; }
    .sc-players .sc-badge-injury { background: #fef2f2; color: #dc2626; margin-left: 6px; }
    .sc-players .sc-injury-alert { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 6px; padding: 14px 18px; margin-bottom: 24px; }
    .sc-players .sc-injury-alert strong { color: #dc2626; }
    .sc-players .sc-injury-alert p { margin: 6px 0 0; color: #6b7280; font-size: 0.9em; }
    .sc-players .sc-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px; }
    .sc-players .sc-card-title { font-size: 1.3em; margin: 0 0 16px 0; padding: 0; }
    .sc-players .sc-card-placeholder { color: #9ca3af; font-size: 0.9em; margin: 0; }
    .sc-players .sc-snapshot-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
    .sc-players .sc-snapshot-item { background: #fff; border-radius: 6px; padding: 12px 16px; }
    .sc-players .sc-snapshot-label { display: block; font-size: 0.75em; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
    .sc-players .sc-snapshot-value { font-size: 1.1em; font-weight: 600; }
    .sc-players .sc-sections-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-bottom: 8px; }
    .sc-players .sc-sections-grid .sc-card { margin-bottom: 0; }
    .sc-players .sc-sections-grid .sc-card-title { font-size: 1.15em; margin-bottom: 8px; }
    .sc-players .sc-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
    .sc-players .sc-related-link {
        display: flex; align-items: center; gap: 10px; padding: 10px 14px;
        background: #fff; border-radius: 6px; text-decoration: none; color: inherit;
        border: 1px solid #e5e7eb; transition: border-color 0.15s;
    }
    .sc-players .sc-related-link:hover { border-color: #9ca3af; }
    .sc-players .sc-related-icon {
        width: 34px; height: 34px; border-radius: 6px; background: #e5e7eb;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .sc-players .sc-related-icon span { font-size: 10px; font-weight: 700; color: #6b7280; }
    .sc-players .sc-related-name { font-size: 14px; display: block; }
    .sc-players .sc-related-team { font-size: 12px; color: #9ca3af; }
    .sc-players .sc-nav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 24px; }
    .sc-players .sc-nav-link {
        display: block; background: #f9fafb; border: 1px solid #e5e7eb;
        border-radius: 8px; padding: 16px; text-decoration: none; color: inherit;
    }
    .sc-players .sc-nav-link:hover { border-color: #9ca3af; }
    .sc-players .sc-nav-link strong { display: block; color: #111827; }
    .sc-players .sc-nav-link span { font-size: 0.85em; color: #6b7280; }
</style>
