(function(){
'use strict';
function esc2(v){return String(v??'').replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m];});}
function addCatalog(){
 if(typeof catalog==='undefined')return;
 catalog['VNG → Roblox Quốc tế']=[['Treo từ VNG sang Quốc tế — 7 ngày',30000],['Treo từ VNG sang Quốc tế — 30 ngày (không gộp đơn)',165000],['Treo từ VNG sang Quốc tế — có gộp đơn',20000]];
 catalog['Robux 120H']=[['(120H) 2.860 Robux (Sau Thuế Nhận - 2.000 Robux)',514000],['(120H) 2.150 Robux (Sau Thuế Nhận - 1.505 Robux)',387000],['(120H) 1.430 Robux (Sau Thuế Nhận - 1.000 Robux)',257000]];
 if(Array.isArray(catalog['Kiếm / Súng / Phụ kiện'])&&!catalog['Kiếm / Súng / Phụ kiện'].some(function(x){return x[0]==='Lấy áo choàng râu đen';}))catalog['Kiếm / Súng / Phụ kiện'].push(['Lấy áo choàng râu đen',90000]);
 catalog['Map 2 GAG2']=[['X2000 Super Syrup Watering Can',60000],['X1000 Super Syrup Sprinkler',60000],['X1 Shadow Dragon (Rồng Đen)',18000],['x1000 Seed Atlantic Giant Pumpkin',240000]];
 catalog['Grow A Garden 2 Map 1']=[['1000 Super Watering Can',110000],['1000 Super Sprinkler',90000],['100 Dragon Breath',120000],['50 Star Fruit',125000],['150 Moon Bloom',189000],['100 Hypno Bloom',218000],['100 Sun Bloom',100000],['100 Super Watering Can',30000],['100 Super Sprinkler',21000],['1 Mega Ice Serpent Rainbow',400000],['Mega Raccoon',110000],['Mega Black Dragon',350000]];
}
function updateServiceIcons(){
 var iconMap={
  'VNG → Roblox Quốc tế':'🎮',
  'Robux 120H':'💰',
  'Map 2 GAG2':'🍁',
  'Grow A Garden 2 Map 1':'🌳'
 };
 var cards=document.querySelectorAll('#serviceGrid .card');
 cards.forEach(function(card){
  var title=card.querySelector('h3');
  if(!title)return;
  var name=title.textContent.trim();
  if(!iconMap[name])return;
  var icon=card.querySelector('div[style*="font-size:42px"]');
  if(icon){icon.textContent=iconMap[name];icon.setAttribute('aria-label',name+' icon');}
 });
}
var specialOrder=null;
function ensureSpecialFields(){
 var modal=document.getElementById('orderModal');if(!modal)return;
 var box=modal.querySelector('.box');
 if(!document.getElementById('robloxBackup')){var f=document.createElement('div');f.className='field';f.id='robloxBackupField';f.innerHTML='<label>Mã dự phòng</label><input id="robloxBackup" type="text" autocomplete="off" placeholder="Nhập mã dự phòng nếu cần">';var msg=modal.querySelector('.msg');msg?msg.insertAdjacentElement('beforebegin',f):box.appendChild(f);}
 if(!document.getElementById('specialOrderNote')){var n=document.createElement('div');n.className='field';n.id='specialOrderNote';n.innerHTML='<label>📝 Ghi chú cho Admin</label><textarea id="specialOrderNotes" rows="3" placeholder="Yêu cầu hoặc thông tin thêm cho đơn..."></textarea>';var b=document.getElementById('robloxBackupField');b?b.insertAdjacentElement('afterend',n):box.appendChild(n);}
}
function restoreNormal(){var acc=document.getElementById('robloxAccount'),pw=document.getElementById('robloxPassword'),bf=document.getElementById('robloxBackupField'),note=document.getElementById('specialOrderNote');if(acc){acc.type='text';var l=acc.closest('.field')?.querySelector('label');if(l)l.textContent='Tài khoản Roblox';acc.placeholder='';}if(pw){pw.type='password';var l2=pw.closest('.field')?.querySelector('label');if(l2)l2.textContent='Mật khẩu Roblox';pw.placeholder='';}if(bf)bf.style.display='none';if(note)note.style.display='none';}
function prepareSpecial(){ensureSpecialFields();var acc=document.getElementById('robloxAccount'),pw=document.getElementById('robloxPassword');if(acc){var l=acc.closest('.field')?.querySelector('label');if(l)l.textContent='ID / Username Roblox';acc.placeholder='Nhập ID hoặc Username Roblox';}if(pw){pw.type='password';var l2=pw.closest('.field')?.querySelector('label');if(l2)l2.textContent='Mật khẩu Roblox';pw.placeholder='Nhập mật khẩu Roblox';}document.getElementById('robloxBackupField').style.display='block';document.getElementById('specialOrderNote').style.display='block';var msg=document.querySelector('#orderModal .msg');if(msg)msg.innerHTML='🎮 Form riêng cho Gamepass / Trái vĩnh viễn. Vui lòng nhập thông tin cần thiết cho Admin.';}
function openSpecialOrder(service,name,price,extra){if(typeof currentUser==='undefined'||!currentUser){if(typeof openAuth==='function')openAuth();return;}prepareSpecial();specialOrder={service:service,name:name,price:Number(price),extra:extra||''};document.getElementById('orderTitle').textContent='Đặt đơn — '+name;document.getElementById('package').innerHTML='<option value="0">'+esc2(name)+' — '+Number(price).toLocaleString('vi-VN')+' đ</option>';document.getElementById('robloxAccount').value='';document.getElementById('robloxPassword').value='';document.getElementById('robloxBackup').value='';document.getElementById('specialOrderNotes').value='';document.getElementById('orderModal').classList.add('show');}
async function submitSpecial(){if(!specialOrder)return false;if(!currentUser){openAuth();return true;}await refreshBalance();var account=(document.getElementById('robloxAccount').value||'').trim(),password=document.getElementById('robloxPassword').value||'',backup=(document.getElementById('robloxBackup').value||'').trim(),notes=(document.getElementById('specialOrderNotes').value||'').trim();if(!account){alert('Vui lòng nhập ID hoặc Username Roblox.');return true;}if(!password){alert('Vui lòng nhập mật khẩu Roblox.');return true;}if(Number(currentUser.balance||0)<specialOrder.price){alert('Số dư không đủ. Vui lòng nạp tiền và chờ Admin duyệt.');return true;}try{var extra=[specialOrder.extra,'ID / Username Roblox: '+account,backup?'Mã dự phòng: '+backup:'',notes?'Ghi chú: '+notes:''].filter(Boolean).join(' | ');await api('orders',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({user_id:currentUser.id,service_name:specialOrder.service,package_name:specialOrder.name,price:specialOrder.price,status:'pending',game_username:account,game_password:password,account:account,password:password,extra_data:extra})});await refreshBalance();specialOrder=null;restoreNormal();closeOrder();alert('✅ Đơn đã được gửi lên Admin.');}catch(e){alert('Không tạo được đơn: '+(e.message||e));}return true;}
function install(){addCatalog();if(typeof renderServices==='function')renderServices();updateServiceIcons();ensureSpecialFields();restoreNormal();var oldOpen=window.openOrder;window.openOrder=function(name){specialOrder=null;restoreNormal();return oldOpen.apply(this,arguments);};var oldClose=window.closeOrder;window.closeOrder=function(){specialOrder=null;restoreNormal();return oldClose.apply(this,arguments);};window.openPermanentFruitOrder=function(name,robux,price){openSpecialOrder('TRÁI VĨNH VIỄN BF',name,price,'Trái vĩnh viễn Blox Fruits • '+robux+' Robux');};var oldSubmit=window.submitOrder;window.submitOrder=async function(){if(specialOrder)return submitSpecial();return oldSubmit.apply(this,arguments);};}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0);});else setTimeout(install,0);
})();
