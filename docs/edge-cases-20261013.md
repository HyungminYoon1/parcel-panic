# parcel-panic — systematic edge-case audit / 2026-10-13

새 LOCAL 감사이며 이전 유지보수/CI/공개 이력과 분리한다. 기준 HEAD `883c761574101cefaf23290a0afe3a4a343aed4d`, 최초 clean main 확인. Named echo-vault/neon-tactics/parcel-panic/light-route는 모두 변경 전에 inventory했다. 이 보고서는 parcel-panic 범위다. 다른서비스/gallery/rankingserver NOT_INSPECTED/NOT_MODIFIED.

## 실행 결과

- `npm test`: 53/53 PASS, fail/skipped0. 기존46+신규7. 신규6개는 unchanged-baseline PASS coverage additions이며 RED_GREEN 아님.
- `node --test test/edge.test.js`: BEFORE 6PASS/1FAIL; AFTER 7/7PASS.
- `npm run check` 및 `git diff --check` PASS. 편집 텍스트만 UTF-8 without BOM/CRLF 정규화.
- `node tools/edge-browser.mjs http://127.0.0.1:51099/`: actual isolated Chrome/loopback primary+negative flows PASS. 동일 `--probe-ime` command BEFORE FAIL→AFTER PASS.
- 기존 .github/workflows/pages.yml의 npm test가 신규 Node tests를 실행한다. Browser harness는 현 CI 미실행/manual. REMOTE_CI/LIVE NOT_RUN.
- 재실행: `npm run dev -- 0`의 출력 URL을 harness에 전달. 기존 ../output/playwright/implement-20261012/node_modules/playwright/index.mjs(Playwright1.61.1) 사용; 다른설치는 PLAYWRIGHT_MODULE로 absolute module file 지정. Chrome C:/Program Files/Google/Chrome/Application/chrome.exe, headless/muted/ephemeral context. 개인browser profile에 접근하지 않음.
- 완료 후 owns-only preview process만 종료하며 부모59540 integration server 유지. No commit/push/deploy/delegation.

## 신규 실행 테스트

E번호는 문서참조다. 모두 test/edge.test.js; `node --test test/edge.test.js` 또는 `npm test`로 실행.

| ID | 실제 test name | baseline → after |
| --- | --- | --- |
| E1 | `edge: edit coordinate and direction types reject without changing blueprint` | PASS→PASS(new coverage) |
| E2 | `edge: new edit after undo invalidates redo and keeps selected branch` | PASS→PASS(new coverage) |
| E3 | `edge: history ceiling drops oldest undo and bounds redo sequence` | PASS→PASS(new coverage) |
| E4 | `edge: exact action and start ceilings are legal; one beyond fails` | PASS→PASS(new coverage) |
| E5 | `edge: independent waiting oracle and terminal ticks preserve real deliveries` | PASS→PASS(new coverage) |
| E6 | `edge: corrupt oversized private loads preserve stored bytes` | PASS→PASS(new coverage) |
| E7 | `edge: private write must confirm readback before claiming durability` | FAIL→PASS(readback fix) |

## Feature / boundary matrix

다음 표시한 Node tests(`npm test`) 및 B=tools/edge-browser.mjs의 실제 check 범위만 VERIFIED/PASS다. 기존 tests의 file prefix는 test/의 해당 *.test.js. 새 case가 없는 경계는 existing으로 명시한다.

| Feature / boundary | 실제 test / command mapping | cases / result |
| --- | --- | --- |
| Command / layout / type | E1; model: edits are immutable and invalid machine/blocked/source/outside/prototype commands reject | VERIFIED/PASS: Coordinate/dir-1/fraction/type/nonfinite rejected blueprint unchanged; blocked/source/exit/unknowntype; overbudget starts rejected. |
| Undo / redo / new branch | E2/E3; advanced: actual rotations, erase, undo, redo and reset replay deterministically without snapshots | VERIFIED/PASS: New edit afterundo invalidates redo;81edit→80undo/redo allowed and81undo rejected. UIundo/redo identical blueprint. |
| Action / start bounds | E4; advanced: malformed actions, locked-run edits, invalid cells and payload/work bounds are rejected | VERIFIED/PASS: 2048/2049 general;512/513 ranked;8/9 starts; illegal run edits/unknown fields/version/size; fresh ranked assistance/reset forbidden. |
| Tick / terminal / independent oracle | E5; model: deadline is inclusive; one beat late cannot be counted as an on-time delivery; advanced: processing maintenance pauses work on both inclusive boundary ticks | VERIFIED/PASS: Independent sum of non-moved actual13 parcels verifies everywait;20 repeated terminalticks unchanged. Inclusive deadline/maintenance; existing142/49/552→1457 and lean47cost→1487. |
| Import / corrupt records | E6; advanced: save validates bounded shapes and rejects fake best wins while retaining overbudget editable drafts | VERIFIED/PASS: Bad JSON/version/id/prototype/layout,131072+1; forged score recomputed; editable overbudgetdraft retained; badraw/siblingkeys preserved. |
| Storage / isolation / quota | E7; storage: private storage is bounded; denial/corruption is recoverable and clear stays scoped; shared summary preserves other apps exactly and clear removes only parcel | VERIFIED/PASS: Null/stale/read-denied readback fails; browser quota permitsplacement; ownkeys clear; otherapp summary retained. |
| Processing / merge / campaign | advanced: return job revisits the same scanner; each full processing tick blocks departure; model: merge reserves snapshot capacity, urgent parcel wins final buffer slot and FIFO head departs first | VERIFIED/PASS: All15 modelcontracts preserve parcelIDs/recipes/deadlines; order/rework/unfinished/misroute/route/FIFO/backpressure; UI2/15 and12/83 actualoutcomes. |
| Cancel / reset / pause / export | B undo redo restores blueprint, cancel delete preserves design, pause freezes real scheduler; advanced replay roundtrip | VERIFIED/PASS: ActualP/Escape pause500ms; reset/step/restore blueprint. Export pure roundtrip existing; new browserdownload/Blobcleanup NOT_RUN. |
| Keyboard / IME / focus | B: IME composition must preserve private run; IME composition must preserve focus; --probe-ime | NEW RED_GREEN: isComposing/legacy229에서 state/focus 보존. 합성 KeyboardEvent fixture; real OS IME 후보창 NOT_RUN. 일반키보드 입력은 actual primary flow. |
| Desktop / mobile | B: document fits 1440/390/320 + width별 pad/keyboard/undo/cancel checks | VERIFIED 1440×1000/390×900/320×900 actual UI input·3screenshots 열어서 visual QA. Physical touch/다른browser/screen reader NOT_RUN. |
| Storage failure / corrupted reload | B: corrupt import retains raw; corrupt load does not delete sibling; quota is visible; gameplay continues | NEW fixture: malformed localStorage/Storage.setItem QuotaExceededError. 물리적으로quota를채운시험아님; oversize는Node. |
| Repeat / rapid / late | 위terminal/undo/capture cases | VERIFIED 표시한 연속·거절·종료·restart. New auto-repeat/rapid double-click/pointercancel/two-tab exhaustive race NOT_RUN. |
| Async failures / races | B: ranking failure enables retry (intercepted GET503) | Explicit 조회503/retry/일반플레이요청0. Late ticket/identity/races PARENT_OWNED/NOT_RUN HERE. |

## Failing test first / minimal fixes

1. Production 변경 전 `node --test test/edge.test.js` 실행. 실제 assertion: `unconfirmed private write must fail / true !== false`. setItem만으로durable성공을보고했다. storage.js에서 own private key 동일 raw readback만 추가. null/stale/throwingread는false, input/기록보존; NEONsharedprogress도미발행. SAME test PASS. Payload/rules/schema/retention unchanged. Readback은cross-tab transaction/disk durability 보증이 아니다.
2. 키보드 handler 변경 전 `node tools/edge-browser.mjs http://127.0.0.1:51099/ --probe-ime` 실행. 실제실패: `IME composition must preserve private run` (ECHO up기록이echo로되감김 / NEON end input추가 / PARCEL sorter dir0→1). app.js 첫줄isComposing/keyCode229 guard추가. SAME probe PASS; scoring/replay rules unchanged.

Ignored evidence: `output/playwright/edge-20261013/node-before.txt`, `ime-before.json`(실제실패), `ime-result.json`(같은probe PASS), `browser-result.json`(전체flow PASS). 테스트harness 초반 hidden-control timeout은 닫힌campaign/접힌details를열지않은 QA 준비오류; 실제 모달/summary click으로고쳤고 assertion을약화하지않았다. Production bug로집계안함.

## Actual browser flow / screenshots

분류기설치→undo/redo→삭제확인취소→P가동/Escape정지·500ms시계동결→15박자2건출고→설계복원. 계약13 실제 도구/방향/화살표/Space설치 후83회step/12건출고. 캡처는 이후reset/pad, 설계비26·최고3484·0박자·503순위실패.

Negativeflows: 삭제/목표취소 또는한도실패 + corruptreload + quota injection. NEON/PARCEL의503은endpoint interception이며 실제server장애증거아님. 게임state/score/victory injection없음. Witness/plan을 Node에서읽고 실제UI 입력을안내한다.
Reusable QA: 부모 output/playwright의 기존 parcel-qa.mjs/light-qa.mjs를읽고현재 선택자/조작으로 반복가능harness작성. Captures `output/playwright/edge-20261013/view-1440.png`, `view-390.png`, `view-320.png`.
Visible UI change: 정상 layout/CSS변경없음. 새preview refresh 불필요; failure-input QA증거는위capture와명령으로재현.

## Source inventory / review coverage

- Named parcel-panic repo PARTIAL: 전체path inventory 후 task-related파일선택. Inventory를full-file review로주장하지않음.
- VERIFIED authoritative: architecture.md > requirements.md > README.md(api-spec없음); docs/decisions.md, package.json, .gitattributes, .gitignore, .github/workflows/pages.yml. Repo AGENTS없음; 사용자AGENTS준수.
- VERIFIED relevant source/tests/tools: model.js, replay.js, ranked.js, save-model.js, storage.js, progress.js, app.js, contracts.js, instructions.js; all test/*.test.js; tools/advanced-witnesses.mjs, check.mjs, serve.mjs.
- PARTIAL auxiliary/history: levels.js의 대규모legacy data는 일부출력/registry 선택검토. legacy witnesses.mjs/render.js/전체CSS/index.html은 전수독서 제외; golden-deliveries/browser/public gate로 관련실행검사. ranking-client.js 전체재심사는 부모소유 복사본으로 제외. docs/verification.md는latest 관련내용/통합지침 selected review;이전LIVE이력전수재검사안함.
- NOT_INSPECTED: .gitobjects/node_modules전수/credentials/.env(열지않음)/unrelatedrepos/gallery/rankingserver. Task/secret범위와unchanged auxiliary files라서선택제외.
- Root existing Playwright package.json 존재/version확인. 새runtime dependency없음. 아래 tracked baseline inventory;ignored QA/node_modules제외.

```text
dist/src/app.js
dist/src/storage.js
.gitattributes
.github/workflows/pages.yml
.gitignore
README.md
architecture.md
dist/favicon.svg
dist/guidance.css
dist/index.html
dist/ranking.css
dist/src/app.js
dist/src/contracts.js
dist/src/instructions.js
dist/src/levels.js
dist/src/model.js
dist/src/progress.js
dist/src/ranked.js
dist/src/ranking-client.js
dist/src/render.js
dist/src/replay.js
dist/src/save-model.js
dist/src/storage.js
dist/styles.css
docs/decisions.md
docs/implementation-handoff.md
docs/provenance.md
docs/verification.md
package.json
requirements.md
test/advanced.test.js
test/instructions.test.js
test/model.test.js
test/storage.test.js
tools/advanced-witnesses.mjs
tools/benchmark-ranked.mjs
tools/check.mjs
tools/serve.mjs
tools/witnesses.mjs
```

## Parent integration — shared ranking client

부모 통합에서 web-lab-ranking/client/ranking-client.js를 동일 bytes로 반영했다. 아래의 NOT_RUN HERE/copy unchanged는 보조 담당 반환 시점 기록이며 이번 부모 통합과 구분한다. identity 저장 readback·storage.clear·늦은 start/delete·잘못된 board/runId/deleted 응답 회귀는 서버 repo의 test/client-edges.test.js 11개로 검증했다. timeout/double click/cancel 경계도 포함되며 DOM/storage/fetch/clock doubles를 사용했다.

실제 Chrome에서 NEON16/4280·PARCEL14/1457 합법 조작과 로컬 workerd의 점수 재검증/등록/조회/삭제16검사 PASS. 이 게임의 API 실패/복구6시나리오는 response fixture다. 공개 POST/DELETE0이며 운영 쓰기/부하를 검증했다는 뜻이 아니다. 고정 규칙8파일/manifest와 client3 copies equality를 별도 검사한다. 상세 서버 한계와 배포 증거는 [전체 감사](https://github.com/HyungminYoon1/web-lab/blob/main/docs/edge-cases-20261013.md) 및 [서버 감사](https://github.com/HyungminYoon1/web-lab-ranking/blob/main/docs/edge-cases-20261013.md)에 기록한다. 로컬413 후속 연결 오류 PARTIAL/미해결도 유지한다.

## Remaining untested / N/A / integration

PARENT notification: 이전D12가 server-frozen replay.js를 변경했다. 서버copy/manifest/hash/서버시험은 부모통합 필요. 이번감사의 model/replay/ranked/levels/contracts/ranking-client diff는0. Transport races/identitystorage PARENT_OWNED/NOT_RUN HERE; intercepted GET503 only/productionwrites0. File upload import N/A(export-only UI/localcodec).

모든seed/캠페인을 개별browser완료한것아님. 모델witnesses는저작계약/표본의실행검증이다. RealOSIME/physicaldevices/allviewport+zoom+device/screenreaders/multi-tabwrite+clear/realbrowser eviction/allasyncinterleavings/WorkerCPU/humanfun+difficulty/remoteCI/LIVE/deploy NOT_RUN. Scoped-key isolation은same-origin browser security isolation증명이아님.
Changed files: dist/src/app.js, dist/src/storage.js, new test/edge.test.js, new tools/edge-browser.mjs, new docs/edge-cases-20261013.md, docs/verification.md(newtop), docs/decisions.md(D13). 기존 legitimate tests/user records/rules/versions/maps/retention/storage schema 보존. Parent integrates/releases.
