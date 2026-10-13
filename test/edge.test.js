import test from "node:test";
import assert from "node:assert/strict";
import {starterLayout,editLayout,createRun,step,key,HISTORY_LIMIT} from "../dist/src/model.js";
import {newReplay,replayInputs,ACTION_LIMIT,RUN_LIMIT} from "../dist/src/replay.js";
import {replayRanked,MAX_ACTIONS} from "../dist/src/ranked.js";
import {emptySave,SAVE_LIMIT} from "../dist/src/save-model.js";
import {persistSave,loadSave,SAVE_KEY} from "../dist/src/storage.js";
import {advancedWitnesses} from "../tools/advanced-witnesses.mjs";
const edit=(dir=0)=>({type:"edit",command:{x:1,y:3,type:"belt",dir}});
const replay=actions=>({...newReplay(13),actions});

test("edge: edit coordinate and direction types reject without changing blueprint",()=>{
 const initial=starterLayout(13),before=structuredClone(initial);
 for(const n of [-1,Infinity,-Infinity,NaN,0.5,"1",null,[],{}]){
  assert.throws(()=>editLayout(13,initial,{x:n,y:3,type:"belt",dir:0}));
  assert.throws(()=>editLayout(13,initial,{x:1,y:3,type:"belt",dir:n}));
  assert.deepEqual(initial,before);
 }
});
test("edge: new edit after undo invalidates redo and keeps selected branch",()=>{
 const actions=[edit(),{type:"rotate",x:1,y:3},{type:"undo"},edit(2)];
 const out=replayInputs(replay(actions));assert.equal(out.layout["1,3"].dir,2);
 assert.throws(()=>replayInputs(replay([...actions,{type:"redo"}])));
 assert.equal(replayInputs(replay(actions)).layout["1,3"].dir,2);
});
test("edge: history ceiling drops oldest undo and bounds redo sequence",()=>{
 const actions=Array.from({length:HISTORY_LIMIT+1},(_,i)=>edit(i%4));
 const restored=replayInputs(replay([...actions,...Array(HISTORY_LIMIT).fill({type:"undo"})]));
 assert.equal(restored.layout["1,3"].dir,0);
 assert.throws(()=>replayInputs(replay([...actions,...Array(HISTORY_LIMIT+1).fill({type:"undo"})])));
 const redone=replayInputs(replay([...actions,...Array(HISTORY_LIMIT).fill({type:"undo"}),...Array(HISTORY_LIMIT).fill({type:"redo"})]));
 assert.equal(redone.layout["1,3"].dir,0);
});
test("edge: exact action and start ceilings are legal; one beyond fails",()=>{
 assert.equal(replayInputs(replay(Array(ACTION_LIMIT).fill({type:"clear"}))).state,null);
 assert.throws(()=>replayInputs(replay(Array(ACTION_LIMIT+1).fill({type:"clear"}))));
 assert.equal(replayRanked(Array(MAX_ACTIONS).fill({type:"clear"})).won,false);
 assert.throws(()=>replayRanked(Array(MAX_ACTIONS+1).fill({type:"clear"})));
 const runs=Array.from({length:RUN_LIMIT},()=>[{type:"start"},{type:"reset"}]).flat();
 assert.equal(replayInputs(replay(runs)).runs,RUN_LIMIT);
 assert.throws(()=>replayInputs(replay([...runs,{type:"start"}])));
});
test("edge: independent waiting oracle and terminal ticks preserve real deliveries",()=>{
 const machines=advancedWitnesses.find(w=>w.id===13).machines;
 let s=createRun(13,Object.fromEntries(machines.map(p=>[key(p),p]))),waiting=0;
 while(s.status==="running"){
  const next=step(s),moved=new Set(next.moves.map(m=>m.id));
  waiting+=s.parcels.filter(p=>!moved.has(p.id)).length;assert.equal(next.waits,waiting);
  s=next;
 }
 assert.equal(s.status,"won");assert.equal(s.delivered.length,12);
 const before=structuredClone(s);for(let i=0;i<20;i++)assert.deepEqual(step(s),before);
});
test("edge: corrupt oversized private loads preserve stored bytes",()=>{
 const previous=Object.getOwnPropertyDescriptor(globalThis,"localStorage");
 try{
  for(const raw of ["{"," ".repeat(SAVE_LIMIT+1)]){
   const values=new Map([[SAVE_KEY,raw],["neon-tactics-save-v2","keep"]]);globalThis.localStorage={getItem:k=>values.get(k)??null};
   assert.equal(loadSave(),null);assert.equal(values.get(SAVE_KEY),raw);assert.equal(values.get("neon-tactics-save-v2"),"keep");
  }
 }finally{if(previous)Object.defineProperty(globalThis,"localStorage",previous);else delete globalThis.localStorage;}
});
test("edge: private write must confirm readback before claiming durability",()=>{
 const previous=Object.getOwnPropertyDescriptor(globalThis,"localStorage"),save=emptySave(),before=structuredClone(save);
 try{
  for(const getItem of [()=>null,()=>"older",()=>{throw Error("read denied");}]){
   globalThis.localStorage={setItem(){},getItem};assert.equal(persistSave(save),false,"unconfirmed private write must fail");
  }
  assert.deepEqual(save,before);
 }finally{if(previous)Object.defineProperty(globalThis,"localStorage",previous);else delete globalThis.localStorage;}
});
