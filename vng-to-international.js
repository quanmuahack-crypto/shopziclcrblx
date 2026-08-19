(function(){
'use strict';
function boot(){
  if(typeof catalog==='undefined'||typeof renderServices!=='function') return;

  catalog['VNG → Roblox Quốc tế']=[
    ['Treo từ VNG sang Quốc tế — 7 ngày',30000],
    ['Treo từ VNG sang Quốc tế — 30 ngày (không gộp đơn)',165000],
    ['Treo từ VNG sang Quốc tế — có gộp đơn',20000]
  ];
  catalog['Robux 120H']=[
    ['(120H) 2.860 Robux (Sau Thuế Nhận - 2.000 Robux)',514000],
    ['(120H) 2.150 Robux (Sau Thuế Nhận - 1.505 Robux)',387000],
    ['(120H) 1.430 Robux (Sau Thuế Nhận - 1.000 Robux)',257000]
  ];
  if(Array.isArray(catalog['Kiếm / Súng / Phụ kiện'])&&!catalog['Kiếm / Súng / Phụ kiện'].some(x=>x[0]==='Lấy áo choàng râu đen')){
    catalog['Kiếm / Súng / Phụ kiện'].push(['Lấy áo choàng râu đen',90000]);
  }
  catalog['Map 2 GAG2']=[
    ['X2000 Super Syrup Watering Can',60000],
    ['X1000 Super Syrup Sprinkler',60000],
    ['X1 Shadow Dragon (Rồng Đen)',18000],
    ['x1000 Seed Atlantic Giant Pumpkin',240000]
  ];
  catalog['Grow A Garden 2 Map 1']=[
    ['1000 Super Watering Can',110000],['1000 Super Sprinkler',90000],
    ['100 Dragon Breath',120000],['50 Star Fruit',125000],['150 Moon Bloom',189000],
    ['100 Hypno Bloom',218000],['100 Sun Bloom',100000],['100 Super Watering Can',30000],
    ['100 Super Sprinkler',21000],['1 Mega Ice Serpent Rainbow',400000],
    ['Mega Raccoon',110000],['Mega Black Dragon',350000]
  ];

  renderServices();

  var old=document.getElementById('gamepass-blox-fruits-service');
  if(old) old.remove();

  var section=document.createElement('section');
  section.id='gamepass-blox-fruits-service';
  section.className='section';
  section.innerHTML=`
    <style>
      #gamepass-blox-fruits-service{margin-top:22px;background:linear-gradient(135deg,#fff,#f4f7ff)}
      #gamepass-blox-fruits-service .gp-head{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #e5e9f0;border-radius:16px;padding:18px;box-shadow:0 5px 20px #0001}
      #gamepass-blox-fruits-service .gp-icon{width:62px;height:62px;border-radius:15px;background:#111827;color:#fff;display:flex;align-items:center;justify-content:center;font-size:30px;flex:none}
      #gamepass-blox-fruits-service .gp-info{flex:1}
      #gamepass-blox-fruits-service .gp-info h3{margin:0 0 6px;font-size:23px}
      #gamepass-blox-fruits-service .gp-info p{margin:0;color:#667085}
      #gamepass-blox-fruits-service .gp-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
      #gamepass-blox-fruits-service .gp-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e5e9f0;border-radius:14px;padding:14px}
      #gamepass-blox-fruits-service .gp-item-info{flex:1}
      #gamepass-blox-fruits-service .gp-item strong{display:block;font-size:16px}
      #gamepass-blox-fruits-service .gp-robux{display:block;color:#667085;font-size:13px;margin-top:4px}
      #gamepass-blox-fruits-service .gp-price{font-weight:900;white-space:nowrap}
      #gamepass-blox-fruits-service .gp-item button{white-space:nowrap}
      @media(max-width:700px){#gamepass-blox-fruits-service .gp-list{grid-template-columns:1fr}#gamepass-blox-fruits-service .gp-item{flex-wrap:wrap}#gamepass-blox-fruits-service .gp-item button{width:100%}}
    </style>
    <h2>🎟️ GAMEPASS BLOX FRUITS</h2>
    <div class="gp-head">
      <div class="gp-icon">🎟️</div>
      <div class="gp-info"><h3>GAMEPASS BLOX FRUITS</h3><p>Gamepass Blox Fruits • Bảng giá RT150 • Mục riêng, không chung với cày thuê.</p></div>
      <button class="btn dark" type="button" id="gpViewBtn">XEM BẢNG GIÁ →</button>
    </div>
    <div id="gp-list" class="gp-list">
      <div class="gp-item"><div class="gp-item-info"><strong>Fruit Notifier</strong><span class="gp-robux">2.700 Robux</span></div><span class="gp-price">405.000 đ</span><button class="btn dark" data-gp="0">MUA</button></div>
      <div class="gp-item"><div class="gp-item-info"><strong>Dark Blade</strong><span class="gp-robux">1.200 Robux</span></div><span class="gp-price">180.000 đ</span><button class="btn dark" data-gp="1">MUA</button></div>
      <div class="gp-item"><div class="gp-item-info"><strong>2× Money</strong><span class="gp-robux">450 Robux</span></div><span class="gp-price">67.500 đ</span><button class="btn dark" data-gp="2">MUA</button></div>
      <div class="gp-item"><div class="gp-item-info"><strong>2× Mastery</strong><span class="gp-robux">450 Robux</span></div><span class="gp-price">67.500 đ</span><button class="btn dark" data-gp="3">MUA</button></div>
      <div class="gp-item"><div class="gp-item-info"><strong>+1 Fruit Storage</strong><span class="gp-robux">400 Robux</span></div><span class="gp-price">60.000 đ</span><button class="btn dark" data-gp="4">MUA</button></div>
      <div class="gp-item"><div class="gp-item-info"><strong>2× Boss Drops</strong><span class="gp-robux">350 Robux</span></div><span class="gp-price">52.500 đ</span><button class="btn dark" data-gp="5">MUA</button></div>
      <div class="gp-item"><div class="gp-item-info"><strong>Fast Boats</strong><span class="gp-robux">350 Robux</span></div><span class="gp-price">52.500 đ</span><button class="btn dark" data-gp="6">MUA</button></div>
    </div>`;

  var services=document.getElementById('services');
  if(services) services.appendChild(section);

  var nav=document.querySelector('.top');
  var auth=document.getElementById('authBtn');
  if(nav&&!document.getElementById('gamepassNav')){
    var navBtn=document.createElement('button');
    navBtn.id='gamepassNav';
    navBtn.className='light';
    navBtn.textContent='🎟️ Gamepass';
    navBtn.onclick=function(){section.scrollIntoView({behavior:'smooth'});};
    if(auth) nav.insertBefore(navBtn,auth); else nav.appendChild(navBtn);
  }

  document.getElementById('gpViewBtn').onclick=function(){document.getElementById('gp-list').scrollIntoView({behavior:'smooth',block:'center'});};
  section.querySelectorAll('[data-gp]').forEach(function(btn){
    btn.onclick=function(){
      if(typeof currentUser==='undefined'||!currentUser){if(typeof openAuth==='function')openAuth();return;}
      if(typeof openOrder==='function'){
        openOrder('GAMEPASS BLOX FRUITS');
        var select=document.getElementById('package');
        if(select) select.value=btn.getAttribute('data-gp');
      }
    };
  });
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();