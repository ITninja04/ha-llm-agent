/**
 * The @ picker puts exact ids into a message (`device_id:<id> (Name)`, `area_id:<id>`, an
 * entity id), because an exact id saves the model a search and stops it picking the wrong
 * device. People should not have to read those ids. So the composer shows `@Name`, a sent
 * message shows a name chip, and only the text that is sent and stored keeps the ids.
 *
 * The ids stay in the stored text rather than in a side table so that a chat, a draft and
 * an export all still say exactly what was meant, with or without this panel.
 */

import type { Hass } from "./types";

// The three forms the picker inserts. An entity id only counts when this home has it, so
// ordinary text with a dot ("e.g", "v1.2") is never turned into a chip.
const TOKEN =
  /device_id:[0-9a-f]{32} \(([^()\n]+)\)|area_id:([a-z0-9_]+)|\b([a-z_]+\.[a-z0-9_]+)\b/g;

function labelOf(
  hass: Hass | undefined,
  device: string | undefined,
  area: string | undefined,
  entity: string | undefined,
): string | undefined {
  if (device !== undefined) return device;
  if (area !== undefined) return hass?.areas?.[area]?.name ?? area;
  const st = entity === undefined ? undefined : hass?.states?.[entity];
  if (!st) return undefined;
  return st.attributes.friendly_name || st.entity_id;
}

/** The labels shown in the composer and the ids they stand for. */
export class Mentions {
  private byLabel = new Map<string, string>();

  /** Remember a picked id. Returns the label to show, numbered when another id already
   * uses the same name, so two "Lamp" entities never expand to the same id. */
  add(label: string, token: string): string {
    let name = label;
    for (let n = 2; this.byLabel.has(name) && this.byLabel.get(name) !== token; n++) {
      name = `${label} ${n}`;
    }
    this.byLabel.set(name, token);
    return name;
  }

  /** Stored text to what the composer shows. */
  show(text: string, hass: Hass | undefined): string {
    return text.replace(TOKEN, (token, device, area, entity) => {
      const label = labelOf(hass, device, area, entity);
      return label === undefined ? token : `@${this.add(label, token)}`;
    });
  }

  /** What the composer shows back to the text that is sent and stored. Longest labels
   * first, so "@Kitchen" does not cut "@Kitchen light" short. */
  expand(text: string): string {
    const labels = [...this.byLabel.keys()].sort((a, b) => b.length - a.length);
    for (const label of labels) text = text.split(`@${label}`).join(this.byLabel.get(label)!);
    return text;
  }
}

const cache = new Map<string, string>();

/** Rendered message HTML with each id turned into a chip that shows its name. The id stays
 * in the chip's tooltip. Code and links are left as written. */
export function withChips(html: string, hass: Hass | undefined): string {
  const hit = cache.get(html);
  if (hit !== undefined) return hit;
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
  for (const node of nodes) {
    if (node.parentElement?.closest("code, pre, a")) continue;
    const text = node.data;
    const out = document.createDocumentFragment();
    let last = 0;
    for (const m of text.matchAll(TOKEN)) {
      const label = labelOf(hass, m[1], m[2], m[3]);
      if (label === undefined) continue;
      out.append(text.slice(last, m.index));
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.title = m[0];
      chip.textContent = label;
      out.append(chip);
      last = m.index + m[0].length;
    }
    if (last === 0) continue;
    out.append(text.slice(last));
    node.replaceWith(out);
  }
  const result = tpl.innerHTML;
  if (cache.size > 300) cache.clear();
  cache.set(html, result);
  return result;
}
