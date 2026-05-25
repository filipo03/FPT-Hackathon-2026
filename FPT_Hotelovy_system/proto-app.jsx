/* ── Prototype app: routing, palette overlay, toasts ─────────── */

/* Toast container — renders a stack of dismissable messages */
function ToastStack({ toasts, onClear }){
  return (
    <div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',zIndex:200,display:'flex',flexDirection:'column',gap:8,pointerEvents:'none'}}>
      {toasts.map(t=>(
        <div key={t.id} style={{
          background:'#0F1F4D',color:'#fff',padding:'12px 18px',borderRadius:10,
          fontSize:13,fontWeight:500,boxShadow:'0 20px 50px rgba(6,18,48,0.30), 0 6px 14px rgba(6,18,48,0.20)',
          display:'flex',alignItems:'center',gap:10,pointerEvents:'auto',
          animation:'toastIn 240ms ease'
        }}>
          <div style={{width:8,height:8,borderRadius:99,background:'#5DD3E8'}}/>
          <span>{t.msg}</span>
          <button onClick={()=>onClear(t.id)} style={{background:'transparent',border:'none',color:'rgba(255,255,255,0.6)',cursor:'pointer',padding:0,marginLeft:8,fontSize:18,lineHeight:1}}>×</button>
        </div>
      ))}
    </div>
  );
}

/* Palette overlay — interactive search */
function PaletteOverlay({ onClose, onPick }){
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  const [sel, setSel] = React.useState(0);

  React.useEffect(()=>{ inputRef.current && inputRef.current.focus(); }, []);

  const allItems = [
    { type:'guest', name:'Ing. Jozef Novák',   sub:'SK · 1957 · VIP · 8 pobytov · izba 203 (dnes)', tone:'#2E5BFF', init:'JN', go:'guest' },
    { type:'guest', name:'Peter Novák',         sub:'SK · 1989 · 1 pobyt · 2023', tone:'#7857C7', init:'PN', go:'guest' },
    { type:'guest', name:'Mgr. Alžbeta Nováková', sub:'manželka J. Nováka · spol. izba 203', tone:'#DA3B33', init:'AN', go:'guest' },
    { type:'res',   name:'R-2026-1248 · Novák +1 · KKL · izba 203', sub:'21. 5. – 11. 6. 2026 · 21n · VIP', icon:'cal', go:'grid' },
    { type:'res',   name:'R-2024-0884 · Novák · KKL · izba 207',     sub:'5. – 26. 5. 2024 · archív', icon:'cal', go:'guest' },
    { type:'action',name:'+ Nová rezervácia pre Nováka',             sub:'pre-fill auto', icon:'plus', go:'newres' },
    { type:'action',name:'Check-in vybraného hosťa',                  sub:'Novák · izba 203 · dnes 9–10', icon:'key', go:'checkin' },
    { type:'action',name:'Otvoriť M4 vstupnú prehliadku',             sub:'Novák · 22. 5. 9:00', icon:'medical', go:'proc' },
    { type:'res',   name:'R-2026-0941 · Bobula J. · izba 401',        sub:'14n · check-out dnes 11:00', icon:'cal', go:'checkout' },
    { type:'guest', name:'Bobula Ján',           sub:'1952 · VIP · izba 401 · odchod dnes', tone:'#0F1F4D', init:'JB', go:'checkout' },
  ];

  const filtered = allItems.filter(i => !q || (i.name+i.sub).toLowerCase().includes(q.toLowerCase()));
  const grouped = { guest: filtered.filter(i=>i.type==='guest'), res: filtered.filter(i=>i.type==='res'), action: filtered.filter(i=>i.type==='action') };
  const order = [...grouped.guest, ...grouped.res, ...grouped.action];

  React.useEffect(()=>{ setSel(0); }, [q]);

  const onKey = (e) => {
    if(e.key==='Escape'){ e.preventDefault(); onClose(); }
    else if(e.key==='Enter'){
      const item = order[sel];
      if(item){ onPick(item); }
    }
    else if(e.key==='ArrowDown'){ e.preventDefault(); setSel(s=>Math.min(s+1, order.length-1)); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); setSel(s=>Math.max(s-1, 0)); }
  };

  return (
    <div style={{position:'fixed',inset:0,zIndex:150,display:'flex',justifyContent:'center',alignItems:'flex-start',paddingTop:90}}>
      {/* Dim */}
      <div onClick={onClose} style={{position:'absolute',inset:0,background:'rgba(6,18,48,0.55)',backdropFilter:'blur(3px)',animation:'fadeIn 160ms'}}/>
      {/* Palette */}
      <div className="hf" style={{position:'relative',width:720,maxHeight:520,background:'#fff',borderRadius:14,boxShadow:'0 40px 100px rgba(6,18,48,0.45)',overflow:'hidden',display:'flex',flexDirection:'column',animation:'paletteIn 220ms cubic-bezier(.2,.7,.3,1.2)'}}>
        <div className="row center gap-12" style={{padding:'18px 20px',borderBottom:'1px solid var(--line)'}}>
          <Icon n="search" size={20} c="#5C6481"/>
          <input ref={inputRef} type="text" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={onKey}
            placeholder={Tr('Hľadať hosťa, izbu, rezerváciu, faktúru…','Search…')}
            style={{border:'none',outline:'none',background:'transparent',fontSize:18,padding:0,fontWeight:500,color:'var(--ink-1)',flex:1}}/>
          <span className="kbd">esc</span>
        </div>
        <div style={{overflowY:'auto',flex:1}}>
          {order.length===0 && (
            <div style={{padding:'40px 20px',textAlign:'center'}}>
              <Icon n="search" size={32} c="#B6BACB"/>
              <div className="muted" style={{marginTop:8}}>{Tr('Nič nenájdené pre','No results for')} „{q}"</div>
            </div>
          )}
          {grouped.guest.length>0 && (<>
            <div style={{padding:'10px 20px 4px',background:'var(--bg)'}}><div className="eyebrow">{Tr('HOSTIA','GUESTS')} · {grouped.guest.length}</div></div>
            {grouped.guest.map((r,i)=>{
              const idx = order.indexOf(r);
              return (
                <div key={i} className="row center gap-14" onClick={()=>onPick(r)}
                  style={{padding:'12px 20px',cursor:'pointer',background:idx===sel?'var(--blue-50)':'#fff',boxShadow:idx===sel?'inset 2px 0 0 var(--blue)':'none'}}>
                  <Av name={r.init} sz="md" tone={`linear-gradient(135deg,${r.tone},${r.tone}99)`}/>
                  <div className="col grow" style={{lineHeight:1.25,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:600}}>{highlightMatch(r.name, q)}</div>
                    <div className="xs muted" style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r.sub}</div>
                  </div>
                  <span className="pill outline">{Tr('Hosť','Guest')}</span>
                  {idx===sel && <span className="kbd">↵</span>}
                </div>
              );
            })}
          </>)}
          {grouped.res.length>0 && (<>
            <div style={{padding:'10px 20px 4px',background:'var(--bg)',borderTop:'1px solid var(--line)'}}><div className="eyebrow">{Tr('REZERVÁCIE','RESERVATIONS')} · {grouped.res.length}</div></div>
            {grouped.res.map((r,i)=>{
              const idx = order.indexOf(r);
              return (
                <div key={i} className="row center gap-14" onClick={()=>onPick(r)}
                  style={{padding:'12px 20px',cursor:'pointer',background:idx===sel?'var(--blue-50)':'#fff',boxShadow:idx===sel?'inset 2px 0 0 var(--blue)':'none'}}>
                  <div className="av" style={{background:'var(--ok-soft)',color:'var(--ok)',width:36,height:36}}><Icon n="cal" size={16}/></div>
                  <div className="col grow" style={{lineHeight:1.25,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:600}}>{highlightMatch(r.name, q)}</div>
                    <div className="xs muted">{r.sub}</div>
                  </div>
                  <span className="pill outline">{Tr('Rezerv.','Res')}</span>
                  {idx===sel && <span className="kbd">↵</span>}
                </div>
              );
            })}
          </>)}
          {grouped.action.length>0 && (<>
            <div style={{padding:'10px 20px 4px',background:'var(--bg)',borderTop:'1px solid var(--line)'}}><div className="eyebrow">{Tr('AKCIE','ACTIONS')} · {grouped.action.length}</div></div>
            {grouped.action.map((r,i)=>{
              const idx = order.indexOf(r);
              return (
                <div key={i} className="row center gap-14" onClick={()=>onPick(r)}
                  style={{padding:'12px 20px',cursor:'pointer',background:idx===sel?'var(--blue-50)':'#fff',boxShadow:idx===sel?'inset 2px 0 0 var(--blue)':'none'}}>
                  <div className="av" style={{background:'var(--bg-2)',color:'var(--ink-2)',width:36,height:36}}><Icon n={r.icon} size={16}/></div>
                  <div className="col grow" style={{lineHeight:1.25}}>
                    <div style={{fontSize:14,fontWeight:600}}>{highlightMatch(r.name, q)}</div>
                    <div className="xs muted">{r.sub}</div>
                  </div>
                  <span className="kbd">{r.kbd || ''}</span>
                </div>
              );
            })}
          </>)}
        </div>
        <div className="row center between" style={{padding:'10px 20px',borderTop:'1px solid var(--line)',background:'var(--bg)'}}>
          <div className="row gap-14 small muted">
            <span><span className="kbd">↑↓</span> {Tr('pohyb','navigate')}</span>
            <span><span className="kbd">↵</span> {Tr('otvor','open')}</span>
            <span><span className="kbd">esc</span> {Tr('zavri','close')}</span>
          </div>
          <span className="xs muted">{order.length} {Tr('výsledkov','results')}</span>
        </div>
      </div>
    </div>
  );
}

function highlightMatch(text, q){
  if(!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if(i<0) return text;
  return <>{text.slice(0,i)}<span style={{background:'#FFE9A8',padding:'0 3px',borderRadius:3,fontWeight:700}}>{text.slice(i,i+q.length)}</span>{text.slice(i+q.length)}</>;
}

/* Stub screens for sidebar items we haven't fully designed */
function StubScreen({ title, sub, ic='dash' }){
  return (
    <HFScreen active={ic} title={title} sub={sub}>
      <div className="card" style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',padding:40}}>
        <div className="col center" style={{textAlign:'center',maxWidth:420}}>
          <div style={{width:80,height:80,borderRadius:99,background:'var(--blue-50)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--blue)',marginBottom:18}}>
            <Icon n={ic} size={36}/>
          </div>
          <h2 style={{marginBottom:8}}>{title}</h2>
          <div className="muted" style={{fontSize:14,lineHeight:1.5}}>{Tr('Táto sekcia je v hi-fi prototype zobrazená iba ako stub. Detail dizajn je v rozsahu ďalšieho sprintu.','This section is shown as a stub in the hi-fi prototype. Detailed design is scoped for the next sprint.')}</div>
        </div>
      </div>
    </HFScreen>
  );
}

window.ToastStack = ToastStack;
window.PaletteOverlay = PaletteOverlay;
window.StubScreen = StubScreen;

/* ── Messenger overlay (bottom-right notifications / inbox) ─── */
function MessengerOverlay({ dark }){
  const nav = (typeof useNav === 'function') ? useNav() : { go:()=>{} };
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState('all');
  const [items, setItems] = React.useState(() => ([
    { id:'n1', mod:'M5', tag:'#7857C7', title:Tr('Zmena harmonogramu','Schedule change'), sub:'Novák · magnetoterapia 10:00 → 11:00', time:'pred 4 min', unread:true, go:'proc' },
    { id:'n2', mod:'HK', tag:'#5DD3E8', ink:'#0E3640', title:Tr('305 · pokazené umývadlo','305 · broken sink'), sub:'Bartošová · 11:02 · čaká na potvrdenie', time:'pred 22 min', unread:true, go:'house' },
    { id:'n3', mod:'ZP', tag:'#2FA76E', title:'VšZP · '+Tr('poukaz schválený','voucher approved'), sub:'Šimko · VS-2026-144812', time:'pred 28 min', unread:true, go:'guest' },
    { id:'n4', mod:'M5', tag:'#DA3B33', title:Tr('AUTO-KONFLIKT 25. 5.','AUTO-CONFLICT May 25'), sub:Tr('Procedúry po check-oute · vyžaduje rozhodnutie','Procs after C/O · needs decision'), time:'pred 32 min', unread:true, urgent:true, go:'proc' },
    { id:'n5', mod:'HK', tag:'#2FA76E', title:Tr('Izba 201 pripravená','Room 201 ready'), sub:'Bartošová · 11:18', time:'pred 42 min', unread:false, go:'house' },
    { id:'n6', mod:'M3', tag:'#2E5BFF', title:Tr('Nová online rezervácia','New online reservation'), sub:'Hudák P. · 5n · ANS · hold 24h', time:'pred 1 h', unread:false, go:'grid' },
  ]));

  const unreadCount = items.filter(i=>i.unread).length;
  const filtered = items.filter(i => tab==='all' ? true : tab==='unread' ? i.unread : tab==='urgent' ? i.urgent : true);

  const onPick = (i) => {
    setItems(prev => prev.map(x => x.id===i.id ? {...x, unread:false} : x));
    setOpen(false);
    if (i.go && nav.go) nav.go(i.go);
  };

  return (
    <>
      {open && (
        <div className={`hf${dark?' dark':''}`}>
        <div className="msgr-panel">
          <div className="head">
            <Icon n="chat" size={18}/>
            <div className="col" style={{lineHeight:1.2}}>
              <div className="t">{Tr('Notifikácie & správy','Notifications & messages')}</div>
              <div style={{fontSize:11,opacity:.75}}>{unreadCount} {Tr('neprečítaných','unread')}</div>
            </div>
            <button className="x" onClick={()=>setOpen(false)} title={Tr('Zavrieť','Close')}>×</button>
          </div>
          <div className="tabs" style={{borderBottom:'1px solid var(--line)'}}>
            <div className={`tab ${tab==='all'?'on':''}`} onClick={()=>setTab('all')}>{Tr('Všetky','All')} <span className="count">{items.length}</span></div>
            <div className={`tab ${tab==='unread'?'on':''}`} onClick={()=>setTab('unread')}>{Tr('Neprečítané','Unread')} <span className="count">{unreadCount}</span></div>
            <div className={`tab ${tab==='urgent'?'on':''}`} onClick={()=>setTab('urgent')}>{Tr('Urgentné','Urgent')} <span className="count" style={{background:'var(--bad-soft)',color:'var(--bad)'}}>{items.filter(i=>i.urgent).length}</span></div>
          </div>
          <div className="list">
            {filtered.length === 0 && (
              <div style={{padding:'40px 20px',textAlign:'center',color:'var(--ink-3)',fontSize:12.5}}>
                {Tr('Nič nové','Nothing new')}
              </div>
            )}
            {filtered.map(i => (
              <div key={i.id} className={`msg ${i.unread?'unread':''}`} onClick={()=>onPick(i)}>
                <div className="av" style={{background:i.tag,color:i.ink||'#fff'}}>{i.mod}</div>
                <div className="body">
                  <div className="title">{i.urgent && <span style={{color:'var(--bad)',marginRight:5}}>⚠</span>}{i.title}</div>
                  <div className="sub">{i.sub}</div>
                  <div className="time">{i.time}</div>
                </div>
                {i.unread && <div className="dot"/>}
              </div>
            ))}
          </div>
          <div className="foot">
            <div className="compose">{Tr('Napíš krátku správu kolegyni…','Quick note to a colleague…')}</div>
            <button className="btn primary sm" style={{padding:'7px 10px'}} onClick={()=>{ setItems(prev=>prev.map(x=>({...x,unread:false}))); }}>
              {Tr('Označiť ako prečítané','Mark all read')}
            </button>
          </div>
        </div>
        </div>
      )}
      <button className="msgr-bubble" onClick={()=>setOpen(o=>!o)}
        title={Tr('Notifikácie & správy','Notifications & messages')}>
        {open
          ? <span style={{fontSize:22,fontWeight:700,lineHeight:1}}>×</span>
          : <Icon n="chat" size={22}/>}
        {!open && unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>
    </>
  );
}
window.MessengerOverlay = MessengerOverlay;
