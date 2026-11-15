# Zigbee2MQTT
> Zigbee2MQTT: an MQTT add-on with no services of its own. Topics and mqtt.publish.

Zigbee2MQTT (Z2M) is not a Home Assistant integration. It is a separate add-on or
container that owns the Zigbee radio and speaks MQTT. HA only sees it through the core
`mqtt` integration plus MQTT discovery, so there is no `zigbee2mqtt.*` action. To command
Z2M, publish to its topics with `mqtt.publish`.

Entities: with Z2M's `homeassistant: enabled: true`, each device is announced on the
`homeassistant/` discovery topic and appears as MQTT entities (light, switch, sensor,
binary_sensor, cover, climate, fan, lock, siren, number, select, update, event). The suggested
entity id is the type plus the device's `friendly_name` lowercased with spaces turned into
`_`, then a suffix: `light.living_room_lamp`, `sensor.living_room_lamp_temperature`. HA may keep
an older id. There is also a bridge device: `binary_sensor.zigbee2mqtt_bridge_connection_state`
and `switch.zigbee2mqtt_bridge_permit_join` (turning it on allows joins for 254 s).

Topics (base `zigbee2mqtt`, configurable, `FRIENDLY_NAME` is the device name or IEEE address):
- `zigbee2mqtt/FRIENDLY_NAME`: state as one JSON object (`{"state":"ON","brightness":215}`).
- `zigbee2mqtt/FRIENDLY_NAME/set`: JSON command, for example `{"state":"ON","brightness":255}`.
  Publishing `ON` to `zigbee2mqtt/FRIENDLY_NAME/set/state` is the non-JSON form.
- `zigbee2mqtt/FRIENDLY_NAME/get`: ask for a value, payload like `{"state":""}`.
- `zigbee2mqtt/FRIENDLY_NAME/availability`: online or offline, if availability is enabled.
- `zigbee2mqtt/bridge/request/permit_join`: `{"time": 254}` to allow, `{"time": 0}` to stop.
- `zigbee2mqtt/bridge/request/device/rename`: `{"from":"old","to":"new","homeassistant_rename":true}`.
  Without `homeassistant_rename` the HA entity ids stay the same.
- `zigbee2mqtt/bridge/request/device/remove`: `{"id":"my_bulb"}`.
- `zigbee2mqtt/bridge/request/group/add`, `group/rename`, `group/remove`, `group/members/add`.
- Answers arrive on `zigbee2mqtt/bridge/response/<same name>` as `{"status":"ok"|"error",
  "data":<object>}`. State and info are on `zigbee2mqtt/bridge/info`, `zigbee2mqtt/bridge/state`
  and `zigbee2mqtt/bridge/devices`.

`mqtt.publish` fields: `topic` (required), `payload` (a string, so JSON is written as a quoted
string), `qos` (0-2), `retain` (bool), `evaluate_payload` (bool), `message_expiry_interval`.
Also `mqtt.dump` (`topic`, `duration` 1-300 s) and `mqtt.reload`.

Buttons and remotes send `action` in their state JSON. The `sensor.*_action` entity exists
only with Z2M's `legacy_action_sensor` and event entities only with `experimental_event_entities`.
Otherwise trigger on the topic with `trigger: mqtt` or use the device's HA device trigger.

```yaml
triggers:
  - trigger: mqtt
    topic: zigbee2mqtt/hall_remote/action
    payload: single
actions:
  - action: mqtt.publish
    data:
      topic: zigbee2mqtt/living_room_lamp/set
      payload: '{"state": "TOGGLE", "brightness": 200}'
  - action: mqtt.publish
    data:
      topic: zigbee2mqtt/bridge/request/permit_join
      payload: '{"time": 120}'
  - action: light.turn_off
    target: {entity_id: light.living_room_lamp}
```

Common mistakes:
- Looking for `zigbee2mqtt.*` actions or an integration entry. Use `mqtt.publish`.
- A YAML mapping as `payload`. It must be a string. Quote the JSON.
- Publishing to a `/set` topic for plain on/off from an automation. The entity's own
  `light.turn_on` or `switch.turn_on` is simpler. Use topics for things HA has no entity for
  (permit join, rename, groups, raw attribute writes).
- Renaming a device with only `from` and `to`. Entity ids will not follow the new name.
- Setting Z2M's discovery topic equal to its base topic. Z2M raises an error at startup.
- Asking for a Z2M setting through HA. Settings are changed in the Z2M frontend or
  `bridge/request/options`.

Related: zha (HA's built-in Zigbee, a different stack), targets.
