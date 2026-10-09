# Implementation handoff — 2026-10-09

## Scope and evidence

One agent edited only parcel-panic. Initial git status was clean. No subagents, account/provider access, commit, push or provisioning. Named repository: VERIFIED for architecture/requirements/README/decisions and relevant game, layout, rendering, storage, tests/checks/witness sources. api-spec.md: absent. The repo was inventoried; unchanged deployment/preview assets are not represented as a new browser or remote review.

LOCAL: npm test passes 42 tests, including all original 23 without altering their expectations. New legal witnesses preserve occupancy/ID counts and finish tutorial/13/14 at 15/83/142 ticks. The final witness uses 49 budget and scores 1457; replacing (3,4)'s buffer with a belt is a separately tested 47-cost/1487-score solution. No runtime solution imports or injected win fields.

NOT_RUN in this implementation: actual browser E2E/screenshots/physical mobile, remote CI/live, human challenge/fun judgment, Worker CPU. Main owns these checks.

## Integration contract

Changed existing paths: README.md, architecture.md, requirements.md, docs/decisions.md, docs/verification.md, dist/index.html, dist/styles.css, dist/src/app.js, dist/src/levels.js, dist/src/model.js, dist/src/render.js, tools/check.mjs.

Added paths: dist/src/contracts.js, dist/src/replay.js, dist/src/ranked.js, dist/src/save-model.js, dist/src/storage.js, dist/src/progress.js, test/advanced.test.js, test/storage.test.js, tools/advanced-witnesses.mjs, tools/benchmark-ranked.mjs, docs/implementation-handoff.md.

- dist/src/ranked.js exports RULES_VERSION=parcel-2, CHALLENGE_ID=rework-final-v2, rankingDefinition(), replayRanked(actions).
- Definition: game parcel-panic, levelId 14, title 재검수 최종 계약 · 24건 · 예산 49, maxActions 512.
- Commands: {type:"edit",command:{x,y,type,dir}}, {type:"rotate",x,y}, {type:"undo"}, {type:"redo"}, {type:"clear"}, {type:"start"}, {type:"tick"}. Coordinates are zero-based; directions 0 east, 1 south, 2 west, 3 north. Erase is an edit with command.type="erase". No direct layout/result snapshot accepted by replayRanked.
- Maximum 512 commands, UTF-8 JSON <=49152 bytes, one start. Unknown/invalid input fields, edit after start, extra tick after completion, reset, assist, overbudget start and wrong cells throw. A valid unfinished/failed run returns won:false and score 0.
- The model recomputes score; tieBreak=[tick,cost,waits], ascending. Final summary contains only delivered/total/tick/cost/waits.
- app.js exports rankingAdapter={start,getActions,isComplete,getDefinition}. start chooses contract 14 with empty layout and clears capture. getActions returns a detached copy or throws outside a valid ranked capture. No SDK is imported. #ranked is the ordinary opt-in button; body[data-mode="ranked"] identifies selection. Hint is disabled. Undo/redo are captured. ‘새 기록’ discards this attempt and begins a fresh empty one; number of fresh attempts is unlimited.
- ‘리플레이 저장’ downloads the general offline envelope {version,rulesVersion,levelId,mode,assisted,initialLayout,actions}; the future API must use rankingAdapter.getActions(), not trust that envelope or locally saved best scores. There are no network writes.
- node tools/benchmark-ranked.mjs: witness 169 actions / 3927 bytes. Warm local Node sample: median 4.68ms, p95 7.23ms, max 9.28ms over 50 replays after ten warmups. Cold/worst-case/provider timing must be measured separately; not a Worker acceptance claim.

## Actual screen capture through normal controls

1. Start npm run dev -- 0. Use the reported loopback URL. Existing save may choose a previous contract; ‘조작 → 기본 연습 시작’ always opens the small guided board.
2. Tutorial starts with cursor at 7열 4행 (x6,y3), direction →. Click ‘분류기’, then ‘설치’. No model injection is required. Click ‘가동’, then ‘정지’ around tick 8 to show one delivered R and the B moving toward its chute; use ‘한 박자’ for precise ticks. At tick 15 the actual result is 2/2, score 4670, labelled 연습, no completion badge.
3. For the new mechanics choose ‘계약 → 공정 14 → 최종 계약 기록 시작’. Place tools/rotate using the witness below through ordinary palette/board input. Click 한 박자 40–45 times for a meaningful return-loop/maintenance view; finish at 142 for the score breakdown. Never assign app/model state to manufacture the scene.
4. Canvas coordinates at intrinsic 1100×700: cx=550+(x−y)×39; cy=84+(x+y)×22. Convert using its current bounding rectangle; account for internal scroll. Clicking a machine's raised top can target a neighbor; click the tile center as above. On touch, a tap only selects; ‘설치’ applies. The keyboard/D-pad is the precise small-screen alternative.
5. Check 1440×1000, 390×900 and 320×900: ‘전체’ fit, + to 150/200/300%, touch pan both axes or ‘화면 이동’ mouse drag, return to 전체, cursor movement, tool selection, existing rotation, and visible 44px controls. Browser zoom remains enabled. The dock is directly below the board, before the manifest; it does not float over the board.
6. Save checks: alter a blueprint, reload, verify same current contract/layout and no auto-run. Win independent contract 13/14 and reload: best and completion survive. View a hint then reset/reload: 연습 persists. ‘기기 저장 → 저장 삭제’ confirms deletion, removes only this game; verify another app's valid aggregate entry remains. Quota/denied storage must show the save-status warning and leave simulation usable.
7. Ranked checks: ordinary #ranked resets to empty, disables #hint, records edits/rotation/undo/redo/start/ticks, enables adapter.isComplete only after real success. Pause/speed changes do not change score. Reload restores the draft as ordinary independent play, never automatically a ranked session. Re-enter ranked explicitly to begin empty.

## Final witness (zero-based x,y; direction E/S/W/N)

All entries are placements, no scores/state injection. Budget 49.

| Tool | Cells and directions |
| --- | --- |
| Belt | (1,3)E (2,1)S (2,2)S (4,5)W (3,5)N (8,3)E (9,3)E (7,4)S (7,5)S (7,6)S (7,7)E (8,7)E (9,7)E (7,2)N (7,1)E (8,1)E (9,1)E |
| Buffer | (2,3)E (3,3)E (5,4)S (3,4)N |
| Processor | (4,3)E (5,5)W (6,3)E |
| Process gate | (5,3)E |
| Color sorter | (7,3)E |

Full executable tutorial/13/14 fixtures: tools/advanced-witnesses.mjs. Existing tools/witnesses.mjs and test/model.test.js remain unchanged. Every new best/layout is private device-local convenience, not a public verified rank.
