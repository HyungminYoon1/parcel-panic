const KEY="web-lab-ranking-identity-v1";
const errors={
  daily_limit:"오늘 등록 한도에 도달했습니다. 다음 날 다시 시도하세요.",
  storage_limit:"등록 공간이 가득 찼습니다. 개인 플레이는 계속할 수 있습니다.",
  unauthorized:"익명 식별값이 만료됐습니다. 새 도전을 시작하세요.",
  expired_identity:"익명 식별값이 만료됐습니다. 새 도전을 시작하세요.",
  attempt_expired:"도전 등록 시간이 지났습니다. 새 도전을 시작하세요.",
  unknown_attempt:"도전 기록을 찾을 수 없습니다. 새 도전을 시작하세요.",
  rules_changed:"규칙이 갱신됐습니다. 페이지를 새로고침하세요.",
  illegal_replay:"유효하지 않은 명령 기록입니다.",
  challenge_not_completed:"최상위 도전을 완료해야 등록할 수 있습니다.",
  ranking_paused:"공개 기록 등록이 잠시 중단됐습니다.",
  service_unavailable:"랭킹 서버에 연결할 수 없습니다. 개인 플레이는 계속할 수 있습니다."
};
export function validIdentity(value){
  return !!value&&value.version===1&&Object.keys(value).length===3&&typeof value.playerId==="string"&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.playerId)&&typeof value.token==="string"&&/^[0-9a-f]{64}$/.test(value.token);
}
export function readIdentity(storage){
  try{const raw=storage?.getItem(KEY);if(!raw||raw.length>256)return null;const value=JSON.parse(raw);return validIdentity(value)?value:null;}catch{return null;}
}
const node=(tag,text,className)=>{const value=document.createElement(tag);if(text!==undefined)value.textContent=text;if(className)value.className=className;return value;};

export function mountRanking({root,adapter,apiBase}){
  if(!root||!adapter||typeof apiBase!=="string")throw new Error("Ranking integration required");
  const url=new URL(apiBase);
  if(!(url.protocol==="https:"&&url.hostname==="web-lab-ranking.hyeongmin92.workers.dev")&&!(url.protocol==="http:"&&url.hostname==="127.0.0.1"))throw new Error("Ranking endpoint not allowed");
  let storage;try{storage=localStorage;}catch{storage=null;}
  let identity=readIdentity(storage),ticket=null,busy=false,durable=!!storage;
  const definition=adapter.getDefinition();
  const details=node("details",undefined,"ranking-panel"),summary=node("summary","최상위 공개 기록");
  details.append(summary,node("p",definition.title,"ranking-rule"));
  const explanation=node("p","고정 조건 · 실시간 속도는 점수에 반영하지 않습니다.","ranking-description");
  const actions=node("div",undefined,"ranking-actions"),start=node("button","공개 기록 도전"),view=node("button","순위 보기"),send=node("button","완료 기록 등록");
  for(const b of[start,view,send])b.type="button";
  const label=node("label","닉네임 (선택)"),name=node("input");name.type="text";name.maxLength=16;name.autocomplete="off";name.placeholder="비워두면 익명";label.append(name);
  const status=node("p","완료 후 등록을 누른 기록만 공개됩니다.","ranking-status");status.setAttribute("role","status");
  const board=node("div",undefined,"ranking-board"),privacy=node("details",undefined,"ranking-privacy");privacy.append(node("summary","저장·삭제"));
  privacy.append(node("p","공개: 닉네임·최고 점수. 서버: 익명 식별값·검증용 명령. 마지막 활동 후 180일 보관. 자동 게시하지 않습니다."));
  privacy.append(node("p","등록 권한은 이 브라우저에 저장됩니다. 브라우저 기록만 지우면 삭제 권한도 잃을 수 있습니다."));
  const erase=node("button","공개 기록 삭제");erase.type="button";privacy.append(erase);
  actions.append(start,view);details.append(explanation,actions,label,send,status,board,privacy);root.replaceChildren(details);
  function complete(){try{return !!ticket&&adapter.isComplete();}catch{return false;}}
  function refresh(){start.disabled=busy;view.disabled=busy;send.disabled=busy||!complete();erase.disabled=busy||!identity;name.disabled=busy;}
  async function request(path,method="GET",body,auth=false){
    const headers={};if(body!==undefined)headers["Content-Type"]="application/json";
    if(auth){if(!identity)throw new Error("unauthorized");headers.Authorization="Bearer "+identity.token;}
    const control=new AbortController(),timer=setTimeout(()=>control.abort(),12000);
    try{
      const response=await fetch(apiBase+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body),credentials:"omit",referrerPolicy:"no-referrer",signal:control.signal});
      let data;try{data=await response.json();}catch{throw new Error("service_unavailable");}
      if(!response.ok){if(response.status===401){identity=null;ticket=null;try{storage?.removeItem(KEY);}catch{}}throw new Error(data.error??"service_unavailable");}
      return data;
    }catch(e){if(e.name==="AbortError"||e instanceof TypeError)throw new Error("service_unavailable");throw e;}finally{clearTimeout(timer);}
  }
  async function task(callback){
    if(busy)return;busy=true;refresh();
    try{await callback();}catch(e){status.textContent=errors[e.message]??"등록할 수 없습니다. 다시 시도하세요.";}finally{busy=false;refresh();}
  }
  function display(data){
    if(!data||data.definition?.rulesVersion!==definition.rulesVersion||data.definition?.challengeId!==definition.challengeId||!Array.isArray(data.entries)||data.entries.length>50)throw new Error("rules_changed");
    board.replaceChildren();
    if(!data.entries.length){board.append(node("p","아직 등록된 완료 기록이 없습니다."));return;}
    const table=node("table"),head=node("thead"),header=node("tr");for(const text of["순위","닉네임","점수"])header.append(node("th",text));head.append(header);table.append(head);
    const body=node("tbody");
    for(const entry of data.entries){
      if(!Number.isSafeInteger(entry.rank)||entry.rank<1||!Number.isSafeInteger(entry.score)||entry.score<0||typeof entry.nickname!=="string"||entry.nickname.length>32)throw new Error("service_unavailable");
      const row=node("tr");row.append(node("td",String(entry.rank)),node("td",entry.nickname),node("td",entry.score.toLocaleString("ko-KR")));body.append(row);
    }
    table.append(body);board.append(table);
  }
  start.addEventListener("click",()=>task(async()=>{
    if(!confirm("현재 시도를 초기화하고 고정된 최상위 도전을 시작할까요?"))return;
    if(!identity){
      const created=await request("/v1/identities","POST",{});
      const value={version:1,playerId:created.playerId,token:created.token};if(!validIdentity(value))throw new Error("service_unavailable");
      identity=value;try{if(storage)storage.setItem(KEY,JSON.stringify(value));else durable=false;}catch{durable=false;}
    }
    const run=await request("/v1/runs","POST",{playerId:identity.playerId,game:definition.game,rulesVersion:definition.rulesVersion,challengeId:definition.challengeId},true);
    if(run.definition?.rulesVersion!==definition.rulesVersion||run.definition?.challengeId!==definition.challengeId||typeof run.runId!=="string")throw new Error("rules_changed");
    adapter.start();ticket=run;status.textContent="도전 시작 · 완료 후 원하면 등록하세요."+(durable?"":" 등록 권한은 현재 탭에서만 유지됩니다.");
  }));
  view.addEventListener("click",()=>task(async()=>{display(await request("/v1/boards/"+definition.game));status.textContent="같은 점수·동률 조건은 공동 순위입니다.";}));
  send.addEventListener("click",()=>task(async()=>{
    if(!complete())throw new Error("challenge_not_completed");
    const nickname=name.value.normalize("NFC").trim();if([...nickname].length>16||!/^[\p{L}\p{N} _-]*$/u.test(nickname)){status.textContent="닉네임은 16자 이내의 글자·숫자·공백·_·-를 사용하세요.";return;}
    const result=await request("/v1/scores","POST",{playerId:identity.playerId,runId:ticket.runId,game:definition.game,rulesVersion:definition.rulesVersion,challengeId:definition.challengeId,nickname,actions:adapter.getActions()},true);
    if(!result.accepted||!Number.isSafeInteger(result.score))throw new Error("service_unavailable");
    status.textContent=result.score.toLocaleString("ko-KR")+"점 검증 완료 · "+(result.improved?"최고 기록 갱신":"기존 최고 기록 유지");
    ticket=null;display(await request("/v1/boards/"+definition.game));
  }));
  erase.addEventListener("click",()=>task(async()=>{
    if(!confirm("이 브라우저로 등록한 두 게임의 공개 기록을 삭제할까요? 개인 플레이 기록은 유지됩니다."))return;
    await request("/v1/identity","DELETE",{playerId:identity.playerId},true);
    identity=null;ticket=null;try{storage?.removeItem(KEY);}catch{}
    board.replaceChildren();status.textContent="공개 기록이 삭제되었습니다.";
  }));
  globalThis.addEventListener("ranking-state-change",refresh);
  globalThis.addEventListener("storage",event=>{if(event.key===KEY){identity=readIdentity(storage);ticket=null;refresh();}});
  refresh();
  return {refresh};
}
