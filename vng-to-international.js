(function(){
  const MAP2_AVATAR='./images/map-2-gag2.svg?v=20260818';
  const MAP1_GAG2_AVATAR='./images/grow-a-garden-2-map-1.svg?v=20260818';
  const BLOX_AVATAR='./images/blox-fruits-avatar.jpg?v=20260818';
  function addVngService(){if(typeof catalog==='undefined'||typeof renderServices!=='function')return;catalog['VNG → Roblox Quốc tế']=[['Treo từ VNG sang Quốc tế — 7 ngày',30000],['Treo từ VNG sang Quốc tế — 30 ngày (không gộp đơn)',165000],['Treo từ VNG sang Quốc tế — có gộp đơn',20000]];renderServices()}
  function addAvatarService(){if(typeof catalog==='undefined'||typeof renderServices!=='function')return;catalog['Robux 120H']=[['(120H) 2.860 Robux (Sau Thuế Nhận - 2.000 Robux)',514000],['(120H) 2.150 Robux (Sau Thuế Nhận - 1.505 Robux)',387000],['(120H) 1.430 Robux (Sau Thuế Nhận - 1.000 Robux)',257000]];renderServices()}
  function addBlackbeardCape(){if(typeof catalog==='undefined'||typeof renderServices!=='function')return;const key='Kiếm / Súng / Phụ kiện';if(Array.isArray(catalog[key])&&!catalog[key].some(x=>x[0]==='Lấy áo choàng râu đen')){catalog[key].push(['Lấy áo choàng râu đen',90000]);renderServices()}}
  function addMap2Gag2(){if(typeof catalog==='undefined'||typeof renderServices!=='function')return;catalog['Map 2 GAG2']=[['X2000 Super Syrup Watering Can',60000],['X1000 Super Syrup Sprinkler',60000],['X1 Shadow Dragon (Rồng Đen)',18000],['x1000 Seed Atlantic Giant Pumpkin',240000]];renderServices();setTimeout(applyServiceImages,0);setTimeout(applyServiceImages,300);setTimeout(applyServiceImages,1000)}
  function addGrowAGardenMap1(){if(typeof catalog==='undefined'||typeof renderServices!=='function')return;catalog['Grow A Garden 2 Map 1']=[['1000 Super Watering Can',110000],['1000 Super Sprinkler',90000],['100 Dragon Breath',120000],['50 Star Fruit',125000],['150 Moon Bloom',189000],['100 Hypno Bloom',218000],['100 Sun Bloom',100000],['100 Super Watering Can',30000],['100 Super Sprinkler',21000],['1 Mega Ice Serpent Rainbow',400000],['Mega Raccoon',110000],['Mega Black Dragon',350000]];renderServices();setTimeout(applyServiceImages,0);setTimeout(applyServiceImages,300);setTimeout(applyServiceImages,1000)}
  function addGamepassBloxFruits(){
    if(typeof catalog==='undefined')return;
    const key='GAMEPASS BLOX FRUITS';
    catalog[key]=[
      ['Fruit Notifier — 2.700 Robux',405000],
      ['Dark Blade — 1.200 Robux',180000],
      ['2× Money — 450 Robux',67500],
      ['2× Mastery — 450 Robux',67500],
      ['+1 Fruit Storage — 400 Robux',60000],
      ['2× Boss Drops — 350 Robux',52500],
      ['Fast Boats — 350 Robux',52500]
    ];
    const old=document.getElementById('gamepass-blox-fruits-service');
    if(old)old.remove();
    const section=document.createElement('section');
    section.id='gamepass-blox-fruits-service';
    section.className='section';
    section.innerHTML=`
      <style>
        #gamepass-blox-fruits-service{margin-top:22px;background:linear-gradient(135deg,#ffffff,#f4f7ff)}
        .gp-hero{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #e2e7f0;border-radius:16px;padding:18px;box-shadow:0 5px 20px #0000000d}
        .gp-icon{width:62px;height:62px;border-radius:15px;background:linear-gradient(135deg,#111827,#334155);display:flex;align-items:center;justify-content:center;font-size:31px;flex:none}
        .gp-info{flex:1}.gp-info h3{margin:0 0 5px;font-size:23px}.gp-info p{margin:0;color:#667085}
        .gp-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
        .gp-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e5e9f0;border-radius:14px;padding:14px}
        .gp-item-info{flex:1}.gp-item strong{display:block;font-size:16px}.gp-robux{display:block;color:#667085;font-size:13px;margin-top:4px}.gp-price{font-weight:900;white-space:nowrap;font-size:16px}
        .gp-item button{white-space:nowrap}
        @media(max-width:700px){.gp-list{grid-template-columns:1fr}.gp-item{flex-wrap:wrap}.gp-item button{width:100%}.gp-price{margin-left:auto}}
      </style>
      <h2>🎟️ GAMEPASS BLOX FRUITS</h2>
      <div class="gp-hero">
        <div class="gp-icon">🎟️</div>
        <div class="gp-info"><h3>GAMEPASS BLOX FRUITS</h3><p>Gamepass Blox Fruits • Bảng giá RT150 • Dịch vụ riêng, không chung với cày thuê.</p></div>
        <button class="btn dark" type="button" onclick="document.getElementById('gp-list').scrollIntoView({behavior:'smooth',block:'center'})">XEM BẢNG GIÁ →</button>
      </div>
      <div id="gp-list" class="gp-list">
        <div class="gp-item"><div class="gp-item-info"><strong>Fruit Notifier</strong><span class="gp-robux">2.700 Robux</span></div><span class="gp-price">405.000 đ</span><button class="btn dark" type="button" onclick="openOrder('GAMEPASS BLOX FRUITS');document.getElementById('package').value='0'">MUA</button></div>
        <div class="gp-item"><div class="gp-item-info"><strong>Dark Blade</strong><span class="gp-robux">1.200 Robux</span></div><span class="gp-price">180.000 đ</span><button class="btn dark" type="button" onclick="openOrder('GAMEPASS BLOX FRUITS');document.getElementById('package').value='1'">MUA</button></div>
        <div class="gp-item"><div class="gp-item-info"><strong>2× Money</strong><span class="gp-robux">450 Robux</span></div><span class="gp-price">67.500 đ</span><button class="btn dark" type="button" onclick="openOrder('GAMEPASS BLOX FRUITS');document.getElementById('package').value='2'">MUA</button></div>
        <div class="gp-item"><div class="gp-item-info"><strong>2× Mastery</strong><span class="gp-robux">450 Robux</span></div><span class="gp-price">67.500 đ</span><button class="btn dark" type="button" onclick="openOrder('GAMEPASS BLOX FRUITS');document.getElementById('package').value='3'">MUA</button></div>
        <div class="gp-item"><div class="gp-item-info"><strong>+1 Fruit Storage</strong><span class="gp-robux">400 Robux</span></div><span class="gp-price">60.000 đ</span><button class="btn dark" type="button" onclick="openOrder('GAMEPASS BLOX FRUITS');document.getElementById('package').value='4'">MUA</button></div>
        <div class="gp-item"><div class="gp-item-info"><strong>2× Boss Drops</strong><span class="gp-robux">350 Robux</span></div><span class="gp-price">52.500 đ</span><button class="btn dark" type="button" onclick="openOrder('GAMEPASS BLOX FRUITS');document.getElementById('package').value='5'">MUA</button></div>
        <div class="gp-item"><div class="gp-item-info"><strong>Fast Boats</strong><span class="gp-robux">350 Robux</span></div><span class="gp-price">52.500 đ</span><button class="btn dark" type="button" onclick="openOrder('GAMEPASS BLOX FRUITS');document.getElementById('package').value='6'">MUA</button></div>
      </div>`;
    const services=document.getElementById('services');
    const orders=document.getElementById('ordersSection');
    if(services){
      if(orders && orders.parentNode===services) services.insertBefore(section,orders);
      else services.appendChild(section);
    }
    const nav=document.querySelector('.top');
    if(nav&&!document.getElementById('gamepassNav')){
      const b=document.createElement('button');b.id='gamepassNav';b.textContent='🎟️ Gamepass';b.onclick=()=>section.scrollIntoView({behavior:'smooth'});nav.insertBefore(b,document.getElementById('authBtn'));
    }
  }
  function moneyTop(v){return Number(v||0).toLocaleString('vi-VN')+' đ'}
  function escTop(v){return String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]))}
  async function fixedTop5(){const el=document.getElementById('top5');if(!el)return;try{const url=window.SUPABASE_URL||'https://ufevipuhejvhiufyqqnz.supabase.co',key=window.SUPABASE_KEY||'sb_publishable_6ShPhvGpN4_02Za2tOTOTg_GF0su_OA';const r=await fetch(url+'/rest/v1/rpc/get_top_deposit_ranking',{method:'POST',headers:{apikey:key,Authorization:'Bearer '+(localStorage.getItem('shopzicl_username_token')||key),'Content-Type':'application/json'},body:'{}'});if(!r.ok)throw Error(await r.text()||r.statusText);const rows=await r.json(),top=(Array.isArray(rows)?rows:[]).slice(0,5);el.innerHTML=top.length?top.map((x,i)=>'<div class="top-card"><div class="rank">'+['🥇','🥈','🥉','🏅','🏅'][i]+' TOP '+(i+1)+'</div><strong>'+escTop(x.username||'Khách hàng')+'</strong><div>'+moneyTop(x.total_deposit)+'</div></div>').join(''):'<div class="empty">Chưa có dữ liệu nạp đã duyệt.</div>'}catch(e){el.innerHTML='<div class="empty">Không thể tải bảng xếp hạng.</div>'}}
  const serviceImages={'Leviathan':'./images/leviathan.svg?v=20260818','Beli & Frag':'./images/beli-frag.svg?v=20260818','Combo Tộc V4':'./images/combo-v4.svg?v=20260818','Tộc Draco':'./images/draco.svg?v=20260818','Level':'./images/level.svg?v=20260818','VNG → Roblox Quốc tế':'./images/vng-quoc-te.svg?v=20260818','Robux 120H':'./images/robux-120h.svg?v=20260818','Kiếm / Súng / Phụ kiện':'./images/kiem-sung.svg?v=20260818','Map 2 GAG2':MAP2_AVATAR,'Grow A Garden 2 Map 1':MAP1_GAG2_AVATAR};
  function applyServiceImages(){const grid=document.getElementById('serviceGrid');if(!grid)return;grid.querySelectorAll('.card').forEach(card=>{const title=card.querySelector('h3');if(!title)return;const name=title.textContent.trim(),src=serviceImages[name];if(!src)return;let old=card.querySelector('.service-avatar');if(old){old.src=src;return}const icon=card.querySelector(':scope > div');if(icon){const img=document.createElement('img');img.className='service-avatar';img.src=src;img.alt=name;img.loading='eager';img.decoding='async';icon.replaceWith(img)}});const mapCard=[...grid.querySelectorAll('.card')].find(c=>c.querySelector('h3')?.textContent.trim()==='Map 2 GAG2');if(mapCard&&!mapCard.querySelector('.service-avatar')){const img=document.createElement('img');img.className='service-avatar';img.src=MAP2_AVATAR;img.alt='Map 2 GAG2';img.loading='eager';const first=mapCard.querySelector(':scope > div');if(first)first.replaceWith(img);else mapCard.prepend(img)}const map1Card=[...grid.querySelectorAll('.card')].find(c=>c.querySelector('h3')?.textContent.trim()==='Grow A Garden 2 Map 1');if(map1Card&&!map1Card.querySelector('.service-avatar')){const img=document.createElement('img');img.className='service-avatar';img.src=MAP1_GAG2_AVATAR;img.alt='Grow A Garden 2 Map 1';img.loading='eager';const first=map1Card.querySelector(':scope > div');if(first)first.replaceWith(img);else map1Card.prepend(img)}}
  function startTop5Guard(){fixedTop5();setTimeout(fixedTop5,500);setTimeout(fixedTop5,1500);setTimeout(fixedTop5,3000)}
  function boot(){addVngService();addAvatarService();addBlackbeardCape();addMap2Gag2();addGrowAGardenMap1();addGamepassBloxFruits();applyServiceImages();setTimeout(applyServiceImages,100);setTimeout(applyServiceImages,600);setTimeout(startTop5Guard,150)}
  const style=document.createElement('style');style.textContent='.service-avatar{width:100%;height:190px;object-fit:cover;object-position:center;display:block;border-radius:14px 14px 0 0;margin:0 0 14px;image-rendering:auto;transform:none!important;backface-visibility:visible;filter:none!important;opacity:1!important}.card:has(.service-avatar){padding-top:0;overflow:hidden}.card .service-avatar{will-change:auto}';document.head.appendChild(style);
  const heroStyle=document.createElement('style');heroStyle.textContent='.hero{height:350px!important;padding:0!important;overflow:hidden!important}.hero img{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;display:block!important}@media(max-width:600px){.hero{height:220px!important}}';document.head.appendChild(heroStyle);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('focus',()=>{setTimeout(fixedTop5,150);setTimeout(applyServiceImages,50);setTimeout(addGamepassBloxFruits,100)});document.addEventListener('visibilitychange',()=>{if(!document.hidden){setTimeout(fixedTop5,150);setTimeout(applyServiceImages,50);setTimeout(addGamepassBloxFruits,100)}});
  const openPackagesOnly=function(name){const items=typeof catalog!=='undefined'?catalog[name]:null;if(!Array.isArray(items))return;selectedService=name;const title=document.getElementById('orderTitle'),pkg=document.getElementById('package'),modal=document.getElementById('orderModal');if(!title||!pkg||!modal)return;title.textContent='Đặt đơn — '+name;pkg.innerHTML=items.map((x,i)=>'<option value="'+i+'">'+esc(x[0])+' — '+money(x[1])+'</option>').join('');modal.classList.add('show')};
  window.openOrder=openPackagesOnly;
})();