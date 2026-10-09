import {RULES_VERSION} from "./contracts.js";
import {newReplay,replayInputs} from "./replay.js";
export {RULES_VERSION};
export const CHALLENGE_ID="rework-final-v2";
export const MAX_ACTIONS=512,MAX_PAYLOAD_BYTES=48*1024;
export function rankingDefinition(){return {game:"parcel-panic",rulesVersion:RULES_VERSION,challengeId:CHALLENGE_ID,title:"재검수 최종 계약 · 24건 · 예산 49",maxActions:MAX_ACTIONS,levelId:14};}
export function replayRanked(actions){
 if(!Array.isArray(actions)||actions.length>MAX_ACTIONS||new TextEncoder().encode(JSON.stringify(actions)).length>MAX_PAYLOAD_BYTES)throw new TypeError("Ranked action bounds");
 if(actions.filter(a=>a?.type==="start").length>1||actions.some(a=>a?.type==="reset"||a?.type==="assist"))throw new TypeError("Start a fresh ranked attempt");
 const result=replayInputs({...newReplay(14,{},"ranked"),actions});
 const summary=result.summary;
 return {won:result.state?.status==="won",score:summary?.score??0,tieBreak:[summary?.tick??0,summary?.cost??0,summary?.waits??0],summary:{delivered:summary?.delivered??0,total:24,tick:summary?.tick??0,cost:summary?.cost??0,waits:summary?.waits??0}};
}
