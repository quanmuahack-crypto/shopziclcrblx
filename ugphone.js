(function(){
  const data={
    'UGPHONE GVIP':[
      ['GVIP 2 ngày',30000,'Treo 2–3 tab Roblox'],
      ['GVIP 5 ngày',35000,'Treo 2–3 tab Roblox'],
      ['GVIP 7 ngày',40000,'Treo 2–3 tab Roblox'],
      ['GVIP 10 ngày',55000,'Treo 2–3 tab Roblox'],
      ['GVIP 15 ngày',75000,'Treo 2–3 tab Roblox'],
      ['GVIP 30 ngày',150000,'Treo 2–3 tab Roblox']
    ],
    'UGPHONE SVIP':[
      ['SVIP 7 ngày',100000,'Treo 6 tab Roblox'],
      ['SVIP 15 ngày',160000,'Treo 6 tab Roblox'],
      ['SVIP 30 ngày',250000,'Treo 6 tab Roblox']
    ]
  };
  function money(n){return Number(n).toLocaleString('vi-VN')+' đ'}
  function esc(v){return String(v).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]))}
  function mount(){
    if(document.getElementById('ugphone-services')) return;
    const root=document.createElement('section');root.id='ugphone-services';root.className='section';
    root.innerHTML='<h2>☁️ Dịch vụ UGPHONE</h2><p>Chọn GVIP hoặc SVIP phù hợp nhu cầu treo Roblox.</p><div id="ugphone-groups"></div>';
    const groups=root.querySelector('#ugphone-groups');
    Object.entries(data).forEach(([name,items])=>{
      const box=document.createElement('div');box.className='ug-group';
      box.innerHTML='<h3>'+esc(name)+'</h3><div class="ug-grid">'+items.map((x,i)=>'<div class="card ug-card"><div class="status">'+(name.includes('SVIP')?'👑 SVIP':'💎 GVIP')+'</div><h3>'+esc(x[0])+'</h3><p>'+esc(x[2])+'</p><b class="money">'+money(x[1])+'</b><button class="btn dark full ug-order" data-name="'+esc(x[0])+'" data-price="'+x[1]+'">XEM GÓI →</button></div>').join('')+'</div>';
      groups.appendChild(box);
    });
    const services=document.getElementById('services');
    if(services) services.parentNode.insertBefore(root,services.nextSibling); else document.querySelector('main')?.appendChild(root);
    root.querySelectorAll('.ug-order').forEach(btn=>btn.addEventListener('click',()=>{
      if(typeof openOrder==='function'){
        openOrder(nameFromButton(btn),null);
        setTimeout(()=>{const s=document.getElementById('package');if(s){const opt=[...s.options].find(o=>o.textContent.includes(btn.dataset.name));if(opt)s.value=opt.value;}},0);
      } else alert('Vui lòng đăng nhập rồi thử lại.');
    }));
  }
  function nameFromButton(btn){return btn.dataset.name}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
