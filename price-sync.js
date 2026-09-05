(function(){
'use strict';
const SUPABASE_URL='https://ufevipuhejvhiufyqqnz.supabase.co';
const SUPABASE_KEY='sb_publishable_6ShPhvGpN4_02Za2tOTOTg_GF0su_OA';
async function syncShopPrices(){
  try{
    const r=await fetch(SUPABASE_URL+'/rest/v1/service_prices?select=service_name,package_name,price&order=service_name.asc,sort_order.asc',{headers:{apikey:SUPABASE_KEY}});
    if(!r.ok)return;
    const rows=await r.json();
    const map=new Map(rows.map(x=>[x.service_name+'\u0000'+x.package_name,Number(x.price)]));
    if(typeof catalog==='undefined')return;
    Object.keys(catalog).forEach(service=>{
      catalog[service]=catalog[service].map(x=>{
        const key=service+'\u0000'+x[0];
        return map.has(key)?[x[0],map.get(key)]:x;
      });
    });
    if(typeof renderServices==='function')renderServices();
    if(typeof window.render==='function')window.render();
    if(typeof window.restoreIcons==='function')window.restoreIcons();
    if(typeof window.bindButtons==='function')window.bindButtons();
  }catch(e){console.warn('Shop price sync:',e)}
}
setTimeout(syncShopPrices,500);
})();