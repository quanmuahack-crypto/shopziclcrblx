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

  function moneyTop(v){return Number(v||0).toLocaleString('vi-VN')+' đ'}
  function escTop(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}

  async function fixedTop5(){
    const el=document.getElementById('top5');
    if(!el||typeof rpc!=='function') return;
    try{
      // RPC dùng SECURITY DEFINER để bảng xếp hạng đọc được dữ liệu của tất cả khách,
      // không bị RLS khiến chỉ tài khoản đang đăng nhập nhìn thấy chính mình.
      const rows=await rpc('get_top_deposit_ranking',{});
      const top=(rows||[]).slice(0,5);
      if(!top.length){
        el.innerHTML='<div class="empty">Chưa có dữ liệu nạp đã duyệt.</div>';
        return;
      }
      el.innerHTML=top.map((x,i)=>{
        const medal=['🥇','🥈','🥉','🏅','🏅'][i];
        return '<div class="top-card" style="position:relative;overflow:hidden"><div class="rank">'+medal+' TOP '+(i+1)+'</div><strong style="display:block;margin-top:8px;word-break:break-word">'+escTop(x.username||'Khách hàng')+'</strong><div style="margin-top:8px;font-size:18px;font-weight:900;color:#1464e8">'+moneyTop(x.total_deposit)+'</div><div class="empty" style="font-size:12px">Tổng nạp đã duyệt</div></div>';
      }).join('');
    }catch(e){
      console.error('fixedTop5:',e);
      el.innerHTML='<div class="empty">Không thể tải bảng xếp hạng.</div>';
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){addVngService();setTimeout(fixedTop5,100)}); else {addVngService();setTimeout(fixedTop5,100)}
  window.addEventListener('focus',()=>setTimeout(fixedTop5,150));
})();
