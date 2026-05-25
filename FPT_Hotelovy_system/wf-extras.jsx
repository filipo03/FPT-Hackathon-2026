/* ── Reports + Tasks/Log + Command palette ───────────────────── */

function Reports(){
  return (
    <Screen active="rep" wide title={T('Reporty pre recepčného','Reports for reception')} sub={T('Krátke, operatívne · nie strategické dashboardy','Short, operational · not strategic')}
      actions={<><button className="btn">{T('Tlač','Print')}</button><button className="btn">{T('Export CSV','Export CSV')}</button><button className="btn primary">{T('Naplánovať email','Schedule email')}</button></>}>
      <div className="row" style={{height:'100%'}}>
        <div className="col pad-16 gap-12" style={{flex:'0 0 220px',background:'#FBF9F4',borderRight:'1px solid var(--line-soft)'}}>
          <h4>{T('Rýchle reporty','Quick reports')}</h4>
          {[
            ['Obsadenosť dnes · týždeň · mesiac', true],
            ['Príchody / odchody dnes', false],
            ['No-show & storná', false],
            ['Pôvod hostí (krajina, kanál)', false],
            ['Štatistika ZP', false],
            ['Skupiny · obrat', false],
            ['Tržba zmeny / smeny', false],
            ['Vernostné body · top 20', false],
            ['Sťažnosti & pochvaly', false],
          ].map(([t,on],i)=>(
            <div key={i} className={`box r pad-8 small ${on?'tint':''}`} style={{cursor:'pointer'}}>{t}</div>
          ))}
        </div>

        <div className="col grow pad-16 gap-12" style={{overflow:'auto'}}>
          {/* Filter strip */}
          <div className="row gap-8 center">
            <h3>{T('Obsadenosť · 21. 5. – 27. 5. 2026','Occupancy · May 21 – 27')}</h3>
            <span className="grow"></span>
            <Sel w="160px"><option>{T('Tento týždeň','This week')}</option><option>{T('Minulý týždeň','Last week')}</option></Sel>
            <Sel w="140px"><option>{T('Všetky krídla','All wings')}</option><option>Astória</option></Sel>
            <button className="btn">{T('Porovnať s LY','Compare LY')}</button>
          </div>

          {/* Big chart placeholder */}
          <div className="box r pad-16">
            <div className="row between">
              <div className="col">
                <div className="upper xs muted">{T('Priemer týždňa','Week avg')}</div>
                <div className="num" style={{fontSize:36,fontWeight:800}}>87%</div>
                <div className="row gap-4 center xs"><Pill k="ok">+5 b.p. vs. min. týždeň</Pill><span className="muted">192 izieb</span></div>
              </div>
              <div className="grow" style={{margin:'0 24px',position:'relative',height:140}}>
                <svg viewBox="0 0 400 140" style={{width:'100%',height:'100%'}}>
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#1B6FDB" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#1B6FDB" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M 0 100 L 60 60 L 120 70 L 180 30 L 240 40 L 300 20 L 360 35 L 400 25 L 400 140 L 0 140 Z" fill="url(#g)"/>
                  <polyline points="0,100 60,60 120,70 180,30 240,40 300,20 360,35 400,25" stroke="#1B6FDB" strokeWidth="2" fill="none"/>
                  {/* dots */}
                  {[[0,100],[60,60],[120,70],[180,30],[240,40],[300,20],[360,35]].map((p,i)=>(<circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#1B6FDB"/>))}
                  {['Pi','So','Ne','Po','Ut','St','Št'].map((d,i)=>(<text key={i} x={i*60+8} y={132} fontSize="9" fill="#5B6076">{d}</text>))}
                </svg>
              </div>
              <div className="col" style={{flex:'0 0 200px'}}>
                <div className="upper xs muted">{T('Rozpad','Breakdown')}</div>
                <div className="col gap-2 small" style={{marginTop:4}}>
                  <div className="row between"><span>Astória</span><b className="num">92%</b></div>
                  <div className="row between"><span>Ozón</span><b className="num">85%</b></div>
                  <div className="row between"><span>Alžbeta</span><b className="num">81%</b></div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 small reports */}
          <div className="row gap-12">
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('Pôvod hostí','Guest origin')}</h4>
              <div className="col gap-4 small">
                {[
                  ['Slovensko','78%','#0F1F4D'],
                  ['Poľsko','11%','#1B6FDB'],
                  ['Česko','6%','#5DD3E8'],
                  ['Maďarsko','3%','#7857C7'],
                  ['Ostatné','2%','#5B6076'],
                ].map((r,i)=>(
                  <div key={i} className="row center gap-6"><div style={{width:10,height:10,background:r[2],borderRadius:99}}></div><span>{r[0]}</span><span className="grow"></span><b className="num">{r[1]}</b></div>
                ))}
              </div>
            </div>
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('ZP rozdelenie','Insurance split')}</h4>
              <div className="col gap-4 small">
                <div className="row between"><span>VšZP</span><b className="num">52% · 87 hostí</b></div>
                <div className="row between"><span>Dôvera</span><b className="num">21% · 35</b></div>
                <div className="row between"><span>Union</span><b className="num">11% · 18</b></div>
                <div className="row between"><span>NFZ-PL</span><b className="num">8% · 13</b></div>
                <div className="row between"><span>Samoplatca</span><b className="num">8% · 14</b></div>
              </div>
            </div>
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('No-show & storná','No-show & cancel')}</h4>
              <div className="col gap-4 small">
                <div className="row between"><span>{T('No-show tento týždeň','No-show')}</span><b className="num">3</b></div>
                <div className="row between"><span>{T('Storno do 24h','Cancel 24h')}</span><b className="num">5</b></div>
                <div className="row between"><span>{T('Strata tržby','Lost revenue')}</span><b className="num" style={{color:'#D6453B'}}>1 480 €</b></div>
                <div className="row between"><span>{T('Hold expirovaný','Hold expired')}</span><b className="num">7</b></div>
              </div>
            </div>
            <div className="box r pad-12 grow">
              <h4 style={{marginBottom:8}}>{T('Tržba zmeny','Shift revenue')}</h4>
              <div className="col gap-4 small">
                <div className="row between"><span>{T('Hotovosť','Cash')}</span><b className="num">2 380 €</b></div>
                <div className="row between"><span>{T('Karta','Card')}</span><b className="num">8 240 €</b></div>
                <div className="row between"><span>{T('Bank. prevod','Bank tr.')}</span><b className="num">1 860 €</b></div>
                <hr/>
                <div className="row between"><b>{T('Spolu zmena','Total')}</b><b className="num">12 480 €</b></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function TasksLog(){
  return (
    <Screen active="tasks" wide title={T('Úlohy & denník zmien','Tasks & shift log')} sub={T('Tasky pre tím · audit log · odovzdanie zmeny','Team tasks · audit log · handover')}>
      <div className="row" style={{height:'100%'}}>
        {/* Tasks */}
        <div className="col pad-16 gap-12" style={{flex:'0 0 460px',borderRight:'1px solid var(--line-soft)',overflowY:'auto'}}>
          <div className="row between center">
            <h3>{T('Úlohy · 12 otvorených','Tasks · 12 open')}</h3>
            <button className="btn primary sm">+ {T('Nová úloha','New task')}</button>
          </div>
          <div className="row gap-4">
            <Pill k="ink">{T('Moje','Mine')} 5</Pill>
            <Pill>{T('Tímové','Team')} 7</Pill>
            <Pill>{T('Hotové dnes','Done today')} 9</Pill>
          </div>
          {[
            ['Doplniť depozit · Šimko','high', 'Jana','dnes 14:00','Nedoplatené 250 € pri check-ine.'],
            ['Predpárovať skupinu D-04','med','Jana','dnes do konca zmeny','Senior klub Levice, 24 osôb. CSV manifest.'],
            ['Volať: doklad pre 304','low','Jana','keď bude čas','Pavlíková · oskenovať OP pri ďalšom kontakte.'],
            ['Notif. M5 · zmena izby 201','med','Jana','dnes','Nový hosť od 23. 5.'],
            ['Strata: hodinky · Apt. 402','low','Jana','tento týždeň','Bobula nahlásil, šatňa wellness.'],
            ['Zaviezť poukaz VšZP · Sopková','med','M.S.','zajtra 8:00','Originál nedodaný pri check-ine.'],
            ['Vstupný brífing skupiny F-22','high','M.S.','25. 5. 11:00','Privítanie, mapa, harmonogram.'],
          ].map((t,i)=>(
            <div key={i} className="box r pad-12 row gap-12 center">
              <div className="box r-sm" style={{width:16,height:16,flex:'0 0 16px',borderColor: t[1]==='high'?'#D6453B':t[1]==='med'?'#E8B23A':'#5B6076'}}></div>
              <div className="col" style={{flex:1,lineHeight:1.25}}>
                <b>{t[0]}</b>
                <div className="xs muted">{t[4]}</div>
              </div>
              <div className="col" style={{textAlign:'right'}}>
                <Avatar md name={t[2].slice(0,2).toUpperCase()} tone={t[2]==='Jana'?'#1B6FDB':'#7857C7'}/>
                <div className="xs muted" style={{marginTop:4}}>{t[3]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Audit log */}
        <div className="col grow pad-16 gap-8" style={{overflowY:'auto'}}>
          <div className="row between center">
            <h3>{T('Denník zmeny · 21. 5. 06:00 – teraz','Shift log · May 21 6am – now')}</h3>
            <div className="row gap-4">
              <Pill>{T('Iba kritické','Critical only')}</Pill>
              <Pill>{T('Všetko','All')}</Pill>
              <button className="btn">{T('Export PDF','Export PDF')}</button>
            </div>
          </div>

          {[
            ['11:24','📋','Jana','Vytvorila novú rezerváciu','Hudák P. · 21.–26. 5. · ANS · 205'],
            ['11:18','✓','Jana','Check-in dokončený','Ing. Novák J. · izba 203'],
            ['11:02','💳','Jana','Platba prijatá','Bobula · 1 936,50 € · karta'],
            ['10:48','↔','Jana','Presunula rezerváciu','Pavlíková · 304 → 302 (manuál požiad.)'],
            ['10:30','⚠','Systém','Konflikt zistený','Sopková · procedúra po check-oute · 25. 5.'],
            ['10:15','✓','M.S.','Check-out dokončený','Sopková H. · 205 · 842 €'],
            ['09:50','📲','Systém','M5 notif. odoslaná','Změna izby Novák ovplyvnila harmonogram'],
            ['09:15','✓','Jana','Check-in dokončený','Novák +1 · KKL · 21n'],
            ['08:00','🚌','Jana','Príchod skupiny','C-12 · 32 osôb · čaká na izby'],
            ['07:42','🔑','M.S.','Aktivovaná zmena','Príchod do služby'],
            ['06:00','▶','Systém','Spustená zmena','Plánovaných 18 príchodov, 11 odchodov'],
          ].map((l,i)=>(
            <div key={i} className="row gap-8 center" style={{padding:'6px 4px',borderBottom:'1px dashed var(--line-soft)'}}>
              <span className="num xs muted" style={{flex:'0 0 44px',fontWeight:600}}>{l[0]}</span>
              <span style={{flex:'0 0 16px'}}>{l[1]}</span>
              <span style={{flex:'0 0 60px',fontWeight:600,fontSize:11}}>{l[2]}</span>
              <span style={{flex:'0 0 200px',fontSize:11}}>{l[3]}</span>
              <span className="grow xs muted">{l[4]}</span>
            </div>
          ))}

          {/* Handover */}
          <div className="box dash r pad-12" style={{marginTop:12}}>
            <h3 style={{marginBottom:8}}>{T('Odovzdanie zmeny 14:00','Shift handover 2pm')}</h3>
            <textarea className="box r" style={{width:'100%',padding:8,fontSize:11.5,minHeight:80}} defaultValue="Skupina F-22 prichádza 25.5. — pripravená predpárovaná. Sopková H. zavolá ohľadom poukazu, nech to vie kolegyňa. Konflikt 25.5. čaká na rozhodnutie hosťa."/>
            <div className="row gap-8 center" style={{marginTop:8}}>
              <span className="muted small grow">{T('Pošle sa nastupujúcej zmene + email manažérovi','Sent to incoming shift + manager email')}</span>
              <button className="btn">{T('Uložiť koncept','Save draft')}</button>
              <button className="btn primary">{T('Odoslať & ukončiť zmenu','Send & end shift')}</button>
            </div>
          </div>
          <Note x={460} y={20} w={230}>Audit log je nepriestrelný — každá akcia má autora a čas.</Note>
        </div>
      </div>
    </Screen>
  );
}

function CommandPalette(){
  // Visualize ⌘K modal over a dimmed grid
  return (
    <Screen active="grid" wide title={T('Globálne vyhľadávanie · ⌘K','Global search · ⌘K')} sub={T('Funguje z každej obrazovky · meno, izba, rezervácia, faktúra, akcia','Works from any screen · name, room, reservation, invoice, action')}>
      <div style={{position:'relative',height:'100%',background:'#FBF9F4'}}>
        {/* dim background grid hint */}
        <div style={{position:'absolute',inset:0,opacity:0.35,filter:'blur(0.6px)',pointerEvents:'none'}}>
          <div style={{padding:16}}>
            <div className="box r pad-12" style={{background:'#fff'}}>{T('… mriežka rezervácií v pozadí …','… reservations grid in background …')}</div>
          </div>
        </div>

        {/* Palette */}
        <div style={{position:'absolute',top:60,left:'50%',transform:'translateX(-50%)',width:720,background:'#fff',border:'1.2px solid #0F1F4D',borderRadius:10,boxShadow:'0 30px 80px rgba(15,31,77,0.25)'}}>
          <div className="row center gap-12 pad-16" style={{borderBottom:'1px solid var(--line-soft)'}}>
            <span style={{fontSize:18}}>⌕</span>
            <input className="box" style={{flex:1,border:'none',outline:'none',fontSize:18,padding:0,background:'transparent'}} defaultValue="nov"/>
            <span className="kbd">esc</span>
          </div>

          <div className="col">
            {[
              ['guest','👤','Ing. Jozef Novák','SK · 1957 · VIP · 8 pobytov · izba 203 (dnes)', true],
              ['res','📋','R-2026-1248 · Novák Jozef +1','KKL · 21.5.–11.6. · izba 203'],
              ['guest','👤','Novák Peter','SK · 1989 · 1 pobyt · 2023'],
              ['guest','👤','Nováková Alžbeta','SK · 1958 · spol. Nováka J. · izba 203'],
              ['room','🚪','Izba 203','Astória · Superior Park · 2L · obsadená'],
              ['inv','💳','Faktúra 2024-188','Novák J. · 2 720 € · 5/2024'],
              ['action','⚡','Akcia · Nová rezervácia pre Nováka','+ vyplniť hosťa automaticky'],
              ['action','⚡','Akcia · Otvoriť M4 prehliadku · Novák','22.5. 9:00'],
            ].map((r,i)=>(
              <div key={i} className="row center gap-12 pad-12" style={{borderBottom:'1px solid var(--line-soft)',background:i===0?'rgba(27,111,219,0.08)':'#fff',cursor:'pointer'}}>
                <span style={{fontSize:18,flex:'0 0 24px'}}>{r[1]}</span>
                <div className="col" style={{flex:1,lineHeight:1.2}}>
                  <b><span style={{background:'#FFE9A8',padding:'0 2px'}}>Nov</span>{r[2].substring(3)}</b>
                  <div className="xs muted">{r[3]}</div>
                </div>
                <span className="pill" style={{textTransform:'uppercase',fontSize:9,padding:'2px 6px'}}>{r[0]==='guest'?T('hosť','guest'):r[0]==='res'?T('rezerv.','res'):r[0]==='room'?T('izba','room'):r[0]==='inv'?T('faktúra','invoice'):'akcia'}</span>
                <span className="kbd">↵</span>
              </div>
            ))}
          </div>

          <div className="row between center pad-12" style={{borderTop:'1px solid var(--line-soft)',background:'#FBF9F4'}}>
            <div className="row gap-12 small muted">
              <span><span className="kbd">↑↓</span> {T('pohyb','navigate')}</span>
              <span><span className="kbd">↵</span> {T('otvor','open')}</span>
              <span><span className="kbd">⌘N</span> {T('nová rezerv.','new res')}</span>
              <span><span className="kbd">⌘.</span> {T('akcie','actions')}</span>
            </div>
            <span className="xs muted">{T('Hľadá v: hosťoch, rezerváciách, izbách, faktúrach, akciách','Searches: guests, res, rooms, invoices, actions')}</span>
          </div>
        </div>

        {/* Suggestions sticky */}
        <div style={{position:'absolute',top:60,right:30,width:240}}>
          <div className="box r pad-12" style={{background:'#fff'}}>
            <h4>{T('Skratky','Shortcuts')}</h4>
            <div className="col gap-4 small" style={{marginTop:6}}>
              <div className="row between"><span>{T('Otvor command palette','Open palette')}</span><span className="kbd">⌘K</span></div>
              <div className="row between"><span>{T('Nová rezervácia','New res')}</span><span className="kbd">⌘N</span></div>
              <div className="row between"><span>{T('Check-in vybraného','Check-in selected')}</span><span className="kbd">⌘⇧I</span></div>
              <div className="row between"><span>{T('Check-out','Check-out')}</span><span className="kbd">⌘⇧O</span></div>
              <div className="row between"><span>{T('Mriežka · dnes','Grid today')}</span><span className="kbd">⌘T</span></div>
              <div className="row between"><span>{T('Tasky','Tasks')}</span><span className="kbd">⌘J</span></div>
              <div className="row between"><span>{T('Pomoc','Help')}</span><span className="kbd">?</span></div>
            </div>
          </div>
        </div>

        <Note x={60} y={620} w={300} rot={-1.5}>
          ⌘K je univerzálny vstup. Recepčný nikdy nemusí brodiť menu — všetko nájde pomocou písania.
        </Note>
      </div>
    </Screen>
  );
}

window.Reports = Reports;
window.TasksLog = TasksLog;
window.CommandPalette = CommandPalette;
