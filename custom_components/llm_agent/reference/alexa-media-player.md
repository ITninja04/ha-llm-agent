# Alexa Media Player
> Alexa Media Player: notify.alexa_media speech and announce, routines, alarms.

Not the core `alexa_devices` integration and not the Alexa smart-home cloud. This one logs in to an Amazon account and drives Echo devices. Check it is installed with `integrations` before using it.

**Entities** (names come from the Echo's name in the Alexa app)
- `media_player.<echo>`: one per Echo. Supports play, pause, stop, next, previous, seek, volume, mute, source, shuffle, repeat, `play_media`. Attributes: `last_called`, `last_called_summary`, `last_called_timestamp`, `connected_bluetooth`, `bluetooth_list`, `history_records`, `previous_volume`, `last_message`, `last_message_type`, `locale`.
- `sensor.<echo>_next_alarm`, `_next_timer`, `_next_reminder` (timestamps). The alarm sensor's `sorted_all` attribute holds each alarm with its id.
- `switch.<echo>_do_not_disturb`, `_shuffle`, `_repeat`; a notification volume `number`; an `alarm_control_panel` for Alexa Guard where present; Alexa-linked lights, switches and sensors.

**Speaking: `notify.alexa_media`** is the legacy notify action (there is also `notify.alexa_media_<echo>` per device). It is how you make an Echo talk. Fields:
- `message` (required), `title` (used by `announce` and `push`)
- `target`: a list of Echo `media_player` entity_ids, device names or serials; a `media_player` group is expanded. `notify.alexa_media_last_called` reaches the Echo that was spoken to most recently (the integration adds the account email to that name when the Echo's own name ends in a digit).
- `data.type`: `tts` (default; the Echo speaks, no chime), `announce` (chime, plays on all targets at once, can show on screens), `push` (a notification to the Alexa phone app), `dropin_notification`. Any other value is rejected.
- `data.method` (announce only): `speak`, `show` or `all` (default).

**Media: `media_player.play_media`** on the Echo. `media_content_type` picks what `media_content_id` means:
- `routine`: the name or spoken phrase of an Alexa routine, so this runs a routine from Home Assistant.
- `sequence`: an Alexa sequence name such as `Alexa.Weather.Play`, `Alexa.Traffic.Play`, `Alexa.FlashBriefing.Play`, `Alexa.GoodMorning.Play`, `Alexa.GoodNight.Play`, `Alexa.SingASong.Play`, `Alexa.TellStory.Play`, `Alexa.FunFact.Play`, `Alexa.Joke.Play`, `Alexa.CleanUp.Play`, `Alexa.Calendar.PlayToday`, `Alexa.Calendar.PlayTomorrow`, `Alexa.Calendar.PlayNext`, `Alexa.Music.PlaySearchPhrase`.
- `custom`: free text Alexa runs as if spoken ("turn off the hallway lights"). `skill`: a skill id. `sound`: a sound string id. `image`: a background picture URL for screens.
- `music`: text-to-speech through Home Assistant TTS. It needs the integration's public URL option; without it the Echo says so.
- Any other value is sent to Alexa as a music provider id, with `media_content_id` as the search phrase. The provider ids are not in the integration's code, so check an existing automation or the integration's wiki.

**Actions** (`alexa_media.*`; entity_id goes in `data`, not `target`):

| Action | Fields |
|---|---|
| `restore_volume` | `entity_id` required |
| `get_history_records` | `entity_id` required, `entries` (positive int, default 5). Stores the result in the entity's `history_records` attribute; it returns nothing |
| `create_alarm` | `entity_id`, `time` (HH:MM:SS) required; `days` list of mon..sun, `weekdays`, `weekends`, `everyday`, `today`, `tomorrow` (presets used alone; empty means next occurrence); `alarm_type` (`default` or `music`), `music_provider`, `music_entity` (match a music alarm already cached from Alexa) |
| `list_alarms` | `entity_id`. Response only (`response_variable`): `entity_id`, `alarms` (date, time, status, recurring_pattern, days, is_music, music_entity, provider, sound), `count` |
| `enable_alarm`, `disable_alarm`, `delete_alarm`, `skip_next_alarm` | `entity_id`, `alarm_id` (from `sorted_all`) both required |
| `repeat_last_message` | `entity_id` (one or a list); repeats the last notify TTS or announcement, kept only until restart |
| `amazon_kids_enable` / `amazon_kids_disable` | `entity_id`; enable also needs `child` (profile first name or directedId) |
| `update_last_called`, `force_logout`, `enable_network_discovery` | optional `email` (string or list); empty means all accounts. `force_logout` is for debugging |

**Versus the generic services.** `media_player.volume_set`, `media_pause` and the other standard controls work on the Echo as usual. To make an Echo talk, use `notify.alexa_media`. For `media_player.play_media` the types above are the meanings the integration implements; do not assume a URL or radio id is played.

```yaml
actions:
  - action: notify.alexa_media
    data:
      message: "The garage door has been open for ten minutes"
      target: [media_player.kitchen_echo, media_player.office_echo]
      data:
        type: announce
        method: speak
```

```yaml
actions:
  - action: media_player.play_media
    target: {entity_id: media_player.kitchen_echo}
    data:
      media_content_type: routine
      media_content_id: "Movie time"
  - action: media_player.play_media
    target: {entity_id: media_player.kitchen_echo}
    data:
      media_content_type: custom
      media_content_id: "turn off the hallway lights"
```

```yaml
actions:
  - action: alexa_media.create_alarm
    data:
      entity_id: media_player.bedroom_echo
      time: "06:30:00"
      days: [weekdays]
  - action: alexa_media.list_alarms
    data: {entity_id: media_player.bedroom_echo}
    response_variable: alarms
```

Common mistakes:
- Using `target:` on `alexa_media.*` actions. Their schemas take `entity_id` in `data`.
- Sending `type: tts` expecting a chime or an announcement on every Echo. TTS is per target and silent about it; `announce` chimes.
- Omitting `data.type` for a push. The default is `tts`, so the message is spoken instead.
- Mixing `weekdays` with specific days in `create_alarm` `days`. Presets go alone.
- Expecting `get_history_records` to return rows. Read the `history_records` attribute afterwards.
- Treating `media_player.play_media` like other players (URLs, radio ids). Here `media_content_type` selects a routine, sequence, sound, skill or provider search.
