export type Land={id:string;slug:string;name:string;region:"Littoral"|"Centre";zone:string;access:string;roadDistanceM:number|null;pricePerSqm:number;area:number|null;availability:"available"|"reserved"|"sold";editorial:"draft"|"published"|"archived";featured?:boolean};
export const lands:Land[]=[
 {id:"OH-001",slug:"missole-pk33",name:"Missolé PK33",region:"Littoral",zone:"Côté Douala",access:"À 400 m de la route",roadDistanceM:400,pricePerSqm:6000,area:null,availability:"available",editorial:"draft",featured:true},
 {id:"OH-002",slug:"missole-pk36",name:"Missolé PK36",region:"Littoral",zone:"Côté Douala",access:"À 100 m de la route",roadDistanceM:100,pricePerSqm:7000,area:null,availability:"available",editorial:"draft",featured:true},
 {id:"OH-003",slug:"missole-pk30-acces-8-km",name:"Missolé PK30 — accès 8 km",region:"Littoral",zone:"Côté Douala",access:"À 8 km de la route",roadDistanceM:8000,pricePerSqm:2500,area:null,availability:"available",editorial:"draft"},
 {id:"OH-004",slug:"missole-pk30-acces-4-km",name:"Missolé PK30 — accès 4 km",region:"Littoral",zone:"Côté Douala",access:"À 4 km de la route",roadDistanceM:4000,pricePerSqm:4500,area:null,availability:"available",editorial:"draft"},
 {id:"OH-005",slug:"mangoule-pk36",name:"Mangoulé PK36",region:"Littoral",zone:"Côté Douala",access:"À 800 m de la route",roadDistanceM:800,pricePerSqm:4000,area:null,availability:"available",editorial:"draft",featured:true},
 {id:"OH-006",slug:"mfou",name:"Mfou",region:"Centre",zone:"Mfou",access:"Non loin de la route — distance à confirmer",roadDistanceM:null,pricePerSqm:4000,area:null,availability:"available",editorial:"draft"},
 {id:"OH-007",slug:"eloumdem-2-yaounde",name:"Eloumdem 2, Yaoundé",region:"Centre",zone:"Yaoundé",access:"En bordure d’une route non goudronnée",roadDistanceM:0,pricePerSqm:15000,area:null,availability:"available",editorial:"draft",featured:true},
 {id:"OH-008",slug:"ekoko",name:"Ekoko",region:"Centre",zone:"Ekoko",access:"À 400 m de la route",roadDistanceM:400,pricePerSqm:10000,area:null,availability:"available",editorial:"draft"},
 {id:"OH-009",slug:"mbankomo",name:"Mbankomo",region:"Centre",zone:"Mbankomo",access:"Distance à la route à confirmer",roadDistanceM:null,pricePerSqm:4000,area:null,availability:"available",editorial:"draft"}
];
export const fcfa=(n:number)=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA/m²";
export const whatsapp=(label?:string)=>`https://wa.me/237640235310?text=${encodeURIComponent(`Bonjour OHANA HOME, je souhaite obtenir des informations${label?` sur le terrain ${label}`:" sur vos terrains"}.`)}`;
