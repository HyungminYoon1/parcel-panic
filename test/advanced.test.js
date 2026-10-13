import test from "node:test";
import assert from "node:assert/strict";
import {advancedWitnesses} from "../tools/advanced-witnesses.mjs";
import {getLevel} from "../dist/src/levels.js";
import {key,createRun,step,runUntilEnd,report,editLayout,starterLayout} from "../dist/src/model.js";
import {newReplay,appendAction,replayInputs,exportReplay,ACTION_LIMIT,RUN_LIMIT} from "../dist/src/replay.js";
import {rankingDefinition,replayRanked,MAX_ACTIONS,MAX_PAYLOAD_BYTES} from "../dist/src/ranked.js";
import {emptySave,saveLayout,decodeSave,recordCompletion,completedCount,SAVE_LIMIT} from "../dist/src/save-model.js";
const layout=id=>Object.fromEntries(advancedWitnesses.find(w=>w.id===id).machines.map(p=>[key(p),{...p}]));
test("ranked rotation rejects coercible noninteger coordinates",()=>{
 const setup={type:"edit",command:{x:1,y:3,type:"belt",dir:0}};
 for(const [x,y] of [["1",3],[1,"3"],[[1],3],[true,3]])
  assert.throws(()=>replayRanked([setup,{type:"rotate",x,y}]),TypeError);
 assert.equal(replayRanked([setup,{type:"rotate",x:1,y:3}]).won,false);
});
const expected={0:[8,15],13:[14,23,28,34,40,47,51,59,64,70,76,83],14:[32,20,26,56,40,42,74,52,62,94,70,76,114,82,88,114,102,104,142,118,124,142,134,136]};
function actualReplay(id,mode="independent",assisted=false){
 let input=newReplay(id,starterLayout(id),mode,assisted),blueprint=starterLayout(id);
 for(const command of advancedWitnesses.find(w=>w.id===id).machines){input=appendAction(input,{type:"edit",command});blueprint=editLayout(id,blueprint,command);}
 input=appendAction(input,{type:"start"});let state=createRun(id,blueprint);
 while(state.status==="running"){input=appendAction(input,{type:"tick"});state=step(state);}
 return {input,state};
}
for(const id of [0,13,14])test("new contract "+id+" legal inputs conserve every parcel and satisfy authored recipe/deadline",()=>{
 const level=getLevel(id),initial=createRun(id,layout(id)),snapshot=JSON.stringify(initial);let s=initial;
 if(id!==0){const detached=step(initial);detached.parcels[0].recipe[0]="changed";assert.equal(level.orders[0].recipe[0],"scan");assert.equal(step(initial).parcels[0].recipe[0],"scan");}
 while(s.status==="running"){
  s=step(s);const ids=[...s.delivered,...s.parcels].map(p=>p.id);
  assert.equal(new Set(ids).size,ids.length);assert.equal(ids.length,s.spawned.length);
  for(const p of s.parcels)assert.ok(s.parcels.filter(q=>key(q)===key(p)).length<=(s.layout[key(p)]?.type==="buffer"?3:1));
 }
 assert.equal(JSON.stringify(initial),snapshot);assert.equal(s.status,"won",s.reason);assert.equal(s.parcels.length,0);assert.equal(s.delivered.length,level.orders.length);
 for(const [i,o] of level.orders.entries()){const d=s.delivered.find(d=>d.id===o.id);assert.equal(d.tick,expected[id][i]);assert.ok(d.tick<=o.due);assert.equal(d.color,o.color);if(o.recipe)assert.equal(d.stage,o.recipe.length);}
 assert.equal(s.cost,level.budget);assert.deepEqual(replayInputs(actualReplay(id).input).state,s);
});
test("return job revisits the same scanner; each full processing tick blocks departure",()=>{
 let s=createRun(14,layout(14));const scans=[],repairs=[];
 while(s.status==="running"){
  const before=s.parcels.find(p=>p.id==="F01");const next=step(s),after=next.parcels.find(p=>p.id==="F01");
  if(before?.x===4&&before.y===3&&(before.stage??0)%2===0&&(before.stage??0)<3){
   assert.deepEqual([after.x,after.y],[4,3]);scans.push([before.stage??0,after.stage??0]);
  }
  if(before?.x===5&&before.y===5&&before.stage===1){assert.deepEqual([after.x,after.y],[5,5]);repairs.push(after.stage);}
  s=next;
 }
 assert.deepEqual(scans,[[0,0],[0,1],[2,2],[2,3]]);assert.deepEqual(repairs,[1,1,2]);
});
test("processing maintenance pauses work on both inclusive boundary ticks",()=>{
 let s=createRun(14,layout(14)),checked=0,entries=0;
 while(s.status==="running"){
  const next=step(s);
  if(next.tick>=40&&next.tick<=45){
   assert.ok(!next.moves.some(m=>m.to.x===6&&m.to.y===3));entries++;
  }
  if([39,44,45].includes(s.tick)){
   // Synthetic boundary fixture: put an active order at its final packing step.
   // Deliveries/score are unchanged; this fixture is never treated as a win.
   const fixture=structuredClone(s),p=fixture.parcels.find(p=>p.due>s.tick+1);assert.ok(p);
   p.x=6;p.y=3;p.stage=p.recipe.length-1;p.processing=1;const out=step(fixture),after=out.parcels.find(q=>q.id===p.id);
   assert.equal(key(after),key(p));assert.equal(after.stage,p.stage+(s.tick===45?1:0));assert.equal(after.processing,s.tick===45?0:1);checked++;
  }
  s=next;
 }
 assert.equal(checked,3);assert.equal(entries,6);
});
test("skipping scanner, packing or return gate cannot ship unfinished work",()=>{
 for(const k of ["4,3","6,3","5,3"]){const bad=layout(14);bad[k].type="belt";const s=runUntilEnd(createRun(14,bad));assert.equal(s.failure,"unfinished");assert.equal(report(s).score,0);}
 const bad=layout(14);bad["5,5"].type="belt";assert.equal(runUntilEnd(createRun(14,bad)).failure,"late");
});
test("return competition needs merge capacity; a cheaper noncritical buffer is a real scoring alternative",()=>{
 const bad=layout(14);bad["3,3"].type="belt";assert.equal(runUntilEnd(createRun(14,bad)).failure,"late");
 const lean=layout(14);lean["3,4"].type="belt";const s=runUntilEnd(createRun(14,lean));assert.equal(s.status,"won");assert.equal(report(s).score,1487);
 const reportBase=report(runUntilEnd(createRun(14,layout(14))));assert.deepEqual(reportBase.breakdown,{base:5000,time:1704,equipment:735,waiting:1104});assert.equal(reportBase.score,1457);
});
test("advanced wrong rotation, overbudget addition and missing route fail through real commands",()=>{
 const wrong=layout(14);wrong["5,5"].dir=1;assert.equal(runUntilEnd(createRun(14,wrong)).failure,"route");
 const expensive=editLayout(14,layout(14),{x:1,y:2,type:"belt",dir:0});assert.throws(()=>createRun(14,expensive),/예산/);
 const missing=editLayout(14,layout(14),{x:3,y:4,type:"erase"});assert.equal(runUntilEnd(createRun(14,missing)).status,"failed");
});
test("actual rotations, erase, undo, redo and reset replay deterministically without snapshots",()=>{
 let r=newReplay(13);for(const a of [{type:"edit",command:{x:1,y:3,type:"buffer",dir:0}},{type:"rotate",x:1,y:3},{type:"undo"},{type:"redo"},{type:"edit",command:{x:1,y:3,type:"erase"}},{type:"undo"},{type:"start"},{type:"tick"},{type:"reset"}])r=appendAction(r,a);
 const out=replayInputs(r);assert.equal(out.layout["1,3"].dir,1);assert.equal(out.state,null);assert.equal(out.runs,1);assert.deepEqual(replayInputs(JSON.parse(exportReplay(r))),out);
});
test("ranked adapter returns exact recomputed result with fixed definition and no client score",()=>{
 const {input}=actualReplay(14,"ranked"),out=replayRanked(input.actions);
 assert.deepEqual(out,{won:true,score:1457,tieBreak:[142,49,552],summary:{delivered:24,total:24,tick:142,cost:49,waits:552}});
 assert.equal(rankingDefinition().levelId,14);assert.equal(rankingDefinition().maxActions,MAX_ACTIONS);
 assert.ok(new TextEncoder().encode(JSON.stringify(input.actions)).length<MAX_PAYLOAD_BYTES);
 assert.deepEqual(replayRanked(input.actions),out);assert.equal(replayRanked([]).won,false);
 assert.throws(()=>replayRanked([{type:"win",score:999999}]));assert.throws(()=>replayRanked([{type:"start",tick:142,delivered:24}]));
 assert.throws(()=>replayRanked([...input.actions,{type:"tick"}]));
});
test("ranked history records undo; fresh attempts do not inherit prior assistance or scores",()=>{
 const {input}=actualReplay(14,"ranked"),setup=input.actions.find(a=>a.type==="edit");
 const actions=[setup,{type:"undo"},...input.actions];assert.equal(replayRanked(actions).score,1457);
 assert.throws(()=>replayRanked([{type:"assist"}]));assert.throws(()=>replayRanked([{type:"reset"}]));
 assert.throws(()=>replayRanked([{type:"start"},{type:"start"}]));
 assert.throws(()=>newReplay(13,{},"ranked"));assert.throws(()=>newReplay(14,layout(14),"ranked"));assert.throws(()=>newReplay(14,{},"ranked",true));
});
test("malformed actions, locked-run edits, invalid cells and payload/work bounds are rejected",()=>{
 for(const actions of [null,{},[null],[{type:"constructor"}],[{type:"tick"}],[{type:"undo"}],[{type:"rotate",x:1,y:3}],[{type:"edit",command:{x:0,y:0,type:"belt",dir:0}}],[{type:"start"},{type:"edit",command:{x:1,y:3,type:"belt",dir:0}}],Array(MAX_ACTIONS+1).fill({type:"clear"}),[{type:"edit",command:{x:1,y:3,type:"belt",dir:0,extra:"x".repeat(MAX_PAYLOAD_BYTES)}}]])assert.throws(()=>replayRanked(actions));
 assert.throws(()=>replayInputs({...newReplay(14),rulesVersion:"old"}));assert.throws(()=>appendAction({...newReplay(14),actions:Array(ACTION_LIMIT).fill({type:"clear"})},{type:"clear"}));
 assert.throws(()=>replayInputs({...newReplay(14),actions:Array.from({length:RUN_LIMIT+1},()=>[{type:"start"},{type:"reset"}]).flat()}));
});
test("save restores blueprint/current, recomputes best, counts unique independent completion only",()=>{
 const {input}=actualReplay(13),won=recordCompletion(emptySave(),input),raw=JSON.stringify(won),restored=decodeSave(raw);
 assert.equal(restored.current,13);assert.equal(completedCount(restored),1);assert.equal(restored.entries[13].best.score,3484);
 const forged=JSON.parse(raw);forged.entries[13].best.score=999999;assert.equal(decodeSave(JSON.stringify(forged)).entries[13].best.score,3484);
 assert.equal(completedCount(recordCompletion(won,input)),1);assert.equal(restored.entries[13].state,undefined);
 const {input:ranked}=actualReplay(14,"ranked");assert.equal(completedCount(recordCompletion(won,ranked)),2);
});
test("hints remain assisted across reset and save; tutorial, view, partial run and practice never count",()=>{
 for(const input of [newReplay(13),actualReplay(0).input,actualReplay(13,"practice").input,actualReplay(13,"independent",true).input])assert.equal(completedCount(recordCompletion(emptySave(),input)),0);
 const hinted=appendAction(appendAction(newReplay(13),{type:"assist"}),{type:"reset"});assert.equal(replayInputs(hinted).assisted,true);
 const save=saveLayout(emptySave(),13,layout(13),true);assert.equal(decodeSave(JSON.stringify(save)).entries[13].assisted,true);assert.equal(completedCount(save),0);
 const lateHint=appendAction(actualReplay(13).input,{type:"assist"});assert.equal(completedCount(recordCompletion(emptySave(),lateHint)),0);
});
test("save validates bounded shapes and rejects fake best wins while retaining overbudget editable drafts",()=>{
 for(const raw of [null,"{",JSON.stringify({version:1})," ".repeat(SAVE_LIMIT+1),JSON.stringify({...emptySave(),current:999}),JSON.stringify({...emptySave(),entries:{"999":{layout:{},assisted:false}}}),JSON.stringify({...emptySave(),entries:{"13":{layout:{},assisted:false,best:{layout:{}}}}})])assert.equal(decodeSave(raw),null);
 assert.equal(decodeSave(JSON.stringify({...emptySave(),entries:JSON.parse('{"__proto__":{}}')})),null);
 const over=editLayout(14,layout(14),{x:1,y:2,type:"belt",dir:0}),saved=decodeSave(JSON.stringify(saveLayout(emptySave(),14,over,false)));
 assert.ok(saved);assert.throws(()=>createRun(14,saved.entries[14].layout),/예산/);
});
