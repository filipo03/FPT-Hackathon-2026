/* ── Check-out + Kasa ───────────────────────────────────────── */

function CheckoutSingle(){
  return (
    <Screen active="bill" wide title={T('Check-out · Ján Bobula','Check-out · Ján Bobula')} sub={T('Izba 401 · Premium Spa · 14n · odchod do 10:00','Room 401 · Premium Spa · 14n · departure by 10:00')}
      actions={<><button className="btn ghost">{T('Predĺžiť pobyt','Extend stay')}</button><button className="btn">{T('Uložiť na neskôr','Save for later')}</button><button className="btn primary">✓ {T('Dokončiť check-out','Complete check-out')}</button></>}>
      <div className="row" style={{height:'100%'}}>
        <div className="col grow pad-16 gap-12" style={{overflowY:'auto'}}>
          <div className="box r pad-16 row gap-16 center">
            <Avatar name="JB" lg/>
            <div className="col">
              <div className="row center gap-6"><h2>Ján Bobula</h2><Pill k="bad">VIP</Pill></div>
              <div className="muted small">1952 · Dôvera · Antistresový pobyt · 4. pobyt v 2026</div>
            </div>
            <div className="grow"></div>
            <div className="col" style={{textAlign:'right'}}>
              <div className="xs upper muted">{T('Pobyt','Stay')}</div>
              <b className="num">7. – 21. 5. 2026 · 14n</b>
              <div className="xs muted">10:00 · Premium Spa · 401</div>
            </div>
          </div>

          {/* Folio table */}
          <div className="box r col" style={{minHeight:300}}>
            <div className="pad-12 row between center" style={{borderBottom:'1px solid var(--line-soft)'}}>
              <h3>{T('Folio · 1248','Folio · 1248')}</h3>
              <div className="row gap-6">
                <button className="btn sm">+ {T('Pridať položku','Add item')}</button>
                <button className="btn sm">{T('Rozdeliť','Split')}</button>
                <button className="btn sm">{T('Tlač predf.','Print preview')}</button>
              </div>
            </div>
            <table className="tbl">
              <thead><tr>
                <th>{T('Dátum','Date')}</th><th>{T('Položka','Item')}</th><th>{T('Mn.','Qty')}</th><th>{T('Cena','Unit')}</th><th>{T('Suma','Amount')}</th><th>{T('Účet','Account')}</th><th></th>
              </tr></thead>
              <tbody>
                {[
                  ['7. 5.','Pobyt · izba 401 · Premium Spa','14','148 €','2 072 €','Hosť'],
                  ['7. 5.','Diéta D2 (raň. + obed + večera)','14','22 €','308 €','Hosť'],
                  ['9. 5.','Minibar · nápoje','5','3,50 €','17,50 €','Hosť'],
                  ['10. 5.','Wellness Premium prístup','7','12 €','84 €','Hosť'],
                  ['11. 5.','Doplnková masáž','2','45 €','90 €','Hosť'],
                  ['12. 5.','Pranie bielizne','—','—','12 €','Hosť'],
                  ['15. 5.','Mestský poplatok','14','1,50 €','21 €','Hosť'],
                  ['18. 5.','Bar · večera s hosťami','1','64 €','64 €','Firma'],
                  ['—','Storno zľava (vernostná)','—','—','– 80 €','Hosť'],
                ].map((r,i)=>(
                  <tr key={i}>
                    <td className="num">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td className="num">{r[2]}</td>
                    <td className="num">{r[3]}</td>
                    <td className="num"><b>{r[4]}</b></td>
                    <td><Pill>{r[5]}</Pill></td>
                    <td><button className="btn sm ghost">⋯</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary + actions */}
          <div className="row gap-12">
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('Súčet','Summary')}</h4>
              <div className="col gap-4 small">
                <div className="row between"><span>{T('Pobyt + strava','Stay + meals')}</span><span className="num">2 380 €</span></div>
                <div className="row between"><span>{T('Wellness + masáž','Wellness + massage')}</span><span className="num">174 €</span></div>
                <div className="row between"><span>{T('Minibar + bar','Minibar + bar')}</span><span className="num">93,50 €</span></div>
                <div className="row between"><span>{T('Ostatné','Other')}</span><span className="num">33 €</span></div>
                <div className="row between"><span>{T('Zľavy','Discounts')}</span><span className="num">– 80 €</span></div>
                <hr/>
                <div className="row between"><b>{T('Celkom (vrátane DPH)','Total incl. VAT')}</b><b className="num" style={{fontSize:16}}>2 600,50 €</b></div>
                <div className="row between muted xs"><span>z toho DPH 10%/20%</span><span className="num">214 €</span></div>
              </div>
            </div>

            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('Platobné rozdelenie','Split payment')}</h4>
              <div className="col gap-4 small">
                <div className="row between center"><span>{T('Záloha (5. 5.)','Deposit (May 5)')}</span><span className="num">– 500 €</span></div>
                <div className="row between center"><span>{T('Faktúra firma · LB s.r.o.','Invoice company')}</span><span className="num">– 64 €</span></div>
                <div className="row between center"><span>{T('Depozit pri check-ine','Check-in deposit')}</span><span className="num">– 100 €</span></div>
                <hr/>
                <div className="row between"><b>{T('Doplatok teraz','Settle now')}</b><b className="num" style={{fontSize:18,color:'#D6453B'}}>1 936,50 €</b></div>
              </div>
              <div className="row gap-4" style={{marginTop:8}}>
                <button className="btn primary">💳 {T('Karta','Card')}</button>
                <button className="btn">€ {T('Hotovosť','Cash')}</button>
                <button className="btn">📲 {T('QR · Pay by Square','QR')}</button>
                <button className="btn">↵ {T('Bank. prevod','Bank tr.')}</button>
              </div>
            </div>

            <div className="box r pad-12" style={{flex:'0 0 240px'}}>
              <h4 style={{marginBottom:8}}>{T('Po platbe','After payment')}</h4>
              <div className="col gap-6 small">
                <label className="row center gap-6"><input type="checkbox" defaultChecked/> {T('Tlač faktúry / bločku','Print invoice')}</label>
                <label className="row center gap-6"><input type="checkbox" defaultChecked/> {T('Email kópia hosťovi','Email copy to guest')}</label>
                <label className="row center gap-6"><input type="checkbox" defaultChecked/> {T('Uvoľniť izbu pre HK','Release room to HK')}</label>
                <label className="row center gap-6"><input type="checkbox" defaultChecked/> {T('Vrátiť depozit (karta)','Refund deposit')}</label>
                <label className="row center gap-6"><input type="checkbox"/> {T('Pozvánka NPS prieskum','NPS survey')}</label>
              </div>
            </div>
          </div>
          <Note x={20} y={620} w={240} rot={-1.5}>Split payment, depozit a fakturácia v jednej karte. GUBI to delí do 3 modálov.</Note>
        </div>

        {/* Right rail */}
        <div className="col pad-16 gap-12" style={{flex:'0 0 280px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Záver pobytu','Stay closeout')}</h4>
          <div className="col gap-4 small">
            <div className="row between"><span className="muted">{T('Procedúr absolv.','Procedures')}</span><b className="num">38 / 42</b></div>
            <div className="row between"><span className="muted">{T('Vynechané','Missed')}</span><b className="num">4</b></div>
            <div className="row between"><span className="muted">{T('Vstupná / výstupná M4','M4 in/out')}</span><b>✓ / ✓</b></div>
            <div className="row between"><span className="muted">{T('Sťažnosti','Complaints')}</span><b>0</b></div>
            <div className="row between"><span className="muted">{T('NPS predch.','Last NPS')}</span><b>9 / 10</b></div>
          </div>
          <hr/>
          <h4>{T('Strata / nález','Lost & found')}</h4>
          <div className="box r pad-8 small">⌚ {T('Hodinky · šatňa wellness','Watch · wellness locker')}</div>
          <button className="btn ghost sm">+ {T('Zapísať','Add')}</button>
          <hr/>
          <h4>{T('Rezervácie naspäť','Future stays')}</h4>
          <div className="box tint r pad-8 small">
            <div><b>10. – 24. 11. 2026</b></div>
            <div className="xs muted">Predbežná · KKL · 14n</div>
          </div>
          <button className="btn">+ {T('Predobjednať rok 2027','Pre-book 2027')}</button>
        </div>
      </div>
    </Screen>
  );
}

function Cashier(){
  return (
    <Screen active="bill" wide title={T('Kasa · split-pay','Cashier · split-pay')} sub={T('Rozdelenie účtu medzi hostí a firmu','Split bill across guests & company')}>
      <div className="row" style={{height:'100%'}}>
        <div className="col pad-16 gap-12" style={{flex:'0 0 320px',background:'#FBF9F4',borderRight:'1px solid var(--line-soft)'}}>
          <h4>{T('Otvorené účty','Open folios')}</h4>
          <input className="box r" placeholder={T('Číslo izby alebo meno','Room or name')} style={{padding:'7px 10px',fontSize:11.5}}/>
          <div className="col gap-6">
            {[
              ['401','Bobula J.','2 600,50 €','active'],
              ['205','Hudák +1','840 €','idle'],
              ['203','Novák +1','2 940 €','idle'],
              ['304','Pavlíková A.','1 120 €','idle'],
              ['Skup. C-12','VšZP poukazy','22 480 €','group'],
            ].map((r,i)=>(
              <div key={i} className={`box r pad-8 row center gap-8 ${r[3]==='active'?'tint':''}`} style={{cursor:'pointer'}}>
                <div className="col" style={{lineHeight:1.15}}>
                  <span style={{fontWeight:700}}>{r[0]} · {r[1]}</span>
                  <span className="xs muted">{T('zostatok','balance')}: <span className="num">{r[2]}</span></span>
                </div>
                <span className="grow"></span>
                {r[3]==='group' && <Pill k="ink">SKUPINA</Pill>}
                {r[3]==='active' && <Pill k="accent">{T('aktívny','active')}</Pill>}
              </div>
            ))}
          </div>
        </div>

        <div className="col grow pad-16 gap-12" style={{overflowY:'auto'}}>
          <div className="box r pad-12">
            <div className="row between center"><h3>{T('Folio 1248 · izba 401 · Bobula J.','Folio 1248 · room 401 · Bobula J.')}</h3><Pill k="bad">{T('1 936,50 € do platby','€1,936.50 due')}</Pill></div>
          </div>

          {/* Items by account */}
          <div className="row gap-12">
            {[
              { name:T('Hosť · Ján Bobula','Guest · Ján Bobula'), color:'#1B6FDB', total:'1 872,50 €',
                items:['Pobyt + strava 2 380 €','Wellness 174 €','Minibar 93,50 €','Mestský popl. 21 €','Zľava – 80 €','Záloha – 500 €','Depozit – 100 €']},
              { name:T('Firma · LB s.r.o.','Company · LB Ltd'), color:'#7857C7', total:'64 €',
                items:['Bar · večera 18. 5. · 64 €','Fakt. do 14 dní','IČO 12345678','DIČ SK20…']},
            ].map((acc,i)=>(
              <div key={i} className="box r pad-12 grow">
                <div className="row between center" style={{marginBottom:8}}>
                  <div className="row center gap-6">
                    <div style={{width:10,height:10,background:acc.color,borderRadius:99}}></div>
                    <h4>{acc.name}</h4>
                  </div>
                  <b className="num">{acc.total}</b>
                </div>
                <div className="col gap-2 small">
                  {acc.items.map((it,j)=><div key={j} className="row between"><span>{it.split(' · ')[0]}</span><span className="num muted">{it.includes('€')?it.split(' ').slice(-2).join(' '):''}</span></div>)}
                </div>
                <hr/>
                <div className="row gap-4">
                  <button className="btn sm">+ {T('Položka','Item')}</button>
                  <button className="btn sm">{T('Presun','Move')}</button>
                  <button className="btn sm primary">{T('Platba','Pay')}</button>
                </div>
              </div>
            ))}
            <div className="box dash r pad-12" style={{flex:'0 0 200px'}}>
              <h4 style={{marginBottom:6}}>+ {T('Nový účet','New folio')}</h4>
              <div className="xs muted">{T('Pre druhého hosťa alebo druhú firmu','For 2nd guest or 2nd company')}</div>
            </div>
          </div>

          {/* Payment methods row */}
          <div className="box r pad-12">
            <div className="row between center" style={{marginBottom:10}}>
              <h3>{T('Platba 1 936,50 €','Payment €1,936.50')}</h3>
              <span className="muted small">{T('Môžeš kombinovať','You can combine')}</span>
            </div>
            <div className="row gap-8">
              <div className="box tint r pad-12 grow"><div className="upper xs muted">{T('Karta · pre-auth','Card · pre-auth')}</div><div className="num" style={{fontSize:18,fontWeight:700,marginTop:4}}>1 836,50 €</div><div className="xs muted">VISA · 4242 …</div></div>
              <div className="box r pad-12 grow"><div className="upper xs muted">{T('Hotovosť','Cash')}</div><div className="num" style={{fontSize:18,fontWeight:700,marginTop:4}}>100 €</div></div>
              <div className="box r pad-12 grow"><div className="upper xs muted">{T('Vernostné body','Loyalty pts')}</div><div className="num" style={{fontSize:18,fontWeight:700,marginTop:4}}>0 €</div><div className="xs muted">240 pts dostupných</div></div>
              <div className="box dash r pad-12 grow"><div className="upper xs muted">+ {T('Pridať','Add')}</div></div>
            </div>
            <div className="row gap-8 center" style={{marginTop:12}}>
              <span className="muted small">{T('Vystaviť doklad','Document')}:</span>
              <Pill k="ink">Bloček z eKasa</Pill>
              <Pill>Faktúra firma</Pill>
              <Pill>Daňový doklad</Pill>
              <span className="grow"></span>
              <button className="btn primary">{T('Spracovať platbu','Process payment')} →</button>
            </div>
          </div>
          <Note x={20} y={600} w={240} rot={-1}>Klient: „komplikované platby". Tu je VŠETKO v jednom okne.</Note>
        </div>
      </div>
    </Screen>
  );
}

window.CheckoutSingle = CheckoutSingle;
window.Cashier = Cashier;
