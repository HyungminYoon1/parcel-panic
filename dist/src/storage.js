import {decodeSave,SAVE_LIMIT} from "./save-model.js";
export const SAVE_KEY="parcel-panic-save-v2";
// The only private-payload browser storage boundary. Never enumerate the origin.
export function loadSave(){try{return decodeSave(localStorage.getItem(SAVE_KEY));}catch{return null;}}
export function persistSave(save){try{const raw=JSON.stringify(save);if(raw.length>SAVE_LIMIT)return false;localStorage.setItem(SAVE_KEY,raw);return true;}catch{return false;}}
export function clearSave(){try{localStorage.removeItem(SAVE_KEY);return true;}catch{return false;}}
