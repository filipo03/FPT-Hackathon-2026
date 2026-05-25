/* ── Housekeeping + Room detail ──────────────────────────────── */

function Housekeeping(){
  const cols = [
    { k:'dirty',   t:T('Špinavá · po odchode','Dirty · checked out'), c:'#FBE2DC', b:'#D6453B' },
    { k:'prog',    t:T('Upratuje sa','Cleaning in prog.'), c:'#FFEFCC', b:'#E8B23A' },
    { k:'ready',   t:T('Pripravená · pre check-in','Ready · for check-in'), c:'#D6F1E1', b:'#2FA76E' },
    { k:'block',   t:T('Blok / údržba','Blocked / maintenance'), c:'#E0E1E8', b:'#5B6076' },
    { k:'stay',    t:T('Obsadená · ranný refresh','Occupied · refresh'), c:'#E1EBFB', b:'#1B6FDB' },
  ];
  const tiles = {
    dirty: ['401 · Bobula','205 · Sopková','303 · Varga'],
    prog:  ['304 · Pavlíková','402 · Kowalska'],
    ready: ['201','202','203','205','206','502'],
    block: ['501 · maľba','601 · plyn'],
    stay:  ['101','102','105','107','108','203','207','209','211','212','215','217','219','302','305','308'],
  };
  const assignees = ['Bartošová','Lacková','Mrázová','Pavlíková','Sedláková'];

  return (
    <Screen active="house" wide title={T('Plán housekeepingu','Housekeeping plan')} sub={T('21. máj · ranná zmena 6–14 · 5 chyžných','May 21 · morning 6am–2pm · 5 housekeepers')}
      actions={<><button className="btn">{T('Tlač denného listu','Print sheet')}</button><button className="btn primary">{T('Priradiť úlohy','Assign tasks')}</button></>}>
      <div className="col" style={{height:'100%',overflow:'hidden'}}>
        {/* KPI strip */}
        <div className="row gap-12 pad-12" style={{borderBottom:'1px solid var(--line-soft)',background:'#FBF9F4'}}>
          {[
            [T('Pripravených','Ready'),'68','+ 12 do 14:00','#2FA76E'],
            [T('Špinavé po check-oute','Dirty'),'11','3 priorita','#D6453B'],
            [T('V procese','In progress'),'8','—','#E8B23A'],
            [T('Blok / údržba','Blocked'),'4','501 maľba','#5B6076'],
            [T('Pri stayoveroch','Stayover refresh'),'139','69% hotových','#1B6FDB'],
          ].map((k,i)=>(
            <div key={i} className="box r pad-12 grow" style={{borderLeft:`4px solid ${k[3]}`}}>
              <div className="upper xs muted">{k[0]}</div>
              <div className="num" style={{fontSize:24,fontWeight:800,marginTop:2}}>{k[1]}</div>
              <div className="xs muted">{k[2]}</div>
            </div>
          ))}
        </div>

        <div className="row grow" style={{overflow:'hidden'}}>
          {/* Kanban */}
          <div className="row gap-8 pad-12 grow" style={{overflowX:'auto',alignItems:'flex-start'}}>
            {cols.map(c => (
              <div key={c.k} className="box r col" style={{flex:'1 1 220px',minWidth:220,background:c.c,borderColor:c.b}}>
                <div className="row between center pad-8" style={{borderBottom:`1px solid ${c.b}`}}>
                  <h4 style={{color:c.b}}>{c.t}</h4>
                  <Pill style={{borderColor:c.b,color:c.b}}>{tiles[c.k].length}</Pill>
                </div>
                <div className="col gap-6 pad-8" style={{maxHeight:520,overflowY:'auto'}}>
                  {tiles[c.k].map((t,i)=>{
                    const parts = t.split(' · ');
                    return (
                      <div key={i} className="box r pad-8" style={{background:'#fff'}}>
                        <div className="row between center">
                          <span className="num" style={{fontWeight:700}}>{parts[0]}</span>
                          {c.k!=='ready' && c.k!=='stay' && <Avatar md name={assignees[i%5].slice(0,2).toUpperCase()} tone={c.b}/>}
                        </div>
                        {parts[1] && <div className="xs muted" style={{marginTop:2}}>{parts[1]}</div>}
                        {c.k==='prog' && <div className="xs" style={{marginTop:4}}><span className="bar" style={{width:'55%',background:c.b,height:4}}></span> 55%</div>}
                        {c.k==='dirty' && i===0 && <Pill k="warn" style={{marginTop:4}}>{T('priorita · skor. check-in','priority')}</Pill>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right rail: assignees */}
          <div className="col pad-12 gap-12" style={{flex:'0 0 260px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
            <h4>{T('Chyžné · zaťaženie','Housekeepers · load')}</h4>
            {assignees.map((a,i)=>{
              const load = [8,6,7,5,6][i]; const max = 10;
              return (
                <div key={i} className="box r pad-8 small">
                  <div className="row between center"><b>{a}</b><span className="num">{load}/{max}</span></div>
                  <div style={{height:6,background:'#E8EDF7',borderRadius:99,marginTop:4,overflow:'hidden'}}>
                    <div style={{width:`${load/max*100}%`,height:'100%',background: load/max>0.8?'#D6453B':'#1B6FDB'}}></div>
                  </div>
                  <div className="xs muted" style={{marginTop:4}}>{T('izby','rooms')}: 201–207, 211–214</div>
                </div>
              );
            })}
            <hr/>
            <h4>{T('Otvorené úlohy','Open tasks')}</h4>
            <div className="col gap-4 small">
              <div className="box r pad-8">🔧 501 · {T('maľba do 24. 5.','paint by 24.5.')}</div>
              <div className="box r pad-8">💡 305 · {T('výmena žiarovky','bulb replace')}</div>
              <div className="box r pad-8">🪟 412 · {T('zlomená klika','broken handle')}</div>
            </div>
            <Note x={6} y={520} w={240} rot={2}>Recepčný len READ — písanie do HK je z mobilu chyžnej.</Note>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function RoomDetail(){
  return (
    <Screen active="house" wide title={T('Izba 203 · Superior Park','Room 203 · Superior Park')} sub="Astória · 2. poschodie · 2L · 24 m²"
      actions={<><button className="btn">{T('Blokovať','Block')}</button><button className="btn">{T('Označiť údržbu','Mark maintenance')}</button><button className="btn primary">{T('Označiť ako pripravená','Mark ready')}</button></>}>
      <div className="row" style={{height:'100%'}}>
        <div className="col grow pad-16 gap-12" style={{overflowY:'auto'}}>
          {/* Hero */}
          <div className="row gap-12">
            <div className="box r" style={{flex:'0 0 360px',height:200,background:'#E1EBFB',position:'relative',overflow:'hidden'}}>
              <div className="row gap-2 center" style={{position:'absolute',inset:0}}>
                <div className="hand muted" style={{fontSize:18}}>📷 {T('Foto izby','Room photo')}</div>
              </div>
              <div className="row gap-2" style={{position:'absolute',bottom:8,left:8}}>
                <span className="pill ink xs">1/8</span>
                <span className="pill xs">2/8</span><span className="pill xs">3/8</span>
              </div>
            </div>
            <div className="col grow gap-8">
              <div className="box r pad-12">
                <h3 style={{marginBottom:8}}>{T('Charakteristika','Specs')}</h3>
                <div className="row gap-12 wrap small">
                  <div className="col"><span className="muted xs">{T('Poschodie','Floor')}</span><b>2.</b></div>
                  <div className="col"><span className="muted xs">{T('Krídlo','Wing')}</span><b>Astória</b></div>
                  <div className="col"><span className="muted xs">{T('Plocha','Area')}</span><b className="num">24 m²</b></div>
                  <div className="col"><span className="muted xs">{T('Lôžka','Beds')}</span><b>2L (twin)</b></div>
                  <div className="col"><span className="muted xs">{T('Výhľad','View')}</span><b>{T('Park','Park')}</b></div>
                  <div className="col"><span className="muted xs">{T('Balkón','Balcony')}</span><b>Áno · J</b></div>
                </div>
                <hr/>
                <div className="row gap-6 wrap">
                  {['📺 TV','📶 Wi-Fi','❄️ Klíma','🧊 Minibar','🛁 Vaňa','🚿 Sprcha','🚭 Nefajčiar.','♿ Bezbar.'].map(t=> <Pill key={t}>{t}</Pill>)}
                </div>
              </div>
              <div className="box r pad-12">
                <h3 style={{marginBottom:8}}>{T('Stav','Status')}</h3>
                <div className="row gap-8 center">
                  <Pill k="ok" style={{fontSize:12,padding:'4px 10px'}}>{T('Obsadená · pripravená','Occupied · clean')}</Pill>
                  <span className="muted small">{T('Posledné upratovanie','Last cleaning')}: <b>{T('dnes 8:15 · Bartošová','today 8:15am')}</b></span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="box r pad-12">
            <h3 style={{marginBottom:8}}>{T('Obsadenosť · ďalších 14 dní','Occupancy · next 14 days')}</h3>
            <div className="row gap-2" style={{flexWrap:'wrap'}}>
              {Array.from({length:14}).map((_,i)=>{
                const t = i<3 ? 'in' : i<7 ? 'in' : i<10 ? 'free' : 'next';
                const colors = { in:'#0F1F4D', free:'#fff', next:'#1B6FDB' };
                return (
                  <div key={i} className="box r-sm" style={{flex:'0 0 calc(100%/14 - 2px)',height:60,background:colors[t],color:t==='free'?'var(--ink)':'#fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:600}}>
                    <div className="xs" style={{opacity:.8}}>{['pi','so','ne','po','ut','st','št','pi','so','ne','po','ut','st','št'][i]}</div>
                    <div className="num" style={{fontWeight:800,fontSize:13}}>{21+i>31?(21+i-31):(21+i)}</div>
                    <div className="xs">{t==='in'?'Novák':t==='free'?'voľná':'Hudák'}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Issues + housekeeping history */}
          <div className="row gap-12">
            <div className="box r pad-12 grow">
              <h3 style={{marginBottom:8}}>{T('Otvorené problémy','Open issues')}</h3>
              <div className="col gap-6 small">
                <div className="box r pad-8 row gap-8 center"><Pill k="warn">⚠</Pill><span>{T('Klika v kúpeľni vŕzga','Bathroom handle squeaks')}</span><span className="grow"></span><span className="xs muted">{T('nahl. 19. 5.','rep. May 19')}</span></div>
                <div className="box r pad-8 row gap-8 center"><Pill k="ok">✓</Pill><span>{T('Žiarovka stojan. lampa','Lamp bulb')}</span><span className="grow"></span><span className="xs muted">{T('opravené 18. 5.','fixed May 18')}</span></div>
                <button className="btn ghost sm">+ {T('Nahlásiť problém','Report issue')}</button>
              </div>
            </div>
            <div className="box r pad-12 grow">
              <h3 style={{marginBottom:8}}>{T('Posledných 30 dní · obsadenosť','Last 30d occupancy')}</h3>
              <div className="num" style={{fontSize:28,fontWeight:800}}>83%</div>
              <div className="muted small">{T('Tržba','Revenue')}: <b className="num">2 380 €</b> · ADR <b className="num">96 €</b></div>
              <div className="row gap-1" style={{marginTop:8}}>
                {Array.from({length:30}).map((_,i)=>(
                  <div key={i} style={{width:4,height:24,background: [4,8,18,22].includes(i)?'#fff':'#1B6FDB',border:'1px solid var(--line-soft)'}}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col pad-16 gap-12" style={{flex:'0 0 280px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Aktuálne hosť','Current guest')}</h4>
          <div className="box r pad-8">
            <div className="row center gap-6"><Avatar name="JN" tone="#1B6FDB" md/><div><b>Ing. Jozef Novák</b><div className="xs muted">+1 manželka · KKL · 21n</div></div></div>
          </div>
          <h4>{T('Súčasti vybavenia','Inventory')}</h4>
          <div className="col gap-4 small">
            <div className="row between"><span>{T('Uteráky','Towels')}</span><b>4 · ✓</b></div>
            <div className="row between"><span>{T('Plachty','Sheets')}</span><b>2 sady</b></div>
            <div className="row between"><span>{T('Šampón / mydlo','Toiletries')}</span><b>3 / 3 · ✓</b></div>
            <div className="row between"><span>{T('Minibar inventár','Minibar')}</span><b>posl. 20. 5.</b></div>
          </div>
          <Note x={6} y={500} w={240} rot={1.5}>Recepčný môže blokovať izbu, ale HK akcie patria chyžnej.</Note>
        </div>
      </div>
    </Screen>
  );
}

window.Housekeeping = Housekeeping;
window.RoomDetail = RoomDetail;
