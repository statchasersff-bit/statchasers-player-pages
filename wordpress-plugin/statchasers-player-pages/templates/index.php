<?php
/**
 * Template: Player Index / Search Page
 *
 * Uses the active theme's header and footer (Divi compatible).
 * Loads player data client-side via REST API for search/filter.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

get_header();
?>

<div id="sc-player-index" style="max-width: 960px; margin: 0 auto; padding: 40px 20px;">

    <header style="margin-bottom: 32px;">
        <h1 style="font-size: 2em; margin: 0 0 8px 0;">NFL Player Database</h1>
        <p style="color: #6b7280; margin: 0;">
            Search over 4,000 NFL players. Click any player for their full fantasy profile.
        </p>
    </header>

    <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
        <input
            type="search"
            id="sc-search-input"
            placeholder="Search by name or team..."
            style="flex: 1; min-width: 200px; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none;"
        />
        <select
            id="sc-position-filter"
            style="padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; background: #fff; cursor: pointer;"
        >
            <option value="ALL">All Positions</option>
            <option value="QB">QB</option>
            <option value="RB">RB</option>
            <option value="WR">WR</option>
            <option value="TE">TE</option>
            <option value="K">K</option>
            <option value="DEF">DEF</option>
        </select>
    </div>

    <p id="sc-results-count" style="font-size: 0.9em; color: #9ca3af; margin-bottom: 16px;">Loading players...</p>

    <div id="sc-results-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
    </div>

</div>

<style>
    .sc-player-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: box-shadow 0.15s, border-color 0.15s;
    }
    .sc-player-card:hover {
        border-color: #93c5fd;
        box-shadow: 0 1px 4px rgba(37, 99, 235, 0.1);
    }
    .sc-pos-badge {
        display: inline-block;
        font-size: 11px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 4px;
        text-transform: uppercase;
    }
    .sc-pos-QB { background: rgba(239,68,68,0.12); color: #dc2626; }
    .sc-pos-RB { background: rgba(59,130,246,0.12); color: #2563eb; }
    .sc-pos-WR { background: rgba(34,197,94,0.12); color: #16a34a; }
    .sc-pos-TE { background: rgba(249,115,22,0.12); color: #ea580c; }
    .sc-pos-K  { background: rgba(168,85,247,0.12); color: #9333ea; }
    .sc-pos-DEF { background: rgba(107,114,128,0.12); color: #4b5563; }
    .sc-injury-badge {
        display: inline-block;
        font-size: 10px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 4px;
        background: #fef2f2;
        color: #dc2626;
    }
</style>

<script>
(function() {
    var players = [];
    var searchInput = document.getElementById('sc-search-input');
    var posFilter = document.getElementById('sc-position-filter');
    var resultsGrid = document.getElementById('sc-results-grid');
    var resultsCount = document.getElementById('sc-results-count');
    var baseUrl = <?php echo wp_json_encode( home_url( '/nfl/players/' ) ); ?>;

    function fetchPlayers() {
        var apiUrl = <?php echo wp_json_encode( rest_url( 'statchasers/v1/players' ) ); ?>;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                players = JSON.parse(xhr.responseText);
                render();
            } else {
                resultsCount.textContent = 'Failed to load players.';
            }
        };
        xhr.onerror = function() {
            resultsCount.textContent = 'Failed to load players.';
        };
        xhr.send();
    }

    function render() {
        var query = searchInput.value.toLowerCase().trim();
        var pos = posFilter.value;
        var filtered = [];

        for (var i = 0; i < players.length; i++) {
            var p = players[i];
            if (pos !== 'ALL' && p.position !== pos) continue;
            if (query) {
                var nameMatch = p.name.toLowerCase().indexOf(query) !== -1;
                var teamMatch = p.team && p.team.toLowerCase().indexOf(query) !== -1;
                if (!nameMatch && !teamMatch) continue;
            }
            filtered.push(p);
            if (filtered.length >= 100) break;
        }

        if (filtered.length >= 100) {
            resultsCount.textContent = 'Showing first 100 results' + (query ? ' for "' + query + '"' : '');
        } else {
            resultsCount.textContent = filtered.length + ' player' + (filtered.length !== 1 ? 's' : '') + ' found' + (query ? ' for "' + query + '"' : '');
        }

        var html = '';
        for (var j = 0; j < filtered.length; j++) {
            var pl = filtered[j];
            var posClass = pl.position ? 'sc-pos-' + pl.position : '';
            html += '<a href="' + baseUrl + pl.slug + '/" class="sc-player-card">';
            html += '<div style="flex-shrink:0;width:38px;height:38px;border-radius:6px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;">';
            html += '<span style="font-size:11px;font-weight:700;color:#6b7280;">' + (pl.position || '?') + '</span>';
            html += '</div>';
            html += '<div style="flex:1;min-width:0;">';
            html += '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';
            html += '<strong style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escHtml(pl.name) + '</strong>';
            if (pl.injury_status) {
                html += '<span class="sc-injury-badge">' + escHtml(pl.injury_status) + '</span>';
            }
            html += '</div>';
            html += '<div style="display:flex;align-items:center;gap:6px;margin-top:3px;">';
            if (pl.position) {
                html += '<span class="sc-pos-badge ' + posClass + '">' + pl.position + '</span>';
            }
            if (pl.team) {
                html += '<span style="font-size:12px;color:#9ca3af;">' + pl.team + '</span>';
            }
            html += '</div>';
            html += '</div>';
            html += '</a>';
        }

        if (filtered.length === 0) {
            html = '<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:#9ca3af;">';
            html += '<p style="font-size:1.1em;font-weight:500;">No players found</p>';
            html += '<p style="font-size:0.9em;">Try adjusting your search or filter</p>';
            html += '</div>';
        }

        resultsGrid.innerHTML = html;
    }

    function escHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    searchInput.addEventListener('input', render);
    posFilter.addEventListener('change', render);

    fetchPlayers();
})();
</script>

<?php get_footer(); ?>
