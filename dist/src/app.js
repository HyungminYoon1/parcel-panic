import {contracts,getLevel} from "./levels.js";
import {starterLayout,editLayout,createRun,step,report,layoutCost,key,HISTORY_LIMIT} from "./model.js";
import {paint,cellAt,iso} from "./render.js";
import {newReplay,appendAction,exportReplay,RUN_LIMIT} from "./replay.js";
import {emptySave,saveLayout,recordCompletion,completedCount} from "./save-model.js";
import {loadSave,persistSave,clearSave} from "./storage.js";
import {syncProgress,clearProgress} from "./progress.js";
import {rankingDefinition,MAX_ACTIONS,MAX_PAYLOAD_BYTES} from "./ranked.js";
import {mountRanking} from "./ranking-client.js";
const $=id=>document.getElementById(id),board=$("board"),ctx=board.getContext("2d"),viewport=$("board-scroll");
let save=loadSave()??emptySave(),id=save.current,layout=save.entries[id]?.layout??starterLayout(id);
let assisted=save.entries[id]?.assisted??id===0,mode="independent",capture=newReplay(id,layout,mode,assisted),starts=0;
let resultDismissed=false;
let state=null,tool="belt",dir=getLevel(id).sources[0].dir,cursor={x:1,y:1},past=[],future=[],running=false,speed=1,frame=0,last=0,progress=1,drag=false,down=null,lastCell="",focusReturn=null,zoom=1,pan=false;
const text=(id,value)=>{$(id).textContent=value;},status=message=>text("status",message);
const node=(tag,value,cls)=>{const n=document.createElement(tag);if(value!==undefined)n.textContent=value;if(cls)n.className=cls;return n;};
const stageName={scan:"검수",repair:"수선",pack:"포장"};
function draw(animation=0){paint(ctx,{level:getLevel(id),layout,state,cursor,tool,dir,progress,animation});}
function log(action){
 if(!capture)return;
 try{if(action.type==="start"&&++starts>RUN_LIMIT||mode==="ranked"&&capture.actions.length>=MAX_ACTIONS)throw new RangeError("운행 기록 한도");capture=appendAction(capture,action);if(mode==="ranked"&&new TextEncoder().encode(JSON.stringify(capture.actions)).length>MAX_PAYLOAD_BYTES)throw new RangeError("기록 크기 한도");}
 catch{capture=null;status("기록 한도에 도달했습니다. 새 도전으로 기록을 시작하세요.");}
}
function autosave(){
 save=saveLayout(save,id,layout,assisted);
 const ok=persistSave(save);text("save-status",ok?"기기에 저장됨":"저장 불가 · 이 화면에서만 유지");
 if(ok&&!syncProgress(completedCount(save),14))text("save-status","기기에 저장됨 · 갤러리 동기화 실패");
}
function pause(message){running=false;cancelAnimationFrame(frame);frame=0;drag=false;down=null;progress=1;if(message)status(message);update();draw();}
function edit(command,action={type:"edit",command}){
 if(state){status("리셋 후 설비를 수정하세요.");return;}
 try{
  const next=editLayout(id,layout,command);if(JSON.stringify(next)===JSON.stringify(layout))return;
  past.push(layout);if(past.length>HISTORY_LIMIT)past.shift();future=[];layout=next;log(action);autosave();update();draw();
  status((command.type==="erase"?"철거":"설치")+" · "+(command.x+1)+"열 "+(command.y+1)+"행");
 }catch(error){status(error.message);}
}
function place(){edit({...cursor,type:tool,dir});}
function rotateExisting(){const p=layout[key(cursor)];if(p)edit({...p,dir:(p.dir+1)%4},{type:"rotate",x:p.x,y:p.y});else status("회전할 설비를 선택하세요.");}
function undo(){if(state||!past.length)return;future.push(layout);layout=past.pop();log({type:"undo"});autosave();update();draw();}
function redo(){if(state||!future.length)return;past.push(layout);layout=future.pop();log({type:"redo"});autosave();update();draw();}
function reset(){if(mode==="ranked"){choose(14,{fresh:true,ranked:true});return;}pause();state=null;past=[];future=[];progress=1;log({type:"reset"});update();draw();status("같은 설비로 다시 설계합니다.");}
function advance(){
 if(!state||state.status!=="running")return;
 state=step(state);log({type:"tick"});
 if(state.status!=="running"){
  running=false;cancelAnimationFrame(frame);frame=0;
  if(state.status==="won"&&capture){save=recordCompletion(save,capture);autosave();}
  status(state.reason);
 }
 progress=running?0:1;update();draw();if(state.status!=="running")$("result-title").focus({preventScroll:true});
}
function begin(auto){
 if(!state){try{resultDismissed=false;state=createRun(id,layout);log({type:"start"});}catch(error){status(error.message);return;}}
 if(state.status!=="running")return;
 if(!auto){pause();advance();return;}
 if(running){pause("일시정지");return;}
 running=true;last=0;progress=1;status("가동 중");update();frame=requestAnimationFrame(animate);
}
function animate(time){
 if(!running)return;const interval=420/speed;if(!last)last=time;
 let n=0;while(time-last>=interval&&running&&n<3){last+=interval;advance();n++;}
 if(time-last>interval*4)last=time;
 progress=matchMedia("(prefers-reduced-motion: reduce)").matches?1:Math.min(1,(time-last)/interval);
 draw(time/20);if(running)frame=requestAnimationFrame(animate);
}
function choose(nextId,{fresh=false,ranked=false,persist=true}={}){
 pause();id=nextId;const entry=fresh?null:save.entries[id];layout=entry?.layout??starterLayout(id);
 assisted=entry?.assisted??id===0;mode=ranked?"ranked":"independent";
 state=null;resultDismissed=false;past=[];future=[];starts=0;tool="belt";cursor=id===0?{x:6,y:3}:{x:1,y:1};dir=getLevel(id).sources[0].dir;
 capture=newReplay(id,layout,mode,assisted);$("hint-copy").hidden=true;
 if(persist)autosave();update();setZoom(1);draw();
 status(ranked?"최종 계약 · 빈 설계에서 기록 시작":entry?"저장된 설계 복원":getLevel(id).brief);
}
function inspect(){
 const level=getLevel(id),machine=layout[key(cursor)],source=level.sources.find(p=>key(p)===key(cursor)),exit=level.exits.find(p=>key(p)===key(cursor)),station=level.stations?.find(p=>key(p)===key(cursor));
 text("cursor-label",(cursor.x+1)+"열 / "+(cursor.y+1)+"행");board.dataset.cursorX=String(cursor.x);board.dataset.cursorY=String(cursor.y);
 text("inspect-title",source?"투입 "+source.id:exit?"출고 "+exit.color:station?stageName[station.stage]+" · "+station.duration+"박자":machine?({belt:"벨트",buffer:"버퍼",sorter:"분류기",processor:"처리기",gate:"공정 분기"}[machine.type]):"빈 칸");
 const copy={belt:"1개 운반",buffer:"3개 보관 · 먼저 도착한 1개 출발",sorter:"R 직진 · B 우회전 · G 좌회전",processor:"표시된 공정을 순서대로 처리",gate:"다음 공정이 수선이면 우회전 · 나머지 직진"};
 text("inspect-copy",source?level.orders.filter(o=>o.source===source.id).length+"개 주문":exit?exit.color+"만 출고":station?"처리기 설치 · "+(machine?copy[machine.type]:"현재 미설치"):machine?copy[machine.type]+" "+["→","↓","←","↑"][machine.dir]:"설비 선택 → 설치");
}
function update(){
 globalThis.dispatchEvent(new Event("ranking-state-change"));
 const level=getLevel(id),cost=layoutCost(layout),summary=state?report(state):null;
 text("level-title",level.name);text("brief",level.brief);text("grade",level.grade);text("campaign-count",id===0?"연습":id+" / 14");
 text("budget",cost+" / "+level.budget);$("budget").classList.toggle("over",cost>level.budget);text("delivered",(summary?.delivered??0)+" / "+level.orders.length);
 text("clock",(state?.tick??0)+"박자");text("phase",!state?"설계":state.status==="won"?"출고 완료":state.status==="failed"?"실패":running?"가동":"일시정지");
 text("attempt-mode",mode==="ranked"?"최상위 도전":assisted?"도움받은 연습":"독립 도전");
 text("run",running?"Ⅱ 정지":state?"▶ 재개":"▶ 가동");text("direction",["→","↓","←","↑"][dir]);text("speed",speed+"×");
 text("reset",mode==="ranked"?"새 기록":"리셋");text("edit",mode==="ranked"?"새 기록":"설계 수정");document.body.dataset.mode=mode;
 $("run").disabled=(!state&&cost>level.budget)||Boolean(state&&state.status!=="running");$("step").disabled=$("run").disabled;
 $("undo").disabled=Boolean(state)||!past.length;$("redo").disabled=Boolean(state)||!future.length;
 for(const name of ["clear","place","rotate-cell"])$(name).disabled=Boolean(state);
 document.querySelectorAll("[data-tool]").forEach(b=>{b.disabled=Boolean(state);b.hidden=["processor","gate"].includes(b.dataset.tool)&&!level.stations;b.setAttribute("aria-pressed",String(tool===b.dataset.tool));});
 $("hint").disabled=mode==="ranked";$("ranked").hidden=!level.rankedCandidate;
 $("export").disabled=!capture||!state;$("result-export").disabled=$("export").disabled;$("capture-status").hidden=Boolean(capture);
 text("best",save.entries[id]?.best?"독립 최고 "+save.entries[id].best.score:"독립 기록 없음");
 const list=$("orders");list.replaceChildren();for(const order of level.orders){
  const done=state?.delivered.find(d=>d.id===order.id),active=state?.parcels.find(p=>p.id===order.id),late=state&&order.due-state.tick<=5&&!done;
  const row=node("div",undefined,"order "+order.color+(order.urgent?" urgent":"")+(done?" done":"")+(late?" late":""));
  row.append(node("span",order.color,"tag"),node("span",order.id+(order.urgent?" !":"")),node("small",order.source+" · "+(done?"출고":active?order.recipe?"공정 "+(active.stage??0)+"/"+order.recipe.length:"운반":"+"+order.release)),node("span",done?"✓ "+done.tick:order.due+" t","due"));
  if(order.recipe)row.append(node("small",order.recipe.map(s=>stageName[s]).join("→"),"recipe"));list.append(row);
 }
 text("maintenance",level.maintenance.length?level.maintenance.map(m=>(m.x+1)+"열 "+(m.y+1)+"행 · "+m.start+"–"+m.end+"박자 정지").join(" / "):"정비 없음");
 text("stations",level.stations?.map(s=>stageName[s.stage]+" "+(s.x+1)+"열 "+(s.y+1)+"행 · "+s.duration+"박자").join(" / ")??"");
 inspect();board.setAttribute("aria-label",level.name+". "+(state?summary.delivered+"개 출고, "+state.tick+"박자":cost+"원 설비")+". 선택 "+(cursor.x+1)+"열 "+(cursor.y+1)+"행. 방향키 이동, Space 설치, R 방향, E 기존 설비 회전.");
 const finished=state&&state.status!=="running";$("result-overlay").hidden=!finished||resultDismissed;
 if(finished){
  text("result-kicker",assisted?"연습 결과":mode==="ranked"?"최상위 완료":"독립 도전");text("result-title",summary.won?"출고 완료":"계약 실패");text("result-copy",summary.won?"":state.reason);
  const numbers=$("result-numbers");numbers.replaceChildren();for(const [value,label]of[[summary.score,"점수"],[summary.delivered+"/"+summary.total,"출고"],[summary.waits,"대기 박자"]]){const d=node("div",value);d.append(node("small",label));numbers.append(d);}
  const b=summary.breakdown;text("score-breakdown",summary.won?b.base+" − 시간 "+b.time+" − 설비 "+b.equipment+" − 대기 "+b.waiting+" = "+summary.score:"미완료 점수 0");
  $("next").hidden=!summary.won||id===14;
 }
}
function showDialog(name){pause();focusReturn=document.activeElement;if(name==="campaign-dialog"){
 const list=$("level-list");list.replaceChildren();for(const level of contracts){
  const best=save.entries[level.id]?.best,b=node("button",undefined,"level-choice"+(level.id===id?" current":"")+(best?" won":""));b.type="button";b.dataset.level=String(level.id);
  b.append(node("span",level.id===0?"연습":(level.id<=12?"기존 ":"공정 ")+level.id),node("b",level.name),node("small",level.orders.length+"건 · 예산 "+level.budget+(best?" · 최고 "+best.score:"")));
  b.addEventListener("click",()=>{choose(level.id);focusReturn=board;$(name).close();board.focus({preventScroll:true});});list.append(b);
 }}$(name).showModal();}
function setZoom(value){
 zoom=Math.max(1,Math.min(3,value));$("board-stage").style.width=viewport.clientWidth*zoom+"px";text("zoom-label",Math.round(zoom*100)+"%");
 if(zoom===1)viewport.scrollTo(0,0);else scrollCursor();
}
function scrollCursor(){const p=iso(cursor.x,cursor.y),scale=board.getBoundingClientRect().width/1100,x=p.x*scale,y=p.y*scale;
 if(x<viewport.scrollLeft+35||x>viewport.scrollLeft+viewport.clientWidth-35||y<viewport.scrollTop+35||y>viewport.scrollTop+viewport.clientHeight-35)viewport.scrollTo({left:Math.max(0,x-viewport.clientWidth/2),top:Math.max(0,y-viewport.clientHeight/2),behavior:"instant"});
}
function moveCursor(command){const d={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}[command],level=getLevel(id);cursor={x:Math.max(0,Math.min(level.width-1,cursor.x+d[0])),y:Math.max(0,Math.min(level.height-1,cursor.y+d[1]))};inspect();draw();scrollCursor();}
function fromPointer(event){const r=board.getBoundingClientRect(),p=cellAt((event.clientX-r.left)/r.width*1100,(event.clientY-r.top)/r.height*700),l=getLevel(id);return p.x>=0&&p.y>=0&&p.x<l.width&&p.y<l.height?p:null;}
function selectPointer(event,paintNow){const p=fromPointer(event);if(!p)return;cursor=p;inspect();if(paintNow&&key(p)!==lastCell){lastCell=key(p);place();}draw();}
board.addEventListener("pointerdown",event=>{
 if(event.button!==0)return;down={x:event.clientX,y:event.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};lastCell="";
 if(event.pointerType==="mouse"){event.preventDefault();board.setPointerCapture(event.pointerId);drag=true;board.focus({preventScroll:true});if(!pan)selectPointer(event,true);}
});
board.addEventListener("pointermove",event=>{
 if(pan&&drag&&down){viewport.scrollTo(down.left+down.x-event.clientX,down.top+down.y-event.clientY);return;}
 if(event.pointerType==="mouse"&&!pan)selectPointer(event,drag&&event.buttons===1);
});
board.addEventListener("pointerup",event=>{if(!pan&&event.pointerType!=="mouse"&&down&&Math.hypot(event.clientX-down.x,event.clientY-down.y)<10){selectPointer(event,false);board.focus({preventScroll:true});}drag=false;down=null;lastCell="";});
globalThis.addEventListener("pointerup",()=>{drag=false;down=null;lastCell="";});board.addEventListener("pointercancel",()=>{drag=false;down=null;});
board.addEventListener("contextmenu",event=>{event.preventDefault();const p=fromPointer(event);if(p){cursor=p;rotateExisting();}});
for(const b of document.querySelectorAll("[data-tool]"))b.addEventListener("click",()=>{if(state)return;tool=b.dataset.tool;update();draw();});
$("rotate").addEventListener("click",()=>{dir=(dir+1)%4;update();draw();});$("rotate-cell").addEventListener("click",rotateExisting);
$("undo").addEventListener("click",undo);$("redo").addEventListener("click",redo);
$("clear").addEventListener("click",()=>{if(state)return;past.push(layout);if(past.length>HISTORY_LIMIT)past.shift();future=[];layout=starterLayout(id);log({type:"clear"});autosave();update();draw();});
$("result-close").addEventListener("click",()=>{resultDismissed=true;$("result-overlay").hidden=true;board.focus({preventScroll:true});});
$("run").addEventListener("click",()=>begin(true));$("step").addEventListener("click",()=>begin(false));$("reset").addEventListener("click",reset);$("edit").addEventListener("click",reset);
$("next").addEventListener("click",()=>choose(Math.min(14,id+1)));$("speed").addEventListener("click",()=>{speed=speed===4?1:speed*2;last=0;update();});
$("campaign").addEventListener("click",()=>showDialog("campaign-dialog"));$("help").addEventListener("click",()=>showDialog("help-dialog"));
$("tutorial").addEventListener("click",()=>{choose(0,{fresh:true});$("help-dialog").close();});
$("fresh").addEventListener("click",()=>choose(id,{fresh:true}));$("ranked").addEventListener("click",()=>choose(14,{fresh:true,ranked:true}));
$("hint").addEventListener("click",()=>{if(mode==="ranked")return;assisted=true;log({type:"assist"});$("hint-copy").hidden=false;text("hint-copy",getLevel(id).hint);autosave();update();});
$("place").addEventListener("click",place);for(const b of document.querySelectorAll("[data-cursor]"))b.addEventListener("click",()=>moveCursor(b.dataset.cursor));
$("fit").addEventListener("click",()=>setZoom(1));$("zoom-in").addEventListener("click",()=>setZoom(zoom+.5));$("zoom-out").addEventListener("click",()=>setZoom(zoom-.5));
$("pan").addEventListener("click",()=>{pan=!pan;$("pan").setAttribute("aria-pressed",String(pan));board.classList.toggle("panning",pan);});
globalThis.addEventListener("resize",()=>setZoom(zoom));
$("restore").addEventListener("click",()=>{const restored=loadSave();if(!restored){status("복원할 저장이 없습니다.");return;}save=restored;choose(save.current,{persist:false});text("save-status","설계 복원됨 · 운행 정지");});
$("delete-save").addEventListener("click",()=>{
 pause();if(!confirm("이 게임의 설계와 독립 기록을 삭제할까요?"))return;
 if(!clearSave()){status("저장소에 접근할 수 없어 삭제하지 못했습니다.");return;}
 const shared=clearProgress();save=emptySave();choose(0,{fresh:true,persist:false});text("save-status",shared?"저장 삭제됨":"설계 삭제됨 · 갤러리 요약 삭제 실패");
});
function downloadReplay(){
 pause();if(!capture)return;try{const raw=exportReplay(capture),url=URL.createObjectURL(new Blob([raw],{type:"application/json"})),a=node("a");a.href=url;a.download="parcel-replay-"+id+".json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status("실제 입력 리플레이 저장됨");}catch{status("리플레이 검증 실패");}
}
$("export").addEventListener("click",downloadReplay);$("result-export").addEventListener("click",downloadReplay);
for(const b of document.querySelectorAll("[data-close]"))b.addEventListener("click",()=>$(b.dataset.close).close());
for(const dialog of document.querySelectorAll("dialog"))dialog.addEventListener("close",()=>{(focusReturn??board).focus({preventScroll:true});});
document.addEventListener("keydown",event=>{
 if(document.querySelector("dialog[open]")||event.target!==board&&event.target!==document.body)return;
 const moves={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};
 if(moves[event.code]){event.preventDefault();moveCursor(moves[event.code]);return;}if(event.repeat)return;
 if(event.code==="Space"){event.preventDefault();place();}else if(event.code==="KeyR"){event.preventDefault();dir=(dir+1)%4;update();draw();}else if(event.code==="KeyE"){event.preventDefault();rotateExisting();}else if(event.code==="Delete"||event.code==="Backspace"){event.preventDefault();edit({...cursor,type:"erase"});}else if(event.code==="KeyZ"){event.preventDefault();undo();}else if(event.code==="KeyY"){event.preventDefault();redo();}else if(event.code==="KeyP"){event.preventDefault();begin(true);}else if(event.code==="Escape")pause("일시정지");
});
document.addEventListener("visibilitychange",()=>{if(document.hidden)pause("일시정지");});globalThis.addEventListener("blur",()=>pause());
globalThis.addEventListener("pagehide",()=>{running=false;cancelAnimationFrame(frame);drag=false;down=null;});
if(id===0)cursor={x:6,y:3};
text("save-status",save.entries[id]?"저장된 설계 · 운행 정지":"설계 변경 시 기기에 자동 저장");
status(save.entries[id]?"저장된 설계 복원":getLevel(id).brief);
update();setZoom(1);draw();
// Transport is separate from the actual command capture.
export const rankingAdapter=Object.freeze({
 start(){choose(14,{fresh:true,ranked:true});},
 getActions(){if(mode!=="ranked"||!capture)throw new TypeError("No ranked capture");return structuredClone(capture.actions);},
 isComplete(){return mode==="ranked"&&Boolean(capture)&&!assisted&&state?.status==="won";},
 getDefinition:rankingDefinition
});
mountRanking({root:$("public-ranking"),adapter:rankingAdapter,apiBase:"https://web-lab-ranking.hyeongmin92.workers.dev"});
