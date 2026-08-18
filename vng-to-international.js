(function(){
  const MAP2_AVATAR='./images/map-2-gag2.svg?v=20260818';
  function addVngService(){
    if(typeof catalog==='undefined'||typeof renderServices!=='function') return;
    catalog['VNG → Roblox Quốc tế']=[['Treo từ VNG sang Quốc tế — 7 ngày',30000],['Treo từ VNG sang Quốc tế — 30 ngày (không gộp đơn)',165000],['Treo từ VNG sang Quốc tế — có gộp đơn',20000]];
    renderServices();
  }
  function addAvatarService(){
    if(typeof catalog==='undefined'||typeof renderServices!=='function') return;
    catalog['Robux 120H']=[['(120H) 2.860 Robux (Sau Thuế Nhận - 2.000 Robux)',514000],['(120H) 2.150 Robux (Sau Thuế Nhận - 1.505 Robux)',387000],['(120H) 1.430 Robux (Sau Thuế Nhận - 1.000 Robux)',257000]];
    renderServices();
  }
  function addBlackbeardCape(){
    if(typeof catalog==='undefined'||typeof renderServices!=='function') return;
    const key='Kiếm / Súng / Phụ kiện';
    if(Array.isArray(catalog[key])&&!catalog[key].some(x=>x[0]==='Lấy áo choàng râu đen')){catalog[key].push(['Lấy áo choàng râu đen',90000]);renderServices();}
  }
  function addMap2Gag2(){
    if(typeof catalog==='undefined'||typeof renderServices!=='function') return;
    catalog['Map 2 GAG2']=[['X2000 Super Syrup Watering Can',60000],['X1000 Super Syrup Sprinkler',60000],['X1 Shadow Dragon (Rồng Đen)',18000],['x1000 Seed Atlantic Giant Pumpkin',240000]];
    renderServices();
    setTimeout(applyServiceImages,0);
    setTimeout(applyServiceImages,300);
    setTimeout(applyServiceImages,1000);
  }
  function moneyTop(v){return Number(v||0).toLocaleString('vi-VN')+' đ'}
  function escTop(v){return String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]))}
  async function fixedTop5(){
    const el=document.getElementById('top5');if(!el)return;
    try{const url=window.SUPABASE_URL||'https://ufevipuhejvhiufyqqnz.supabase.co',key=window.SUPABASE_KEY||'sb_publishable_6ShPhvGpN4_02Za2tOTOTg_GF0su_OA';const r=await fetch(url+'/rest/v1/rpc/get_top_deposit_ranking',{method:'POST',headers:{apikey:key,Authorization:'Bearer '+(localStorage.getItem('shopzicl_username_token')||key),'Content-Type':'application/json'},body:'{}'});if(!r.ok)throw Error(await r.text()||r.statusText);const rows=await r.json(),top=(Array.isArray(rows)?rows:[]).slice(0,5);el.innerHTML=top.length?top.map((x,i)=>'<div class="top-card"><div class="rank">'+['🥇','🥈','🥉','🏅','🏅'][i]+' TOP '+(i+1)+'</div><strong>'+escTop(x.username||'Khách hàng')+'</strong><div>'+moneyTop(x.total_deposit)+'</div></div>').join(''):'<div class="empty">Chưa có dữ liệu nạp đã duyệt.</div>'}catch(e){el.innerHTML='<div class="empty">Không thể tải bảng xếp hạng.</div>'}
  }
  const serviceImages={
    'Leviathan':'./images/leviathan.svg',
    'Beli & Frag':'./images/beli-frag.svg',
    'Combo Tộc V4':'./images/combo-v4.svg',
    'Tộc Draco':'./images/toc-draco.svg',
    'Level':'./images/level.svg',
    'VNG → Roblox Quốc tế':'./images/vng-quoc-te.svg',
    'Robux 120H':'./images/robux-120h.svg',
    'Kiếm / Súng / Phụ kiện':'./images/kiem-sung.svg',
    'Map 2 GAG2':MAP2_AVATAR
  };
  function applyServiceImages(){
    const grid=document.getElementById('serviceGrid');if(!grid)return;
    grid.querySelectorAll('.card').forEach(card=>{
      const title=card.querySelector('h3');if(!title)return;
      const name=title.textContent.trim();
      const src=serviceImages[name];if(!src)return;
      let old=card.querySelector('.service-avatar');
      if(old){old.src=src;return}
      const icon=card.querySelector(':scope > div');
      if(icon){
        const img=document.createElement('img');
        img.className='service-avatar';img.src=src;img.alt=name;img.loading='eager';img.decoding='async';
        icon.replaceWith(img);
      }
    });
    const mapCard=[...grid.querySelectorAll('.card')].find(c=>c.querySelector('h3')?.textContent.trim()==='Map 2 GAG2');
    if(mapCard&&!mapCard.querySelector('.service-avatar')){
      const img=document.createElement('img');img.className='service-avatar';img.src=MAP2_AVATAR;img.alt='Map 2 GAG2';img.loading='eager';
      const first=mapCard.querySelector(':scope > div');if(first)first.replaceWith(img);else mapCard.prepend(img);
    }
  }
  function startTop5Guard(){fixedTop5();setTimeout(fixedTop5,500);setTimeout(fixedTop5,1500);setTimeout(fixedTop5,3000)}
  function boot(){addVngService();addAvatarService();addBlackbeardCape();addMap2Gag2();applyServiceImages();setTimeout(applyServiceImages,100);setTimeout(applyServiceImages,600);setTimeout(startTop5Guard,150)}
  const style=document.createElement('style');style.textContent='.service-avatar{width:100%;height:190px;object-fit:cover;object-position:center;display:block;border-radius:14px 14px 0 0;margin:0 0 14px;image-rendering:auto;transform:none!important;backface-visibility:visible;filter:none!important;opacity:1!important}.card:has(.service-avatar){padding-top:0;overflow:hidden}.card .service-avatar{will-change:auto}';document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('focus',()=>{setTimeout(fixedTop5,150);setTimeout(applyServiceImages,50)});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){setTimeout(fixedTop5,150);setTimeout(applyServiceImages,50)}});
})();
