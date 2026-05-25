/* ── Check-in: one-screen, group, medical ─────────────────────── */

function Field2({ l, children, w, req }){
  return (
    <div className="col gap-4" style={{flex: w?`0 0 ${w}`:'1',minWidth:0}}>
      <div className="xs upper muted">{l}{req && <span style={{color:'#D6453B'}}> *</span>}</div>
      {children}
    </div>
  );
}

function CheckinOne(){
  return (
    <Screen active="grid" wide title={T('Check-in · Ing. Jozef Novák','Check-in · Mr. Novák')}
      sub={T('Variant A · jedna obrazovka · cieľ ≤ 90s','Variant A · one-screen · target ≤ 90s')}
      actions={<><button className="btn ghost">⌫ {T('Zrušiť','Cancel')}</button><button className="btn">{T('Uložiť rozpracované','Save draft')}</button><button className="btn primary">✓ {T('Dokončiť check-in','Complete check-in')}</button></>}>
      <div className="row" style={{height:'100%'}}>
        <div className="col grow pad-16 gap-12" style={{overflowY:'auto'}}>
          {/* Guest banner */}
          <div className="box r pad-16 row gap-16 center" style={{background:'#fff'}}>
            <Avatar name="JN" tone="#1B6FDB" lg/>
            <div className="col" style={{lineHeight:1.2}}>
              <div className="row center gap-6">
                <h2>Ing. Jozef Novák</h2>
                <Pill k="bad">VIP</Pill>
                <Pill k="med">⚕ Dx VI/3 koxartróza</Pill>
                <Pill k="warn">⚠ Alergia · penicilín</Pill>
              </div>
              <div className="muted small">SK · 1957 (68 r.) · ID 8042 · 3. pobyt</div>
            </div>
            <div className="grow"></div>
            <div className="col" style={{textAlign:'right',lineHeight:1.2}}>
              <span className="xs upper muted">{T('Pobyt','Stay')}</span>
              <b className="num">21. 5. – 11. 6. 2026 · 21n</b>
              <span className="xs muted">KKL · Izba 203 · Superior Park</span>
            </div>
          </div>

          {/* 3-col: documents · stay confirm · payment */}
          <div className="row gap-12">
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>1 · {T('Doklady','Documents')}</h4>
              <div className="col gap-8 small">
                <div className="box r pad-8 dash row center gap-8">
                  <div className="box r-sm" style={{width:48,height:36,background:'#FBF9F4',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--ink-3)'}}>OP</div>
                  <div className="col grow">
                    <b>{T('Občiansky preukaz','ID card')}</b>
                    <span className="xs muted">SK · platný do 2031</span>
                  </div>
                  <Pill k="ok">✓ {T('skenovaný','scanned')}</Pill>
                </div>
                <div className="box r pad-8 dash row center gap-8 muted">
                  <div className="box r-sm" style={{width:48,height:36,display:'flex',alignItems:'center',justifyContent:'center'}}>ZP</div>
                  <div className="col grow">
                    <b>{T('ZP poukaz','Insurance voucher')}</b>
                    <span className="xs">VS-2026-148771 · VšZP</span>
                  </div>
                  <Pill k="ok">✓ schvál.</Pill>
                </div>
                <div className="box r pad-8 dash row center gap-8">
                  <div className="box r-sm" style={{width:48,height:36,background:'#FBF9F4'}}></div>
                  <div className="col grow">
                    <b>{T('Podpis registrácie','Registration signature')}</b>
                    <span className="xs muted">{T('signpad alebo e-podpis','signpad or e-sign')}</span>
                  </div>
                  <button className="btn primary sm">{T('Podpísať','Sign')}</button>
                </div>
              </div>
            </div>

            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>2 · {T('Potvrdenie izby','Room confirmation')}</h4>
              <div className="box tint r pad-8 small">
                <div className="row between"><span className="muted">{T('Pridelená','Assigned')}</span><b className="num">203</b></div>
                <div className="row between"><span className="muted">{T('Krídlo','Wing')}</span><b>Astória · 2. poschodie</b></div>
                <div className="row between"><span className="muted">{T('Kategória','Category')}</span><b>Superior Park · 2L · 24 m²</b></div>
                <div className="row between"><span className="muted">{T('Stav HK','HK status')}</span><Pill k="ok">{T('Pripravená','Ready')}</Pill></div>
              </div>
              <div className="col gap-4" style={{marginTop:8}}>
                <button className="btn sm">↑ {T('Upgrade na Premium (+ 28 €/n)','Upgrade to Premium (+ €28/n)')}</button>
                <button className="btn sm ghost">↔ {T('Zmeniť izbu','Change room')}</button>
              </div>
              <hr/>
              <Field2 l={T('Špec. požiadavky pri check-ine','Check-in requests')}>
                <textarea className="box r" style={{padding:8,fontSize:11.5,minHeight:60,width:'100%'}} defaultValue="Hosť žiada vyšší vankúš + tichú izbu (potvrdené v rezervácii)."/>
              </Field2>
            </div>

            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>3 · {T('Platba a depozit','Payment & deposit')}</h4>
              <div className="col gap-4 small">
                <div className="row between"><span className="muted">{T('Pobyt','Stay')}</span><span className="num">2 940 €</span></div>
                <div className="row between"><span className="muted">{T('ZP hradí','Ins. covers')}</span><span className="num">– 1 470 €</span></div>
                <div className="row between"><span className="muted">{T('Mestský poplatok','City tax')}</span><span className="num">21 €</span></div>
                <hr/>
                <div className="row between"><b>{T('Doplatok pri pobyte','Settle at stay')}</b><b className="num">1 491 €</b></div>
                <div className="row between xs muted"><span>{T('Záloha online','Online deposit')}</span><span className="num">– 500 €</span></div>
              </div>
              <hr/>
              <Field2 l={T('Depozit pri check-ine','Deposit at check-in')}>
                <div className="row gap-6">
                  <Inp w="100px" val="100 €"/>
                  <Sel><option>{T('Karta · pre-auth','Card · pre-auth')}</option><option>{T('Hotovosť','Cash')}</option></Sel>
                </div>
              </Field2>
              <Field2 l={T('Spôsob platby doplatku','Settle method')}>
                <Sel><option>{T('Pri odchode','At departure')}</option><option>{T('Teraz','Now')}</option><option>{T('Faktúra · firma','Invoice · company')}</option></Sel>
              </Field2>
            </div>
          </div>

          {/* Bottom: linked modules */}
          <div className="row gap-12">
            <div className="box tint r pad-12 grow">
              <h4 style={{marginBottom:6}}>↗ M4 · {T('Vstupná lekárska prehliadka','Initial medical exam')}</h4>
              <div className="small">{T('Naplánovaná','Scheduled')}: <b className="num">22. 5. · 9:00 · Dr. Lipták · ord. 12</b></div>
              <div className="xs muted">{T('Hosť dostane harmonogram s náramkom','Guest receives schedule with wristband')}</div>
            </div>
            <div className="box tint r pad-12 grow">
              <h4 style={{marginBottom:6}}>↗ M5 · {T('Procedúry','Procedures')}</h4>
              <div className="small">{T('Pripravené po prehliadke','Activated after exam')}: 21d × 3 procedúry · KKL</div>
            </div>
            <div className="box tint r pad-12 grow">
              <h4 style={{marginBottom:6}}>↗ {T('Reštaurácia','Restaurant')}</h4>
              <div className="small">D2 · {T('večera od 18:00 · stôl 12','dinner 6pm · table 12')}</div>
            </div>
          </div>
          <Note x={20} y={620} w={240} rot={-1.5}>Všetko v 1 pohľade. V GUBI sú toto 4-5 záložiek.</Note>
        </div>

        {/* Right rail: history & messages */}
        <div className="col pad-16 gap-12" style={{flex:'0 0 280px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('História pobytov','Stay history')}</h4>
          <div className="col gap-4 small">
            <div className="box r pad-8"><b>5. – 26. 5. 2024</b><div className="xs muted">KKL · izba 207 · 21n · bez sťažností</div></div>
            <div className="box r pad-8"><b>10. – 31. 5. 2022</b><div className="xs muted">KKL · izba 305 · 21n · pochvala HK</div></div>
            <div className="box r pad-8"><b>3. – 17. 6. 2019</b><div className="xs muted">CCO · izba 211 · 14n</div></div>
          </div>
          <hr/>
          <h4>{T('Internou poznámkou','Internal notes')}</h4>
          <div className="box r pad-8 small" style={{background:'#FFE9A8',borderColor:'#C9A640'}}>
            <div>★ Stála káva 7:00. Veľmi presný, nemá rád meškanie.</div>
            <div className="xs muted" style={{marginTop:4}}>— Recepčná M.S., 2024</div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function CheckinGroup(){
  return (
    <Screen active="grid" wide title={T('Skupinový check-in · C-12','Group check-in · C-12')} sub={T('32 osôb · paralelne s kolegyňou · jeden zoznam, dva stĺpce','32 ppl · parallel · one list, two columns')}>
      <div className="col" style={{height:'100%',overflow:'hidden'}}>
        {/* Top bar */}
        <div className="row gap-8 center pad-12" style={{borderBottom:'1px solid var(--line-soft)',background:'#FBF9F4'}}>
          <Pill k="ok">12 ✓ {T('hotových','done')}</Pill>
          <Pill k="warn">3 {T('rozpracované','in prog.')}</Pill>
          <Pill>17 {T('čaká','waiting')}</Pill>
          <span className="grow"></span>
          <span className="small muted">{T('Paralelný režim · pripojená','Parallel mode · joined')}: <b>Recepčná M.S.</b></span>
          <button className="btn">{T('Tlač balíčka pre všetkých','Print all packs')}</button>
          <button className="btn primary">{T('Hromadný podpis · 12 hostí','Bulk sign · 12')}</button>
        </div>

        <div className="row grow" style={{overflow:'hidden'}}>
          <div className="col grow" style={{minWidth:0,overflowY:'auto'}}>
            <table className="tbl">
              <thead>
                <tr>
                  <th></th>
                  <th>{T('Účastník','Member')}</th>
                  <th>{T('Izba','Room')}</th>
                  <th>{T('Doklad','ID')}</th>
                  <th>{T('Poukaz ZP','Voucher')}</th>
                  <th>{T('Podpis','Sign')}</th>
                  <th>{T('Diéta','Diet')}</th>
                  <th>{T('Špec.','Notes')}</th>
                  <th>{T('Recepčný','Agent')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {[
                ['Adamová Jana',     '201','✓','✓','✓','D2','tichá','Jana'],
                ['Adamec Pavol',     '201','✓','✓','✓','D2','—','Jana'],
                ['Bachratá Eva',     '202','✓','✓','—','D1','vankúš','Jana'],
                ['Belko Imrich',     '203','✓','✓','✓','D2','—','M.S.'],
                ['Bednárová Mária',  '203','—','✓','—','D9','vegetar.','—'],
                ['Čierna Anna',      '—',  '—','—','—','D2','—','—'],
                ['Demeter Karol',    '—',  '—','✓','—','D1','—','—'],
                ['Ďurica Štefan',    '204','✓','✓','✓','D3','diabet.','M.S.'],
                ['Fábry Anton',      '204','✓','✓','—','D2','—','M.S.'],
                ['Gajdoš Vincent',   '205','—','—','—','D2','—','—'],
                ['Hudák Imrich',     '205','✓','✓','—','D2','vankúš','Jana'],
                ['Imrich Soňa',      '—',  '—','—','—','D1','—','—'],
              ].map((m,i)=>(
                <tr key={i} style={{background: m[7]==='Jana'?'rgba(27,111,219,0.05)' : m[7]==='M.S.'?'rgba(120,87,199,0.05)' : 'transparent'}}>
                  <td><input type="checkbox" defaultChecked={m[7]!=='—'}/></td>
                  <td><b>{m[0]}</b></td>
                  <td>{m[1]==='—' ? <Pill k="warn">{T('priradiť','assign')}</Pill> : <span className="num">{m[1]}</span>}</td>
                  <td>{m[2]==='✓' ? <Pill k="ok">✓</Pill> : <button className="btn sm">📷</button>}</td>
                  <td>{m[3]==='✓' ? <Pill k="ok">✓</Pill> : <Pill k="warn">!</Pill>}</td>
                  <td>{m[4]==='✓' ? <Pill k="ok">✓</Pill> : <Pill k="warn">—</Pill>}</td>
                  <td><Pill>{m[5]}</Pill></td>
                  <td className="xs muted">{m[6]}</td>
                  <td>{m[7]==='—' ? '—' : <Avatar name={m[7].substring(0,2).toUpperCase()} tone={m[7]==='Jana'?'#1B6FDB':'#7857C7'}/>}</td>
                  <td>{m[7]==='—' ? <button className="btn sm primary">{T('Odbavím','Take')}</button> : <button className="btn sm ghost">⋯</button>}</td>
                </tr>
              ))}
              <tr><td colSpan="10" className="muted xs" style={{textAlign:'center',padding:14}}>… + 20 ďalších členov skupiny …</td></tr>
              </tbody>
            </table>
          </div>

          <div className="col pad-12 gap-8" style={{flex:'0 0 280px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
            <h4>{T('Skupinové akcie','Bulk actions')}</h4>
            <button className="btn">{T('Priradiť všetkým izbu z bloku','Auto-assign rooms')}</button>
            <button className="btn">{T('Nastaviť diétu pre vybraných','Set diet for selected')}</button>
            <button className="btn">{T('Pošli M5 manifest','Send M5 manifest')}</button>
            <button className="btn">{T('Pošli M4 zoznam prehliadky','Send M4 exam list')}</button>
            <hr/>
            <h4>{T('Vodca skupiny','Group leader')}</h4>
            <div className="box r pad-8 small">
              <div className="row center gap-6"><Avatar name="VK" md/><b>Vincent Kollár</b></div>
              <div className="xs muted" style={{marginTop:4}}>Cestovka Senior Plus · +421 905 …</div>
              <button className="btn ghost sm" style={{marginTop:4}}>{T('Volať','Call')}</button>
            </div>
            <Note x={6} y={420} w={250} rot={1.5}>Farebné riadky = kto koho odbavuje. Žiadne duplicity.</Note>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function CheckinMed(){
  return (
    <Screen active="grid" wide title={T('Check-in · Vstupná lekárska prehliadka','Check-in · Initial medical exam')} sub={T('Naviazanie na M4 — recepčný iba organizuje, nezadáva diagnózy','Hand-off to M4 — receptionist organizes, no diagnoses')}>
      <div className="row" style={{height:'100%'}}>
        <div className="col grow pad-16 gap-16" style={{overflowY:'auto'}}>
          <div className="box r pad-16 row gap-16 center">
            <Avatar name="MK" tone="#7857C7" lg/>
            <div className="col">
              <h2>Mária Kováčová</h2>
              <div className="muted small">SK · 1962 (64 r.) · KKL · izba 302 · 21n · Dôvera</div>
            </div>
            <div className="grow"></div>
            <Pill k="ok">{T('Check-in dokončený · 21. 5. 14:32','Check-in done · May 21 2:32pm')}</Pill>
          </div>

          {/* Timeline of patient onboarding */}
          <div className="box r pad-16">
            <h3 style={{marginBottom:12}}>{T('Plán prvých 24 hodín','First 24h plan')}</h3>
            <div className="col gap-2">
              {[
                ['14:32','Recepcia','Check-in, kľúč, harmonogram',true,'ink'],
                ['15:00','M5','Náramok s RFID · meranie tlaku',true,'cyan'],
                ['18:30','Reštaurácia','Večera D2 · stôl 14',false,'ok'],
                ['09:00','M4 · ord. 8','Vstupná lekárska prehliadka · Dr. Lipták',false,'med'],
                ['10:30','M5','Aktivácia procedúr na základe prehliadky',false,'med'],
                ['11:00','M5','Prvá procedúra: Magnetoterapia',false,'cyan'],
                ['12:00','Reštaurácia','Obed D2',false,'ok'],
              ].map((e,i)=>(
                <div key={i} className="row gap-12 center" style={{padding:'6px 0',borderBottom:'1px dashed var(--line-soft)'}}>
                  <div className="num small" style={{flex:'0 0 60px',color: e[3]?'#5B6076':'#0F1F4D'}}>{e[0]}</div>
                  <Dot k={e[4]}/>
                  <div className="upper xs muted" style={{flex:'0 0 110px'}}>{e[1]}</div>
                  <div className="grow" style={{textDecoration:e[3]?'line-through':'none',color:e[3]?'#8A8FA3':'#0F1F4D'}}>{e[2]}</div>
                  {e[3] ? <Pill k="ok">✓</Pill> : <button className="btn sm ghost">⋯</button>}
                </div>
              ))}
            </div>
          </div>

          {/* Form: questions for medical pre-fill */}
          <div className="box r pad-16">
            <div className="row between center" style={{marginBottom:10}}>
              <h3>{T('Predvyplnenie M4 — recepčná položí 4 otázky','Pre-fill M4 — receptionist asks 4 questions')}</h3>
              <Pill>{T('Voliteľné · pomáha lekárovi','Optional · helps doctor')}</Pill>
            </div>
            <div className="row gap-12 wrap">
              <Field2 l={T('Užíva pravidelne lieky?','Regular meds?')} w="240px">
                <Sel><option>Áno — Detralex, Concor</option><option>Nie</option></Sel>
              </Field2>
              <Field2 l={T('Alergie','Allergies')} w="220px">
                <Inp val="—"/>
              </Field2>
              <Field2 l={T('Posledný TK','Last BP')} w="160px">
                <Inp val="135/82"/>
              </Field2>
              <Field2 l={T('Schopnosť chôdze','Mobility')} w="200px">
                <Sel><option>Bez pomôcky</option><option>Palica</option><option>Chodúľka</option><option>Vozík</option></Sel>
              </Field2>
            </div>
            <div className="row gap-8 center" style={{marginTop:12}}>
              <span className="muted small grow">{T('Po uložení sa údaje pošlú lekárovi pred prehliadkou.','Saved data goes to doctor before exam.')}</span>
              <button className="btn">{T('Preskočiť','Skip')}</button>
              <button className="btn primary">{T('Uložiť a poslať M4','Save & send to M4')}</button>
            </div>
          </div>

          <Note x={20} y={580} w={240} rot={-1.5}>Recepčný nediagnostikuje — len pripraví pôdu lekárovi.</Note>
        </div>

        <div className="col pad-16 gap-12" style={{flex:'0 0 300px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Kontext zdravia','Health context')}</h4>
          <div className="box tint r pad-8 small">
            <div className="row between"><span className="muted">Indikácia</span><b>VI/4 gonartróza</b></div>
            <div className="row between"><span className="muted">Predch. liečba</span><b>2× v Bardejove</b></div>
            <div className="row between"><span className="muted">Poukaz</span><b>VS-2026-188441</b></div>
          </div>
          <h4>{T('Kontraindikácie','Contraindications')}</h4>
          <div className="box r pad-8 small" style={{borderColor:'#D6453B'}}>
            <Pill k="bad">⚠ Akútna infekcia</Pill>
            <Pill k="bad">⚠ TK &gt; 180/110</Pill>
            <div className="xs muted" style={{marginTop:4}}>{T('Skríning robí M4 pri vstupnej prehliadke','Screened by M4 at exam')}</div>
          </div>
          <h4>{T('Dokumenty od hosťa','Guest docs')}</h4>
          <div className="col gap-4 small">
            <div className="box r pad-8">📄 Návrh na kúpeľnú liečbu · ✓</div>
            <div className="box r pad-8">📄 Výpis z karty (PDF) · ✓</div>
            <div className="box r pad-8 dash muted">📄 EKG (≤ 6 mes.) · {T('chýba','missing')}</div>
          </div>
          <Note x={6} y={520} w={250} rot={2}>EKG vie recepčný označiť ako „chýba" → M4 to bude vedieť.</Note>
        </div>
      </div>
    </Screen>
  );
}

window.CheckinOne = CheckinOne;
window.CheckinGroup = CheckinGroup;
window.CheckinMed = CheckinMed;
