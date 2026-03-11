<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_filter('the_content', 'sc_autolink_player_names_in_posts', 20);

function sc_autolink_player_names_in_posts($content) {
    if (is_admin()) {
        return $content;
    }

    if (!is_singular('post')) {
        return $content;
    }

    if (empty($content)) {
        return $content;
    }

    $player_map = sc_get_player_autolink_map();

    if (empty($player_map) || !is_array($player_map)) {
        return $content;
    }

    return sc_autolink_players_html($content, $player_map, array(
        'max_links_per_player' => 1,
        'nofollow'             => false,
        'new_tab'              => false,
        'link_class'           => 'sc-player-link',
    ));
}

function sc_get_player_autolink_map() {
    static $map = null;
    if (null !== $map) {
        return $map;
    }

    $map = array();
    $indexed_slugs = sc_get_indexed_slugs();

    if (empty($indexed_slugs)) {
        return $map;
    }

    $indexed_set = array_flip($indexed_slugs);
    $players = sc_get_players();

    foreach ($players as $p) {
        if (!isset($p['slug']) || !isset($p['name'])) continue;
        if (!isset($indexed_set[$p['slug']])) continue;

        $name = $p['name'];
        $url = home_url('/nfl/players/' . $p['slug'] . '/');
        $map[$name] = $url;
    }

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

    uksort($player_map, function($a, $b) {
        return mb_strlen($b) <=> mb_strlen($a);
    });

    $linked_counts = array();

    $parts = preg_split('/(<[^>]+>)/u', $html, -1, PREG_SPLIT_DELIM_CAPTURE);

    if (!$parts || !is_array($parts)) {
        return $html;
    }

    $inside_anchor = false;
    $inside_script = false;
    $inside_style  = false;
    $inside_h_tag  = false;

    foreach ($parts as &$part) {
        if ($part === '') {
            continue;
        }

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

        if ($inside_anchor || $inside_script || $inside_style || $inside_h_tag) {
            continue;
        }

        foreach ($player_map as $player_name => $url) {
            if (empty($player_name) || empty($url)) {
                continue;
            }

            $current_count = isset($linked_counts[$player_name]) ? $linked_counts[$player_name] : 0;

            if ($current_count >= (int) $args['max_links_per_player']) {
                continue;
            }

            $replacement = sc_build_player_link_html($player_name, $url, $args);

            $pattern = '/(?<![\p{L}\p{N}])(' . preg_quote($player_name, '/') . ')(?![\p{L}\p{N}])/u';

            $part_before = $part;

            $part = preg_replace_callback(
                $pattern,
                function($matches) use ($player_name, $replacement, &$linked_counts, $args) {
                    $current_count = isset($linked_counts[$player_name]) ? $linked_counts[$player_name] : 0;

                    if ($current_count >= (int) $args['max_links_per_player']) {
                        return $matches[1];
                    }

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
