(()=>{
  const services=[
    ['Treo VNG → Roblox Quốc tế — 7 ngày',30000,'7 ngày'],
    ['Treo VNG → Roblox Quốc tế — 30 ngày (không gộp đơn)',165000,'30 ngày • Không gộp đơn'],
    ['Treo VNG → Roblox Quốc tế — Có gộp đơn',20000,'Có gộp đơn']
  ];
  function add(){
    if(document.getElementById('vngInternationalSection')) return;
    const anchor=document.getElementById('services'); if(!anchor) return;
    const section=document.createElement('section');
    section.id='vngInternationalSection'; section.className='section';
    section.innerHTML=`<h2>🇻🇳 VNG <span style="opacity:.65">→</span> 🌎 Roblox Quốc tế</h2><p>Gói treo chuyển từ Roblox VNG sang Roblox quốc tế.</p><div class="grid" id="vngInternationalGrid"></div><div class="msg" style="margin-top:16px">📝 <b>Ghi chú:</b> 7 ngày treo thì khả năng ít hơn; nếu 30 ngày treo thì đảm bảo 100% qua Roblox quốc tế.</div>`;
    anchor.parentNode.insertBefore(section,anchor.nextSibling);
    const grid=section.querySelector('#vngInternationalGrid');
    grid.innerHTML=services.map(([name,price,note])=>`<div class="card"><div class="status">🇻🇳 VNG → 🌎 Quốc tế</div><h3>${name}</h3><p style="font-size:24px;font-weight:900;color:#1464e8">${Number(price).toLocaleString('vi-VN')} đ</p><p>${note}</p><button class="btn dark full" type="button" data-vng-name="${name}" data-vng-price="${price}">XEM GÓI →</button></div>`).join('');
    grid.querySelectorAll('[data-vng-name]').forEach(btn=>btn.addEventListener('click',()=>{
      if(typeof openOrder==='function') openOrder(btn.dataset.vngName);
      else alert('Vui lòng đăng nhập rồi thử lại.');
    }));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add); else add();
})();
