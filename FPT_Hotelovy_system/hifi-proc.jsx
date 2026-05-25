/* ── Hi-Fi · Procedures · M5 integration view ───────────────── */

function HFProc(){
  const nav = useNav();
  const days = Array.from({length:21}).map((_,i)=>i+1);
  const slots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

  function cell(d, s){
    const map = {
      1:{0:'MGT',2:'KMS'},
      2:{0:'M4',3:'MGT',5:'SLZ'},
      3:{0:'MGT',2:'INH',4:'PKK',7:'HMS'},
      4:{0:'KMS',3:'MGT',6:'SLZ'},
      5:{0:'MGT',2:'INH',5:'HMS'},
      7:{2:'PKK'},
      8:{0:'MGT',3:'KMS',5:'INH',7:'SLZ'},
      9:{0:'MGT',2:'HMS',4:'INH'},
      10:{0:'KMS',3:'MGT',5:'SLZ'},
      11:{0:'INH',3:'MGT',6:'KMS'},
      13:{2:'PKK'},
      14:{0:'MGT',2:'KMS',4:'INH'},
      15:{0:'MGT',3:'SLZ'},
      16:{0:'KMS',2:'INH',5:'MGT'},
      17:{0:'MGT',3:'HMS',6:'KMS'},
      18:{0:'INH',2:'MGT',5:'SLZ'},
      20:{0:'MGT',4:'M4'},
      21:{0:'MGT'},
    };
    return map[d] && map[d][s];
  }
  const colors = {
    MGT:'#2E5BFF', KMS:'#7857C7', INH:'#5DD3E8', SLZ:'#E8930B',
    HMS:'#2FA76E', PKK:'#DA3B33', M4:'#7857C7'
  };
  const labels = {
    MGT:'Magnetoterapia',KMS:'Klasická masáž',INH:'Inhalácia',SLZ:'Slatinný zábal',
    HMS:'Hydromasáž',PKK:'Pitná kúra',M4:'M4 prehliadka'
  };
  const TODAY = 3;

  return (
    <HFScreen
      active="proc"
      title={Tr('Procedúry hosťa · Ing. Novák','Guest procedures · Novák')}
      sub={Tr('Plánuje M5 / lekár · recepčný vidí kontext a auto-konflikty po check-oute','Planned by M5 / doctor · receptionist sees context & auto-conflicts after C/O')}
      actions={<>
        <button className="btn"><Icon n="print" size={14}/> {Tr('Tlač harmonogramu','Print schedule')}</button>
        <button className="btn" onClick={()=>nav.toast(Tr('SMS s plánom odoslaná hosťovi','SMS schedule sent'))}><Icon n="chat" size={14}/> {Tr('Pošli hosťovi','Send to guest')}</button>
        <button className="btn accent" onClick={()=>nav.toast(Tr('Modul M5 — mimo rozsah prototypu','Module M5 — out of scope'))}>{Tr('Otvoriť v M5','Open in M5')} →</button>
      </>}>

      <div className="col gap-16" style={{height:'100%'}}>
        {/* AUTO-CONFLICT banner (top of screen, high-prominence) */}
        <div className="card" style={{borderLeft:'6px solid var(--bad)',
          background:'linear-gradient(90deg,#FBE2DF 0%,#FFF6F4 60%,#fff 100%)',
          boxShadow:'0 8px 24px rgba(218,59,51,0.18)'}}>
          <div className="row gap-16 center pad-16">
            <div style={{flex:'0 0 56px',width:56,height:56,borderRadius:14,background:'var(--bad)',color:'#fff',
              display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 12px rgba(218,59,51,.35)'}}>
              <Icon n="warn" size={28}/>
            </div>
            <div className="col" style={{lineHeight:1.25,flex:1,minWidth:0}}>
              <div className="row center gap-8">
                <span className="pill bad lg" style={{fontWeight:800,letterSpacing:'.05em',fontSize:11}}>AUTO-KONFLIKT</span>
                <span className="xs muted">{Tr('detegovaný pred 2 min · modul M5 ↔ pobyt','detected 2 min ago · M5 ↔ stay')}</span>
              </div>
              <h2 style={{fontSize:18,marginTop:4,color:'var(--bad)'}}>
                {Tr('25. 5. · Procedúry naplanované až po check-oute hosťa','May 25 · Procedures scheduled after guest check-out')}
              </h2>
              <div className="small" style={{marginTop:4}}>
                {Tr('Slatinný zábal 11:00 a Magnetoterapia 13:00 — odchod hosťa o 10:00. Notifikácia prišla z M5 — vyžaduje riešenie pred uzavretím pobytu.','Wrap 11:00 & Magnet 13:00 — guest leaves 10:00. Notification from M5 — must resolve before closing the stay.')}
              </div>
            </div>
            <div className="col gap-6" style={{flex:'0 0 auto'}}>
              <button className="btn primary" onClick={()=>{nav.toast(Tr('✓ Pobyt predĺžený o 1 noc · +89 €','✓ Stay extended +1 night · +€89')); nav.go('grid');}}>
                {Tr('Predĺžiť +1 noc · 89 €','Extend +1 night · €89')}
              </button>
              <div className="row gap-6">
                <button className="btn sm">{Tr('Skoršie procedúry','Earlier procs')}</button>
                <button className="btn sm">{Tr('Late C/O · 25 €','Late C/O · €25')}</button>
              </div>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div className="row gap-12">
          {[
            { l:Tr('NAPLÁNOVANÝCH','PLANNED'),    v:'63',   sub:Tr('21 d × 3','21d × 3'),  c:'var(--blue)' },
            { l:Tr('ABSOLVOVANÝCH','COMPLETED'),  v:'6',    sub:'~ 10%',                 c:'var(--ok)' },
            { l:Tr('DNES · D3','TODAY · D3'),     v:'3',    sub:'11:00 · 13:00 · 14:30',  c:'var(--cyan)' },
            { l:Tr('ZMENY POSL. 24H','CHANGES 24H'),v:'3',  sub:Tr('2 presunuté','2 moved'),c:'var(--warn)' },
            { l:Tr('KONFLIKTY','CONFLICTS'),       v:'1',   sub:Tr('check-out vs M5','C/O vs M5'),c:'var(--bad)' },
          ].map((k,i)=>(
            <div key={i} className="card pad-14 grow" style={{borderTop:`3px solid ${k.c}`}}>
              <div className="eyebrow">{k.l}</div>
              <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:28,letterSpacing:'-0.02em',marginTop:6}} className="num">{k.v}</div>
              <div className="muted xs">{k.sub}</div>
            </div>
          ))}
        </div>

        <div className="row gap-16 grow" style={{minHeight:0}}>
          {/* Big schedule */}
          <div className="card grow col" style={{minWidth:0,overflow:'hidden'}}>
            <div className="pad-16 row between center" style={{borderBottom:'1px solid var(--line)'}}>
              <div className="col" style={{lineHeight:1.2}}>
                <div className="eyebrow">{Tr('HARMONOGRAM 21 DNÍ × 9 ČASOV','SCHEDULE 21d × 9 SLOTS')}</div>
                <h3>{Tr('Celý pobyt naraz','Whole stay at once')}</h3>
              </div>
              <div className="row gap-6">
                {Object.entries(colors).map(([k,c])=>(
                  <span key={k} className="row gap-4 center" style={{padding:'3px 8px',background:'#fff',border:`1px solid ${c}`,borderRadius:99}}>
                    <span style={{width:8,height:8,background:c,borderRadius:99}}/>
                    <span style={{fontSize:10.5,fontWeight:700,color:c,fontFamily:'JetBrains Mono'}}>{k}</span>
                  </span>
                ))}
              </div>
            </div>
            {/* day header */}
            <div className="row" style={{borderBottom:'1px solid var(--line)',background:'var(--bg)'}}>
              <div style={{flex:'0 0 60px',padding:'8px 10px'}} className="eyebrow">{Tr('Čas','Time')}</div>
              {days.map(d=>(
                <div key={d} className="num xs" style={{flex:1,padding:'8px 0',textAlign:'center',fontWeight:700,
                  color: d===TODAY?'var(--bad)':'var(--ink-3)',
                  background: d===TODAY?'rgba(218,59,51,0.06)':'transparent',
                  borderLeft:'1px solid var(--line)'}}>D{d}</div>
              ))}
            </div>
            <div className="col grow" style={{overflowY:'auto'}}>
              {slots.map((sl,si)=>(
                <div key={si} className="row" style={{borderBottom:'1px solid var(--line)',minHeight:38,background:'#fff'}}>
                  <div style={{flex:'0 0 60px',padding:'8px 10px',background:'var(--bg)',borderRight:'1px solid var(--line)'}}
                    className="num xs muted">{sl}</div>
                  {days.map(d=>{
                    const v = cell(d,si);
                    return (
                      <div key={d} style={{flex:1,padding:3,borderLeft:'1px solid var(--line)',
                        background: d===TODAY?'rgba(218,59,51,0.04)':'transparent'}}>
                        {v && (
                          <div title={labels[v]} style={{background:colors[v],color: v==='INH'?'#0E3640':'#fff',
                            padding:'4px 5px',borderRadius:5,fontSize:9.5,fontWeight:700,
                            display:'flex',alignItems:'center',justifyContent:'center',height:28,fontFamily:'JetBrains Mono',
                            letterSpacing:'.02em',boxShadow:'inset 0 -2px 0 rgba(0,0,0,0.10)'}}>{v}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Right: today + changes */}
          <div className="col gap-12" style={{flex:'0 0 320px'}}>
            <div className="card col">
              <CardHeader eyebrow={Tr('DNES · D3','TODAY · D3')} title={Tr('3 procedúry · 23. máj','3 procedures · May 23')}/>
              <div className="col gap-6 pad-12">
                {[
                  ['11:00','MGT','Magnetoterapia','ord. 14','done'],
                  ['13:00','PKK','Pitná kúra','prameň Alžbeta','now'],
                  ['14:30','INH','Inhalácia','INH-2','planned'],
                ].map((p,i)=>(
                  <div key={i} className="panel pad-12" style={{borderLeft:`3px solid ${colors[p[1]]}`,position:'relative'}}>
                    <div className="row between center">
                      <div className="row center gap-8">
                        <div className="num" style={{fontWeight:700,fontSize:14}}>{p[0]}</div>
                        <span className="pill" style={{background:colors[p[1]],color: p[1]==='INH'?'#0E3640':'#fff',fontFamily:'JetBrains Mono',fontSize:10}}>{p[1]}</span>
                      </div>
                      {p[4]==='done' && <P k="ok">✓</P>}
                      {p[4]==='now' && <P k="blue">{Tr('teraz','now')}</P>}
                      {p[4]==='planned' && <P>{Tr('plánované','planned')}</P>}
                    </div>
                    <div style={{marginTop:6,fontSize:12.5,fontWeight:600}}>{p[2]}</div>
                    <div className="muted xs">{p[3]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact conflict alert (links to banner) */}
            <div className="card pad-14" style={{borderLeft:'4px solid var(--bad)',background:'var(--bad-soft)'}}>
              <div className="row gap-10 center">
                <Icon n="warn" size={18} c="#DA3B33"/>
                <div className="col" style={{lineHeight:1.25,flex:1}}>
                  <div className="eyebrow" style={{color:'var(--bad)'}}>{Tr('AUTO-KONFLIKT · 1 OTVORENÝ','AUTO-CONFLICT · 1 OPEN')}</div>
                  <div className="xs" style={{color:'#7A1F1A',marginTop:2}}>{Tr('Viď banner hore — vyžaduje rozhodnutie','See banner above — needs decision')}</div>
                </div>
              </div>
            </div>

            {/* M5 changes */}
            <div className="card pad-14 col gap-8">
              <div className="eyebrow">{Tr('ZMENY OD M5','M5 CHANGES')}</div>
              <div className="col gap-6 small">
                <div className="panel pad-8" style={{borderLeft:'3px solid var(--warn)'}}>
                  <b>↻ Magnetoterapia</b>
                  <div className="xs muted">10:00 → 11:00 · {Tr('konflikt s M4 prehliadkou','M4 conflict')}</div>
                </div>
                <div className="panel pad-8" style={{borderLeft:'3px solid var(--warn)'}}>
                  <b>↻ Slatinný zábal</b>
                  <div className="xs muted">{Tr('zrušené 22. 5. · hosť unavený','cancelled May 22 · guest tired')}</div>
                </div>
                <div className="panel pad-8" style={{borderLeft:'3px solid var(--blue)'}}>
                  <b>+ Hydromasáž</b>
                  <div className="xs muted">{Tr('pridaná D7 · doplnková','added D7 · supplementary')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HFScreen>
  );
}
window.HFProc = HFProc;
