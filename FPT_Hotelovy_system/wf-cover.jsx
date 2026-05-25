function Cover(){
  return (
    <div className="wf" style={{position:'absolute',inset:0,padding:36,background:'#FBFAF6',overflow:'hidden'}}>
      <div className="row between" style={{alignItems:'flex-start'}}>
        <div>
          <div className="hand" style={{fontSize:46,lineHeight:1,color:'#0F1F4D'}}>Front Office</div>
          <div className="hand" style={{fontSize:34,color:'#1B6FDB',marginTop:-4}}>Kúpele Bardejov · Modul 2</div>
          <div style={{marginTop:14,maxWidth:620,fontSize:13,color:'#2A2F45'}}>
            Wireframy pre denný workflow recepčného. Cieľ: nahradiť GUBI Front Office čistejším,
            rýchlejším systémom — menej klikov, väčší font, viditeľné špeciálne požiadavky,
            ľahké zmeny rezervácií, plynulé prepojenie s modulmi <b>M4 (Lekár)</b> a <b>M5 (Procedúry)</b>.
          </div>
        </div>
        <div className="col gap-8" style={{alignItems:'flex-end'}}>
          <div className="pill ink" style={{fontSize:12,padding:'4px 12px'}}>v1 · 21 artboards</div>
          <div className="pill" style={{fontSize:11}}>SK / EN · prepínateľné v Tweaks</div>
          <div className="pill" style={{fontSize:11}}>1440px · Recepčný desktop</div>
          <div className="pill" style={{fontSize:11}}>FPT Digital — Navy & Blue</div>
        </div>
      </div>

      <div className="row gap-24" style={{marginTop:28}}>
        {/* GUBI problems → our answers */}
        <div className="grow box r pad-16" style={{background:'#fff'}}>
          <h4 style={{marginBottom:10}}>Problémy GUBI → naše odpovede</h4>
          <div className="col gap-8" style={{fontSize:11.5}}>
            {[
              ['Veľa klikov na check-in','One-screen check-in s podpisom + dokladmi v 1 paneli'],
              ['Skryté funkcie v podmenu','Ploché IA, viditeľný sidebar, ⌘K command palette'],
              ['Zlé hľadanie dostupnosti','Mriežka s drag-to-select, smart filter (typ, balík, ZP)'],
              ['Ťažké zmeny rezervácie','Drag rezerváciu medzi izbami priamo v mriežke'],
              ['Chýba prehľad špec. požiadaviek','Farebné tagy + ikony stále viditeľné v mriežke aj DB'],
              ['Pomalé načítavanie','Lokálny state, optimistic UI (nie zaťažuje UX)'],
              ['Príliš veľa povinných polí','Quick-create s 6 poľami → doplniť pri check-ine'],
              ['Komplikované platby/depozit','Kasa s split-pay, depozit ako stav, nie modal'],
              ['Drobné písmo, zlé ikony','Min 12px UI, 14px tabuľky, ikony s textovými popismi'],
            ].map((row,i) => (
              <div key={i} className="row gap-8">
                <div style={{flex:'0 0 220px'}} className="muted">⚠ {row[0]}</div>
                <div style={{flex:1}}>→ <b>{row[1]}</b></div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="col gap-12" style={{flex:'0 0 320px'}}>
          <div className="box r pad-12">
            <h4 style={{marginBottom:8}}>Legenda · pásy rezervácií</h4>
            <div className="col gap-4" style={{fontSize:11}}>
              <div className="row gap-8 center"><div className="resv a" style={{width:90}}>conf.</div><span>Potvrdená</span></div>
              <div className="row gap-8 center"><div className="resv b" style={{width:90}}>checked-in</div><span>Hosť na izbe</span></div>
              <div className="row gap-8 center"><div className="resv held" style={{width:90}}>option</div><span>Predbežná (hold 24h)</span></div>
              <div className="row gap-8 center"><div className="resv f" style={{width:90}}>HK</div><span>Údržba / blok</span></div>
              <div className="row gap-8 center"><div className="resv d" style={{width:90}}>group</div><span>Skupinová</span></div>
            </div>
          </div>
          <div className="box r pad-12">
            <h4 style={{marginBottom:8}}>Legenda · ikony hosťa</h4>
            <div className="col gap-4" style={{fontSize:11}}>
              <div className="row gap-8 center"><span className="pill med">⚕ Dx VI/3</span><span>Indikácia (MKCH/Indikačný)</span></div>
              <div className="row gap-8 center"><span className="pill warn">⚠ Alergia</span><span>Alergia / kontraindikácia</span></div>
              <div className="row gap-8 center"><span className="pill ok">ZP</span><span>Cez zdrav. poisťovňu</span></div>
              <div className="row gap-8 center"><span className="pill">D2</span><span>Diétny režim</span></div>
              <div className="row gap-8 center"><span className="pill bad">VIP</span><span>VIP / opakovaný hosť</span></div>
            </div>
          </div>
          <div className="stickynote" style={{transform:'rotate(-1deg)',maxWidth:300}}>
            Wireframe vibe: štruktúrované lo-fi, nie sketchy. Hi-fi farby a Gilroy/Graphik pridáme v ďalšom kole.
          </div>
        </div>
      </div>
    </div>
  );
}
window.Cover = Cover;
