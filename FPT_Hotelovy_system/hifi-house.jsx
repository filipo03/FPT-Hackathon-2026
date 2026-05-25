/* ── Hi-Fi · Rooms & Housekeeping ───────────────────────────── */

function HFHouse(){
  const nav = useNav();

  const rooms = [
    { no:'201', wing:'Astória',  cat:'Štandard Park · 1L', floor:2, m2:18, st:'occ',   guest:'Skup. C-12 / Adamová',   until:'15. 6.', issues:0 },
    { no:'202', wing:'Astória',  cat:'Štandard Park · 2L', floor:2, m2:22, st:'occ',   guest:'Skup. C-12 / Adamec',    until:'15. 6.', issues:0 },
    { no:'203', wing:'Astória',  cat:'Superior Park · 2L', floor:2, m2:24, st:'occ',   guest:'Ing. Novák +1',           until:'11. 6.', issues:1 },
    { no:'204', wing:'Astória',  cat:'Štandard · 1L',      floor:2, m2:16, st:'ready', guest:null,                       until:null, issues:0 },
    { no:'205', wing:'Astória',  cat:'Superior · 2L',      floor:2, m2:22, st:'arr',   guest:'Hudák P. (17–18)',         until:'26. 5.', issues:0 },
    { no:'206', wing:'Astória',  cat:'Štandard · 2L',      floor:2, m2:20, st:'dirty', guest:null,                       until:null, issues:0, vacatedAt:'09:40' },
    { no:'207', wing:'Astória',  cat:'Štandard · 1L',      floor:2, m2:16, st:'occ',   guest:'Pavlíková A.',             until:'4. 6.', issues:0 },
    { no:'301', wing:'Ozón',     cat:'Štandard · 1L',      floor:3, m2:16, st:'dirty', guest:null,                       until:null, issues:0, vacatedAt:'10:15' },
    { no:'302', wing:'Ozón',     cat:'Apartmán Premium',   floor:3, m2:42, st:'occ',   guest:'Kováčová M.',              until:'11. 6.', issues:0 },
    { no:'303', wing:'Ozón',     cat:'Superior Spa · 2L',  floor:3, m2:24, st:'occ',   guest:'Varga L.',                 until:'27. 5.', issues:0 },
    { no:'304', wing:'Ozón',     cat:'Štandard · 2L',      floor:3, m2:20, st:'dep',   guest:'Pavlíková A. (14:00)',     until:'21. 5.', issues:0 },
    { no:'305', wing:'Ozón',     cat:'Štandard · 1L',      floor:3, m2:16, st:'ready', guest:null,                       until:null, issues:1 },
    { no:'401', wing:'Alžbeta',  cat:'Premium Spa · 2L',   floor:4, m2:32, st:'dep',   guest:'Bobula J. (do 10:00) ',     until:'21. 5.', issues:0 },
    { no:'402', wing:'Alžbeta',  cat:'Premium Spa · 2L',   floor:4, m2:32, st:'occ',   guest:'Tomečková G.',             until:'23. 5.', issues:0 },
    { no:'403', wing:'Alžbeta',  cat:'Štandard · 1L',      floor:4, m2:18, st:'block', guest:null,                       until:null, issues:1, blockReason:'maľba' },
    { no:'501', wing:'Alžbeta',  cat:'Premium Spa · 2L',   floor:5, m2:32, st:'block', guest:null,                       until:'24. 5.', issues:1, blockReason:'maľba' },
    { no:'502', wing:'Alžbeta',  cat:'Štandard · 1L',      floor:5, m2:16, st:'ready', guest:null,                       until:null, issues:0 },
    { no:'601', wing:'Alžbeta',  cat:'Štandard · 1L',      floor:6, m2:16, st:'dirty',    guest:null,                       until:null, issues:0, vacatedAt:'08:55' },
  ];

  const stCfg = {
    ready: { l:Tr('Pripravená','Ready'),       c:'var(--ok)',   bg:'var(--ok-soft)',   ink:'#1F6A47' },
    occ:   { l:Tr('Obsadená','Occupied'),      c:'var(--blue)', bg:'var(--blue-soft)', ink:'#1F3A86' },
    arr:   { l:Tr('Príchod dnes','Arriving'),  c:'var(--cyan)', bg:'var(--cyan-soft)', ink:'#0E3640' },
    dep:   { l:Tr('Odchod dnes','Departing'),  c:'var(--warn)', bg:'var(--warn-soft)', ink:'#7A4B07' },
    dirty: { l:Tr('Na upratanie','To be cleaned'), c:'var(--bad)', bg:'var(--bad-soft)', ink:'#7A1F1A' },
    block: { l:Tr('Blok / údržba','Blocked'),  c:'#5C6481',     bg:'var(--bg-2)',      ink:'#313752' },
  };

  const [filter, setFilter] = React.useState('all');
  const [view, setView] = React.useState('tiles'); // tiles · table · floor
  const filtered = rooms.filter(r => filter==='all' ? true : filter==='attention' ? (r.st==='dirty'||r.st==='block') : r.st===filter);

  // KPIs
  const kpis = [
    { l:Tr('IZIEB CELKOM','TOTAL'),         v:'192',  sub:Tr('+ 18 v zobrazení','+ 18 visible'),  c:'var(--blue)' },
    { l:Tr('OBSADENOSŤ','OCCUPANCY'),       v:'87%',  sub:'168 / 192',                              c:'var(--ok)' },
    { l:Tr('PRIPRAVENÝCH','READY'),         v:'24',   sub:Tr('po upratovaní','after cleaning'),     c:'var(--cyan)' },
    { l:Tr('NA UPRATANIE','TO CLEAN'),       v:'8',    sub:Tr('chyžné nahlásia ručne','housekeepers report manually'), c:'var(--bad)' },
    { l:Tr('BLOK / ÚDRŽBA','BLOCKED'),      v:'4',    sub:Tr('501 maľba do 24. 5.','501 paint by May 24'), c:'#5C6481' },
  ];

  return (
    <HFScreen
      active="house"
      title={Tr('Izby & Housekeeping','Rooms & Housekeeping')}
      sub={Tr('192 izieb · 3 krídla · stav v reálnom čase','192 rooms · 3 wings · realtime')}
      actions={<>
        <button className="btn"><Icon n="print" size={14}/> {Tr('Tlač denného listu HK','Print HK sheet')}</button>
        <button className="btn"><Icon n="filter" size={14}/> {Tr('Filter','Filter')}</button>
        <button className="btn accent">{Tr('Priradiť úlohy','Assign tasks')}</button>
      </>}>
      <div className="col gap-16" style={{height:'100%'}}>
        {/* KPI strip */}
        <div className="row gap-12">
          {kpis.map((k,i)=>(
            <div key={i} className="card pad-14 grow" style={{borderLeft:`3px solid ${k.c}`}}>
              <div className="eyebrow">{k.l}</div>
              <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:28,letterSpacing:'-0.02em',marginTop:4}} className="num">{k.v}</div>
              <div className="muted xs">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="card pad-14 row gap-12 center">
          <div className="seg">
            {[
              ['all',Tr('Všetky','All'),rooms.length],
              ['attention',Tr('Pozornosť','Attention'),rooms.filter(r=>r.st==='dirty'||r.st==='block').length],
              ['ready',Tr('Pripravené','Ready'),rooms.filter(r=>r.st==='ready').length],
              ['occ',Tr('Obsadené','Occupied'),rooms.filter(r=>r.st==='occ').length],
              ['arr',Tr('Príchody','Arrivals'),rooms.filter(r=>r.st==='arr').length],
              ['dep',Tr('Odchody','Departures'),rooms.filter(r=>r.st==='dep').length],
              ['dirty',Tr('Na upratanie','To clean'),rooms.filter(r=>r.st==='dirty').length],
              ['block',Tr('Blok','Blocked'),rooms.filter(r=>r.st==='block').length],
            ].map(([k,l,c])=>(
              <div key={k} className={`s ${filter===k?'on':''}`} onClick={()=>setFilter(k)}>{l} · {c}</div>
            ))}
          </div>
          <span className="grow"/>
          <div className="row gap-12 center small">
            {Object.entries(stCfg).map(([k,v])=>(
              <span key={k} className="row gap-6 center">
                <span style={{width:10,height:10,background:v.c,borderRadius:3}}/>
                <span>{v.l}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="row gap-16 grow" style={{minHeight:0}}>
          {/* Rooms grid */}
          <div className="card grow col" style={{minWidth:0,overflow:'hidden'}}>
            <div className="pad-14 row between center" style={{borderBottom:'1px solid var(--line)'}}>
              <div className="col"><div className="eyebrow">{Tr('STAV IZIEB','ROOM STATUS')}</div><h3>{view==='tiles'? Tr('Klik na izbu → detail','Click room → detail') : view==='table' ? Tr('Zoradené podľa krídla a čísla','Sorted by wing & number') : Tr('Pôdorys · 3 krídla, 4–6 poschodí','Floor plan · 3 wings, 4–6 floors')}</h3></div>
              <div className="seg">
                <div className={`s ${view==='tiles'?'on':''}`} onClick={()=>setView('tiles')}>{Tr('Dlaždice','Tiles')}</div>
                <div className={`s ${view==='table'?'on':''}`} onClick={()=>setView('table')}>{Tr('Tabuľka','Table')}</div>
                <div className={`s ${view==='floor'?'on':''}`} onClick={()=>setView('floor')}>{Tr('Pôdorys','Floor plan')}</div>
              </div>
            </div>

            {view==='tiles' && (<div style={{padding:16,overflowY:'auto',flex:1}}>
              {/* Group by wing */}
              {['Astória','Ozón','Alžbeta'].map(wing => {
                const wRooms = filtered.filter(r=>r.wing===wing);
                if (!wRooms.length) return null;
                return (
                  <div key={wing} style={{marginBottom:18}}>
                    <div className="row center gap-8" style={{marginBottom:10}}>
                      <h4 style={{fontSize:14,letterSpacing:'-0.01em'}}>{wing}</h4>
                      <span className="pill outline">{wRooms.length} {Tr('izieb','rooms')}</span>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',gap:10}}>
                      {wRooms.map((rm,i)=>{
                        const sc = stCfg[rm.st];
                        return (
                          <div key={i} onClick={()=>nav.toast(Tr(`Izba ${rm.no} · ${sc.l}`,`Room ${rm.no} · ${sc.l}`))}
                            style={{background:sc.bg,border:`1px solid ${sc.c}`,borderRadius:10,padding:'12px 14px',cursor:'pointer',
                              position:'relative',overflow:'hidden'}}>
                            <div style={{position:'absolute',top:0,left:0,width:4,height:'100%',background:sc.c}}/>
                            <div className="row between center">
                              <div className="num" style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:20,color:sc.ink}}>{rm.no}</div>
                              <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:sc.ink}}>{sc.l}</div>
                            </div>
                            <div className="xs muted" style={{marginTop:2}}>{rm.cat} · {rm.m2}m²</div>
                            {rm.guest && <div className="small" style={{marginTop:6,fontWeight:600,color:sc.ink}}>{rm.guest}</div>}
                            {rm.until && <div className="xs muted">{Tr('do','until')} {rm.until}</div>}
                            {rm.st==='dirty' && (
                              <div className="col gap-4" style={{marginTop:6}}>
                                {rm.vacatedAt && <div className="xs" style={{color:sc.ink}}>{Tr('Uvoľnená','Vacated')} {rm.vacatedAt}</div>}
                                <button className="btn sm" onClick={(e)=>{e.stopPropagation(); nav.toast(Tr(`✓ Izba ${rm.no} označená ako uprataná`,`✓ Room ${rm.no} marked clean`));}}
                                  style={{background:sc.c,color:'#fff',border:'none',justifyContent:'center'}}>{Tr('Chyžná nahlásila · označiť upratanú','HK reported · mark clean')}</button>
                              </div>
                            )}
                            {rm.st==='block' && rm.blockReason && <div className="xs" style={{marginTop:4,color:sc.ink,fontStyle:'italic'}}>🔧 {rm.blockReason}</div>}
                            {rm.issues>0 && <div style={{position:'absolute',top:8,right:8,width:18,height:18,background:'var(--warn)',color:'#3A2402',borderRadius:99,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800}}>{rm.issues}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {filtered.length===0 && (
                <div className="muted" style={{textAlign:'center',padding:48}}>
                  {Tr('Žiadne izby v tomto filtri','No rooms match this filter')}
                </div>
              )}
            </div>)}

            {view==='table' && (<div style={{overflowY:'auto',flex:1}}>
              <table className="t">
                <thead><tr>
                  <th>{Tr('Izba','Room')}</th>
                  <th>{Tr('Krídlo · pos.','Wing · floor')}</th>
                  <th>{Tr('Kategória','Category')}</th>
                  <th style={{textAlign:'right'}}>m²</th>
                  <th>{Tr('Hosť / dôvod','Guest / reason')}</th>
                  <th>{Tr('Do','Until')}</th>
                  <th>{Tr('Stav','Status')}</th>
                  <th>{Tr('Akcia','Action')}</th>
                </tr></thead>
                <tbody>
                  {filtered.map((rm,i)=>{
                    const sc = stCfg[rm.st];
                    return (
                      <tr key={i} onClick={()=>nav.toast(Tr(`Izba ${rm.no} · ${sc.l}`,`Room ${rm.no} · ${sc.l}`))} style={{cursor:'pointer'}}>
                        <td><b className="num" style={{fontFamily:'Plus Jakarta Sans',fontSize:15}}>{rm.no}</b></td>
                        <td><b>{rm.wing}</b> <span className="muted">· {rm.floor}.</span></td>
                        <td>{rm.cat}</td>
                        <td className="num" style={{textAlign:'right'}}>{rm.m2}</td>
                        <td>
                          {rm.guest && <b>{rm.guest}</b>}
                          {rm.st==='block' && <span style={{fontStyle:'italic'}}>🔧 {rm.blockReason}</span>}
                          {rm.st==='dirty' && rm.vacatedAt && <span className="muted">{Tr('Uvoľnená','Vacated')} {rm.vacatedAt}</span>}
                          {!rm.guest && rm.st!=='block' && rm.st!=='dirty' && <span className="muted">—</span>}
                        </td>
                        <td>{rm.until ? <span className="num">{rm.until}</span> : <span className="muted">—</span>}</td>
                        <td><span className="pill" style={{background:sc.bg,color:sc.ink,border:`1px solid ${sc.c}`}}>● {sc.l}</span></td>
                        <td>
                          {rm.st==='ready'  && <button className="btn sm">{Tr('Priradiť hosťa','Assign guest')}</button>}
                          {rm.st==='occ'    && <button className="btn sm">{Tr('Otvoriť rezerv.','Open res.')}</button>}
                          {rm.st==='arr'    && <button className="btn primary sm">Check-in</button>}
                          {rm.st==='dep'    && <button className="btn primary sm">Check-out</button>}
                          {rm.st==='dirty'  && <button className="btn success sm" onClick={(e)=>{e.stopPropagation(); nav.toast(Tr(`✓ Izba ${rm.no} · uprataná`,`✓ Room ${rm.no} clean`));}}>{Tr('Chyžná nahlásila · uprataná','HK done')}</button>}
                          {rm.st==='block'  && <button className="btn sm">{Tr('Odblokovať','Unblock')}</button>}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length===0 && (
                    <tr><td colSpan="8" className="muted" style={{textAlign:'center',padding:48}}>{Tr('Žiadne izby v tomto filtri','No rooms match this filter')}</td></tr>
                  )}
                </tbody>
              </table>
            </div>)}

            {view==='floor' && (<div style={{padding:20,overflowY:'auto',flex:1}}>
              {/* Floor plan per wing */}
              {['Astória','Ozón','Alžbeta'].map(wing => {
                const wRooms = filtered.filter(r=>r.wing===wing);
                if (!wRooms.length) return null;
                const floors = [...new Set(wRooms.map(r=>r.floor))].sort();
                return (
                  <div key={wing} style={{marginBottom:24}}>
                    <div className="row center gap-8" style={{marginBottom:12}}>
                      <h4 style={{fontSize:14,letterSpacing:'-0.01em'}}>{wing}</h4>
                      <span className="pill outline">{floors.length} {Tr('poschodí','floors')} · {wRooms.length} {Tr('izieb','rooms')}</span>
                    </div>
                    <div className="col gap-10">
                      {floors.map(f => {
                        const fRooms = wRooms.filter(r=>r.floor===f).sort((a,b)=>parseInt(a.no)-parseInt(b.no));
                        return (
                          <div key={f} className="row gap-12 center" style={{padding:'12px 14px',background:'#fff',border:'1px solid var(--line)',borderRadius:10,position:'relative'}}>
                            <div style={{flex:'0 0 50px',textAlign:'center'}}>
                              <div className="eyebrow muted">P</div>
                              <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:24}} className="num">{f}</div>
                            </div>
                            <div style={{width:1,alignSelf:'stretch',background:'var(--line)'}}/>
                            {/* corridor */}
                            <div style={{flex:1,position:'relative',padding:'8px 0'}}>
                              <div style={{position:'absolute',top:'50%',left:0,right:0,height:2,background:'repeating-linear-gradient(90deg, var(--line) 0 6px, transparent 6px 10px)',transform:'translateY(-1px)'}}/>
                              <div className="row gap-6" style={{position:'relative',justifyContent:'flex-start',flexWrap:'wrap'}}>
                                {fRooms.map((rm,i)=>{
                                  const sc = stCfg[rm.st];
                                  return (
                                    <div key={i} onClick={()=>nav.toast(Tr(`Izba ${rm.no} · ${sc.l}`,`Room ${rm.no} · ${sc.l}`))}
                                      title={`${rm.no} · ${rm.cat} · ${sc.l}${rm.guest? ' · ' + rm.guest : ''}`}
                                      style={{
                                        flex:'0 0 78px', height:60,
                                        background:sc.bg, border:`2px solid ${sc.c}`, borderRadius:6,
                                        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                                        cursor:'pointer', position:'relative',
                                      }}>
                                      <div className="num" style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:16,color:sc.ink,lineHeight:1}}>{rm.no}</div>
                                      <div style={{fontSize:8.5,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',color:sc.ink,marginTop:3}}>{sc.l}</div>
                                      {rm.issues>0 && <div style={{position:'absolute',top:-4,right:-4,width:14,height:14,background:'var(--warn)',color:'#3A2402',borderRadius:99,fontSize:9,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center'}}>{rm.issues}</div>}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div style={{flex:'0 0 70px',textAlign:'right'}}>
                              <div className="eyebrow muted" style={{fontSize:9}}>{Tr('obsadené','occupied')}</div>
                              <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:18}}><span className="num">{fRooms.filter(r=>r.st==='occ'||r.st==='dep'||r.st==='arr').length}</span><span className="muted small">/{fRooms.length}</span></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {filtered.length===0 && (
                <div className="muted" style={{textAlign:'center',padding:48}}>{Tr('Žiadne izby v tomto filtri','No rooms match this filter')}</div>
              )}
              <div className="xs muted" style={{textAlign:'center',marginTop:8}}>↑ {Tr('Schematický pôdorys · šedá čiara = chodba · klik na izbu pre detail','Schematic plan · gray line = corridor · click for detail')}</div>
            </div>)}
          </div>

          {/* Right rail: HK reports + maintenance + lost&found */}
          <div className="col gap-12" style={{flex:'0 0 320px'}}>
            {/* HK reports (housekeeper-to-reception) */}
            <div className="card col">
              <div className="pad-14" style={{borderBottom:'1px solid var(--line)'}}>
                <div className="eyebrow">{Tr('HLÁSENIA OD CHYŽNÝCH','HOUSEKEEPER REPORTS')}</div>
                <h3 style={{marginTop:4}}>{Tr('Ručné hlásenia · dnes','Manual reports · today')}</h3>
                <div className="xs muted" style={{marginTop:2}}>{Tr('Chyžné nesledujeme — stav izby sa zmení až keď nahlásia hotovo, alebo nahlásia problém.','We don\'t track housekeepers — status flips only when they report.')}</div>
              </div>
              <div className="col gap-6 pad-12 small">
                <div className="panel pad-10" style={{borderLeft:'3px solid var(--ok)'}}>
                  <div className="row between center">
                    <b>✓ 201 → {Tr('upratané','clean')}</b>
                    <span className="xs muted">11:18</span>
                  </div>
                  <div className="xs muted" style={{marginTop:2}}>Bartošová · {Tr('po skupinovom check-oute','after group C/O')}</div>
                </div>
                <div className="panel pad-10" style={{borderLeft:'3px solid var(--bad)'}}>
                  <div className="row between center">
                    <b>🔧 305 · {Tr('pokazené umývadlo','broken sink')}</b>
                    <span className="xs muted">11:02</span>
                  </div>
                  <div className="xs muted" style={{marginTop:2}}>Bartošová → {Tr('recepcia → údržba','reception → maintenance')}</div>
                  <div className="row gap-4" style={{marginTop:6}}>
                    <button className="btn sm" onClick={(e)=>{e.stopPropagation(); nav.toast(Tr('✓ Postúpené údržbe · ticket #4187','✓ Forwarded to maintenance · #4187'));}}>{Tr('Posunúť údržbe','Forward to maintenance')}</button>
                  </div>
                </div>
                <div className="panel pad-10" style={{borderLeft:'3px solid var(--warn)'}}>
                  <div className="row between center">
                    <b>ⓘ 402 · {Tr('extra uteráky','extra towels')}</b>
                    <span className="xs muted">10:48</span>
                  </div>
                  <div className="xs muted" style={{marginTop:2}}>Tomečková · {Tr('odovzdané chyžnej','passed to housekeeper')}</div>
                </div>
                <button className="btn ghost sm" style={{marginTop:4}}>+ {Tr('Nové hlásenie / popis chyby','New report / issue')}</button>
              </div>
            </div>

            {/* Maintenance tickets */}
            <div className="card col">
              <div className="pad-14" style={{borderBottom:'1px solid var(--line)'}}>
                <div className="eyebrow">{Tr('ÚDRŽBA · OTVORENÉ TICKETY','MAINTENANCE · OPEN')}</div>
                <h3 style={{marginTop:4}}>3 {Tr('tickety','tickets')}</h3>
              </div>
              <div className="col gap-6 pad-12 small">
                <div className="panel pad-8" style={{borderLeft:'3px solid var(--warn)'}}>
                  <b>🔧 501 · {Tr('maľba steny','wall paint')}</b>
                  <div className="xs muted" style={{marginTop:2}}>{Tr('blokovaná do 24. 5. · údržba','blocked until May 24')}</div>
                </div>
                <div className="panel pad-8" style={{borderLeft:'3px solid var(--bad)'}}>
                  <b>🚰 305 · {Tr('umývadlo','sink')}</b>
                  <div className="xs muted" style={{marginTop:2}}>{Tr('nahlásila Bartošová · dnes 11:02','reported today 11:02')}</div>
                </div>
                <div className="panel pad-8" style={{borderLeft:'3px solid var(--blue)'}}>
                  <b>💡 305 · {Tr('výmena žiarovky','bulb replacement')}</b>
                  <div className="xs muted" style={{marginTop:2}}>{Tr('priorita nízka','low priority')}</div>
                </div>
              </div>
            </div>

            {/* Lost & found */}
            <div className="card pad-14 col gap-6">
              <div className="eyebrow">{Tr('STRATA & NÁLEZ','LOST & FOUND')}</div>
              <div className="small row center gap-6"><span>⌚</span>{Tr('Hodinky · šatňa wellness','Watch · wellness locker')}</div>
              <div className="small row center gap-6"><span>📱</span>{Tr('Mobil · jedáleň · 18. 5.','Phone · dining · May 18')}</div>
              <button className="btn ghost sm" style={{marginTop:4}}>+ {Tr('Zapísať nález','Add item')}</button>
            </div>
          </div>
        </div>
      </div>
    </HFScreen>
  );
}
window.HFHouse = HFHouse;
