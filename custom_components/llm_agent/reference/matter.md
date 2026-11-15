# Matter
> Matter entities and the matter.* lock and water heater actions, with exact fields.

Matter (core `matter`) turns each Matter device into ordinary entities, including these domains:
light, switch, lock, cover, climate, fan, sensor, binary_sensor, button, number, select,
event, siren, update, vacuum, valve, water_heater. Entity ids come from the device name
(`light.hall_lamp`, `sensor.hall_sensor_temperature`). Find them with `search_entities`.
Control them with the generic services (`light.turn_on`, `lock.lock`, `climate.set_temperature`).
The matter domain has no turn_on or similar. The `matter.*` actions below exist only for
locks and water heaters.

All are entity actions: `target.entity_id` must be a Matter entity of the right domain.
Actions marked (response) return data, so the call needs `response_variable`.

Lock (domain `lock`). Indexes are 1-based user slots, credential indexes start at 0:
- `matter.set_lock_user`: all optional. `user_index` (1 or more), `user_name` (text),
  `user_type`, `credential_rule` (`single`, `dual`, `tri`).
- `matter.clear_lock_user`: `user_index` required. 65534 clears every user.
- `matter.set_lock_credential` (response): `credential_type` and `credential_data` required.
  Optional `credential_index`, `user_index`, `user_status` (`occupied_enabled`,
  `occupied_disabled`), `user_type`. `credential_type`: `pin`, `rfid`, `fingerprint`,
  `finger_vein`, `face`.
- `matter.clear_lock_credential`: `credential_type` (same list), `credential_index` required.
- `matter.get_lock_credential_status` (response): `credential_type` (same list plus
  `programming_pin`, `aliro_credential_issuer_key`, `aliro_evictable_endpoint_key`,
  `aliro_non_evictable_endpoint_key`), `credential_index`, both required.
- `matter.get_lock_info` (response), `matter.get_lock_users` (response): no fields.
- `user_type` values: `unrestricted_user`, `year_day_schedule_user`, `week_day_schedule_user`,
  `programming_user`, `non_access_user`, `forced_user`, `disposable_user`, `expiring_user`,
  `schedule_restricted_user`, `remote_only_user`.

Water heater (domain `water_heater`):
- `matter.water_heater_boost`: `duration` seconds, required (UI allows 60-14400).
  Optional `emergency_boost` (bool), `temporary_setpoint` (30-65, whole degrees).

Admin commands (use `ha_websocket`, not services): `matter/ping_node {device_id}`,
`matter/node_diagnostics {device_id}`, `matter/interview_node {device_id}`,
`matter/open_commissioning_window {device_id}` (share a device with another ecosystem),
`matter/commission {code}`, `matter/set_thread {thread_operation_dataset}`.

```yaml
actions:
  - action: matter.water_heater_boost
    target: {entity_id: water_heater.garage}
    data:
      duration: 3600
      temporary_setpoint: 60
  - action: matter.set_lock_credential
    target: {entity_id: lock.front_door}
    data:
      credential_type: pin
      credential_data: "{{ states('input_text.guest_pin') }}"
      user_index: 3
      user_status: occupied_enabled
    response_variable: result
  - action: matter.get_lock_users
    target: {entity_id: lock.front_door}
    response_variable: users
  - action: notify.mobile_app_pixel
    data:
      message: "Lock users: {{ users['lock.front_door'] }}"
```

Common mistakes:
- Calling `matter.*` for a light or sensor. Use the generic domain service.
- Forgetting `response_variable` on a (response) action. HA rejects the call.
- Reading the result as `users.users`. A response is keyed by entity id first.
- `credential_type: password` or `pin_code`. Those are Z-Wave JS values. Matter uses `pin`.
- Targeting a ZHA or Z-Wave lock. These actions only accept Matter locks.

Related: thread, targets, actions.
