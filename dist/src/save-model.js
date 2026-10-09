import {contracts,getLevel} from "./levels.js";
import {RULES_VERSION} from "./contracts.js";
import {validateLayout,createRun,runUntilEnd,report} from "./model.js";
import {replayInputs} from "./replay.js";
export const SAVE_LIMIT=131072;
export function emptySave(){return {version:2,rulesVersion:RULES_VERSION,current:0,entries:{}};}
export function decodeSave(raw){
 try{
  if(typeof raw!=="string"||raw.length>SAVE_LIMIT)return null;
  const data=JSON.parse(raw);
  if(data.version!==2||data.rulesVersion!==RULES_VERSION||!data.entries||Array.isArray(data.entries)||Object.keys(data.entries).length>contracts.length)return null;
  getLevel(data.current);const result=emptySave();result.current=data.current;
  for(const [key,value] of Object.entries(data.entries)){
   const id=Number(key);if(String(id)!==key||!value||typeof value.assisted!=="boolean")return null;
   const entry={layout:validateLayout(id,value.layout),assisted:value.assisted};
   if(value.best&&id!==0){
    const layout=validateLayout(id,value.best.layout),state=runUntilEnd(createRun(id,layout));
    if(state.status!=="won")return null;
    entry.best={layout,score:report(state).score};
   }
   result.entries[key]=entry;
  }
  return result;
 }catch{return null;}
}
export function saveLayout(save,id,layout,assisted){
 const next=structuredClone(save);getLevel(id);next.current=id;
 next.entries[id]={...next.entries[id],layout:validateLayout(id,layout),assisted:Boolean(assisted)||id===0};return next;
}
export function recordCompletion(save,replay){
 const result=replayInputs(replay);
 if(result.assisted||replay.levelId===0||result.state?.status!=="won")return save;
 const next=saveLayout(save,replay.levelId,result.layout,false),entry=next.entries[replay.levelId];
 if(!entry.best||result.summary.score>entry.best.score)entry.best={layout:structuredClone(result.layout),score:result.summary.score};
 return next;
}
export function completedCount(save){return Object.values(save.entries).filter(entry=>entry.best).length;}
