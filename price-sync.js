(function(){
'use strict';
const SUPABASE_URL='https://ufevipuhejvhiufyqqnz.supabase.co';
const SUPABASE_KEY='sb_publishable_6ShPhvGpN4_02Za2tOTOTg_GF0su_OA';
let syncing=false;
async function syncShopPrices(){
  if(syncing)return;
  syncing=true;
  try{
    const r=await fetch(SUPABASE_URL+'/rest/v1/service_prices?select=service_name,package_name,price,sort_order&order=service_name.asc,sort_order.asc',{method:'GET',cache:'no-store',headers:{apikey:SUPABASE_KEY,Accept:'application/json','Cache-Control':'no-cache'}});
    if(!r.ok)throw new Error('HTTP '+r.status);
    const rows=await r.json();
    if(typeof catalog==='undefined'||!Array.isArray(rows))return;
    const remote=new Map(rows.map(x=>[String(x.service_name)+'\u0000'+String(x.package_name),{price:Number(x.price),sort:Number(x.sort_order||0)}]));
    const merged={};
    Object.keys(catalog).forEach(service=>{
      merged[service]=(catalog[service]||[]).map(x=>{
        const hit=remote.get(service+'\u0000'+x[0]);
        return hit?[x[0],hit.price]:x;
      });
    });
    rows.forEach(x=>{
      const service=String(x.service_name),pkg=String(x.package_name),key=service+'\u0000'+pkg;
      if(!merged[service])merged[service]=[];
      if(!merged[service].some(x=>x[0]===pkg))merged[service].push([pkg,Number(x.price)]);
    });
    Object.keys(catalog).forEach(k=>delete catalog[k]);
    Object.keys(merged).forEach(k=>catalog[k]=merged[k]);
    if(typeof renderServices==='function')renderServices();
    if(typeof window.restoreIcons==='function')window.restoreIcons();
    if(typeof window.bindButtons==='function')window.bindButtons();
    window.dispatchEvent(new CustomEvent('shopPricesSynced'));
  }catch(e){console.warn('Shop price sync:',e)}finally{syncing=false;}
}
window.syncShopPrices=syncShopPrices;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(syncShopPrices,100));
else setTimeout(syncShopPrices,100);
setInterval(syncShopPrices,3000);
})();