/* ShopZiCiCRBLX — Dịch vụ Dungeon / Nhẫn */
(function(){
  const service = document.createElement('section');
  service.id='dungeon-ring-service';
  service.className='section';
  service.innerHTML=`
<style>
.dr-card{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #e5e9f0;border-radius:16px;padding:18px;box-shadow:0 5px 20px #0000000d}
.dr-icon{width:58px;height:58px;border-radius:14px;background:#f3e8ff;display:flex;align-items:center;justify-content:center;font-size:32px;flex:none}
.dr-info{flex:1}.dr-info h3{margin:0 0 5px;font-size:22px}.dr-info p{margin:0;color:#667085}
.dr-packages{display:none;margin-top:14px;padding:16px;border:1px solid #e5e9f0;border-radius:14px;background:#fafbff}
.dr-packages.show{display:block}.dr-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px}
.dr-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e5e9f0;border-radius:12px;padding:12px}.dr-item>div{flex:1}.dr-item strong{display:block}.dr-item span{display:block;color:#667085;font-size:13px;margin-top:3px}.dr-item b{white-space:nowrap}
@media(max-width:700px){.dr-list{grid-template-columns:1fr}.dr-item{flex-wrap:wrap}.dr-item button{width:100%}}
</style>
<h2>💍 DỊCH VỤ DUNGEON & NHẪN</h2>
<div class="dr-card"><div class="dr-icon">💍</div><div class="dr-info"><h3>DUNGEON & NHẪN</h3><p>7 dịch vụ Dungeon, Control V2 và nhẫn Mythic.</p></div><button class="btn dark" type="button" id="dr-toggle">XEM GÓI →</button></div>
<div id="dr-packages" class="dr-packages">
<h3>💍 Danh sách dịch vụ</h3><div class="dr-list">
<div class="dr-item"><div><strong>Raid Dungeon 1 lần</strong><span>1 lượt Raid Dungeon</span></div><b>5.000 đ</b><button class="btn dark" type="button" data-name="Raid Dungeon 1 lần" data-price="5000">ĐẶT ĐƠN</button></div>
<div class="dr-item"><div><strong>Raid Dungeons 10 lần</strong><span>10 lượt Raid Dungeons</span></div><b>45.000 đ</b><button class="btn dark" type="button" data-name="Raid Dungeons 10 lần" data-price="45000">ĐẶT ĐƠN</button></div>
<div class="dr-item"><div><strong>Raid Dungeons 100 lần</strong><span>100 lượt Raid Dungeons</span></div><b>350.000 đ</b><button class="btn dark" type="button" data-name="Raid Dungeons 100 lần" data-price="350000">ĐẶT ĐƠN</button></div>
<div class="dr-item"><div><strong>Thức tỉnh Full Control V2</strong><span>Thức tỉnh đầy đủ Control V2</span></div><b>15.000 đ</b><button class="btn dark" type="button" data-name="Thức tỉnh Full Control V2" data-price="15000">ĐẶT ĐƠN</button></div>
<div class="dr-item"><div><strong>2 Nhẫn Mythic</strong><span>Nhận 2 nhẫn Mythic</span></div><b>25.000 đ</b><button class="btn dark" type="button" data-name="2 Nhẫn Mythic" data-price="25000">ĐẶT ĐƠN</button></div>
<div class="dr-item"><div><strong>10 Nhẫn Mythics</strong><span>Nhận 10 nhẫn Mythics</span></div><b>89.000 đ</b><button class="btn dark" type="button" data-name="10 Nhẫn Mythics" data-price="89000">ĐẶT ĐƠN</button></div>
<div class="dr-item"><div><strong>Ghép nhẫn Max + Combo mạnh nhất game</strong><span>Ghép nhẫn Max và combo nhẫn mạnh nhất</span></div><b>60.000 đ</b><button class="btn dark" type="button" data-name="Ghép nhẫn Max + Combo mạnh nhất game" data-price="60000">ĐẶT ĐƠN</button></div>
</div></div>`;
  function insert(){
    const anchor=document.getElementById('ordersSection')||document.getElementById('ugphone-services');
    if(anchor) anchor.parentNode.insertBefore(service,anchor);
    const toggle=service.querySelector('#dr-toggle'), box=service.querySelector('#dr-packages');
    toggle.onclick=()=>box.classList.toggle('show');
    service.querySelectorAll('[data-name]').forEach(btn=>btn.addEventListener('click',()=>{
      const name=btn.dataset.name, price=Number(btn.dataset.price);
      if(typeof currentUser==='undefined'||!currentUser){ if(typeof openAuth==='function') openAuth(); else alert('Vui lòng đăng nhập trước.'); return; }
      if(typeof refreshBalance==='function') refreshBalance().then(()=>place(name,price)); else place(name,price);
    }));
  }
  async function place(name,price){
    if(Number(currentUser.balance||0)<price){alert('Số dư không đủ. Vui lòng nạp tiền trước.');return;}
    try{
      await api('orders',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({user_id:currentUser.id,service_name:'DUNGEON & NHẪN',package_name:name,price,status:'pending',game_username:'',game_password:'',extra_data:'Đặt đơn dịch vụ Dungeon & Nhẫn'})});
      alert('✅ Đã gửi đơn '+name+' lên Admin.');
      if(typeof refreshBalance==='function') await refreshBalance();
    }catch(e){alert('Không tạo được đơn: '+(e.message||e));}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',insert); else insert();
})();
