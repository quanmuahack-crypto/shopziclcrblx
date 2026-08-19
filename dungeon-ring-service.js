/* ShopZiCiCRBLX — DUNGEON & NHẪN
   Card nằm trực tiếp trong #serviceGrid.
   Khi bấm ĐẶT ĐƠN sẽ mở form riêng gồm Roblox ID/tài khoản, mật khẩu và mã dự phòng.
*/
(function(){
  const ID='dungeon-ring-service';
  const PANEL_ID='dungeon-ring-packages';
  const MODAL_ID='dungeon-ring-order-modal';
  let selected={name:'',price:0};

  function addCdkExistingSwordsPackage(){
    if(typeof catalog==='undefined') return;
    const service='Kiếm / Súng / Phụ kiện';
    const name='Lấy CDK A-Z (đã có Tushita và Yama)';
    if(!Array.isArray(catalog[service])) return;
    if(!catalog[service].some(x=>Array.isArray(x)&&x[0]===name)){
      catalog[service].push([name,20000]);
      if(typeof renderServices==='function') renderServices();
    }
  }

  function removeOldDungeon(){
    document.querySelectorAll('#'+ID+', #'+PANEL_ID+', [data-dungeon-ring="true"], [data-dungeon-old="true"]').forEach(el=>el.remove());
    document.querySelectorAll('#services section, #services article, #services .section').forEach(el=>{
      const text=(el.textContent||'').toLowerCase();
      if(text.includes('dungeon & nhẫn') || text.includes('raid dungeon 1 lần') || text.includes('raid dungeons 100 lần')){
        if(!el.closest('#serviceGrid')) el.remove();
      }
    });
  }

  function addOrderModal(){
    if(document.getElementById(MODAL_ID)) return;
    const m=document.createElement('div');
    m.id=MODAL_ID;
    m.className='modal';
    m.innerHTML=`
      <div class="box">
        <button class="close" type="button" id="drClose">✕</button>
        <h2>Đặt đơn — DUNGEON & NHẪN</h2>
        <div class="msg">📦 Gói: <b id="drSelectedPackage"></b><br>💰 Giá: <b id="drSelectedPrice"></b></div>
        <div class="field"><label>ID / Tài khoản Roblox</label><input id="drRobloxAccount" autocomplete="off" maxlength="100" placeholder="Nhập ID hoặc tài khoản Roblox"></div>
        <div class="field"><label>Mật khẩu Roblox</label><input id="drRobloxPassword" type="password" autocomplete="off" maxlength="200" placeholder="Nhập mật khẩu Roblox"></div>
        <div class="field"><label>Mã dự phòng Roblox</label><input id="drBackupCode" type="password" autocomplete="off" maxlength="300" placeholder="Nhập mã dự phòng (nếu có)"></div>
        <div class="msg">⚠️ Thông tin này chỉ được gửi kèm đơn để Admin xử lý dịch vụ. Không nhập thông tin không cần thiết.</div>
        <div id="drOrderMsg"></div>
        <button class="btn dark full" type="button" id="drSubmit">ĐẶT ĐƠN</button>
      </div>`;
    document.body.appendChild(m);
    document.getElementById('drClose').onclick=closeModal;
    m.addEventListener('click',e=>{if(e.target===m)closeModal()});
    document.getElementById('drSubmit').onclick=submitDungeonOrder;
  }

  function openModal(name,price){
    if(typeof currentUser==='undefined'||!currentUser){
      if(typeof openAuth==='function') openAuth();
      else alert('Vui lòng đăng nhập trước.');
      return;
    }
    selected={name,price};
    document.getElementById('drSelectedPackage').textContent=name;
    document.getElementById('drSelectedPrice').textContent=Number(price).toLocaleString('vi-VN')+' đ';
    document.getElementById('drRobloxAccount').value='';
    document.getElementById('drRobloxPassword').value='';
    document.getElementById('drBackupCode').value='';
    document.getElementById('drOrderMsg').innerHTML='';
    document.getElementById(MODAL_ID).classList.add('show');
  }

  function closeModal(){
    const m=document.getElementById(MODAL_ID);
    if(m) m.classList.remove('show');
  }

  async function submitDungeonOrder(){
    const msg=document.getElementById('drOrderMsg');
    const account=document.getElementById('drRobloxAccount').value.trim();
    const password=document.getElementById('drRobloxPassword').value;
    const backup=document.getElementById('drBackupCode').value.trim();
    if(!account||!password){
      msg.innerHTML='<div class="msg danger">Vui lòng nhập ID/tài khoản Roblox và mật khẩu.</div>';
      return;
    }
    try{
      if(typeof refreshBalance==='function') await refreshBalance();
      if(!currentUser){
        msg.innerHTML='<div class="msg danger">Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.</div>';
        return;
      }
      if(Number(currentUser.balance||0)<selected.price){
        msg.innerHTML='<div class="msg danger">Số dư không đủ. Vui lòng nạp tiền và chờ Admin duyệt.</div>';
        return;
      }
      const extra='Mã dự phòng Roblox: '+(backup||'Không cung cấp');
      await api('orders',{
        method:'POST',
        headers:{Prefer:'return=minimal'},
        body:JSON.stringify({
          user_id:currentUser.id,
          service_name:'DUNGEON & NHẪN',
          package_name:selected.name,
          price:selected.price,
          status:'pending',
          game_username:account,
          game_password:password,
          extra_data:extra
        })
      });
      closeModal();
      alert('✅ Đã gửi đơn '+selected.name+' lên Admin.');
      if(typeof refreshBalance==='function') await refreshBalance();
    }catch(e){
      msg.innerHTML='<div class="msg danger">Không tạo được đơn: '+escSafe(e.message||e)+'</div>';
    }
  }

  function escSafe(v){return String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]))}

  function build(){
    const grid=document.getElementById('serviceGrid');
    if(!grid) return false;
    removeOldDungeon();
    if(document.getElementById(ID)) return true;
    addOrderModal();

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
      </div>`;
    grid.appendChild(card);

    const panel=card.querySelector('#'+PANEL_ID);
    card.querySelector('#dungeonViewBtn').onclick=function(){
      const show=panel.style.display==='none';
      panel.style.display=show?'block':'none';
      this.textContent=show?'ẨN GÓI ↑':'XEM GÓI →';
    };
    card.querySelectorAll('[data-name]').forEach(btn=>btn.addEventListener('click',function(){openModal(this.dataset.name,Number(this.dataset.price))}));
    return true;
  }

  function addStyle(){
    if(document.getElementById('dungeon-ring-style')) return;
    const s=document.createElement('style');
    s.id='dungeon-ring-style';
    s.textContent=`
      .dr-panel{padding-top:2px}.dr-list{display:grid;grid-template-columns:1fr;gap:9px}
      .dr-item{display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #e5e9f0;border-radius:11px;padding:10px}
      .dr-item>div{flex:1;min-width:0}.dr-item strong{display:block}.dr-item span{display:block;color:#667085;font-size:12px;margin-top:2px}.dr-item b{white-space:nowrap}.dr-item button{white-space:nowrap}
      @media(max-width:600px){.dr-item{flex-wrap:wrap}.dr-item button{width:100%}}
    `;
    document.head.appendChild(s);
  }

  function start(){
    addCdkExistingSwordsPackage();
    addStyle();
    if(build()) return;
    setTimeout(start,300)
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();