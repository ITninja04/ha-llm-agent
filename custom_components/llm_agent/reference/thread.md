# Thread and OTBR
> Thread datasets and OpenThread border routers (WebSocket only, no services).

Thread (core `thread`) and OTBR (core `otbr`) add no services and no entities. Everything is
admin WebSocket commands (use `ha_websocket`) and config flows. Do not invent `thread.*` or
`otbr.*` actions.

Thread (the datasets HA remembers, and routers seen on the network):
- `thread/list_datasets` returns `{datasets: [{dataset_id, network_name, channel, pan_id,
  extended_pan_id, preferred, preferred_border_agent_id, preferred_extended_address, source,
  created}]}`.
- `thread/get_dataset_tlv {dataset_id}`: the dataset as a hex TLV string.
- `thread/add_dataset_tlv {source, tlv}`: both required. Import a dataset.
- `thread/set_preferred_dataset {dataset_id}`: which network new devices join.
- `thread/set_preferred_border_agent {dataset_id, border_agent_id, extended_address}`: all
  required, `border_agent_id` may be null.
- `thread/delete_dataset {dataset_id}`: fails for the preferred dataset.
- `thread/discover_routers`: a subscription of border routers found by mDNS. Not one-shot.

OTBR (only when an OpenThread Border Router integration entry is set up):
- `otbr/info`: no fields. Returns, per border router keyed by `extended_address`:
  `active_dataset_tlvs`, `border_agent_id`, `channel`, `extended_address`,
  `extended_pan_id`, `url`.
- `otbr/set_network {extended_address, dataset_id}`: replaces the router's active dataset.
- `otbr/set_channel {extended_address, channel}`: returns `{delay}` seconds. Devices hop
  channels over that time and may drop off.
- `otbr/create_network {extended_address}`: factory resets the router, then makes a new network.
  Every device on the old network is orphaned.

Typical read, in order: `otbr/info` for the live network, then `thread/list_datasets` and
compare `extended_pan_id` to see whether HA's preferred dataset matches the router.

Common mistakes:
- Looking for entities or services. There are none. Only the OTBR add-on or device has state.
- Passing the TLV where `dataset_id` is wanted. `dataset_id` is HA's id from `list_datasets`.
- Using `otbr/create_network` to "fix" a mismatch. Use `otbr/set_network` with the right
  `dataset_id` instead. Create wipes the network.
- Assuming one border router. `otbr/info` keys by `extended_address`, and every other
  command needs it.
- Expecting `thread/discover_routers` to return a list. It streams events.

Related: matter.
