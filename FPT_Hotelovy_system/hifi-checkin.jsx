/* ── Hi-Fi · Check-in (one-screen) ───────────────────────────── */

function HFCheckin(){
  const nav = useNav();
  return (
    <HFScreen
      active="grid"
      title={Tr('Check-in · Ing. Jozef Novák','Check-in · Ing. Jozef Novák')}
      sub={Tr('Rezervácia R-2026-1248 · jedna obrazovka · cieľ ≤ 90s','Reservation R-2026-1248 · one screen · ≤ 90s')}
      actions={<>
        <button className="btn ghost" onClick={()=>nav.go('grid')}>{Tr('Zrušiť','Cancel')}</button>
        <button className="btn" onClick={()=>{nav.toast(Tr('Koncept uložený','Draft saved')); nav.go('grid');}}>{Tr('Uložiť koncept','Save draft')}</button>
        <button className="btn accent" onClick={()=>{nav.toast(Tr('✓ Check-in dokončený · Novák · izba 203','✓ Check-in done · Novák · 203')); nav.go('grid');}}><Icon n="key" size={14}/> {Tr('Dokončiť check-in','Complete check-in')}</button>
      </>}>

      <div className="col gap-16" style={{height:'100%'}}>
        {/* Guest banner */}
        <div className="card pad-20 row gap-20 center">
          <Av name="JN" sz="xl"/>
          <div className="col" style={{lineHeight:1.2}}>
            <div className="row center gap-8">
              <h1 style={{fontSize:24}}>Ing. Jozef Novák</h1>
              <P k="bad">VIP</P>
              <P>D2</P>
              <P k="ok">VšZP</P>
              <P k="plum">KKL · Klasická</P>
            </div>
            <div className="muted small" style={{marginTop:6}}>
              SK · *15. 4. 1957 (68 r.) · ID 8042 · klient od 2014 · <b>8 predch. pobytov</b>
            </div>
          </div>
          <div className="grow"/>
          <div className="col" style={{textAlign:'right',lineHeight:1.3}}>
            <div className="eyebrow">{Tr('POBYT','STAY')}</div>
            <div style={{fontFamily:'Plus Jakarta Sans',fontSize:18,fontWeight:700,letterSpacing:'-0.01em'}}>21. 5. – 11. 6. 2026</div>
            <div className="muted small">21 nocí · KKL · izba <b className="num">203</b> · Superior Park</div>
          </div>
        </div>

        {/* 3-step cards */}
        <div className="row gap-16 grow" style={{minHeight:0}}>
          {/* 1 · Documents */}
          <div className="card grow col">
            <div className="pad-16" style={{borderBottom:'1px solid var(--line)'}}>
              <div className="row center gap-10">
                <div className="av" style={{background:'var(--ok)',color:'#fff'}}>1</div>
                <div className="col" style={{lineHeight:1.2}}>
                  <h3>{Tr('Doklady','Documents')}</h3>
                  <div className="xs muted">{Tr('3 / 3 · pripravené','3 / 3 · ready')}</div>
                </div>
                <span className="grow"/>
                <P k="ok">✓</P>
              </div>
            </div>
            <div className="col gap-10 pad-16">
              <div className="panel pad-12 row center gap-12">
                <div style={{width:48,height:36,background:'linear-gradient(135deg,#DCE5FF,#fff)',border:'1px solid var(--line)',borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,letterSpacing:'.05em',color:'var(--blue)'}}>OP</div>
                <div className="col grow" style={{lineHeight:1.25}}>
                  <b>{Tr('Občiansky preukaz','ID card')}</b>
                  <div className="xs muted">SK · platný do 2031</div>
                </div>
                <P k="ok">{Tr('skenovaný','scanned')}</P>
              </div>
              <div className="panel pad-12 row center gap-12">
                <div style={{width:48,height:36,background:'linear-gradient(135deg,#DDF1E7,#fff)',border:'1px solid var(--line)',borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,letterSpacing:'.05em',color:'var(--ok)'}}>ZP</div>
                <div className="col grow" style={{lineHeight:1.25}}>
                  <b>{Tr('VšZP · poukaz','VšZP · voucher')}</b>
                  <div className="xs muted mono">VS-2026-148771 · schvál. 5. 5.</div>
                </div>
                <P k="ok">{Tr('overené','verified')}</P>
              </div>
              <div className="panel pad-12 row center gap-12">
                <div style={{width:48,height:36,background:'#fff',border:'1.5px dashed var(--line-strong)',borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Icon n="medical" size={16} c="#8B92AC"/>
                </div>
                <div className="col grow" style={{lineHeight:1.25}}>
                  <b>{Tr('Podpis registrácie','Registration signature')}</b>
                  <div className="xs muted">{Tr('signpad alebo e-podpis','signpad or e-sign')}</div>
                </div>
                <button className="btn primary sm">{Tr('Podpísať','Sign')}</button>
              </div>
              <div className="muted xs" style={{marginTop:4}}>{Tr('GDPR súhlas · podpísaný 5/2024 · platí ďalšie 2 roky','GDPR consent · signed 5/2024')}</div>
            </div>
          </div>

          {/* 2 · Room */}
          <div className="card grow col">
            <div className="pad-16" style={{borderBottom:'1px solid var(--line)'}}>
              <div className="row center gap-10">
                <div className="av" style={{background:'var(--blue)',color:'#fff'}}>2</div>
                <div className="col" style={{lineHeight:1.2}}>
                  <h3>{Tr('Izba 203','Room 203')}</h3>
                  <div className="xs muted">{Tr('Superior Park · Astória · 24 m²','Superior Park · Astória · 24 m²')}</div>
                </div>
                <span className="grow"/>
                <P k="ok"><Icon n="bed" size={11}/> {Tr('Pripravená','Ready')}</P>
              </div>
            </div>
            <div className="col pad-16 gap-10">
              <div className="row gap-8 wrap">
                {['📺 TV','📶 Wi-Fi','❄️ Klíma','🛁 Vaňa','🚿 Sprcha','🌳 Park'].map(t=>(
                  <span key={t} className="pill outline">{t}</span>
                ))}
              </div>
              <div className="panel pad-12 col gap-8">
                <div className="eyebrow">{Tr('NÁVRHY ÚPGRADOV','UPGRADE SUGGESTIONS')}</div>
                <div style={{padding:10,background:'linear-gradient(135deg,#D9F4FA,#fff)',border:'1.5px solid var(--cyan)',borderRadius:8}}>
                  <div className="row center gap-8">
                    <span className="pill cyan">+28 €/n</span>
                    <b style={{fontSize:13}}>{Tr('Premium Spa · izba 401','Premium Spa · 401')}</b>
                  </div>
                  <div className="xs muted" style={{marginTop:4}}>{Tr('Voľná 21n · vaňa pre 2 · balkón','Free 21n · whirlpool · balcony')}</div>
                  <button className="btn accent sm" style={{marginTop:8}}>{Tr('Ponúknuť hosťovi','Offer to guest')}</button>
                </div>
              </div>
              <div className="field">
                <label>{Tr('Špec. požiadavky pri check-ine','Check-in requests')}</label>
                <textarea rows="3" defaultValue="Tichá izba (potvrdené), vyšší vankúš, káva 7:00 každý deň."/>
              </div>
            </div>
          </div>

          {/* 3 · Payment */}
          <div className="card grow col">
            <div className="pad-16" style={{borderBottom:'1px solid var(--line)'}}>
              <div className="row center gap-10">
                <div className="av" style={{background:'var(--plum)',color:'#fff'}}>3</div>
                <div className="col" style={{lineHeight:1.2}}>
                  <h3>{Tr('Platba & depozit','Payment & deposit')}</h3>
                  <div className="xs muted">{Tr('Spôsob a depozit','Method & deposit')}</div>
                </div>
                <span className="grow"/>
                <P k="warn">{Tr('Doplatok 991 €','Settle 991 €')}</P>
              </div>
            </div>
            <div className="col pad-16 gap-10">
              <div className="panel pad-12 col gap-4 small">
                <div className="row between"><span className="muted">{Tr('Pobyt celkom','Stay total')}</span><span className="num">2 940 €</span></div>
                <div className="row between"><span className="muted">{Tr('ZP hradí','Insurance covers')}</span><span className="num status-ok">– 1 470 €</span></div>
                <div className="row between"><span className="muted">{Tr('Záloha online','Online deposit')}</span><span className="num status-ok">– 500 €</span></div>
                <div className="row between"><span className="muted">{Tr('Mestský poplatok','City tax')}</span><span className="num">+ 21 €</span></div>
                <hr/>
                <div className="row between"><b>{Tr('Doplatok pri pobyte','To settle')}</b><b className="num" style={{fontSize:16,color:'var(--blue)',fontFamily:'Plus Jakarta Sans'}}>991 €</b></div>
              </div>

              <div className="col gap-6">
                <div className="eyebrow">{Tr('DEPOZIT TERAZ','DEPOSIT NOW')}</div>
                <div className="row gap-6">
                  <input type="text" defaultValue="100 €" style={{width:96}}/>
                  <select style={{flex:1}}><option>Karta · pre-auth (VISA)</option><option>Hotovosť</option></select>
                </div>
              </div>
              <div className="col gap-6">
                <div className="eyebrow">{Tr('SPÔSOB DOPLATKU','SETTLE METHOD')}</div>
                <div className="seg" style={{alignSelf:'flex-start'}}>
                  <div className="s on">{Tr('Pri odchode','At departure')}</div>
                  <div className="s">{Tr('Teraz','Now')}</div>
                  <div className="s">{Tr('Faktúra','Invoice')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linked modules row */}
        <div className="row gap-12">
          {[
            { c:'#7857C7', sub:'M4', tag:Tr('VSTUPNÁ LEK. PREHL.','INITIAL EXAM'), main:'22. 5. · 09:00', detail: Tr('Dr. Lipták · ord. 8','Dr. Lipták · room 8') },
            { c:'#5DD3E8', sub:'M5', tag:Tr('PROCEDÚRY','PROCEDURES'), main:Tr('21 d × 3 procedúry','21d × 3 procs'), detail: Tr('aktivované po prehliadke','activated after exam') },
            { c:'#2FA76E', sub:'Reštaurácia', tag:Tr('DIÉTA D2','DIET D2'), main:Tr('Večera od 18:00','Dinner 6pm'), detail: Tr('stôl 12 · bez orechov','table 12 · no nuts') },
            { c:'#E8930B', sub:'HK', tag:Tr('HOUSEKEEPING','HOUSEKEEPING'), main:Tr('Káva 7:00 každý deň','Coffee 7am daily'), detail: Tr('+ vyšší vankúš','+ extra pillow') },
          ].map((m,i)=>(
            <div key={i} className="card pad-14 grow row gap-10 center" style={{borderLeft:`3px solid ${m.c}`}}>
              <div className="av" style={{background:m.c,color:m.c==='#5DD3E8'?'#0E3640':'#fff',width:34,height:34,fontSize:11,fontWeight:800}}>↗</div>
              <div className="col" style={{lineHeight:1.2,minWidth:0,flex:1}}>
                <div className="eyebrow" style={{fontSize:9.5}}>{m.sub} · {m.tag}</div>
                <div style={{fontWeight:600,fontSize:12.5,marginTop:2}}>{m.main}</div>
                <div className="xs muted" style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{m.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HFScreen>
  );
}
window.HFCheckin = HFCheckin;
