# 2026-10-13 학습 과제의 근거

방향 비교와 계약13의 버퍼 실험은 기존 공장 모델을 관찰하는 원문 과제다. 버퍼 교체 실험은 실패를 허용하는 비교 과제이며 모든 교체가 성공한다고 설명하지 않는다.

- 규칙의 1차 근거: [모델](../dist/src/model.js)의 capacity/heads/step/report, [공정 계약](../dist/src/contracts.js)의 processing.
- 실행 근거: [13번 합법 설비](../tools/advanced-witnesses.mjs), [출고·공정 검증](../test/advanced.test.js), [FIFO·마감·정비 검증](../test/model.test.js).
- 비용 3인 버퍼를 비용 1인 벨트로 바꾸면 비용 2 감소. 버퍼 용량3/출발1, 점유 스냅샷, 검수2/포장3, 실제 투입 대기 계산을 소스와 대조했다. 최종 랭킹의 해답 설비를 화면에 제공하지 않았다.
