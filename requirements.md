# PARCEL PANIC — 컨베이어 대작전 requirements

The user selected this game and requested substantial challenge, fun and real-game presentation. These are implementation targets, not claims of completed features.

- Build a conveyor factory with rotate/place/remove, splitters or routers, destination/color/size or priority sorting, bounded buffering and physical parcel motion driven by a deterministic tick model.
- Campaign target: 12 genuinely different demanding contracts. Later contracts combine merge contention, queue saturation, limited machinery/cost, urgent jobs/deadlines and at least one scheduled disruption. Do not make every solution a straight belt.
- Distinct planning and running phases, visual ghost-placement, relevant path/destination cues, board keyboard editing, undo/redo, pause/step/speed/restart, contract objectives and clear why a parcel failed.
- Simultaneous occupancy and merge arbitration must be deterministic. Define buffer behavior, delivery/arrival timing, backpressure and wrong deliveries; never silently delete a stalled parcel to improve scores.
- At least one build challenge with resource ceilings and throughput/deadline tradeoffs; show moving parcels and actual counts, not a progress bar disconnected from simulation.
- Every authored contract needs a legal machine-layout/setting witness tested through actual simulation, plus wrong-route/deadlock/overbudget/failure and pause/reset invariant cases. Independently verify delivered IDs/counts and timing boundaries in selected fixtures.
- Use game-world drawing with recognisable input docks, loading chutes, belt direction/slats, parcels, splitter equipment and queue indicators. Keep planning tools compact and contextual. Click/touch and keyboard controls both usable.
- Hard mode or verified scenario variations may constrain deadlines and budgets; label replay seeds honestly. Avoid arbitrary impossible random generation.
- Results contain delivered/misrouted/late orders, equipment cost and waiting/stalls where measured. Retry restores the same source schedule. No fake global leaderboard; current session may have local records.

## Approved v2 additions (2026-10-09)

The user explicitly supersedes the initial memory-only restriction with bounded device-local saves and the minimal web-lab-progress-v1 summary. Preserve legacy 1–12. Add separate guided practice and genuinely distinct ordered processing/rework contracts, assistance provenance, scoring breakdown, fit/zoom/pan, accessible compact controls and actual-command export. Keep model/replay pure. The highest fixed authored challenge is a ranking candidate only: expose ranked.js and app rankingAdapter per the main integration contract, no SDK/URL/backend yet. Max ranked payload 48KiB/512 actions/one run, unlimited fresh attempts; no client outcome fields, hints, snapshots or wall-clock score. Main handles browser E2E/screenshots/provider integration/publication. No commit/push/account access or other agents in this implementation session.

## Original acceptance (preserved)

- Complete playable campaign with honest finite difficulty and validated solvability, not a decorative prototype or lab controls with pretend game results.
- Pure rules and UI remain separate. Test normal/negative/boundary/replay/undo/lifecycle cases, then actual browser input at desktop/390/320 with no document overflow/console failures.
- Document exact mechanics, witnesses, bounds, test types, local browser evidence and any NOT_RUN. A human difficulty/fun rating cannot be asserted from model tests alone.
- Original code and code-native art; no external content/license dependence. Reuse static Pages. The approved ranking exception below supersedes the initial no-server restriction.

## Approved opt-in public ranking exception (2026-10-09)

Only the fixed final challenge may connect to the separate web-lab-ranking API. Ordinary practice remains offline. Users explicitly start a fresh challenge and explicitly register a completed result; no automatic requests on load. The server replays bounded accepted commands using identical versioned rules, rejects client outcome fields, and ranks equal outcomes equally without device speed. Store only an anonymous credential locally; server stores nickname, verified best and private verification commands. Delete removes both eligible games' public records for that anonymous identity; inactive identities expire after 180 days. No paid plan, real-name account, analytics, IP storage or fabricated participants. CSP permits only the exact deployed ranking origin. Human-only play and one identity per human are not guaranteed.
