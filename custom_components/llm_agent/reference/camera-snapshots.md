# Camera snapshots
> camera.snapshot, image.snapshot, record, allowed paths, viewing a camera.

**Entities.** `camera.<name>` has the state `idle`, `recording` or `streaming` (or `unavailable`). Attributes: `access_token` (rotates, so never store it), plus `brand`, `model_name` and `motion_detection` when the integration knows them. `image.<name>` is a still picture (for example a Frigate best snapshot, a weather radar map, a floor plan) with only `access_token` as an extra attribute. Both are plain entities, so `search_entities` finds them.

**Looking at a picture yourself.**
- `camera_snapshot` (entity_id of a `camera.*` entity) fetches a frame and attaches it to you. It works only for `camera.*`, only when "Let the agent look at cameras" is on in the options, and only if your model can see images. If the tool is not in your list, say so instead of guessing what is on the camera.
- There is no tool for `image.*` entities. You cannot look at them.
- `read_file` reads text. A `.jpg` saved by `camera.snapshot` cannot be viewed with it. A saved file is for other things to use (notifications, dashboards, a person), not for you.

**Actions** (all take a `target`):

| Action | Target | Fields |
|---|---|---|
| `camera.snapshot` | camera | `filename` required: a template, rendered with no variables (so only things like `now()` work) |
| `image.snapshot` | image | `filename` required: plain text, not a template |
| `camera.record` | camera | `filename` required (template), `duration` (seconds, default 30, 1 to 3600), `lookback` (seconds of video from before the call, default 0, 0 to 300) |
| `camera.play_stream` | camera | `media_player` required (entity or list), `format` (default `hls`) |
| `camera.turn_on`, `camera.turn_off` | camera | none |
| `camera.enable_motion_detection`, `camera.disable_motion_detection` | camera | none |

**Where a file can go.** Home Assistant refuses any path outside its allowlist: `/config/www` and the media folder (`/media` on a container install, otherwise `<config>/media`). Anything else, including the config directory itself, fails with "Cannot write <path>, no access to path; `allowlist_external_dirs` may need to be adjusted". Adding a directory means editing `allowlist_external_dirs` in `configuration.yaml`, which needs a restart (or a core config reload) to apply. Missing folders under an allowed path are created. If the camera returns no picture, the action ends without writing a file and without an error, so check the file exists afterwards.

`/config/www/x.jpg` is served as `/local/x.jpg`, but only if `www` existed when Home Assistant started. A `www` folder created by the first snapshot is not served until the next restart.

**Differences from the generic services.** `camera.snapshot` is the only action that saves a still. Timeout is 10 seconds for both snapshot actions. For a camera that uses its stream for stills, the action waits for the next keyframe before it saves the frame. `camera.record` needs a camera with stream support and fails with "does not support record service" otherwise.

```yaml
actions:
  - action: camera.snapshot
    target: {entity_id: camera.front_door}
    data:
      filename: "/config/www/snapshots/front_door_{{ now().strftime('%Y%m%d_%H%M%S') }}.jpg"
```

Keep one fixed name when something needs a stable URL:

```yaml
actions:
  - action: camera.snapshot
    target: {entity_id: camera.driveway}
    data: {filename: /config/www/snapshots/driveway_latest.jpg}
  - action: image.snapshot
    target: {entity_id: image.front_door_person}
    data: {filename: /media/snapshots/front_door_person.jpg}
```

Record with ten seconds of lookback, then show the feed on a TV:

```yaml
actions:
  - action: camera.record
    target: {entity_id: camera.garage}
    data:
      filename: "/media/clips/garage_{{ now().strftime('%Y%m%d_%H%M%S') }}.mp4"
      duration: 20
      lookback: 10
  - action: camera.play_stream
    target: {entity_id: camera.garage}
    data: {media_player: media_player.living_room_tv}
```

Common mistakes:
- Writing to `/config/snapshots` or `/tmp`. Only `www`, the media folder and `allowlist_external_dirs` entries pass.
- Using `{{ entity_id.name }}` in `filename`, as the built-in example text does. The template gets no variables, so use `now()` or a fixed name.
- Putting a template in `image.snapshot` `filename`. It is plain text there.
- Calling `camera.snapshot` on an `image.*` entity, or `image.snapshot` on a camera. Each takes only its own domain.
- Reporting a snapshot as taken without checking the file or the picture. A camera that returns nothing produces no file and no error.
- Reading a saved `.jpg` with `read_file` to see what is in it. Use `camera_snapshot` for a camera; there is no way to look at an `image.*` entity.
- Expecting `camera.record` to work on any camera. It needs a camera with stream support.
