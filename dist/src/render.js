import {DIRECTIONS,key} from "./model.js";
export const iso=(x,y)=>({x:550+(x-y)*39,y:84+(x+y)*22});
export function cellAt(px,py){const a=(px-550)/39,b=(py-84)/22;return {x:Math.round((a+b)/2),y:Math.round((b-a)/2)};}
const colors={R:"#d9754e",B:"#588cc1",G:"#d2b259"},dark={R:"#a1432d",B:"#37629a",G:"#9a7d2f"};
function diamond(ctx,p,w=37,h=20){ctx.beginPath();ctx.moveTo(p.x,p.y-h);ctx.lineTo(p.x+w,p.y);ctx.lineTo(p.x,p.y+h);ctx.lineTo(p.x-w,p.y);ctx.closePath();}
function box(ctx,p,w=24,h=13,depth=22,top="#398c7c",left="#246b63",right="#195549"){
 ctx.fillStyle=left;ctx.beginPath();ctx.moveTo(p.x-w,p.y);ctx.lineTo(p.x,p.y+h);ctx.lineTo(p.x,p.y+h-depth);ctx.lineTo(p.x-w,p.y-depth);ctx.closePath();ctx.fill();
 ctx.fillStyle=right;ctx.beginPath();ctx.moveTo(p.x,p.y+h);ctx.lineTo(p.x+w,p.y);ctx.lineTo(p.x+w,p.y-depth);ctx.lineTo(p.x,p.y+h-depth);ctx.closePath();ctx.fill();
 ctx.fillStyle=top;diamond(ctx,{x:p.x,y:p.y-depth},w,h);ctx.fill();ctx.strokeStyle="#1f3d3b66";ctx.lineWidth=1;ctx.stroke();
}
function arrow(ctx,p,dir,color="#e8efde",scale=1){
 const d=DIRECTIONS[dir],dx=(d.x-d.y)*16*scale,dy=(d.x+d.y)*9*scale;ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(p.x-dx*.6,p.y-dy*.6);ctx.lineTo(p.x+dx*.8,p.y+dy*.8);ctx.stroke();
 const n=Math.hypot(dx,dy),ux=dx/n,uy=dy/n;ctx.beginPath();ctx.moveTo(p.x+dx*.8-ux*7+uy*4,p.y+dy*.8-uy*7-ux*4);ctx.lineTo(p.x+dx*.8,p.y+dy*.8);ctx.lineTo(p.x+dx*.8-ux*7-uy*4,p.y+dy*.8-uy*7+ux*4);ctx.stroke();
}
export function paint(ctx,{level,layout,state,cursor,tool,dir,progress=1,animation=0,tutorialTarget=false}){
 ctx.clearRect(0,0,1100,700);ctx.fillStyle="#d4d5bb";ctx.fillRect(0,0,1100,700);
 ctx.strokeStyle="#b2bea62a";ctx.lineWidth=1;for(let x=-600;x<1300;x+=72){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+1000,700);ctx.stroke();}
 const shadow=ctx.createRadialGradient(550,330,80,550,330,580);shadow.addColorStop(0,"#47654d20");shadow.addColorStop(1,"#d4d5bb00");ctx.fillStyle=shadow;ctx.fillRect(0,0,1100,700);
 const tiles=[];for(let y=0;y<level.height;y++)for(let x=0;x<level.width;x++)tiles.push({x,y});tiles.sort((a,b)=>a.x+a.y-b.x-b.y||a.x-b.x);
 for(const tile of tiles){const p=iso(tile.x,tile.y);ctx.fillStyle=(tile.x+tile.y)%2?"#dfdec8":"#e4e1ce";diamond(ctx,p);ctx.fill();ctx.strokeStyle="#a5b2986e";ctx.stroke();}
 // Industrial foundation depth and dock roads are backdrop, not extra game cells.
 const south=iso(0,level.height-1),east=iso(level.width-1,level.height-1),north=iso(level.width-1,0);
 ctx.fillStyle="#87997c";ctx.beginPath();ctx.moveTo(south.x-38,south.y);ctx.lineTo(east.x,east.y+22);ctx.lineTo(east.x,east.y+35);ctx.lineTo(south.x-38,south.y+13);ctx.closePath();ctx.fill();
 ctx.fillStyle="#637f68";ctx.beginPath();ctx.moveTo(east.x,east.y+22);ctx.lineTo(north.x+38,north.y);ctx.lineTo(north.x+38,north.y+13);ctx.lineTo(east.x,east.y+35);ctx.closePath();ctx.fill();
 for(const tile of tiles){
  const p=iso(tile.x,tile.y),k=key(tile),blocked=level.blocked.some(b=>b.x===tile.x&&b.y===tile.y),machine=layout[k];
  if(blocked){box(ctx,p,32,18,20,"#b5b69b","#9ea88c","#8f9f83");ctx.strokeStyle="#76886755";ctx.beginPath();ctx.moveTo(p.x-21,p.y-16);ctx.lineTo(p.x+20,p.y-5);ctx.moveTo(p.x-21,p.y-10);ctx.lineTo(p.x+15,p.y+9);ctx.stroke();continue;}
  if(machine){
   const belt=machine.type==="belt";box(ctx,p,34,19,belt?7:machine.type==="buffer"?20:17,belt?"#536b61":machine.type==="buffer"?"#3b8275":"#ce9d43",belt?"#3a5249":machine.type==="buffer"?"#266658":"#ad7d31",belt?"#2c443c":machine.type==="buffer"?"#1e5249":"#8b6728");
   const top={x:p.x,y:p.y-(belt?7:machine.type==="buffer"?20:17)};
   ctx.save();diamond(ctx,top,29,16);ctx.clip();ctx.strokeStyle=belt?"#a0b49a88":"#ecf0cf66";ctx.lineWidth=1;
   const offset=state?.status==="running"?animation%10:0;for(let n=-50;n<60;n+=10){ctx.beginPath();ctx.moveTo(top.x-45+n+offset,top.y-22);ctx.lineTo(top.x+15+n+offset,top.y+22);ctx.stroke();}ctx.restore();
   arrow(ctx,top,machine.dir,belt?"#e5dfbd":"#fff2c6");
   if(machine.type==="buffer"){ctx.fillStyle="#ced8bd";ctx.font="bold 9px monospace";ctx.textAlign="center";ctx.fillText("3",p.x,p.y+11);}
   if(machine.type==="sorter"){ctx.fillStyle="#24473e";ctx.font="bold 8px monospace";ctx.textAlign="center";ctx.fillText("R·B·G",p.x,p.y+9);}
   if(machine.type==="processor"||machine.type==="gate"){ctx.fillStyle="#24473e";ctx.font="bold 10px monospace";ctx.textAlign="center";ctx.fillText(machine.type==="processor"?"⚙":"↱",p.x,p.y+9);}
  }
  const source=level.sources.find(s=>s.x===tile.x&&s.y===tile.y),exit=level.exits.find(e=>e.x===tile.x&&e.y===tile.y);
  if(source||exit){
   box(ctx,p,34,19,28,source?"#47594a":colors[exit.color],source?"#304b3e":dark[exit.color],source?"#1f3a31":"#775f3c");arrow(ctx,{x:p.x,y:p.y-28},source?source.dir:(level.sources[0].dir+2)%4,"#fff4cc");
   ctx.fillStyle=source?"#eff2d7":"#fff4d0";ctx.font="bold 11px sans-serif";ctx.textAlign="center";ctx.fillText(source?"투입 "+source.id:"출고 "+exit.color,p.x,p.y+10);
   if(source){const count=level.orders.filter(o=>o.source===source.id&&o.release<=(state?.tick??0)&&!state?.spawned.includes(o.id)).length;if(count){ctx.fillStyle="#dd7442";ctx.beginPath();ctx.arc(p.x+21,p.y-42,10,0,Math.PI*2);ctx.fill();ctx.fillStyle="#fff";ctx.font="bold 9px monospace";ctx.fillText(count,p.x+21,p.y-39);}}
  }
 }
 for(const station of level.stations??[]){const p=iso(station.x,station.y);ctx.strokeStyle="#643875";ctx.lineWidth=3;diamond(ctx,p,35,20);ctx.stroke();ctx.fillStyle="#48215a";ctx.font="bold 12px sans-serif";ctx.textAlign="center";ctx.fillText(({scan:"검수",repair:"수선",pack:"포장"})[station.stage]+" "+station.duration,p.x,p.y-39);}
 for(const m of level.maintenance){const p=iso(m.x,m.y),active=state&&state.tick>=m.start&&state.tick<=m.end;ctx.strokeStyle=active?"#d45236":"#d8ac49";ctx.lineWidth=3;diamond(ctx,{x:p.x,y:p.y-4},35,20);ctx.stroke();ctx.fillStyle=active?"#a9412d":"#927238";ctx.font="bold 9px monospace";ctx.textAlign="center";ctx.fillText(active?"정지":m.start+"–"+m.end,p.x,p.y+31);}
 const parcels=state?.parcels??[];const counts=new Map();for(const parcel of [...parcels].sort((a,b)=>a.x+a.y-b.x-b.y||a.arrival-b.arrival)){
  const move=state.moves.find(m=>m.id===parcel.id),x=move?move.from.x+(move.to.x-move.from.x)*progress:parcel.x,y=move?move.from.y+(move.to.y-move.from.y)*progress:parcel.y,p=iso(x,y),stack=counts.get(key(parcel))??0;counts.set(key(parcel),stack+1);
  p.y-=9+stack*12;ctx.fillStyle="#263d3444";diamond(ctx,{x:p.x+4,y:p.y+5},16,9);ctx.fill();box(ctx,p,15,9,19,colors[parcel.color],dark[parcel.color],"#765333");
  ctx.strokeStyle="#f4e6bf";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x-7,p.y-23);ctx.lineTo(p.x+7,p.y-15);ctx.stroke();ctx.fillStyle="#fff9dd";ctx.font="bold 10px monospace";ctx.textAlign="center";ctx.fillText(parcel.color+(parcel.urgent?"!":""),p.x,p.y-5);
 }
 if(tutorialTarget){const p=iso(6,3);ctx.strokeStyle='#d68e15';ctx.lineWidth=4;ctx.setLineDash([5,4]);diamond(ctx,p,38,23);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#59401d';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillText('분류기를 놓을 칸',p.x,p.y-47);}
 if(!state&&cursor){const p=iso(cursor.x,cursor.y),legal=!level.blocked.some(b=>b.x===cursor.x&&b.y===cursor.y)&&!level.sources.some(b=>b.x===cursor.x&&b.y===cursor.y)&&!level.exits.some(b=>b.x===cursor.x&&b.y===cursor.y);
  ctx.fillStyle=tool==="erase"?"#dc66334a":"#72b99150";diamond(ctx,p,37,21);ctx.fill();ctx.strokeStyle=legal?"#216f63":"#d8543b";ctx.lineWidth=3;ctx.setLineDash([7,4]);ctx.stroke();ctx.setLineDash([]);if(tool!=="erase")arrow(ctx,{x:p.x,y:p.y-10},dir,legal?"#155e57":"#aa4e36",1.1);
 }
 ctx.textAlign="left";ctx.fillStyle="#52775e";ctx.font="11px monospace";ctx.fillText(level.name,37,42);
 ctx.textAlign="right";ctx.fillText(state?"운반 "+state.parcels.length:"설비 "+Object.keys(layout).length,1062,42);
 ctx.fillStyle="#8e9f8055";ctx.font="10px monospace";ctx.textAlign="center";for(let x=0;x<level.width;x++){const p=iso(x,level.height);ctx.fillText(x+1,p.x,p.y+26);}
 ctx.fillStyle="#52775e";ctx.font="9px monospace";ctx.textAlign="right";if(state)ctx.fillText(state.tick+"박자",1062,657);
}
