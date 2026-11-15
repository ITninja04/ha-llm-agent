# ZHA
> ZHA: zha.* actions for pairing, cluster commands, sirens and lock codes, by IEEE address.

ZHA (core `zha`) runs the Zigbee radio inside HA. Devices become ordinary entities (light,
switch, sensor, binary_sensor, cover, climate, fan, lock, siren, number, select, button,
update, event and more). Control them with the generic services. The `zha.*` actions below are
for pairing and for raw Zigbee access. All are admin only.

Most actions address a device by `ieee`, its 64-bit Zigbee address like
`00:0d:6f:00:05:7d:2d:34`. It is not an entity id and not an HA device id. Get it from the
WebSocket command `zha/devices` (`ha_websocket`, returns each device's `ieee`). Cluster and
attribute ids are plain integers (0x0006 is 6).

- `zha.permit`: all optional. `duration` seconds 0-254 (default 60). `ieee` limits joining
  to that router. `source_ieee` plus `install_code` go together (both or neither). `qr_code`
  is the alternative to that pair. Pair devices that need an install code with these.
- `zha.remove`: `ieee` required. Removes the device from the network.
- `zha.set_zigbee_cluster_attribute`: `ieee`, `endpoint_id`, `cluster_id`, `attribute`
  (int or name), `value` (int, bool or string), all required. Optional `cluster_type`
  (`in` default, or `out`), `manufacturer` (int).
- `zha.issue_zigbee_cluster_command`: `ieee`, `endpoint_id`, `cluster_id`, `command` (int),
  `command_type` (`client` or `server`), all required. Plus exactly one of `params` (object,
  by name) or `args` (list, deprecated). Optional `cluster_type`, `manufacturer`.
- `zha.issue_zigbee_group_command`: `group` (int group id), `cluster_id`, `command`
  required. Optional `cluster_type`, `args` (list), `manufacturer`.
- `zha.warning_device_squawk` (sirens, IAS warning devices): `ieee` required. Optional
  `mode` 0-1 (default 0), `strobe` 0-1 (default 1), `level` 0-3 (default 2).
- `zha.warning_device_warn`: `ieee` required. Optional `mode` 0-6 (default 3, 0 stops),
  `strobe` 0-1, `level` 0-3, `duration` seconds (default 5), `duty_cycle` 0-100 in steps
  of 10 (default 0), `intensity` 0-3 (default 2).
- Lock codes (target a ZHA `lock` entity): `zha.set_lock_user_code` with `code_slot` and
  `user_code` required. `zha.enable_lock_user_code` with `code_slot` required.
  `zha.disable_lock_user_code` with `code_slot` required. `zha.clear_lock_user_code` with
  `code_slot` required.

Device re-configuration is not an action in this version. Use the WebSocket command
`zha/devices/reconfigure {ieee}`. To find cluster, attribute and command ids, use
`zha/devices/clusters {ieee}`, then `zha/devices/clusters/attributes` or
`zha/devices/clusters/commands` with `ieee`, `endpoint_id`, `cluster_id`, `cluster_type` (all required).
Remotes and buttons fire `zha_event` (data has `device_ieee`, `device_id`, `unique_id` and the
device's command details) rather than a state change, so trigger on that event or on the device's device trigger.

```yaml
actions:
  - action: zha.permit
    data:
      duration: 120
  - action: zha.issue_zigbee_cluster_command
    data:
      ieee: "00:0d:6f:00:05:7d:2d:34"
      endpoint_id: 1
      cluster_id: 3
      command: 0
      command_type: server
      params:
        identify_time: 10
  - action: zha.set_lock_user_code
    target: {entity_id: lock.back_door}
    data:
      code_slot: 2
      user_code: "{{ states('input_text.guest_code') }}"
```

Common mistakes:
- Passing an entity id or device id as `ieee`. It must be the colon-separated address.
- Giving both `args` and `params`, or neither, to `issue_zigbee_cluster_command`.
- Using `zha.reconfigure_device`. It is not registered here. Use the WebSocket command.
- Missing `command_type` or `endpoint_id`. Both are required, with no default.
- Hex strings for ids. Use integers (`cluster_id: 6`).
- Calling `zha.permit` with only `source_ieee`. It needs `install_code` too.
- Using `zha.*` for normal on/off or dimming. Use `light.turn_on`, `switch.turn_on` etc.

Related: zigbee2mqtt (the other Zigbee route, not ZHA), targets, actions.
