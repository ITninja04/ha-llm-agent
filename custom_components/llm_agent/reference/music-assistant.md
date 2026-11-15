# Music Assistant
> Music Assistant actions: play_media, announcements, queue, search, library.

**Entities.** Each Music Assistant player is a `media_player.<player_name>` (speaker class). Extra attributes: `mass_player_type`, `active_queue`, `group_members`. A button "Favorite current song" and per-player option entities (switch, number, select, text; config category) come with it. Music Assistant (MA) drives the real speaker, so the player's own integration (Sonos, Cast, AirPlay) is not the one to call.

**Actions** (all `music_assistant.*`; field names are exact, data is flat, never nested under `pagination`, `search_options` or similar UI groups):

| Action | Target | Fields |
|---|---|---|
| `play_media` | MA player(s) | `media_id` required (string or list of strings: URI like `spotify://playlist/abc`, library id, or a plain name), `media_type` (artist, album, audiobook, folder, playlist, podcast, track, radio; auto-detected if omitted), `enqueue` (play, replace, next, replace_next, add), `artist`, `album` (narrow a name lookup), `radio_mode` (bool, auto-generate a playlist from the selection), `username` (an MA user; defaults to the HA user making the call) |
| `play_announcement` | MA player(s) that support announce | exactly one of `url` or `message`; `message` also needs `tts_entity_id` (a `tts.*` entity); optional `use_pre_announce` (bool), `pre_announce_url`, `announce_volume` (int 1-100) |
| `transfer_queue` | the destination player | `source_player` (MA player entity_id; if omitted, the first playing queue is used, error if none), `auto_play` (bool) |
| `get_queue` | one MA player | none. Response only. Returns `queue_id`, `active`, `name`, `items`, `shuffle_enabled`, `repeat_mode`, `current_index`, `elapsed_time`, `current_item`, `next_item`. Errors with "No active queue found" if idle |
| `search` | none | `config_entry_id` required, `name` required, `media_type` (list), `artist`, `album`, `limit` (default 5), `library_only` (bool, default false), `username`. Response only: lists `artists`, `albums`, `tracks`, `playlists`, `radio`, `audiobooks`, `podcasts` of items with `media_type`, `uri`, `name`, `version`, `image` |
| `get_library` | none | `config_entry_id` required, `media_type` required (artist, album, audiobook, playlist, podcast, track, radio; no folder), `favorite` (bool), `search`, `limit` (default 25), `offset`, `order_by` (name, name_desc, sort_name, timestamp_added, last_played, play_count, year, position, artist_name, random, random_play_count; most also with `_desc`), `album_type` (list: album, single, compilation, ep, unknown), `album_artists_only` (bool), `username`. Response only: `items`, `limit`, `offset`, `order_by`, `media_type` |

`search`, `get_library` and `get_queue` only return data. In an automation or script give them a `response_variable`; with `call_service` set `return_response: true`. `config_entry_id` is the Music Assistant entry id from the `integrations` tool.

**Versus generic `media_player.*`.** Volume, pause, next, shuffle, repeat, grouping (`join`) and source use the standard services. `media_player.play_media` also reaches MA, but it has no `artist` or `album` fields, no `replace_next` (its `enqueue` stops at add, next, play, replace), and `radio_mode` only goes in through `extra`. Use `music_assistant.play_media` to start music from a name or URI.

```yaml
actions:
  - action: music_assistant.play_media
    target: {entity_id: media_player.kitchen}
    data:
      media_id: "Dinner Jazz"
      media_type: playlist
      enqueue: replace
      radio_mode: true
  - action: music_assistant.play_announcement
    target: {entity_id: media_player.kitchen}
    data:
      message: "Dinner is ready"
      tts_entity_id: tts.piper
      use_pre_announce: true
      announce_volume: 70
```

Find a track, then play it (search returns a response, so name it):

```yaml
actions:
  - action: music_assistant.search
    data:
      config_entry_id: 01J0ABCDEF1234567890ABCDEF
      name: "We Are The Champions"
      artist: Queen
      media_type: [track]
      limit: 3
    response_variable: found
  - action: music_assistant.play_media
    target: {entity_id: media_player.living_room}
    data:
      media_id: "{{ found.tracks[0].uri }}"
      media_type: track
```

Move what is playing to another room, and read the queue:

```yaml
actions:
  - action: music_assistant.transfer_queue
    target: {entity_id: media_player.bedroom}
    data:
      source_player: media_player.kitchen
      auto_play: true
  - action: music_assistant.get_queue
    target: {entity_id: media_player.bedroom}
    response_variable: queue
  - variables:
      now: "{{ queue['media_player.bedroom'].current_item.name | default('nothing') }}"
```

Common mistakes:
- Reading `queue.items` straight off a targeted action's response. Entity actions nest the response under the entity_id, as in `queue['media_player.bedroom']`; `search` and `get_library` are not entity actions and respond flat.
- Sending both `url` and `message` to `play_announcement`, or `message` without `tts_entity_id`. Both are rejected.
- Giving `search` or `get_library` a `target`; they take `config_entry_id` instead.
- Putting `limit` under `pagination:` or `library_only` under `search_options:`. Those are UI groups, the data keys are flat.
- Using `media_type: folder` in `get_library`; it is rejected as unsupported. Folder is only listed for `play_media`.
- Guessing a `media_id` URI. Take the `uri` from a `search` or `get_library` result, or pass a plain name.
- Targeting the speaker's own Sonos or Cast entity. These actions only reach `media_player` entities that belong to Music Assistant.
