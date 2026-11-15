# Frigate
> Frigate: cameras, sensors, events, PTZ, export and review actions.

Needs the Frigate server plus MQTT. Check with `integrations`. The entity names below follow the camera names in Frigate's config (`<cam>`, such as `front_door`).

**Entities**
- `camera.<cam>`: the live camera (`camera.birdseye` too when Birdseye restream is on). Attributes: `camera_name`, `client_id` (the Frigate instance id the WebSocket commands need). It is a normal camera, so `camera_snapshot` and `camera.snapshot` work on it.
- `binary_sensor.<cam>_motion`, `binary_sensor.<cam>_<object>_occupancy` (for example `_person_occupancy`), and `_<sound>_sound` when audio detection is on.
- `sensor.<cam>_<object>_count` and `_active_count`, `sensor.<cam>_review_status`, per-camera fps and CPU sensors, and server sensors (status, uptime, detector inference speed, GPU load, temperatures). Face, licence plate and classification sensors exist for Frigate setups that use those features.
- `image.<cam>_<object>`: the best snapshot of that tracked object (for example `image.front_door_person`). It updates when Frigate publishes a new one.
- `switch.<cam>_detect`, `_motion`, `_recordings`, `_snapshots`, `_review_alerts`, `_review_detections`, and `_improve_contrast` (disabled by default). `_audio_detection` and `_ptz_autotracker` exist only when enabled in Frigate's config. Frigate 0.17+ also adds `_object_descriptions` and `_review_descriptions`.
- `number.<cam>_contour_area` and `_threshold` (motion tuning), `select.frigate_profile`, and an `update` entity for the server.

**Actions.** The five camera actions target a `camera.*` entity that belongs to Frigate. The sixth takes no target.

| Action | Fields |
|---|---|
| `frigate.create_event` | `label` required (not empty), `sub_label`, `duration` (seconds, default 30, 0 means until ended), `include_recording` (bool, default true). Can return Frigate's JSON reply (`response_variable`); keep the event id from it to end the event later |
| `frigate.end_event` | `event_id` required (not empty). Can return a response |
| `frigate.favorite_event` | `event_id` required, `favorite` (bool, default true; false unfavorites). Favorited events are kept indefinitely |
| `frigate.export_recording` | `start_time` and `end_time` required, as text `YYYY-MM-DD HH:MM:SS` in Home Assistant's local time; `playback_factor` (`realtime` or `timelapse_25x`, default `realtime`); `name`. Fails if no recording covers the range |
| `frigate.ptz` | `action` required: `move`, `preset`, `stop` or `zoom`; `argument`: `left`, `right`, `up`, `down` for move, `in`, `out` for zoom, a preset name for preset |
| `frigate.review_summarize` | `start_time`, `end_time` required (same text format); `config_entry_id` (needed only with more than one Frigate server). Frigate 0.17+ only. Can return a response. No target |

**Events and reviews are not entities.** To list them, use `ha_websocket`:
- `frigate/events/get`: `instance_id` required (the camera's `client_id`), optional `cameras`, `labels`, `sub_labels`, `zones` (lists of strings), `after`, `before` (integer epoch seconds), `limit`, `has_clip`, `has_snapshot`, `favorites`.
- `frigate/reviews/get`: `instance_id` required, optional `cameras`, `labels`, `zones`, `severity` (string), `after`, `before` (epoch seconds), `limit`, `reviewed` (bool).
- For triggers, subscribe to Frigate's own MQTT topics. `frigate/reviews` publishes `type` (`new`, `update`, `end`) and `before` and `after` objects with `camera`, `severity` (`alert` or `detection`), `data.objects`, `data.zones`, `data.sub_labels`. The prefix `frigate` is the default and is set in Frigate's config. This payload comes from Frigate's own documentation, not from the integration.

**Versus generic services.** Cameras are ordinary `camera` entities, so `camera.turn_on`, `camera.snapshot` and `camera.play_stream` apply. The Frigate actions add event, export and PTZ control that the generic domain lacks. Detection, recording and snapshots are switched with the `switch.<cam>_<name>` entities, not with an action.

```yaml
triggers:
  - trigger: mqtt
    topic: frigate/reviews
conditions:
  - condition: template
    value_template: >
      {{ trigger.payload_json.type == 'new'
         and trigger.payload_json.after.severity == 'alert'
         and 'person' in trigger.payload_json.after.data.objects }}
actions:
  - action: notify.mobile_app_pixel
    data:
      title: "Person at {{ trigger.payload_json.after.camera }}"
      message: "Zones: {{ trigger.payload_json.after.data.zones | join(', ') or 'none' }}"
```

Occupancy without MQTT, then a manual event and a PTZ move:

```yaml
triggers:
  - trigger: state
    entity_id: binary_sensor.front_door_person_occupancy
    to: "on"
    for: "00:00:05"
actions:
  - action: frigate.ptz
    target: {entity_id: camera.front_door}
    data: {action: preset, argument: porch}
  - action: frigate.create_event
    target: {entity_id: camera.front_door}
    data:
      label: "Doorbell press"
      duration: 60
```

Export the last ten minutes and keep an event:

```yaml
actions:
  - action: frigate.export_recording
    target: {entity_id: camera.front_door}
    data:
      start_time: "{{ (now() - timedelta(minutes=10)).strftime('%Y-%m-%d %H:%M:%S') }}"
      end_time: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
      playback_factor: realtime
      name: "Package delivery"
  - action: frigate.favorite_event
    target: {entity_id: camera.front_door}
    data:
      event_id: "1656510950.19548-ihtjj7"
```

Common mistakes:
- Giving `export_recording` or `review_summarize` ISO times with a `T` or a timezone offset. Only `YYYY-MM-DD HH:MM:SS` parses.
- Passing an empty `label` or `event_id`; both are rejected.
- Giving `frigate.review_summarize` a `target`. It takes `config_entry_id` instead, and is missing on Frigate before 0.17.
- Looking for an events sensor or an event entity. Use the MQTT topics or `frigate/events/get`.
- Leaving a `create_event` open. `duration: 0` runs until `end_event`, so keep the event id from the response.
- Inventing PTZ verbs. The integration only checks `action` as text, so a wrong verb is not rejected. Use move, preset, stop or zoom, with the direction or preset name in `argument`.
- Treating `image.<cam>_<object>` as the live view. It is the last best snapshot of that object; use `camera.<cam>` for a current frame.
