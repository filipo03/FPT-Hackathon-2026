/* ── Nová rezervácia — wizard, quick, skupina ─────────────────── */

function Stepper({ step }){
  const steps = [T('Hosť','Guest'), T('Pobyt','Stay'), T('Procedúry & izba','Procs & room'), T('Platba','Payment')];
  return (
    <div className="row gap-0" style={{padding:'12px 20px',borderBottom:'1px solid var(--line-soft)',background:'#FBF9F4'}}>
      {steps.map((s,i)=>(
        <div key={i} className="row center gap-8" style={{flex:1}}>
          <div className="box r-pill" style={{width:24,height:24,display:'flex',alignItems:'center',justifyContent:'center',background: i<=step?'#0F1F4D':'#fff',color:i<=step?'#fff':'var(--ink)',fontSize:11,fontWeight:700}}>{i+1}</div>
          <div className={i===step?'':'muted'} style={{fontWeight:i===step?700:500}}>{s}</div>
          {i<3 && <div className="grow" style={{height:1,background: i<step?'#0F1F4D':'#CFD3DE',margin:'0 12px'}}/>}
        </div>
      ))}
    </div>
  );
}

function Field({ label, hint, children, w, req }){
  return (
    <div className="col gap-4" style={{flex: w?`0 0 ${w}`:'1', minWidth:0}}>
      <label className="xs upper muted">{label}{req && <span style={{color:'#D6453B'}}> *</span>}</label>
      {children}
      {hint && <div className="xs muted">{hint}</div>}
    </div>
  );
}
function Inp({ ph, val, w, type='text' }){
  return <input className="box r" type={type} placeholder={ph} defaultValue={val} style={{padding:'7px 10px',fontSize:11.5,width:w||'100%'}}/>;
}
function Sel({ children, w }){
  return <select className="box r" style={{padding:'7px 8px',fontSize:11.5,width:w||'100%'}}>{children}</select>;
}

function NewResWizard(){
  return (
    <Screen active="grid" wide title={T('Nová rezervácia','New reservation')} sub={T('Variant A · klasický wizard 4 kroky','Variant A · classic 4-step wizard')}>
      <Stepper step={2}/>
      <div className="row" style={{height:'calc(100% - 49px)'}}>
        <div className="col grow pad-20 gap-16" style={{overflowY:'auto'}}>
          <div className="row gap-16">
            <Field label={T('Hosť','Guest')} req>
              <div className="row gap-6 center">
                <Inp ph={T('Hľadať existujúceho hosťa…','Search existing guest…')} val="Ing. Jozef Novák"/>
                <button className="btn">+ {T('Nový','New')}</button>
              </div>
            </Field>
            <Field label={T('Spolu cestujúci','Companions')} w="220px">
              <Inp val="1 dospelý + 0 detí"/>
            </Field>
          </div>

          <div className="row gap-16">
            <Field label={T('Príchod','Arrival')} req><Inp type="date" val="2026-05-21"/></Field>
            <Field label={T('Odchod','Departure')} req><Inp type="date" val="2026-06-11"/></Field>
            <Field label={T('Nocí','Nights')} w="100px"><Inp val="21" /></Field>
            <Field label={T('Typ pobytu','Stay type')}><Sel><option>Kúpeľný — ZP poukaz</option><option>Kúpeľný — samoplatca</option><option>Relax / wellness</option><option>Konferenčný</option></Sel></Field>
          </div>

          <div className="row gap-16">
            <Field label={T('Balík','Package')} req>
              <Sel><option>KKL · Klasická kúpeľná liečba (21n)</option><option>CCO · Cigeľka Comfort (7n)</option><option>ANS · Antistresový pobyt (5n)</option><option>RVK · Relax víkend (2n)</option></Sel>
            </Field>
            <Field label={T('Diéta','Diet')}>
              <Sel><option>D2 · základná</option><option>D1 · ľahká</option><option>D3 · diabetická</option><option>D9 · redukčná</option></Sel>
            </Field>
          </div>

          <div className="row gap-16">
            <Field label={T('Zdravotná poisťovňa','Insurance')}>
              <Sel><option>VšZP · 25</option><option>Dôvera · 24</option><option>Union · 27</option><option>ZP MV SR · 23</option><option>NFZ-PL (poľská)</option><option>— samoplatca</option></Sel>
            </Field>
            <Field label={T('Číslo poukazu','Voucher #')}><Inp val="VS-2026-148771" hint="↗ overiť proti ZP"/></Field>
            <Field label={T('Indikácia (MKCH)','Indication code')}><Inp val="VI/3 koxartróza"/></Field>
          </div>

          <div className="box dash r pad-12">
            <h4 style={{marginBottom:6}}>{T('Špeciálne požiadavky','Special requests')}</h4>
            <div className="row gap-6 wrap">
              {[
                ['🛏 Tichá izba',true],['🚭 Nefajčiar',true],['☕ Káva 7:00',false],
                ['♿ Bezbariérová',false],['🐾 Pes',false],['👶 Postieľka',false],
                ['🌊 Vyšší vankúš',false],['🥗 Vegetariánska',false],['💆 Masér muž',false]
              ].map(([t,on],i)=>(
                <span key={i} className={`pill ${on?'ink':''}`}>{t}</span>
              ))}
              <button className="btn ghost sm">+ {T('Vlastná poznámka','Custom note')}</button>
            </div>
          </div>

          <div className="row gap-16">
            <Field label={T('Cenotvorba','Pricing')}>
              <div className="box r pad-12">
                <div className="row between small"><span>{T('Izba 21n × 89 €','Room 21n × €89')}</span><span className="num">1 869 €</span></div>
                <div className="row between small"><span>{T('Balík KKL (zarátané)','Package KKL (incl.)')}</span><span className="num muted">—</span></div>
                <div className="row between small"><span>{T('Diéta D2 21n × 22 €','Diet D2 21n × €22')}</span><span className="num">462 €</span></div>
                <div className="row between small"><span>{T('Mestský poplatok','City tax')}</span><span className="num">21 €</span></div>
                <div className="row between small"><span>{T('Príplatok Premium','Premium upgrade')}</span><span className="num">+ 588 €</span></div>
                <hr/>
                <div className="row between"><b>{T('Spolu','Total')}</b><b className="num" style={{fontSize:16}}>2 940 €</b></div>
                <div className="row between xs muted"><span>{T('ZP hradí','Insurance covers')}</span><span className="num">1 470 €</span></div>
              </div>
            </Field>
          </div>
        </div>

        {/* Side: room picker */}
        <div className="col pad-16 gap-12" style={{flex:'0 0 320px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Priradiť izbu','Assign room')}</h4>
          <div className="row gap-6">
            <Sel w="48%"><option>{T('Všetky krídla','All wings')}</option></Sel>
            <Sel w="48%"><option>{T('Superior','Superior')}</option></Sel>
          </div>
          <div className="col gap-6" style={{flex:1,overflowY:'auto'}}>
            {['203','205','303','402','403','205'].map((no,i)=>(
              <div key={i} className={`box r pad-8 row center gap-8 ${i===0?'tint':''}`}>
                <input type="radio" defaultChecked={i===0}/>
                <div className="col" style={{lineHeight:1.15}}>
                  <span className="num" style={{fontWeight:700}}>{no} · Superior Park</span>
                  <span className="xs muted">2L · Astória · 24 m²</span>
                </div>
                <span className="grow"></span>
                <span className="pill ok">{T('voľná 21n','free 21n')}</span>
              </div>
            ))}
            <div className="box r pad-8 dash row center gap-8 muted">
              <span>301 · Štandard</span><span className="grow"></span><span className="pill bad">{T('konflikt 25.5.','clash May 25')}</span>
            </div>
          </div>
          <Note x={16} y={530} w={250} rot={1}>Konflikt vidieť hneď — netreba klikať. GUBI to schováva.</Note>
        </div>
      </div>

      {/* Footer actions */}
      <div className="row gap-8 center" style={{padding:'10px 20px',borderTop:'1px solid var(--line-soft)',background:'#fff'}}>
        <button className="btn ghost">← {T('Späť','Back')}</button>
        <button className="btn">{T('Uložiť ako hold (24h)','Save as hold (24h)')}</button>
        <span className="grow"></span>
        <span className="muted small">{T('Cena spolu','Total')}: <b className="num">2 940 €</b></span>
        <button className="btn primary">{T('Ďalej · Platba','Next · Payment')} →</button>
      </div>
    </Screen>
  );
}

function NewResQuick(){
  return (
    <Screen active="grid" wide title={T('Quick-create rezervácia','Quick-create reservation')} sub={T('Variant B · 1 obrazovka · pre walk-in a telefón','Variant B · 1 screen · for walk-ins & phone')}>
      <div className="row" style={{height:'100%'}}>
        <div className="col grow pad-20 gap-16" style={{overflowY:'auto'}}>
          <div className="box r pad-16">
            <div className="row between center" style={{marginBottom:10}}>
              <h3>{T('Iba 6 polí · doplníš pri check-ine','Only 6 fields · finish at check-in')}</h3>
              <Pill k="ok">{T('≤ 20 sekúnd','≤ 20 seconds')}</Pill>
            </div>
            <div className="row gap-12 wrap">
              <Field w="280px" label={T('Meno hosťa','Guest name')} req><Inp val="Hudák Peter"/></Field>
              <Field w="180px" label={T('Telefón','Phone')} req><Inp val="+421 905 123 456"/></Field>
              <Field w="180px" label={T('Príchod','Arrival')} req><Inp type="date" val="2026-05-21"/></Field>
              <Field w="80px"  label={T('Nocí','Nights')} req><Inp val="5"/></Field>
              <Field w="200px" label={T('Balík','Package')} req><Sel><option>ANS · Antistres (5n)</option></Sel></Field>
              <Field w="180px" label={T('Typ izby','Room type')} req><Sel><option>Superior</option></Sel></Field>
            </div>
          </div>

          {/* Availability strip */}
          <div className="box r pad-12">
            <div className="row between center" style={{marginBottom:8}}>
              <h3>{T('Dostupnosť · Superior · 21.–26.5.','Availability · Superior · May 21–26')}</h3>
              <span className="small muted">{T('Stačí kliknúť na izbu','Click a room')}</span>
            </div>
            <div className="row gap-4 wrap">
              {['203','205','303','402','403','502','503','504','505','601','602','603'].map((r,i) => {
                const free = i!==2 && i!==7;
                return (
                  <div key={i} className={`box r-sm pad-8 col center ${free?'tint':''}`} style={{width:78,opacity:free?1:.3,cursor:free?'pointer':'not-allowed'}}>
                    <div className="num" style={{fontWeight:700}}>{r}</div>
                    <div className="xs muted">{free?T('voľná','free'):T('obsadená','taken')}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional extras */}
          <div className="box dash r pad-12">
            <div className="row between center" style={{marginBottom:8}}>
              <h3>{T('Doplniť pri check-ine','Finish at check-in')}</h3>
              <span className="muted small">{T('Tieto polia nie sú teraz povinné','Not required now')}</span>
            </div>
            <div className="row gap-6 wrap">
              {['OP / pas','Adresa','Email','Diéta','ZP / poukaz','Indikácia (Dx)','Doprava','Spôsob platby','Špec. požiadavky'].map(t =>
                <span key={t} className="pill muted">○ {t}</span>
              )}
            </div>
          </div>

          <div className="row gap-12 center">
            <span className="grow muted small">{T('Cena indikatívne','Indicative price')}: <b className="num">~ 540 €</b></span>
            <button className="btn">{T('Uložiť ako hold (24h)','Save as hold (24h)')}</button>
            <button className="btn primary">{T('Vytvoriť rezerváciu','Create reservation')} ↵</button>
          </div>

          <Note x={20} y={620} w={240} rot={-1.5}>Klient: „zbytočne veľa povinných polí". Quick-create má len 6.</Note>
        </div>

        {/* Side: similar / past guest */}
        <div className="col pad-16 gap-12" style={{flex:'0 0 300px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Podobní hostia v DB','Similar guests in DB')}</h4>
          <div className="muted xs">{T('Auto-match podľa mena + telefónu','Auto-match by name + phone')}</div>
          <div className="box r pad-8">
            <div className="row center gap-8"><Avatar name="PH" tone="#D6453B" md/><div><b>Mgr. Peter Hudák</b><div className="xs muted">12 predch. pobytov · VIP</div></div></div>
            <div className="row gap-4 wrap" style={{marginTop:6}}><Pill k="med">Dx VI/2</Pill><Pill k="bad">VIP</Pill><Pill k="ok">VšZP</Pill></div>
            <button className="btn primary" style={{width:'100%',justifyContent:'center',marginTop:8}}>{T('Použiť tento profil','Use this profile')}</button>
          </div>
          <div className="box r pad-8">
            <div className="row center gap-8"><Avatar name="PH" tone="#7857C7" md/><div><b>Peter Hudák ml.</b><div className="xs muted">1 pobyt · 2023</div></div></div>
            <button className="btn" style={{width:'100%',justifyContent:'center',marginTop:8}}>{T('Použiť','Use')}</button>
          </div>
          <hr/>
          <h4>{T('Posledné rezervácie','Recent reservations')}</h4>
          <div className="col gap-4 small">
            <div>14:32 · Tomečková G. · 402</div>
            <div>14:10 · Novák J. · 203</div>
            <div>13:58 · Walk-in · hold</div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function NewResGroup(){
  const members = [
    ['1','Adamová Jana','Ž','1962','VšZP','VI/3','D2','Štand.','201'],
    ['2','Adamec Pavol','M','1960','VšZP','VI/4','D2','Štand.','201'],
    ['3','Bachratá Eva','Ž','1957','Dôvera','VII/8','D1','Štand.','202'],
    ['4','Belko Imrich','M','1954','VšZP','VI/3','D2','Štand.','203'],
    ['5','Bednárová Mária','Ž','1959','VšZP','VI/2','D9','Štand.','—'],
    ['6','Čierna Anna','Ž','1961','Union','VIII/2','D2','Štand.','—'],
    ['7','Demeter Karol','M','1948','VšZP','VI/3','D1','Štand.','—'],
    ['8','Ďurica Štefan','M','1952','VšZP','II/4','D3','Štand.','—'],
  ];
  return (
    <Screen active="grid" wide title={T('Skupinová rezervácia · C-12','Group reservation · C-12')} sub={T('Variant C · autobus 32 osôb · VšZP poukazy · 21 nocí','Variant C · bus 32 ppl · VšZP vouchers · 21 nights')}>
      <div className="row" style={{height:'100%'}}>
        <div className="col grow" style={{minWidth:0,overflow:'hidden'}}>
          {/* Group header */}
          <div className="box pad-16" style={{background:'#FBF9F4',borderBottom:'1px solid var(--line-soft)',display:'flex',gap:24}}>
            <div className="col gap-2"><span className="xs upper muted">{T('Názov skupiny','Group name')}</span><b>C-12 · VšZP poukazy · KKL · máj 2026</b></div>
            <div className="col gap-2"><span className="xs upper muted">{T('Organizátor','Organizer')}</span><b>Cestovka Senior Plus</b></div>
            <div className="col gap-2"><span className="xs upper muted">{T('Príchod','Arrival')}</span><b className="num">25. 5. 2026 · 11:30</b></div>
            <div className="col gap-2"><span className="xs upper muted">{T('Odchod','Departure')}</span><b className="num">15. 6. 2026 · do 10:00</b></div>
            <div className="col gap-2"><span className="xs upper muted">{T('Počet','Headcount')}</span><b>32 / 32 · 17 izieb</b></div>
            <div className="col gap-2"><span className="xs upper muted">{T('Doprava','Transport')}</span><b>Autobus · príjazd 3. dvere</b></div>
            <button className="btn primary" style={{marginLeft:'auto'}}>{T('Import manifest CSV','Import manifest CSV')} ↑</button>
          </div>

          {/* Bulk actions */}
          <div className="row gap-8 center pad-12" style={{borderBottom:'1px solid var(--line-soft)'}}>
            <Pill k="ink">8 / 32 {T('priradené','assigned')}</Pill>
            <Pill k="warn">24 {T('bez izby','no room')}</Pill>
            <span className="grow"></span>
            <button className="btn">{T('Auto-priradiť izby','Auto-assign rooms')}</button>
            <button className="btn">{T('Páry → 2L izby','Pair couples → 2L')}</button>
            <button className="btn">{T('Hromadne nastaviť diétu','Bulk set diet')}</button>
            <button className="btn accent">{T('Predpárovať','Pre-assign')}</button>
          </div>

          {/* Members table */}
          <div className="grow" style={{overflowY:'auto'}}>
            <table className="tbl">
              <thead><tr>
                <th>#</th><th>{T('Účastník','Member')}</th><th>{T('Pohl.','Sex')}</th><th>{T('Rok','Year')}</th><th>{T('ZP','Ins.')}</th><th>{T('Dx','Dx')}</th><th>{T('Diéta','Diet')}</th><th>{T('Kategória','Cat')}</th><th>{T('Izba','Room')}</th><th></th>
              </tr></thead>
              <tbody>
              {members.map((m,i)=>(
                <tr key={i}>
                  <td className="num">{m[0]}</td>
                  <td><b>{m[1]}</b></td>
                  <td>{m[2]}</td>
                  <td className="num">{m[3]}</td>
                  <td>{m[4]}</td>
                  <td><Pill k="med">{m[5]}</Pill></td>
                  <td><Pill>{m[6]}</Pill></td>
                  <td>{m[7]}</td>
                  <td>{m[8]==='—' ? <span className="pill warn">{T('priradiť','assign')}</span> : <span className="num">{m[8]}</span>}</td>
                  <td><button className="btn sm ghost">⋯</button></td>
                </tr>
              ))}
              <tr><td colSpan="10" className="muted xs" style={{textAlign:'center',padding:14}}>… + 24 ďalších členov skupiny …</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: room blocks */}
        <div className="col pad-16 gap-12" style={{flex:'0 0 300px',background:'#FBF9F4',borderLeft:'1px solid var(--line-soft)'}}>
          <h4>{T('Blok izieb','Room block')}</h4>
          <div className="col gap-6">
            <div className="box r pad-8 small"><b>Astória 201–212</b> <span className="grow"></span><span className="pill ok">12 / 12</span></div>
            <div className="box r pad-8 small"><b>Astória 213–217</b> <span className="grow"></span><span className="pill warn">3 / 5</span></div>
            <div className="box r pad-8 small dash"><b>Ozón 301–303</b> <span className="grow"></span><span className="pill">{T('rezerva','backup')}</span></div>
          </div>
          <hr/>
          <h4>{T('Diétny rozpis','Diet breakdown')}</h4>
          <div className="col gap-4 small">
            <div className="row between"><span>D2 · základná</span><b>18</b></div>
            <div className="row between"><span>D1 · ľahká</span><b>9</b></div>
            <div className="row between"><span>D9 · redukčná</span><b>3</b></div>
            <div className="row between"><span>D3 · diabet.</span><b>2</b></div>
          </div>
          <hr/>
          <h4>{T('Indikácie · M4 pohľad','Indications · M4 view')}</h4>
          <div className="col gap-4 small">
            <div>VI/2–4 · pohyb. · <b>23</b></div>
            <div>VII/8 · nerv. · <b>5</b></div>
            <div>II/4 · obeh. · <b>3</b></div>
            <div>VIII/2 · obl. · <b>1</b></div>
          </div>
          <Note x={6} y={520} w={250} rot={1}>Pri skupinách je toto rozdelenie zlato — M5 podľa toho rozdelí procedúry.</Note>
        </div>
      </div>
    </Screen>
  );
}

window.NewResWizard = NewResWizard;
window.NewResQuick = NewResQuick;
window.NewResGroup = NewResGroup;
