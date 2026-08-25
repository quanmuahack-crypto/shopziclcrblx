(function(){
'use strict';
const PRICES=[800000,650000,650000,500000,500000,432500,425000,417500,413750,410000,402500,402500,395000,387500,380000,365000,350000,350000,335000,320000,312500,305000,297500,275000,245000];
const NAMES=['Dragon — 5.000 Robux','Control — 4.000 Robux','Kitsune — 4.000 Robux','Yeti — 3.000 Robux','Tiger — 3.000 Robux','Spirit — 2.550 Robux','Gas — 2.500 Robux','Venom — 2.450 Robux','Shadow — 2.425 Robux','Dough — 2.400 Robux','T-Rex — 2.350 Robux','Mammoth — 2.350 Robux','Gravity — 2.300 Robux','Blizzard — 2.250 Robux','Pain — 2.200 Robux','Lightning — 2.100 Robux','Phoenix — 2.000 Robux','Portal — 2.000 Robux','Sound — 1.900 Robux','Spider — 1.800 Robux','Creation — 1.750 Robux','Love — 1.700 Robux','Buddha — 1.650 Robux','Quake — 1.500 Robux','Magma — 1.300 Robux'];
function apply(){if(typeof window.catalog==='undefined'||!window.catalog)return false;window.catalog['Trái Vĩnh Viễn BF']=NAMES.map((n,i)=>[n,PRICES[i]]);return true}
apply();
const old=window.openOrder;
window.openOrder=function(name){if(name==='Trái Vĩnh Viễn BF')apply();return old.apply(this,arguments)};
setTimeout(apply,100);setTimeout(apply,500);setTimeout(apply,1500);
})();
