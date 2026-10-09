export const VISUAL_DIRECTIONS=['↘','↙','↖','↗'];
export const DIRECTION_NAMES=['다음 열 쪽','다음 행 쪽','이전 열 쪽','이전 행 쪽'];
export function objective(level){
  const letters=[...new Set(level.orders.map(o=>o.color))].join('·'),process=level.stations?.length?' 필요한 검수·수선·포장을 먼저 끝내야 합니다.':'';
  return `투입구에서 나오는 ${level.orders.length}개 화물을 각각 같은 문자(${letters})의 출고구까지 마감 안에 보내세요. 설비 비용은 ${level.budget} 이내입니다.${process}`;
}
export function tutorialStep(layout,state,tool,dir,cursor){
  if(state?.status==='won')return {index:4,title:'두 화물을 모두 출고했습니다',copy:'R은 분류기의 앞쪽, B는 오른쪽 출구로 갈라집니다. 이제 계약 1에서 직접 길을 설계해보세요.'};
  if(state?.status==='failed')return {index:3,title:'설계 수정 후 다시 확인',copy:'설계 수정을 눌러 가동을 멈추고, 7열 4행의 분류기와 화살표 방향을 확인하세요.'};
  if(state)return {index:3,title:'화물을 따라가세요',copy:'한 박자는 모든 화물이 한 번 움직일 기회입니다. 한 박자 버튼으로 R·B가 갈라지는 순간을 확인하거나 ▶ 가동으로 이어서 재생하세요.'};
  const machine=layout['6,3'];
  if(machine?.type==='sorter'&&machine.dir===0)return {index:2,title:'이제 ▶ 가동을 누르세요',copy:'분류기가 올바른 칸과 방향에 놓였습니다. R은 ↘ 방향으로 직진하고, B는 그 방향에서 오른쪽인 ↙ 쪽으로 돌아 나갑니다.'};
  if(tool!=='sorter')return {index:1,title:'1. 분류기를 고르세요',copy:'아래 설비 목록에서 분류기를 누르세요. 이 연습에는 벨트가 이미 깔려 있고, 갈림길 한 칸만 비어 있습니다.'};
  if(dir!==0)return {index:1,title:'2. 방향 ↘을 고르세요',copy:'방향 버튼의 ↘은 다음 열 쪽입니다. 보드를 비스듬히 그렸으므로 화면에서는 대각선으로 보입니다.'};
  if(cursor.x!==6||cursor.y!==3)return {index:1,title:'3. 7열 4행의 빈 칸을 선택하세요',copy:'보드의 점선 칸을 누르거나 방향키·아래 이동 버튼으로 고르세요. 열과 행은 1부터 셉니다.'};
  return {index:1,title:'4. 설치를 누르세요',copy:'선택 칸은 7열 4행입니다. 설치 버튼(또는 Space)으로 분류기를 놓으세요. 마우스의 연속 설치 모드는 클릭하는 즉시 놓습니다.'};
}
export function recovery(failure){return {
  route:'화살표가 벽이나 보드 밖을 향했습니다. 설계 수정 후 해당 칸의 설비를 선택하고 방향을 바꾸세요.',
  misroute:'화물 문자와 출고구 문자가 다릅니다. 분류기의 기준 화살표를 확인하세요: R 직진, B 우회전, G 좌회전.',
  unfinished:'출고 전에 필요한 공정을 모두 마쳐야 합니다. 표시된 공정 칸에 처리기를 설치하고 주문의 순서대로 연결하세요.',
  late:'마감 전에 출고하지 못했습니다. 먼 우회로·합류 대기·정비 시간을 확인하고, 필요한 곳에 버퍼를 배치하세요.',
  deadlock:'화물이 멈췄습니다. 설비 없는 칸, 서로 막힌 합류, 꽉 찬 경로를 확인하세요. 같은 박자에 비워질 칸도 출발 시점에는 찬 칸입니다.',
  timeout:'최대 운행 박자를 넘겼습니다. 설계 수정 후 경로와 대기 원인을 확인하세요.'
}[failure]??'설계 수정 후 선택 칸의 설비와 경로를 확인하세요.';}
