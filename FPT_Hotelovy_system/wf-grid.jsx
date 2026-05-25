/* ── Rezervačná mriežka — 3 variants ──────────────────────────── */

function GridClassic(){
  // 14 days × 12 rooms grid w/ pre-placed reservations
  const days = Array.from({length:14}).map((_,i)=> (i+18));
  const dayName = ['ut','st','št','pi','so','ne','po','ut','st','št','pi','so','ne','po'];
  const today = 3; // friday index
  // reservations: {room: idx, startDay, len, type, name, pkg, badges:[]}
  const reservations = [
    { r:0, s:0,  l:21, k:'a', name:'Novák +1',     pkg:'KKL', tag:['Dx VI/3','VšZP'] },
    { r:1, s:2,  l:7,  k:'a', name:'Kowalska',     pkg:'CCO', tag:['NFZ-PL','D2'] },
    { r:2, s:1,  l:5,  k:'b', name:'Bobula',       pkg:'ANS', tag:['VIP'] },
    { r:2, s:7,  l:5,  k:'a', name:'Tomečková',    pkg:'RVK', tag:['D1'] },
    { r:3, s:0,  l:4,  k:'held', name:'Hold · M3 web', pkg:'RVK', tag:['24h'] },
    { r:3, s:5,  l:7,  k:'a', name:'Hudák +1',     pkg:'ANS', tag:['Dx VI/2'] },
    { r:4, s:3,  l:8,  k:'d', name:'Skup. C-12',   pkg:'KKL', tag:['Bus','32os'] },
    { r:5, s:3,  l:8,  k:'d', name:'Skup. C-12',   pkg:'KKL', tag:[] },
    { r:6, s:3,  l:8,  k:'d', name:'Skup. C-12',   pkg:'KKL', tag:[] },
    { r:7, s:3,  l:8,  k:'d', name:'Skup. C-12',   pkg:'KKL', tag:[] },
    { r:8, s:0,  l:3,  k:'f', name:'HK · maľba',   pkg:'',    tag:['údržba'] },
    { r:8, s:4,  l:10, k:'a', name:'Šimko',        pkg:'AGE', tag:['Dx VII/8','VšZP'] },
    { r:9, s:0,  l:14, k:'b', name:'Pavlíková',    pkg:'KKL', tag:['alergia ⚠','samopl.'] },
    { r:10,s:6,  l:7,  k:'a', name:'Varga',        pkg:'CCO', tag:['Dx I/2'] },
    { r:11,s:1,  l:6,  k:'a', name:'Sopková',      pkg:'CCO', tag:['VšZP'] },
  ];
  const rooms = ROOMS;
  const colW = 70;

  return (
    <Screen active="grid" wide title={T('Rezervácie · šachovnica','Reservations · grid')}
      sub={T('21. máj – 3. jún 2026 · 12 izieb · 15 rezervácií','May 21 – Jun 3, 2026')}
      actions={<>
        <button className="btn"><span>📅</span>{T('Týždeň','Week')}</button>
        <button className="btn primary">{T('Mesiac','Month')}</button>
        <button className="btn accent">+ {T('Nová rezervácia','New')}</button>
      </>}>

      <div className="row" style={{height:'100%'}}>
        {/* Filter rail */}
        <div className="col gap-12 pad-12" style={{flex:'0 0 220px',borderRight:'1px solid var(--line-soft)',background:'#FBF9F4',overflowY:'auto'}}>
          <div>
            <h4 style={{marginBottom:6}}>{T('Filter','Filter')}</h4>
            <input className="box r" style={{width:'100%',padding:'5px 8px',fontSize:11}} placeholder={T('Hosť / izba / poukaz','Guest / room / voucher')}/>
          </div>
          <div className="col gap-6">
            <h4>{T('Krídlo','Wing')}</h4>
            {['Astória','Ozón','Alžbeta'].map(w => (
              <label key={w} className="row center gap-6 small"><input type="checkbox" defaultChecked/> {w}</label>
            ))}
          </div>
          <div className="col gap-6">
            <h4>{T('Kategória','Category')}</h4>
            {['Štandard','Štandard Park','Superior','Superior Spa','Apartmán Bardejov','Premium Spa'].map(c => (
              <label key={c} className="row center gap-6 small"><input type="checkbox" defaultChecked/> {c}</label>
            ))}
          </div>
          <div className="col gap-6">
            <h4>{T('Stav','Status')}</h4>
            <label className="row center gap-6 small"><input type="checkbox" defaultChecked/> <span className="resv a" style={{width:50}}>conf.</span></label>
            <label className="row center gap-6 small"><input type="checkbox" defaultChecked/> <span className="resv b" style={{width:50}}>ckin</span></label>
            <label className="row center gap-6 small"><input type="checkbox" defaultChecked/> <span className="resv held" style={{width:50}}>hold</span></label>
            <label className="row center gap-6 small"><input type="checkbox"/> <span className="resv f" style={{width:50}}>HK</span></label>
          </div>
          <div className="col gap-6">
            <h4>{T('Balík','Package')}</h4>
            {PACKAGES.map(p => <span key={p.id} className="pill" style={{borderColor:p.tone, color:p.tone}}>{p.id} · {p.name}</span>)}
          </div>
          <Note x={6} y={620} w={200}>Filter zostáva otvorený. V GUBI je skrytý v modále.</Note>
        </div>

        {/* Grid */}
        <div className="grow col" style={{minWidth:0,overflow:'hidden'}}>
          {/* day header */}
          <div className="row" style={{borderBottom:'1.2px solid var(--line)',background:'#fff'}}>
            <div style={{flex:'0 0 160px',padding:'8px 10px'}} className="upper xs muted">{T('Izba','Room')} · {T('Kategória','Cat.')}</div>
            <div className="row" style={{flex:1}}>
              {days.map((d,i)=>(
                <div key={i} className="col center" style={{flex:1, padding:'4px 0', borderLeft:'1px solid var(--line-soft)', background: i===today?'rgba(214,69,59,0.08)':'transparent'}}>
                  <div className="xs upper muted">{dayName[i]}</div>
                  <div className="num" style={{fontWeight:700, fontSize:13, color:i===today?'#D6453B':'inherit'}}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* rows */}
          <div className="col grow" style={{overflowY:'auto'}}>
            {rooms.map((rm,ri) => (
              <div key={ri} className="row" style={{borderBottom:'1px solid var(--line-soft)',minHeight:42}}>
                <div style={{flex:'0 0 160px',padding:'6px 10px',background:'#FBF9F4',borderRight:'1px solid var(--line-soft)'}}>
                  <div className="row center gap-4">
                    <span className="num" style={{fontWeight:700,fontSize:13}}>{rm.no}</span>
                    <span className="pill" style={{fontSize:9,padding:'1px 5px'}}>{rm.type}</span>
                    <Dot k="ok"/>
                  </div>
                  <div className="xs muted">{rm.cat} · {rm.wing}</div>
                </div>
                <div className="row" style={{flex:1,position:'relative'}}>
                  {days.map((d,i)=>(
                    <div key={i} style={{flex:1,borderLeft:'1px solid var(--line-soft)',background: i===today?'rgba(214,69,59,0.06)':'transparent'}}></div>
                  ))}
                  {/* reservation bars */}
                  {reservations.filter(r=>r.r===ri).map((res,ix)=>{
                    const left = `calc(${(res.s/14)*100}% + 2px)`;
                    const width = `calc(${(res.l/14)*100}% - 4px)`;
                    return (
                      <div key={ix} className={`resv ${res.k}`} style={{position:'absolute',left,width,top:'50%',transform:'translateY(-50%)',height:30,padding:'0 8px',cursor:'grab',border:'1px solid rgba(0,0,0,.15)'}}>
                        <span style={{fontWeight:700}}>{res.name}</span>
                        {res.pkg && <span className="pill" style={{padding:'1px 5px',fontSize:9,background:'rgba(255,255,255,.85)',color:'#0F1F4D',borderColor:'transparent'}}>{res.pkg}</span>}
                        {res.tag.slice(0,2).map((t,i)=> <span key={i} className="pill" style={{padding:'1px 5px',fontSize:9,background:'rgba(255,255,255,.85)',color:'#0F1F4D',borderColor:'transparent'}}>{t}</span>)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* footer legend + drag hint */}
          <div className="row gap-12 center pad-12" style={{borderTop:'1px solid var(--line-soft)',background:'#FBF9F4',fontSize:10}}>
            <span className="muted">{T('Drag pásu = zmena izby · ťahaním okraja = predĺženie pobytu','Drag = move · resize edge = extend stay')}</span>
            <span className="grow"></span>
            <div className="legend">
              <span><i style={{background:'#1B6FDB'}}></i>{T('Potvrdená','Confirmed')}</span>
              <span><i style={{background:'#0F1F4D'}}></i>Check-in</span>
              <span><i style={{background:'#7857C7'}}></i>{T('Skupina','Group')}</span>
              <span><i style={{background:'repeating-linear-gradient(45deg,#CFD3DE,#CFD3DE 3px,#E8EDF7 3px,#E8EDF7 6px)'}}></i>Hold</span>
              <span><i style={{background:'#E8B23A'}}></i>HK</span>
            </div>
          </div>
        </div>

        {/* Right inspector */}
        <div className="col gap-12 pad-12" style={{flex:'0 0 260px',borderLeft:'1px solid var(--line-soft)',background:'#FBF9F4',overflowY:'auto'}}>
          <div className="upper xs muted">{T('Vybraná rezervácia','Selected reservation')}</div>
          <div className="box r pad-12">
            <div className="row center gap-8" style={{marginBottom:6}}>
              <Avatar name="JN" tone="#1B6FDB"/>
              <div className="col" style={{lineHeight:1.15}}>
                <div style={{fontWeight:700}}>Ing. Jozef Novák</div>
                <div className="xs muted">+ 1 spol. · izba 201</div>
              </div>
            </div>
            <div className="row gap-4 wrap" style={{marginBottom:6}}>
              <Pill k="med">Dx VI/3 koxartróza</Pill>
              <Pill k="ok">VšZP</Pill>
              <Pill>D2</Pill>
            </div>
            <div className="small col gap-2">
              <div className="row between"><span className="muted">{T('Pobyt','Stay')}</span><span className="num">18.5. – 8.6. (21n)</span></div>
              <div className="row between"><span className="muted">{T('Balík','Package')}</span><span>KKL · klasická</span></div>
              <div className="row between"><span className="muted">{T('Cena','Total')}</span><span className="num"><b>2 940 €</b></span></div>
              <div className="row between"><span className="muted">{T('Zaplatené','Paid')}</span><span className="num">500 €</span></div>
            </div>
            <hr/>
            <div className="col gap-4">
              <button className="btn primary" style={{justifyContent:'center'}}>{T('Check-in','Check-in')}</button>
              <button className="btn" style={{justifyContent:'center'}}>{T('Otvoriť detail','Open detail')}</button>
              <button className="btn ghost" style={{justifyContent:'center'}}>{T('Presunúť izbu','Move room')}</button>
            </div>
          </div>

          <div className="box tint r pad-8 small">
            <div className="upper xs muted" style={{marginBottom:4}}>↗ {T('Naviazané v M5','Linked in M5')}</div>
            <div>Magnetoterapia · 9:00</div>
            <div>Slatinný zábal · 11:00</div>
            <div>Klasická masáž · 14:30</div>
            <div style={{marginTop:4}}><a className="small">{T('Otvoriť v M5 →','Open in M5 →')}</a></div>
          </div>
          <Note x={6} y={500} w={220} rot={2}>Inspector je vždy vidieť. V GUBI musíš otvoriť modál.</Note>
        </div>
      </div>
    </Screen>
  );
}

function GridWeeks(){
  // Weekly chunks — better for 21d kúpeľná liečba
  const weeks = ['T19 · 11.–17.5','T20 · 18.–24.5','T21 · 25.–31.5','T22 · 1.–7.6','T23 · 8.–14.6','T24 · 15.–21.6'];
  return (
    <Screen active="grid" wide title={T('Rezervácie · týždne','Reservations · weeks')}
      sub={T('Variant B · pre 7/14/21-dňové pobyty · prehľad obložnosti','Variant B · for 7/14/21-day stays · occupancy view')}
      actions={<><button className="btn primary">{T('Týždne','Weeks')}</button><button className="btn">{T('Mesiac','Month')}</button><button className="btn accent">+ {T('Nová','New')}</button></>}>
      <div className="col pad-16 gap-12" style={{height:'100%',overflow:'hidden'}}>
        {/* Week occupancy strip */}
        <div className="box r pad-12">
          <div className="row between center" style={{marginBottom:8}}>
            <h3>{T('Obsadenosť po týždňoch','Occupancy by week')}</h3>
            <span className="small muted">{T('192 izieb celkom','192 rooms total')}</span>
          </div>
          <div className="row gap-6">
            {weeks.map((w,i)=>{
              const v = [72,87,91,84,68,52][i];
              return (
                <div key={i} className="grow box r pad-8">
                  <div className="row between"><span className="xs muted">{w}</span><span className="num" style={{fontWeight:700}}>{v}%</span></div>
                  <div style={{height:8,background:'#E8EDF7',borderRadius:99,marginTop:6,overflow:'hidden'}}>
                    <div style={{width:v+'%',height:'100%',background: v>85?'#D6453B':v>75?'#E8B23A':'#1B6FDB'}}></div>
                  </div>
                  <div className="xs muted" style={{marginTop:4}}>{i===1?T('aktuálny','current'):''}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bus-style group bands */}
        <div className="box r grow col" style={{minHeight:0}}>
          <div className="row between center pad-12" style={{borderBottom:'1px solid var(--line-soft)'}}>
            <h3>{T('Skupinové bloky · 18.5 – 21.6','Group bands · May 18 – Jun 21')}</h3>
            <div className="row gap-4">
              <Pill k="ink">15 {T('skupín','groups')}</Pill>
              <Pill>3 {T('konflikty','conflicts')}</Pill>
            </div>
          </div>
          <div style={{position:'relative',flex:1,padding:'12px 16px',overflowY:'auto'}}>
            <div className="row" style={{borderBottom:'1px solid var(--line-soft)',paddingBottom:4,marginBottom:8}}>
              <div style={{flex:'0 0 200px'}} className="upper xs muted">{T('Skupina','Group')}</div>
              {weeks.map((w,i)=>(<div key={i} className="grow upper xs muted" style={{textAlign:'center'}}>{w.split('·')[0]}</div>))}
            </div>
            {[
              ['C-12 · VšZP poukazy · KKL','d',1,3,'32 os.','17 izieb · Astória'],
              ['D-04 · senior klub Levice','b',0,2,'24 os.','12 izieb · Ozón'],
              ['E-18 · Dôvera firemné','a',2,2,'16 os.','8 izieb · Alžbeta'],
              ['F-22 · NFZ-PL · seniors','d',3,3,'28 os.','14 izieb · Astória'],
              ['G-31 · samoplatci · relax','c',4,1,'12 os.','6 izieb · Ozón'],
              ['H-09 · zdravotná spol.','b',1,4,'42 os.','21 izieb · Astória + Alžbeta'],
              ['J-14 · Union poukazy','a',0,3,'18 os.','9 izieb · Alžbeta'],
            ].map((g,i)=>(
              <div key={i} className="row center" style={{minHeight:36,position:'relative',borderBottom:'1px dashed var(--line-soft)'}}>
                <div style={{flex:'0 0 200px'}} className="col">
                  <div className="row center gap-6">
                    <span style={{fontWeight:700,fontSize:11}}>{g[0]}</span>
                  </div>
                  <div className="xs muted">{g[4]} · {g[5]}</div>
                </div>
                <div className="row" style={{flex:1,position:'relative',height:28}}>
                  {weeks.map((_,j)=>(<div key={j} style={{flex:1,borderLeft:'1px solid var(--line-soft)'}}></div>))}
                  <div className={`resv ${g[1]}`} style={{position:'absolute',left:`${(g[2]/6)*100}%`,width:`${(g[3]/6)*100}%`,top:'50%',transform:'translateY(-50%)',height:22}}>
                    <span style={{fontWeight:700}}>{g[0].split('·')[0]}</span>
                    <span className="pill" style={{padding:'1px 5px',fontSize:9,background:'rgba(255,255,255,.85)',color:'#0F1F4D',borderColor:'transparent'}}>{g[4]}</span>
                  </div>
                </div>
              </div>
            ))}
            <Note x={'62%'} y={20} w={210}>Týždenný pohľad je IDEÁLNY pre kúpele — 21-dňový pobyt zaberie 3 stĺpce a vidíš ho celý naraz.</Note>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function GridToday(){
  const rooms = ROOMS;
  return (
    <Screen active="grid" wide title={T('Rezervácie · pivot okolo dneška','Reservations · today pivot')}
      sub={T('Variant C · ±3 dni · zameranie na dnešné akcie','Variant C · ±3 days · focus on today')}
      actions={<><button className="btn">{T('Týždeň','Week')}</button><button className="btn primary">{T('Dnes','Today')}</button><button className="btn accent">+ {T('Nová','New')}</button></>}>
      <div className="row" style={{height:'100%'}}>
        {/* Compact left rail */}
        <div className="col pad-12 gap-8" style={{flex:'0 0 180px',background:'#FBF9F4',borderRight:'1px solid var(--line-soft)'}}>
          <h4>{T('Rýchle akcie','Quick actions')}</h4>
          <button className="btn primary" style={{justifyContent:'center'}}>+ {T('Walk-in','Walk-in')}</button>
          <button className="btn" style={{justifyContent:'center'}}>{T('Skupina','Group')}</button>
          <button className="btn" style={{justifyContent:'center'}}>{T('Blokovať izbu','Block room')}</button>
          <hr/>
          <h4>{T('Skok na dátum','Jump to date')}</h4>
          <input className="box r" type="date" style={{padding:'4px 6px',fontSize:11}} defaultValue="2026-05-21"/>
          <hr/>
          <h4>{T('Dnešný počet','Today count')}</h4>
          <div className="num small"><b>Arrivals</b> 18</div>
          <div className="num small"><b>Departures</b> 11</div>
          <div className="num small"><b>Stayovers</b> 139</div>
          <div className="num small"><b>HK pending</b> 8</div>
        </div>

        {/* Main: 3 columns - yesterday, today, tomorrow */}
        <div className="grow col" style={{minWidth:0,overflow:'hidden'}}>
          <div className="row" style={{borderBottom:'1.2px solid var(--line)',background:'#fff'}}>
            <div style={{flex:'0 0 130px',padding:'8px 10px'}} className="upper xs muted">{T('Izba','Room')}</div>
            {[
              { l:T('-3 → -1','-3 → -1'), sub:T('Včera a skôr','Earlier'), col:'#FBF9F4' },
              { l:T('DNES','TODAY'),    sub:'21. máj · pi', col:'rgba(214,69,59,0.08)', bold:true },
              { l:T('+1 → +3','+1 → +3'),sub:T('Zajtra a po','Soon'), col:'#FBF9F4' },
            ].map((c,i)=>(
              <div key={i} className="grow col center" style={{padding:'4px 0',background:c.col,borderLeft:'1px solid var(--line-soft)'}}>
                <div className="upper xs muted">{c.sub}</div>
                <div className={c.bold?'hand':''} style={{fontWeight:700,fontSize:c.bold?16:13, color:c.bold?'#D6453B':'inherit'}}>{c.l}</div>
              </div>
            ))}
          </div>
          <div className="col grow" style={{overflowY:'auto'}}>
            {rooms.map((rm,ri)=>{
              // generate random-ish states
              const past = ['stay','stay','out','—','arrive','stay','stay','stay','—','—','out','stay'][ri%12];
              const today = ['stay','stay','stay','arrive','arrive','stay','group','group','HK','stay','stay','arrive'][ri%12];
              const fut = ['stay','stay','arrive','stay','stay','stay','group','group','stay','—','arrive','stay'][ri%12];
              const cell = (k) => {
                if(k==='—') return <span className="muted xs">·</span>;
                if(k==='HK') return <span className="resv f" style={{minWidth:50,fontSize:10}}>HK</span>;
                if(k==='group') return <span className="resv d" style={{minWidth:80,fontSize:10}}>Skup. C-12</span>;
                if(k==='out') return <span className="resv b" style={{minWidth:80,fontSize:10}}>↗ check-out</span>;
                if(k==='arrive') return <span className="resv a" style={{minWidth:80,fontSize:10}}>↘ check-in</span>;
                if(k==='stay') return <span className="resv b" style={{minWidth:80,fontSize:10,opacity:.8}}>obsadená</span>;
              };
              return (
                <div key={ri} className="row" style={{borderBottom:'1px solid var(--line-soft)',minHeight:40}}>
                  <div style={{flex:'0 0 130px',padding:'6px 10px',background:'#FBF9F4',borderRight:'1px solid var(--line-soft)'}}>
                    <div className="num" style={{fontWeight:700,fontSize:13}}>{rm.no}</div>
                    <div className="xs muted">{rm.cat}</div>
                  </div>
                  <div className="grow row center" style={{padding:'0 8px',background:'#FBF9F4'}}>{cell(past)}</div>
                  <div className="grow row center" style={{padding:'0 8px',background:'rgba(214,69,59,0.06)',borderLeft:'1px solid var(--line-soft)'}}>{cell(today)}</div>
                  <div className="grow row center" style={{padding:'0 8px',borderLeft:'1px solid var(--line-soft)'}}>{cell(fut)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right preview */}
        <div className="col pad-12 gap-8" style={{flex:'0 0 280px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Hover preview','Hover preview')}</h4>
          <div className="box r pad-12">
            <div className="row center gap-6"><Avatar name="JN" tone="#1B6FDB" md/><div><b>Ing. Jozef Novák</b><div className="xs muted">izba 203</div></div></div>
            <div className="row gap-4 wrap" style={{marginTop:6}}><Pill k="med">Dx VI/3</Pill><Pill k="ok">VšZP</Pill></div>
            <hr/>
            <div className="small">{T('Pobyt','Stay')}: <b className="num">18.5 – 8.6 (21n)</b></div>
            <div className="small">{T('Balík','Pkg')}: <b>KKL</b></div>
            <div className="small">{T('Procedúry dnes','Procs today')}: <b>3</b></div>
            <hr/>
            <button className="btn primary" style={{width:'100%',justifyContent:'center'}}>{T('Otvoriť detail','Open detail')}</button>
          </div>
          <Note x={6} y={460} w={240}>Variant C: 3 stĺpce dáta, hover pravo. Menej miesta na pásy, viac na dnešok.</Note>
        </div>
      </div>
    </Screen>
  );
}

window.GridClassic = GridClassic;
window.GridWeeks = GridWeeks;
window.GridToday = GridToday;
