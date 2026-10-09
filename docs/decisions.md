# Decisions

## D11 — 목표·실제 상태 기반 기본 안내와 선택/설치 분리 / 2026-10-10

- Context: 사용자가 게임의 목적·조작을 이해하기 어렵다고 하여 친절한 설명과 자연스러운 조작을 요청했습니다.
- Options: 모달 설명만 늘리기; 규칙·지도 단순화; 실제 상태를 읽는 안내와 입력 모드 분리.
- Decision: 실제 주문 수·문자·예산에서 목표를 안내합니다. 기본 연습은 현재 도구/방향/선택 칸/실제 분류기/운행 결과에 맞춰 설명하고 해당 연습 칸만 강조합니다. 마우스 기본도 칸 선택 후 설치이며 연속 설치는 명시적 별도 모드입니다. 화면 대각선 방향과 일치하는 네 버튼을 추가합니다. 실제 실패 종류별 복구 조언을 결과에 덧붙입니다.
- Rationale: 선택만 하려다 설비를 바꾸는 혼동을 줄이고, 화물을 직접 움직이는 게임이 아니라 길을 설계하는 퍼즐임을 먼저 설명합니다. 보드의 방향과 조작 버튼을 일치시킵니다.
- Affected: dist/index.html, guidance.css, src/instructions.js, app.js, render.js, test/instructions.test.js, architecture.md, README.md.
- Review: 최종 계약의 지도·주문·공정·마감·점수·리플레이·랭킹 규칙은 수정하지 않습니다. 안내로 자동 정답/완료를 주입하지 않으며 기본 연습은 원래처럼 독립 완료에서 제외합니다. 선호 모드·방문 이력은 저장하지 않습니다. 브라우저의 실제 기본 연습/키보드/터치/복원/랭킹 실패 UI를 검증 기록에 구분합니다.

## D10 — Dismiss completed result without resetting the run

- Context: actual 320/390px browser testing found the fixed completion panel blocking public-record controls.
- Options: reset the completed run; remove the result panel; provide a separate close action.
- Decision: add a keyboard-accessible result-close button. Closing only hides the panel and focuses the board; score, completed state and captured actions remain unchanged. A new attempt resets dismissal.
- Rationale: completion should not prevent opt-in registration or deleting an existing public record on small screens.
- Affected: dist/index.html, dist/src/app.js.
- Review: replay the legal final solution, close at mobile widths, submit and delete the actual test record; no result/score injection.

## D09 — Explicit free public ranking integration (supersedes no-network clauses)

- Context: user approved a free ranking server, then restricted it to extremely hard, equal-condition games. This app's fixed final challenge is selected; no other levels submit.
- Options: publish client scores; database-only browser access; bounded server replay in a separate API.
- Decision: opt-in start/submit/view/delete UI in ranking-client.js; exact Cloudflare Worker origin in CSP; anonymous 256-bit bearer credential in web-lab-ranking-identity-v1. Reuse fixed ranked rules and action limits. Only verified bests are public; ties do not depend on arrival time or device speed. Final rules require a version bump if changed. Ordinary play remains offline; loading a page makes no ranking request. API stores nickname, opaque identity and private verification commands, expires after 180 inactive days, and deletes the identity's records in both ranked games on authenticated request. Cloudflare Workers Free plus SQLite Durable Object, bounded fail-closed quotas, no paid upgrade or other provider resource.
- Rationale: same authored opportunity and deterministic scoring; no invented ranks or direct database credentials in Pages. This does not prove human-only play, distinct humans or measured human difficulty.
- Affected: dist/src/ranking-client.js, dist/ranking.css, dist/index.html, app.js, tools/check.mjs, architecture/requirements/README; separate web-lab-ranking service.
- Review: main tests actual UI opt-in, legal input capture, server submission/query/delete, denied requests, reload, mobile layout, live API and published rules consistency. No automatic posting, real names, emails, analytics or IP storage.

## D05 — Approved bounded save and gallery summary (supersedes D02 storage restriction)

- Context: user explicitly approved local layout/current/completion/best persistence and a minimal shared gallery completion contract.
- Options: memory only; opaque running-state save; validated authored-layout save with independently completed best layouts.
- Decision: version 2 / parcel-2, one own key, 131072-character ceiling, 15 known contracts, one layout and one independently won best layout each. Restore validates shape and recomputes best scores, starts paused in blueprint mode, retains assistance through reset/restore. A fresh independent attempt starts from the authored starter. Clear removes own private key and only own shared summary; no origin-wide clear. Shared 8192-character JSON admits exactly the 15 known repo IDs and minimal count/total/current ISO time. Write the aggregate only after durable own save succeeds; malformed/denied storage fails safely.
- Rationale: bounded local convenience, meaningful actual-completion badges, and separation from other apps' private payloads. Local records are device-editable, not authoritative public ranking proof.
- Affected: storage.js, save-model.js, progress.js, app.js, index.html, tests, architecture.md, check.mjs.
- Review: main checks reload/clear/denied-storage UI; no account or provider access authorized here.

## D06 — Ordered processing, physical rework and replay candidate

- Context: new challenge must add real mechanics while retaining the old campaign and allow eventual fair fixed-condition ranking.
- Options: rotated layouts/tighter deadlines only; timed ordered stations with return traffic sharing the original scanner.
- Decision: preserve all legacy 1–12 data. Add tutorial 0, scan→pack contract 13 and scan→repair→scan→pack return contract 14. Processing occupies its tile for the listed full ticks and uses the usual backpressure/maintenance rules. Gate turns right only when the next required operation is repair; otherwise straight. Incomplete recipes cannot ship. Fixed final map, 24 orders, 49 budget, 180 maximum ticks; no randomness. Point deductions remain turns×12, actual equipment×15 and actual parcel waiting×2. Processing dwell counts as waiting. All recipes/stations/orders/deadlines are inspectable before play.
- Rationale: return loops compete with incoming traffic, so buffer sizing and merge scheduling affect actual solvability. Tests use legal placement witnesses and failure mutations; human difficulty/fun remains unmeasured.
- Affected: contracts.js, levels.js registry, model.js, render.js, app.js, advanced witnesses/tests.
- Review: main owns browser play and difficulty review. Version rules/maps if future ranked conditions change.

## D07 — Offline replay and explicit ranked selection

- Context: main will provide the verified common API; no invented URL or backend state is allowed.
- Options: trust an uploaded score/layout; replay validated bounded actions from fixed authored start.
- Decision: pure replay/export and verifyRankedReplay; client captures actual edits/rotations/undo/redo/clear/start/tick/reset/assist. Max 2048 actions, eight starts, 200000 characters. Final challenge ranked mode starts empty; hints/tutorial/restored designs cannot enter that attempt. Undo and retries are allowed uniformly; score uses only the final deterministic run, never device speed or elapsed human time. Capture exhaustion does not truncate into a valid ranked record. Restart is explicit. Ranked output is an offline candidate, not a public submission.
- Rationale: main can replay inputs server-side once the API exists; local claims and replay eligibility are not server verification or anti-cheat proof.
- Affected: replay.js, app.js, tests, architecture.md.
- Review: main integrates server contract later; this implementation performs no network writes and keeps connect-src none.

## D08 — Exact main ranking interface and bounded CPU work

- Context: main supplied ranked.js and app rankingAdapter contracts with a 48KiB request ceiling and Worker Free 10ms target.
- Options: unrestricted multi-run export; one ranked run from authored empty layout, with separate general offline exports.
- Decision: ranked.js exports RULES_VERSION parcel-2, CHALLENGE_ID rework-final-v2, rankingDefinition and replayRanked(actions). Ranked cap 512 actions/48KiB UTF-8/one start; reject reset/assist/unknown fields/client score. Undo/redo remain actual commands. Fresh attempts are unlimited and restart construction. app.js exports the four-method rankingAdapter, and body[data-mode=ranked] plus #ranked exposes normal UI selection. No missing SDK imports. General offline replay retains D07 limits. Deterministic outcome and [tick,cost,waits] ascending tiebreaks are recomputed from actual simulation.
- Rationale: bounded verification workload and device-independent comparisons. Replace generic per-tick deep clone with direct bounded-schema copies without changing mechanics; existing and new golden deliveries remain exact. Warm local Node witness median about 4.7ms/p95 about 7.2ms is NOT Worker CPU proof.
- Affected: ranked.js, replay.js, model.js, app.js, tests, benchmark-ranked.mjs, architecture/README.
- Review: main benchmarks cold/warm/worst-case runtime in the selected free provider before enabling opt-in submission. No public ranking is claimed.

## D03 — Original finite campaign details

- Context: 높은 난도와 실제 실패/성공이 있는 게임이며 무작위 데이터가 불가능한 문제를 만들면 안 됩니다.
- Options: 검증되지 않은 무작위 배치; 무한 시간/처리; 유한한 저작 캠페인과 실제 해답 검증.
- Decision: 격자 11×9 또는 9×11, 주문 최대 29, 계약당 180박자, 설계 취소/복구 최대 80 상태. 기준 재생 420ms/박자, 1/2/4× 속도, 프레임당 최대 3박자. 설비당 출발 1개, 버퍼 점유 3개. 박자 시작 점유로 도착 가능 공간을 계산합니다. 같은 박자에 비워질 칸은 아직 빈 칸으로 보지 않습니다. 합류 경쟁은 급행 우선이며 버퍼 내부에서는 도착 순의 앞 화물만 출발합니다. 이동 후 투입구가 비었으면 예정 FIFO 주문 1개를 넣습니다. 정비 시작/끝은 포함하며 기다리는 주문에도 전역 마감이 적용됩니다. 마감 박자까지 도착은 유효하고 다음 박자는 출고 전에 실패 처리합니다.
- Rationale: 시간과 자원 제약이 실질적으로 작동하면서 같은 문제/행동으로 재현할 수 있습니다. 규칙과 UI를 분리하고 모든 저작 캠페인의 해답을 실제 모델로 실행합니다.
- Affected: dist/src/model.js, levels.js, app.js, test/model.test.js, tools/witnesses.mjs.
- Review: 23 model tests: 모든 계약의 실제 출고 ID/시간/비용/점유 보존, 오출고/벽 방향/마감/정체/예산/입력/재현, 급행 마지막 버퍼 슬롯·FIFO와 정비 양 끝 경계. 난도 명칭과 모델 해답은 사람의 재미/난도 측정을 대신하지 않습니다.

## D04 — 읽을 수 있는 미리보기와 조작/복구

- Context: 어려운 퍼즐의 실패 원인을 읽고 같은 조건으로 다시 시도할 수 있어야 합니다.
- Options: 즉시 실패와 입력 재시도만 제공; 화면만 그린 가상 결과; 실제 상태 예고와 제한된 취소/리셋.
- Decision: 팔레트와 방향을 고른 뒤 칸 클릭/드래그. 방향키 선택 칸, Space 설치, R 방향 회전, Delete 철거, Z/Y 취소/복구, P 가동/정지. 운행 리셋 후 설비를 수정합니다. 점수는 성공 점수 = max(0, 5000 − 출고 완료 박자×12 − 설비 비용×15 − 누적 화물 대기×2). 실측 대기와 비용을 쓰며 운행 중 설비는 수정할 수 없습니다. 작은 화면은 내부 보드 스크롤로 판독 크기를 유지하고 결과는 화면 안에 표시합니다. 페이지 숨김/초점 이동 시 시간 예약 또는 효과 프레임을 취소하며 자동 재개하지 않습니다.
- Rationale: 사용자가 결과를 추적할 수 있고 재생 속도/렌더링은 규칙과 점수를 바꾸지 않습니다.
- Affected: dist/index.html, styles.css, app.js, render.js, README.md.
- Review: 1/7/12의 일반 팔레트·회전·Canvas 클릭으로 기준 설비를 배치한 뒤 실제 박자 버튼으로 12/24/29개 전체 주문을 69/69/79박자에 출고했습니다. 설비 취소/복구, 실제 시계 가동·정지와 동일 설비 리셋을 확인했습니다. 실제 모바일 하드웨어와 사람의 체감 평가는 미검증입니다.

## D01 — 독립 정적 게임과 검증 후 공개

- Context: 사용자가 제안한 세 게임의 구현, 높은 난도/재미/실제 게임 디자인과 검증 후 바로 공개를 승인했습니다.
- Options: 기존 서비스에 병합; 서버/프레임워크 도입; 독립 browser-only 정적 저장소.
- Decision: 이 게임만 독립 저장소에서 구현하고 기존 Node22/pinned Pages 패턴으로 dist만 공개합니다. 규칙/시나리오/UI/렌더링을 분리하며 원격 생성/커밋/배포는 부모 작업에서 검증 후 수행합니다.
- Rationale: 기존 릴리스와 개인정보 경계를 보존하고 설치·유료 서버 없이 실제 게임을 실행합니다.
- Affected: architecture.md, requirements.md, dist, test, tools, .github/workflows.
- Review: 게임 모델/캠페인 해답, 실제 브라우저 조작, 공개 파일/CI를 독립적으로 확인합니다.

## D02 — 페이지 메모리와 원본 코드 기반 아트

- Context: 방문자 정보가 필요하지 않은 단일 플레이 게임이며 사용자가 개인적인 공개를 원하지 않습니다.
- Options: 계정/영구 점수/외부 자산; 현재 세션 상태와 직접 그린 SVG/Canvas/CSS.
- Decision: 계정·쿠키·방문자 영구 저장·전체 순위·분석·API를 넣지 않고 원본 코드 기반 아트와 현재 세션 상태만 사용합니다. 호스팅 로그는 앱 처리와 별개입니다.
- Rationale: 추가 개인정보/비용/라이선스 경계를 도입하지 않습니다.
- Affected: dist/src/app.js, rendering, CSP, README.md.
- Review: 영구 저장/오디오/서버를 도입하려면 별도 결정과 승인이 필요합니다. 게임의 유한 처리/반복/되돌리기 상한은 구현 후 추가 기록합니다.
