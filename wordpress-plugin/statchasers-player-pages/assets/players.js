(function() {
    var searchInput = document.getElementById('sc-search-input');
    var resultsContainer = document.getElementById('sc-results');
    var resultsCount = document.getElementById('sc-results-count');
    var apiUrl = window.scPlayersConfig ? window.scPlayersConfig.restUrl : '/wp-json/statchasers/v1/players';
    var baseUrl = window.scPlayersConfig ? window.scPlayersConfig.baseUrl : '/nfl/players/';
    var debounceTimer = null;
    var activeIndex = -1;
    var currentResults = [];

    function escHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function fetchPlayers(query) {
        var url = apiUrl + '?q=' + encodeURIComponent(query);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                currentResults = JSON.parse(xhr.responseText);
                activeIndex = -1;
                render(currentResults, query);
            }
        };
        xhr.send();
    }

    function render(players, query) {
        if (!query && players.length === 0) {
            resultsContainer.innerHTML = '';
            resultsCount.textContent = 'Type a name or team to search';
            return;
        }

        if (players.length === 0) {
            resultsCount.textContent = 'No players found for "' + query + '"';
            resultsContainer.innerHTML = '<div style="text-align:center;padding:40px 0;color:#9ca3af;">No players found. Try a different search.</div>';
            return;
        }

        resultsCount.textContent = players.length + ' result' + (players.length !== 1 ? 's' : '') + (query ? ' for "' + query + '"' : '');

        var html = '';
        for (var i = 0; i < players.length; i++) {
            var p = players[i];
            var posClass = 'sc-pos-' + (p.position || 'DEF');
            html += '<a href="' + baseUrl + p.slug + '/" class="sc-result-row" data-index="' + i + '" id="sc-result-' + i + '">';
            html += '<div class="sc-result-icon"><span>' + (p.position || '?') + '</span></div>';
            html += '<div class="sc-result-info">';
            html += '<strong>' + escHtml(p.name) + '</strong>';
            html += '<span class="sc-result-meta">';
            html += '<span class="sc-pos-badge ' + posClass + '">' + (p.position || '?') + '</span>';
            html += '<span class="sc-result-team">' + escHtml(p.team || 'FA') + '</span>';
            html += '</span>';
            html += '</div>';
            html += '</a>';
        }
        resultsContainer.innerHTML = html;
    }

    function updateHighlight() {
        var rows = resultsContainer.querySelectorAll('.sc-result-row');
        for (var i = 0; i < rows.length; i++) {
            rows[i].classList.toggle('sc-active', i === activeIndex);
        }
        if (activeIndex >= 0 && rows[activeIndex]) {
            rows[activeIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    searchInput.addEventListener('input', function() {
        var q = searchInput.value.trim();
        clearTimeout(debounceTimer);
        if (q.length === 0) {
            currentResults = [];
            activeIndex = -1;
            resultsContainer.innerHTML = '';
            resultsCount.textContent = 'Type a name or team to search';
            return;
        }
        debounceTimer = setTimeout(function() {
            fetchPlayers(q);
        }, 200);
    });

    searchInput.addEventListener('keydown', function(e) {
        if (currentResults.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = activeIndex < currentResults.length - 1 ? activeIndex + 1 : 0;
            updateHighlight();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = activeIndex > 0 ? activeIndex - 1 : currentResults.length - 1;
            updateHighlight();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && currentResults[activeIndex]) {
                window.location.href = baseUrl + currentResults[activeIndex].slug + '/';
            } else if (currentResults.length > 0) {
                window.location.href = baseUrl + currentResults[0].slug + '/';
            }
        }
    });

    resultsCount.textContent = 'Type a name or team to search';
})();
