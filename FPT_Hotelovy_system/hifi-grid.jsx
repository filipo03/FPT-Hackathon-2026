/* ── Hi-Fi · Reservation grid ───────────────────────────────── */

function HFGrid(){
  const nav = useNav();
  const days = [
    {n:'21',d:'pi',today:true}, {n:'22',d:'so'}, {n:'23',d:'ne'},
    {n:'24',d:'po'}, {n:'25',d:'ut',hi:'group'}, {n:'26',d:'st'},
    {n:'27',d:'št'}, {n:'28',d:'pi'}, {n:'29',d:'so'}, {n:'30',d:'ne'},
    {n:'31',d:'po'}, {n:'1', d:'ut'}, {n:'2', d:'st'}, {n:'3', d:'št'},
  ];
  const rooms = [
    { no:'201', cat:'Štandard Park · 1L',  wing:'Astória', st:'occ' },
    { no:'202', cat:'Štandard Park · 2L',  wing:'Astória', st:'occ' },
    { no:'203', cat:'Superior Park · 2L',  wing:'Astória', st:'occ' },
    { no:'204', cat:'Štandard · 1L',       wing:'Astória', st:'ready' },
    { no:'205', cat:'Superior · 2L',       wing:'Astória', st:'occ' },
    { no:'301', cat:'Štandard · 1L',       wing:'Ozón',    st:'hk' },
    { no:'302', cat:'Apartmán Premium',   wing:'Ozón',    st:'occ' },
    { no:'303', cat:'Superior Spa · 2L',   wing:'Ozón',    st:'occ' },
    { no:'401', cat:'Premium Spa · 2L',    wing:'Alžbeta', st:'occ' },
    { no:'402', cat:'Premium Spa · 2L',    wing:'Alžbeta', st:'occ' },
  ];
  const INITIAL_RES = [
    { id:'r1',  r:0, s:0,  l:14, k:'ckin',   name:'Novák +1',     pkg:'KKL', tags:['VIP','VšZP'] },
    { id:'r2',  r:1, s:2,  l:7,  k:'conf',   name:'Kowalska',     pkg:'CCO', tags:['NFZ-PL'] },
    { id:'r3',  r:2, s:1,  l:5,  k:'ckin',   name:'Bobula',       pkg:'ANS', tags:['VIP'] },
    { id:'r4',  r:2, s:7,  l:5,  k:'conf',   name:'Tomečková',    pkg:'RVK', tags:['D1'] },
    { id:'r5',  r:3, s:0,  l:4,  k:'held',   name:'Hold · M3 web',pkg:'RVK', tags:['24h'] },
    { id:'r6',  r:3, s:5,  l:7,  k:'conf',   name:'Hudák +1',     pkg:'ANS', tags:['VšZP'] },
    { id:'r7',  r:4, s:4,  l:7,  k:'group',  name:'Skup. C-12',   pkg:'KKL', tags:['Bus','32os'] },
    { id:'r8',  r:5, s:4,  l:7,  k:'group',  name:'Skup. C-12',   pkg:'KKL', tags:[] },
    { id:'r9',  r:6, s:4,  l:7,  k:'group',  name:'Skup. C-12',   pkg:'KKL', tags:[] },
    { id:'r10', r:7, s:0,  l:14, k:'ckin',   name:'Pavlíková',    pkg:'KKL', tags:['⚠ pozn.'] },
    { id:'r11', r:8, s:0,  l:14, k:'ckin',   name:'Šimko',        pkg:'AGE', tags:[] },
    { id:'r12', r:9, s:6,  l:7,  k:'conf',   name:'Varga',        pkg:'CCO', tags:[] },
  ];

  const [res, setRes] = React.useState(INITIAL_RES);
  const [search, setSearch] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  // Filter state — each is a Set of active values; empty Set = none selected
  const [wingF,   setWingF]   = React.useState(new Set(['Astória','Ozón','Alžbeta']));
  const [catF,    setCatF]    = React.useState(new Set(['Štandard','Štandard Park','Superior','Superior Park','Superior Spa','Apartmán Premium','Premium Spa']));
  const [statusF, setStatusF] = React.useState(new Set(['conf','ckin','held','group']));
  const [pkgF,    setPkgF]    = React.useState(new Set(['KKL','CCO','ANS','RVK','AGE']));
  const toggle = (set, setSet) => (v) => {
    const s = new Set(set);
    if (s.has(v)) s.delete(v); else s.add(v);
    setSet(s);
  };
  const roomCat = (cat) => cat.split(' · ')[0];
  const roomVisible = (rm) => wingF.has(rm.wing) && catF.has(roomCat(rm.cat));
  const barVisible = (r) => statusF.has(r.k) && (!r.pkg || pkgF.has(r.pkg));
  // dragging: { id, fromRoom, fromStart, offsetFrac }
  // hoverRoom / hoverStart : preview position (start day in target row)
  const [dragging, setDragging] = React.useState(null);
  const [hoverRoom, setHoverRoom] = React.useState(null);
  const [hoverStart, setHoverStart] = React.useState(null);
  // Clipboard (click-pickup mode): { id } once a reservation is picked up via the pin button
  const [clipboard, setClipboard] = React.useState(null);

  // Esc clears clipboard
  React.useEffect(()=>{
    if (!clipboard) return;
    const onKey = (e)=>{ if(e.key==='Escape'){ setClipboard(null); }};
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [clipboard]);

  // Conflict at given room with given start day (using dragging.id length).
  const hasConflict = (resv, targetRoom, targetStart) => {
    const s = targetStart ?? resv.s;
    if (resv.r === targetRoom && resv.s === s) return false;
    return res.some(o => {
      if (o.id === resv.id || o.r !== targetRoom) return false;
      return !(s + resv.l <= o.s || o.s + o.l <= s);
    });
  };

  const onDragStart = (e, resv, barEl) => {
    const rect = barEl.getBoundingClientRect();
    const offsetFrac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setDragging({ id: resv.id, fromRoom: resv.r, fromStart: resv.s, offsetFrac });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', resv.id);
    // make the default ghost smaller — we render our own preview
    const ghost = document.createElement('div');
    ghost.style.cssText = 'position:absolute;top:-1000px';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(()=>document.body.removeChild(ghost), 0);
  };
  const onDragEnd = () => {
    setDragging(null);
    setHoverRoom(null);
    setHoverStart(null);
  };

  // Given a clientX inside a row-body element, compute the snapped start day for the dragged bar.
  const computeStart = (resv, bodyEl, clientX, offsetFracOverride) => {
    const rect = bodyEl.getBoundingClientRect();
    const cursorDayFrac = ((clientX - rect.left) / rect.width) * 14;
    const offFrac = offsetFracOverride !== undefined ? offsetFracOverride : (dragging ? dragging.offsetFrac : 0.5);
    const startFrac = cursorDayFrac - (offFrac * resv.l);
    let start = Math.round(startFrac);
    start = Math.max(0, Math.min(14 - resv.l, start));
    return start;
  };

  const onRowDragOver = (e, targetRoom, bodyEl) => {
    const activeId = dragging ? dragging.id : clipboard ? clipboard.id : null;
    if (!activeId) return;
    const resv = res.find(r => r.id === activeId);
    if (!resv) return;
    const offFrac = dragging ? dragging.offsetFrac : 0.5;
    const start = computeStart(resv, bodyEl, e.clientX, offFrac);
    if (hasConflict(resv, targetRoom, start)) {
      e.dataTransfer && (e.dataTransfer.dropEffect = 'none');
    } else if (dragging) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
    setHoverRoom(targetRoom);
    setHoverStart(start);
  };
  // Mouse-move (clipboard mode, no drag) used to update preview
  const onRowMouseMove = (e, targetRoom, bodyEl) => {
    if (dragging || !clipboard) return;
    const resv = res.find(r => r.id === clipboard.id);
    if (!resv) return;
    const start = computeStart(resv, bodyEl, e.clientX, 0.5);
    setHoverRoom(targetRoom);
    setHoverStart(start);
  };

  const commitMove = (resv, targetRoom, start) => {
    if (hasConflict(resv, targetRoom, start)) return false;
    if (resv.r === targetRoom && resv.s === start) return false;
    const fromNo = rooms[resv.r].no;
    const toNo = rooms[targetRoom].no;
    const deltaDays = start - resv.s;
    const moved = (resv.r !== targetRoom);
    const shifted = (deltaDays !== 0);
    let msg;
    if (moved && shifted)      msg = Tr(`✓ ${resv.name}: izba ${fromNo} → ${toNo} · termín posunutý o ${deltaDays>0?'+':''}${deltaDays} dní`, `✓ ${resv.name}: room ${fromNo} → ${toNo} · shifted ${deltaDays>0?'+':''}${deltaDays}d`);
    else if (moved)            msg = Tr(`✓ ${resv.name}: izba ${fromNo} → ${toNo}`, `✓ ${resv.name}: room ${fromNo} → ${toNo}`);
    else                       msg = Tr(`✓ ${resv.name}: termín posunutý o ${deltaDays>0?'+':''}${deltaDays} dní`, `✓ ${resv.name}: shifted ${deltaDays>0?'+':''}${deltaDays}d`);
    setRes(prev => prev.map(o => o.id === resv.id ? {...o, r: targetRoom, s: start} : o));
    nav.toast(msg);
    return true;
  };

  const onRowDrop = (e, targetRoom, bodyEl) => {
    if (!dragging) return;
    const resv = res.find(r => r.id === dragging.id);
    if (!resv) { onDragEnd(); return; }
    const start = computeStart(resv, bodyEl, e.clientX, dragging.offsetFrac);
    e.preventDefault();
    commitMove(resv, targetRoom, start);
    onDragEnd();
  };

  // Click on row (clipboard mode) places the picked reservation
  const onRowClick = (e, targetRoom, bodyEl) => {
    if (!clipboard) return;
    const resv = res.find(r => r.id === clipboard.id);
    if (!resv) return;
    const start = computeStart(resv, bodyEl, e.clientX, 0.5);
    if (hasConflict(resv, targetRoom, start)) {
      nav.toast(Tr('⚠ Konflikt s iným pobytom — vyber iný slot','⚠ Conflict — pick a different slot'));
      return;
    }
    if (commitMove(resv, targetRoom, start)) {
      setClipboard(null);
      setHoverRoom(null);
      setHoverStart(null);
    }
  };

  return (
    <HFScreen
      active="grid"
      title={Tr('Rezervácie · šachovnica','Reservations · grid')}
      sub={Tr('21. máj – 3. jún · 14 dní · 192 izieb','May 21 – Jun 3 · 14 days · 192 rooms')}
      actions={<>
        <div className="seg" style={{marginRight:8}}>
          <div className="s">{Tr('Deň','Day')}</div>
          <div className="s on">{Tr('14 dní','14d')}</div>
          <div className="s">{Tr('Mesiac','Month')}</div>
        </div>
        <button className="btn"><Icon n="filter" size={14}/> {Tr('Filter','Filter')}</button>
        <button className="btn accent" onClick={()=>nav.go('newres')}><Icon n="plus" size={14}/> {Tr('Nová rezervácia','New')}</button>
      </>}
      padContent={false}>

      <div className="row" style={{height:'100%',background:'var(--bg)'}}>
        {/* Left filter rail */}
        <div className="col" style={{flex:'0 0 240px',background:'#fff',borderRight:'1px solid var(--line)',padding:20,gap:18,overflowY:'auto'}}>
          <div className="col gap-8">
            <div className="row between center">
              <div className="eyebrow">{Tr('VYHĽADAŤ','SEARCH')}</div>
              {(filterOpen || search) && (
                <span onClick={()=>{setFilterOpen(false); setSearch('');}}
                  className="xs muted" style={{cursor:'pointer'}}>{Tr('Skryť','Hide')}</span>
              )}
            </div>
            <div className="row center gap-6" style={{padding:'7px 10px',background:'var(--bg)',border:`1px solid ${(search||filterOpen)?'var(--blue)':'var(--line)'}`,borderRadius:8,transition:'border-color .12s'}}>
              <Icon n="search" size={14} c={(search||filterOpen)?'#2E5BFF':'#8B92AC'}/>
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                onFocus={()=>setFilterOpen(true)}
                placeholder={Tr('Hosť / izba / poukaz','Guest / room / voucher')}
                style={{border:'none',outline:'none',background:'transparent',flex:1,fontSize:12,padding:0,color:'var(--ink-1)'}}/>
              {search && (
                <span onClick={()=>setSearch('')} title={Tr('Vyčistiť','Clear')}
                  style={{cursor:'pointer',width:16,height:16,borderRadius:99,background:'var(--line-strong)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,lineHeight:1}}>×</span>
              )}
            </div>
            {search && (
              <div className="xs muted" style={{paddingLeft:2}}>
                {(() => {
                  const q = search.toLowerCase();
                  const matched = res.filter(r => (r.name+' '+(r.pkg||'')+' '+r.tags.join(' ')+' '+rooms[r.r].no).toLowerCase().includes(q));
                  return <><b style={{color:matched.length?'var(--blue)':'var(--bad)'}}>{matched.length}</b> {Tr('zhody','matches')}</>;
                })()}
              </div>
            )}
            {!filterOpen && !search && (
              <button onClick={()=>setFilterOpen(true)} className="btn ghost sm"
                style={{justifyContent:'flex-start',padding:'4px 0'}}>
                <Icon n="filter" size={13}/> {Tr('Pokročilé filtre','More filters')}
              </button>
            )}
          </div>

          {/* Collapsible filter panel */}
          {filterOpen && (<>
          <div className="col gap-8">
            <div className="eyebrow">{Tr('KRÍDLO','WING')}</div>
            {[['Astória',64],['Ozón',72],['Alžbeta',56]].map(([w,n])=>{
              const on = wingF.has(w);
              return (
                <div key={w} className={`chk ${on?'on':''}`} onClick={()=>toggle(wingF,setWingF)(w)} style={{cursor:'pointer'}}>
                  <div className="box"></div><span>{w}</span><span className="grow"></span><span className="muted xs">{n}</span>
                </div>
              );
            })}
          </div>
          <div className="col gap-8">
            <div className="eyebrow">{Tr('KATEGÓRIA','CATEGORY')}</div>
            {['Štandard','Štandard Park','Superior','Superior Park','Superior Spa','Apartmán Premium','Premium Spa'].map(c=>{
              const on = catF.has(c);
              return (
                <div key={c} className={`chk ${on?'on':''}`} onClick={()=>toggle(catF,setCatF)(c)} style={{cursor:'pointer'}}>
                  <div className="box"></div><span style={{fontSize:12}}>{c}</span>
                </div>
              );
            })}
          </div>
          <div className="col gap-8">
            <div className="eyebrow">{Tr('STAV REZERVÁCIE','RESERVATION STATUS')}</div>
            {[
              ['conf',  Tr('Potvrdená','Confirmed')],
              ['ckin',  'Check-in'],
              ['held',  Tr('Predbežná (hold 24h)','Hold (24h)')],
              ['group', Tr('Skupinová','Group')],
            ].map(([k,label])=>{
              const on = statusF.has(k);
              return (
                <div key={k} className={`chk ${on?'on':''}`} onClick={()=>toggle(statusF,setStatusF)(k)} style={{cursor:'pointer'}}>
                  <div className="box"></div>
                  <span className={`resv ${k}`} style={{width:60,height:18,fontSize:9,padding:'0 6px',flex:'0 0 60px'}}>{k}</span>
                  <span className="xs">{label}</span>
                </div>
              );
            })}
          </div>
          <div className="col gap-8">
            <div className="eyebrow">{Tr('BALÍK','PACKAGE')}</div>
            <div className="row gap-4 wrap">
              {[
                ['KKL','Klasická'], ['CCO','Cigeľka'], ['ANS','Antistres'],
                ['RVK','Relax víkend'], ['AGE','Akt. starnutie']
              ].map(([p,d])=>{
                const on = pkgF.has(p);
                return (
                  <span key={p} title={d} onClick={()=>toggle(pkgF,setPkgF)(p)}
                    className={`pill ${on?'navy':'outline'}`}
                    style={{fontSize:10.5,cursor:'pointer',opacity:on?1:.55}}>{p}</span>
                );
              })}
            </div>
          </div>
          <button className="btn ghost sm" style={{justifyContent:'flex-start'}}
            onClick={()=>{
              setWingF(new Set(['Astória','Ozón','Alžbeta']));
              setCatF(new Set(['Štandard','Štandard Park','Superior','Superior Park','Superior Spa','Apartmán Premium','Premium Spa']));
              setStatusF(new Set(['conf','ckin','held','group']));
              setPkgF(new Set(['KKL','CCO','ANS','RVK','AGE']));
            }}>↺ {Tr('Resetovať filter','Reset filters')}</button>
          </>)}
        </div>

        {/* Center grid */}
        <div className="col grow" style={{minWidth:0,overflow:'hidden',position:'relative'}}>
          {clipboard && (() => {
            const cr = res.find(x=>x.id===clipboard.id);
            return cr ? (
              <div className="clipboard-bar">
                <span style={{fontSize:16}}>📌</span>
                <span><b>{Tr('Schránka','Clipboard')}:</b> {cr.name} · {cr.l}n {cr.pkg && ('· '+cr.pkg)}</span>
                <span style={{opacity:.7}}>→ {Tr('klikni na voľný slot v mriežke','click an empty slot in the grid')}</span>
                <button className="x" onClick={()=>setClipboard(null)} title={Tr('Vyčistiť schránku (Esc)','Clear (Esc)')}>✕</button>
              </div>
            ) : null;
          })()}
          {/* Day header */}
          <div className="row" style={{background:'#fff',borderBottom:'1px solid var(--line)',padding:0}}>
            <div style={{flex:'0 0 180px',padding:'14px 16px',borderRight:'1px solid var(--line)'}} className="eyebrow">{Tr('IZBA · KATEGÓRIA','ROOM · CATEGORY')}</div>
            <div className="row grow">
              {days.map((d,i)=>(
                <div key={i} className="col center" style={{flex:1,padding:'10px 0',borderRight: i<days.length-1?'1px solid var(--line)':'none',
                  background: d.today?'rgba(218,59,51,0.04)':'#fff'}}>
                  <div className="eyebrow" style={{color: d.today?'var(--bad)':'var(--ink-3)'}}>{d.d}</div>
                  <div className="num" style={{fontFamily:'Plus Jakarta Sans',fontWeight:700,fontSize:18,marginTop:1,color: d.today?'var(--bad)':'var(--ink-1)'}}>{d.n}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Rows */}
          <div className="col grow" style={{overflowY:'auto'}}>
            {rooms.map((rm,ri)=>{
              if (!roomVisible(rm)) return null;
              const isHover = hoverRoom===ri && (dragging || clipboard);
              const activeId = dragging ? dragging.id : clipboard ? clipboard.id : null;
              const draggedRes = activeId ? res.find(r=>r.id===activeId) : null;
              const wouldConflict = draggedRes && isHover && hasConflict(draggedRes, ri, hoverStart);
              const sameSpot = draggedRes && isHover && ri===draggedRes.r && hoverStart===draggedRes.s;
              const hoverBg = isHover && !sameSpot ? (wouldConflict ? 'rgba(218,59,51,0.06)' : 'rgba(46,167,110,0.06)') : '#fff';

              // search match per row
              const q = search.trim().toLowerCase();
              const rowRes = res.filter(r=>r.r===ri && barVisible(r));
              const rowMatches = q ? rowRes.some(r => (r.name+' '+(r.pkg||'')+' '+r.tags.join(' ')+' '+rm.no).toLowerCase().includes(q)) : true;
              const rowNumberMatches = q && rm.no.toLowerCase().includes(q);
              const rowDim = q && !rowMatches && !rowNumberMatches;
              return (
              <div key={ri} className="row"
                style={{borderBottom:'1px solid var(--line)',minHeight:54,background:hoverBg,
                  opacity: rowDim ? 0.35 : 1,
                  transition:'background .12s, opacity .12s'}}>
                <div style={{flex:'0 0 180px',padding:'10px 16px',borderRight:'1px solid var(--line)',background:rowNumberMatches?'#FFFCE5':'#FBFCFE'}}>
                  <div className="row center gap-6">
                    <div className="num" style={{fontFamily:'Plus Jakarta Sans',fontWeight:700,fontSize:15}}>
                      {rowNumberMatches ? <mark style={{background:'#FFE9A8',padding:'0 2px',borderRadius:3}}>{rm.no}</mark> : rm.no}
                    </div>
                    <span className="dot" style={{background: rm.st==='ready'?'var(--ok)':rm.st==='hk'?'var(--warn)':'var(--blue)'}}/>
                  </div>
                  <div className="xs muted" style={{marginTop:2}}>{rm.cat}</div>
                  {isHover && !sameSpot && (
                    <div style={{marginTop:4, fontSize:10.5, fontWeight:700, color: wouldConflict?'var(--bad)':'var(--ok)'}}>
                      {wouldConflict ? '⚠ ' + Tr('konflikt','conflict') : '✓ ' + Tr('voľná','free')}
                    </div>
                  )}
                </div>
                <div className="row grow" style={{position:'relative', cursor: clipboard ? 'copy' : 'default'}}
                  data-clipactive={clipboard?'1':'0'}
                  onDragOver={(e)=>onRowDragOver(e, ri, e.currentTarget)}
                  onDragLeave={(e)=>{ if(!e.currentTarget.contains(e.relatedTarget) && hoverRoom===ri) setHoverRoom(null); }}
                  onDrop={(e)=>onRowDrop(e, ri, e.currentTarget)}
                  onMouseMove={(e)=>onRowMouseMove(e, ri, e.currentTarget)}
                  onMouseLeave={()=>{ if(!dragging && clipboard && hoverRoom===ri){ setHoverRoom(null); setHoverStart(null); } }}
                  onClick={(e)=>onRowClick(e, ri, e.currentTarget)}>
                  {/* day cells */}
                  {days.map((d,i)=>(
                    <div key={i} style={{flex:1, borderRight:i<days.length-1?'1px solid var(--line)':'none',
                      background: d.today?'rgba(218,59,51,0.03)':'transparent', pointerEvents:'none'}}></div>
                  ))}
                  {/* drop-preview ghost */}
                  {isHover && draggedRes && !sameSpot && (
                    <div style={{
                      position:'absolute',
                      left:`calc(${(hoverStart/14)*100}% + 3px)`,
                      width:`calc(${(draggedRes.l/14)*100}% - 6px)`,
                      top:'50%', transform:'translateY(-50%)', height:34,
                      borderRadius:7,
                      background: wouldConflict ? 'rgba(218,59,51,0.18)' : 'rgba(46,167,110,0.18)',
                      border: wouldConflict ? '2px dashed var(--bad)' : '2px dashed var(--ok)',
                      pointerEvents:'none',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:10.5,fontWeight:700,
                      color: wouldConflict ? 'var(--bad)' : 'var(--ok)',
                      letterSpacing:'0.04em',textTransform:'uppercase',
                    }}>
                      {wouldConflict ? Tr('konflikt','conflict') : Tr('sem pustí','drop here')}
                    </div>
                  )}
                  {/* bars */}
                  {rowRes.map((r,i)=>{
                    const left = `calc(${(r.s/14)*100}% + 3px)`;
                    const width = `calc(${(r.l/14)*100}% - 6px)`;
                    const isDragging = dragging && dragging.id===r.id;
                    const isClipped = clipboard && clipboard.id===r.id;
                    const barMatches = q && (r.name+' '+(r.pkg||'')+' '+r.tags.join(' ')+' '+rm.no).toLowerCase().includes(q);
                    return (
                      <div key={r.id} className={`resv ${r.k}${isClipped?' clip-picked':''}`}
                        draggable
                        onDragStart={(e)=>{ if(clipboard) setClipboard(null); onDragStart(e, r, e.currentTarget); }}
                        onDragEnd={onDragEnd}
                        onClick={(e)=>{
                          // when in clipboard mode, let the row click handler take over (placement)
                          if (clipboard) return;
                          e.stopPropagation();
                          nav.go(r.k==='conf' ? 'checkin' : 'guest');
                        }}
                        title={Tr('Drag pre presun · klik pre detail · ikonka pripnúť do schránky','Drag to move · click for detail · pin to clipboard')}
                        style={{position:'absolute',left,width,top:'50%',transform:'translateY(-50%)',height:34,
                          cursor: isDragging?'grabbing':'grab',
                          opacity: isDragging?0.35: (q && !barMatches ? 0.3 : 1),
                          boxShadow: barMatches ? '0 0 0 3px #FFE9A8, 0 4px 12px rgba(232,147,11,0.4)' : (isDragging?'0 8px 20px rgba(10,17,38,0.30)':'inset 0 -2px 0 rgba(0,0,0,0.12)'),
                          transition:'opacity .12s, box-shadow .12s'}}>
                        <Icon n="user" size={11} c={r.k==='held'?'var(--ink-3)':'#fff'}/>
                        <span style={{fontWeight:700}}>{r.name}</span>
                        {r.pkg && <span className="pill" style={{padding:'1px 6px',fontSize:9.5}}>{r.pkg}</span>}
                        {r.tags.slice(0,1).map((t,j)=> <span key={j} className="pill" style={{padding:'1px 6px',fontSize:9.5}}>{t}</span>)}
                        <span style={{flex:1}}/>
                        <button
                          onClick={(e)=>{ e.stopPropagation(); setClipboard(isClipped ? null : { id: r.id }); }}
                          title={Tr('Pripnúť do schránky · potom klikni na nový slot','Pin to clipboard · then click new slot')}
                          style={{background:'rgba(255,255,255,0.22)',border:'none',color:'inherit',
                            width:20,height:20,borderRadius:5,cursor:'pointer',
                            display:'flex',alignItems:'center',justifyContent:'center',
                            fontSize:12,lineHeight:1,padding:0}}>
                          {isClipped ? '✕' : '📌'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );})}
          </div>
          {/* Footer hint */}
          <div className="row center between" style={{padding:'10px 20px',background:'#fff',borderTop:'1px solid var(--line)'}}>
            <div className="muted xs row gap-12">
              <span>↔ {Tr('Drag = zmena izby aj termínu','Drag = move room or date')}</span>
              <span>📌 {Tr('Pripnúť do schránky → klik na nový slot','Pin to clipboard → click a new slot')}</span>
              <span>· {Tr('Klik = otvor detail','Click = open detail')}</span>
            </div>
            <div className="row gap-12 center small">
              {[
                ['conf', Tr('Potvrdená','Confirmed')],
                ['ckin', 'Check-in'],
                ['group',Tr('Skupina','Group')],
                ['held', 'Hold'],
                ['hk', 'HK'],
              ].map(([k,l])=>(
                <span key={k} className="row gap-6 center"><div className={`resv ${k}`} style={{width:18,height:10,padding:0,borderRadius:3,boxShadow:'none'}}/><span style={{fontSize:11}}>{l}</span></span>
              ))}
            </div>
          </div>
        </div>

        {/* Right inspector */}
        <div className="col" style={{flex:'0 0 320px',background:'#fff',borderLeft:'1px solid var(--line)',padding:20,gap:14,overflowY:'auto'}}>
          <div className="eyebrow">{Tr('VYBRANÁ REZERVÁCIA','SELECTED RESERVATION')}</div>

          {/* Hero */}
          <div className="row gap-12 center">
            <Av name="JN" sz="lg"/>
            <div className="col" style={{lineHeight:1.2}}>
              <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:700,fontSize:15}}>Ing. Jozef Novák</div>
              <div className="xs muted">+ 1 spol. · izba <b className="num">203</b> · 21n</div>
            </div>
          </div>
          <div className="row gap-4 wrap">
            <P k="bad">VIP</P>
            <P k="ok">VšZP</P>
            <P>D2</P>
            <P k="plum">KKL · Klasická</P>
          </div>

          <div className="panel pad-12 col gap-6 small">
            <div className="row between"><span className="muted">{Tr('Pobyt','Stay')}</span><b className="num">21. 5. – 11. 6.</b></div>
            <div className="row between"><span className="muted">{Tr('Balík','Package')}</span><b>KKL · Klasická</b></div>
            <div className="row between"><span className="muted">{Tr('Cena spolu','Total')}</span><b className="num">2 940 €</b></div>
            <div className="row between"><span className="muted">{Tr('Zaplatené','Paid')}</span><b className="num status-ok">500 €</b></div>
          </div>

          <div className="col gap-6">
            <button className="btn primary" style={{justifyContent:'center'}} onClick={()=>nav.go('checkin')}><Icon n="key" size={14}/> Check-in</button>
            <button className="btn" style={{justifyContent:'center'}} onClick={()=>nav.go('guest')}>{Tr('Otvoriť detail','Open detail')}</button>
            <button className="btn ghost" style={{justifyContent:'center'}}>{Tr('Presunúť izbu','Move room')}</button>
          </div>

          {/* M5 linked */}
          <div className="panel pad-12 tint">
            <div className="row between center" style={{marginBottom:8}}>
              <div className="eyebrow" style={{color:'var(--blue)'}}>{Tr('PROCEDÚRY DNES · M5','PROCEDURES TODAY · M5')}</div>
              <span className="num small"><b>3</b></span>
            </div>
            <div className="col gap-6 small">
              {[
                ['11:00','Magnetoterapia','ord. 14','#2E5BFF'],
                ['13:00','Pitná kúra','pram. Alžbeta','#5DD3E8'],
                ['14:30','Inhalácia','INH-2','#7857C7'],
              ].map((p,i)=>(
                <div key={i} className="row gap-8 center" style={{padding:'6px',background:'#fff',borderRadius:6}}>
                  <div className="num xs" style={{fontWeight:700,flex:'0 0 36px'}}>{p[0]}</div>
                  <div style={{width:4,height:18,background:p[3],borderRadius:99}}/>
                  <div className="col" style={{lineHeight:1.2,flex:1,minWidth:0}}>
                    <span style={{fontSize:11.5,fontWeight:600}}>{p[1]}</span>
                    <span className="xs muted">{p[2]}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn ghost sm" style={{width:'100%',justifyContent:'center',marginTop:8}} onClick={()=>nav.go('proc')}>{Tr('Otvoriť v M5','Open in M5')} →</button>
          </div>
        </div>
      </div>
    </HFScreen>
  );
}
window.HFGrid = HFGrid;
