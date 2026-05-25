/* ── Hi-Fi · Nová rezervácia · Quick ─────────────────────────── */

function Field({ l, hint, children, w, req }){
  return (
    <div className="field" style={{ flex: w?`0 0 ${w}`:'1 1 0', minWidth:0 }}>
      <label>{l}{req && <span className="req"> *</span>}</label>
      {children}
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}

function HFNewRes(){
  const nav = useNav();
  return (
    <HFScreen
      active="grid"
      title={Tr('Nová rezervácia · Quick','New reservation · Quick')}
      sub={Tr('6 polí · zvyšok doplníš pri check-ine · ≤ 20 sekúnd','6 fields · finish at check-in · ≤ 20 seconds')}
      actions={<>
        <button className="btn" onClick={()=>{nav.toast(Tr('Hold uložený · 24h','Hold saved · 24h')); nav.go('grid');}}>{Tr('Uložiť ako hold (24h)','Save as hold (24h)')}</button>
        <button className="btn accent" onClick={()=>{nav.toast(Tr('✓ Rezervácia vytvorená · Hudák P. · 205','✓ Reservation created · Hudák P. · 205')); nav.go('grid');}}><Icon n="plus" size={14}/> {Tr('Vytvoriť','Create')}</button>
      </>}>

      <div className="row gap-16" style={{height:'100%'}}>
        {/* Main column */}
        <div className="col gap-16 grow" style={{minWidth:0,overflowY:'auto'}}>
          {/* The 6 essentials */}
          <div className="card pad-20">
            <div className="row between center" style={{marginBottom:14}}>
              <div className="col" style={{lineHeight:1.2}}>
                <div className="eyebrow">{Tr('ZÁKLADNÉ POLIA · 1 / 1','REQUIRED FIELDS · 1 / 1')}</div>
                <h3 style={{marginTop:2}}>{Tr('Iba 6 polí · zvyšok pri check-ine','Only 6 fields · rest at check-in')}</h3>
              </div>
              <span className="pill ok lg">≤ 20 s</span>
            </div>
            <div className="row gap-12 wrap">
              <Field l={Tr('Meno hosťa','Guest name')} w="280px" req>
                <input type="text" defaultValue="Hudák Peter"/>
              </Field>
              <Field l={Tr('Telefón','Phone')} w="180px" req>
                <input type="tel" defaultValue="+421 905 123 456"/>
              </Field>
              <Field l={Tr('Príchod','Arrival')} w="160px" req>
                <input type="date" defaultValue="2026-05-21"/>
              </Field>
              <Field l={Tr('Nocí','Nights')} w="80px" req>
                <input type="number" defaultValue="5"/>
              </Field>
              <Field l={Tr('Balík','Package')} w="220px" req>
                <select defaultValue="ANS">
                  <option>ANS · Antistresový pobyt (5n)</option>
                  <option>RVK · Relax víkend</option>
                  <option>KKL · Klasická kúpeľná</option>
                  <option>CCO · Cigeľka Comfort</option>
                </select>
              </Field>
              <Field l={Tr('Typ izby','Room type')} req>
                <select><option>Superior</option><option>Štandard</option><option>Premium</option></select>
              </Field>
            </div>
          </div>

          {/* Availability strip */}
          <div className="card">
            <CardHeader
              eyebrow={Tr('DOSTUPNOSŤ','AVAILABILITY')}
              title={Tr('Superior · 21. – 26. máj 2026','Superior · May 21–26')}
              action={<span className="muted small">{Tr('Klikni na izbu pre priradenie','Click a room to assign')}</span>}/>
            <div className="row gap-8 wrap pad-16">
              {[
                ['203','Astória',true,true],
                ['205','Astória',true,false],
                ['303','Ozón',true,false],
                ['402','Alžbeta',true,false],
                ['403','Alžbeta',false,false],
                ['502','Alžbeta',true,false],
                ['503','Alžbeta',true,false],
                ['504','Alžbeta',false,false],
                ['505','Alžbeta',true,false],
                ['601','Alžbeta',true,false],
                ['602','Alžbeta',true,false],
                ['603','Alžbeta',true,false],
              ].map(([n,w,free,sel],i)=>(
                <div key={i}
                  style={{flex:'0 0 96px',height:78,background: sel?'var(--navy)':free?'#fff':'var(--bg-2)',
                    color: sel?'#fff':free?'var(--ink-1)':'var(--ink-4)',
                    border:`1.5px solid ${sel?'var(--navy)':free?'var(--line-strong)':'var(--line)'}`,
                    borderRadius:10,padding:12,cursor:free?'pointer':'not-allowed',
                    display:'flex',flexDirection:'column',justifyContent:'space-between',
                    boxShadow: sel?'0 4px 12px rgba(15,31,77,0.18)':'none'}}>
                  <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:20}}>{n}</div>
                  <div className="col">
                    <div style={{fontSize:10.5,opacity:.85}}>{w}</div>
                    <div style={{fontSize:10,opacity: sel?.85:.6}}>{free? Tr('voľná 5n','free 5n') : Tr('obsadená','taken')}</div>
                  </div>
                  {sel && <div style={{position:'absolute',top:-6,right:-6,width:18,height:18,background:'var(--cyan)',borderRadius:99,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--navy-2)',fontSize:11,fontWeight:700}}>✓</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Optional bag */}
          <div className="card pad-16" style={{borderStyle:'dashed',border:'1.5px dashed var(--line-strong)',background:'transparent'}}>
            <div className="row between center">
              <div className="col" style={{lineHeight:1.2}}>
                <div className="eyebrow">{Tr('VOLITEĽNÉ · DOPLNÍŠ PRI CHECK-INE','OPTIONAL · FILL IN AT CHECK-IN')}</div>
                <div className="muted small" style={{marginTop:4}}>{Tr('Nezdržuj hosťa telefonicky — zoberieme to pri pulte.','Don\'t hold up the phone call — we\'ll catch these at the desk.')}</div>
              </div>
              <button className="btn ghost sm">+ {Tr('Doplniť teraz','Add now')}</button>
            </div>
            <div className="row gap-6 wrap" style={{marginTop:12}}>
              {['OP / pas','Adresa','Email','Diéta','ZP / poukaz','Indikácia (Dx)','Doprava','Spôsob platby','Špec. požiadavky','Spolu cestujúci'].map(t=>(
                <span key={t} className="pill outline" style={{color:'var(--ink-4)'}}>○ {t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="col gap-12" style={{flex:'0 0 320px'}}>
          {/* Similar guests */}
          <div className="card col">
            <div className="pad-16" style={{borderBottom:'1px solid var(--line)'}}>
              <div className="eyebrow">{Tr('AUTO-MATCH · 2 NÁJDENÍ','AUTO-MATCH · 2 FOUND')}</div>
              <h3 style={{marginTop:4}}>{Tr('Podobní hostia v DB','Similar guests in DB')}</h3>
            </div>
            <div className="pad-16 col gap-10">
              <div style={{padding:12,background:'var(--blue-50)',border:'1px solid var(--blue)',borderRadius:8}}>
                <div className="row center gap-10">
                  <Av name="PH" sz="md" tone="linear-gradient(135deg,#DA3B33,#7857C7)"/>
                  <div className="col" style={{lineHeight:1.2}}>
                    <b>Mgr. Peter Hudák</b>
                    <div className="xs muted">12 predch. pobytov · od 2017</div>
                  </div>
                </div>
                <div className="row gap-4 wrap" style={{marginTop:8}}>
                  <P k="bad">VIP</P><P k="plum">Dx VI/2</P><P k="ok">VšZP</P>
                </div>
                <button className="btn primary sm" style={{width:'100%',justifyContent:'center',marginTop:10}}>{Tr('Použiť tento profil','Use this profile')}</button>
              </div>
              <div style={{padding:12,border:'1px solid var(--line)',borderRadius:8}}>
                <div className="row center gap-10">
                  <Av name="PH" sz="md" tone="linear-gradient(135deg,#7857C7,#0F1F4D)"/>
                  <div className="col" style={{lineHeight:1.2}}>
                    <b>Peter Hudák ml.</b>
                    <div className="xs muted">1 pobyt · 2023</div>
                  </div>
                </div>
                <button className="btn sm" style={{width:'100%',justifyContent:'center',marginTop:8}}>{Tr('Použiť','Use')}</button>
              </div>
            </div>
          </div>

          {/* Pricing preview */}
          <div className="card pad-16 col gap-8">
            <div className="eyebrow">{Tr('CENOVÝ ODHAD','PRICE ESTIMATE')}</div>
            <div className="col gap-4 small">
              <div className="row between"><span className="muted">Izba Superior · 5n × 96 €</span><span className="num">480 €</span></div>
              <div className="row between"><span className="muted">Balík ANS</span><span className="num">120 €</span></div>
              <div className="row between"><span className="muted">Diéta D2 · indikatívne</span><span className="num">~ 110 €</span></div>
              <div className="row between"><span className="muted">Mestský poplatok</span><span className="num">7,50 €</span></div>
              <hr/>
              <div className="row between"><b>{Tr('Cena spolu','Total')}</b><b className="num" style={{fontSize:18,fontFamily:'Plus Jakarta Sans'}}>~ 717 €</b></div>
              <div className="row between"><span className="muted xs">{Tr('Záloha požadovaná 30%','Deposit required 30%')}</span><b className="num xs">215 €</b></div>
            </div>
          </div>

          {/* Recent */}
          <div className="card pad-16 col gap-6">
            <div className="eyebrow">{Tr('POSLEDNÉ REZERVÁCIE','RECENT')}</div>
            {[
              ['14:32','Tomečková G.','402 · RVK'],
              ['14:10','Novák J.','203 · KKL'],
              ['13:58','Walk-in · hold','—'],
            ].map((r,i)=>(
              <div key={i} className="row gap-8 center" style={{padding:'4px 0',borderBottom:i<2?'1px dashed var(--line)':'none'}}>
                <span className="num xs muted" style={{flex:'0 0 38px'}}>{r[0]}</span>
                <span className="small grow"><b>{r[1]}</b></span>
                <span className="xs muted">{r[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HFScreen>
  );
}
window.HFNewRes = HFNewRes;
window.HFField = Field;
