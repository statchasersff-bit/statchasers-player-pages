<?php
if ( ! defined( 'ABSPATH' ) ) exit;
?>
<!-- StatChasers Player Pages Template -->
<div class="scpp-root" data-scpp-template="index" data-scpp-version="<?php echo esc_attr( SC_VERSION ); ?>">
  <div class="sc-players">

    <!-- HERO -->
    <header class="sc-header">
      <div class="sc-header__kicker">StatChasers • Player Pages</div>

      <h1 class="sc-page-title">NFL Player Database</h1>
      <div class="sc-gold-underline" aria-hidden="true"></div>

      <p class="sc-page-subtitle">
        Search over <strong>4,000+</strong> NFL players. Click any player for their full fantasy profile.
      </p>
    </header>

    <!-- SEARCH -->
    <div class="sc-search">
      <label for="sc-search-input" class="sr-only">Search players</label>

      <div class="sc-search__bar">
        <span class="sc-search__icon" aria-hidden="true">
          <!-- magnifying glass -->
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </span>

        <input
          type="search"
          id="sc-search-input"
          placeholder="Search players (e.g., Tyreek Hill)"
          autocomplete="off"
          class="sc-search-input"
        />

        <button type="button" class="sc-search__clear" id="sc-clear-btn" aria-label="Clear search">
          <!-- X -->
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="sc-search__meta">
        <p id="sc-results-count" class="sc-results-count">Type a name or team to search</p>
        <p class="sc-search__hint">Tip: Use ↑ / ↓ then Enter</p>
      </div>
    </div>

    <!-- RESULTS -->
    <section class="sc-resultsCard" aria-label="Player search results">
      <div id="sc-results" class="sc-results"></div>

      <!-- Optional empty state (JS can toggle if you want later) -->
      <div id="sc-empty" class="sc-empty" style="display:none;">
        <div class="sc-empty__icon" aria-hidden="true">🏈</div>
        <div class="sc-empty__title">No matches</div>
        <div class="sc-empty__sub">Try a different name, team, or position.</div>
      </div>
    </section>

  </div>
</div>

<?php /* Config passed via wp_localize_script; players.js enqueued with filemtime cache-busting */ ?>

<script>
/* Small UX helper: show/hide clear button without touching your main JS */
(function(){
  var input = document.getElementById('sc-search-input');
  var btn = document.getElementById('sc-clear-btn');
  if (!input || !btn) return;

  function sync(){
    btn.style.display = input.value && input.value.length ? 'inline-flex' : 'none';
  }
  btn.addEventListener('click', function(){
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles:true }));
    input.focus();
    sync();
  });
  input.addEventListener('input', sync);
  sync();
})();
</script>
