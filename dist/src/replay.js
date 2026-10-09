import {getLevel} from "./levels.js";
import {RULES_VERSION} from "./contracts.js";
import {validateLayout,starterLayout,editLayout,createRun,step,report,HISTORY_LIMIT} from "./model.js";
export const ACTION_LIMIT=2048,RUN_LIMIT=8,REPLAY_LIMIT=200000;
export function newReplay(levelId,layout=starterLayout(levelId),mode="independent",assisted=false){
 if(!["independent","practice","ranked"].includes(mode)||typeof assisted!=="boolean")throw new TypeError("Invalid mode");
 if(mode==="ranked"&&(!getLevel(levelId).rankedCandidate||assisted||JSON.stringify(layout)!==JSON.stringify(starterLayout(levelId))))throw new TypeError("Ranked starts from authored layout");
 return {version:1,rulesVersion:RULES_VERSION,levelId,mode,assisted:assisted||levelId===0||mode==="practice",initialLayout:validateLayout(levelId,layout),actions:[]};
}
export function appendAction(replay,action){
 if(replay.actions.length>=ACTION_LIMIT)throw new RangeError("리플레이 한도: 새 시도를 시작하세요.");
 return {...replay,actions:[...replay.actions,structuredClone(action)]};
}
// Rebuild every outcome from inputs; no score, parcel or completion fields are accepted.
export function replayInputs(input){
 if(!input||input.version!==1||input.rulesVersion!==RULES_VERSION||!Array.isArray(input.actions)||input.actions.length>ACTION_LIMIT||JSON.stringify(input).length>REPLAY_LIMIT)throw new TypeError("Invalid replay");
 if(Object.keys(input).some(k=>!["version","rulesVersion","levelId","mode","assisted","initialLayout","actions"].includes(k)))throw new TypeError("Unknown replay field");
 const seed=newReplay(input.levelId,input.initialLayout,input.mode,input.assisted);
 let layout=seed.initialLayout,state=null,assisted=seed.assisted,runs=0,past=[],future=[];
 for(const action of input.actions){
  if(!action||typeof action!=="object")throw new TypeError("Invalid action");
  const fields=action.type==="edit"?["type","command"]:action.type==="rotate"?["type","x","y"]:["type"];
  if(Object.keys(action).some(k=>!fields.includes(k)))throw new TypeError("Unknown action field");
  if(action.type==="edit"&&(!action.command||Object.keys(action.command).some(k=>!["x","y","type","dir"].includes(k))))throw new TypeError("Unknown command field");
  switch(action.type){
   case "edit": case "rotate": {
    if(state)throw new TypeError("Cannot edit a run");
    const command=action.type==="rotate"?(()=>{const p=layout[action.x+","+action.y];if(!p)throw new TypeError("Missing machine");return {...p,dir:(p.dir+1)%4};})():action.command;
    past.push(layout);if(past.length>HISTORY_LIMIT)past.shift();future=[];layout=editLayout(input.levelId,layout,command);break;
   }
   case "undo": if(state||!past.length)throw new TypeError("Invalid undo");future.push(layout);layout=past.pop();break;
   case "redo": if(state||!future.length)throw new TypeError("Invalid redo");past.push(layout);layout=future.pop();break;
   case "clear": if(state)throw new TypeError("Cannot clear a run");past.push(layout);if(past.length>HISTORY_LIMIT)past.shift();future=[];layout=starterLayout(input.levelId);break;
   case "start": if(state||++runs>RUN_LIMIT)throw new TypeError("Run limit");state=createRun(input.levelId,layout);break;
   case "tick": if(!state||state.status!=="running")throw new TypeError("Invalid tick");state=step(state);break;
   case "reset": state=null;past=[];future=[];break;
   case "assist": if(input.mode==="ranked")throw new TypeError("Ranked assistance");assisted=true;break;
   default: throw new TypeError("Unknown action");
  }
 }
 return {layout,state,assisted,runs,summary:state?report(state):null,eligible:input.mode==="ranked"&&!assisted&&state?.status==="won"};
}
export function exportReplay(input){replayInputs(input);return JSON.stringify(input);}
