(function(){
  const MAP2_AVATAR='./images/map-2-gag2.svg?v=20260818';
  const MAP1_GAG2_AVATAR='./images/grow-a-garden-2-map-1.svg?v=20260818';
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
    setTimeout(applyServiceImages,0);setTimeout(applyServiceImages,300);setTimeout(applyServiceImages,1000);
  }
  function addGrowAGardenMap1(){
    if(typeof catalog==='undefined'||typeof renderServices!=='function') return;
    catalog['Grow A Garden 2 Map 1']=[['1000 Super Watering Can',110000],['1000 Super Sprinkler',90000],['100 Dragon Breath',120000],['50 Star Fruit',125000],['150 Moon Bloom',189000],['100 Hypno Bloom',218000],['100 Sun Bloom',100000],['100 Super Watering Can',30000],['100 Super Sprinkler',21000],['1 Mega Ice Serpent Rainbow',400000],['Mega Raccoon',110000],['Mega Black Dragon',350000]];
    renderServices();
    setTimeout(applyServiceImages,0);setTimeout(applyServiceImages,300);setTimeout(applyServiceImages,1000);
  }
  function moneyTop(v){return Number(v||0).toLocaleString('vi-VN')+' đ'}
  function escTop(v){return String(v??'').replace(/[&<>\\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\"':'&quot;',"'":'&#039;'}[m]))}
  async function fixedTop5(){
    const el=document.getElementById('top5');if(!el)return;
    try{const url=window.SUPABASE_URL||'https://ufevipuhejvhiufyqqnz.supabase.co',key=window.SUPABASE_KEY||'sb_publishable_6ShPhvGpN4_02Za2tOTOTg_GF0su_OA';const r=await fetch(url+'/rest/v1/rpc/get_top_deposit_ranking',{method:'POST',headers:{apikey:key,Authorization:'Bearer '+(localStorage.getItem('shopzicl_username_token')||key),'Content-Type':'application/json'},body:'{}'});if(!r.ok)throw Error(await r.text()||r.statusText);const rows=await r.json(),top=(Array.isArray(rows)?rows:[]).slice(0,5);el.innerHTML=top.length?top.map((x,i)=>'<div class="top-card"><div class="rank">'+['🥇','🥈','🥉','🏅','🏅'][i]+' TOP '+(i+1)+'</div><strong>'+escTop(x.username||'Khách hàng')+'</strong><div>'+moneyTop(x.total_deposit)+'</div></div>').join(''):'<div class="empty">Chưa có dữ liệu nạp đã duyệt.</div>'}catch(e){el.innerHTML='<div class="empty">Không thể tải bảng xếp hạng.</div>'}
  }
  const serviceImages={'Leviathan':'./images/leviathan.svg','Beli & Frag':'./images/beli-frag.svg','Combo Tộc V4':'./images/combo-v4.svg','Tộc Draco':'./images/toc-draco.svg','Level':'./images/level.svg','VNG → Roblox Quốc tế':'./images/vng-quoc-te.svg','Robux 120H':'./images/robux-120h.svg','Kiếm / Súng / Phụ kiện':'./images/kiem-sung.svg','Map 2 GAG2':MAP2_AVATAR,'Grow A Garden 2 Map 1':MAP1_GAG2_AVATAR};
  function applyServiceImages(){
    const grid=document.getElementById('serviceGrid');if(!grid)return;
    grid.querySelectorAll('.card').forEach(card=>{const title=card.querySelector('h3');if(!title)return;const name=title.textContent.trim(),src=serviceImages[name];if(!src)return;let old=card.querySelector('.service-avatar');if(old){old.src=src;return}const icon=card.querySelector(':scope > div');if(icon){const img=document.createElement('img');img.className='service-avatar';img.src=src;img.alt=name;img.loading='eager';img.decoding='async';icon.replaceWith(img)}});
    const mapCard=[...grid.querySelectorAll('.card')].find(c=>c.querySelector('h3')?.textContent.trim()==='Map 2 GAG2');if(mapCard&&!mapCard.querySelector('.service-avatar')){const img=document.createElement('img');img.className='service-avatar';img.src=MAP2_AVATAR;img.alt='Map 2 GAG2';img.loading='eager';const first=mapCard.querySelector(':scope > div');if(first)first.replaceWith(img);else mapCard.prepend(img)}
    const map1Card=[...grid.querySelectorAll('.card')].find(c=>c.querySelector('h3')?.textContent.trim()==='Grow A Garden 2 Map 1');if(map1Card&&!map1Card.querySelector('.service-avatar')){const img=document.createElement('img');img.className='service-avatar';img.src=MAP1_GAG2_AVATAR;img.alt='Grow A Garden 2 Map 1';img.loading='eager';const first=map1Card.querySelector(':scope > div');if(first)first.replaceWith(img);else map1Card.prepend(img)}
  }
  function enhanceHero(){
    const hero=document.querySelector('.hero');if(!hero||hero.dataset.upgraded==='1')return;hero.dataset.upgraded='1';
    hero.innerHTML='<div class="hero-copy"><div class="hero-badge">⚡ SHOP ROBLOX CHÍNH CHỦ</div><h1>SHOP ROBLOX<br><span>UY TÍN • GIÁ RẺ</span></h1><p>Tự động • Nhanh chóng • An toàn</p><div class="hero-stats"><div><b>10.000+</b><small>Giao dịch</small></div><div><b>5.000+</b><small>Khách hàng</small></div><div><b>100%</b><small>An toàn</small></div><div><b>24/7</b><small>Hỗ trợ</small></div></div></div>';
    const s=document.createElement('style');s.textContent=`
.hero{position:relative;overflow:hidden;min-height:430px;padding:0!important;border-radius:24px!important;background:#08051c url('./images/shop-hero.svg?v=20260818') center/cover no-repeat!important;box-shadow:0 18px 55px #24105e55!important;display:flex;align-items:center;justify-content:center;text-align:center}
.hero:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#08051c99,#24105e22,#08051c99);pointer-events:none}.hero-copy{position:relative;z-index:1;width:min(920px,94%);padding:48px 24px}.hero-badge{display:inline-block;padding:9px 18px;border:1px solid #b34cff;border-radius:999px;background:#12062dcc;color:#fff;font-weight:900;letter-spacing:1px;box-shadow:0 0 22px #9d4dff88;margin-bottom:16px}.hero h1{margin:0!important;font-size:clamp(42px,6vw,78px)!important;line-height:.98!important;font-weight:1000!important;letter-spacing:-2px!important;text-shadow:0 6px 24px #000!important}.hero h1 span{display:inline-block;background:linear-gradient(90deg,#52dcff,#9e54ff,#ff56d7);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 14px #8b4dff99)}.hero p{margin:20px 0 26px!important;font-size:clamp(17px,2.2vw,25px)!important;font-weight:900!important;color:#fff!important;letter-spacing:2px!important}.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:14px;border:1px solid #b34cff88;border-radius:18px;background:#0b0524cc;backdrop-filter:blur(8px);box-shadow:0 10px 35px #0008}.hero-stats div{padding:8px;border-right:1px solid #ffffff22}.hero-stats div:last-child{border-right:0}.hero-stats b{display:block;font-size:clamp(20px,3vw,32px);color:#fff}.hero-stats small{display:block;color:#cfc8e8;font-weight:800;margin-top:3px}@media(max-width:650px){.hero{min-height:390px}.hero-copy{padding:35px 14px}.hero-stats{grid-template-columns:repeat(2,1fr)}.hero-stats div:nth-child(2){border-right:0}.hero-stats div:nth-child(-n+2){border-bottom:1px solid #ffffff22}.hero-stats div:nth-child(3){border-right:1px solid #ffffff22}}
`;
    document.head.appendChild(s);
  }
  function startTop5Guard(){fixedTop5();setTimeout(fixedTop5,500);setTimeout(fixedTop5,1500);setTimeout(fixedTop5,3000)}
  function boot(){addVngService();addAvatarService();addBlackbeardCape();addMap2Gag2();addGrowAGardenMap1();enhanceHero();applyServiceImages();setTimeout(enhanceHero,100);setTimeout(applyServiceImages,100);setTimeout(applyServiceImages,600);setTimeout(startTop5Guard,150)}
  const style=document.createElement('style');style.textContent='.service-avatar{width:100%;height:190px;object-fit:cover;object-position:center;display:block;border-radius:14px 14px 0 0;margin:0 0 14px;image-rendering:auto;transform:none!important;backface-visibility:visible;filter:none!important;opacity:1!important}.card:has(.service-avatar){padding-top:0;overflow:hidden}.card .service-avatar{will-change:auto}';document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('focus',()=>{setTimeout(fixedTop5,150);setTimeout(applyServiceImages,50);setTimeout(enhanceHero,50)});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){setTimeout(fixedTop5,150);setTimeout(applyServiceImages,50);setTimeout(enhanceHero,50)}});
})();
