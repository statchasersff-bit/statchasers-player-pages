<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action('admin_init', 'sc_player_autolink_register_settings');
function sc_player_autolink_register_settings() {
    register_setting('reading', 'sc_player_autolink_enabled', array(
        'type'              => 'boolean',
        'sanitize_callback' => function($value) { return !empty($value) ? 1 : 0; },
        'default'           => 1,
    ));

    register_setting('reading', 'sc_player_autolink_max_links_per_player', array(
        'type'              => 'integer',
        'sanitize_callback' => 'absint',
        'default'           => 1,
    ));

    add_settings_field(
        'sc_player_autolink_enabled',
        'StatChasers Player Auto-Linking',
        function() {
            $value = get_option('sc_player_autolink_enabled', 1);
            ?>
            <label>
                <input type="checkbox" name="sc_player_autolink_enabled" value="1" <?php checked(1, $value); ?> />
                Automatically link player names in blog posts
            </label>
            <p class="description">Links player names in single blog posts to your player pages.</p>
            <?php
        },
        'reading'
    );

    add_settings_field(
        'sc_player_autolink_max_links_per_player',
        'Max links per player per post',
        function() {
            $value = max(1, (int) get_option('sc_player_autolink_max_links_per_player', 1));
            ?>
            <input type="number" name="sc_player_autolink_max_links_per_player" value="<?php echo esc_attr($value); ?>" min="1" max="5" step="1" style="width:80px;" />
            <p class="description">Recommended: 1</p>
            <?php
        },
        'reading'
    );
}

add_action('add_meta_boxes', function() {
    add_meta_box(
        'sc_player_autolink_meta_box',
        'StatChasers Player Auto-Linking',
        function($post) {
            wp_nonce_field('sc_player_autolink_meta_box_action', 'sc_player_autolink_meta_box_nonce');
            $disabled = get_post_meta($post->ID, '_sc_disable_player_autolink', true);
            ?>
            <label>
                <input type="checkbox" name="sc_disable_player_autolink" value="1" <?php checked('1', $disabled); ?> />
                Disable player auto-linking for this post
            </label>
            <p style="margin-top:8px;color:#666;">Useful for special articles or posts with awkward name collisions.</p>
            <?php
        },
        'post',
        'side',
        'default'
    );
});

add_action('save_post_post', function($post_id) {
    if (!isset($_POST['sc_player_autolink_meta_box_nonce'])) return;
    if (!wp_verify_nonce($_POST['sc_player_autolink_meta_box_nonce'], 'sc_player_autolink_meta_box_action')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (!empty($_POST['sc_disable_player_autolink'])) {
        update_post_meta($post_id, '_sc_disable_player_autolink', '1');
    } else {
        delete_post_meta($post_id, '_sc_disable_player_autolink');
    }
});

add_filter('the_content', 'sc_autolink_player_names_in_posts', 20);

function sc_autolink_player_names_in_posts($content) {
    if (is_admin()) return $content;
    if (!is_singular('post')) return $content;
    if (!in_the_loop() || !is_main_query()) return $content;
    if (empty($content)) return $content;

    if (!get_option('sc_player_autolink_enabled', 1)) return $content;

    global $post;
    if (!$post || empty($post->ID)) return $content;
    if (get_post_meta($post->ID, '_sc_disable_player_autolink', true) === '1') return $content;

    $player_map = sc_get_player_autolink_map();
    if (empty($player_map) || !is_array($player_map)) return $content;

    $max_links = max(1, (int) get_option('sc_player_autolink_max_links_per_player', 1));

    return sc_autolink_players_html($content, $player_map, array(
        'max_links_per_player' => $max_links,
        'nofollow'             => false,
        'new_tab'              => false,
        'link_class'           => 'sc-player-link',
    ));
}

function sc_get_player_autolink_map() {
    static $map = null;
    if (null !== $map) return $map;

    $map = array();
    $indexed_slugs = sc_get_indexed_slugs();
    if (empty($indexed_slugs)) return $map;

    $indexed_set = array_flip($indexed_slugs);
    $players = sc_get_players();

    $aliases = array(
        'aj-brown'           => array("AJ Brown"),
        'dk-metcalf'         => array("DK Metcalf"),
        'kj-osborn'          => array("KJ Osborn"),
        'dj-moore'           => array("DJ Moore"),
        'ceedee-lamb'        => array("Cee Dee Lamb"),
        'amon-ra-st-brown'   => array("Amon-Ra St Brown"),
        'ja-marr-chase'      => array("Jamarr Chase"),
        'brian-thomas'        => array("Brian Thomas Jr.", "Brian Thomas Jr"),
        'travis-etienne'     => array("Travis Etienne Jr.", "Travis Etienne Jr"),
        'marvin-harrison'    => array("Marvin Harrison Jr.", "Marvin Harrison Jr"),
        'michael-pittman'    => array("Michael Pittman Jr.", "Michael Pittman Jr"),
        'odell-beckham'      => array("Odell Beckham Jr.", "Odell Beckham Jr"),
    );

    foreach ($players as $p) {
        if (!isset($p['slug']) || !isset($p['name'])) continue;
        if (!isset($indexed_set[$p['slug']])) continue;

        $name = $p['name'];
        $url = home_url('/nfl/players/' . $p['slug'] . '/');
        $map[$name] = $url;

        if (isset($aliases[$p['slug']])) {
            foreach ($aliases[$p['slug']] as $alias) {
                $map[$alias] = $url;
            }
        }
    }

    uksort($map, function($a, $b) {
        return mb_strlen($b) <=> mb_strlen($a);
    });

    return $map;
}

function sc_autolink_players_html($html, $player_map, $args = array()) {
    $defaults = array(
        'max_links_per_player' => 1,
        'nofollow'             => false,
        'new_tab'              => false,
        'link_class'           => '',
    );

    $args = wp_parse_args($args, $defaults);

    $linked_counts = array();

    $parts = preg_split('/(<[^>]+>)/u', $html, -1, PREG_SPLIT_DELIM_CAPTURE);
    if (!$parts || !is_array($parts)) return $html;

    $inside_anchor = false;
    $inside_script = false;
    $inside_style  = false;
    $inside_h_tag  = false;

    foreach ($parts as &$part) {
        if ($part === '') continue;

        if ($part[0] === '<') {
            if (preg_match('/^<a\b/i', $part)) {
                $inside_anchor = true;
            } elseif (preg_match('/^<\/a>/i', $part)) {
                $inside_anchor = false;
            } elseif (preg_match('/^<script\b/i', $part)) {
                $inside_script = true;
            } elseif (preg_match('/^<\/script>/i', $part)) {
                $inside_script = false;
            } elseif (preg_match('/^<style\b/i', $part)) {
                $inside_style = true;
            } elseif (preg_match('/^<\/style>/i', $part)) {
                $inside_style = false;
            } elseif (preg_match('/^<h[1-6]\b/i', $part)) {
                $inside_h_tag = true;
            } elseif (preg_match('/^<\/h[1-6]>/i', $part)) {
                $inside_h_tag = false;
            }
            continue;
        }

        if ($inside_anchor || $inside_script || $inside_style || $inside_h_tag) continue;

        foreach ($player_map as $player_name => $url) {
            if (empty($player_name) || empty($url)) continue;

            $current_count = isset($linked_counts[$player_name]) ? $linked_counts[$player_name] : 0;
            if ($current_count >= (int) $args['max_links_per_player']) continue;

            $replacement = sc_build_player_link_html($player_name, $url, $args);
            $pattern = '/(?<![\p{L}\p{N}])(' . preg_quote($player_name, '/') . ')(?![\p{L}\p{N}])/u';

            $part = preg_replace_callback(
                $pattern,
                function($matches) use ($player_name, $replacement, &$linked_counts, $args) {
                    $current_count = isset($linked_counts[$player_name]) ? $linked_counts[$player_name] : 0;
                    if ($current_count >= (int) $args['max_links_per_player']) return $matches[1];
                    $linked_counts[$player_name] = $current_count + 1;
                    return $replacement;
                },
                $part,
                (int) $args['max_links_per_player'] - $current_count
            );
        }
    }
    unset($part);

    return implode('', $parts);
}

function sc_build_player_link_html($player_name, $url, $args = array()) {
    $attrs = array();
    $attrs[] = 'href="' . esc_url($url) . '"';

    if (!empty($args['link_class'])) {
        $attrs[] = 'class="' . esc_attr($args['link_class']) . '"';
    }

    if (!empty($args['new_tab'])) {
        $attrs[] = 'target="_blank"';
        $attrs[] = 'rel="noopener noreferrer"';
    } elseif (!empty($args['nofollow'])) {
        $attrs[] = 'rel="nofollow"';
    }

    return '<a ' . implode(' ', $attrs) . '>' . esc_html($player_name) . '</a>';
}
