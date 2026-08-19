(function(){'use strict';
function esc(v){return String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));}
function money(n){return Number(n||0).toLocaleString('vi-VN')+' đ';}
function addCatalog(){
 if(typeof catalog==='undefined')return;
 catalog['VNG → Roblox Quốc tế']=[['Treo từ VNG sang Quốc tế — 7 ngày',30000],['Treo từ VNG sang Quốc tế — 30 ngày',165000],['Treo từ VNG sang Quốc tế — Có gộp đơn',20000]];
 catalog['Robux 120H']=[['2.860 Robux — nhận 2.000 Robux sau thuế',514000],['2.150 Robux — nhận 1.505 Robux sau thuế',387000],['1.430 Robux — nhận 1.000 Robux sau thuế',257000]];
 catalog['Map 2 GAG2']=[['X2000 Super Syrup Watering Can',60000],['X1000 Super Syrup Sprinkler',60000],['X1 Shadow Dragon',18000],['X1000 Seed Atlantic Giant Pumpkin',240000]];
 catalog['Grow A Garden 2 Map 1']=[['1000 Super Watering Can',110000],['1000 Super Sprinkler',90000],['100 Dragon Breath',120000],['50 Star Fruit',125000],['150 Moon Bloom',189000],['100 Hypno Bloom',218000],['100 Sun Bloom',100000],['100 Super Watering Can',30000],['100 Super Sprinkler',21000],['1 Mega Ice Serpent Rainbow',400000],['Mega Raccoon',110000],['Mega Black Dragon',350000]];
 catalog['Dungeon & Nhẫn']=[['Raid Dungeon — 1 lần',5000],['Raid Dungeons — 10 lần',45000],['Raid Dungeons — 100 lần',350000],['Thức tỉnh Full Control V2',15000],['2 Nhẫn Mythic',25000],['10 Nhẫn Mythics',89000],['Ghép nhẫn Max + Combo nhẫn mạnh nhất game',60000]];
}
function icons(){const map={'VNG → Roblox Quốc tế':'🎮','Robux 120H':'💰','Map 2 GAG2':'🍁','Grow A Garden 2 Map 1':'🌳','Dungeon & Nhẫn':'💍'};document.querySelectorAll('#serviceGrid .card').forEach(c=>{const h=c.querySelector('h3'),i=c.querySelector('div[style*="font-size:42px"]');if(h&&i&&map[h.textContent.trim()])i.textContent=map[h.textContent.trim()];});}
function gamepass(){const services=document.getElementById('services');if(!services||document.getElementById('restored-gamepass'))return;const s=document.createElement('section');s.id='restored-gamepass';s.className='section';s.innerHTML='<h2>🎟️ GAMEPASS BLOX FRUITS</h2><div class="card"><div style="font-size:42px">🎟️</div><h3>GAMEPASS BLOX FRUITS</h3><p>Bấm XEM BẢNG GIÁ để mở danh sách.</p><button class="btn dark full" id="gp-open">XEM BẢNG GIÁ →</button><div id="gp-list" style="display:none;margin-top:15px"></div></div></section>';services.appendChild(s);const data=[['Fruit Notifier',2700,405000],['Dark Blade',1200,180000],['Mythical Scrolls',500,75000],['2× Money',450,67500],['2× Mastery',450,67500],['+1 Fruit Storage',400,60000],['2× Boss Drops',350,52500],['Fast Boats',350,52500]];const list=s.querySelector('#gp-list');data.forEach(x=>{const d=document.createElement('div');d.className='card';d.style.marginTop='10px';d.innerHTML='<b>'+esc(x[0])+'</b><div>'+x[1].toLocaleString('vi-VN')+' Robux — <strong>'+money(x[2])+'</strong></div><button class="btn dark full" style="margin-top:10px">MUA GÓI</button>';d.querySelector('button').onclick=()=>safeOrder('GAMEPASS BLOX FRUITS',x[0]+' — '+x[1]+' Robux',x[2]);list.appendChild(d);});s.querySelector('#gp-open').onclick=function(){const on=list.style.display==='none';list.style.display=on?'block':'none';this.textContent=on?'ẨN BẢNG GIÁ ↑':'XEM BẢNG GIÁ →';};}
function safeOrder(service,pkg,price){if(typeof currentUser==='undefined'||!currentUser){if(typeof openAuth==='function')openAuth();return;}if(typeof catalog!=='undefined'){catalog.__TEMP__=[[pkg,price]];selectedService='__TEMP__';const title=document.getElementById('orderTitle');if(title)title.textContent='Đặt đơn — '+pkg;const sel=document.getElementById('package');if(sel)sel.innerHTML='<option value="0">'+esc(pkg)+' — '+money(price)+'</option>';const modal=document.getElementById('orderModal');if(modal)modal.classList.add('show');}}
function dungeonInsideMain(){document.querySelectorAll('#dungeon-ring-service,#dungeon-service-standalone').forEach(x=>x.remove());}
function addPhoneField(){
 const box=document.querySelector('#orderModal .box');
 if(!box||document.getElementById('customerPhone'))return;
 const btn=box.querySelector('button[onclick="submitOrder()"]');
 const wrap=document.createElement('div');
 wrap.className='field';
 wrap.innerHTML='<label>📱 Số điện thoại hỗ trợ</label><input id="customerPhone" type="tel" inputmode="numeric" autocomplete="tel" maxlength="15" placeholder="Nhập số điện thoại của bạn">';
 if(btn)box.insertBefore(wrap,btn);else box.appendChild(wrap);
}
function addSupportNoteField(){
 const box=document.querySelector('#orderModal .box');
 if(!box||document.getElementById('loginSupportNote'))return;
 const password=document.getElementById('robloxPassword')||box.querySelector('input[type="password"]');
 if(!password)return;
 const field=document.createElement('div');
 field.className='field';
 field.innerHTML='<label>🔐 Mã hỗ trợ đăng nhập</label><input id="loginSupportNote" type="text" autocomplete="off" maxlength="100" placeholder="Không nhập mã dự phòng Roblox tại đây">';
 const passwordField=password.closest('.field');
 if(passwordField)passwordField.insertAdjacentElement('afterend',field);else password.insertAdjacentElement('afterend',field);
}
function patchSubmitOrder(){
 if(typeof window.submitOrder!=='function'||window.submitOrder.__phonePatched)return;
 const original=window.submitOrder;
 async function submitOrderWithPhone(){
   const phone=(document.getElementById('customerPhone')?.value||'').trim();
   if(!phone){alert('Vui lòng nhập số điện thoại để shop hỗ trợ đơn hàng.');return;}
   if(!/^0\d{8,14}$/.test(phone)){alert('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.');return;}
   const supportNote=(document.getElementById('loginSupportNote')?.value||'').trim();
   window.__customerPhone=phone;
   window.__loginSupportNote=supportNote;
   try{
     const oldApi=window.api;
     if(typeof oldApi!=='function')return original();
     window.api=async function(path,opt={}){
       if(path==='orders'&&opt?.body){
         try{
           const data=JSON.parse(opt.body);
           let extra=data.extra_data||'';
           extra+=(extra?' • ':'')+'SĐT hỗ trợ: '+phone;
           if(supportNote)extra+=' • Mã hỗ trợ đăng nhập: '+supportNote;
           data.extra_data=extra;
           opt={...opt,body:JSON.stringify(data)};
         }catch(e){}
       }
       return oldApi(path,opt);
     };
     await original();
   }finally{window.api=oldApi;}
 }
 submitOrderWithPhone.__phonePatched=true;
 window.submitOrder=submitOrderWithPhone;
}
function boot(){addCatalog();if(typeof renderServices==='function')renderServices();icons();gamepass();dungeonInsideMain();addPhoneField();addSupportNoteField();patchSubmitOrder();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,80));else setTimeout(boot,80);
window.addEventListener('load',()=>setTimeout(()=>{addPhoneField();addSupportNoteField();patchSubmitOrder();},250));
const observer=new MutationObserver(()=>{addPhoneField();addSupportNoteField();patchSubmitOrder();});
observer.observe(document.documentElement,{childList:true,subtree:true});
})();
