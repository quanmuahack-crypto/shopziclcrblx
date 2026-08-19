(function(){
'use strict';
const SERVICE='Kiếm / Súng / Phụ kiện';
const NAME='Lấy CDK A-Z (đã có Tushita và Yama)';
const PRICE=20000;
function add(){
  if(typeof catalog==='undefined'||!catalog||!Array.isArray(catalog[SERVICE])) return false;
  if(!catalog[SERVICE].some(x=>Array.isArray(x)&&x[0]===NAME)) catalog[SERVICE].push([NAME,PRICE]);
  if(typeof renderServices==='function') renderServices();
  return true;
}
let tries=0;
function waitForCatalog(){
  if(add()) return;
  tries++;
  if(tries<200) setTimeout(waitForCatalog,100);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',waitForCatalog); else waitForCatalog();
window.addEventListener('load',function(){ setTimeout(waitForCatalog,300); setTimeout(waitForCatalog,1000); });
})();
