// ShopZiCiCRBLX - bổ sung card GAMEPASS BLOX FRUITS vào trang shop chính.
(function(){
  function addGamepassCard(){
    const grid=document.getElementById('serviceGrid');
    if(!grid || document.getElementById('gamepass-blox-fruits-card')) return;

    const card=document.createElement('article');
    card.className='card';
    card.id='gamepass-blox-fruits-card';
    card.innerHTML=`
      <div style="font-size:42px">🎮</div>
      <h3>GAMEPASS BLOX FRUITS</h3>
      <span class="status">Sẵn sàng</span>
      <button class="btn dark full" type="button">XEM GÓI →</button>
    `;
    card.querySelector('button').addEventListener('click',function(){
      window.location.href='gamepass-blox-fruits.html';
    });
    grid.appendChild(card);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addGamepassCard);
  else addGamepassCard();
})();
