=== StatChasers Player Pages ===
Contributors: statchasers
Tags: fantasy football, NFL, players, SEO, Sleeper API
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPL-2.0+

Programmatic SEO-friendly NFL player pages powered by the Sleeper API.

== Description ==

Adds /nfl/players/ (index/search page) and /nfl/players/{slug}/ (player profile pages) to your WordPress site. Templates use your existing theme's header and footer, making it fully compatible with Divi and other themes.

Features:
* 4,000+ NFL player profile pages with unique SEO metadata
* Client-side player search and filter by position
* JSON-LD structured data for each player
* Daily auto-refresh of player data via WP-Cron
* Admin page under Tools > StatChasers Players
* REST API endpoints for players list and sitemap
* Compatible with Yoast and Rank Math sitemaps

== Installation ==

1. Download or zip the `statchasers-player-pages` folder.
2. In WordPress admin, go to Plugins > Add New > Upload Plugin.
3. Upload the zip file and click "Install Now".
4. Click "Activate".
5. IMPORTANT: Go to Settings > Permalinks and click "Save Changes" (this flushes rewrite rules so the /nfl/players/ URLs work).
6. The plugin will automatically fetch player data from the Sleeper API on activation.
7. To manually refresh data, go to Tools > StatChasers Players and click "Refresh Player Index".

== How It Works ==

* Player data is fetched from the Sleeper API and cached locally as a JSON file in wp-content/uploads/statchasers/players.json.
* If the uploads directory is not writable, data is stored as a WordPress option as fallback.
* A WP-Cron job refreshes the data daily.
* Templates call get_header() and get_footer() so your Divi (or any other) theme's navigation, branding, and footer are preserved.
* SEO meta tags (title, description, Open Graph, canonical, JSON-LD) are injected via wp_head for proper search engine indexing.

== Sitemap / Google Search Console ==

The plugin exposes a REST endpoint at:
/wp-json/statchasers/v1/player-sitemap

This returns the first 300 player page URLs as JSON. To submit to Google:

1. Go to Google Search Console (https://search.google.com/search-console)
2. Select your property
3. Use the URL Inspection tool to submit key player pages
4. For bulk submission, integrate with your sitemap plugin (Yoast, Rank Math) using the code snippets shown on the admin page at Tools > StatChasers Players.

== REST API Endpoints ==

GET /wp-json/statchasers/v1/players
Returns the full player dataset as JSON.

GET /wp-json/statchasers/v1/player-sitemap
Returns the first 300 player page URLs with lastmod dates.

== Frequently Asked Questions ==

= Does this work with Divi? =
Yes. The templates call get_header() and get_footer() so your Divi theme's header, navigation, and footer are displayed on every player page.

= How often is the data refreshed? =
Daily via WP-Cron. You can also refresh manually from Tools > StatChasers Players.

= What if the Sleeper API is down? =
The plugin uses cached data. If a refresh fails, the existing data remains unchanged.

== Changelog ==

= 1.0.0 =
* Initial release
* Player profile pages at /nfl/players/{slug}/
* Player search/index page at /nfl/players/
* Sleeper API integration with caching
* SEO metadata + JSON-LD structured data
* WP-Admin tools page
* REST API endpoints
* Daily WP-Cron auto-refresh
