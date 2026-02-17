<?php
if ( ! defined( 'ABSPATH' ) ) exit;
get_header();
?>
<!-- StatChasers Player Pages Template -->
<div id="main-content">
  <article id="post-0" <?php post_class('et_pb_post'); ?>>
    <div class="entry-content">
      <div class="sc-players">

        <header class="sc-header">
          <h1 class="sc-page-title">NFL Player Database</h1>
          <p class="sc-page-subtitle">
            Search over 4,000 NFL players. Click any player for their full fantasy profile.
          </p>
        </header>

        <div class="sc-search-wrap">
          <input
            type="search"
            id="sc-search-input"
            placeholder="Search players (e.g., Tyreek Hill)"
            autocomplete="off"
            class="sc-search-input"
          />
        </div>

        <p id="sc-results-count" class="sc-results-count">Type a name or team to search</p>

        <div id="sc-results"></div>

      </div>
    </div>
  </article>
</div>

<style>
    .sc-players { max-width: 1100px; margin: 0 auto; padding: 24px 16px; box-sizing: border-box; }
    @media (min-width: 1200px) { .sc-players { max-width: 1200px; } }
    .sc-players .sc-header { margin-bottom: 32px; }
    .sc-players .sc-page-title { font-size: 2em; margin: 0 0 8px 0; padding: 0; line-height: 1.3; }
    .sc-players .sc-page-subtitle { color: #6b7280; margin: 0; font-size: 1em; }
    .sc-players .sc-search-wrap { margin-bottom: 24px; }
    .sc-players .sc-search-input {
        width: 100%; padding: 12px 16px; border: 1px solid #d1d5db;
        border-radius: 8px; font-size: 16px; outline: none; box-sizing: border-box;
    }
    .sc-players .sc-results-count { font-size: 0.9em; color: #9ca3af; margin-bottom: 16px; }
    .sc-players .sc-result-row {
        display: flex; align-items: center; gap: 14px;
        padding: 12px 16px; border-bottom: 1px solid #f3f4f6;
        text-decoration: none; color: inherit; transition: background-color 0.1s;
    }
    .sc-players .sc-result-row:hover,
    .sc-players .sc-result-row.sc-active { background-color: #f9fafb; }
    .sc-players .sc-result-row:first-child { border-top: 1px solid #e5e7eb; border-radius: 8px 8px 0 0; }
    .sc-players .sc-result-row:last-child { border-bottom: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .sc-players .sc-result-row:only-child { border-radius: 8px; }
    .sc-players .sc-result-icon {
        width: 40px; height: 40px; border-radius: 6px; background: #e5e7eb;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .sc-players .sc-result-icon span { font-size: 11px; font-weight: 700; color: #6b7280; }
    .sc-players .sc-result-info { display: flex; flex-direction: column; gap: 3px; }
    .sc-players .sc-result-info strong { font-size: 15px; }
    .sc-players .sc-result-meta { display: flex; align-items: center; gap: 6px; }
    .sc-players .sc-result-team { font-size: 12px; color: #9ca3af; }
    .sc-players .sc-pos-badge {
        display: inline-block; font-size: 10px; font-weight: 700;
        padding: 1px 6px; border-radius: 4px; text-transform: uppercase;
    }
    .sc-players .sc-pos-QB { background: rgba(239,68,68,0.12); color: #dc2626; }
    .sc-players .sc-pos-RB { background: rgba(59,130,246,0.12); color: #2563eb; }
    .sc-players .sc-pos-WR { background: rgba(34,197,94,0.12); color: #16a34a; }
    .sc-players .sc-pos-TE { background: rgba(249,115,22,0.12); color: #ea580c; }
    .sc-players .sc-pos-K  { background: rgba(168,85,247,0.12); color: #9333ea; }
    .sc-players .sc-pos-DEF { background: rgba(107,114,128,0.12); color: #4b5563; }
</style>

<script>
    window.scPlayersConfig = {
        restUrl: <?php echo wp_json_encode( rest_url( 'statchasers/v1/players' ) ); ?>,
        baseUrl: <?php echo wp_json_encode( home_url( '/nfl/players/' ) ); ?>
    };
</script>
<script src="<?php echo esc_url( SC_PLUGIN_URL . 'assets/players.js' ); ?>"></script>

<?php get_footer(); ?>
