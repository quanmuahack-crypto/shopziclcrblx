/* ShopZiCiCRBLX — Dịch vụ Dungeon / Nhẫn
   FIX: Dungeon phải là MỘT CARD nằm trực tiếp trong #serviceGrid,
   không tạo một section riêng bên dưới. Nếu bản cũ còn tồn tại thì xóa sạch
   và dựng lại đúng vị trí trong Dịch vụ cày thuê.
*/
(function(){
  const ID='dungeon-ring-service';
  const PANEL_ID='dungeon-ring-packages';

  function build(){
    const grid=document.getElementById('serviceGrid');
    const services=document.getElementById('services');
    if(!grid || !services) return false;

    /* XÓA MỌI BẢN DUNGEON CŨ, kể cả bản đang nằm ngoài #serviceGrid. */
    document.querySelectorAll('#'+ID+', [data-dungeon-ring="true"], #'+PANEL_ID).forEach(el=>el.remove());

    /* Card Dungeon mới — nằm trực tiếp trong grid Dịch vụ cày thuê. */
    const card=document.createElement('article');
    card.className='card';
    card.id=ID;
    card.dataset.dungeonRing='true';
    card.innerHTML=`
      <div style="font-size:42px">💍</div>
      <h3>DUNGEON & NHẪN</h3>
      <span class="status">Sẵn sàng</span>
      <button class="btn dark full" type="button" id="dungeonViewBtn">XEM GÓI →</button>
    `;
    grid.appendChild(card);

    /* Bảng giá nằm ngay dưới lưới dịch vụ, vẫn thuộc #services. */
    const panel=document.createElement('div');
    panel.id=PANEL_ID;
    panel.className='section';
    panel.style.display='none';
    panel.innerHTML=`
      <style>
        .dr-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px}
        .dr-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e5e9f0;border-radius:12px;padding:12px}
        .dr-item>div{flex:1}.dr-item strong{display:block}.dr-item span{display:block;color:#667085;font-size:13px;margin-top:3px}.dr-item b{white-space:nowrap}
        @media(max-width:700px){.dr-list{grid-template-columns:1fr}.dr-item{flex-wrap:wrap}.dr-item button{width:100%}}
      </style>
      <h2>💍 DỊCH VỤ DUNGEON & NHẪN</h2>
      <p>Chọn gói bạn muốn đặt.</p>
      <div class="dr-list">
        <div class="dr-item"><div><strong>Raid Dungeon 1 lần</strong><span>1 lượt Raid Dungeon</span></div><b>5.000 đ</b><button class="btn dark" data-name="Raid Dungeon 1 lần" data-price="5000">ĐẶT ĐƠN</button></div>
        <div class="dr-item"><div><strong>Raid Dungeons 10 lần</strong><span>10 lượt Raid Dungeons</span></div><b>45.000 đ</b><button class="btn dark" data-name="Raid Dungeons 10 lần" data-price="45000">ĐẶT ĐƠN</button></div>
        <div class="dr-item"><div><strong>Raid Dungeons 100 lần</strong><span>100 lượt Raid Dungeons</span></div><b>350.000 đ</b><button class="btn dark" data-name="Raid Dungeons 100 lần" data-price="350000">ĐẶT ĐƠN</button></div>
        <div class="dr-item"><div><strong>Thức tỉnh Full Control V2</strong><span>Thức tỉnh đầy đủ Control V2</span></div><b>15.000 đ</b><button class="btn dark" data-name="Thức tỉnh Full Control V2" data-price="15000">ĐẶT ĐƠN</button></div>
        <div class="dr-item"><div><strong>2 Nhẫn Mythic</strong><span>Nhận 2 nhẫn Mythic</span></div><b>25.000 đ</b><button class="btn dark" data-name="2 Nhẫn Mythic" data-price="25000">ĐẶT ĐƠN</button></div>
        <div class="dr-item"><div><strong>10 Nhẫn Mythics</strong><span>Nhận 10 nhẫn Mythics</span></div><b>89.000 đ</b><button class="btn dark" data-name="10 Nhẫn Mythics" data-price="89000">ĐẶT ĐƠN</button></div>
        <div class="dr-item"><div><strong>Ghép nhẫn Max + Combo mạnh nhất game</strong><span>Ghép nhẫn Max và combo nhẫn mạnh nhất</span></div><b>60.000 đ</b><button class="btn dark" data-name="Ghép nhẫn Max + Combo mạnh nhất game" data-price="60000">ĐẶT ĐƠN</button></div>
      </div>
    `;
    grid.insertAdjacentElement('afterend',panel);

    card.querySelector('#dungeonViewBtn').onclick=function(){
      const open=panel.style.display!=='none';
      panel.style.display=open?'none':'block';
      this.textContent=open?'XEM GÓI →':'ẨN GÓI ↑';
      if(!open) panel.scrollIntoView({behavior:'smooth',block:'nearest'});
    };

    panel.querySelectorAll('[data-name]').forEach(btn=>{
      btn.addEventListener('click',function(){
        const name=this.dataset.name;
        const price=Number(this.dataset.price);
        if(typeof currentUser==='undefined'||!currentUser){
          if(typeof openAuth==='function') openAuth();
          else alert('Vui lòng đăng nhập trước.');
          return;
        }
        if(typeof refreshBalance==='function') refreshBalance().then(()=>place(name,price));
        else place(name,price);
      });
    });
    return true;
  }

  async function place(name,price){
    if(Number(currentUser.balance||0)<price){
      alert('Số dư không đủ. Vui lòng nạp tiền trước.');
      return;
    }
    try{
      await api('orders',{
        method:'POST',
        headers:{Prefer:'return=minimal'},
        body:JSON.stringify({
          user_id:currentUser.id,
          service_name:'DUNGEON & NHẪN',
          package_name:name,
          price:price,
          status:'pending',
          game_username:'',
          game_password:'',
          extra_data:'Đặt đơn dịch vụ Dungeon & Nhẫn'
        })
      });
      alert('✅ Đã gửi đơn '+name+' lên Admin.');
      if(typeof refreshBalance==='function') await refreshBalance();
    }catch(e){
      alert('Không tạo được đơn: '+(e.message||e));
    }
  }

  function start(){
    if(build()) return;
    setTimeout(start,300);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start);
  else start();
})();