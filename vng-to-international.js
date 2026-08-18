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

  function addAvatarService(){
    if(typeof catalog==='undefined'||typeof renderServices!=='function') return;
    catalog['Robux 120H'] = [
      ['(120H) 2.860 Robux (Sau Thuế Nhận - 2.000 Robux)',514000],
      ['(120H) 2.150 Robux (Sau Thuế Nhận - 1.505 Robux)',387000],
      ['(120H) 1.430 Robux (Sau Thuế Nhận - 1.000 Robux)',257000]
    ];
    renderServices();
    const grid=document.getElementById('serviceGrid');
    if(!grid||grid.dataset.robux120hStyled) return;
    const cards=grid.querySelectorAll('.card');
    const card=[...cards].find(c=>c.textContent.includes('Robux 120H'));
    if(card){
      card.insertAdjacentHTML('afterbegin','<div style="display:flex;align-items:center;justify-content:center;margin-bottom:12px"><span style="display:inline-flex;width:62px;height:62px;align-items:center;justify-content:center;border-radius:18px;background:linear-gradient(135deg,#fff7d6,#ffe08a);font-size:32px">💰</span></div>');
      card.insertAdjacentHTML('beforeend','<div class="msg" style="font-size:12px;margin-top:10px">💰 Robux 120H — nhận Robux sau thuế theo từng gói.</div>');
    }
    grid.dataset.robux120hStyled='1';
  }

  function addBlackbeardCape(){
    if(typeof catalog==='undefined'||typeof renderServices!=='function') return;
    const key='Kiếm / Súng / Phụ kiện';
    if(!Array.isArray(catalog[key])) return;
    const packageName='Lấy áo choàng râu đen';
    if(!catalog[key].some(x=>x[0]===packageName)){
      catalog[key].push([packageName,90000]);
      renderServices();
    }
  }

  function moneyTop(v){return Number(v||0).toLocaleString('vi-VN')+' đ'}
  function escTop(v){return String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]))}

  async function fixedTop5(){
    const el=document.getElementById('top5');
    if(!el) return;
    try{
      const url=window.SUPABASE_URL||'https://ufevipuhejvhiufyqqnz.supabase.co';
      const key=window.SUPABASE_KEY||'sb_publishable_6ShPhvGpN4_02Za2tOTOTg_GF0su_OA';
      const r=await fetch(url+'/rest/v1/rpc/get_top_deposit_ranking',{
        method:'POST',
        headers:{apikey:key,Authorization:'Bearer '+(localStorage.getItem('shopzicl_username_token')||key),'Content-Type':'application/json'},
        body:'{}'
      });
      if(!r.ok) throw Error(await r.text()||r.statusText);
      const rows=await r.json();
      const top=(Array.isArray(rows)?rows:[]).slice(0,5);
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

  function startTop5Guard(){
    fixedTop5();
    setTimeout(fixedTop5,500);
    setTimeout(fixedTop5,1500);
    setTimeout(fixedTop5,3000);
    const el=document.getElementById('top5');
    if(el&&window.MutationObserver){
      let timer=null;
      const observer=new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(fixedTop5,80)});
      observer.observe(el,{childList:true,subtree:true});
    }
  }

  function boot(){addVngService();addAvatarService();addBlackbeardCape();setTimeout(startTop5Guard,150)}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  window.addEventListener('focus',()=>setTimeout(fixedTop5,150));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(fixedTop5,150)});
})();
