/* ── Dashboard: 3 variants ───────────────────────────────────── */

function DashboardTimeline(){
  const hours = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20'];
  const events = [
    { t:'07:30', kind:'arr', text:'Bus VšZP · 32 osôb', sub:'Skupina C-12 · 3. dvere', warn:true },
    { t:'08:00', kind:'med', text:'M4 · Vstupná prehliadka', sub:'Dr. Lipták · 6 hostí' },
    { t:'09:15', kind:'arr', text:'Novák Jozef + manželka', sub:'KKL · 21n · izba 203' },
    { t:'10:00', kind:'task',text:'Doplniť depozit · Šimko', sub:'250 € · izba 301' },
    { t:'11:00', kind:'dep', text:'Bobula Ján · check-out', sub:'izba 401 · folio 1248 €' },
    { t:'12:30', kind:'arr', text:'Walk-in · očakávaný', sub:'rezervácia z M3 · hold 24h' },
    { t:'14:00', kind:'dep', text:'Pavlíková Anna · check-out',sub:'izba 304 · doplatok 80 €' },
    { t:'15:00', kind:'task',text:'Kontrola HK · izby 201–205', sub:'po skupinovom príchode' },
    { t:'17:20', kind:'arr', text:'Hudák Peter', sub:'Antistresový pobyt · 5n' },
  ];
  return (
    <Screen active="dash" wide title={T('Prehľad zmeny','Shift dashboard')} sub={T('Piatok · 21. máj 2026 · zmena 06–14 · Jana Kováčová','Friday · May 21, 2026 · shift 06–14')}>
      <div className="col" style={{height:'100%',padding:16,gap:14}}>
        {/* KPI row */}
        <div className="row gap-12">
          {[
            { l:T('Príchody dnes','Arrivals today'), v:'18', s:'+ 32 (bus)', d:'ok'},
            { l:T('Odchody dnes','Departures'),       v:'11', s:T('z toho 3 do 12:00','3 before noon'), d:''},
            { l:T('Obsadenosť','Occupancy'),           v:'87%',s:'168 / 192', d:''},
            { l:T('Voľné izby','Available'),          v:'24', s:T('po HK · 8','after HK · 8'), d:'warn'},
            { l:T('No-show riziko','No-show risk'),   v:'2',  s:T('držať do 14:00','hold until 2pm'), d:'bad'},
            { l:T('Tržba dňa','Today rev.'),          v:'12 480 €',s:'+18% MoM', d:'ok'},
          ].map((k,i) => (
            <div key={i} className="box r pad-12 grow">
              <div className="row between center">
                <div className="upper xs muted">{k.l}</div>
                <Dot k={k.d}/>
              </div>
              <div className="num" style={{fontSize:24,fontWeight:800,marginTop:4}}>{k.v}</div>
              <div className="small muted">{k.s}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="box r grow" style={{display:'flex',flexDirection:'column',minHeight:0}}>
          <div className="row between center pad-12" style={{borderBottom:'1px solid var(--line-soft)'}}>
            <h3>{T('Priebeh dňa · 06:00–20:00','Timeline · 6am–8pm')}</h3>
            <div className="row gap-6">
              <span className="pill"><Dot k="ok"/> {T('Príchod','Arrival')}</span>
              <span className="pill"><Dot k="warn"/> {T('Odchod','Departure')}</span>
              <span className="pill"><Dot k="med"/> M4 {T('Lekár','Medical')}</span>
              <span className="pill"><Dot k="cyan"/> {T('Úloha','Task')}</span>
            </div>
          </div>
          {/* hour ruler */}
          <div className="row" style={{padding:'10px 14px 4px',gap:0,borderBottom:'1px solid var(--line-soft)'}}>
            {hours.map((h,i) => (
              <div key={i} style={{flex:1,fontSize:10,color:'var(--ink-3)',fontWeight:600}}>{h}:00</div>
            ))}
          </div>
          {/* "now" marker line + events */}
          <div style={{position:'relative',flex:1,padding:'10px 14px',overflow:'hidden'}}>
            <div style={{position:'absolute',left:'30%',top:0,bottom:0,borderLeft:'2px dashed #D6453B'}}>
              <div style={{position:'absolute',top:-4,left:-30,background:'#D6453B',color:'#fff',padding:'1px 6px',borderRadius:3,fontSize:10,fontWeight:700}}>11:24 NOW</div>
            </div>
            <div className="col gap-6">
              {events.map((e,i) => {
                const hr = parseInt(e.t.slice(0,2));
                const mn = parseInt(e.t.slice(3,5));
                const pct = ((hr-6)+mn/60)/14*100;
                const colors = { arr:'a', dep:'f', med:'d', task:'c' };
                return (
                  <div key={i} className="row gap-8 center" style={{minHeight:26}}>
                    <div style={{flex:'0 0 50px'}} className="num small muted">{e.t}</div>
                    <div style={{flex:1,position:'relative',height:26}}>
                      <div className={`resv ${colors[e.kind]}`} style={{position:'absolute',left:`${pct}%`,top:0,minWidth:220,maxWidth:380}}>
                        <span>{e.text}</span>
                        {e.warn && <span className="pill warn" style={{marginLeft:'auto',padding:'0 5px',fontSize:9}}>!</span>}
                      </div>
                      <div className="xs muted" style={{position:'absolute',left:`${pct}%`,top:18,marginLeft:8}}>{e.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Note x={920} y={20} w={210}>
              Časová os ukazuje, čo sa CHYSTÁ — recepčný nemusí prepínať obrazovky.
            </Note>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function DashboardKPI(){
  return (
    <Screen active="dash" wide title={T('Prehľad zmeny','Shift dashboard')} sub={T('Variant B · klasický KPI grid','Variant B · classic KPI grid')}>
      <div className="row gap-12" style={{padding:16,height:'100%'}}>
        {/* Left main */}
        <div className="col gap-12 grow">
          {/* KPI 4 large */}
          <div className="row gap-12">
            {[
              { l:T('Obsadenosť','Occupancy'),v:'87%',s:'168/192',c:'#1B6FDB'},
              { l:T('ADR · prům. cena','ADR'),v:'74 €',s:'+3%',c:'#7857C7'},
              { l:T('RevPAR','RevPAR'),v:'64 €',s:'+9%',c:'#2FA76E'},
              { l:T('CR · príchody','Check-ins'),v:'18/18',s:T('všetko vybavené','all done'),c:'#0F1F4D'},
            ].map((k,i) => (
              <div key={i} className="box r pad-16 grow" style={{borderLeft:`4px solid ${k.c}`}}>
                <div className="upper xs muted">{k.l}</div>
                <div className="num" style={{fontSize:28,fontWeight:800,marginTop:6}}>{k.v}</div>
                <div className="small">{k.s}</div>
              </div>
            ))}
          </div>

          {/* Arrivals + Departures tables */}
          <div className="row gap-12 grow">
            <div className="box r grow col" style={{minWidth:0}}>
              <div className="row between center pad-12" style={{borderBottom:'1px solid var(--line-soft)'}}>
                <h3>↘ {T('Príchody dnes','Arrivals today')} · 18</h3>
                <span className="pill ok">12 {T('hotových','done')}</span>
              </div>
              <table className="tbl">
                <thead><tr>
                  <th>{T('Čas','Time')}</th><th>{T('Hosť','Guest')}</th><th>{T('Izba','Room')}</th><th>{T('Balík','Pkg')}</th><th>{T('Poisť.','Ins.')}</th><th></th>
                </tr></thead>
                <tbody>
                {[
                  ['08:00','Bus skupina C-12','201–212','KKL','VšZP','done'],
                  ['09:15','Ing. Novák J. +1','203','KKL','VšZP','done'],
                  ['09:30','Kováčová M.','302','CCO','Dôvera','done'],
                  ['10:00','Pavlíková A.','304','ANS','samopl.','done'],
                  ['12:30','Hudák P.','205','ANS','VšZP','wait'],
                  ['14:00','Tomečková G.','402','RVK','samopl.','wait'],
                  ['17:20','Bobula J.','401','KKL','Dôvera','wait'],
                ].map((r,i) => (
                  <tr key={i}>
                    <td className="num">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td className="num">{r[2]}</td>
                    <td><Pill>{r[3]}</Pill></td>
                    <td>{r[4]}</td>
                    <td>{r[5]==='done' ? <Pill k="ok">✓</Pill> : <button className="btn sm primary">Check-in</button>}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="box r grow col" style={{minWidth:0}}>
              <div className="row between center pad-12" style={{borderBottom:'1px solid var(--line-soft)'}}>
                <h3>↗ {T('Odchody dnes','Departures')} · 11</h3>
                <span className="pill warn">3 {T('do 12:00','by noon')}</span>
              </div>
              <table className="tbl">
                <thead><tr>
                  <th>{T('Do','By')}</th><th>{T('Hosť','Guest')}</th><th>{T('Izba','Room')}</th><th>{T('Folio','Folio')}</th><th>{T('Depo','Deposit')}</th><th></th>
                </tr></thead>
                <tbody>
                {[
                  ['10:00','Bobula Ján','401','1 248 €','✓','ready'],
                  ['10:30','Sopková H.','205','842 €','✓','ready'],
                  ['11:00','Varga L.','303','1 510 €','—','warn'],
                  ['12:00','Pavlíková A.','304','1 120 €','✓','ready'],
                  ['14:00','Kowalska H.','402','1 980 €','—','warn'],
                ].map((r,i) => (
                  <tr key={i}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                    <td className="num">{r[2]}</td>
                    <td className="num">{r[3]}</td>
                    <td>{r[4]==='✓'?<Pill k="ok">✓</Pill>:<Pill k="warn">!</Pill>}</td>
                    <td>{r[5]==='ready'?<button className="btn sm primary">Check-out</button>:<button className="btn sm">{T('Doplatok','Settle')}</button>}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="col gap-12" style={{flex:'0 0 320px'}}>
          <div className="box r pad-12">
            <div className="row between center" style={{marginBottom:8}}>
              <h3>{T('Moje úlohy','My tasks')}</h3>
              <span className="pill ink">5</span>
            </div>
            <div className="col gap-6 small">
              {[
                {t:T('Doplniť depozit · Šimko','Add deposit · Šimko'), pri:'high'},
                {t:T('Predpárovať skupinu D-04','Pre-assign group D-04'), pri:'med'},
                {t:T('Zavolať: doklad pre 304','Call: doc for 304'), pri:'low'},
                {t:T('Notifikovať M5 · zmena izby 201','Notify M5 · room 201'), pri:'med'},
                {t:T('Strata: hodinky · Apt. 402','Lost: watch · Apt. 402'), pri:'low'},
              ].map((t,i)=>(
                <div key={i} className="row gap-8 center" style={{padding:'4px 0',borderBottom:'1px dashed var(--line-soft)'}}>
                  <div className={`box r-sm`} style={{width:12,height:12,flex:'0 0 12px',borderColor: t.pri==='high'?'#D6453B':t.pri==='med'?'#E8B23A':'#5B6076'}}></div>
                  <div className="grow">{t.t}</div>
                </div>
              ))}
            </div>
            <button className="btn ghost small" style={{marginTop:8}}>+ {T('Nová úloha','New task')}</button>
          </div>

          <div className="box r pad-12">
            <h3 style={{marginBottom:8}}>{T('Stav izieb','Room status')}</h3>
            <div className="row gap-4 wrap" style={{fontSize:10}}>
              {Array.from({length:48}).map((_,i)=>{
                const states=['ok','warn','bad','','ok','ok','','ok'];
                const s=states[i%states.length];
                return <div key={i} className="box r-sm" style={{width:26,height:24,display:'flex',alignItems:'center',justifyContent:'center',background:s==='ok'?'#D1EFDF':s==='warn'?'#FFE5B5':s==='bad'?'#F8D9D6':'#fff',borderColor: s==='ok'?'#2FA76E':s==='warn'?'#E8B23A':s==='bad'?'#D6453B':'var(--line-soft)'}}>{i+201}</div>;
              })}
            </div>
            <div className="legend" style={{marginTop:10}}>
              <span><i style={{background:'#D1EFDF',border:'1px solid #2FA76E'}}></i>{T('Pripravená','Ready')}</span>
              <span><i style={{background:'#FFE5B5',border:'1px solid #E8B23A'}}></i>{T('HK v procese','HK in prog.')}</span>
              <span><i style={{background:'#F8D9D6',border:'1px solid #D6453B'}}></i>{T('Blok','Block')}</span>
              <span><i style={{background:'#fff',border:'1px solid #CFD3DE'}}></i>{T('Obsadená','Occupied')}</span>
            </div>
          </div>

          <div className="box tint r pad-12">
            <h3 style={{marginBottom:6}}>{T('Notifikácie','Notifications')}</h3>
            <div className="col gap-4 small">
              <div>• {T('M5 zmena: Novák — magnetoterapia 11:00 → 14:00','M5 change: Novák — magnet 11:00 → 14:00')}</div>
              <div>• {T('VšZP · poukaz schválený · Šimko','VšZP · voucher approved · Šimko')}</div>
              <div>• {T('HK · izba 201 pripravená','HK · room 201 ready')}</div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function DashboardCommand(){
  return (
    <Screen active="dash" wide title={T('Command deck','Command deck')} sub={T('Variant C · jeden pohľad, všetko stručne · pre rýchlu zmenu','Variant C · single view, fast shift')}>
      <div className="col" style={{padding:16,gap:12,height:'100%'}}>
        {/* Top strip: critical now */}
        <div className="box ink r pad-12 row gap-12 center">
          <div className="hand" style={{fontSize:22,color:'#fff'}}>⌁ Hneď teraz</div>
          <div className="grow row gap-8 wrap">
            <span className="pill warn">Bus 32 hostí · pri vchode</span>
            <span className="pill bad">Bobula 401 · folio neuzatvorený</span>
            <span className="pill" style={{background:'#fff'}}>Šimko · depozit 250 €</span>
            <span className="pill" style={{background:'#fff'}}>Walk-in · čaká 5 min</span>
          </div>
          <button className="btn accent">{T('Otvoriť skupinový check-in','Open group check-in')}</button>
        </div>

        {/* Big numbers + sparkline placeholder */}
        <div className="row gap-12">
          {[
            ['Príchody','18',T('z 18 očakávaných','of 18 expected')],
            ['Odchody','11',T('3 čakajú doplatok','3 pending settlement')],
            ['Obsadenosť','87%','168 / 192'],
            ['Tržba','12 480 €','+18%'],
          ].map((k,i)=>(
            <div key={i} className="box r pad-16 grow" style={{position:'relative'}}>
              <div className="upper xs muted">{T(k[0],k[0])}</div>
              <div className="num" style={{fontSize:34,fontWeight:800,letterSpacing:'-0.02em',marginTop:2}}>{k[1]}</div>
              <div className="small muted">{k[2]}</div>
              {/* tiny sparkline */}
              <svg width="120" height="32" style={{position:'absolute',right:10,bottom:10}}>
                <polyline points={`0,24 14,18 28,22 42,12 56,16 70,8 84,12 98,6 112,10`} fill="none" stroke={i===3?'#2FA76E':'#1B6FDB'} strokeWidth="1.5"/>
              </svg>
            </div>
          ))}
        </div>

        {/* 3-col layout: arrivals · timeline mini · tasks */}
        <div className="row gap-12 grow" style={{minHeight:0}}>
          <div className="box r grow col">
            <div className="pad-12" style={{borderBottom:'1px solid var(--line-soft)'}}><h3>{T('Nasledujúce 2 hodiny','Next 2 hours')}</h3></div>
            <div className="col gap-2 pad-8" style={{fontSize:11}}>
              {[
                ['11:30','arr','Skupina C-12 · 32 osôb',     '#1B6FDB'],
                ['12:00','dep','Bobula J. · 401',            '#E8B23A'],
                ['12:30','arr','Walk-in (3)',                '#5DD3E8'],
                ['13:00','med','M4 vstupné prehliadky · 6',  '#7857C7'],
                ['13:30','arr','Hudák P. · 205',             '#1B6FDB'],
              ].map((e,i)=>(
                <div key={i} className="row gap-8 center" style={{padding:'6px 8px',borderRadius:4, background:i%2?'#FBF9F4':'#fff'}}>
                  <div className="num" style={{flex:'0 0 44px',fontWeight:600}}>{e[0]}</div>
                  <div style={{width:8,height:24,background:e[3],borderRadius:2}}></div>
                  <div className="grow">{e[2]}</div>
                  <button className="btn sm">{e[1]==='arr'?'Check-in':e[1]==='dep'?'Check-out':T('Otvoriť','Open')}</button>
                </div>
              ))}
            </div>
          </div>
          <div className="box r col" style={{flex:'0 0 340px'}}>
            <div className="pad-12" style={{borderBottom:'1px solid var(--line-soft)'}}><h3>{T('Špec. požiadavky dnes','Special requests today')}</h3></div>
            <div className="col gap-6 pad-12 small">
              <div className="row gap-8 center"><Pill k="bad">VIP</Pill><span>Bobula · káva izba 7:00</span></div>
              <div className="row gap-8 center"><Pill k="warn">⚠</Pill><span>Pavlíková · alergia penicilín</span></div>
              <div className="row gap-8 center"><Pill>D1</Pill><span>Tomečková · diabet. diéta</span></div>
              <div className="row gap-8 center"><Pill med>♿</Pill><span>Šimko · bezbariér. prístup</span></div>
              <div className="row gap-8 center"><Pill k="ok">🚌</Pill><span>Skupina · vegetariánska 6×</span></div>
              <div className="row gap-8 center"><Pill>👶</Pill><span>Hudák · postieľka</span></div>
            </div>
          </div>
          <div className="box r col" style={{flex:'0 0 280px'}}>
            <div className="pad-12 row between center" style={{borderBottom:'1px solid var(--line-soft)'}}><h3>{T('Moje úlohy','My tasks')}</h3><Pill k="ink">5</Pill></div>
            <div className="col gap-6 pad-12 small">
              {['Doplniť depozit · Šimko','Predpárovať skupinu D-04','Zavolať: doklad pre 304','Notif. M5 · zmena izby 201','Strata: hodinky · Apt. 402'].map((t,i)=>(
                <div key={i} className="row gap-8 center"><div className="box r-sm" style={{width:12,height:12}}></div><span>{t}</span></div>
              ))}
            </div>
          </div>
        </div>
        <Note x={620} y={30} w={220}>Variant C má rovnaké dáta ako B, ale hierarchizuje podľa „čo teraz".</Note>
      </div>
    </Screen>
  );
}

window.DashboardTimeline = DashboardTimeline;
window.DashboardKPI = DashboardKPI;
window.DashboardCommand = DashboardCommand;
