/* ── Procedures & medical (M5/M4 integration views) ───────────── */

function ProcSchedule(){
  // For a guest, show the daily proc schedule across the stay
  const days = Array.from({length:21}).map((_,i)=>i+1);
  const slots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

  // each cell: code or empty
  function cell(d, s){
    const map = {
      1:{0:'MGT',2:'KMS'},
      2:{0:'M4',3:'MGT',5:'SLZ'},
      3:{0:'MGT',2:'INH',4:'PKK',7:'HMS'},
      4:{0:'KMS',3:'MGT',6:'SLZ'},
      5:{0:'MGT',2:'INH',5:'HMS'},
      6:{},  // weekend - lighter
      7:{2:'PKK'},
      8:{0:'MGT',3:'KMS',5:'INH',7:'SLZ'},
      9:{0:'MGT',2:'HMS',4:'INH'},
      10:{0:'KMS',3:'MGT',5:'SLZ'},
      11:{0:'INH',3:'MGT',6:'KMS'},
      12:{},
      13:{2:'PKK'},
      14:{0:'MGT',2:'KMS',4:'INH'},
      15:{0:'MGT',3:'SLZ'},
      16:{0:'KMS',2:'INH',5:'MGT'},
      17:{0:'MGT',3:'HMS',6:'KMS'},
      18:{0:'INH',2:'MGT',5:'SLZ'},
      19:{},
      20:{0:'MGT',4:'M4-out'},
      21:{0:'MGT'},
    };
    return map[d] && map[d][s];
  }
  const colors = {
    MGT:'#1B6FDB', KMS:'#7857C7', INH:'#5DD3E8', SLZ:'#E8B23A',
    HMS:'#2FA76E', PKK:'#D6453B', 'M4':'#7857C7', 'M4-out':'#7857C7'
  };
  const labels = {
    MGT:'Magnetoterapia',KMS:'Klasická masáž',INH:'Inhalácia',SLZ:'Slatinný zábal',
    HMS:'Hydromasáž',PKK:'Pitná kúra',M4:'M4 · vstup. prehl.','M4-out':'M4 · výstup. prehl.'
  };

  return (
    <Screen active="proc" wide title={T('Procedúry hosťa · Novák','Guest procedures · Novák')}
      sub={T('Pohľad recepčného z M5 · plánovať môže iba M5/lekár · ja vidím konflikty','Receptionist view of M5 · only M5/doctor can plan')}
      actions={<><button className="btn">{T('Tlač harmonogramu','Print schedule')}</button><button className="btn primary">{T('Otvoriť v M5 →','Open in M5 →')}</button></>}>
      <div className="row" style={{height:'100%'}}>
        <div className="col grow pad-16 gap-12" style={{overflow:'hidden'}}>
          {/* Stat */}
          <div className="row gap-12">
            <div className="box r pad-12 grow"><div className="upper xs muted">{T('Naplánovaných','Planned')}</div><div className="num" style={{fontSize:24,fontWeight:800}}>63</div></div>
            <div className="box r pad-12 grow"><div className="upper xs muted">{T('Absolvovaných','Completed')}</div><div className="num" style={{fontSize:24,fontWeight:800,color:'#2FA76E'}}>6</div><div className="xs muted">~10%</div></div>
            <div className="box r pad-12 grow"><div className="upper xs muted">{T('Zmeny posl. 24h','Changes 24h')}</div><div className="num" style={{fontSize:24,fontWeight:800,color:'#E8B23A'}}>3</div><div className="xs muted">2 presunuté</div></div>
            <div className="box r pad-12 grow"><div className="upper xs muted">{T('Konflikty','Conflicts')}</div><div className="num" style={{fontSize:24,fontWeight:800,color:'#D6453B'}}>1</div><div className="xs muted">{T('check-out vs M4','check-out vs M4')}</div></div>
            <div className="box r pad-12 grow"><div className="upper xs muted">{T('Dnes · D3','Today · D3')}</div><div className="num" style={{fontSize:24,fontWeight:800}}>3</div><div className="xs muted">11:00 · 13:00 · 14:30</div></div>
          </div>

          {/* Schedule grid */}
          <div className="box r col grow" style={{minHeight:0,overflow:'hidden'}}>
            <div className="row pad-12 between center" style={{borderBottom:'1px solid var(--line-soft)'}}>
              <h3>{T('Harmonogram · 21 dní × 9 časov','Schedule · 21 days × 9 slots')}</h3>
              <div className="row gap-6">
                {Object.entries(colors).map(([k,c])=>(
                  <span key={k} className="pill" style={{borderColor:c,color:c}}>{k}</span>
                ))}
              </div>
            </div>
            <div className="row" style={{borderBottom:'1px solid var(--line-soft)',background:'#FBF9F4'}}>
              <div style={{flex:'0 0 60px',padding:'4px 8px'}} className="xs upper muted">{T('Čas','Time')}</div>
              {days.map(d=>(
                <div key={d} className="grow xs" style={{textAlign:'center',padding:'4px 0',borderLeft:'1px solid var(--line-soft)',fontWeight:700, color: d===3?'#D6453B':'inherit'}}>D{d}</div>
              ))}
            </div>
            <div className="col grow" style={{overflowY:'auto'}}>
              {slots.map((sl,si)=>(
                <div key={si} className="row" style={{borderBottom:'1px solid var(--line-soft)',minHeight:34}}>
                  <div style={{flex:'0 0 60px',padding:'4px 8px',background:'#FBF9F4',borderRight:'1px solid var(--line-soft)'}} className="num xs">{sl}</div>
                  {days.map(d=>{
                    const v = cell(d,si);
                    return (
                      <div key={d} className="grow" style={{borderLeft:'1px solid var(--line-soft)',padding:2,minHeight:32,background: d===3?'rgba(214,69,59,0.05)':'transparent'}}>
                        {v && (
                          <div className="row center" style={{background:colors[v],borderRadius:3,padding:'2px 4px',color: v==='INH'?'#0F1F4D':'#fff',fontSize:9,fontWeight:700,height:24}} title={labels[v]}>{v}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <Note x={20} y={620} w={240} rot={-2}>Recepčný len pozerá, ale vidí to isté, čo M5. Žiadne prepínanie modulov.</Note>
        </div>

        <div className="col pad-16 gap-12" style={{flex:'0 0 300px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Dnes · 23. 5. (D3)','Today · May 23 (D3)')}</h4>
          <div className="col gap-6">
            {[
              ['11:00','MGT','Magnetoterapia · ord. 14',true],
              ['13:00','PKK','Pitná kúra · prameň Alžbeta',false],
              ['14:30','INH','Inhalácia · INH-2',false],
            ].map((p,i)=>(
              <div key={i} className="box r pad-8 small">
                <div className="row between center">
                  <div className="row center gap-6">
                    <span className="num" style={{fontWeight:700}}>{p[0]}</span>
                    <div style={{width:8,height:18,background:colors[p[1]],borderRadius:2}}></div>
                    <b>{p[2]}</b>
                  </div>
                  {p[3] ? <Pill k="ok">✓</Pill> : <Pill>plán.</Pill>}
                </div>
              </div>
            ))}
          </div>
          <hr/>
          <h4>{T('Zmeny od M5','Changes from M5')}</h4>
          <div className="col gap-4 small">
            <div className="box r pad-8" style={{borderColor:'#E8B23A'}}><b>↻ Magnetoterapia</b><div className="xs">10:00 → 11:00 · {T('konflikt s M4','M4 conflict')}</div></div>
            <div className="box r pad-8" style={{borderColor:'#E8B23A'}}><b>↻ Slatinný zábal</b><div className="xs">{T('zrušené 22. 5. — hosť unavený','cancelled May 22 — guest tired')}</div></div>
          </div>
          <h4>{T('Pošli hosťovi','Send to guest')}</h4>
          <button className="btn">📲 SMS · {T('zajtra plán','tomorrow plan')}</button>
          <button className="btn">✉ Email · {T('PDF týždeň','PDF week')}</button>
        </div>
      </div>
    </Screen>
  );
}

function ProcConflict(){
  return (
    <Screen active="proc" wide title={T('Konflikt · check-out vs. procedúra','Conflict · check-out vs. procedure')} sub={T('Hostia majú radi posledný deň ako voľný — M5 to nemusí vedieť','Guests want last day free — M5 may not know')}>
      <div className="col pad-16 gap-16" style={{height:'100%',overflow:'auto'}}>
        <div className="box r pad-16" style={{borderColor:'#D6453B',background:'#FBE2DC'}}>
          <div className="row between center">
            <div className="row center gap-12">
              <div className="hand" style={{fontSize:36,color:'#D6453B'}}>⚠</div>
              <div>
                <h2 style={{color:'#6F1C18'}}>{T('Konflikt zistený','Conflict detected')}</h2>
                <div className="small">{T('Hosť: Sopková Helena · Izba 205 · check-out 25. 5. · 10:00','Guest: Sopková · Room 205 · check-out May 25 · 10am')}</div>
              </div>
            </div>
            <div className="row gap-8">
              <button className="btn">{T('Ignorovať','Ignore')}</button>
              <button className="btn primary">{T('Riešiť','Resolve')}</button>
            </div>
          </div>
        </div>

        <div className="row gap-12">
          <div className="box r pad-12 grow">
            <div className="upper xs muted">{T('Konflikt 1','Conflict 1')}</div>
            <h3 style={{marginTop:4}}>{T('Procedúra po check-oute','Procedure after check-out')}</h3>
            <div className="col gap-4 small" style={{marginTop:8}}>
              <div className="row gap-6 center"><Dot k="bad"/><span><b>25. 5. · 11:00</b> · Slatinný zábal · 45 min</span></div>
              <div className="row gap-6 center"><Dot k="bad"/><span><b>25. 5. · 13:00</b> · Magnetoterapia · 20 min</span></div>
              <div className="muted">{T('Hosť odovzdá izbu 10:00 a má ďalšie 2 procedúry','Guest hands room at 10am, has 2 more procedures')}</div>
            </div>
            <hr/>
            <h4 style={{marginBottom:6}}>{T('Riešenia','Solutions')}</h4>
            <div className="col gap-4">
              <button className="btn primary">{T('Predĺžiť pobyt o noc · 89 €','Extend +1 night · €89')}</button>
              <button className="btn">{T('Presunúť procedúry skôr · M5','Move earlier · ask M5')}</button>
              <button className="btn">{T('Late check-out do 16:00 · 25 €','Late check-out till 4pm · €25')}</button>
              <button className="btn">{T('Zrušiť posledné 2 procedúry','Cancel last 2')}</button>
            </div>
          </div>

          <div className="box r pad-12 grow">
            <div className="upper xs muted">{T('Konflikt 2','Conflict 2')}</div>
            <h3 style={{marginTop:4}}>{T('Skupinový bus odchod 9:00','Bus departure 9am')}</h3>
            <div className="col gap-4 small" style={{marginTop:8}}>
              <div className="row gap-6 center"><Dot k="warn"/><span><b>15. 6. · 09:00</b> · Bus C-12 odchod</span></div>
              <div className="row gap-6 center"><Dot k="bad"/><span>5 členov skupiny má 10:00 procedúru</span></div>
            </div>
            <hr/>
            <h4 style={{marginBottom:6}}>{T('Riešenia','Solutions')}</h4>
            <div className="col gap-4">
              <button className="btn primary">{T('Posunúť odchod busu na 13:00','Move bus to 1pm')}</button>
              <button className="btn">{T('Skoršie procedúry 7:00','Earlier procs 7am')}</button>
              <button className="btn">{T('Informovať vodcu skupiny','Notify group leader')}</button>
            </div>
          </div>
        </div>

        <div className="box r pad-12">
          <div className="row between center">
            <h3>{T('Posledných 7 dní · konflikty','Last 7 days · conflicts')}</h3>
            <span className="muted small">{T('Vyriešené: 12 · čakajú: 3 · ignorované: 1','Resolved 12 · pending 3 · ignored 1')}</span>
          </div>
          <table className="tbl" style={{marginTop:8}}>
            <thead><tr><th>{T('Dátum','Date')}</th><th>{T('Hosť','Guest')}</th><th>{T('Typ konfliktu','Type')}</th><th>{T('Vyriešenie','Resolution')}</th><th>{T('Recepčný','Agent')}</th><th></th></tr></thead>
            <tbody>
              {[
                ['25. 5.','Sopková H.','Procedúry po C/O','—','—','warn'],
                ['15. 6.','Skup. C-12','Bus odchod vs M5','—','—','warn'],
                ['28. 5.','Varga L.','Diéta vs. procedúra inhal.','Posunutie +30 min','M.S.','ok'],
                ['20. 5.','Pavlíková A.','Alergia vs. balneo','Zmena na suchú procedúru','Jana','ok'],
                ['18. 5.','Hudák P.','Lekár dovolenka','Náhradný lekár','Jana','ok'],
              ].map((r,i)=>(
                <tr key={i}>
                  <td className="num">{r[0]}</td>
                  <td><b>{r[1]}</b></td>
                  <td>{r[2]}</td>
                  <td>{r[3]}</td>
                  <td>{r[4]}</td>
                  <td>{r[5]==='warn'?<Pill k="warn">{T('rieš.','open')}</Pill>:<Pill k="ok">✓</Pill>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note x={20} y={620} w={250} rot={-1.5}>Toto je rozdiel medzi „normálnym hotelom" a kúpeľmi. M5 a M2 si musia rozumieť.</Note>
      </div>
    </Screen>
  );
}

window.ProcSchedule = ProcSchedule;
window.ProcConflict = ProcConflict;
