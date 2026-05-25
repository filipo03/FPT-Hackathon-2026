/* ── Hi-Fi · Guests list (Hostia · pacienti) ────────────────── */

function HFGuestsList(){
  const nav = useNav();
  const guests = [
    { init:'JN', tone:'#2E5BFF', name:'Ing. Jozef Novák',     y:1957, sex:'M', pkg:'KKL · Klasická', ins:'VšZP',     ctry:'SK', tags:['VIP'], stays:8,  lastStay:'21. 5. 2026 (aktívny)', total:'18 240 €', vip:true,  current:'203 · KKL · 21n', status:'in' },
    { init:'MK', tone:'#7857C7', name:'Mária Kováčová',        y:1962, sex:'Ž', pkg:'KKL · Klasická', ins:'Dôvera',   ctry:'SK', tags:[],      stays:5,  lastStay:'21. 5. 2026 (aktívny)', total:'12 480 €', current:'302 · KKL · 21n', status:'in' },
    { init:'JB', tone:'#0F1F4D', name:'Ján Bobula',            y:1952, sex:'M', pkg:'ANS · Antistres', ins:'Dôvera',   ctry:'SK', tags:['VIP'], stays:4,  lastStay:'7. 5. 2026 (odchod dnes)', total:'9 360 €',  vip:true,  current:'401 · ANS · 14n', status:'out' },
    { init:'ŠŠ', tone:'#2FA76E', name:'Štefan Šimko',          y:1955, sex:'M', pkg:'AGE · Akt. starnutie', ins:'Union',    ctry:'SK', tags:[],      stays:3,  lastStay:'9. 5. 2026',           total:'7 110 €',                   current:'301 · AGE · 8n',  status:'in' },
    { init:'AP', tone:'#E8930B', name:'Anna Pavlíková',         y:1967, sex:'Ž', pkg:'KKL · Klasická', ins:'samoplatca',ctry:'SK', tags:[],   stays:6,  lastStay:'21. 5. 2026 (aktívny)', total:'5 940 €',                                          current:'304 · KKL · 14n', status:'in' },
    { init:'PH', tone:'#DA3B33', name:'Mgr. Peter Hudák',      y:1971, sex:'M', pkg:'ANS · Antistres', ins:'VšZP',     ctry:'SK', tags:['VIP'], stays:12, lastStay:'21. 5. 2026 (príchod 17–18)', total:'14 280 €', vip:true,  current:'205 · ANS · 5n',  status:'arr' },
    { init:'GT', tone:'#5DD3E8', name:'Gabriela Tomečková',    y:1964, sex:'Ž', pkg:'RVK · Relax víkend', ins:'samoplatca',ctry:'SK', tags:[],     stays:9,  lastStay:'21. 5. 2026 (aktívny)', total:'8 100 €',                   current:'402 · RVK · 2n',  status:'in' },
    { init:'HK', tone:'#A86B2E', name:'Hanna Kowalska',         y:1959, sex:'Ž', pkg:'CCO · Cigelka', ins:'NFZ-PL',   ctry:'PL', tags:[],     stays:2,  lastStay:'14. 5. 2026',           total:'3 060 €',                   current:'402 · CCO · 7n',  status:'in' },
    { init:'LV', tone:'#2E5BFF', name:'Ladislav Varga',         y:1966, sex:'M', pkg:'CCO · Cigelka',      ins:'VšZP',     ctry:'SK', tags:[],     stays:1,  lastStay:'14. 5. 2026',           total:'1 510 €',                   current:'303 · CCO · 7n',  status:'in' },
    { init:'HS', tone:'#7857C7', name:'Helena Sopková',         y:1957, sex:'Ž', pkg:'KKL · Klasická', ins:'VšZP',     ctry:'SK', tags:[],     stays:3,  lastStay:'14. 5. 2026',           total:'4 540 €',                                   current:'—', status:'past' },
    { init:'JB', tone:'#5DD3E8', name:'Bobula Ján ml.',         y:1985, sex:'M', pkg:'Wellness',        ins:'samoplatca',ctry:'SK', tags:[],     stays:1,  lastStay:'12. 3. 2024',           total:'620 €',                                     current:'—', status:'past' },
    { init:'EB', tone:'#2FA76E', name:'Eva Bachratá',           y:1958, sex:'Ž', pkg:'KKL · Klasická', ins:'Dôvera',   ctry:'SK', tags:[],     stays:4,  lastStay:'25. 5. 2026 (skupina C-12)', total:'5 240 €',                                current:'202 · KKL · 21n', status:'soon' },
    { init:'PA', tone:'#DA3B33', name:'Pavol Adamec',           y:1960, sex:'M', pkg:'KKL · Klasická', ins:'VšZP',     ctry:'SK', tags:[],     stays:2,  lastStay:'25. 5. 2026 (skupina C-12)', total:'2 720 €',                                current:'201 · KKL · 21n', status:'soon' },
    { init:'IB', tone:'#E8930B', name:'Imrich Belko',           y:1949, sex:'M', pkg:'KKL · Klasická', ins:'VšZP',     ctry:'SK', tags:[],     stays:5,  lastStay:'25. 5. 2026 (skupina C-12)', total:'6 800 €',                                current:'203 · KKL · 21n', status:'soon' },
  ];

  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all'); // all · current · vip · group
  const filtered = guests.filter(g => {
    if(q && !(g.name+g.pkg+g.ins+(g.current||'')).toLowerCase().includes(q.toLowerCase())) return false;
    if(filter==='current') return g.status==='in';
    if(filter==='vip') return g.vip;
    if(filter==='soon') return g.status==='soon' || g.status==='arr';
    if(filter==='past') return g.status==='past';
    return true;
  });

  const statusPill = (s) => {
    if(s==='in')   return <span className="pill ok">● {Tr('na pobyte','staying')}</span>;
    if(s==='out')  return <span className="pill warn">● {Tr('odchod dnes','departing today')}</span>;
    if(s==='arr')  return <span className="pill blue">● {Tr('príchod dnes','arriving today')}</span>;
    if(s==='soon') return <span className="pill" style={{background:'var(--blue-soft)',color:'var(--blue)'}}>● {Tr('príchod čoskoro','arriving soon')}</span>;
    return <span className="pill">○ {Tr('minulý','past')}</span>;
  };

  return (
    <HFScreen
      active="guests"
      title={Tr('Hostia · pacienti','Guests · patients')}
      sub={Tr('Centrálna databáza · 1 824 profilov · 168 momentálne na pobyte','Central database · 1,824 profiles · 168 staying')}
      actions={<>
        <button className="btn"><Icon n="filter" size={14}/> {Tr('Pokročilý filter','Advanced filter')}</button>
        <button className="btn accent" onClick={()=>nav.go('newres')}><Icon n="plus" size={14}/> {Tr('Nový hosť · rezervácia','New guest · reservation')}</button>
      </>}>

      <div className="col gap-16" style={{height:'100%'}}>
        {/* KPI strip */}
        <div className="row gap-12">
          {[
            { l:Tr('CELKOM','TOTAL'),               v:'1 824', sub:Tr('aktívne profily','active profiles'), c:'var(--blue)' },
            { l:Tr('NA POBYTE TERAZ','STAYING NOW'), v:'168',   sub:'87% obsadenosť',                       c:'var(--ok)' },
            { l:Tr('VIP / VERNÝCH','VIP / LOYAL'),  v:'247',    sub:Tr('5+ pobytov','5+ stays'),            c:'var(--bad)' },
            { l:Tr('OPAKOVANÝCH','REPEAT'),        v:'63%',    sub:Tr('vyšší retencia ako trh','higher than market'), c:'var(--cyan)' },
            { l:Tr('NOVÝCH 30D','NEW 30d'),        v:'42',     sub:Tr('+12% MoM','+12% MoM'),              c:'var(--plum)' },
          ].map((k,i)=>(
            <div key={i} className="card pad-14 grow" style={{borderLeft:`3px solid ${k.c}`}}>
              <div className="eyebrow">{k.l}</div>
              <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:26,letterSpacing:'-0.02em',marginTop:4}} className="num">{k.v}</div>
              <div className="muted xs">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div className="card pad-14 row gap-12 center">
          <div className="row center gap-8" style={{flex:1,maxWidth:520,padding:'8px 12px',background:'var(--bg)',border:'1px solid var(--line)',borderRadius:8}}>
            <Icon n="search" size={15} c="#5C6481"/>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder={Tr('Hľadať podľa mena, balíka, ZP, izby…','Search by name, package, insurance, room…')}
              style={{border:'none',outline:'none',background:'transparent',flex:1,fontSize:13,padding:0}}/>
            <span className="kbd">⌘K · global</span>
          </div>
          <div className="seg">
            <div className={`s ${filter==='all'?'on':''}`}    onClick={()=>setFilter('all')}>{Tr('Všetci','All')} · {guests.length}</div>
            <div className={`s ${filter==='current'?'on':''}`} onClick={()=>setFilter('current')}>{Tr('Na pobyte','Staying')} · {guests.filter(g=>g.status==='in').length}</div>
            <div className={`s ${filter==='soon'?'on':''}`}    onClick={()=>setFilter('soon')}>{Tr('Príchody','Arrivals')} · {guests.filter(g=>g.status==='soon'||g.status==='arr').length}</div>
            <div className={`s ${filter==='vip'?'on':''}`}     onClick={()=>setFilter('vip')}>VIP · {guests.filter(g=>g.vip).length}</div>
            <div className={`s ${filter==='past'?'on':''}`}    onClick={()=>setFilter('past')}>{Tr('Minulí','Past')}</div>
          </div>
          <span className="grow"/>
          <span className="muted small">{Tr('Zobrazených','Showing')} <b>{filtered.length}</b> {Tr('z','of')} {guests.length}</span>
        </div>

        {/* Guests table */}
        <div className="card grow" style={{minHeight:0,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{overflowY:'auto',flex:1}}>
            <table className="t">
              <thead>
                <tr>
                  <th>{Tr('Hosť','Guest')}</th>
                  <th>{Tr('Vek','Age')}</th>
                  <th>{Tr('Balík pobytu','Package')}</th>
                  <th>{Tr('Tagy','Tags')}</th>
                  <th>{Tr('Poistenie','Insurance')}</th>
                  <th>{Tr('Aktuálne','Current')}</th>
                  <th>{Tr('Pobyty','Stays')}</th>
                  <th style={{textAlign:'right'}}>{Tr('Tržba (LTV)','Revenue (LTV)')}</th>
                  <th>{Tr('Stav','Status')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g,i)=>(
                  <tr key={i} onClick={()=>nav.go('guest')} style={{cursor:'pointer'}}>
                    <td>
                      <div className="row center gap-10">
                        <Av name={g.init} sz="md" tone={`linear-gradient(135deg,${g.tone},${g.tone}99)`}/>
                        <div className="col" style={{lineHeight:1.2}}>
                          <b>{q ? highlightText(g.name, q) : g.name}</b>
                          <div className="xs muted">{g.ctry} · {g.sex}</div>
                        </div>
                      </div>
                    </td>
                    <td className="num">{2026 - g.y}</td>
                    <td>{g.pkg==='Wellness' ? <span className="muted">Wellness</span> : <span className="pill plum">{g.pkg}</span>}</td>
                    <td>
                      <div className="row gap-4">
                        {g.vip && <span className="pill bad">VIP</span>}
                        {g.tags.includes('⚠') && <span className="pill warn">⚠</span>}
                      </div>
                    </td>
                    <td>
                      {g.ins==='samoplatca' ? <span className="muted small">samoplatca</span>
                       : g.ins==='NFZ-PL' ? <span className="pill" style={{background:'#FCE7E1',color:'#7A2A1A'}}>{g.ins}</span>
                       : <span className="pill ok">{g.ins}</span>}
                    </td>
                    <td>{g.current==='—' ? <span className="muted">—</span> : <span className="num small"><b>{g.current.split(' · ')[0]}</b> · {g.current.split(' · ').slice(1).join(' · ')}</span>}</td>
                    <td className="num">{g.stays}</td>
                    <td className="num" style={{textAlign:'right',fontWeight:600}}>{g.total}</td>
                    <td>{statusPill(g.status)}</td>
                    <td><Icon n="chev" size={16} c="#8B92AC"/></td>
                  </tr>
                ))}
                {filtered.length===0 && (
                  <tr><td colSpan="10" style={{padding:'48px 24px',textAlign:'center'}}>
                    <div className="muted">{Tr('Nikto sa nezhoduje s','No match for')} „{q}"</div>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Footer */}
          <div className="row between center" style={{padding:'10px 16px',borderTop:'1px solid var(--line)',background:'var(--bg)',flex:'0 0 auto'}}>
            <div className="muted xs">{Tr('Klikni na riadok pre detail · Shift+klik pre nový tab','Click row for detail · Shift+click for new tab')}</div>
            <div className="row gap-6 center muted xs">
              <span>{Tr('Strana','Page')} 1 / 122</span>
              <button className="btn sm">← {Tr('Predch.','Prev')}</button>
              <button className="btn sm primary">{Tr('Ďalšia','Next')} →</button>
            </div>
          </div>
        </div>
      </div>
    </HFScreen>
  );
}

function highlightText(text, q){
  if(!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if(i<0) return text;
  return <>{text.slice(0,i)}<mark style={{background:'#FFE9A8',padding:'0 2px',borderRadius:3,color:'inherit'}}>{text.slice(i,i+q.length)}</mark>{text.slice(i+q.length)}</>;
}

window.HFGuestsList = HFGuestsList;
