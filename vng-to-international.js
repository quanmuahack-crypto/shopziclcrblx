(function(){'use strict';
const theme=document.createElement('link');theme.rel='stylesheet';theme.href='purple-theme.css';document.head.appendChild(theme);
function esc(v){return String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));}
function money(n){return Number(n||0).toLocaleString('vi-VN')+' đ';}
const GP=[];
const ICON={'VNG → Roblox Quốc tế':'🤖','Robux 120H':'💎','UGPHONE GVIP':'💎','UGPHONE SVIP':'👑','Trái Ác Quỷ Blox Fruits (Hàng Trade)':'🍎'};
const AVATAR={};
const LEGACY={'Leviathan':'🌊','Level':'📈','Combo Tộc V4':'⚡','Tộc Draco':'🐉','Kiếm / Súng / Phụ kiện':'⚔️','Beli & Frag':'💰'};
const SPECIAL={'UGPHONE GVIP':'ugphone','UGPHONE SVIP':'ugphone','Robux 120H':'robux'};
function addCatalog(){if(typeof catalog==='undefined')return;
catalog['Tộc Draco']=[['Lấy Tộc Rồng A-Z Full Gear',150000],['Lấy tộc rồng (Free V2 V3)',24000],['Lấy súng rồng (Free 250 thông thạo)',26000],['Full đai',18000],['1 bánh răng tộc rồng',15000],['Full gear tộc rồng',36000],['Lấy kiếm rồng + súng rồng (Free mastery)',30000],['Lấy kiếm rồng (Free 350 mastery)',16000]];
catalog['VNG → Roblox Quốc tế']=[['Treo từ VNG sang Quốc tế — 7 ngày',30000],['Treo từ VNG sang Quốc tế — 30 ngày',165000],['Treo từ VNG sang Quốc tế — Có gộp đơn',20000]];
catalog['Robux 120H']=[['2.860 Robux — nhận 2.000 Robux sau thuế',514000],['2.150 Robux — nhận 1.505 Robux sau thuế',387000],['1.430 Robux — nhận 1.000 Robux sau thuế',257000]];
delete catalog['Map 2 GAG2'];delete catalog['Grow A Garden 2 Map 1'];
delete catalog['Dungeon & Nhẫn'];
delete catalog['Trái Vĩnh Viễn BF'];
delete catalog['GAMEPASS BLOX FRUITS'];
catalog['UGPHONE GVIP']=[['GVIP 2 ngày',30000],['GVIP 5 ngày',35000],['GVIP 7 ngày',40000],['GVIP 10 ngày',55000],['GVIP 15 ngày',75000],['GVIP 30 ngày',150000]];
catalog['UGPHONE SVIP']=[['SVIP 7 ngày',100000],['SVIP 15 ngày',160000],['SVIP 30 ngày',250000]];
catalog['Trái Ác Quỷ Blox Fruits (Hàng Trade)']=[['Skin Werewolf Fruit (Tiger Tím) — Có Sẵn X1 — Hàng Cực Hiếm Khó Tìm',155000],['Skin Fiend Fruit (Yeti Đỏ) — Hàng Cực Hiếm Khó Tìm',120000],['Skin Divine Portal Fruit (Portal Vàng) — Hàng Cực Hiếm Khó Tìm',190000],['Skin Red Lightning Fruit (Lôi Đỏ) — Hàng Cực Hiếm Khó Tìm',255000],['Skin Green Lightning Fruit (Lôi Xanh Lá Cây)',50000],['Skin Yellow Lightning Fruit (Lôi Vàng) — Hàng Cực Hiếm Khó Tìm',200000],['Skin Purple Lightning Fruit (Lôi Tím) — Hàng Cực Hiếm Khó Tìm',550000],['Skin Ember Dragon Fruit (West) — Hàng Cực Hiếm Khó Tìm',650000],['Skin Kit Empyrean Fruit (Galaxy) — Hàng Cực Hiếm Khó Tìm',1000000],['Dragon (hàng West)',200000],['Dragon (hàng East)',180000]];
}
function avatar(name){return AVATAR[name]?'<img class="service-avatar" src="'+AVATAR[name]+'" alt="'+esc(name)+'">':'<div style="font-size:42px">'+(ICON[name]||LEGACY[name]||'🎮')+'</div>';}
function bindButtons(){const grid=document.getElementById('serviceGrid');if(!grid)return;grid.querySelectorAll('.card').forEach(card=>{const h=card.querySelector('h3'),b=card.querySelector('button');if(!h||!b)return;const name=h.textContent.trim();if(!catalog[name])return;b.onclick=()=>SPECIAL[name]?specialOpen(name):(typeof openOrder==='function'?openOrder(name):null);});}
function specialOpen(name){if(typeof currentUser==='undefined'||!currentUser){if(typeof openAuth==='function')openAuth();return;}window.openOrder(name);}
function render(){const grid=document.getElementById('serviceGrid');if(!grid)return;Object.keys(ICON).forEach(name=>{if(!catalog[name]||[...grid.querySelectorAll('h3')].some(h=>h.textContent.trim()===name))return;const c=document.createElement('article');c.className='card';const note=name==='Trái Ác Quỷ Blox Fruits (Hàng Trade)'?'<div class="msg" style="font-size:12px;line-height:1.4;margin:8px 0">Shop sẽ cố gắng duyệt trong 12 giờ tất cả trái ae đặt nên ae cứ yên tâm</div>':'<span class="status">Sẵn sàng</span>';c.innerHTML=avatar(name)+'<h3>'+esc(name)+'</h3>'+note+'<button class="btn dark full" type="button">XEM GÓI →</button>';grid.appendChild(c);});bindButtons();}
function boot(){addCatalog();if(typeof renderServices==='function')renderServices();render();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,80));else setTimeout(boot,80);
function isGamepass(name){return false}function isFruit(name){return false}function isRobux(name){return /robux\s*120h/i.test(name||'')}function isUG(name){return /ugphone/i.test(name||'')}
window.setOrderFields=function(name){const gp=false,fruit=false,robux=isRobux(name),ug=isUG(name),special=robux||ug;const roblox=document.getElementById('robloxAccountField'),pass=document.getElementById('robloxPasswordField'),phone=document.getElementById('robloxPhoneField'),support=document.getElementById('robloxSupportField'),ugfield=document.getElementById('ugphoneAccountField');if(!roblox||!pass||!phone||!support||!ugfield)return;roblox.style.display=ug?'none':'';pass.style.display=special?'none':'';support.style.display=special?'none':'';phone.style.display='';ugfield.style.display=ug?'':'none';};
const oldOpenOrder=window.openOrder;
window.openOrder=function(name){selectedService=name;const modal=document.getElementById('orderModal'),title=document.getElementById('orderTitle'),sel=document.getElementById('package');if(!modal||!sel||!catalog[name])return typeof oldOpenOrder==='function'?oldOpenOrder(name):null;if(title)title.textContent='Đặt đơn — '+name;sel.innerHTML=catalog[name].map((x,i)=>'<option value="'+i+'">'+esc(x[0])+' — '+money(x[1])+'</option>').join('');window.setOrderFields(name);modal.classList.add('show');};
})();