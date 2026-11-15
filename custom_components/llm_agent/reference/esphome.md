# ESPHome
> ESPHome devices: entity naming, device-defined esphome.* actions, and limits.

ESPHome (core `esphome`) connects to each device over its native API. Every component in
the device's YAML becomes a normal entity in the matching domain (sensor, binary_sensor,
switch, light, fan, cover, climate, number, select, text, button, lock, valve, camera,
media_player, update, event, assist_satellite and more). Entity ids are the device name plus
the component name: `sensor.garage_node_temperature`. Control them with the generic
services (`switch.turn_on`, `light.turn_on`, `number.set_value`). The integration adds no
fixed `esphome.*` services.

Device-defined actions: each action declared under `api:` in the device's YAML is registered
in HA as `esphome.<device_name>_<action_name>`, with `-` in the device name turned into `_`
(device `garage-node`, action `start_fan` gives `esphome.garage_node_start_fan`). The list
comes from the device when it connects and refreshes after new firmware. The fields are
exactly the arguments the device declared, so read them with `list_services` domain
`esphome`. Rules that hold for every one:
- Every declared argument is required. There are no optional fields.
- Types: `bool`, `int`, `float`, `string`, and arrays of each (give a YAML list).
- A device may declare a response (none, optional, only). With optional or only, use
  `response_variable`. A device whose action only reports status returns no data.
- There is no `target`. The device is the target, via the action name.

Reverse direction: a device can call HA actions or fire events only when "Allow the device
to perform Home Assistant actions" is on in the integration's options (on by default).
Device-fired events are always named `esphome.<something>`.

What HA cannot do from here: change the device's YAML, flash firmware, or add and remove
components. That happens in the ESPHome dashboard.

```yaml
actions:
  - action: esphome.garage_node_start_fan
    data:
      speed: 2
      minutes: 15
  - action: esphome.garage_node_read_sensors
    data: {}
    response_variable: reading
  - action: light.turn_on
    target: {entity_id: light.garage_node_strip}
    data: {brightness_pct: 40}
```

Common mistakes:
- Guessing the action name. Check `list_services`. The device name comes from its YAML
  `name:`, not the friendly name shown in HA.
- Leaving out an argument because it looks optional. All are required.
- Using `esphome.<entity>` as if actions were per entity. They are per device.
- Passing a scalar for an array argument or a list for a scalar. Array types take a list.
- Expecting a device to call HA after someone turned the options switch above off.

Related: actions, targets.
