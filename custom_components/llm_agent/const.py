"""Constants for LLM Agent."""

from __future__ import annotations

from typing import Any

DOMAIN = "llm_agent"
NAME = "LLM Agent"

PANEL_URL = "llm-agent"
PANEL_ELEMENT = "llm-agent-panel"
STATIC_URL = "/llm_agent_static"
# The small script HA loads on every page, which draws the floating chat button.
FLOAT_LOADER = "llm-agent-float"

# options keys
CONF_PROVIDERS = "providers"
CONF_APPROVAL_MODE = "approval_mode"
CONF_ALLOW_SHELL = "allow_shell"
CONF_PROTECT_SENSITIVE = "protect_sensitive"
CONF_BLOCK_INVALID_RESTART = "block_invalid_restart"
CONF_BACKUP_BEFORE_RISKY = "backup_before_risky"
CONF_MAX_STEPS = "max_steps"
CONF_PRICE_OVERRIDES = "price_overrides"
CONF_EXTRA_PROMPT = "extra_prompt"
CONF_ACK = "acknowledged_risks"
CONF_DAILY_CAP = "daily_spend_cap"  # USD per day, 0 = no cap
# 0.1.3 settings. Each has a default here and a safe range in the options form.
CONF_MAX_REPLY_TOKENS = "max_reply_tokens"
CONF_COMPACT_AT = "compact_at_tokens"  # 0 = never compact
CONF_KEEP_TURNS = "keep_turns"
CONF_HOME_SUMMARY = "include_home_summary"
CONF_CACHE_CHATS = "chats_in_memory"
CONF_MAX_CHATS = "max_chats"
CONF_AUTO_DELETE_DAYS = "auto_delete_days"  # 0 = keep
CONF_UNDO_MB = "undo_size_mb"
CONF_UNDO_KEEP = "undo_keep"
CONF_UNDO_DAYS = "undo_max_age_days"  # 0 = no age limit
CONF_AUDIT_MB = "audit_size_mb"
CONF_TIMEOUT = "request_timeout"  # seconds without data from the provider
CONF_RETRIES = "retries"
CONF_LOG_PROMPTS = "log_prompts"
# 0.2.0 web research
CONF_WEB_TOOLS = "web_tools"
CONF_MCP_TOOLS = "mcp_tools"
CONF_CAMERA_TOOLS = "camera_tools"  # 0.2.2: camera snapshots for vision models
CONF_WEB_ALLOW_LAN = "web_allow_lan"
CONF_SEARCH_BACKEND = "search_backend"  # free, searxng, brave or off ("none" = free)
CONF_SEARXNG_URL = "searxng_url"
CONF_SEARCH_KEY = "search_api_key"
SEARCH_BACKENDS = ["free", "searxng", "brave", "off"]

MODE_ASK_ALL = "ask_all"
MODE_ASK_RISKY = "ask_risky"
MODE_AUTOPILOT = "autopilot"
MODE_REVIEWER = "reviewer"
MODE_READ_ONLY = "read_only"  # 0.6: looks, never changes anything
# Autopilot that also ignores web content. Every other mode asks before any change once a
# chat has read a web page or search result, because that text may be steering the model.
# YOLO drops that one guard on purpose; deny and ask rules, members and unattended runs
# still behave as in autopilot.
MODE_YOLO = "yolo"
APPROVAL_MODES = [
    MODE_ASK_ALL,
    MODE_ASK_RISKY,
    MODE_REVIEWER,
    MODE_AUTOPILOT,
    MODE_YOLO,
    MODE_READ_ONLY,
]
# Two more modes a chat can be switched to from the composer. They are not offered as the
# Settings default: a new chat starts in the Settings mode, and these are picked per chat.
# Accept edits runs changes to the home's setup (automations, scripts, scenes, dashboards,
# helpers, entity names) without asking and asks for everything that acts on devices,
# files or the shell (approval.SETUP_TOOLS says which is which).
MODE_ACCEPT_EDITS = "accept_edits"
# Planning looks only and answers with a numbered plan; the panel then offers Run plan,
# which switches the chat back to the mode it had before and sends the plan.
MODE_PLANNING = "planning"
CHAT_MODES = [*APPROVAL_MODES, MODE_ACCEPT_EDITS, MODE_PLANNING]
# A household member's chat never skips an approval, so these act as Ask for risky there.
MEMBER_DOWNGRADED = {MODE_AUTOPILOT, MODE_REVIEWER, MODE_YOLO, MODE_ACCEPT_EDITS}
# 0.2.1 reviewer approval mode
CONF_REVIEWER_PROVIDER = "reviewer_provider"  # provider id, or SAME_PROVIDER
SAME_PROVIDER = "chat"
CONF_REVIEWER_MODEL = "reviewer_model"  # empty = that provider's default model
CONF_ALWAYS_ASK = "always_ask"  # patterns that always come to a person
DEFAULT_ALWAYS_ASK = (
    "lock.*, cover.*, alarm_control_panel.alarm_disarm, integrations:remove, shell, "
    "ha_websocket:execute_script, write_file"
)

# 0.4.0 household
CONF_TOOL_RULES = "approval_rules"  # allow / ask / deny lines, in every approval mode
CONF_HOUSEHOLD = "household_chat"  # non-admin users get a limited chat
CONF_MEMBER_DAILY_CAP = "member_daily_cap"  # USD per member per day, 0 = no cap
CONF_APPROVAL_PHONE = "approval_phone"  # notify action of the phone that approves
CONF_FLOAT_BUTTON = "float_button"  # the chat button on every HA page
# The turn log: one record per chat turn for tuning the prompt, kept apart from the chats
# so deleting a chat does not lose it. Stays in .storage; nothing is sent anywhere.
CONF_TURN_LOG = "turn_log"
CONF_TURN_LOG_DAYS = "turn_log_days"
CONF_TURN_LOG_MB = "turn_log_mb"

DEFAULT_OPTIONS = {
    CONF_TOOL_RULES: "",
    CONF_HOUSEHOLD: False,
    CONF_MEMBER_DAILY_CAP: 0.5,
    CONF_APPROVAL_PHONE: "",
    CONF_FLOAT_BUTTON: True,
    CONF_TURN_LOG: True,
    CONF_TURN_LOG_DAYS: 30,
    CONF_TURN_LOG_MB: 20,
    CONF_APPROVAL_MODE: MODE_ASK_RISKY,
    CONF_REVIEWER_PROVIDER: SAME_PROVIDER,
    CONF_REVIEWER_MODEL: "",
    CONF_ALWAYS_ASK: DEFAULT_ALWAYS_ASK,
    CONF_ALLOW_SHELL: False,
    CONF_PROTECT_SENSITIVE: True,
    CONF_BLOCK_INVALID_RESTART: True,
    CONF_BACKUP_BEFORE_RISKY: True,
    CONF_MAX_STEPS: 25,
    CONF_PRICE_OVERRIDES: {},
    CONF_EXTRA_PROMPT: "",
    CONF_DAILY_CAP: 0.0,
    CONF_MAX_REPLY_TOKENS: 16000,
    CONF_COMPACT_AT: 100_000,
    CONF_KEEP_TURNS: 10,
    CONF_HOME_SUMMARY: True,
    CONF_CACHE_CHATS: 5,
    CONF_MAX_CHATS: 200,
    CONF_AUTO_DELETE_DAYS: 0,
    CONF_UNDO_MB: 50,
    CONF_UNDO_KEEP: 50,
    CONF_UNDO_DAYS: 0,
    CONF_AUDIT_MB: 2,
    CONF_TIMEOUT: 300,
    CONF_RETRIES: 3,
    CONF_LOG_PROMPTS: False,
    CONF_WEB_TOOLS: True,
    CONF_CAMERA_TOOLS: True,
    CONF_MCP_TOOLS: False,
    CONF_WEB_ALLOW_LAN: False,
    CONF_SEARCH_BACKEND: "free",
    CONF_SEARXNG_URL: "",
    CONF_SEARCH_KEY: "",
}

# (min, max) for every number setting, so a bad value can never break anything.
# Values outside are clamped wherever they are read.
RANGES: dict[str, tuple[float, float]] = {
    CONF_MAX_STEPS: (1, 200),
    CONF_DAILY_CAP: (0, 1000),
    CONF_MEMBER_DAILY_CAP: (0, 1000),
    CONF_MAX_REPLY_TOKENS: (1024, 128_000),
    CONF_COMPACT_AT: (0, 1_000_000),
    CONF_KEEP_TURNS: (2, 50),
    CONF_CACHE_CHATS: (1, 50),
    CONF_MAX_CHATS: (10, 5000),
    CONF_AUTO_DELETE_DAYS: (0, 3650),
    CONF_UNDO_MB: (5, 2000),
    CONF_UNDO_KEEP: (5, 1000),
    CONF_UNDO_DAYS: (0, 3650),
    CONF_AUDIT_MB: (1, 100),
    CONF_TIMEOUT: (30, 1800),
    CONF_RETRIES: (0, 6),
    CONF_TURN_LOG_DAYS: (1, 365),
    CONF_TURN_LOG_MB: (1, 200),
}


def setting(options: dict, key: str) -> Any:
    """An option's value, falling back to the default and clamped to its range."""
    value = options.get(key, DEFAULT_OPTIONS.get(key))
    if key not in RANGES:
        return value
    lo, hi = RANGES[key]
    try:
        num = float(value)
    except TypeError, ValueError:
        num = float(DEFAULT_OPTIONS[key])
    num = min(max(num, lo), hi)
    return int(num) if isinstance(DEFAULT_OPTIONS[key], int) else num


APPROVAL_TIMEOUT = 600  # seconds
MAX_TOOL_RESULT_CHARS = 16000
OLD_TOOL_RESULT_CHARS = 1500  # tool results from earlier turns are shortened to this
MAX_CONVERSATIONS = 200
# Home notes go into every admin request, so they stay short: each note, and all enabled
# notes together. Disabled notes cost nothing per request, so only their count is capped.
NOTES_MAX = 2000
NOTE_MAX = 300
NOTES_COUNT_MAX = 100
# The knowledge base: only the index (title and summary) goes into a request, and the
# model reads a body on demand, so a body can be long. The index has a budget like the
# notes, because it is sent every time.
KNOWLEDGE_BODY_MAX = 20000
KNOWLEDGE_TITLE_MAX = 80
KNOWLEDGE_SUMMARY_MAX = 200
KNOWLEDGE_INDEX_MAX = 3000
KNOWLEDGE_COUNT_MAX = 100
SNAPSHOT_KEEP = 50

DATA_DIR = ".llm_agent"  # inside the HA config dir
