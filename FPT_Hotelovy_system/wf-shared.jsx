/* Shared wireframe primitives ----------------------------------- */
const NAV_ITEMS = [
  { k:'dash',  label:{sk:'Prehľad',          en:'Dashboard'},  ic:'◧' },
  { k:'grid',  label:{sk:'Rezervácie',       en:'Reservations'}, ic:'▦', badge:'3' },
  { k:'guest', label:{sk:'Hostia / pacienti',en:'Guests'},     ic:'◉' },
  { k:'house', label:{sk:'Izby & housekeep.',en:'Rooms & HK'}, ic:'◰' },
  { k:'proc',  label:{sk:'Procedúry',        en:'Procedures'}, ic:'✚' },
  { k:'bill',  label:{sk:'Kasa & faktúry',   en:'Cashier'},    ic:'＄' },
  { k:'rep',   label:{sk:'Reporty',          en:'Reports'},    ic:'≣' },
];
const NAV_BOTTOM = [
  { k:'tasks', label:{sk:'Úlohy & denník',   en:'Tasks & log'}, ic:'☑' },
  { k:'set',   label:{sk:'Nastavenia',       en:'Settings'},    ic:'⚙' },
];

const T = (sk, en) => (window.WF_LANG === 'en' ? en : sk);

function Sidebar({ active='dash', wide=false }){
  if(wide){
    return (
      <div className="sb-wide">
        <div className="row center gap-8" style={{padding:'4px 8px 14px'}}>
          <div className="logo" style={{width:30,height:30,border:'1.5px solid #fff',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Caveat,cursive',fontWeight:700,fontSize:16}}>kB</div>
          <div className="col" style={{lineHeight:1.1}}>
            <div style={{fontSize:11,fontWeight:700,color:'#fff'}}>Kúpele Bardejov</div>
            <div style={{fontSize:9,color:'#8a93b3'}}>Front Office · Recepcia 1</div>
          </div>
        </div>
        {NAV_ITEMS.map(n => (
          <div key={n.k} className={`nav ${active===n.k?'on':''}`}>
            <div className="ic">{n.ic}</div>
            <span>{T(n.label.sk, n.label.en)}</span>
            {n.badge && <span className="b">{n.badge}</span>}
          </div>
        ))}
        <div className="sec">{T('Účet','Account')}</div>
        {NAV_BOTTOM.map(n => (
          <div key={n.k} className="nav">
            <div className="ic">{n.ic}</div>
            <span>{T(n.label.sk, n.label.en)}</span>
          </div>
        ))}
        <div className="grow"></div>
        <div className="row center gap-8" style={{padding:'8px 10px',borderTop:'1px solid rgba(255,255,255,.1)'}}>
          <div className="av" style={{background:'#1B6FDB',color:'#fff',border:'none'}}>JK</div>
          <div className="col" style={{lineHeight:1.1}}>
            <div style={{fontSize:10.5,fontWeight:700,color:'#fff'}}>Jana Kováčová</div>
            <div style={{fontSize:9,color:'#8a93b3'}}>Recepčná · Zmena 6–14</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="sb">
      <div className="logo">kB</div>
      {NAV_ITEMS.map(n => (
        <div key={n.k} className={`icn ${active===n.k?'on':''}`} title={T(n.label.sk,n.label.en)}>
          {n.ic}{n.badge && <span className="b">{n.badge}</span>}
        </div>
      ))}
      <div className="grow"></div>
      {NAV_BOTTOM.map(n => (<div key={n.k} className="icn">{n.ic}</div>))}
      <div className="icn" style={{background:'#1B6FDB',border:'none',fontWeight:700}}>JK</div>
    </div>
  );
}

function TopBar({ title, sub, actions, search=true }){
  return (
    <div className="tb">
      <div className="col" style={{lineHeight:1.1}}>
        <h2>{title}</h2>
        {sub && <div className="muted small" style={{marginTop:2}}>{sub}</div>}
      </div>
      {search && (
        <div className="search">
          <span>⌕</span>
          <span className="muted">{T('Hľadať hosťa, izbu, rezerváciu…','Search guest, room, reservation…')}</span>
          <span className="grow"></span>
          <span className="kbd">⌘K</span>
        </div>
      )}
      <div className="row gap-6 center">
        {actions || (<>
          <button className="btn"><span>🔔</span>{T('3 úlohy','3 tasks')}</button>
          <button className="btn primary">+ {T('Nová rezervácia','New reservation')}</button>
        </>)}
      </div>
    </div>
  );
}

function Pill({ k, children, style }){
  return <span className={`pill ${k||''}`} style={style}>{children}</span>;
}
function Dot({ k, style }){ return <span className={`dot ${k||''}`} style={style}></span>; }
function Avatar({ name='AB', tone, lg, md }){
  const cls = lg?'lg':(md?'md':'');
  return <span className={`av ${cls}`} style={tone?{background:tone,color:'#fff',border:'none'}:{}}>{name}</span>;
}

/* Sticky note annotation absolutely positioned */
function Note({ x, y, w, k, rot, children }){
  return <div className={`stickynote ${k||''}`} style={{position:'absolute', left:x, top:y, width:w||180, transform:`rotate(${rot ?? -1.2}deg)`, zIndex:5}}>{children}</div>;
}

/* Screen scaffold: sidebar + topbar + body */
function Screen({ children, active, wide, sidebar=true, topbar=true, title, sub, actions, search=true }){
  return (
    <div className="wf is-screen row" style={{display:'flex'}}>
      {sidebar && <Sidebar active={active} wide={wide}/>}
      <div className="col grow" style={{minWidth:0}}>
        {topbar && <TopBar title={title} sub={sub} actions={actions} search={search}/>}
        <div className="grow" style={{overflow:'hidden', background:'var(--paper)'}}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* Sample names + data, Bardejov-style */
const GUESTS = [
  { id:'g1', name:'Ing. Jozef Novák',     init:'JN', tone:'#1B6FDB', age:68, sex:'M', dx:'VI/3 koxartróza', ins:'VšZP', country:'SK', allergy:'Penicilín' },
  { id:'g2', name:'Mária Kováčová',       init:'MK', tone:'#7857C7', age:64, sex:'Ž', dx:'VI/4 gonartróza', ins:'Dôvera', country:'SK' },
  { id:'g3', name:'Štefan Šimko',         init:'ŠŠ', tone:'#2FA76E', age:71, sex:'M', dx:'VII/8',          ins:'Union',  country:'SK' },
  { id:'g4', name:'Anna Pavlíková',       init:'AP', tone:'#E8B23A', age:59, sex:'Ž', dx:'X/2 psoriáza',   ins:'samoplatca', country:'SK' },
  { id:'g5', name:'Mgr. Peter Hudák',     init:'PH', tone:'#D6453B', age:55, sex:'M', dx:'VI/2',           ins:'VšZP', country:'SK' },
  { id:'g6', name:'Gabriela Tomečková',   init:'GT', tone:'#5DD3E8', age:62, sex:'Ž', dx:'wellness',       ins:'samoplatca', country:'SK' },
  { id:'g7', name:'Ján Bobula',           init:'JB', tone:'#0F1F4D', age:74, sex:'M', dx:'II/4 hyper.',    ins:'Dôvera', country:'SK' },
  { id:'g8', name:'Hanna Kowalska',       init:'HK', tone:'#A86B2E', age:67, sex:'Ž', dx:'VI/3',           ins:'NFZ-PL',  country:'PL' },
  { id:'g9', name:'Ladislav Varga',       init:'LV', tone:'#1B6FDB', age:60, sex:'M', dx:'I/2 onkol.',     ins:'VšZP',   country:'SK' },
  { id:'g10', name:'Helena Sopková',      init:'HS', tone:'#7857C7', age:69, sex:'Ž', dx:'VI/4',           ins:'VšZP',   country:'SK' },
];

const ROOMS = [
  { no:'201', wing:'Astória', type:'1L', cat:'Štandard Park',     beds:1, floor:2 },
  { no:'202', wing:'Astória', type:'2L', cat:'Štandard Park',     beds:2, floor:2 },
  { no:'203', wing:'Astória', type:'2L', cat:'Superior',          beds:2, floor:2 },
  { no:'204', wing:'Astória', type:'1L', cat:'Štandard',          beds:1, floor:2 },
  { no:'205', wing:'Astória', type:'2L', cat:'Superior',          beds:2, floor:2 },
  { no:'301', wing:'Ozón',    type:'1L', cat:'Štandard',          beds:1, floor:3 },
  { no:'302', wing:'Ozón',    type:'2L', cat:'Apartmán Bardejov', beds:2, floor:3 },
  { no:'303', wing:'Ozón',    type:'2L', cat:'Superior Spa',      beds:2, floor:3 },
  { no:'304', wing:'Ozón',    type:'1L', cat:'Štandard',          beds:1, floor:3 },
  { no:'401', wing:'Alžbeta', type:'2L', cat:'Premium Spa',       beds:2, floor:4 },
  { no:'402', wing:'Alžbeta', type:'2L', cat:'Premium Spa',       beds:2, floor:4 },
  { no:'403', wing:'Alžbeta', type:'1L', cat:'Štandard',          beds:1, floor:4 },
];

const PROC = [
  'Uhličitý kúpeľ', 'Slatinný zábal', 'Inhalácia',
  'Magnetoterapia', 'Hydromasáž', 'Klasická masáž',
  'Pitná kúra', 'Vodoliečba', 'Elektroliečba',
  'Parafínový obklad', 'Soľná jaskyňa', 'Plynové injekcie'
];

const PACKAGES = [
  { id:'KKL', name:'Klasická kúpeľná liečba', nights:21, dieta:'D2', tone:'#0F1F4D' },
  { id:'RVK', name:'Relax víkend',            nights:2,  dieta:'D1', tone:'#5DD3E8' },
  { id:'CCO', name:'Cigeľka Comfort',         nights:7,  dieta:'D2', tone:'#1B6FDB' },
  { id:'ANS', name:'Antistresový pobyt',      nights:5,  dieta:'D1', tone:'#7857C7' },
  { id:'AGE', name:'Aktívne starnutie',       nights:8,  dieta:'D3', tone:'#2FA76E' },
];

Object.assign(window, { Sidebar, TopBar, Pill, Dot, Avatar, Note, Screen, GUESTS, ROOMS, PROC, PACKAGES, T, NAV_ITEMS });
