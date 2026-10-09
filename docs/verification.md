# Verification record

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
