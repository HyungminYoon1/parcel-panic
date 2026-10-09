import {performance} from "node:perf_hooks";
import {advancedWitnesses} from "./advanced-witnesses.mjs";
import {createRun,step,key} from "../dist/src/model.js";
import {replayRanked} from "../dist/src/ranked.js";
const machines=advancedWitnesses.find(w=>w.id===14).machines;
const actions=machines.map(command=>({type:"edit",command}));actions.push({type:"start"});
let state=createRun(14,Object.fromEntries(machines.map(p=>[key(p),p])));
while(state.status==="running"){actions.push({type:"tick"});state=step(state);}
for(let i=0;i<10;i++)replayRanked(actions);
const ms=[];for(let i=0;i<50;i++){const begin=performance.now();replayRanked(actions);ms.push(performance.now()-begin);}ms.sort((a,b)=>a-b);
console.log(JSON.stringify({evidence:"LOCAL_NODE_ONLY_NOT_WORKER",actions:actions.length,bytes:Buffer.byteLength(JSON.stringify(actions)),p50ms:ms[25],p95ms:ms[47],maxMs:ms.at(-1),result:replayRanked(actions)},null,2));
