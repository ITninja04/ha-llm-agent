# Manager: offline evaluation (2026-11-21)

Why the Manager asks Jev only whether a turn is stuck, and where its defaults come from.

## Data and method

- The 15 stored chats on the maintainer's install: 127 turns, 107 with tool calls, median
  11 calls, 24 at 30 or more, 11 past the 50 call limit.
- Every turn with enough calls to reach a check was replayed against
  `typesafe/jev-1.14` on OpenRouter, with the state and requests the integration builds.
- The first replay asked a wider set of questions: on task, repeating, status (working,
  drifting, stuck or done), whether pending calls were needed, and at a stop whether to
  continue. 360 checks over 24 long turns and 59 shorter ones.
- Each long trace, and each shorter turn that fired, was read by hand to judge whether
  acting on the answer would have been right.
- A second replay checked the shipped form: the status question alone, every 5 calls and
  after a chain of failed calls. 323 checks.
- Not possible offline: what the chat model does after a steer.

## Results of the wide replay

| Answer | Best threshold | Turns flagged | Judged right | Verdict |
| --- | --- | --- | --- | --- |
| Stuck | 0.7 | 5 long, 1 short | all 6 | Kept |
| Drifting | none | 3 short at 0.54 to 0.71 | none | Dropped. The real rabbit holes scored 0.39 at most. |
| Done | none | 4 at 0.5 | 2 | Dropped. The other 2 were mid-fix. |
| Repeating | 0.85 | 2 long | 2 | Dropped. Exact repeats are handled in code. |
| Should continue | none | | | Dropped. 0.41 to 0.68 on stops the owner continued and on stops he did not. |

## The shipped form

Status question only, its four options unchanged, stuck at 0.7 or more steers.

| Turn | Calls | Checks that steered | What the trace shows |
| --- | --- | --- | --- |
| 13 | 41 | every 5 at calls 25, 30, 35, 40 | Searching container internals for a way to create a config subentry |
| 30 | 45 | at 10, 14 (failing chain), 16, 20 | 403 and unknown-command errors fetching add-on logs, found the right route at call 23 |
| 51 | 10 | at 5 | Three failing marketplace commands in a row |
| 87 | 52 | at 15, 25 | Failing Supervisor calls until the right route at call 27 |
| 126 | 53 | at 25, 30 | Failed add-on install attempts, then polling the same status |

- False alarms: 0 of 59 shorter turns, 0 of 24 long turns.
- The failing-call trigger uses 3 failures in a row. With 2 it also fired on a turn whose
  third try succeeded, where telling the model to give up would have been wrong.
- Cost: $0.033 for 323 checks, about $0.0001 each. Latency p50 0.18 s, p95 0.25 s, max
  0.39 s, none near the 3 s timeout.

## What it does not fix

Only 2 of the 11 turns that hit the call limit got a steer at all. The limit cut-offs
need a different fix (telling the model its budget).
