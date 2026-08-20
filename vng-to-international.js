(function(){'use strict';
function esc(v){return String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));}
function money(n){return Number(n||0).toLocaleString('vi-VN')+' đ';}
const GP=[['Fruit Notifier',2700,425000],['Dark Blade',1200,200000],['Mythical Scrolls',500,95000],['2× Money',450,87500],['2× Mastery',450,87500],['+1 Fruit Storage',400,80000],['2× Boss Drops',350,72500],['Fast Boats',350,72500]];
function addCatalog(){if(typeof catalog==='undefined')return;catalog['VNG → Roblox Quốc tế']=[['Treo từ VNG sang Quốc tế — 7 ngày',30000],['Treo từ VNG sang Quốc tế — 30 ngày',165000],['Treo từ VNG sang Quốc tế — Có gộp đơn',20000]];catalog['Robux 120H']=[['2.860 Robux — nhận 2.000 Robux sau thuế',514000],['2.150 Robux — nhận 1.505 Robux sau thuế',387000],['1.430 Robux — nhận 1.000 Robux sau thuế',257000]];catalog['Map 2 GAG2']=[['X2000 Super Syrup Watering Can',60000],['X1000 Super Syrup Sprinkler',60000],['X1 Shadow Dragon',18000],['X1000 Seed Atlantic Giant Pumpkin',240000]];catalog['Grow A Garden 2 Map 1']=[['1000 Super Watering Can',110000],['1000 Super Sprinkler',90000],['100 Dragon Breath',120000],['50 Star Fruit',125000],['150 Moon Bloom',189000],['100 Hypno Bloom',218000],['100 Sun Bloom',100000],['100 Super Watering Can',30000],['100 Super Sprinkler',21000],['1 Mega Ice Serpent Rainbow',400000],['Mega Raccoon',110000],['Mega Black Dragon',350000]];catalog['Dungeon & Nhẫn']=[['Raid Dungeon — 1 lần',5000],['Raid Dungeons — 10 lần',45000],['Raid Dungeons — 100 lần',350000],['Thức tỉnh Full Control V2',15000],['2 Nhẫn Mythic',25000],['10 Nhẫn Mythics',89000],['Ghép nhẫn Max + Combo nhẫn mạnh nhất game',60000]];}
function icons(){const map={'VNG → Roblox Quốc tế':'🎮','Robux 120H':'💰','Map 2 GAG2':'🍁','Grow A Garden 2 Map 1':'🌳','Dungeon & Nhẫn':'💍'};document.querySelectorAll('#serviceGrid .card').forEach(c=>{const h=c.querySelector('h3'),i=c.querySelector('div[style*="font-size:42px"]');if(h&&i&&map[h.textContent.trim()])i.textContent=map[h.textContent.trim()];});}
function cleanOrderModal(){
  const modal=document.getElementById('orderModal');
  if(!modal)return;
  const removeDuplicates=(labelText,keepId)=>{
    const fields=Array.from(modal.querySelectorAll('.field')).filter(f=>{
      const label=f.querySelector('label');
      return label&&label.textContent.trim().toLowerCase().includes(labelText);
    });
    fields.forEach((field,i)=>{if(i>0)field.remove();});
    return modal.querySelector('#'+keepId);
  };
  removeDuplicates('số điện thoại','robloxPhone');
  removeDuplicates('mã hỗ trợ đăng nhập roblox','robloxSupportCode');
}
function gamepass(){
const services=document.getElementById('services');
if(!services||document.getElementById('restored-gamepass'))return;
const s=document.createElement('section');
s.id='restored-gamepass';s.className='section';
s.innerHTML='<h2>🎟️ GAMEPASS BLOX FRUITS</h2><div class="card"><div style="font-size:42px">🎟️</div><h3>GAMEPASS BLOX FRUITS</h3><p>Bấm XEM BẢNG GIÁ để mở danh sách.</p><button class="btn dark full" id="gp-open">XEM BẢNG GIÁ →</button><div id="gp-list" style="display:none;margin-top:15px"></div></div>';
services.appendChild(s);
const list=s.querySelector('#gp-list');
GP.forEach(x=>{
  const d=document.createElement('div');d.className='card';d.style.marginTop='10px';
  d.innerHTML='<b>'+esc(x[0])+'</b><div>'+x[1].toLocaleString('vi-VN')+' Robux — <strong>'+money(x[2])+'</strong></div><button class="btn dark full" style="margin-top:10px">MUA GÓI</button>';
  d.querySelector('button').onclick=()=>openGamepassOrderIsolated(x[0],x[1],x[2]);list.appendChild(d);
});
s.querySelector('#gp-open').onclick=function(){const on=list.style.display==='none';list.style.display=on?'block':'none';this.textContent=on?'ẨN BẢNG GIÁ ↑':'XEM BẢNG GIÁ →';};
if(!document.getElementById('gp-isolated-modal')){
  const m=document.createElement('div');m.id='gp-isolated-modal';m.className='modal';m.innerHTML='<div class="box"><button class="close" type="button">✕</button><h2>🎟️ ĐẶT GAMEPASS BF</h2><div id="gp-isolated-summary" class="msg"></div><div class="field"><label>Username / ID Roblox</label><input id="gp-isolated-user" autocomplete="off" placeholder="Nhập username hoặc ID Roblox"></div><div class="field"><label>Số điện thoại</label><input id="gp-isolated-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Nhập số điện thoại"></div><div class="msg success">Chỉ cần Username/ID Roblox và số điện thoại. Không yêu cầu mật khẩu hoặc mã đăng nhập Roblox.</div><button id="gp-isolated-submit" class="btn dark full" type="button">XÁC NHẬN ĐẶT ĐƠN</button></div>';
  document.body.appendChild(m);
  m.querySelector('.close').onclick=()=>m.classList.remove('show');
  m.querySelector('#gp-isolated-submit').onclick=submitGamepassOrderIsolated;
}
}
function openGamepassOrderIsolated(name,robux,price){
  if(typeof currentUser==='undefined'||!currentUser){if(typeof openAuth==='function')openAuth();else alert('Vui lòng đăng nhập trước.');return;}
  window._gpIso={name,robux,price:Number(price)};
  document.getElementById('gp-isolated-summary').textContent=name+' • '+robux.toLocaleString('vi-VN')+' Robux • '+money(price);
  document.getElementById('gp-isolated-user').value='';document.getElementById('gp-isolated-phone').value='';
  document.getElementById('gp-isolated-modal').classList.add('show');
}
async function submitGamepassOrderIsolated(){
  const o=window._gpIso;if(!o)return;
  const username=document.getElementById('gp-isolated-user').value.trim(),phone=document.getElementById('gp-isolated-phone').value.trim();
  if(!username||!phone)return alert('Vui lòng nhập Username/ID Roblox và số điện thoại.');
  try{
    if(typeof refreshBalance==='function')await refreshBalance();
    if(Number(currentUser.balance||0)<o.price)return alert('Số dư không đủ. Vui lòng nạp tiền trước.');
    await api('orders',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({user_id:currentUser.id,service_name:'GAMEPASS BLOX FRUITS',package_name:o.name+' — '+o.robux+' Robux',price:o.price,status:'pending',game_username:username,game_password:'',extra_data:'Gamepass Blox Fruits • '+o.robux+' Robux • SĐT: '+phone})});
    document.getElementById('gp-isolated-modal').classList.remove('show');alert('✅ Đã gửi đơn Gamepass lên Admin.');
  }catch(e){alert('Không tạo được đơn: '+(e.message||e))}
}
function boot(){addCatalog();if(typeof renderServices==='function')renderServices();icons();cleanOrderModal();gamepass();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,80));else setTimeout(boot,80);
})();
