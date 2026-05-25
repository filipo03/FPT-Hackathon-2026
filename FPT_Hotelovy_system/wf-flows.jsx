/* ── Sitemap + 3 user flows ──────────────────────────────────── */

function FlowCard({ k, children, w, sub }){
  return (
    <div className={`flow-card ${k||''}`} style={{minWidth: w||130, padding:'8px 10px'}}>
      <div style={{lineHeight:1.15}}>{children}</div>
      {sub && <div style={{fontSize:9,opacity:.75,marginTop:3,fontWeight:500}}>{sub}</div>}
    </div>
  );
}
function ArrowRight({ w=24, dashed=false }){
  return <div style={{flex:'0 0 '+w+'px',display:'flex',alignItems:'center'}}>
    <div style={{height:0,borderTop:`1.2px ${dashed?'dashed':'solid'} #0F1F4D`,width:'100%',position:'relative'}}>
      <div style={{position:'absolute',right:-1,top:-4,width:0,height:0,borderLeft:'7px solid #0F1F4D',borderTop:'4px solid transparent',borderBottom:'4px solid transparent'}}/>
    </div>
  </div>;
}
function FlowSwim({ title, sub, children, w }){
  return (
    <div style={{minWidth:w||180}}>
      <div className="upper xs muted" style={{marginBottom:6,letterSpacing:'.1em'}}>{title}</div>
      <div className="col gap-8">{children}</div>
      {sub && <div className="muted xs" style={{marginTop:6}}>{sub}</div>}
    </div>
  );
}

function Sitemap(){
  return (
    <div className="wf" style={{position:'absolute',inset:0,padding:30,background:'#FBFAF6',overflow:'hidden'}}>
      <div className="row between center" style={{marginBottom:14}}>
        <div>
          <h1>Sitemap · IA modulu</h1>
          <div className="muted small">Plochá hierarchia, 7 hlavných sekcií. Všetko ostatné je 1 klik z mriežky alebo ⌘K.</div>
        </div>
        <div className="row gap-8">
          <span className="pill">M2 · Hotelový systém</span>
          <span className="pill tint">↔ M4 Lekár</span>
          <span className="pill tint">↔ M5 Procedúry</span>
          <span className="pill tint">↔ M1/M3 Rezervácie</span>
        </div>
      </div>

      {/* Top: 7 main sections */}
      <div className="row gap-12" style={{justifyContent:'space-between'}}>
        {[
          {t:'Prehľad', sub:'KPI, dnes, úlohy', items:['Timeline dňa','Arrivals / departures','Úlohy zmeny','Voľné izby']},
          {t:'Rezervácie', sub:'Mriežka, zoznam', items:['Šachovnica izieb','Týždenné pásy','Zoznam rezervácií','Pending hold']},
          {t:'Hostia / pacienti', sub:'Profily, dokumenty', items:['Profil hosťa','Indikácie / Dx','História pobytov','Dokumenty / sken OP']},
          {t:'Izby & HK', sub:'Stav, blok, údržba', items:['Plán izieb','Housekeeping','Údržba / blok','Strata & nález']},
          {t:'Procedúry', sub:'Pohľad recepčné', items:['Harmonogram hosťa','Konflikty s pobytom','Žiadosti o zmenu']},
          {t:'Kasa & faktúry', sub:'Účet, platby, depozit', items:['Folio hosťa','Platby / split','Depozity','Storná, dobropisy']},
          {t:'Reporty', sub:'Operatíva', items:['Obsadenosť','No-show / storná','Pôvod hostí','Tržby zmeny']},
        ].map((c,i) => (
          <div key={i} className="col" style={{flex:1,gap:8}}>
            <div className="box ink r pad-12" style={{textAlign:'center'}}>
              <div style={{fontSize:13,fontWeight:700}}>{c.t}</div>
              <div className="xs" style={{opacity:.8,marginTop:2}}>{c.sub}</div>
            </div>
            <div style={{height:18,width:1,background:'#0F1F4D',margin:'0 auto'}}></div>
            <div className="col gap-4">
              {c.items.map((it,j) => (
                <div key={j} className="box r pad-8" style={{fontSize:11}}>{it}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: cross-cutting */}
      <div className="row gap-12" style={{marginTop:24}}>
        <div className="box dash r pad-12 grow">
          <h4 style={{marginBottom:8}}>Vždy dostupné</h4>
          <div className="row gap-8 wrap">
            <span className="pill accent">⌘K · Global search</span>
            <span className="pill">🔔 Notifikácie</span>
            <span className="pill">☑ Úlohy zmeny</span>
            <span className="pill">+ Nová rezervácia</span>
            <span className="pill">⇄ Prepnúť zmenu</span>
            <span className="pill tint">SK ↔ EN</span>
          </div>
        </div>
        <div className="box dash r pad-12" style={{flex:'0 0 360px'}}>
          <h4 style={{marginBottom:8}}>Integrácie</h4>
          <div className="col gap-4 small">
            <div>↗ <b>M1/M3 Rezervácie</b> — webový kanál, partneri (read+write)</div>
            <div>↗ <b>M4 Lekár</b> — vstupná prehliadka, indikácie (read)</div>
            <div>↗ <b>M5 Procedúry</b> — harmonogram hosťa (read+notify)</div>
            <div>↗ <b>Reštaurácia</b> — diétny režim (write)</div>
            <div>↗ <b>ZP rozhrania</b> — VšZP, Dôvera, Union, ZP MV (read)</div>
          </div>
        </div>
      </div>

      <Note x={32} y={150} w={210} rot={-2}>Recepčný používa hlavne 3 sekcie: Prehľad, Rezervácie, Hostia. Tie sú v sidebare hore.</Note>
    </div>
  );
}

function FlowArrival(){
  return (
    <div className="wf" style={{position:'absolute',inset:0,padding:28,background:'#FBFAF6',overflow:'hidden'}}>
      <div className="row between center" style={{marginBottom:14}}>
        <div><h1>Flow · Príchod hosťa (single)</h1>
        <div className="muted small">Bežný scenár — hosť príde s OP, je objednaný. Cieľ: pod 90 sekúnd.</div></div>
        <div className="row gap-8">
          <span className="pill ok">≤ 90s · cieľ</span>
          <span className="pill">≤ 5 klikov</span>
        </div>
      </div>

      <div className="row center" style={{gap:0,flexWrap:'nowrap',overflow:'hidden'}}>
        <FlowCard k="start" w={120}>Hosť pri pulte</FlowCard>
        <ArrowRight/>
        <FlowCard w={140} sub="meno / rezerv. č. / autobus">⌘K · Vyhľadať</FlowCard>
        <ArrowRight/>
        <FlowCard w={150} sub="dnes 6 príchodov">Karta rezervácie</FlowCard>
        <ArrowRight/>
        <FlowCard w={160} sub="OP/cestovný doklad">Skenovať doklad</FlowCard>
        <ArrowRight/>
        <FlowCard w={150} sub="rovnaká kategória OK">Potvrdiť izbu</FlowCard>
        <ArrowRight/>
        <FlowCard w={150} sub="signpad / e-podpis">Podpis registr.</FlowCard>
        <ArrowRight/>
        <FlowCard w={140} sub="strava + procedúry">Kľúč / náramok</FlowCard>
        <ArrowRight/>
        <FlowCard k="end" w={150}>Hosť odchádza na izbu</FlowCard>
      </div>

      <div className="row gap-16" style={{marginTop:30}}>
        <FlowSwim title="Recepčný" w={260}>
          <div className="box r pad-8 small">Skener OP — automatický fill</div>
          <div className="box r pad-8 small">Ak voľná lepšia izba → ponúkne upgrade (1 klik)</div>
          <div className="box r pad-8 small">Vytlačí náramok + harmonogram procedúr</div>
        </FlowSwim>
        <div className="vline"></div>
        <FlowSwim title="Systém · M2" w={260}>
          <div className="box tint r pad-8 small">Označí ako „checked-in" v mriežke</div>
          <div className="box tint r pad-8 small">Otvorí folio, depozit voliteľný</div>
          <div className="box tint r pad-8 small">Pošle notifikáciu HK „izba 203 obsadená"</div>
        </FlowSwim>
        <div className="vline"></div>
        <FlowSwim title="Integrácie" w={300}>
          <div className="box dash r pad-8 small">↗ M4: pripraviť vstupnú prehliadku zajtra 9:00</div>
          <div className="box dash r pad-8 small">↗ M5: harmonogram procedúr aktivovať</div>
          <div className="box dash r pad-8 small">↗ Reštaurácia: diéta D2 od večere</div>
        </FlowSwim>
        <Note x={1500} y={150} w={300} rot={1.5}>
          Edge case: ak nie je objednaný (walk-in) → cesta sa rozšíri o „Nová rezervácia · quick"
        </Note>
      </div>
    </div>
  );
}

function FlowGroup(){
  return (
    <div className="wf" style={{position:'absolute',inset:0,padding:28,background:'#FBFAF6',overflow:'hidden'}}>
      <div className="row between center" style={{marginBottom:14}}>
        <div><h1>Flow · Skupinový príchod (autobus 32 osôb)</h1>
        <div className="muted small">Bottleneck v GUBI. Cieľ: paralelný check-in tímom 2 recepčných, hosť pri pulte ≤ 60s.</div></div>
        <span className="pill warn">Pain point GUBI</span>
      </div>

      <div className="row center" style={{gap:0,flexWrap:'nowrap',overflow:'hidden'}}>
        <FlowCard k="start" w={150}>Avízo (deň pred)</FlowCard>
        <ArrowRight/>
        <FlowCard w={170} sub="zoznam · CSV/Excel">Predpriradiť izby (mass)</FlowCard>
        <ArrowRight/>
        <FlowCard w={150} sub="bus prichádza">Skupina pred recepciou</FlowCard>
        <ArrowRight/>
        <FlowCard w={170} sub="2 recepční paralelne">Skupinový check-in</FlowCard>
        <ArrowRight/>
        <FlowCard w={160} sub="OP scan, podpis">Po jednom</FlowCard>
        <ArrowRight/>
        <FlowCard w={170} sub="auto + farebne">Kľúče + náramky</FlowCard>
        <ArrowRight/>
        <FlowCard k="end" w={180}>Hromadná notifikácia HK/M5</FlowCard>
      </div>

      <div className="row gap-12" style={{marginTop:28}}>
        <div className="box r pad-12 grow">
          <h4 style={{marginBottom:8}}>Zlepšenia voči GUBI</h4>
          <div className="col gap-4 small">
            <div>• <b>Mass-assign:</b> drag celej skupiny do bloku izieb naraz</div>
            <div>• <b>Bus manifest:</b> CSV import s automatickým predpárovaním podľa pohlavia, izby pre páry</div>
            <div>• <b>Paralelný režim:</b> dvaja recepční vidia, koho práve odbavujú → žiadne duplicity</div>
            <div>• <b>Tlač balíčka:</b> 1 klik = náramok + harmonogram + mapa kúpeľov pre celú skupinu</div>
          </div>
        </div>
        <div className="box tint r pad-12" style={{flex:'0 0 380px'}}>
          <h4 style={{marginBottom:8}}>Špecifické pre kúpele</h4>
          <div className="col gap-4 small">
            <div>• Indikácie a kontraindikácie vidieť pred prijatím (z M4)</div>
            <div>• Diéta D1/D2/D3 sa hromadne pošle do reštaurácie</div>
            <div>• M5 dostane manifest pre rozdelenie procedúr na 5 dní</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowChange(){
  return (
    <div className="wf" style={{position:'absolute',inset:0,padding:28,background:'#FBFAF6',overflow:'hidden'}}>
      <div className="row between center" style={{marginBottom:14}}>
        <div><h1>Flow · Zmena existujúcej rezervácie</h1>
        <div className="muted small">Z GUBI najbolestivejšia operácia. Cieľ: zmena izby = drag & drop v mriežke.</div></div>
        <span className="pill warn">Pain point GUBI</span>
      </div>

      <div className="row center" style={{gap:0,flexWrap:'nowrap',overflow:'hidden'}}>
        <FlowCard k="start" w={170}>Hosť volá: chcem zmenu</FlowCard>
        <ArrowRight/>
        <FlowCard w={150} sub="meno alebo č.">⌘K vyhľadať</FlowCard>
        <ArrowRight/>
        <FlowCard w={170} sub="3 typy zmien">Rozhodnutie</FlowCard>
        <ArrowRight dashed/>
        <FlowCard k="deco" w={170}>Drag v mriežke</FlowCard>
        <FlowCard w={170} sub="systém ukáže rozdiel">Cenová kalkulácia</FlowCard>
        <ArrowRight/>
        <FlowCard w={150} sub="email / SMS">Potvrdenie hosťovi</FlowCard>
        <ArrowRight/>
        <FlowCard k="end" w={150}>Uložené</FlowCard>
      </div>

      <div className="row gap-16" style={{marginTop:28}}>
        <FlowSwim title="3 typy zmien">
          <div className="box r pad-8 small"><b>Zmena izby</b> · drag rezervácie na inú izbu v mriežke</div>
          <div className="box r pad-8 small"><b>Zmena dátumu</b> · roztiahnuť hranu pásu (resize)</div>
          <div className="box r pad-8 small"><b>Zmena balíka / diéty</b> · v detaile rezervácie</div>
        </FlowSwim>
        <FlowSwim title="Čo systém riadi za teba">
          <div className="box tint r pad-8 small">Skontroluje, či nová izba má rovnakú kategóriu</div>
          <div className="box tint r pad-8 small">Ak je v inej kategórii → ponúkne doplatok / kredit</div>
          <div className="box tint r pad-8 small">Skontroluje konflikt s procedúrami v M5</div>
          <div className="box tint r pad-8 small">Notifikuje housekeeping (nová izba má byť pripravená)</div>
        </FlowSwim>
        <Note x={1500} y={150} w={300} rot={-1.5}>
          Klient zdôraznil: „ťažké upravovanie rezervácií" — toto je hlavná hodnota nového systému.
        </Note>
      </div>
    </div>
  );
}

window.Sitemap = Sitemap;
window.FlowArrival = FlowArrival;
window.FlowGroup = FlowGroup;
window.FlowChange = FlowChange;
