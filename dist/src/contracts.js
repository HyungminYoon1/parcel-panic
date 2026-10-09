// Authored extension v2. Legacy contracts 1–12 remain unchanged.
export const RULES_VERSION="parcel-2";
const wall=(width,height,open)=>{
 const allowed=new Set(open.map(p=>p.join(","))),out=[];
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(!allowed.has(x+","+y))out.push({x,y});
 return out;
};
const basicOpen=[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[6,4],[6,5]];
export const tutorial={id:0,name:"기본 연습",chapter:0,grade:"연습",width:9,height:7,
 blocked:wall(9,7,basicOpen),sources:[{id:"I1",x:0,y:3,dir:0}],exits:[{id:"R",color:"R",x:6,y:3},{id:"B",color:"B",x:6,y:5}],
 orders:[{id:"T1",source:"I1",color:"R",release:1,due:30,urgent:false},{id:"T2",source:"I1",color:"B",release:7,due:40,urgent:false}],
 maintenance:[],budget:10,maxTicks:60,starter:[{x:1,y:3,type:"belt",dir:0},{x:2,y:3,type:"belt",dir:0},{x:3,y:3,type:"belt",dir:0},{x:4,y:3,type:"belt",dir:0},{x:5,y:3,type:"belt",dir:0},{x:6,y:4,type:"belt",dir:1}],
 brief:"7열 4행에 → 분류기를 놓고 가동하세요. R은 직진, B는 우회전합니다.",hint:"분류기를 고르고 방향 → 상태에서 7열 4행에 설치하세요."};
// The sorting tile must precede the R exit, leaving a turn to the B chute.
tutorial.exits[0].x=7;
tutorial.blocked=wall(9,7,[...basicOpen,[7,3]]);
const processOpen=[];
for(let x=0;x<=8;x++)processOpen.push([x,3]);
for(let y=0;y<=6;y++)processOpen.push([6,y]);
for(let y=0;y<3;y++)processOpen.push([1,y]);
export const processing={id:13,name:"검수 후 포장",chapter:5,grade:"공정",width:9,height:7,
 blocked:wall(9,7,processOpen),sources:[{id:"I1",x:0,y:3,dir:0},{id:"I2",x:1,y:0,dir:1}],
 exits:[{id:"R",color:"R",x:8,y:3},{id:"B",color:"B",x:6,y:6},{id:"G",color:"G",x:6,y:0}],
 stations:[{x:2,y:3,stage:"scan",duration:2},{x:4,y:3,stage:"pack",duration:3}],
 orders:Array.from({length:12},(_,i)=>({id:"Q"+String(i+1).padStart(2,"0"),source:i%2?"I2":"I1",color:["R","G","B"][i%3],release:1+i*6,due:32+i*6,urgent:i%4===0,recipe:["scan","pack"]})),
 maintenance:[],budget:26,maxTicks:180,starter:[],brief:"검수 2박자 → 포장 3박자 → 문자별 출고. 공정 칸에 처리기를 설치하세요.",hint:"검수와 포장은 순서대로 거쳐야 합니다. 공정 앞 버퍼로 두 투입구의 합류를 조절하세요."};
const returnOpen=[];
for(let x=0;x<=10;x++)returnOpen.push([x,3]);
for(let y=0;y<3;y++)returnOpen.push([2,y]);
for(const p of [[5,4],[5,5],[4,5],[3,5],[3,4]])returnOpen.push(p);
for(let y=1;y<=7;y++)returnOpen.push([7,y]);
for(let x=8;x<=10;x++){returnOpen.push([x,1],[x,7]);}
// Extra open bays allow alternate buffers and routing; authored walls stay fixed.
returnOpen.push([1,2],[3,2],[4,2],[6,2],[8,2],[8,4],[8,5],[8,6],[6,4]);
export const returns={id:14,name:"재검수 최종 계약",chapter:5,grade:"최상급",width:11,height:9,
 blocked:wall(11,9,returnOpen),sources:[{id:"I1",x:0,y:3,dir:0},{id:"I2",x:2,y:0,dir:1}],
 exits:[{id:"R",color:"R",x:10,y:3},{id:"B",color:"B",x:10,y:7},{id:"G",color:"G",x:10,y:1}],
 stations:[{x:4,y:3,stage:"scan",duration:2},{x:5,y:5,stage:"repair",duration:3},{x:6,y:3,stage:"pack",duration:2}],
 orders:Array.from({length:24},(_,i)=>({id:"F"+String(i+1).padStart(2,"0"),source:i%2?"I2":"I1",color:["B","R","G","R","B","G"][i%6],release:1+i*4,due:[35,24,30,60,44,45,78,56,66,98,73,80,118,86,92,117,106,108,146,122,127,146,138,140][i],urgent:i%5===0,recipe:i%3===0?["scan","repair","scan","pack"]:["scan","pack"]})),
 maintenance:[{x:6,y:3,start:40,end:45}],budget:49,maxTicks:180,starter:[],rankedCandidate:true,
 brief:"반품은 검수 → 수선 → 재검수 → 포장. 일반 주문과 같은 라인을 사용합니다.",
 hint:"공정 분기기는 다음 공정이 수선인 화물을 우회전시킵니다. 수선 뒤 검수기로 돌아오는 고리와 새 주문의 합류 공간이 필요합니다."};
export const extraContracts=[tutorial,processing,returns];
