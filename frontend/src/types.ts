import type { PageContext } from "./pagecontext";

export interface HassConnection {
  sendMessagePromise<T = unknown>(msg: Record<string, unknown>): Promise<T>;
  subscribeMessage<T = unknown>(
    callback: (event: T) => void,
    msg: Record<string, unknown>,
    options?: { resubscribe?: boolean },
  ): Promise<() => Promise<void>>;
  /** "ready" fires after a reconnect (home-assistant-js-websocket). */
  addEventListener?(event: "ready" | "disconnected", cb: () => void): void;
  removeEventListener?(event: "ready" | "disconnected", cb: () => void): void;
}

export interface Hass {
  connection: HassConnection;
  user?: { id: string; is_admin: boolean; name: string };
  themes?: { darkMode?: boolean };
  locale?: { language: string };
  states?: Record<string, { entity_id: string; attributes: { friendly_name?: string } }>;
  areas?: Record<string, { area_id: string; name: string }>;
  devices?: Record<string, { id: string; name?: string | null; name_by_user?: string | null }>;
}

/** One `@` autocomplete suggestion: what is shown and what goes into the message. */
export interface Mention {
  kind: "entity" | "area" | "device";
  label: string;
  insert: string;
  detail: string;
}

export interface ModelSuggestion {
  id: string;
  label: string;
  input?: number | null;
  output?: number | null;
  /** one of our suggestions, kept on top of the list */
  suggested?: boolean;
}

export interface ProviderInfo {
  id: string;
  type: string;
  name: string;
  type_name: string;
  default_model: string;
  models: ModelSuggestion[];
}

export interface Info {
  version: string;
  approval_mode: string;
  providers: ProviderInfo[];
  running: string[];
  my_default?: { provider_id: string; model: string } | null;
  /** admins only: what the turn log holds, for its download button */
  turn_log?: { enabled: boolean; count: number; bytes: number };
  /** false for household members: no notes, model choice or undo */
  is_admin?: boolean;
  household?: boolean;
}

/** Panel preferences, kept per browser. */
export interface Prefs {
  theme: "auto" | "light" | "dark";
  size: "small" | "normal" | "large";
  compact: boolean;
  toolsOpen: boolean;
  showUsage: boolean;
  send: "enter" | "ctrl";
  listOpen: boolean;
}

export interface Usage {
  input: number;
  output: number;
  cache_read: number;
  cache_write: number;
  cost: number | null;
  review?: { input: number; output: number; cost: number | null };
}

export interface ReviewVerdict {
  decision: "approve" | "deny" | "ask";
  reason: string;
  model: string;
}

export interface ConvSummary {
  id: string;
  title: string;
  updated: number;
  model: string;
  provider_id: string;
  cost: number | null;
  snippet?: string;
  /** "action" when an automation or script started the chat with llm_agent.ask. */
  source?: string;
}

export interface ToolCallInfo {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

/** One rendered item in the chat. */
export type Item =
  | {
      kind: "user";
      text: string;
      /** Photos sent with this message, as data URLs (this session only). */
      images?: Photo[];
      /** Photos sent earlier; the pictures themselves are not kept. */
      photos?: number;
      /** Files sent with this message. `data` is there only in the session that sent
       * them, so a retry can send them again; a reloaded chat has names and sizes. */
      files?: AttachedFile[];
      /** The page chip's summary when the message went with the page the person was
       * on, so they can tell later what the model saw. */
      page?: string;
      /** The page itself, this session only, so a retry sends the same page. */
      pageData?: PageContext;
    }
  | { kind: "assistant"; text: string }
  | {
      kind: "tool";
      id: string;
      name: string;
      args: Record<string, unknown>;
      status: "running" | "ok" | "error" | "waiting";
      summary?: string;
      preview?: string;
      snapshotId?: string | null;
      undone?: boolean;
      approval?: Approval;
      review?: ReviewVerdict;
      reviewing?: boolean;
      image?: string;
    }
  | { kind: "notice"; text: string; error?: boolean; stop?: string };

export interface Approval {
  summary: string;
  reason: string;
  risky: boolean;
  diff: string | null;
  /** only an admin's phone can answer it */
  phoneOnly?: boolean;
  /** a phone gets it too if it waits */
  phone?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  provider_id: string;
  model: string;
  /** the chat's own approval mode; null follows the Settings mode */
  mode?: string | null;
  mode_before_plan?: string | null;
  usage: Usage;
  stopped?: string | null;
  stopped_text?: string | null;
  messages: StoredMessage[];
}

export type StoredMessage =
  | { role: "user"; content: string; photos?: number; files?: FileInfo[]; page?: string }
  | { role: "assistant"; content: string; tool_calls: ToolCallInfo[] }
  | {
      role: "tool";
      tool_call_id: string;
      name: string;
      ok: boolean;
      summary: string;
      snapshot_id: string | null;
      undone?: boolean;
      decision: string | null;
      review?: ReviewVerdict | null;
      preview: string;
    };

export type ChatEvent =
  | { type: "delta"; text: string }
  | {
      type: "tool_start";
      call_id: string;
      name: string;
      args: Record<string, unknown>;
    }
  | {
      type: "approval";
      call_id: string;
      name: string;
      risky: boolean;
      reason: string;
      summary: string;
      diff: string | null;
      args: Record<string, unknown>;
      phone_only?: boolean;
      phone?: boolean;
    }
  | {
      type: "tool_result";
      call_id: string;
      ok: boolean;
      summary: string;
      snapshot_id: string | null;
      preview: string;
      review?: ReviewVerdict | null;
      image?: string | null;
    }
  | { type: "review_start"; call_id: string; model: string }
  | ({ type: "review"; call_id: string } & ReviewVerdict)
  | { type: "usage"; usage: Usage }
  | { type: "notice"; text: string; stop?: string }
  | { type: "error"; message: string }
  | { type: "done"; usage: Usage };

/** What the server keeps about a sent file. `kind` is decided from the bytes. */
export interface FileInfo {
  name: string;
  size: number;
  kind: "text" | "pdf" | "zip" | "gzip";
}

/** A file waiting to be sent (or just sent), with its contents as base64. */
export interface AttachedFile extends FileInfo {
  data?: string;
}

/** A photo attached to a message. `url` is a data URL for showing it. */
export interface Photo {
  media_type: string;
  data: string;
  url: string;
}
