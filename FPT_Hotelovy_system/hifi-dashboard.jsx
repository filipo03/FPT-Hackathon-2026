/* ── Hi-Fi · Dashboard ──────────────────────────────────────── */

function HFDashboard(){
  const nav = useNav();
  const [expanded, setExpanded] = React.useState(false);
  React.useEffect(()=>{
    const onKey = (e)=>{ if(e.key==='Escape' && expanded){ setExpanded(false); }};
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [expanded]);
  const hours = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20'];
  const NOW_HOUR = 11.4;
  const events = [
    { t:'07:30', kind:'arr', text:'Skupina C-12 · VšZP · 32 hostí', sub:'autobus · príchod orient. 7:30–8:30 · vodca: Kollár',  done:true, approx:'07:30–08:30' },
    { t:'08:00', kind:'med', text:'M4 · vstupná prehliadka · 6 hostí',sub:'Dr. Lipták · ord. 8',                   done:true },
    { t:'09:30', kind:'arr', text:'Ing. Jozef Novák +1',                sub:'KKL · izba 203 · 21n · VIP · dohodnutý príchod 9–10', done:true, approx:'09:00–10:00' },
    { t:'10:00', kind:'task',text:'Doplniť depozit · Šimko',            sub:'250 € · izba 301',                         done:true },
    { t:'11:00', kind:'dep', text:'Bobula Ján · check-out',             sub:'izba 401 · folio 2 600 € · fixný čas do 10:00', done:false, now:true },
    { t:'12:30', kind:'arr', text:'Walk-in · očakávaný (rezervácia M3)',sub:'hold 24h · Hudák P. · príchod orient. 12–14', done:false, approx:'12:00–14:00' },
    { t:'14:00', kind:'dep', text:'Pavlíková Anna · check-out',         sub:'izba 304 · doplatok 80 € · fixný čas',     done:false },
    { t:'15:00', kind:'task',text:'Kontrola HK · 201–205',              sub:'po skupinovom príchode',                  done:false },
    { t:'17:00', kind:'arr', text:'Hudák Peter',                         sub:'Antistresový pobyt · 5n · dohodnutý príchod 17–18', done:false, approx:'17:00–18:00' },
  ];

  const kpis = [
    { l: Tr('Príchody','Arrivals'),       v:'18',     s:Tr('z 18 očakáv. · 12 hotových','12 done'),  acc:'var(--blue)' },
    { l: Tr('Odchody','Departures'),      v:'11',     s:Tr('3 čakajú doplatok','3 settle pending'), acc:'var(--warn)' },
    { l: Tr('Obsadenosť','Occupancy'),     v:'87%',    s:'168 / 192',                                  acc:'var(--ok)' },
    { l: Tr('Voľné izby','Available'),    v:'24',     s:Tr('po HK · 8 čaká','+8 after HK'),         acc:'var(--cyan)' },
    { l: Tr('Tržba zmeny','Shift revenue'),v:'12 480 €',s:'+18% MoM',                                 acc:'var(--plum)' },
  ];

  return (
    <HFScreen
      active="dash"
      title={Tr('Dobré ráno, Jana','Good morning, Jana')}
      sub={Tr('Piatok · 21. máj 2026 · zmena 06–14 · Recepcia 1','Friday · May 21, 2026 · shift 6–14 · Reception 1')}
      actions={<>
        <button className="btn"><Icon n="print" size={14}/> {Tr('Tlač denného listu','Print sheet')}</button>
        <button className="btn accent" onClick={()=>nav.go('newres')}><Icon n="plus" size={14}/> {Tr('Nová rezervácia','New reservation')}</button>
      </>}>

      <div className="col gap-16" style={{height:'100%'}}>
        {/* KPI row */}
        <div className="row gap-12" style={{visibility: expanded ? 'hidden' : 'visible'}}>
          {kpis.map((k,i)=>(
            <div key={i} className="card pad-16" style={{flex:'1 1 0',borderLeft:`3px solid ${k.acc}`,position:'relative',overflow:'hidden'}}>
              <div className="eyebrow">{k.l}</div>
              <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:32,letterSpacing:'-0.025em',marginTop:6}} className="num">{k.v}</div>
              <div className="muted small" style={{marginTop:2}}>{k.s}</div>
            </div>
          ))}
        </div>

        {/* Main 2-col */}
        <div className="row gap-16 grow" style={{minHeight:0}}>
          {/* Timeline */}
          <div className="card grow col" style={{
            minWidth:0,
            ...(expanded ? {
              position:'fixed', inset:'20px', zIndex:120,
              boxShadow:'0 40px 100px rgba(6,18,48,0.30)', flex:'unset'
            } : {})
          }}>
            <CardHeader
              eyebrow={Tr('PRIEBEH DŇA · 06:00 – 20:00','TIMELINE OF THE DAY')}
              title={Tr('Čo sa deje, čo sa chystá','What\'s happening, what\'s next')}
              action={
                <div className="row gap-6 center">
                  <div className="seg"><div className="s on">{Tr('Všetko','All')}</div><div className="s">{Tr('Príchody','Arr')}</div><div className="s">{Tr('Odchody','Dep')}</div></div>
                  <button className="btn icn"><Icon n="filter" size={15}/></button>
                  <button className="btn icn" onClick={()=>setExpanded(e=>!e)} title={Tr(expanded?'Zavrieť':'Roztiahnuť na celú obrazovku', expanded?'Close':'Expand to fullscreen')}>
                    {expanded ? <span style={{fontSize:16,fontWeight:700,lineHeight:1}}>×</span> : <Icon n="expand" size={15}/>}
                  </button>
                </div>
              }/>
            {/* hour ruler */}
            <div className="row" style={{padding:'14px 20px 6px',position:'relative'}}>
              {hours.map((h,i)=>(
                <div key={i} className="num small muted" style={{flex:1,fontWeight:600}}>{h}:00</div>
              ))}
            </div>

            {/* Now marker container + events */}
            <div style={{position:'relative',flex:1,padding:'4px 20px 16px',overflowY:'auto'}}>
              {/* now line */}
              <div style={{position:'absolute',left:`calc(20px + ${(NOW_HOUR-6)/14*100}% * (1 - 40px/100%))`,top:0,bottom:0,borderLeft:'2px dashed var(--bad)',pointerEvents:'none',zIndex:1}}>
                <div style={{position:'absolute',top:-2,left:-22,background:'var(--bad)',color:'#fff',fontWeight:700,fontSize:10.5,letterSpacing:'.05em',padding:'2px 8px',borderRadius:99}}>NOW · 11:24</div>
              </div>

              <div className="col gap-8" style={{position:'relative',zIndex:2}}>
                {events.map((e,i)=>{
                  const hr = parseInt(e.t.slice(0,2));
                  const mn = parseInt(e.t.slice(3,5));
                  const pct = ((hr-6)+mn/60)/14*100;
                  const cfg = {
                    arr:  { bg:'var(--blue)',     text:'#fff', label:Tr('Príchod','Arrival') },
                    dep:  { bg:'var(--warn)',     text:'#3A2402', label:Tr('Odchod','Departure') },
                    med:  { bg:'var(--plum)',     text:'#fff', label:'M4' },
                    task: { bg:'var(--cyan)',     text:'#0E3640', label:Tr('Úloha','Task') },
                  }[e.kind];
                  return (
                    <div key={i} style={{position:'relative',height:46,cursor:'pointer'}} onClick={()=>{
                      if(e.kind==='dep') nav.go('checkout');
                      else if(e.kind==='arr') nav.go('checkin');
                      else if(e.kind==='task') nav.go('tasks');
                      else if(e.kind==='med') nav.go('proc');
                    }}>
                      <div className="row center"
                        style={{position:'absolute',left:`calc(${pct}% - 6px)`,top:6,minWidth:280,maxWidth:460,
                          padding:'8px 12px',background:e.done?'#fff':cfg.bg,color:e.done?'var(--ink-2)':cfg.text,
                          border: e.done?`1px solid var(--line)`:'none',
                          borderRadius:10,gap:10,
                          boxShadow: e.now ? '0 0 0 3px rgba(46,91,255,.20), 0 4px 12px rgba(10,17,38,.10)' : '0 1px 2px rgba(10,17,38,.06)'}}>
                        <div className="num" style={{fontWeight:700,fontSize:11.5,padding:'2px 7px',borderRadius:5,background:e.done?'var(--bg)':'rgba(255,255,255,0.22)',color:e.done?'var(--ink-2)':cfg.text,flex:'0 0 auto'}}>{e.kind==='arr' && e.approx ? e.approx : e.t}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:600,fontSize:12.5,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.text}</div>
                          <div style={{fontSize:11,opacity:e.done?1:.85,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.sub}</div>
                        </div>
                        {e.done && <span className="pill ok" style={{fontSize:10,padding:'2px 7px'}}>✓</span>}
                        {!e.done && !e.now && <span className="pill outline" style={{background:'rgba(255,255,255,0.9)',color:cfg.text,padding:'2px 8px',fontSize:10}}>{cfg.label}</span>}
                        {e.now && <button className="btn sm" style={{background:'#fff',color:'#0A1126',border:'none'}} onClick={(ev)=>{ev.stopPropagation(); nav.go('checkout');}}>Check-out</button>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right rail */}
          <div className="col gap-12" style={{flex:'0 0 360px'}}>
            {/* Tasks */}
            <div className="card col">
              <CardHeader
                eyebrow={Tr('MOJE ÚLOHY','MY TASKS')}
                title={Tr('5 otvorených','5 open')}
                action={<button className="btn ghost sm"><Icon n="plus" size={13}/>{Tr('Nová','New')}</button>}/>
              <div className="col" style={{padding:'4px 8px 8px'}}>
                {[
                  [Tr('Doplniť depozit · Šimko','Add deposit · Šimko'), 'high', '14:00'],
                  [Tr('Predpárovať skupinu D-04','Pre-assign group D-04'),'med','do zmeny'],
                  [Tr('Volať: doklad pre 304','Call: doc for 304'),'low','keď čas'],
                  [Tr('Notif. M5 · zmena izby 201','Notify M5 · room 201'),'med','dnes'],
                  [Tr('Strata: hodinky · Apt. 402','Lost: watch · Apt. 402'),'low','tento týždeň'],
                ].map((t,i)=>(
                  <div key={i} className="row gap-10 center" style={{padding:'9px 8px',borderBottom: i<4?'1px dashed var(--line)':'none'}}>
                    <div className="chk"><div className="box" style={{borderColor: t[1]==='high'?'var(--bad)':t[1]==='med'?'var(--warn)':'var(--ink-4)'}}></div></div>
                    <div className="col grow" style={{minWidth:0,lineHeight:1.25}}>
                      <div style={{fontSize:12.5,fontWeight:500,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t[0]}</div>
                      <div className="xs muted">{t[2]}</div>
                    </div>
                    <Icon n="chev" size={14} c="#8B92AC"/>
                  </div>
                ))}
              </div>
            </div>

            {/* Special requests */}
            <div className="card pad-16 col gap-10">
              <div className="eyebrow">{Tr('ŠPEC. POŽIADAVKY DNES','SPECIAL REQUESTS TODAY')}</div>
              <div className="col gap-6">
                <div className="row gap-8 center"><span className="pill bad">VIP</span><span className="small">Bobula · káva izba 7:00</span></div>
                <div className="row gap-8 center"><span className="pill warn"><Icon n="warn" size={11}/></span><span className="small">Pavlíková · zdrav. flag z M4 (detail v module)</span></div>
                <div className="row gap-8 center"><span className="pill plum">D3</span><span className="small">Tomečková · diabet. diéta</span></div>
                <div className="row gap-8 center"><span className="pill blue">♿</span><span className="small">Šimko · bezbariérová izba</span></div>
                <div className="row gap-8 center"><span className="pill cyan">🚌</span><span className="small">Skupina · 6× vegetariánska</span></div>
              </div>
            </div>

            {/* Today's housekeeping & ops */}
            <div className="card pad-16 col gap-8">
              <div className="row between center">
                <div className="eyebrow">{Tr('OPERÁCIE DNES','TODAY’S OPS')}</div>
                <button className="btn ghost sm" onClick={()=>nav.go('house')}>{Tr('Izby & HK','Rooms & HK')} →</button>
              </div>
              <div className="col gap-6">
                <div className="row gap-10 center" style={{padding:'8px 10px',background:'var(--warn-soft)',borderRadius:8}}>
                  <span style={{fontSize:16}}>🧹</span>
                  <div className="col" style={{flex:1,lineHeight:1.25}}>
                    <div style={{fontSize:12.5,fontWeight:600}}>{Tr('8 izieb · na upratanie','8 rooms · to be cleaned')}</div>
                    <div className="xs muted">{Tr('po check-oute · chyžné nahlásia ručne','after C/O · housekeepers report manually')}</div>
                  </div>
                </div>
                <div className="row gap-10 center" style={{padding:'8px 10px',background:'var(--bad-soft)',borderRadius:8}}>
                  <span style={{fontSize:16}}>🔧</span>
                  <div className="col" style={{flex:1,lineHeight:1.25}}>
                    <div style={{fontSize:12.5,fontWeight:600}}>{Tr('305 · pokazené umývadlo','305 · broken sink')}</div>
                    <div className="xs muted">{Tr('nahlásila Bartošová · 11:02 · zadané údržbe','reported by Bartošová · 11:02')}</div>
                  </div>
                </div>
                <div className="row gap-10 center" style={{padding:'8px 10px',background:'var(--blue-soft)',borderRadius:8}}>
                  <span style={{fontSize:16}}>🛏</span>
                  <div className="col" style={{flex:1,lineHeight:1.25}}>
                    <div style={{fontSize:12.5,fontWeight:600}}>{Tr('Izba 201 pripravená','Room 201 ready')}</div>
                    <div className="xs muted">{Tr('Bartošová potvrdila · 11:18','Bartošová confirmed · 11:18')}</div>
                  </div>
                </div>
              </div>
              <div className="xs muted" style={{marginTop:4}}>
                {Tr('Notifikácie a správy nájdeš v messengeri vpravo dolu','Notifications & messages in the messenger bottom-right')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HFScreen>
  );
}
window.HFDashboard = HFDashboard;
