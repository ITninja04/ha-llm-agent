# WLED
> WLED: segment lights, presets, effects, live override; no actions of its own.

WLED adds no services. Everything goes through the standard `light.*`, `select.select_option`, `number.set_value` and `switch.*` actions on its entities. Call `search_entities` and `get_entities` for the real entity_ids; names below come from the device name (`<dev>`).

**Entities**
- Segment lights: `light.<dev>` is segment 0, `light.<dev>_segment_1`, `_segment_2` and so on follow. Each takes `rgb_color`, `brightness`, `transition`, `effect` and (where the strip supports it) `rgbw_color`, `rgbww_color`, `color_temp_kelvin`. Attributes: `effect`, `effect_list` (the device's own effect names), `color_mode`. Segments that no longer exist go unavailable.
- Main light `light.<dev>_main`: the whole device (master brightness and power). It only exists when the device has more than one segment, or when the "Add Main control" integration option is on. Brightness and transition only, no colour or effect. With one segment and no main light, the segment light's brightness is scaled by the device master brightness for you.
- `select.<dev>_preset`: options are the device's preset names, sorted. Unavailable if the device has none.
- `select.<dev>_playlist`: same for playlists.
- `select.<dev>_color_palette` and `select.<dev>_segment_1_color_palette`: palette per segment.
- `select.<dev>_live_override`: options are the strings `"0"` (Off), `"1"` (On) and `"2"` (Until device restarts). The UI shows the labels, but `select_option` needs the digit.
- `number.<dev>_speed` and `number.<dev>_intensity` (0 to 255), plus `number.<dev>_segment_1_speed` and `_intensity`. These set the running effect's speed and intensity.
- `switch.<dev>_reverse` and `switch.<dev>_freeze` (per segment: `_segment_1_reverse`, `_segment_1_freeze`), `switch.<dev>_nightlight` (attributes `duration`, `target_brightness`), `switch.<dev>_sync_send`, `switch.<dev>_sync_receive` (attribute `udp_port`).
- `button.<dev>_restart`, a firmware `update` entity and `binary_sensor`, and sensors for estimated current, LED count, max current and IP. Uptime, free memory and the Wi-Fi sensors exist but are disabled by default.

**How it differs from other lights.**
- `effect` is the effect name exactly as listed in `effect_list` (for example `Rainbow`), not a number. Effects exist on segment lights only.
- `transition` is in seconds and is rounded to tenths.
- Presets and playlists are not light fields. Pick them with the select, by name.
- Colour temperature is shown as white: the strip's white channel when it has one, otherwise full RGB white.
- Turning a segment light off with no main light and one segment turns the whole device off.

```yaml
actions:
  - action: light.turn_on
    target: {entity_id: light.strip}
    data:
      effect: Rainbow
      brightness_pct: 70
  - action: number.set_value
    target: {entity_id: number.strip_speed}
    data: {value: 180}
```

```yaml
actions:
  - action: select.select_option
    target: {entity_id: select.strip_preset}
    data: {option: Movie Night}  # a preset name from the select's options
```

Two segments with different colours, with a fade:

```yaml
actions:
  - action: light.turn_on
    target: {entity_id: light.strip}
    data: {rgb_color: [255, 80, 0], transition: 3}
  - action: light.turn_on
    target: {entity_id: light.strip_segment_1}
    data: {rgb_color: [0, 80, 255], brightness: 120, transition: 3}
```

Common mistakes:
- Looking for a `wled.*` action. There are none.
- Setting `effect` on the main light, or `rgb_color` on it. It only does brightness.
- Using an effect or preset name from memory. Read `effect_list` or the select's `options` first; names are whatever the owner configured.
- Passing `option: On` or `option: Off` to the live override select. The options are `"0"`, `"1"`, `"2"`, for example `data: {option: "0"}`. What each does on the device is WLED's own live-data setting, so read the current option before changing it.
- Setting speed or intensity with `light.turn_on`. Those are `number` entities.
- Calling a segment entity that was removed on the device. It reads as unavailable.
