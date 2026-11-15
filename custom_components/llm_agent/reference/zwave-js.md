# Z-Wave JS
> Z-Wave JS: zwave_js.* actions for config parameters, values, multicast, CC API, lock codes.

Z-Wave JS (core `zwave_js`) uses a Z-Wave JS server (the add-on or a container). Devices become
ordinary entities in light, switch, cover, climate, fan, lock, sensor, binary_sensor, number,
select, button, siren, event, update, humidifier. Entity ids follow device name plus value
name (`sensor.hall_motion_battery_level`). Use the generic services for normal control. The
`zwave_js.*` actions below reach what entities do not expose.

Device targeting: the actions marked [nodes] take any of `device_id`, `entity_id`,
`area_id` (each may be a list), at least one required, and act on the Z-Wave nodes behind them.
`device_id` is HA's hex device id, never an entity id. `target:` and `data:` both work.

- `zwave_js.set_config_parameter` [nodes]: `parameter` (number, or the parameter name string)
  and `value` (number, hex string like `0xff`, or the option label) required. `endpoint`
  (default 0). `bitmask` (number or hex string) for a partial parameter, never together with
  a parameter name. `value_size` (1, 2 or 4) and `value_format` (0 signed, 1 unsigned, 2
  enumerated, 3 bit field) are for raw writes: both or neither, and not with `bitmask`.
- `zwave_js.bulk_set_partial_config_parameters` [nodes]: `parameter` (number) and `value`
  required, `endpoint`. `value` is an integer, or a map of bitmask to value (`"0x1": 1`).
- `zwave_js.set_value` [nodes]: `command_class` (number), `property` (number or name), `value`
  required. Optional `endpoint`, `property_key`, `options` (map), `wait_for_result` (bool).
- `zwave_js.multicast_set_value` [nodes]: `command_class`, `property`, `value` required.
  Optional `endpoint`, `property_key`, `options`, and `broadcast` (bool, default false). Needs two or more nodes on one network, or
  `broadcast: true`. A single node falls back to set_value.
- `zwave_js.ping` [nodes]: no fields.
- `zwave_js.invoke_cc_api` [nodes]: `command_class` (number), `method_name` (string),
  `parameters` (list) required, `endpoint` optional. Calls the Z-Wave JS CC API method as is.
- `zwave_js.refresh_notifications` [nodes]: `notification_type` (1-22) required,
  `notification_event` (1-255) optional.
- `zwave_js.refresh_value`: `entity_id` (list, required, no device or area targets),
  `refresh_all_values` (bool, default false).
- `zwave_js.reset_meter`: target a zwave_js `sensor` entity. Optional `meter_type` and `value`.

Locks (target a zwave_js `lock` entity, admin only). Actions marked (response) need
`response_variable`:
- `zwave_js.set_lock_usercode`: `code_slot` and `usercode` required.
  `zwave_js.clear_lock_usercode`: `code_slot`. `zwave_js.get_lock_usercode` (response):
  `code_slot` optional.
- `zwave_js.set_lock_configuration`: `operation_type` (`constant` or `timed`) required.
  Optional `lock_timeout`, `auto_relock_time`, `hold_and_release_time` (0-65535 seconds),
  `twist_assist`, `block_to_block` (bool).
- User and credential model, for locks that support it:
  `zwave_js.set_user` (response): all optional: `user_id` (1-65535), `user_name`,
  `user_type` (`general`, `programming`, `non_access`, `duress`, `disposable`, `expiring`,
  `remote_only`), `credential_rule` (`single`, `dual`, `triple`), `active` (bool),
  `credential_slot`. `credential_type` (`pin_code` or `password`) and `credential_data` go together.
  `zwave_js.delete_user`: `user_id` required. `zwave_js.delete_all_credentials`: `user_id`
  required. `zwave_js.delete_all_users`: no fields. `zwave_js.get_users` (response): no
  fields. `zwave_js.get_credential_capabilities` (response): no fields.
  `zwave_js.set_credential` (response): `user_id`, `credential_type`, `credential_data`
  required, `credential_slot` optional. `zwave_js.delete_credential`: `user_id`,
  `credential_type`, `credential_slot` all required.

Remotes and keypads fire the events `zwave_js_value_notification` and `zwave_js_notification`
instead of changing a state. Both carry `node_id`, `home_id`, `device_id`, `endpoint` and
`command_class`. Value notifications add `command_class_name`, `label`, `property` and `value`.

```yaml
actions:
  - action: zwave_js.set_config_parameter
    target: {device_id: 8f4219cfa57e23f6f669c4616c2205e2}
    data:
      parameter: Minimum brightness level
      value: 5
  - action: zwave_js.multicast_set_value
    target:
      entity_id: [light.hall_dimmer, light.stairs_dimmer]
    data:
      command_class: 38
      property: targetValue
      value: 50
  - action: zwave_js.set_lock_usercode
    target: {entity_id: lock.front_door}
    data:
      code_slot: 3
      usercode: "{{ states('input_text.guest_code') }}"
```

Common mistakes:
- Targeting a device or entity that is not Z-Wave JS. Every target must belong to `zwave_js`.
- A bitmask together with a parameter name, or `value_size` together with `bitmask`.
- `value_size` without `value_format` (or the reverse), or a size of 3.
- `multicast_set_value` on one device without `broadcast`. Use `set_value`, or add devices.
- Using `zwave_js.refresh_value` with `device_id`. It takes `entity_id` only.
- Matter or ZHA lock fields (`pin`, `user_code`) on a Z-Wave lock. Z-Wave uses `usercode`
  with `code_slot`, or `credential_type: pin_code` with the user and credential actions.
- Forgetting `response_variable` on `get_lock_usercode`, `get_users`, `set_user`, `set_credential`.

Related: matter, zha, targets.
