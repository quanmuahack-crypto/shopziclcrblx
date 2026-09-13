(()=>{
  const GAMEPASS={
    'GAMEPASS BLOX FRUITS':[
      ['Fruit Notifier — 2.700 Robux',300000],
      ['Dark Blade — 1.200 Robux',160000],
      ['Mythical Scrolls — 500 Robux',78000],
      ['2× Money — 450 Robux',60000],
      ['2× Mastery — 450 Robux',60000],
      ['+1 Fruit Storage — 400 Robux',51000],
      ['2× Boss Drops — 350 Robux',45000],
      ['Fast Boats — 350 Robux',45000]
    ],
    'Trái Vĩnh Viễn BF':[
      ['Spirit — 2.550 Robux',432500],['Gas — 2.500 Robux',425000],['Venom — 2.450 Robux',417500],['Shadow — 2.425 Robux',413750],
      ['Dragon — 5.000 Robux',750000],['Control — 4.000 Robux',550000],['Kitsune — 4.000 Robux',546000],['Yeti — 3.000 Robux',446000],
      ['Tiger — 3.000 Robux',446000],['Dough — 2.400 Robux',410000],['T-Rex — 2.350 Robux',402500],['Mammoth — 2.350 Robux',402500],
      ['Gravity — 2.300 Robux',395000],['Blizzard — 2.250 Robux',387500],['Pain — 2.200 Robux',380000],['Lightning — 2.100 Robux',365000],
      ['Phoenix — 2.000 Robux',350000],['Portal — 2.000 Robux',350000],['Sound — 1.900 Robux',335000],['Spider — 1.800 Robux',320000],
      ['Creation — 1.750 Robux',312500],['Love — 1.700 Robux',305000],['Buddha — 1.650 Robux',297500],['Quake — 1.500 Robux',275000],['Magma — 1.300 Robux',245000]
    ]
  };
  const SAFE=new Set(Object.keys(GAMEPASS));
  function add(){
    if(typeof catalog==='undefined') return;
    Object.keys(GAMEPASS).forEach(n=>{catalog[n]=GAMEPASS[n];});
    if(typeof renderServices==='function') renderServices();
  }
  window.addEventListener('load',add);
  setTimeout(add,0);
  window.isSimpleRobloxService=window.isSimpleRobloxService||function(n){return SAFE.has(String(n||''));};
})();
