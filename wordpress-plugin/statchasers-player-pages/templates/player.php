<!-- SCPP v0.5.0 React Mount -->
<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$player = get_query_var( 'sc_player' );
if ( ! $player ) {
    echo '<p>Player not found.</p>';
    return;
}
?>
<div class="scpp-root" data-scpp-template="player" data-scpp-version="<?php echo esc_attr( SC_VERSION ); ?>">
  <noscript>
    <div style="max-width:1100px;margin:0 auto;padding:24px 16px;">
      <h1><?php echo esc_html( $player['name'] ); ?> Fantasy Football Outlook</h1>
      <p><?php echo esc_html( $player['position'] ); ?> &mdash; <?php echo esc_html( $player['team'] ? $player['team'] : 'Free Agent' ); ?></p>
      <p>Enable JavaScript to view the full player profile.</p>
    </div>
  </noscript>
  <div style="max-width:1100px;margin:0 auto;padding:48px 16px;text-align:center;color:#6b7280;">
    Loading player profile&hellip;
  </div>
</div>

