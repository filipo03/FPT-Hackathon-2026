/* ── Hi-Fi shared primitives ────────────────────────────────── */

const Tr = (sk, en) => (window.HF_LANG === 'en' ? en : sk);
window.Tr = Tr;

/* Navigation context — used by interactive prototype. When absent, screens
   behave statically (as in DesignCanvas presentation). */
const NavCtx = React.createContext(null);
window.NavCtx = NavCtx;
function useNav(){
  const ctx = React.useContext(NavCtx);
  // Safe no-op when no provider
  return ctx || { go: ()=>{}, openPalette: ()=>{}, toast: ()=>{}, current:null };
}
window.useNav = useNav;

/* Inline SVG icons — light geometry, 1.5 stroke */
const Icon = ({n, size=18, c='currentColor'}) => {
  const s = size;
  const stroke = { stroke:c, strokeWidth:1.6, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' };
  const I = {
    dash:    <g {...stroke}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></g>,
    grid:    <g {...stroke}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></g>,
    guests:  <g {...stroke}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M21 18c0-2.5-1.8-4.5-4-4.5"/></g>,
    house:   <g {...stroke}><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></g>,
    plus:    <g {...stroke}><path d="M12 5v14M5 12h14"/></g>,
    cash:    <g {...stroke}><rect x="2.5" y="6" width="19" height="12" rx="1.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/></g>,
    report:  <g {...stroke}><path d="M4 20V8M10 20V4M16 20v-8M22 20V12"/></g>,
    tasks:   <g {...stroke}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 12l3 3 7-7"/></g>,
    bell:    <g {...stroke}><path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5L6 16z"/><path d="M10 21h4"/></g>,
    search:  <g {...stroke}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></g>,
    set:     <g {...stroke}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.4-2.3l2-1.6-2-3.4-2.4.9a7 7 0 00-3.9-2.2L11.8 1h-3.6l-.5 2.4a7 7 0 00-3.9 2.2L1.4 4.7l-2 3.4 2 1.6A7 7 0 001 12c0 .8.1 1.6.4 2.3l-2 1.6 2 3.4 2.4-.9c1.1 1 2.4 1.8 3.9 2.2l.5 2.4h3.6l.5-2.4c1.5-.4 2.8-1.2 3.9-2.2l2.4.9 2-3.4-2-1.6c.3-.7.4-1.5.4-2.3z"/></g>,
    arrow:   <g {...stroke}><path d="M5 12h14M13 6l6 6-6 6"/></g>,
    chev:    <g {...stroke}><path d="M9 6l6 6-6 6"/></g>,
    chevD:   <g {...stroke}><path d="M6 9l6 6 6-6"/></g>,
    filter:  <g {...stroke}><path d="M3 5h18M6 12h12M10 19h4"/></g>,
    print:   <g {...stroke}><rect x="6" y="3" width="12" height="6"/><rect x="3" y="9" width="18" height="9" rx="1.5"/><rect x="6" y="14" width="12" height="6"/></g>,
    proc:    <g {...stroke}><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5 5l2.1 2.1M16.9 16.9L19 19M5 19l2.1-2.1M16.9 7.1L19 5"/></g>,
    cal:     <g {...stroke}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></g>,
    medical: <g {...stroke}><path d="M12 4v16M4 12h16" /></g>,
    chat:    <g {...stroke}><path d="M21 12a8 8 0 11-3.5-6.6L21 4l-1.4 3.5A8 8 0 0121 12z"/></g>,
    star:    <g {...stroke}><path d="M12 3l2.8 6 6.6.5-5 4.4 1.6 6.5L12 17l-6 3.4 1.6-6.5-5-4.4 6.6-.5z"/></g>,
    warn:    <g {...stroke}><path d="M12 3l10 18H2L12 3zM12 10v5M12 18v.5"/></g>,
    pill:    <g {...stroke}><rect x="2.5" y="8" width="19" height="8" rx="4"/><path d="M12 8v8"/></g>,
    key:     <g {...stroke}><circle cx="8" cy="14" r="4"/><path d="M11 11l9-9M16 7l3 3"/></g>,
    door:    <g {...stroke}><rect x="5" y="3" width="14" height="18"/><circle cx="15" cy="12" r=".5" fill="currentColor"/></g>,
    bed:     <g {...stroke}><path d="M3 20v-5a3 3 0 013-3h12a3 3 0 013 3v5"/><path d="M3 18h18M7 12V8a2 2 0 012-2h6a2 2 0 012 2v4"/></g>,
    user:    <g {...stroke}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></g>,
    sun:     <g {...stroke}><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/></g>,
    moon:    <g {...stroke}><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></g>,
    expand:  <g {...stroke}><path d="M4 9V4h5M20 15v5h-5M9 20H4v-5M15 4h5v5"/></g>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24">{I[n] || <circle cx="12" cy="12" r="4" {...stroke}/>}</svg>;
};
window.Icon = Icon;

/* Sidebar (canonical) */
function HFSidebar({ active='dash' }){
  const nav = useNav();
  const collapsed = nav.sidebarCollapsed;
  const items = [
    { k:'dash',  ic:'dash',   label:Tr('Prehľad','Dashboard') },
    { k:'grid',  ic:'cal',    label:Tr('Rezervácie','Reservations'), badge:'3' },
    { k:'guests',ic:'guests', label:Tr('Hostia · pacienti','Guests') },
    { k:'house', ic:'house',  label:Tr('Izby & HK','Rooms & HK') },
    { k:'proc',  ic:'proc',   label:Tr('Procedúry','Procedures') },
    { k:'cash',  ic:'cash',   label:Tr('Kasa & faktúry','Cashier') },
    { k:'rep',   ic:'report', label:Tr('Reporty','Reports') },
  ];
  return (
    <div className={`sb${collapsed?' collapsed':''}`}>
      <button className="sb-burger" onClick={()=>nav.toggleSidebar && nav.toggleSidebar()} title={Tr('Skryť / ukázať bočný panel','Toggle sidebar')}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          {collapsed ? <path d="M9 6l6 6-6 6"/> : <path d="M15 6l-6 6 6 6"/>}
        </svg>
      </button>
      <div className="sb-brand">
        <div className="mark">H&amp;S</div>
        <div>
          <div className="name">Hotel &amp; Spa Resort</div>
          <div className="sub">Front Office · Recepcia 1</div>
        </div>
      </div>
      <div className="sb-nav">
        {items.map(it=>(
          <div key={it.k} className={`it ${active===it.k?'on':''}`} onClick={()=>nav.go(it.k)}>
            <div className="ic"><Icon n={it.ic}/></div>
            <span>{it.label}</span>
            {it.badge && <span className="b">{it.badge}</span>}
          </div>
        ))}
      </div>
      <div className="sb-sec">{Tr('Účet','Account')}</div>
      <div className="sb-nav">
        <div className="it" onClick={()=>nav.go('tasks')}><div className="ic"><Icon n="tasks"/></div><span>{Tr('Úlohy & denník','Tasks & log')}</span><span className="b" style={{background:'var(--warn)',color:'#3A2402'}}>5</span></div>
        <div className="it"><div className="ic"><Icon n="set"/></div><span>{Tr('Nastavenia','Settings')}</span></div>
      </div>
      <div className="sb-bottom">
        <div className="sb-user">
          <div className="av md" style={{background:'linear-gradient(135deg,#5DD3E8,#2E5BFF)'}}>JK</div>
          <div className="col">
            <div className="name">Jana Kováčová</div>
            <div className="sub">{Tr('Recepčná · zmena 06–14','Reception · shift 6–14')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.HFSidebar = HFSidebar;

/* Top bar */
function HFTopbar({ title, sub, actions, search=true }){
  const nav = useNav();
  const isDark = nav.dark;
  return (
    <div className="tb">
      <div className="title">
        <h2>{title}</h2>
        {sub && <div className="sub">{sub}</div>}
      </div>
      <div className="grow"/>
      {search && (
        <div className="search" onClick={()=>nav.openPalette && nav.openPalette()} style={{cursor:'pointer'}}>
          <Icon n="search" size={15}/>
          <span>{Tr('Hľadať hosťa, izbu, rezerváciu, faktúru…','Search guest, room, reservation, invoice…')}</span>
          <span className="kbd">Ctrl+K</span>
        </div>
      )}
      <button className="btn icn" onClick={()=>nav.toggleDark && nav.toggleDark()}
        title={Tr(isDark?'Svetlý režim':'Tmavý režim', isDark?'Light mode':'Dark mode')}>
        <Icon n={isDark?'sun':'moon'} size={16}/>
      </button>
      <div style={{position:'relative',marginRight:6}}>
        <div className="av" style={{width:34,height:34,background:'linear-gradient(135deg,#5DD3E8,#2E5BFF)'}}>JK</div>
      </div>
      <div className="divider-v" style={{height:24}}/>
      {actions}
    </div>
  );
}
window.HFTopbar = HFTopbar;

/* Screen scaffold */
function HFScreen({ active, title, sub, actions, search=true, children, padContent=true }){
  const nav = useNav();
  return (
    <div className={`hf is-screen${nav.dark?' dark':''}`}>
      <div style={{position:'absolute',inset:0,display:'flex'}}>
        <HFSidebar active={active}/>
        <div className="grow col" style={{minWidth:0}}>
          <HFTopbar title={title} sub={sub} actions={actions} search={search}/>
          <div className="grow" style={{overflow:'hidden', background:'var(--bg)', padding: padContent? '20px':'0'}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
window.HFScreen = HFScreen;

/* Avatar helper */
function Av({name='AB', tone, sz='md'}){
  const cls = sz==='lg'?'lg':sz==='xl'?'xl':sz==='sm'?'':'md';
  const grad = tone || 'linear-gradient(135deg,#2E5BFF,#0F1F4D)';
  return <div className={`av ${cls}`} style={{background:grad}}>{name}</div>;
}
window.Av = Av;

/* Pill */
function P({k, ic, children, style}){
  return <span className={`pill ${k||''}`} style={style}>{ic && <Icon n={ic} size={11}/>}{children}</span>;
}
window.P = P;

/* Section title */
function ST({children, action}){
  return <div className="row between center" style={{marginBottom:12}}>
    <h3>{children}</h3>
    {action}
  </div>;
}
window.ST = ST;

/* Spa data */
window.HFDATA = {
  today: { date: 'Pi · 21. máj 2026', shift: '06:00 – 14:00', user:'Jana Kováčová' },
  rooms: [
    { no:'201', cat:'Štandard Park · 1L',     wing:'Astória' },
    { no:'202', cat:'Štandard Park · 2L',     wing:'Astória' },
    { no:'203', cat:'Superior Park · 2L',     wing:'Astória' },
    { no:'205', cat:'Superior · 2L',          wing:'Astória' },
    { no:'301', cat:'Štandard · 1L',          wing:'Ozón' },
    { no:'302', cat:'Apartmán Premium',       wing:'Ozón' },
    { no:'303', cat:'Superior Spa · 2L',      wing:'Ozón' },
    { no:'401', cat:'Premium Spa · 2L',       wing:'Alžbeta' },
    { no:'402', cat:'Premium Spa · 2L',       wing:'Alžbeta' },
    { no:'403', cat:'Štandard · 1L',          wing:'Alžbeta' },
  ],
};

/* small helper */
function CardHeader({title, action, eyebrow}){
  return <div className="row between center" style={{padding:'14px 16px',borderBottom:'1px solid var(--line)'}}>
    <div className="col" style={{lineHeight:1.2}}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h3>{title}</h3>
    </div>
    {action}
  </div>;
}
window.CardHeader = CardHeader;
