import {levels,getLevel} from "./levels.js";
import {starterLayout,editLayout,createRun,step,report,layoutCost,key,HISTORY_LIMIT} from "./model.js";
import {paint,cellAt,iso} from "./render.js";
const $=id=>document.getElementById(id),board=$("board"),ctx=board.getContext("2d"),records=new Map();
let id=1,layout=starterLayout(id),state=null,tool="belt",dir=0,cursor={x:1,y:1},past=[],future=[],running=false,speed=1,frame=0,last=0,progress=1,drag=false,down=null,lastCell="",focusReturn=null,hinted=false;
const text=(id,value)=>{$(id).textContent=value;},status=message=>text("status",message),node=(tag,value,cls)=>{const n=document.createElement(tag);if(value!==undefined)n.textContent=value;if(cls)n.className=cls;return n;};
function draw(animation=0){paint(ctx,{level:getLevel(id),layout,state,cursor,tool,dir,progress,animation});}
function pause(message){running=false;cancelAnimationFrame(frame);frame=0;drag=false;down=null;progress=1;if(message)status(message);update();draw();}
function edit(command){
 if(state){status("운행 리셋으로 설계 모드에 돌아오세요.");return;}
 try{const next=editLayout(id,layout,command);if(JSON.stringify(next)===JSON.stringify(layout))return;past.push(structuredClone(layout));if(past.length>HISTORY_LIMIT)past.shift();future=[];layout=next;update();draw();status((command.type==="erase"?"철거":"설치")+" · "+(command.x+1)+"열 "+(command.y+1)+"행");}catch(error){status(error.message);}
}
function place(){edit({...cursor,type:tool,dir});}
function undo(){if(state||!past.length)return;future.push(structuredClone(layout));layout=past.pop();update();draw();status("설비 변경을 취소했습니다.");}
function redo(){if(state||!future.length)return;past.push(structuredClone(layout));layout=future.pop();update();draw();status("설비 변경을 복구했습니다.");}
function reset(){pause();state=null;past=[];future=[];progress=1;update();draw();status("같은 주문과 설비로 설계 모드에 돌아왔습니다.");}
function advance(){
 if(!state||state.status!=="running")return;state=step(state);
 if(state.status!=="running"){running=false;cancelAnimationFrame(frame);frame=0;if(state.status==="won")records.set(id,Math.max(records.get(id)??0,report(state).score));status(state.reason);}
 progress=running?0:1;update();draw();
}
function begin(auto){
 if(!state){try{state=createRun(id,layout);}catch(error){status(error.message);return;}}
 if(state.status!=="running")return;
 if(!auto){pause();advance();return;}
 if(running){pause("운행을 멈췄습니다. 한 박자로 합류 순서를 확인할 수 있습니다.");return;}
 running=true;last=0;progress=1;status("가동 중. 수정하려면 운행 리셋을 누르세요.");update();frame=requestAnimationFrame(animate);
}
function animate(time){
 if(!running)return;const interval=420/speed;if(!last)last=time;
 let n=0;while(time-last>=interval&&running&&n<3){last+=interval;advance();n++;}
 if(time-last>interval*4)last=time;progress=Math.min(1,(time-last)/interval);draw(time/20);if(running)frame=requestAnimationFrame(animate);
}
function choose(nextId){pause();id=nextId;layout=starterLayout(id);state=null;past=[];future=[];hinted=false;$("hint-copy").hidden=true;cursor={x:1,y:1};dir=getLevel(id).sources[0].dir;update();draw();status("새 계약입니다. 투입 순서, 마감과 출고구 위치를 먼저 확인하세요.");}
function inspect(){
 const level=getLevel(id),machine=layout[key(cursor)],source=level.sources.find(p=>key(p)===key(cursor)),exit=level.exits.find(p=>key(p)===key(cursor));
 text("cursor-label",(cursor.x+1)+"열 / "+(cursor.y+1)+"행");board.dataset.cursorX=String(cursor.x);board.dataset.cursorY=String(cursor.y);
 text("inspect-title",source?"투입구 "+source.id:exit?"출고구 "+exit.color:machine?({belt:"벨트",buffer:"버퍼",sorter:"분류기"}[machine.type]):"선택 칸");
 text("inspect-copy",source?level.orders.filter(o=>o.source===source.id).length+"개 주문이 예정되어 있습니다. 투입구 자체는 방향을 바꿀 수 없습니다.":exit?exit.color+" 화물만 받습니다. 다른 문자가 도착하면 계약이 실패합니다.":machine?(machine.type==="buffer"?"최대 3개 FIFO 보관, 맨 앞 1개 출발.":machine.type==="sorter"?"R 직진 · B 우회전 · G 좌회전.":"동시에 1개 화물을 운반합니다.")+" 방향 "+["→","↓","←","↑"][machine.dir]:"팔레트의 설비를 설치하세요. Space 설치, R 방향 회전.");
}
function update(){
 const level=getLevel(id),cost=layoutCost(layout),summary=state?report(state):null;
 text("level-title",level.name);text("brief",level.brief);text("chapter",String(level.chapter).padStart(2,"0"));text("grade",level.grade);text("campaign-count",String(id).padStart(2,"0")+" / 12");text("budget",cost+" / "+level.budget);$("budget").classList.toggle("over",cost>level.budget);text("delivered",(summary?.delivered??0)+" / "+level.orders.length);text("clock","TICK "+String(state?.tick??0).padStart(3,"0"));text("phase",!state?"BLUEPRINT / 설계 중":state.status==="won"?"CONTRACT COMPLETE":state.status==="failed"?"CONTRACT FAILED":running?"RUNNING / 가동 중":"PAUSED / 일시정지");document.querySelector(".factory-top").classList.toggle("running",running);
 text("run",running?"Ⅱ 일시정지":state?"▶ 운행 재개":"▶ 가동 시작");text("direction",["→","↓","←","↑"][dir]);text("speed","속도 "+speed+"×");
 $("run").disabled=(!state&&cost>level.budget)||(state&&state.status!=="running");$("step").disabled=(!state&&cost>level.budget)||(state&&state.status!=="running");$("undo").disabled=Boolean(state)||!past.length;$("redo").disabled=Boolean(state)||!future.length;$("clear").disabled=Boolean(state);$("place").disabled=Boolean(state);document.querySelectorAll("[data-tool]").forEach(b=>{b.disabled=Boolean(state);b.setAttribute("aria-pressed",String(tool===b.dataset.tool));});
 const list=$("orders");list.replaceChildren();for(const order of level.orders){
  const done=state?.delivered.find(d=>d.id===order.id),on=state?.parcels.some(p=>p.id===order.id),late=state&&order.due-state.tick<=5&&!done,row=node("div",undefined,"order "+order.color+(order.urgent?" urgent":"")+(done?" done":"")+(late?" late":""));
  row.append(node("span",order.color,"tag"),node("span",order.id+(order.urgent?" !":"")),node("small",order.source+" · "+(done?"출고":on?"운반":"+"+order.release)),node("span",done?"✓ "+done.tick:order.due+" t","due"));list.append(row);
 }
 text("maintenance",level.maintenance.length?level.maintenance.map(m=>(m.x+1)+"열 "+(m.y+1)+"행 / "+m.start+"–"+m.end+"박자 정지").join(" · "):"예정된 정비가 없습니다.");
 inspect();$("hint").disabled=hinted;board.setAttribute("aria-label","공장 "+level.name+". "+(state?summary.delivered+"개 출고, "+state.tick+"박자":cost+"원 설비")+". 선택 "+(cursor.x+1)+"열 "+(cursor.y+1)+"행. 방향키/Space/R/Delete 사용.");
 const finished=state&&state.status!=="running";$("result-overlay").hidden=!finished;
 if(finished){
  text("result-kicker",state.status==="won"?"CONTRACT SIGNED / "+summary.grade:"DISPATCH INTERRUPTED");text("result-title",state.status==="won"?"배송을 완료했습니다":"흐름을 다시 설계하세요");text("result-copy",state.reason);const numbers=$("result-numbers");numbers.replaceChildren();for(const [value,label]of[[summary.score,"POINTS"],[summary.delivered+"/"+summary.total,"DELIVERED"],[summary.waits,"WAIT TICKS"]]){const d=node("div",value);d.append(node("small",label));numbers.append(d);}text("edit","설계 수정하기");$("next").hidden=state.status!=="won"||id===12;
 }
}
function showDialog(name){pause();focusReturn=document.activeElement;if(name==="campaign-dialog"){
 const list=$("level-list");list.replaceChildren();for(const level of levels){const b=node("button",undefined,"level-choice"+(level.id===id?" current":"")+(records.has(level.id)?" won":""));b.type="button";b.dataset.level=String(level.id);b.append(node("span","CONTRACT "+String(level.id).padStart(2,"0")),node("b",level.name),node("small",level.grade+" · "+level.orders.length+" ORDERS · ₩"+level.budget+(records.has(level.id)?" · "+records.get(level.id)+" PT":"")));b.addEventListener("click",()=>{choose(level.id);focusReturn=board;$("campaign-dialog").close();board.focus({preventScroll:true});});list.append(b);}
 }$(name).showModal();}
function scrollCursor(){const p=iso(cursor.x,cursor.y),rect=board.getBoundingClientRect(),container=document.querySelector(".board-scroll"),scale=rect.width/1100;const x=p.x*scale;if(x<container.scrollLeft+40||x>container.scrollLeft+container.clientWidth-40)container.scrollTo({left:Math.max(0,x-container.clientWidth/2),behavior:"instant"});}
function moveCursor(command){const moves={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]},d=moves[command],level=getLevel(id);cursor={x:Math.max(0,Math.min(level.width-1,cursor.x+d[0])),y:Math.max(0,Math.min(level.height-1,cursor.y+d[1]))};inspect();draw();scrollCursor();}
function fromPointer(event){const rect=board.getBoundingClientRect(),p=cellAt((event.clientX-rect.left)/rect.width*1100,(event.clientY-rect.top)/rect.height*700),level=getLevel(id);return p.x>=0&&p.y>=0&&p.x<level.width&&p.y<level.height?p:null;}
function selectPointer(event,paintNow){const p=fromPointer(event);if(!p)return;cursor=p;inspect();if(paintNow){const k=key(p);if(k!==lastCell){lastCell=k;place();}}draw();}
board.addEventListener("pointerdown",event=>{if(event.button!==0)return;down={x:event.clientX,y:event.clientY};lastCell="";if(event.pointerType==="mouse"){event.preventDefault();drag=true;board.focus({preventScroll:true});selectPointer(event,true);}});
board.addEventListener("pointermove",event=>selectPointer(event,drag&&event.buttons===1&&event.pointerType==="mouse"));
board.addEventListener("pointerup",event=>{if(event.pointerType!=="mouse"&&down&&Math.hypot(event.clientX-down.x,event.clientY-down.y)<10){selectPointer(event,true);board.focus({preventScroll:true});}drag=false;down=null;lastCell="";});
globalThis.addEventListener("pointerup",()=>{drag=false;down=null;lastCell="";});board.addEventListener("pointercancel",()=>{drag=false;down=null;lastCell="";});
board.addEventListener("contextmenu",event=>{event.preventDefault();const p=fromPointer(event);if(p){cursor=p;const machine=layout[key(p)];if(machine)edit({...p,type:machine.type,dir:(machine.dir+1)%4});else{dir=(dir+1)%4;update();draw();}}});
for(const b of document.querySelectorAll("[data-tool]"))b.addEventListener("click",()=>{if(state)return;tool=b.dataset.tool;update();draw();board.focus({preventScroll:true});});
$("rotate").addEventListener("click",()=>{dir=(dir+1)%4;update();draw();});$("undo").addEventListener("click",undo);$("redo").addEventListener("click",redo);
$("clear").addEventListener("click",()=>{if(state)return;past.push(structuredClone(layout));if(past.length>HISTORY_LIMIT)past.shift();future=[];layout=starterLayout(id);update();draw();status("계약의 시작 설비로 초기화했습니다. 취소로 복구할 수 있습니다.");});
$("run").addEventListener("click",()=>begin(true));$("step").addEventListener("click",()=>begin(false));$("reset").addEventListener("click",reset);$("edit").addEventListener("click",reset);$("next").addEventListener("click",()=>choose(Math.min(12,id+1)));
$("speed").addEventListener("click",()=>{speed=speed===4?1:speed*2;last=0;update();});$("campaign").addEventListener("click",()=>showDialog("campaign-dialog"));$("help").addEventListener("click",()=>showDialog("help-dialog"));
$("hint").addEventListener("click",()=>{hinted=true;$("hint-copy").hidden=false;text("hint-copy",getLevel(id).hint);update();status("힌트는 배치 해답 대신 합류와 분류 규칙을 설명합니다.");});
$("place").addEventListener("click",place);for(const b of document.querySelectorAll("[data-cursor]"))b.addEventListener("click",()=>moveCursor(b.dataset.cursor));
for(const b of document.querySelectorAll("[data-close]"))b.addEventListener("click",()=>$(b.dataset.close).close());for(const dialog of document.querySelectorAll("dialog"))dialog.addEventListener("close",()=>{(focusReturn??board).focus({preventScroll:true});});
document.addEventListener("keydown",event=>{
 if(document.querySelector("dialog[open]")||event.target!==board&&event.target!==document.body)return;const moves={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};
 if(moves[event.code]){event.preventDefault();moveCursor(moves[event.code]);return;}if(event.repeat)return;
 if(event.code==="Space"){event.preventDefault();place();}else if(event.code==="KeyR"){event.preventDefault();dir=(dir+1)%4;update();draw();}else if(event.code==="Delete"||event.code==="Backspace"){event.preventDefault();edit({...cursor,type:"erase"});}else if(event.code==="KeyZ"){event.preventDefault();undo();}else if(event.code==="KeyY"){event.preventDefault();redo();}else if(event.code==="KeyP"){event.preventDefault();begin(true);}else if(event.code==="Escape")pause("가동을 멈췄습니다.");
});
document.addEventListener("visibilitychange",()=>{if(document.hidden)pause("다른 화면으로 이동하여 가동을 멈췄습니다. 자동 재개하지 않습니다.");});globalThis.addEventListener("blur",()=>pause("입력 초점이 바뀌어 가동을 멈췄습니다."));globalThis.addEventListener("pagehide",()=>{running=false;cancelAnimationFrame(frame);drag=false;down=null;});
dir=getLevel(id).sources[0].dir;update();draw();
