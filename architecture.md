# PARCEL PANIC — 컨베이어 대작전 architecture

## Authority and scope

Independent static GitHub Pages game at /parcel-panic/. Only dist is public site output. Preserve all other repositories; no existing game code is merged. The approved 2026-10-09 extension adds optional ranking transport for fixed contract 14 only. Ordinary play has no backend dependency; separately owned web-lab-ranking verifies/stores submitted inputs. No runtime packages, personal login, tracking or paid infrastructure.

## Separation

- dist/src/model.js: pure deterministic state/rules/scoring, validated bounded commands, no DOM, clock, browser globals, network or storage.
- dist/src/levels.js: authored campaign/scenario data and pure validated transforms; not UI. Solutions belong in test fixtures, not silent score manipulation.
- dist/src/app.js: DOM/input orchestration, lifecycle, keyboard/touch adapters, explicit pause/retry and rendering scheduling. Rendering may be split into render.js; rules never move into rendering.
- dist/src/ranking-client.js and ranking.css: optional explicit public-record UI/HTTP adapter, owning only web-lab-ranking-identity-v1. No automatic network/submission; private blueprints and local bests are never sent.
- dist/index.html and styles.css: Korean semantic shell, HUD/menus, responsive/reduced-motion presentation.
- test/: Node model/rule tests and campaign witnesses; not a substitute for actual browser play.
- tools/: loopback-only preview and read-only public checks, never deployed.
- .github/workflows/pages.yml: pinned verify-before-publish, dist-only artifact, deploy-scoped permissions.

## Bounds and privacy

User-approved v2 persistence supersedes the initial memory-only release. storage.js alone reads/writes parcel-panic-save-v2 (131072 characters maximum): current contract, at most 15 layouts, sticky assistance provenance, and one independent best winning layout per non-tutorial contract. save-model.js validates bounded payloads and recomputes saved winning scores through the deterministic simulator; serialized scores and running states are not trusted. Autosave stores blueprints, never resumes the simulation clock. Clear removes this key only. Storage denial/quota/corruption leaves offline play available with explicit save status. No automatic deletion of unsupported versions.

progress.js alone reads/modifies web-lab-progress-v1, maximum 8192 characters, 15 explicitly allowlisted service IDs, completed 0..total<=1000 and actual ISO update timestamps. After a successful durable own-save write, aggregate completion is recomputed from independent achievements; tutorial, hints and visits never count. Clear removes only parcel-panic's summary. Malformed shared data fails closed rather than overwriting another service's records. This summary holds no identities, actions, layouts, seeds or files.

contracts.js adds a separate practice contract and two authored processing contracts without changing legacy 1–12 data. Ordered per-order recipes require actual timed processing; the final contract returns repair jobs to the same scanner. model.js remains pure; replay.js records/rebuilds edits, rotations, undo/redo, clear, start, tick, reset and assistance. General offline replay bounds: 2048 actions, eight starts, 180 ticks per run, 200000 serialized characters. Export contains actual inputs, no trusted outcome. Exceeding capture bounds disables export/achievement capture until a new attempt; offline simulation remains usable. Ranked selection starts contract 14 from its empty authored blueprint and cannot use assistance. New attempts and undo carry no wall-clock or attempt penalty. No network adapter, URL, rank list or backend is fabricated.

No cookies, service worker, personal account, analytics, external fonts/assets/scripts or audio autoplay. The optional public-record adapter connects only to https://web-lab-ranking.hyeongmin92.workers.dev after explicit user actions. CSP connect-src allows that exact origin only. Host-level logs remain outside this app. No dynamic code evaluation. Anonymous credential/version/playerId remain bounded device-local data; nickname and actual ranked actions are deliberately submitted to the service.

Use fixed bounded game ticks/turns and validated action enumerations. Undo/replay/history, entities, campaign choices and simulation work must have explicit finite ceilings recorded in decisions. Same scenario plus action sequence reproduces actual state. Page hide freezes scheduling and clears held input, returning does not silently resume. Reset cancels prior work. No synthetic delay or mocked victory represents real browser gameplay.

## Ranking integration

The exact integration surface is dist/src/ranked.js exporting RULES_VERSION, CHALLENGE_ID, rankingDefinition and replayRanked(actions). Ranked records are stricter than general offline replays: maximum 512 actions/48KiB UTF-8, one start, no reset or assist. Unlimited fresh attempts each clear construction and command history. Undo/redo are recorded and do not improve score. Return {won,score,tieBreak:[tick,cost,waits],summary}; lower tie-break values are better. app.js exports rankingAdapter.start/getActions/isComplete/getDefinition; ranking-client.js alone owns transport. Server stores only recomputed legal completion, never a client score/state/layout envelope. Human-only play and distinct human identity are not verified. The hot step's bounded-schema copy preserves rules; local timing is not public Worker evidence.

## Visual direction

Warm miniature industrial diorama: ivory concrete, teal machinery, orange freight, deep ink outlines, animated belt slats and moving parcels; composition like a real puzzle automation game, not a form-heavy lab.

Original code-native Canvas/SVG/CSS art rather than copied commercial assets. Desktop battlefield is dominant and starts visible; compact real game HUD and contextual controls. 320/390px must remain usable, with a scrollable board where necessary rather than tiny illegible controls. Keyboard paths, text state, focus visibility, non-color-only objective indicators, and reduced-motion support.

## Delivery and encoding

Node.js 22+, no install required. Existing pinned GitHub Pages pattern; owner is HyungminYoon1. User authorized publication after verification. Commit/push/remote creation are parent integration responsibilities after code/browser/privacy checks. UTF-8 without BOM, CRLF text; binary images are explicitly marked. No .env/credentials/private identity in public files.
