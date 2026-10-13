# Verification record

## 2026-10-13 — 회전 입력·투입 대기·병목 과제 / LOCAL

- UI 변경: YES. 투입구별 실제 미투입 주문 수와 기본 연습/계약13 비교 과제 추가. 점수의 화물 대기와 구분한다. 문서의 정수 좌표 계약에 맞춰 rotate의 문자열·배열·boolean 입력 거절.
- BUG BEFORE: node --test --test-name-pattern 'ranked rotation' test/advanced.test.js에서 Missing expected exception(TypeError) 실패. 수정 후 정상 정수 회전은 수락하고 비정수4종을 거절한다.
- LOCAL: npm test 46/46 PASS, fail/skipped0 (797.1453ms), 기존45개 유지 + 좌표 회귀1개. 12개 기존 출고 증거와 공정0/13/14, 순차 검수·재검수·점수1457/1487·마감/FIFO/정비/불법 리플레이/저장/요약 시험 포함. npm run check PASS(17 public files), git diff --check PASS.
- BROWSER: 격리 Playwright 세션, loopback, 1440×1000/390×900/320×900. 실제 도구/방향/키보드/설치로 계약13 비용26 설계→undo25/redo26→새로고침 설계26 복원→83박자12/12 출고3484점. 운행 중 편집 잠금. 390px 기본 연습의 잘못된 분류기 방향으로9박자 오출고→설계 수정→15박자2/2 출고4670점. 320px 실제 가동/정지 후600ms 동안 시계 동결. 관측한 document overflow/pageerror/원격 요청0.
- 캡처: ignored output/qa-20261013/desktop.png(계약13 42박자·새 대기/과제), mobile-390.png(오출고와 수정 설명), mobile-320.png(기본 연습 정지·새 과제). 실제 이미지를 열어 배치를 확인했다.
- 선택자: #source-queues, .practice-notes summary, [data-practice-level], [data-tool], [data-direction], #place, #step, #edit, #reset.
- 통합 필요: replay.js는 서버와 공유하는 frozen 파일이다. 메인에서 서버 복사본과 manifest/hash를 갱신한 뒤 서버 계약 시험을 실행해야 한다. parcel-2/rework-final-v2와 정상 정수 리플레이·점수 계약은 유지. 이 작업은 서버/갤러리를 편집하지 않았다.
- 최종 CRLF replay.js SHA256: 1237075CB661C1576431C8CFBA869F02C56CE1B25769E62C2D71C0896FFB8B2B. levels.js/contracts.js/model.js/ranked.js는 HEAD와 byte 변경 없음. NEON의 levels/model/replay/ranked도 변경 없음.
- 변경 파일: dist/index.html/styles.css, dist/src/app.js/replay.js, test/advanced.test.js, README.md, docs/decisions.md/verification.md/provenance.md.
- 소스 범위: 저장소 PARTIAL(전체 목록 후 관련 선택). architecture/requirements/README/decisions/implementation-handoff VERIFIED; api-spec/AGENTS 없음. 변경 파일·모델/공정/리플레이/안내/검증 fixture 검토. 변경 없는 아트·배포 workflow·전체 CSS의 새 전수 심사는 제외.
- NOT_RUN: 물리 터치·다른 브라우저·보조기술, 모든 계약의 개별 브라우저 완주, 새로운 저장 거부 UI·Worker CPU/서버 실제 API, 사람의 난도 평가, 원격 CI/LIVE. 실제 공개 점수 제출/커밋/푸시/배포/갤러리 편집/다른 에이전트0. 설명 근거: provenance.md.

## 2026-10-10 목적·방향·기본 연습·선택/설치 — LOCAL

- SOURCE VERIFIED: architecture/requirements/README/decisions, 계약/모델/렌더/앱/랭킹 adapter/client·테스트를 검토했습니다. 게임 목적·설비 역할·비용·한 박자/FIFO/마감, 실제 상태별 기본 연습 4단계와 실패 원인별 안내를 추가했습니다. 모델/계약/점수/공개 challenge 규칙과 replay는 변경하지 않았습니다. D11에 UI-only 경계를 기록했습니다.
- LOCAL: 45/45 tests PASS, 17 public files 정적 검사 PASS, git diff --check PASS. 이전 42개를 유지하고 실제 기본 계약 15박자 성공/목표·방향/실패 안내의 순수 presentation 테스트를 추가했습니다. 서버 manifest와 두 앱의 frozen rule 8files SHA256가 모두 일치합니다.
- ACTUAL BROWSER: 조작 안내, 기본 칸 선택의 설비 무변경, 분류기 설치 비용10·undo6/redo10, 실제 화물2개 15박자 정상 출고를 확인했습니다. 설계 reload 복구·명시적 연속 설치·오회전의 실제 9박자 오출고와 원인별 수정 안내도 확인했습니다. 기본 연습 이동과 일반 플레이만으로 공개 랭킹 요청이 발생하지 않았습니다. desktop1440/mobile390/320 root overflow와 관측된 page errors 0. 새 JPEG는 실제 연습9박자 실행 화면입니다.
- RANKING FAILURE FIXTURES: 동일한 실제 client를 두 앱의 로컬 페이지에서 실행했습니다. network abort/503/service paused/daily limit/storage limit/rules update, Parcel의 실제 12초 timeout에서 상태 안내·재시도 재활성화·개인 게임 상태 유지 PASS. 정상 빈 목록 fixture로 복귀했고 ticket 없이는 제출하지 않았습니다. 15개 intercepted GET만 사용; 실제 공개 데이터 쓰기/사용자 등록/점수 등록 0. 이 실험은 실제 서버 장애나 새 LIVE score-write 증거가 아닙니다.
- NOT_RUN: 물리 터치/모든 기기·브라우저, 독립 재미/난이도 평가는 하지 않았습니다. 이번 변경의 REMOTE_CI/LIVE는 별도 확인합니다. 최종 계약14만 기존 opt-in 공개 기록 대상이며 설명은 조작/실패 안내이지 정답 자동 배치가 아닙니다. QA는 ignored output/playwright/2026-10-10-improvements에 있습니다.

## 2026-10-09 — current improvements and optional public records

- LOCAL: 42 Node tests and source checks PASS. Practice saves/independent records and versioned final replay are separate from the public API.
- LOCAL_BROWSER: fixed contract 14 constructed with actual palette, rotation, arrows and placement; 24 shipments completed at tick 142, score 1457. Explicit public challenge/registration/query/delete against local workerd SQLite PASS. At 320px the completion panel could block registration; result-close now hides only the panel and the completed replay remains registrable. Actual mobile registration and deletion checked. No fabricated score or injected game state.
- LIVE_API: real Worker SQLite accepted legal 1457; query/retry/delete and invalid fields/unfinished commands/CORS rejection PASS. QA identity and scores removed. The API's current deployment evidence is in web-lab-ranking/docs/verification.md.
- PREVIEW: new actual 1440×1000 play frame copied into WEB LAB. Source and static Pages publication are checked separately by the main integration record.
- NOT_RUN: independent human difficulty/fun calibration, physical phones and human-only/unique-person verification. See [main integration record](https://github.com/HyungminYoon1/web-lab/blob/main/docs/verification.md) for current remote CI/Pages evidence; earlier snapshots below remain historical.

## 2026-10-09 — v2 implementation, local only

- LOCAL_TEST: 42/42 PASS. Original 23 tests and all 12 exact delivery fixtures retained unchanged. New tests cover three legal witnesses, processing/rework, actual negative routes/capacity/deadlines, strict ranked command replay, score breakdown, bounded local saves and isolated shared progress.
- LOCAL_CHECK: PASS, 13 public files; syntax/import/assets/network/privacy/storage boundary/pure model/CSP/UTF8-no-BOM/CRLF gate. D05 adds only storage.js and progress.js exceptions for approved device-local keys; network/cookie/eval bans remain, with WebSocket/EventSource/sendBeacon bans added. This is not silent relaxation of the original persistence rule.
- LOCAL_MODEL: tutorial 2/2 at tick 15; contract 13 12/12 at tick 83; contract 14 24/24 at tick 142, cost 49, waits 552, score 1457. A legal cost-47 variant scores 1487. Replacing the merge buffer fails an actual deadline; skipping required processing fails unfinished delivery.
- LOCAL_BENCHMARK: normal final witness 169 commands/3927 bytes. Warm Node sample p50 4.68ms, p95 7.23ms, maximum 9.28ms over 50 replays, ten warmups. Single local sample, not a guarantee and not Worker CPU/cold/worst-case evidence.
- BROWSER_E2E / SCREENSHOTS / REMOTE_CI / LIVE / PROVIDER_CPU: NOT_RUN for this change, assigned to main. Older evidence below is historical, not current-version proof.
- Main's normal-input walkthrough, exact placement witness, mobile/save checks and adapter contract: implementation-handoff.md.

## 2026-10-09 — LOCAL implementation acceptance (pre-publication snapshot)

- LOCAL_TEST: PASS. 23 model tests: 모든 계약의 실제 출고 ID/시간/비용/점유 보존, 오출고/벽 방향/마감/정체/예산/입력/재현, 급행 마지막 버퍼 슬롯·FIFO와 정비 양 끝 경계.
- BROWSER_LOCAL: PASS for selected flows. 1/7/12의 일반 팔레트·회전·Canvas 클릭으로 기준 설비를 배치한 뒤 실제 박자 버튼으로 12/24/29개 전체 주문을 69/69/79박자에 출고했습니다. 설비 취소/복구, 실제 시계 가동·정지와 동일 설비 리셋을 확인했습니다.
- Viewports: desktop 1440×1000; 390×900 and 320×900 responsive controls/menus/no document overflow. Scroll is internal to the board; no tiny-board substitute.
- Main gameplay used ordinary UI/keyboard/palette/Canvas actions, not injected game state, a mocked win or a changed model clock. Model witnesses are offline tools, not imported by the public game.
- Public file checker: PASS. 7 public files; syntax/import/assets/privacy/pure-rule/CSP/UTF8-without-BOM/CRLF gate. Local screenshots are not proof of current public deployment.
- REMOTE_CI: NOT_RUN at this pre-publication snapshot.
- LIVE: NOT_RUN at this pre-publication snapshot.
- Subsequent remote CI, commit and actual public file verification: [WEB LAB latest deployment record](https://github.com/HyungminYoon1/web-lab/blob/main/docs/verification.md).

## Inspection scope

Follow-up local QA: 320px에서 실제 1번 캠페인 성공과 결과 카드 전체의 화면 내 표시를 확인했습니다. 금고/물류의 이 headless 환경은 탭 전환에도 document.hidden=false였으므로 실제 visibility 전환은 NOT_OBSERVED이며, 합성 blur event에 의한 핸들러 중단·포커스 복귀 후 자동 재개 없음만 따로 확인했습니다.

VERIFIED: this repository's architecture/requirements/README/decisions, all implemented rules/campaign/UI/rendering, test cases, witness tooling, dist assets, local preview/check tools and Pages workflow.
PARTIAL: actual browser walkthroughs selected 1/7/12; the remaining campaign levels were validated by executable model witnesses, not all individually completed in the browser.
NOT_RUN: physical mobile device, every browser/platform, independent human difficulty/fun calibration and global ranking/backend (not implemented).

## Bounds and distinct evidence

격자 11×9 또는 9×11, 주문 최대 29, 계약당 180박자, 설계 취소/복구 최대 80 상태. 기준 재생 420ms/박자, 1/2/4× 속도, 프레임당 최대 3박자. 설비당 출발 1개, 버퍼 점유 3개.

Model preview equivalence tests share the actual command function; independent boundary fixtures separately assert collision, ordering, timing, occupancy or failure expectations. Synthetic rule fixtures are not labelled browser gameplay or public results. No secret or environment values are printed.
