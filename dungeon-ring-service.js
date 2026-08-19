/* ShopZiCiCRBLX — DUNGEON & NHẪN
   Card nằm TRỰC TIẾP trong #serviceGrid.
   Không để bảng Dungeon thành section riêng bên ngoài lưới.
*/
(function(){
  const ID='dungeon-ring-service';
  const PANEL_ID='dungeon-ring-packages';

  function removeOldDungeon(){
    // Xóa các bản cũ do những lần chèn trước tạo ra.
    document.querySelectorAll('#'+ID+', #'+PANEL_ID+', [data-dungeon-ring="true"], [data-dungeon-old="true"]').forEach(el=>el.remove());

    // Xóa section/card Dungeon cũ nếu không có id/data marker nhưng có tiêu đề Dungeon & Nhẫn.
    document.querySelectorAll('#services section, #services article, #services .section').forEach(el=>{
      const text=(el.textContent||'').toLowerCase();
      if(text.includes('dungeon & nhẫn') || text.includes('raid dungeon 1 lần') || text.includes('raid dungeons 100 lần')){
        if(!el.closest('#serviceGrid')) el.remove();
      }
    });
  }

  function build(){
    const grid=document.getElementById('serviceGrid');
    if(!grid) return false;

    removeOldDungeon();
    if(document.getElementById(ID)) return true;

    // Tạo DUY NHẤT một card và đặt thẳng vào lưới Dịch vụ cày thuê.
    const card=document.createElement('article');
    card.className='card';
    card.id=ID;
    card.dataset.dungeonRing='true';
    card.innerHTML=`
      <div style="font-size:42px">💍</div>
      <h3>DUNGEON & NHẪN</h3>
      <span class="status">Sẵn sàng</span>
      <button class="btn dark full" type="button" id="dungeonViewBtn">XEM GÓI →</button>
      <div id="${PANEL_ID}" class="dr-panel" style="display:none;margin-top:14px">
        <div class="dr-list">
          <div class="dr-item"><div><strong>Raid Dungeon 1 lần</strong><span>1 lượt Raid Dungeon</span></div><b>5.000 đ</b><button class="btn dark" data-name="Raid Dungeon 1 lần" data-price="5000">ĐẶT ĐƠN</button></div>
          <div class="dr-item"><div><strong>Raid Dungeons 10 lần</strong><span>10 lượt Raid Dungeons</span></div><b>45.000 đ</b><button class="btn dark" data-name="Raid Dungeons 10 lần" data-price="45000">ĐẶT ĐƠN</button></div>
          <div class="dr-item"><div><strong>Raid Dungeons 100 lần</strong><span>100 lượt Raid Dungeons</span></div><b>350.000 đ</b><button class="btn dark" data-name="Raid Dungeons 100 lần" data-price="350000">ĐẶT ĐƠN</button></div>
          <div class="dr-item"><div><strong>Thức tỉnh Full Control V2</strong><span>Thức tỉnh đầy đủ Control V2</span></div><b>15.000 đ</b><button class="btn dark" data-name="Thức tỉnh Full Control V2" data-price="15000">ĐẶT ĐƠN</button></div>
          <div class="dr-item"><div><strong>2 Nhẫn Mythic</strong><span>Nhận 2 nhẫn Mythic</span></div><b>25.000 đ</b><button class="btn dark" data-name="2 Nhẫn Mythic" data-price="25000">ĐẶT ĐƠN</button></div>
          <div class="dr-item"><div><strong>10 Nhẫn Mythics</strong><span>Nhận 10 nhẫn Mythics</span></div><b>89.000 đ</b><button class="btn dark" data-name="10 Nhẫn Mythics" data-price="89000">ĐẶT ĐƠN</button></div>
          <div class="dr-item"><div><strong>Ghép nhẫn Max + Combo mạnh nhất game</strong><span>Ghép nhẫn Max và combo nhẫn mạnh nhất</span></div><b>60.000 đ</b><button class="btn dark" data-name="Ghép nhẫn Max + Combo mạnh nhất game" data-price="60000">ĐẶT ĐƠN</button></div>
        </div>
      </div>
    `;
    grid.appendChild(card);

    const panel=card.querySelector('#'+PANEL_ID);
    card.querySelector('#dungeonViewBtn').onclick=function(){
      const show=panel.style.display==='none';
      panel.style.display=show?'block':'none';
      this.textContent=show?'ẨN GÓI ↑':'XEM GÓI →';
    };

    card.querySelectorAll('[data-name]').forEach(btn=>{
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

  function addStyle(){
    if(document.getElementById('dungeon-ring-style')) return;
    const s=document.createElement('style');
    s.id='dungeon-ring-style';
    s.textContent=`
      .dr-panel{padding-top:2px}
      .dr-list{display:grid;grid-template-columns:1fr;gap:9px}
      .dr-item{display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #e5e9f0;border-radius:11px;padding:10px}
      .dr-item>div{flex:1;min-width:0}.dr-item strong{display:block}.dr-item span{display:block;color:#667085;font-size:12px;margin-top:2px}.dr-item b{white-space:nowrap}
      .dr-item button{white-space:nowrap}
      @media(max-width:600px){.dr-item{flex-wrap:wrap}.dr-item button{width:100%}}
    `;
    document.head.appendChild(s);
  }

  function start(){
    addStyle();
    if(build()) return;
    setTimeout(start,300);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start);
  else start();
})();