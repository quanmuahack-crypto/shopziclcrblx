(function(){
'use strict';

function esc(v){return String(v??'').replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]});}

function addCatalog(){
  if(typeof catalog==='undefined')return;
  catalog['VNG → Roblox Quốc tế']=[['Treo từ VNG sang Quốc tế — 7 ngày',30000],['Treo từ VNG sang Quốc tế — 30 ngày (không gộp đơn)',165000],['Treo từ VNG sang Quốc tế — có gộp đơn',20000]];
  catalog['Robux 120H']=[['(120H) 2.860 Robux (Sau Thuế Nhận - 2.000 Robux)',514000],['(120H) 2.150 Robux (Sau Thuế Nhận - 1.505 Robux)',387000],['(120H) 1.430 Robux (Sau Thuế Nhận - 1.000 Robux)',257000]];
  if(Array.isArray(catalog['Kiếm / Súng / Phụ kiện'])&&!catalog['Kiếm / Súng / Phụ kiện'].some(function(x){return x[0]==='Lấy áo choàng râu đen';}))catalog['Kiếm / Súng / Phụ kiện'].push(['Lấy áo choàng râu đen',90000]);
  catalog['Map 2 GAG2']=[['X2000 Super Syrup Watering Can',60000],['X1000 Super Syrup Sprinkler',60000],['X1 Shadow Dragon (Rồng Đen)',18000],['x1000 Seed Atlantic Giant Pumpkin',240000]];
  catalog['Grow A Garden 2 Map 1']=[['1000 Super Watering Can',110000],['1000 Super Sprinkler',90000],['100 Dragon Breath',120000],['50 Star Fruit',125000],['150 Moon Bloom',189000],['100 Hypno Bloom',218000],['100 Sun Bloom',100000],['100 Super Watering Can',30000],['100 Super Sprinkler',21000],['1 Mega Ice Serpent Rainbow',400000],['Mega Raccoon',110000],['Mega Black Dragon',350000]];
  catalog['GAMEPASS BLOX FRUITS']=[['Fruit Notifier — 2.700 Robux',405000],['Dark Blade — 1.200 Robux',180000],['2× Money — 450 Robux',67500],['2× Mastery — 450 Robux',67500],['+1 Fruit Storage — 400 Robux',60000],['2× Boss Drops — 350 Robux',52500],['Fast Boats — 350 Robux',52500]];
  if(typeof renderServices==='function')renderServices();
}

function buildGamepassSection(){
  var services=document.getElementById('services');
  if(!services)return;
  var old=document.getElementById('gamepass-blox-fruits-service');
  if(old)old.remove();
  var section=document.createElement('section');
  section.id='gamepass-blox-fruits-service';
  section.className='section';
  section.innerHTML=''+
  '<style>'+ 
  '#gamepass-blox-fruits-service{margin-top:22px;background:linear-gradient(135deg,#fff,#f4f7ff)}'+
  '#gamepass-blox-fruits-service .gp-head{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #e5e9f0;border-radius:16px;padding:18px;box-shadow:0 5px 20px #0001}'+
  '#gamepass-blox-fruits-service .gp-icon{width:62px;height:62px;border-radius:15px;background:#111827;color:#fff;display:flex;align-items:center;justify-content:center;font-size:30px;flex:none}'+
  '#gamepass-blox-fruits-service .gp-info{flex:1}#gamepass-blox-fruits-service .gp-info h3{margin:0 0 6px;font-size:23px}#gamepass-blox-fruits-service .gp-info p{margin:0;color:#667085}'+
  '#gamepass-blox-fruits-service .gp-list{display:none;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}'+
  '#gamepass-blox-fruits-service .gp-list.show{display:grid}'+
  '#gamepass-blox-fruits-service .gp-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e5e9f0;border-radius:14px;padding:14px}'+
  '#gamepass-blox-fruits-service .gp-item-info{flex:1}#gamepass-blox-fruits-service .gp-item strong{display:block;font-size:16px}#gamepass-blox-fruits-service .gp-robux{display:block;color:#667085;font-size:13px;margin-top:4px}#gamepass-blox-fruits-service .gp-price{font-weight:900;white-space:nowrap}'+
  '@media(max-width:700px){#gamepass-blox-fruits-service .gp-head{flex-wrap:wrap}#gamepass-blox-fruits-service .gp-list.show{grid-template-columns:1fr}#gamepass-blox-fruits-service .gp-item{flex-wrap:wrap}#gamepass-blox-fruits-service .gp-item button{width:100%}}'+
  '</style>'+ 
  '<h2>🎟️ GAMEPASS BLOX FRUITS</h2>'+ 
  '<div class="gp-head"><div class="gp-icon">🎟️</div><div class="gp-info"><h3>GAMEPASS BLOX FRUITS</h3><p>Nhấn “XEM BẢNG GIÁ” để mở danh sách. Mỗi gói có form đặt đơn riêng.</p></div><button class="btn dark" id="gpViewBtn" type="button">XEM BẢNG GIÁ →</button></div>'+ 
  '<div id="gp-list" class="gp-list">'+
  '<div class="gp-item"><div class="gp-item-info"><strong>Fruit Notifier</strong><span class="gp-robux">2.700 Robux</span></div><span class="gp-price">405.000 đ</span><button class="btn dark" data-gp="0" type="button">MUA</button></div>'+ 
  '<div class="gp-item"><div class="gp-item-info"><strong>Dark Blade</strong><span class="gp-robux">1.200 Robux</span></div><span class="gp-price">180.000 đ</span><button class="btn dark" data-gp="1" type="button">MUA</button></div>'+ 
  '<div class="gp-item"><div class="gp-item-info"><strong>2× Money</strong><span class="gp-robux">450 Robux</span></div><span class="gp-price">67.500 đ</span><button class="btn dark" data-gp="2" type="button">MUA</button></div>'+ 
  '<div class="gp-item"><div class="gp-item-info"><strong>2× Mastery</strong><span class="gp-robux">450 Robux</span></div><span class="gp-price">67.500 đ</span><button class="btn dark" data-gp="3" type="button">MUA</button></div>'+ 
  '<div class="gp-item"><div class="gp-item-info"><strong>+1 Fruit Storage</strong><span class="gp-robux">400 Robux</span></div><span class="gp-price">60.000 đ</span><button class="btn dark" data-gp="4" type="button">MUA</button></div>'+ 
  '<div class="gp-item"><div class="gp-item-info"><strong>2× Boss Drops</strong><span class="gp-robux">350 Robux</span></div><span class="gp-price">52.500 đ</span><button class="btn dark" data-gp="5" type="button">MUA</button></div>'+ 
  '<div class="gp-item"><div class="gp-item-info"><strong>Fast Boats</strong><span class="gp-robux">350 Robux</span></div><span class="gp-price">52.500 đ</span><button class="btn dark" data-gp="6" type="button">MUA</button></div>'+ 
  '</div>';
  services.appendChild(section);
  var view=document.getElementById('gpViewBtn'),list=document.getElementById('gp-list');
  view.onclick=function(){var open=list.classList.toggle('show');view.textContent=open?'ẨN BẢNG GIÁ ↑':'XEM BẢNG GIÁ →';};
  section.querySelectorAll('[data-gp]').forEach(function(btn){
    btn.onclick=function(){
      if(typeof currentUser==='undefined'||!currentUser){if(typeof openAuth==='function')openAuth();return;}
      var i=Number(btn.getAttribute('data-gp'));
      openSafeOrder('GAMEPASS BLOX FRUITS',catalog['GAMEPASS BLOX FRUITS'][i][0],catalog['GAMEPASS BLOX FRUITS'][i][1]);
    };
  });
}

function prepareSpecialModal(){
  var modal=document.getElementById('orderModal');
  if(!modal)return;
  var account=document.getElementById('robloxAccount');
  var password=document.getElementById('robloxPassword');
  if(account){
    account.type='text';
    account.autocomplete='off';
    var lab=account.closest('.field')&&account.closest('.field').querySelector('label');
    if(lab)lab.textContent='ID / Username Roblox';
    account.placeholder='Ví dụ: 123456789 hoặc Username';
  }
  if(password){
    password.type='url';
    password.autocomplete='off';
    password.value='';
    var plab=password.closest('.field')&&password.closest('.field').querySelector('label');
    if(plab)plab.textContent='Link profile Roblox (không bắt buộc)';
    password.placeholder='https://www.roblox.com/users/...';
  }
  var note=document.getElementById('specialOrderNote');
  if(!note){
    note=document.createElement('div');note.className='field';note.id='specialOrderNote';
    note.innerHTML='<label>Ghi chú cho Admin</label><textarea id="specialOrderNotes" rows="3" placeholder="Thông tin thêm cho đơn (nếu có)"></textarea>';
    var msg=modal.querySelector('.msg');
    if(msg)msg.insertAdjacentElement('beforebegin',note);else modal.querySelector('.box').appendChild(note);
  }
}

var specialOrder=null;
function openSafeOrder(service,name,price,extra){
  if(typeof currentUser==='undefined'||!currentUser){if(typeof openAuth==='function')openAuth();return;}
  prepareSpecialModal();
  specialOrder={service:service,name:name,price:Number(price),extra:extra||''};
  var title=document.getElementById('orderTitle'),pkg=document.getElementById('package'),account=document.getElementById('robloxAccount'),profile=document.getElementById('robloxPassword'),notes=document.getElementById('specialOrderNotes');
  if(title)title.textContent='Đặt đơn — '+name;
  if(pkg){pkg.innerHTML='<option value="0">'+esc(name)+' — '+Number(price).toLocaleString('vi-VN')+' đ</option>';pkg.value='0';}
  if(account)account.value='';if(profile)profile.value='';if(notes)notes.value='';
  var msg=document.querySelector('#orderModal .msg');
  if(msg)msg.innerHTML='🛡️ Không cần nhập mật khẩu Roblox hoặc mã dự phòng. Chỉ cần ID/Username và link profile để Admin xử lý.';
  document.getElementById('orderModal').classList.add('show');
}

async function submitSafeOrder(){
  if(!specialOrder)return false;
  if(!currentUser){openAuth();return true;}
  await refreshBalance();
  var account=(document.getElementById('robloxAccount')?.value||'').trim();
  var profile=(document.getElementById('robloxPassword')?.value||'').trim();
  var notes=(document.getElementById('specialOrderNotes')?.value||'').trim();
  if(!account){alert('Vui lòng nhập ID hoặc Username Roblox.');return true;}
  if(Number(currentUser.balance||0)<specialOrder.price){alert('Số dư không đủ. Vui lòng nạp tiền và chờ Admin duyệt.');return true;}
  try{
    var extra=[specialOrder.extra,'ID / Username Roblox: '+account,profile?'Link profile: '+profile:'',notes?'Ghi chú: '+notes:''].filter(Boolean).join(' | ');
    await api('orders',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({user_id:currentUser.id,service_name:specialOrder.service,package_name:specialOrder.name,price:specialOrder.price,status:'pending',game_username:account,game_password:'',account:account,password:'',extra_data:extra})});
    await refreshBalance();
    specialOrder=null;
    closeOrder();
    alert('✅ Đơn đã được gửi lên Admin.');
  }catch(e){alert('Không tạo được đơn: '+(e.message||e));}
  return true;
}

function install(){
  addCatalog();
  if(typeof renderServices==='function')renderServices();
  buildGamepassSection();
  prepareSpecialModal();

  var oldOpenOrder=window.openOrder;
  window.openOrder=function(name){
    if(name==='GAMEPASS BLOX FRUITS'){
      var idx=Number(document.getElementById('package')?.value||0);
      var gp=(catalog['GAMEPASS BLOX FRUITS']||[])[idx]||catalog['GAMEPASS BLOX FRUITS'][0];
      openSafeOrder('GAMEPASS BLOX FRUITS',gp[0],gp[1],'Gamepass Blox Fruits');
      return;
    }
    specialOrder=null;
    if(typeof oldOpenOrder==='function')return oldOpenOrder.apply(this,arguments);
  };

  window.openPermanentFruitOrder=function(name,robux,price){
    openSafeOrder('TRÁI VĨNH VIỄN BF',name,price,'Trái vĩnh viễn Blox Fruits • '+robux+' Robux');
  };

  var oldSubmit=window.submitOrder;
  window.submitOrder=async function(){
    if(specialOrder)return submitSafeOrder();
    return oldSubmit.apply(this,arguments);
  };
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0);});else setTimeout(install,0);
})();