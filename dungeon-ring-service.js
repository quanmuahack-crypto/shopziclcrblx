(function(){'use strict';
const SERVICE='Kiếm / Súng / Phụ kiện',NAME='Lấy CDK A-Z (đã có Tushita và Yama)',PRICE=20000;
let n=0;
function add(){if(typeof catalog==='undefined'||!catalog||!Array.isArray(catalog[SERVICE]))return false;if(!catalog[SERVICE].some(x=>Array.isArray(x)&&x[0]===NAME))catalog[SERVICE].push([NAME,PRICE]);if(typeof renderServices==='function')renderServices();return true}
function retry(){if(!add()&&n++<200)setTimeout(retry,100)}
function ensureBackupField(){
 const modal=document.getElementById('orderModal');if(!modal)return false;
 const password=document.getElementById('robloxPassword');if(!password)return false;
 if(document.getElementById('robloxBackupCode'))return true;
 const passwordField=password.closest('.field');if(!passwordField)return false;
 const field=document.createElement('div');field.className='field';field.id='robloxBackupField';
 field.innerHTML='<label>Mã dự phòng <b style="color:#b42318">(bắt buộc)</b></label><input id="robloxBackupCode" type="text" autocomplete="off" placeholder="Nhập mã dự phòng Roblox">';
 passwordField.insertAdjacentElement('afterend',field);return true;
}
function patchSubmitOrder(){
 if(typeof window.submitOrder!=='function'||window.__backupPatched)return false;
 const original=window.submitOrder;
 window.submitOrder=async function(){
  ensureBackupField();const backup=document.getElementById('robloxBackupCode');
  if(!backup||!backup.value.trim()){alert('Vui lòng nhập Mã dự phòng Roblox (bắt buộc).');if(backup)backup.focus();return;}
  window.__currentRobloxBackupCode=backup.value.trim();
  try{return await original.apply(this,arguments)}finally{window.__currentRobloxBackupCode=''}
 };
 window.__backupPatched=true;return true;
}
function patchFetch(){
 if(window.__fetchBackupPatched)return;const originalFetch=window.fetch;
 window.fetch=function(input,init){
  try{const url=typeof input==='string'?input:(input&&input.url)||'';const backup=window.__currentRobloxBackupCode;
   if(backup&&url.includes('/rest/v1/orders')&&init&&typeof init.body==='string'){
    const body=JSON.parse(init.body);if(body&&typeof body==='object'){body.extra_data=[body.extra_data||'','Mã dự phòng: '+backup].filter(Boolean).join(' • ');init={...init,body:JSON.stringify(body)}}
   }
  }catch(e){}return originalFetch.apply(this,arguments);
 };window.__fetchBackupPatched=true;
}
function boot(){add();ensureBackupField();patchSubmitOrder();patchFetch();setTimeout(ensureBackupField,300);setTimeout(patchSubmitOrder,500);setTimeout(patchFetch,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
window.addEventListener('load',()=>{setTimeout(boot,300);setTimeout(boot,1000)});
window.addEventListener('click',()=>setTimeout(()=>{ensureBackupField();patchSubmitOrder();patchFetch()},50));
})();
