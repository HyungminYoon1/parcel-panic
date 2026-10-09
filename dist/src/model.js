import {getLevel} from "./levels.js";
export const MAX_TICKS=180,HISTORY_LIMIT=80,COST=Object.freeze({belt:1,buffer:3,sorter:4,processor:4,gate:4});
export const DIRECTIONS=Object.freeze([{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}]);
export const key=p=>p.x+","+p.y;
const at=(a,b)=>a.x===b.x&&a.y===b.y;
const integer=n=>Number.isInteger(n);
export function layoutCost(layout){return Object.values(layout).reduce((sum,p)=>sum+(COST[p.type]??0),0);}
export function validCell(level,p){return integer(p.x)&&integer(p.y)&&p.x>=0&&p.y>=0&&p.x<level.width&&p.y<level.height&&!level.blocked.some(b=>at(b,p))&&!level.sources.some(b=>at(b,p))&&!level.exits.some(b=>at(b,p));}
export function editLayout(id,layout,command){
 const level=getLevel(id);
 if(!command||!validCell(level,command))throw new RangeError("이 칸에는 설비를 놓을 수 없습니다.");
 const next=structuredClone(layout),k=key(command);
 if(command.type==="erase"){delete next[k];return next;}
 if(!Object.hasOwn(COST,command.type)||!integer(command.dir)||command.dir<0||command.dir>3)throw new TypeError("Invalid machine");
 next[k]={x:command.x,y:command.y,type:command.type,dir:command.dir};return next;
}
export function starterLayout(id){return Object.fromEntries(getLevel(id).starter.map(p=>[key(p),{...p}]));}
export function validateLayout(id,layout){
 const level=getLevel(id);
 if(!layout||Array.isArray(layout)||typeof layout!=="object"||Object.keys(layout).length>level.width*level.height)throw new TypeError("Invalid layout");
 for(const [k,p] of Object.entries(layout))if(!p||k!==key(p)||!validCell(level,p)||!Object.hasOwn(COST,p.type)||!integer(p.dir)||p.dir<0||p.dir>3)throw new TypeError("Invalid layout");
 return Object.fromEntries(Object.entries(layout).map(([k,p])=>[k,{x:p.x,y:p.y,type:p.type,dir:p.dir}]));
}
export function createRun(id,layout=starterLayout(id)){
 const level=getLevel(id);layout=validateLayout(id,layout);
 const cost=layoutCost(layout);if(cost>level.budget)throw new RangeError("예산 초과: "+cost+" / "+level.budget);
 return {levelId:id,tick:0,layout:structuredClone(layout),parcels:[],spawned:[],delivered:[],status:"running",failure:null,reason:"",stalls:0,waits:0,quiet:0,moves:[],cost};
}
const capacity=(s,p)=>s.layout[key(p)]?.type==="buffer"?3:1;
function sourcePiece(level,p){return level.sources.find(source=>at(source,p));}
function outgoing(level,state,parcel){
 const source=sourcePiece(level,parcel),machine=state.layout[key(parcel)];
 if(source)return source.dir;if(!machine)return null;
 if(machine.type==="sorter")return (machine.dir+(parcel.color==="B"?1:parcel.color==="G"?3:0))%4;
 if(machine.type==="gate")return (machine.dir+(parcel.recipe?.[parcel.stage??0]==="repair"?1:0))%4;
 return machine.dir;
}
export function step(current){
 if(current.status!=="running")return structuredClone(current);
 // Copy the bounded schema directly: no generic serialization in the hot tick path.
 const state={...current,layout:Object.fromEntries(Object.entries(current.layout).map(([k,p])=>[k,{...p}])),parcels:current.parcels.map(p=>({...p,...(p.recipe?{recipe:[...p.recipe]}:{})})),spawned:[...current.spawned],delivered:current.delivered.map(p=>({...p})),moves:[]},level=getLevel(current.levelId);state.tick++;
 const overdue=level.orders.find(o=>o.due<state.tick&&!state.delivered.some(d=>d.id===o.id));
 if(overdue){state.status="failed";state.failure="late";state.reason=overdue.id+" · 마감 "+overdue.due+"박자 초과";return state;}
 const stopped=p=>level.maintenance.some(m=>at(m,p)&&state.tick>=m.start&&state.tick<=m.end);
 const occupancy=new Map();for(const p of state.parcels){const k=key(p);occupancy.set(k,(occupancy.get(k)??0)+1);}
 const heads=new Map();for(const p of state.parcels){const k=key(p),previous=heads.get(k);if(!previous||p.arrival<previous.arrival||(p.arrival===previous.arrival&&p.id<previous.id))heads.set(k,p);}
 const reserved=new Map(),proposals=[],order=new Map(level.orders.map((o,i)=>[o.id,i]));
 const candidates=[...heads.values()].sort((a,b)=>Number(b.urgent)-Number(a.urgent)||a.arrival-b.arrival||order.get(a.id)-order.get(b.id));
 let processed=false;
 for(const p of candidates){
  if(stopped(p))continue;
  const station=level.stations?.find(s=>at(s,p));
  if(state.layout[key(p)]?.type==="processor"&&station&&p.recipe?.[p.stage??0]===station.stage){
   p.processing=(p.processing??0)+1;processed=true;
   if(p.processing>=station.duration){p.stage=(p.stage??0)+1;p.processing=0;}
   continue;
  }
  const dir=outgoing(level,state,p);if(dir===null)continue;const d=DIRECTIONS[dir],target={x:p.x+d.x,y:p.y+d.y};
  if(target.x<0||target.y<0||target.x>=level.width||target.y>=level.height||level.blocked.some(b=>at(b,target))){
   state.status="failed";state.failure="route";state.reason=p.id+" · "+(p.x+1)+"열 "+(p.y+1)+"행에서 벽/공장 밖으로 이동";return state;
  }
  if(stopped(target))continue;
  const k=key(target),room=capacity(state,target)-(occupancy.get(k)??0)-(reserved.get(k)??0);
  if(room<=0)continue;
  reserved.set(k,(reserved.get(k)??0)+1);proposals.push({id:p.id,from:{x:p.x,y:p.y},to:target});
 }
 const moved=new Set();
 for(const move of proposals){
  const parcel=state.parcels.find(p=>p.id===move.id),exit=level.exits.find(e=>at(e,move.to));moved.add(parcel.id);
  if(exit){
   if((parcel.stage??0)<(parcel.recipe?.length??0)){state.status="failed";state.failure="unfinished";state.reason=parcel.id+" 공정 미완료: "+(parcel.stage??0)+"/"+parcel.recipe.length;return state;}
   if(exit.color!==parcel.color){state.status="failed";state.failure="misroute";state.reason=parcel.id+" ("+parcel.color+")가 "+exit.color+" 출고구에 도착했습니다.";return state;}
   state.delivered.push({id:parcel.id,color:parcel.color,tick:state.tick,due:parcel.due,urgent:parcel.urgent,...(parcel.recipe?{stage:parcel.stage}: {})});
   state.parcels=state.parcels.filter(p=>p.id!==parcel.id);
  }else{parcel.x=move.to.x;parcel.y=move.to.y;parcel.arrival=state.tick;}
  state.moves.push(move);
 }
 state.waits+=current.parcels.length-moved.size;
 for(const source of level.sources){
  const ready=level.orders.find(o=>o.source===source.id&&o.release<=state.tick&&!state.spawned.includes(o.id));
  if(!ready||state.parcels.some(p=>at(p,source))||stopped(source))continue;
  state.spawned.push(ready.id);state.parcels.push({...ready,...(ready.recipe?{recipe:[...ready.recipe]}:{}),x:source.x,y:source.y,arrival:state.tick});
 }
 if(state.delivered.length===level.orders.length){state.status="won";state.reason="전체 주문 출고 완료";return state;}
 const changed=processed||state.moves.length>0||state.spawned.length>current.spawned.length;
 state.quiet=changed?0:state.quiet+1;if(!changed)state.stalls++;
 const future=level.orders.some(o=>o.release>state.tick)||level.maintenance.some(m=>m.end>=state.tick);
 if(state.tick>=level.maxTicks||state.quiet>=18&&!future){state.status="failed";state.failure=state.quiet>=18?"deadlock":"timeout";state.reason=state.failure==="deadlock"?"18박자 정체 · 빈 칸과 합류 경로를 확인하세요.":"최대 운행 박자 초과";}
 return state;
}
export function runUntilEnd(initial){
 let state=structuredClone(initial);for(let i=0;i<MAX_TICKS&&state.status==="running";i++)state=step(state);return state;
}
export function report(state){
 const level=getLevel(state.levelId),remaining=level.orders.length-state.delivered.length;
 const breakdown={base:5000,time:state.tick*12,equipment:state.cost*15,waiting:state.waits*2};
 const score=state.status==="won"?Math.max(0,breakdown.base-breakdown.time-breakdown.equipment-breakdown.waiting):0;
 const queues=level.sources.map(s=>({...s,waiting:level.orders.filter(o=>o.source===s.id&&o.release<=state.tick&&!state.spawned.includes(o.id)).length}));
 return {won:state.status==="won",tick:state.tick,delivered:state.delivered.length,total:level.orders.length,remaining,cost:state.cost,budget:level.budget,waits:state.waits,score,breakdown,grade:score>=3500?"S":score>=2800?"A":"B",queues,maintenance:level.maintenance.map(m=>({...m,active:state.tick>=m.start&&state.tick<=m.end}))};
}
