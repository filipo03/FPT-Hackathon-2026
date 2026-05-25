/* ── Hi-Fi · Guest / patient detail ─────────────────────────── */

function HFGuest(){
  const nav = useNav();
  return (
    <HFScreen
      active="guests"
      title={Tr('Detail hosťa','Guest detail')}
      sub={Tr('Profil hosťa · operácie front office (bez lékarských detailov)','Guest profile · front-office operations (no clinical detail)')}
      actions={<>
        <button className="btn" onClick={()=>nav.go('grid')}>{Tr('Otvoriť aktuálnu rezerváciu','Open current reservation')}</button>
        <button className="btn accent" onClick={()=>nav.go('newres')}><Icon n="plus" size={14}/> {Tr('Nová rezervácia','New reservation')}</button>
      </>}
      padContent={false}>

      <div style={{height:'100%',background:'var(--bg)',overflowY:'auto'}}>
        {/* Hero */}
        <div style={{background:'linear-gradient(135deg,#0F1F4D 0%,#061230 100%)',color:'#fff',padding:'28px 28px 24px',position:'relative',overflow:'hidden'}}>
          <svg width="400" height="200" style={{position:'absolute',top:-40,right:-60,opacity:0.10}}>
            <circle cx="200" cy="100" r="160" fill="none" stroke="#fff" strokeWidth="32"/>
            <circle cx="250" cy="80" r="100" fill="none" stroke="#5DD3E8" strokeWidth="20"/>
          </svg>
          <div className="row gap-20 center" style={{position:'relative',zIndex:1}}>
            <Av name="JN" sz="xl" tone="linear-gradient(135deg,#5DD3E8,#2E5BFF)"/>
            <div className="col" style={{lineHeight:1.25}}>
              <div className="row center gap-10">
                <h1 style={{color:'#fff',fontSize:32}}>Ing. Jozef Novák</h1>
                <span className="pill" style={{background:'#fff',color:'#0F1F4D'}}><Icon n="star" size={11}/> VIP · Gold</span>
              </div>
              <div style={{color:'rgba(255,255,255,0.78)',fontSize:13,marginTop:6}}>
                SK · *15. 4. 1957 (68 r.) · ID 8042 · klient od 2014
              </div>
              <div className="row gap-6 wrap" style={{marginTop:10}}>
                <span className="pill ok">VšZP</span>
                <span className="pill" style={{background:'rgba(255,255,255,0.15)',color:'#fff'}}>D2 · bez orechov</span>
                <span className="pill" style={{background:'rgba(255,255,255,0.15)',color:'#fff'}}>Bezbariér. nie</span>
                <span className="pill" style={{background:'rgba(255,255,255,0.15)',color:'#fff'}}><Icon n="medical" size={11}/> {Tr('Zdrav. údaje v M4 (mimo Front Office)','Health data in M4 (out of Front Office)')}</span>
              </div>
            </div>
            <div className="grow"/>
            <div className="col gap-12" style={{textAlign:'right'}}>
              <div className="col" style={{lineHeight:1.2}}>
                <div className="eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>{Tr('AKTUÁLNY POBYT','CURRENT STAY')}</div>
                <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:700,fontSize:18}}>21. 5. – 11. 6. 2026</div>
                <div style={{color:'rgba(255,255,255,0.78)',fontSize:12}}>D3 · KKL · izba 203 · spol. manželka</div>
              </div>
              <div className="row gap-12" style={{justifyContent:'flex-end'}}>
                <div className="col" style={{textAlign:'right'}}><div className="eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>Pobytov</div><div style={{fontFamily:'Plus Jakarta Sans',fontSize:20,fontWeight:800}} className="num">8</div></div>
                <div className="col" style={{textAlign:'right'}}><div className="eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>Nocí celkom</div><div style={{fontFamily:'Plus Jakarta Sans',fontSize:20,fontWeight:800}} className="num">138</div></div>
                <div className="col" style={{textAlign:'right'}}><div className="eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>Tržba</div><div style={{fontFamily:'Plus Jakarta Sans',fontSize:20,fontWeight:800}} className="num">18 240 €</div></div>
                <div className="col" style={{textAlign:'right'}}><div className="eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>Loyalty pts</div><div style={{fontFamily:'Plus Jakarta Sans',fontSize:20,fontWeight:800,color:'#5DD3E8'}} className="num">2 480</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {[
            [Tr('Profil','Profile'),true,null],
            [Tr('História pobytov','Stay history'),false,'8'],
            [Tr('Dokumenty','Documents'),false,'4'],
            [Tr('Faktúry','Invoices'),false,'12'],
            [Tr('Komunikácia','Comms'),false,null],
            [Tr('Poznámky','Notes'),false,'3'],
          ].map(([l,on,c],i)=>(
            <div key={i} className={`tab ${on?'on':''}`}>{l}{c && <span className="count">{c}</span>}</div>
          ))}
        </div>

        {/* Body */}
        <div style={{padding:20,display:'flex',gap:16}}>
          <div className="col gap-16 grow" style={{minWidth:0}}>
            {/* 3-column profile */}
            <div className="row gap-16">
              <div className="card pad-16 grow">
                <div className="eyebrow">{Tr('KONTAKT','CONTACT')}</div>
                <div className="col gap-8 small" style={{marginTop:8}}>
                  <div className="row between"><span className="muted">{Tr('Telefón','Phone')}</span><b className="num">+421 905 412 380</b></div>
                  <div className="row between"><span className="muted">Email</span><b>j.novak@email.sk</b></div>
                  <div className="row between"><span className="muted">{Tr('Adresa','Address')}</span><b style={{textAlign:'right'}}>Kpt. Nálepku 14<br/>080 01 Prešov</b></div>
                  <div className="row between"><span className="muted">{Tr('Pref. kanál','Channel')}</span><b>SMS + Email</b></div>
                </div>
              </div>
              <div className="card pad-16 grow">
                <div className="eyebrow">{Tr('DOKLADY · POISTENIE','IDS · INSURANCE')}</div>
                <div className="col gap-8 small" style={{marginTop:8}}>
                  <div className="row between"><span className="muted">OP</span><b className="num">SK 123456 · do 2031</b></div>
                  <div className="row between"><span className="muted">{Tr('Karta poistenca','Insurance card')}</span><b className="num">VšZP · 25 ✓</b></div>
                  <div className="row between"><span className="muted">{Tr('Lojalita','Loyalty')}</span><span className="pill navy">Gold · 2480 pts</span></div>
                  <div className="row between"><span className="muted">GDPR</span><span className="pill ok">✓ 5/2024</span></div>
                </div>
              </div>
              <div className="card pad-16 grow" style={{borderLeft:'3px solid var(--blue)'}}>
                <div className="eyebrow" style={{color:'var(--blue)'}}>{Tr('OPERAČNÉ POZNÁMKY (PRE RECEPCIU)','OPERATIONAL NOTES (FOR RECEPTION)')}</div>
                <div className="col gap-8 small" style={{marginTop:8}}>
                  <div className="row between"><span className="muted">{Tr('Balík','Package')}</span><b>KKL · Klasická</b></div>
                  <div className="row between"><span className="muted">{Tr('Diéta','Diet')}</span><span className="pill">D2 · bez orechov</span></div>
                  <div className="row between"><span className="muted">{Tr('Mobilita','Mobility')}</span><b>{Tr('Bez pomôcky','No aid')}</b></div>
                  <div className="row between"><span className="muted">{Tr('M4 prehliadka','M4 exam')}</span><b className="num">22. 5. · 09:00</b></div>
                  <div className="row between"><span className="muted">{Tr('M5 procedúry','M5 procedures')}</span><b>21 d × 3</b></div>
                </div>
                <div className="xs muted" style={{marginTop:8}}>
                  <Icon n="medical" size={11}/> {Tr('Diagnózy, alergie a lieky — iba modul M4 (rola lekár). Recepčná ich nevidí.','Diagnoses, allergies, meds — M4 module only (doctor role). Reception cannot view.')}
                </div>
              </div>
            </div>

            {/* History */}
            <div className="card">
              <CardHeader
                eyebrow={Tr('HISTÓRIA POBYTOV','STAY HISTORY')}
                title={Tr('8 pobytov · 138 nocí celkovo','8 stays · 138 nights')}
                action={<button className="btn ghost sm">Export CSV</button>}/>
              <table className="t">
                <thead><tr>
                  <th>{Tr('Obdobie','Period')}</th>
                  <th>{Tr('Balík','Pkg')}</th>
                  <th>{Tr('Izba','Room')}</th>
                  <th style={{textAlign:'right'}}>{Tr('Nocí','Nights')}</th>
                  <th>NPS</th>
                  <th style={{textAlign:'right'}}>{Tr('Tržba','Revenue')}</th>
                  <th>{Tr('Procedúry','Procs')}</th>
                </tr></thead>
                <tbody>
                  {[
                    ['21. 5. – 11. 6. 2026','KKL','203','21','—','2 940 €','aktívny','active'],
                    ['5. – 26. 5. 2024','KKL','207','21','9','2 720 €','42 / 42 ✓','done'],
                    ['10. – 31. 5. 2022','KKL','305','21','10','2 540 €','42 / 42 ✓','done'],
                    ['3. – 17. 6. 2019','CCO','211','14','8','1 510 €','28 / 28 ✓','done'],
                    ['12. – 26. 5. 2017','KKL','201','14','9','1 380 €','28 / 28 ✓','done'],
                  ].map((r,i)=>(
                    <tr key={i} className={i===0?'sel':''}>
                      <td><b className="num">{r[0]}</b></td>
                      <td><P>{r[1]}</P></td>
                      <td className="num">{r[2]}</td>
                      <td className="num" style={{textAlign:'right'}}>{r[3]}</td>
                      <td>{r[4]==='—'?<span className="muted">—</span>:<b className="status-ok num">{r[4]}/10</b>}</td>
                      <td className="num" style={{textAlign:'right'}}>{r[5]}</td>
                      <td>{r[7]==='active'?<P k="blue">{Tr('aktívny','active')}</P>:<span className="status-ok small">{r[6]}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right rail */}
          <div className="col gap-12" style={{flex:'0 0 300px'}}>
            <div className="card pad-16">
              <div className="eyebrow">{Tr('PREFERENCIE (HISTORICKY)','PREFERENCES')}</div>
              <div className="col gap-6 small" style={{marginTop:10}}>
                <div className="panel pad-8 row gap-8 center"><span style={{fontSize:14}}>🛏</span><span>{Tr('Tichá izba · vyšší vankúš','Quiet room · firm pillow')}</span></div>
                <div className="panel pad-8 row gap-8 center"><span style={{fontSize:14}}>☕</span><span>{Tr('Káva 7:00 každý deň','Coffee 7am daily')}</span></div>
                <div className="panel pad-8 row gap-8 center"><span style={{fontSize:14}}>🥗</span><span>{Tr('Diéta D2 · bez orechov','Diet D2 · no nuts')}</span></div>
                <div className="panel pad-8 row gap-8 center"><span style={{fontSize:14}}>💆</span><span>{Tr('Maséri muži','Male massage therap.')}</span></div>
              </div>
            </div>
            <div className="card pad-16" style={{background:'linear-gradient(135deg,#FBE8C9 0%,#FFF8E8 100%)',border:'1px solid var(--warn)'}}>
              <div className="eyebrow" style={{color:'#7A4B07'}}>{Tr('INTERNÉ POZNÁMKY','INTERNAL NOTES')}</div>
              <div className="small" style={{marginTop:8,color:'#3A2402'}}>
                <Icon n="star" size={12}/> Veľmi presný, nemá rád meškanie procedúr. Manželka má rada teplý nápoj po procedúre.
              </div>
              <div className="xs muted" style={{marginTop:6}}>— M.S. · 5/2024</div>
            </div>
          </div>
        </div>
      </div>
    </HFScreen>
  );
}
window.HFGuest = HFGuest;
