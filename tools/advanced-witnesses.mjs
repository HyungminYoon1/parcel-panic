const p=(x,y,type="belt",dir=0)=>({x,y,type,dir});
export const advancedWitnesses=[
 {id:0,machines:[p(1,3),p(2,3),p(3,3),p(4,3),p(5,3),p(6,3,"sorter"),p(6,4,"belt",1)]},
 {id:13,machines:[p(1,1,"belt",1),p(1,2,"belt",1),p(1,3,"buffer"),p(2,3,"processor"),p(3,3,"buffer"),p(4,3,"processor"),p(5,3),p(6,3,"sorter"),p(7,3),p(6,4,"belt",1),p(6,5,"belt",1),p(6,2,"belt",3),p(6,1,"belt",3)]},
 {id:14,machines:[p(1,3),p(2,1,"belt",1),p(2,2,"belt",1),p(2,3,"buffer"),p(3,3,"buffer"),p(4,3,"processor"),p(5,3,"gate"),p(5,4,"buffer",1),p(5,5,"processor",2),p(4,5,"belt",2),p(3,5,"belt",3),p(3,4,"buffer",3),p(6,3,"processor"),p(7,3,"sorter"),p(8,3),p(9,3),p(7,4,"belt",1),p(7,5,"belt",1),p(7,6,"belt",1),p(7,7),p(8,7),p(9,7),p(7,2,"belt",3),p(7,1),p(8,1),p(9,1)]}
];
