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
 var iconMap={'VNG → Roblox Quốc tế':'🎮','Robux 120H':'💰','Map 2 GAG2':'🍁','Grow A Garden 2 Map 1':'🌳'};
 document.querySelectorAll('#serviceGrid .card').forEach(function(card){var title=card.querySelector('h3');if(!title)return;var name=title.textContent.trim();var icon=card.querySelector('div[style*="font-size:42px"]');if(icon&&iconMap[name])icon.textContent=iconMap[name];});
}
function buildGamepass(){
 var services=document.getElementById('services');if(!services)return;
 document.querySelectorAll('#gamepass-blox-fruits-service').forEach(function(el){el.remove();});
 var gamepassCatalog=[
  ['Fruit Notifier — 2.700 Robux',405000],['Dark Blade — 1.200 Robux',180000],['Mythical Scrolls — 500 Robux',75000],['2× Money — 450 Robux',67500],['2× Mastery — 450 Robux',67500],['+1 Fruit Storage — 400 Robux',60000],['2× Boss Drops — 350 Robux',52500],['Fast Boats — 350 Robux',52500]
 ];
 var s=document.createElement('section');s.id='gamepass-blox-fruits-service';s.className='section';
 s.innerHTML='<style>#gamepass-blox-fruits-service .gphead{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #e5e9f0;border-radius:16px;padding:18px}.gpinfo{flex:1}.gplist{display:none;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}.gplist.show{display:grid}.gpitem{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e5e9f0;border-radius:14px;padding:14px}.gpitem small{display:block;color:#667085;margin-top:4px}.gpprice{font-weight:900;white-space:nowrap}@media(max-width:700px){.gplist.show{grid-template-columns:1fr}.gpitem{flex-wrap:wrap}.gpitem button{width:100%}}</style><h2>🎟️ GAMEPASS BLOX FRUITS</h2><div class="gphead"><div style="font-size:42px">⚔️</div><div class="gpinfo"><h3 style="margin:0 0 5px">GAMEPASS BLOX FRUITS</h3><p style="margin:0;color:#667085">Bấm XEM BẢNG GIÁ để xem các gamepass.</p></div><button id="gpToggle" class="btn dark" type="button">XEM BẢNG GIÁ →</button></div><div id="gpList" class="gplist"></div>';
 services.appendChild(s);
 var list=s.querySelector('#gpList');gamepassCatalog.forEach(function(p){var parts=p[0].split(' — ');var item=document.createElement('div');item.className='gpitem';item.innerHTML='<div class="gpinfo"><strong>'+esc2(parts[0])+'</strong><small>'+esc2(parts[1]||'')+'</small></div><span class="gpprice">'+Number(p[1]).toLocaleString('vi-VN')+' đ</span><button class="btn dark" type="button">MUA GÓI</button>';item.querySelector('button').onclick=function(){openSpecialOrder('GAMEPASS BLOX FRUITS',p[0],p[1],'Gamepass Blox Fruits');};list.appendChild(item);});
 s.querySelector('#gpToggle').onclick=function(){var open=list.classList.toggle('show');this.textContent=open?'ẨN BẢNG GIÁ ↑':'XEM BẢNG GIÁ →';};
}
var specialOrder=null;
function ensureSpecialFields(){var modal=document.getElementById('orderModal');if(!modal)return;var box=modal.querySelector('.box');if(!document.getElementById('robloxBackup')){var f=document.createElement('div');f.className='field';f.id='robloxBackupField';f.innerHTML='<label>Mã dự phòng</label><input id="robloxBackup" type="text" autocomplete="off" placeholder="Nhập mã dự phòng nếu cần">';var msg=modal.querySelector('.msg');msg?msg.insertAdjacentElement('beforebegin',f):box.appendChild(f);}if(!document.getElementById('specialOrderNote')){var n=document.createElement('div');n.className='field';n.id='specialOrderNote';n.innerHTML='<label>📝 Ghi chú cho Admin</label><textarea id="specialOrderNotes" rows="3" placeholder="Yêu cầu hoặc thông tin thêm cho đơn..."></textarea>';var b=document.getElementById('robloxBackupField');b?b.insertAdjacentElement('afterend',n):box.appendChild(n);}}
function restoreNormal(){var acc=document.getElementById('robloxAccount'),pw=document.getElementById('robloxPassword'),bf=document.getElementById('robloxBackupField'),note=document.getElementById('specialOrderNote');if(acc){acc.type='text';var l=acc.closest('.field')?.querySelector('label');if(l)l.textContent='Tài khoản Roblox';acc.placeholder='';}if(pw){pw.type='password';var l2=pw.closest('.field')?.querySelector('label');if(l2)l2.textContent='Mật khẩu Roblox';pw.placeholder='';}if(bf)bf.style.display='none';if(note)note.style.display='none';}
function prepareSpecial(){ensureSpecialFields();var acc=document.getElementById('robloxAccount'),pw=document.getElementById('robloxPassword');if(acc){var l=acc.closest('.field')?.querySelector('label');if(l)l.textContent='ID / Username Roblox';acc.placeholder='Nhập ID hoặc Username Roblox';}if(pw){pw.type='password';var l2=pw.closest('.field')?.querySelector('label');if(l2)l2.textContent='Mật khẩu Roblox';pw.placeholder='Nhập mật khẩu Roblox';}document.getElementById('robloxBackupField').style.display='block';document.getElementById('specialOrderNote').style.display='block';var msg=document.querySelector('#orderModal .msg');if(msg)msg.innerHTML='🎮 Form riêng cho Gamepass / Trái vĩnh viễn. Vui lòng nhập thông tin cần thiết cho Admin.';}
function openSpecialOrder(service,name,price,extra){if(typeof currentUser==='undefined'||!currentUser){if(typeof openAuth==='function')openAuth();return;}prepareSpecial();specialOrder={service:service,name:name,price:Number(price),extra:extra||''};document.getElementById('orderTitle').textContent='Đặt đơn — '+name;document.getElementById('package').innerHTML='<option value="0">'+esc2(name)+' — '+Number(price).toLocaleString('vi-VN')+' đ</option>';document.getElementById('robloxAccount').value='';document.getElementById('robloxPassword').value='';document.getElementById('robloxBackup').value='';document.getElementById('specialOrderNotes').value='';document.getElementById('orderModal').classList.add('show');}
async function submitSpecial(){if(!specialOrder)return false;if(!currentUser){openAuth();return true;}await refreshBalance();var account=(document.getElementById('robloxAccount').value||'').trim(),password=document.getElementById('robloxPassword').value||'',backup=(document.getElementById('robloxBackup').value||'').trim(),notes=(document.getElementById('specialOrderNotes').value||'').trim();if(!account){alert('Vui lòng nhập ID hoặc Username Roblox.');return true;}if(!password){alert('Vui lòng nhập mật khẩu Roblox.');return true;}if(Number(currentUser.balance||0)<specialOrder.price){alert('Số dư không đủ. Vui lòng nạp tiền và chờ Admin duyệt.');return true;}try{var extra=[specialOrder.extra,'ID / Username Roblox: '+account,backup?'Mã dự phòng: '+backup:'',notes?'Ghi chú: '+notes:''].filter(Boolean).join(' | ');await api('orders',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({user_id:currentUser.id,service_name:specialOrder.service,package_name:specialOrder.name,price:specialOrder.price,status:'pending',game_username:account,game_password:password,account:account,password:password,extra_data:extra})});await refreshBalance();specialOrder=null;restoreNormal();closeOrder();alert('✅ Đơn đã được gửi lên Admin.');}catch(e){alert('Không tạo được đơn: '+(e.message||e));}return true;}
async function renderTop5Fixed(){var el=document.getElementById('top5');if(!el)return;try{var rows=await api('rpc/get_top_depositers',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({p_limit:5})});el.innerHTML=(rows||[]).map(function(x,i){var medal=['🥇','🥈','🥉','🏆','🏆'][i]||'🏆';return '<div class="top-card"><div class="rank">'+medal+' TOP '+(i+1)+'</div><strong>'+esc2(x.username)+'</strong><div>'+Number(x.total_deposit||0).toLocaleString('vi-VN')+' đ</div></div>';}).join('')||'<div class="empty">Chưa có dữ liệu</div>';}catch(e){el.innerHTML='<div class="empty">Không tải được bảng xếp hạng</div>';}}

function installDepositCards(){
 var select=document.getElementById('cardType');
 if(!select)return;
 var providers=[['Viettel','Viettel'],['Zing','Zing'],['Vinaphone','Vinaphone'],['Mobifone','Mobifone'],['Scoin','Scoin'],['Vcoin','Vcoin'],['Garena','Garena']];
 providers.forEach(function(p){if(!Array.from(select.options).some(function(o){return o.value===p[0];})){var o=document.createElement('option');o.value=p[0];o.textContent=p[1];select.appendChild(o);}});
 var p=select.closest('.field');if(p){var old=p.parentElement.querySelector('p.card-provider-note');if(!old){var note=document.createElement('p');note.className='card-provider-note';note.style='color:#667085;font-size:13px;margin:6px 0 0';note.textContent='Hỗ trợ: Viettel, Zing, Vinaphone, Mobifone, Scoin, Vcoin, Garena. Admin kiểm tra và duyệt thủ công.';p.appendChild(note);}}
 var original=window.submitDeposit;
 if(typeof original==='function'){
  window.submitDeposit=async function(){
   var type=document.getElementById('cardType')?.value;
   if(['Vinaphone','Mobifone','Scoin','Vcoin','Garena'].includes(type)){
    var msg=document.getElementById('depositMsg');
    if(!currentUser){openAuth();return;}
    await refreshBalance();
    if(!currentUser){msg.innerHTML='<div class="msg danger">Phiên đăng nhập đã hết. Hãy đăng nhập lại.</div>';return;}
    var serial=document.getElementById('cardSerial').value.trim(),code=document.getElementById('cardCode').value.trim(),amount=Number(document.getElementById('cardAmount').value);
    if(!serial||!code){msg.innerHTML='<div class="msg">Vui lòng nhập Seri và mã thẻ.</div>';return;}
    try{
     var r=await fetch(SUPABASE_URL+'/rest/v1/rpc/submit_deposit_request',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+accessToken,'Content-Type':'application/json'},body:JSON.stringify({p_user_id:currentUser.id,p_card_type:type,p_amount:amount,p_serial:serial,p_card_code:code})});
     var text=await r.text();if(!r.ok)throw Error(text||r.statusText);
     document.getElementById('cardSerial').value='';document.getElementById('cardCode').value='';msg.innerHTML='<div class="msg success">✅ Đã gửi yêu cầu nạp '+esc2(type)+'. Vui lòng chờ Admin duyệt.</div>';
    }catch(e){msg.innerHTML='<div class="msg danger">'+esc2(e.message)+'</div>';}
    return;
   }
   return original.apply(this,arguments);
  };
 }
}

function install(){
 addCatalog();
 if(typeof renderServices==='function')renderServices();
 updateServiceIcons();
 buildGamepass();
 ensureSpecialFields();
 restoreNormal();
 var oldOpen=window.openOrder;window.openOrder=function(name){specialOrder=null;restoreNormal();return oldOpen.apply(this,arguments);};
 var oldClose=window.closeOrder;window.closeOrder=function(){specialOrder=null;restoreNormal();return oldClose.apply(this,arguments);};
 window.openPermanentFruitOrder=function(name,robux,price){openSpecialOrder('TRÁI VĨNH VIỄN BF',name,price,'Trái vĩnh viễn Blox Fruits • '+robux+' Robux');};
 window.openSpecialOrder=openSpecialOrder;
 var oldSubmit=window.submitOrder;window.submitOrder=async function(){if(specialOrder)return submitSpecial();return oldSubmit.apply(this,arguments);};
 installDepositCards();
 setTimeout(renderTop5Fixed,50);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0);});else setTimeout(install,0);
})();
