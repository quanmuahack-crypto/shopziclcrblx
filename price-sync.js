(function(){
'use strict';
const SUPABASE_URL='https://ufevipuhejvhiufyqqnz.supabase.co';
const SUPABASE_KEY='sb_publishable_6ShPhvGpN4_02Za2tOTOTg_GF0su_OA';
let syncing=false;

const SERVICE_IMAGES={
  
};

const imageCache=new Map();

async function loadImageData(path){
  if(path.endsWith('.svg'))return path;
  if(imageCache.has(path))return imageCache.get(path);
  const p=fetch(path,{cache:'force-cache'})
    .then(r=>{if(!r.ok)throw new Error('Không tải được ảnh '+path);return r.text()})
    .then(b64=>'data:image/webp;base64,'+b64.trim())
    .catch(e=>{console.warn('Service image:',e);return null});
  imageCache.set(path,p);
  return p;
}

function loadExtraServices(){
  if(window.__gamepassVvbfLoaded)return;
  window.__gamepassVvbfLoaded=true;
  const s=document.createElement('script');
  s.src='services-gamepass-vvbf.js?v=2';
  s.async=false;
  s.onload=()=>{try{if(typeof window.addGamepassVvbfServices==='function')window.addGamepassVvbfServices();}catch(e){console.warn('Extra services:',e)}};
  s.onerror=()=>{console.warn('Không tải được services-gamepass-vvbf.js')};
  (document.head||document.documentElement).appendChild(s);
}

async function applyServiceImages(){
  const grid=document.getElementById('serviceGrid');
  if(!grid)return;
  const cards=[...grid.querySelectorAll('.card')];
  for(const card of cards){
    const h=card.querySelector('h3');
    const img=card.querySelector('.service-avatar');
    if(!h||!img)continue;
    const name=h.textContent.trim();
    const path=SERVICE_IMAGES[name];
    if(!path)continue;
    const src=await loadImageData(path);
    if(src && img.dataset.customSrc!==path){
      img.src=src;
      img.dataset.customSrc=path;
      img.alt=name;
    }
  }
}

async function syncShopPrices(){
  if(syncing)return;
  syncing=true;
  try{
    loadExtraServices();
    const r=await fetch(SUPABASE_URL+'/rest/v1/service_prices?select=service_name,package_name,price,sort_order&order=service_name.asc,sort_order.asc',{
      method:'GET',cache:'no-store',
      headers:{apikey:SUPABASE_KEY,Accept:'application/json','Cache-Control':'no-cache'}
    });
    if(!r.ok)throw new Error('HTTP '+r.status);
    const rows=await r.json();
    if(typeof catalog==='undefined'||!Array.isArray(rows))return;

    const remote=new Map(rows.map(x=>[
      String(x.service_name)+'\\u0000'+String(x.package_name),
      {price:Number(x.price),sort:Number(x.sort_order||0)}
    ]));

    const merged={};
    Object.keys(catalog).forEach(service=>{
      if(service==='VNG → Roblox Quốc tế'||service==='Chromatic Box'||service==='Robux 120H'||service==='Robux 120h'||service==='ROBUX 120H'||service==='UGPHONE GVIP'||service==='UGPHONE SVIP')return;
      merged[service]=(catalog[service]||[]).map(x=>{
        const hit=remote.get(service+'\\u0000'+x[0]);
        return hit?[x[0],hit.price]:x;
      });
    });

    rows.forEach(x=>{
      const service=String(x.service_name),pkg=String(x.package_name);
      if(service==='VNG → Roblox Quốc tế'||service==='Chromatic Box'||service==='Robux 120H'||service==='Robux 120h'||service==='ROBUX 120H'||service==='UGPHONE GVIP'||service==='UGPHONE SVIP')return;
      if(!merged[service])merged[service]=[];
      if(!merged[service].some(x=>x[0]===pkg))merged[service].push([pkg,Number(x.price)]);
    });

    Object.keys(catalog).forEach(k=>delete catalog[k]);
    Object.keys(merged).forEach(k=>catalog[k]=merged[k]);

    if(typeof renderServices==='function')renderServices();
    await applyServiceImages();
    window.dispatchEvent(new CustomEvent('shopPricesSynced'));
  }catch(e){
    console.warn('Shop price sync:',e);
  }finally{
    syncing=false;
  }
}

window.syncShopPrices=syncShopPrices;
window.applyServiceImages=applyServiceImages;

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>setTimeout(syncShopPrices,100));
}else{
  setTimeout(syncShopPrices,100);
}
setInterval(syncShopPrices,3000);
})();

// Fix Top Nạp: frontend trước đây đọc nhầm total_deposited trong khi RPC trả về total_deposit.
(function(){
  'use strict';
  window.loadTopDeposits=async function(){
    const el=document.getElementById('top5');
    if(!el)return;
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/rpc/top_deposit_leaderboard',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:'{}'});
      const rows=await r.json();
      if(!r.ok)throw new Error(rows?.message||rows?.hint||'Không tải được dữ liệu');
      el.innerHTML=Array.isArray(rows)&&rows.length?rows.map((x,i)=>'<div class="top-card"><div class="rank">'+(i===0?'🏆':i===1?'🥈':i===2?'🥉':(i+1))+'</div><div><b>'+esc(x.username)+'</b></div><div class="money" style="font-size:18px;margin-top:6px">'+money(x.total_deposit)+'</div></div>').join(''):'<div class="top-card">Chưa có dữ liệu nạp đã duyệt.</div>';
    }catch(e){
      el.innerHTML='<div class="top-card"><div class="danger" style="padding:12px;border-radius:10px">Không tải được Top nạp. Vui lòng thử lại.</div></div>';
      console.error('Top nạp:',e);
    }
  };
  setTimeout(window.loadTopDeposits,150);
})();

/* Main shop navigation: create exactly one header. */
(function(){
  'use strict';
  function ensureHeader(){
    if(document.getElementById('shopMainNav'))return;
    const existing=document.querySelector('.top');
    if(existing)return;
    const balance=document.querySelector('.balance');
    if(!balance)return;
    const nav=document.createElement('nav');
    nav.id='shopMainNav';
    nav.className='top';
    nav.innerHTML=`
      <div class="logo">ShopZiCiCRBLX</div>
      <a href="./" class="dark btn">⌂ Trang chủ</a>
      <a href="#services" class="light btn">🎮 Dịch vụ</a>
      <button class="light btn" onclick="openOrders()">▣ Đơn của tôi</button>
      <a href="#deposit" class="light btn">💳 Nạp tiền</a>
      <a href="lich-su-nap.html" class="light btn">📜 Lịch sử nạp</a>
      <a href="chat-admin.html" class="light btn">💬 Chat Admin</a>
      <button id="authBtn" class="dark btn" onclick="openAuth()">Đăng nhập</button>
    `;
    balance.parentNode.insertBefore(nav,balance);
    if(typeof updateUI==='function')updateUI();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureHeader);
  else ensureHeader();
})();


/* Background music: Lukrembo - Bread */
(function(){
  'use strict';
  function setupShopMusic(){
    if(document.getElementById('shopMusicBox'))return;

    const box=document.createElement('div');
    box.id='shopMusicBox';
    box.innerHTML=`
      <button id="shopMusicToggle" type="button" aria-label="Bật hoặc tắt nhạc">🎵 Bật nhạc</button>
      <div id="shopMusicCredit">Lukrembo — Bread</div>
      <iframe id="shopMusicFrame"
        title="Lukrembo - Bread"
        allow="autoplay"
        style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;border:0"
        src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Flukrembo%2Fbread&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false">
      </iframe>
    `;

    const style=document.createElement('style');
    style.textContent=`
      #shopMusicBox{
        position:fixed;right:18px;bottom:18px;z-index:99999;
        display:flex;align-items:center;gap:9px;
        padding:9px 11px;border-radius:14px;
        background:rgba(20,20,24,.92);backdrop-filter:blur(10px);
        box-shadow:0 8px 28px rgba(0,0,0,.25);
        font-family:Arial,sans-serif
      }
      #shopMusicToggle{
        border:0;border-radius:10px;padding:9px 13px;
        background:#fff;color:#111;font-weight:800;cursor:pointer
      }
      #shopMusicToggle:hover{transform:translateY(-1px)}
      #shopMusicCredit{font-size:11px;color:#ddd;white-space:nowrap}
      @media(max-width:600px){#shopMusicCredit{display:none}#shopMusicBox{right:10px;bottom:10px}}
    `;
    document.head.appendChild(style);
    document.body.appendChild(box);

    const frame=box.querySelector('#shopMusicFrame');
    const btn=box.querySelector('#shopMusicToggle');
    let widget=null;
    let playing=false;

    function loadWidget(){
      if(widget)return;
      const start=()=>{
        if(!window.SC||!window.SC.Widget)return;
        widget=window.SC.Widget(frame);
        widget.bind(window.SC.Widget.Events.PLAY,()=>{playing=true;btn.textContent='⏸ Tắt nhạc';});
        widget.bind(window.SC.Widget.Events.PAUSE,()=>{playing=false;btn.textContent='🎵 Bật nhạc';});
      };
      if(window.SC&&window.SC.Widget){start();return}
      const s=document.createElement('script');
      s.src='https://w.soundcloud.com/player/api.js';
      s.onload=start;
      document.head.appendChild(s);
    }

    btn.addEventListener('click',()=>{
      loadWidget();
      setTimeout(()=>{
        if(!widget)return;
        if(playing)widget.pause();
        else widget.play();
      },250);
    });
    loadWidget();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupShopMusic);
  else setupShopMusic();
})();
