(function(){
  function addVngService(){
    if(typeof catalog==='undefined'||typeof renderServices!=='function') return;
    catalog['VNG → Roblox Quốc tế'] = [
      ['Treo từ VNG sang Quốc tế — 7 ngày',30000],
      ['Treo từ VNG sang Quốc tế — 30 ngày (không gộp đơn)',165000],
      ['Treo từ VNG sang Quốc tế — có gộp đơn',20000]
    ];
    renderServices();
    const grid=document.getElementById('serviceGrid');
    if(!grid||grid.dataset.vngStyled) return;
    const cards=grid.querySelectorAll('.card');
    const card=[...cards].find(c=>c.textContent.includes('VNG → Roblox Quốc tế'));
    if(card){
      card.insertAdjacentHTML('afterbegin','<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:12px;font-weight:900"><span style="display:inline-flex;width:58px;height:42px;align-items:center;justify-content:center;border-radius:10px;background:#f1f5ff;color:#174ea6;font-size:13px">VNG</span><span style="font-size:22px">→</span><span style="display:inline-flex;width:78px;height:42px;align-items:center;justify-content:center;border-radius:10px;background:#111827;color:#fff;font-size:12px">ROBLOX</span></div>');
      card.insertAdjacentHTML('beforeend','<div class="msg" style="font-size:12px;margin-top:10px">📝 7 ngày treo thì khả năng ít hơn; 30 ngày treo thì theo gói dịch vụ đảm bảo 100% qua Roblox quốc tế.</div>');
    }
    grid.dataset.vngStyled='1';
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addVngService); else addVngService();
})();
