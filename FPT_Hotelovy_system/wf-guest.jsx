/* ── Guest detail + Reservation detail ────────────────────────── */

function TabBar({ items, active=0 }){
  return (
    <div className="row gap-0" style={{borderBottom:'1.2px solid var(--line)',background:'#fff'}}>
      {items.map((t,i)=>(
        <div key={i} className={i===active?'':'muted'} style={{padding:'10px 14px',borderBottom: i===active?'2.5px solid #1B6FDB':'2.5px solid transparent',fontWeight: i===active?700:500,fontSize:12,marginBottom:-1.2,cursor:'pointer'}}>{t}</div>
      ))}
    </div>
  );
}

function GuestDetail(){
  return (
    <Screen active="guest" wide title={T('Detail hosťa · pacient','Guest detail · patient')} sub={T('Hosť je zároveň pacient — recepčný vidí kontext, nie diagnózy navyše','Guest = patient — receptionist sees context, not extra diagnoses')}>
      {/* Hero */}
      <div className="row gap-16 pad-16" style={{borderBottom:'1px solid var(--line-soft)',background:'#FBF9F4'}}>
        <Avatar name="JN" tone="#1B6FDB" lg/>
        <div className="col" style={{lineHeight:1.2}}>
          <div className="row center gap-8">
            <h1>Ing. Jozef Novák</h1>
            <Pill k="bad">VIP</Pill>
            <Pill k="med">⚕ Dx VI/3</Pill>
            <Pill k="warn">⚠ Penicilín</Pill>
            <Pill>D2</Pill>
            <Pill k="ok">VšZP</Pill>
          </div>
          <div className="muted small">SK · *15. 4. 1957 (68 r.) · Bardejov · ID 8042 · klient od 2014</div>
        </div>
        <div className="grow"></div>
        <div className="col gap-4" style={{textAlign:'right'}}>
          <div className="xs upper muted">{T('Aktuálny pobyt','Current stay')}</div>
          <b className="num">21. 5. – 11. 6. 2026 · izba 203</b>
          <div className="xs muted">3. deň · KKL · spol. manželka</div>
        </div>
        <div className="col gap-4">
          <button className="btn primary">{T('Otvoriť rezerváciu','Open reservation')}</button>
          <button className="btn">{T('+ Nová rezervácia','+ New reservation')}</button>
        </div>
      </div>

      <TabBar items={[T('Profil','Profile'), T('História pobytov · 8','Stay history · 8'), T('Dokumenty','Documents'), T('Faktúry · 12','Invoices · 12'), T('Komunikácia','Comms'), T('Poznámky','Notes')]} active={0}/>

      <div className="row" style={{height:'calc(100% - 110px - 41px)'}}>
        <div className="col grow pad-16 gap-12" style={{overflowY:'auto'}}>
          <div className="row gap-12">
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('Kontakt','Contact')}</h4>
              <div className="col gap-4 small">
                <div className="row between"><span className="muted">{T('Telefón','Phone')}</span><span className="num">+421 905 412 380</span></div>
                <div className="row between"><span className="muted">{T('Email','Email')}</span><span>j.novak@email.sk</span></div>
                <div className="row between"><span className="muted">{T('Adresa','Address')}</span><span>Kpt. Nálepku 14, 085 01 Bardejov</span></div>
                <div className="row between"><span className="muted">{T('Komunikácia','Channel')}</span><span>SMS + Email</span></div>
              </div>
            </div>
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('Doklady','Documents')}</h4>
              <div className="col gap-4 small">
                <div className="row between"><span className="muted">OP</span><span className="num">SK · 123456 · do 2031</span></div>
                <div className="row between"><span className="muted">{T('Karta poistenca','Insurance card')}</span><span className="num">VšZP · 25 · ✓</span></div>
                <div className="row between"><span className="muted">{T('Lojalita','Loyalty')}</span><Pill k="ink">Gold · 2480 pts</Pill></div>
                <div className="row between"><span className="muted">{T('GDPR súhlas','GDPR consent')}</span><Pill k="ok">✓ 5/2024</Pill></div>
              </div>
            </div>
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('Zdrav. kontext (z M4)','Health context (M4)')}</h4>
              <div className="col gap-4 small">
                <div className="row between"><span className="muted">{T('Indikácia','Indication')}</span><b>VI/3 koxartróza l. dx.</b></div>
                <div className="row between"><span className="muted">{T('Kontraindik.','Contraindic.')}</span><span>—</span></div>
                <div className="row between"><span className="muted">{T('Alergie','Allergies')}</span><Pill k="warn">Penicilín</Pill></div>
                <div className="row between"><span className="muted">{T('Lieky','Meds')}</span><span>Detralex, Concor</span></div>
                <div className="row between"><span className="muted">{T('Mobilita','Mobility')}</span><span>{T('Bez pomôcky','No aid')}</span></div>
                <div className="xs muted" style={{marginTop:4}}>{T('Detaily v module M4 (vyžaduje rolu lekár)','Details in M4 (doctor role)')}</div>
              </div>
            </div>
          </div>

          {/* Stay timeline */}
          <div className="box r pad-12">
            <div className="row between center" style={{marginBottom:8}}>
              <h3>{T('História pobytov','Stay history')}</h3>
              <span className="muted small">{T('8 pobytov · 138 nocí celkovo · 18 240 € tržba','8 stays · 138 nights · €18,240 total')}</span>
            </div>
            <table className="tbl">
              <thead><tr><th>{T('Obdobie','Period')}</th><th>{T('Balík','Pkg')}</th><th>{T('Izba','Room')}</th><th>{T('Nocí','Nights')}</th><th>NPS</th><th>{T('Tržba','Revenue')}</th><th>{T('Procedúry','Procs')}</th></tr></thead>
              <tbody>
                {[
                  ['21. 5. – 11. 6. 2026','KKL','203','21','—','2 940 €','aktívny'],
                  ['5. – 26. 5. 2024','KKL','207','21','9/10','2 720 €','42 / 42 ✓'],
                  ['10. – 31. 5. 2022','KKL','305','21','10/10','2 540 €','42 / 42 ✓'],
                  ['3. – 17. 6. 2019','CCO','211','14','8/10','1 510 €','28 / 28 ✓'],
                  ['12. – 26. 5. 2017','KKL','201','14','9/10','1 380 €','28 / 28 ✓'],
                ].map((r,i)=>(
                  <tr key={i}>
                    <td className="num"><b>{r[0]}</b></td>
                    <td><Pill>{r[1]}</Pill></td>
                    <td className="num">{r[2]}</td>
                    <td className="num">{r[3]}</td>
                    <td>{r[4]}</td>
                    <td className="num">{r[5]}</td>
                    <td>{r[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Note x={20} y={580} w={250} rot={-1.5}>História pacienta = obrovská hodnota pri opakujúcich kúpeľníkoch.</Note>
        </div>

        <div className="col pad-16 gap-12" style={{flex:'0 0 280px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Vernosť','Loyalty')}</h4>
          <div className="box ink r pad-12" style={{color:'#fff'}}>
            <div className="xs upper" style={{opacity:.8}}>Gold · od 2017</div>
            <div className="num" style={{fontSize:22,fontWeight:800}}>2 480 pts</div>
            <div className="xs" style={{opacity:.8}}>{T('do Platinum: 520 pts','to Platinum: 520 pts')}</div>
          </div>
          <h4>{T('Preferencie','Preferences')}</h4>
          <div className="col gap-4 small">
            <div className="box r pad-8">🛏 {T('Tichá izba (vyšší vankúš)','Quiet room (firm pillow)')}</div>
            <div className="box r pad-8">☕ {T('Káva 7:00 každý deň','Coffee 7am daily')}</div>
            <div className="box r pad-8">🥗 {T('Diéta D2 · bez orechov','Diet D2 · no nuts')}</div>
            <div className="box r pad-8">💆 {T('Maséri muži','Male massage therapists')}</div>
          </div>
          <h4>{T('Interné poznámky','Internal notes')}</h4>
          <div className="box r pad-8" style={{background:'#FFE9A8',borderColor:'#C9A640'}}>
            <div className="small">★ Veľmi presný. Nemá rád meškanie procedúr.</div>
            <div className="xs muted" style={{marginTop:4}}>M.S. · 5/2024</div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function ReservationDetail(){
  return (
    <Screen active="grid" wide title={T('Rezervácia · #R-2026-1248','Reservation · #R-2026-1248')} sub="Ing. Jozef Novák · KKL · 21. 5. – 11. 6. 2026 · izba 203">
      <TabBar items={[T('Prehľad','Overview'), T('Hosť','Guest'), T('Izba a balík','Room & package'), T('Procedúry · M5','Procedures · M5'), T('Faktúry & platby','Invoices'), T('Časová os','Activity')]} active={0}/>
      <div className="row" style={{height:'calc(100% - 41px)'}}>
        <div className="col grow pad-16 gap-12" style={{overflowY:'auto'}}>

          {/* Status strip */}
          <div className="row gap-12">
            {[
              { l:T('Status','Status'),  v:'CHECKED-IN', sub:T('21. 5. · 9:15','May 21 · 9:15am'), c:'#0F1F4D'},
              { l:T('Stay progress','Stay progress'), v:'3 / 21 dní', sub:'14% pobytu', c:'#1B6FDB'},
              { l:T('Procedúry M5','M5 Procedures'), v:'6 / 63', sub:T('zajtra ďalšie 3','+3 tomorrow'), c:'#7857C7'},
              { l:T('Folio','Folio'), v:'520 € / 2 940 €',sub:T('zaplatené 18%','paid 18%'), c:'#2FA76E'},
              { l:T('M4 stav','M4 exam'), v:'✓ 22. 5.', sub:T('vstupná OK','intake OK'), c:'#5DD3E8'},
            ].map((s,i)=>(
              <div key={i} className="box r pad-12 grow" style={{borderLeft:`4px solid ${s.c}`}}>
                <div className="upper xs muted">{s.l}</div>
                <div style={{fontWeight:800,fontSize:18,marginTop:4}}>{s.v}</div>
                <div className="xs muted">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Main 2 column */}
          <div className="row gap-12">
            <div className="col gap-12 grow">
              <div className="box r pad-12">
                <h3 style={{marginBottom:8}}>{T('Hosť','Guest')}</h3>
                <div className="row center gap-8">
                  <Avatar name="JN" tone="#1B6FDB" md/>
                  <div className="col"><b>Ing. Jozef Novák</b><span className="xs muted">+421 905 412 380 · j.novak@email.sk</span></div>
                  <span className="grow"></span>
                  <Pill k="med">Dx VI/3</Pill><Pill k="warn">⚠ Penicilín</Pill><Pill k="bad">VIP</Pill>
                </div>
                <hr/>
                <div className="row gap-12 small">
                  <div className="col"><span className="muted">{T('Spolu','Companion')}</span><b>Mgr. Alžbeta Nováková (manželka)</b></div>
                  <div className="col"><span className="muted">{T('Doklad','ID')}</span><b className="num">SK 123456</b></div>
                </div>
              </div>

              <div className="box r pad-12">
                <h3 style={{marginBottom:8}}>{T('Pobyt a balík','Stay & package')}</h3>
                <div className="row gap-12">
                  <Field2 l={T('Príchod','Arrival')} w="160px"><b className="num">21. 5. 2026</b><div className="xs muted">{T('plánované 14:00','planned 2pm')} · {T('príchod 9:15','arrived 9:15am')}</div></Field2>
                  <Field2 l={T('Odchod','Departure')} w="160px"><b className="num">11. 6. 2026</b><div className="xs muted">do 10:00</div></Field2>
                  <Field2 l={T('Nocí','Nights')} w="80px"><b className="num">21</b></Field2>
                  <Field2 l={T('Balík','Package')}><b>KKL · Klasická kúpeľná liečba</b><div className="xs muted">D2 diéta · 3 procedúry / deň</div></Field2>
                </div>
                <hr/>
                <div className="row gap-12">
                  <Field2 l={T('Izba','Room')} w="180px"><b className="num">203 · Superior Park</b><div className="xs muted">2L · Astória · 24 m²</div></Field2>
                  <Field2 l={T('ZP / poukaz','Voucher')} w="220px"><b>VšZP · VS-2026-148771</b><div className="xs muted">{T('schválené 5. 5. 2026','approved May 5')}</div></Field2>
                  <Field2 l={T('Indikácia','Indication')}><b>VI/3 koxartróza l. dx.</b></Field2>
                </div>
              </div>

              <div className="box r pad-12">
                <div className="row between center" style={{marginBottom:8}}>
                  <h3>{T('Procedúry · stav z M5','Procedures · M5 status')}</h3>
                  <button className="btn sm">{T('Otvoriť v M5 →','Open in M5 →')}</button>
                </div>
                <div className="row gap-2" style={{flexWrap:'wrap'}}>
                  {Array.from({length:21}).map((_,i)=>{
                    const past = i<3; const today=i===2;
                    return (
                      <div key={i} className="box r-sm" style={{flex:'0 0 calc(100%/21 - 2px)',height:38,background: past?'#0F1F4D':today?'#1B6FDB':'#fff',color: past||today?'#fff':'var(--ink-3)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:600,borderColor: past||today?'#0F1F4D':'var(--line-soft)'}}>
                        <div>D{i+1}</div>
                        <div style={{fontWeight:800,fontSize:10}}>{past?'3':today?'3':'·'}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="legend" style={{marginTop:8}}>
                  <span><i style={{background:'#0F1F4D'}}></i>{T('Absolvované','Done')}</span>
                  <span><i style={{background:'#1B6FDB'}}></i>{T('Dnes','Today')}</span>
                  <span><i style={{background:'#fff',border:'1px solid #CFD3DE'}}></i>{T('Naplánované','Planned')}</span>
                </div>
              </div>
            </div>

            <div className="col gap-12" style={{flex:'0 0 320px'}}>
              <div className="box r pad-12">
                <h4 style={{marginBottom:8}}>{T('Akcie','Actions')}</h4>
                <div className="col gap-4">
                  <button className="btn primary">{T('Predĺžiť o noc','Extend +1 night')}</button>
                  <button className="btn">{T('Presunúť izbu','Move room')}</button>
                  <button className="btn">{T('Zmeniť balík','Change package')}</button>
                  <button className="btn">{T('Pridať položku','Add item')}</button>
                  <button className="btn">{T('Vystaviť predfaktúru','Issue pro-forma')}</button>
                  <button className="btn ghost" style={{color:'#D6453B'}}>{T('Stornovať','Cancel')}</button>
                </div>
              </div>
              <div className="box tint r pad-12">
                <h4 style={{marginBottom:6}}>{T('Cenové zhrnutie','Pricing summary')}</h4>
                <div className="col gap-2 small">
                  <div className="row between"><span>{T('Pobyt 21n','Stay 21n')}</span><span className="num">1 869 €</span></div>
                  <div className="row between"><span>{T('Diéta D2','Diet D2')}</span><span className="num">462 €</span></div>
                  <div className="row between"><span>Premium upgr.</span><span className="num">588 €</span></div>
                  <div className="row between"><span>{T('Mestský popl.','City tax')}</span><span className="num">21 €</span></div>
                  <hr/>
                  <div className="row between"><b>Celkom</b><b className="num">2 940 €</b></div>
                  <div className="row between"><span>{T('ZP hradí','Ins. covers')}</span><span className="num">– 1 470 €</span></div>
                  <div className="row between"><span>{T('Zaplatené','Paid')}</span><span className="num">– 500 €</span></div>
                  <div className="row between"><b>{T('Do platby','Due')}</b><b className="num" style={{color:'#D6453B'}}>970 €</b></div>
                </div>
              </div>
              <Note x={6} y={460} w={250} rot={1.5}>Detail je dlhý, ale nepotrebuje viac obrazoviek. Sticky tab pre rýchlu navigáciu.</Note>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

window.GuestDetail = GuestDetail;
window.ReservationDetail = ReservationDetail;
