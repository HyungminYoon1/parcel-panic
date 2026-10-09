import test from "node:test";
import assert from "node:assert/strict";
import {parseProgress,syncProgress,clearProgress,PROGRESS_KEY,APP_IDS} from "../dist/src/progress.js";
import {loadSave,persistSave,clearSave,SAVE_KEY} from "../dist/src/storage.js";
import {emptySave,SAVE_LIMIT} from "../dist/src/save-model.js";
function storage(){const data=new Map();return {data,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};}
test("shared summary preserves other apps exactly and clear removes only parcel",()=>{
 const stub=storage();globalThis.localStorage=stub;
 try{
  const other={completed:3,total:8,updatedAt:"2026-10-09T00:00:00.000Z"};stub.setItem(PROGRESS_KEY,JSON.stringify({version:1,apps:{"neon-tactics":other}}));
  assert.equal(syncProgress(2,14),true);let shared=JSON.parse(stub.getItem(PROGRESS_KEY));assert.deepEqual(shared.apps["neon-tactics"],other);
  assert.deepEqual(Object.keys(shared.apps["parcel-panic"]).sort(),["completed","total","updatedAt"]);assert.ok(Number.isFinite(Date.parse(shared.apps["parcel-panic"].updatedAt)));
  const before=stub.getItem(PROGRESS_KEY);assert.equal(syncProgress(2,14),true);assert.equal(stub.getItem(PROGRESS_KEY),before);
  stub.setItem("other-private-key","preserve");assert.equal(clearProgress(),true);assert.deepEqual(JSON.parse(stub.getItem(PROGRESS_KEY)),{version:1,apps:{"neon-tactics":other}});assert.equal(stub.getItem("other-private-key"),"preserve");
  assert.equal(APP_IDS.length,15);assert.equal(new Set(APP_IDS).size,15);
 }finally{delete globalThis.localStorage;}
});
test("no view/hint zero-count write or invalid aggregate overwrite",()=>{
 const stub=storage();globalThis.localStorage=stub;
 try{
  assert.equal(syncProgress(0,14),true);assert.equal(stub.data.size,0);
  for(const raw of ["{","x".repeat(8193),JSON.stringify({version:2,apps:{}}),JSON.stringify({version:1,apps:{unknown:{completed:1,total:1,updatedAt:"2026-10-09T00:00:00.000Z"}}})]){stub.setItem(PROGRESS_KEY,raw);assert.equal(syncProgress(1,14),false);assert.equal(stub.getItem(PROGRESS_KEY),raw);}
  for(const [completed,total] of [[-1,14],[15,14],[1.5,14],[1,1001]])assert.equal(syncProgress(completed,total),false);
 }finally{delete globalThis.localStorage;}
});
test("summary rejects prototype keys, extra personal data, invalid dates and count shape",()=>{
 const item={completed:1,total:14,updatedAt:"2026-10-09T00:00:00.000Z"};
 for(const wrong of [{...item,completed:"1"},{...item,updatedAt:"2026-02-30T00:00:00.000Z"},{...item,name:"not allowed"},{...item,total:-1}])assert.throws(()=>parseProgress(JSON.stringify({version:1,apps:{"parcel-panic":wrong}})));
 assert.throws(()=>parseProgress('{"version":1,"apps":{"__proto__":{}}}'));
});
test("private storage is bounded; denial/corruption is recoverable and clear stays scoped",()=>{
 const stub=storage();globalThis.localStorage=stub;
 try{
  assert.equal(loadSave(),null);assert.equal(persistSave(emptySave()),true);assert.deepEqual(loadSave(),emptySave());
  assert.equal(persistSave({payload:"x".repeat(SAVE_LIMIT)}),false);
  stub.setItem("unrelated","keep");assert.equal(clearSave(),true);assert.equal(stub.getItem("unrelated"),"keep");assert.equal(stub.getItem(SAVE_KEY),null);
  stub.setItem(SAVE_KEY,"broken");assert.equal(loadSave(),null);assert.equal(stub.getItem(SAVE_KEY),"broken");
  globalThis.localStorage={getItem(){throw Error("denied");},setItem(){throw Error("quota");},removeItem(){throw Error("denied");}};
  assert.equal(loadSave(),null);assert.equal(persistSave(emptySave()),false);assert.equal(clearSave(),false);assert.equal(syncProgress(1,14),false);assert.equal(clearProgress(),false);
 }finally{delete globalThis.localStorage;}
});
