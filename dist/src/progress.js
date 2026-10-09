export const PROGRESS_KEY="web-lab-progress-v1";
export const APP_IDS=Object.freeze(["data-mirage","echo-vault","light-route","logic-foundry","neon-tactics","orbit-courier","packet-journey","parcel-panic","pixel-kitchen","pocket-city","route-race","sense-lab","swarm-garden","think-forge","traffic-lab"]);
const own="parcel-panic",LIMIT=8192;
export function parseProgress(raw){
 if(raw===null)return {version:1,apps:{}};
 if(typeof raw!=="string"||raw.length>LIMIT)throw new TypeError("Invalid summary");
 const value=JSON.parse(raw);
 if(value?.version!==1||!value.apps||Array.isArray(value.apps)||Object.keys(value.apps).length>15)throw new TypeError("Invalid summary");
 if(Object.keys(value).some(k=>!["version","apps"].includes(k)))throw new TypeError("Invalid summary fields");
 const apps={};
 for(const [id,item] of Object.entries(value.apps)){
  if(!APP_IDS.includes(id)||!item||!Number.isInteger(item.completed)||!Number.isInteger(item.total)||item.completed<0||item.total<item.completed||item.total>1000||typeof item.updatedAt!=="string"||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(item.updatedAt)||!Number.isFinite(Date.parse(item.updatedAt))||new Date(item.updatedAt).toISOString()!==item.updatedAt)throw new TypeError("Invalid summary");
  if(Object.keys(item).some(k=>!["completed","total","updatedAt"].includes(k)))throw new TypeError("Invalid summary fields");
  apps[id]={completed:item.completed,total:item.total,updatedAt:item.updatedAt};
 }
 return {version:1,apps};
}
export function syncProgress(completed,total){
 try{
  if(!Number.isInteger(completed)||!Number.isInteger(total)||completed<0||completed>total||total>1000)return false;
  const value=parseProgress(localStorage.getItem(PROGRESS_KEY)),previous=value.apps[own];
  if(previous?.completed===completed&&previous?.total===total)return true;
  if(completed===0){if(!previous)return true;delete value.apps[own];}
  else value.apps[own]={completed,total,updatedAt:new Date().toISOString()};
  localStorage.setItem(PROGRESS_KEY,JSON.stringify(value));return true;
 }catch{return false;}
}
export function clearProgress(){return syncProgress(0,14);}
