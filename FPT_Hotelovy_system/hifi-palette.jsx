/* ── Hi-Fi · ⌘K Command palette (modal over grid) ─────────── */

function HFPalette(){
  return (
    <HFScreen
      active="grid"
      title={Tr('Rezervácie','Reservations')}
      sub={Tr('21. máj – 3. jún · 14 dní','May 21 – Jun 3 · 14 days')}
      padContent={false}>
      <div style={{position:'relative',height:'100%',background:'var(--bg)'}}>
        {/* Background hint - faked grid */}
        <div style={{position:'absolute',inset:0,filter:'blur(2px)',opacity:0.45}}>
          <div style={{padding:20,height:'100%'}}>
            <div className="card" style={{height:'100%',padding:24}}>
              <div className="row gap-8" style={{marginBottom:14}}>
                {Array.from({length:14}).map((_,i)=><div key={i} style={{flex:1,height:24,background:'var(--bg-2)',borderRadius:4}}/>)}
              </div>
              {Array.from({length:10}).map((_,r)=>(
                <div key={r} className="row gap-4" style={{marginBottom:8}}>
                  <div style={{flex:'0 0 100px',height:30,background:'var(--bg-2)',borderRadius:4}}/>
                  {[2,5,3,4].map((w,j)=>(
                    <div key={j} style={{flex:w,height:30,background:'var(--blue-soft)',borderRadius:6}}/>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dim overlay */}
        <div style={{position:'absolute',inset:0,background:'rgba(6,18,48,0.45)',backdropFilter:'blur(2px)'}}/>

        {/* Palette */}
        <div style={{position:'absolute',top:60,left:'50%',transform:'translateX(-50%)',width:720,
          background:'#fff',borderRadius:14,boxShadow:'0 40px 100px rgba(6,18,48,0.45), 0 12px 24px rgba(6,18,48,0.25)',
          overflow:'hidden',border:'1px solid rgba(255,255,255,0.5)'}}>
          {/* Search field */}
          <div className="row center gap-12" style={{padding:'18px 20px',borderBottom:'1px solid var(--line)'}}>
            <Icon n="search" size={20} c="#5C6481"/>
            <input type="text" defaultValue="nov" style={{border:'none',outline:'none',background:'transparent',
              fontSize:18,padding:0,fontWeight:500,color:'var(--ink-1)',flex:1}}/>
            <span className="kbd">esc</span>
          </div>

          {/* Results — grouped */}
          <div style={{maxHeight:420,overflowY:'auto'}}>
            {/* Group: Guests */}
            <div style={{padding:'10px 20px 4px',background:'var(--bg)'}}>
              <div className="eyebrow">{Tr('HOSTIA · 3','GUESTS · 3')}</div>
            </div>
            {[
              { sel:true,  name:'Ing. Jozef Novák',  sub:'SK · 1957 · VIP · 8 pobytov · izba 203 (dnes)',  tone:'#2E5BFF', init:'JN' },
              { sel:false, name:'Peter Novák',       sub:'SK · 1989 · 1 pobyt · 2023',                       tone:'#7857C7', init:'PN' },
              { sel:false, name:'Mgr. Alžbeta Nováková', sub:'manželka J. Nováka · spol. izba 203',          tone:'#DA3B33', init:'AN' },
            ].map((r,i)=>(
              <div key={i} className="row center gap-14" style={{padding:'12px 20px',
                background:r.sel?'var(--blue-50)':'#fff',cursor:'pointer',
                boxShadow: r.sel?'inset 2px 0 0 var(--blue)':'none'}}>
                <Av name={r.init} sz="md" tone={`linear-gradient(135deg,${r.tone},${r.tone}99)`}/>
                <div className="col grow" style={{lineHeight:1.25}}>
                  <div style={{fontSize:14,fontWeight:600}}>
                    <span style={{background:r.sel?'var(--cyan-soft)':'#FFE9A8',padding:'0 3px',borderRadius:3}}>Nov</span>{r.name.replace(/Nov/,'')}
                  </div>
                  <div className="xs muted">{r.sub}</div>
                </div>
                <span className="pill outline">{Tr('Hosť','Guest')}</span>
                {r.sel && <span className="kbd">↵</span>}
              </div>
            ))}

            {/* Group: Reservations */}
            <div style={{padding:'10px 20px 4px',background:'var(--bg)',borderTop:'1px solid var(--line)'}}>
              <div className="eyebrow">{Tr('REZERVÁCIE · 2','RESERVATIONS · 2')}</div>
            </div>
            {[
              { id:'R-2026-1248', name:'Novák +1 · KKL · izba 203', sub:'21. 5. – 11. 6. 2026 · 21n · VIP', ic:'cal' },
              { id:'R-2024-0884', name:'Novák · KKL · izba 207',     sub:'5. – 26. 5. 2024 · archív', ic:'cal' },
            ].map((r,i)=>(
              <div key={i} className="row center gap-14" style={{padding:'12px 20px',cursor:'pointer'}}>
                <div className="av" style={{background:'var(--ok-soft)',color:'var(--ok)',width:36,height:36}}><Icon n={r.ic} size={16}/></div>
                <div className="col grow" style={{lineHeight:1.25}}>
                  <div style={{fontSize:14,fontWeight:600}}><span className="mono" style={{color:'var(--ink-3)'}}>{r.id}</span> · {r.name}</div>
                  <div className="xs muted">{r.sub}</div>
                </div>
                <span className="pill outline">{Tr('Rezerv.','Res')}</span>
              </div>
            ))}

            {/* Group: Actions */}
            <div style={{padding:'10px 20px 4px',background:'var(--bg)',borderTop:'1px solid var(--line)'}}>
              <div className="eyebrow">{Tr('AKCIE · 3','ACTIONS · 3')}</div>
            </div>
            {[
              ['plus', Tr('Nová rezervácia pre Nováka','New reservation for Novák'), '⌘N', 'pre-fill auto'],
              ['key',  Tr('Check-in vybraného','Check-in selected'), '⌘⇧I', 'Novák · 203 · dnes 9:15'],
              ['medical', Tr('Otvoriť M4 vstupnú prehliadku','Open M4 initial exam'), '⌘⇧M', 'Novák · 22. 5. 9:00'],
            ].map((r,i)=>(
              <div key={i} className="row center gap-14" style={{padding:'12px 20px',cursor:'pointer'}}>
                <div className="av" style={{background:'var(--bg-2)',color:'var(--ink-2)',width:36,height:36}}><Icon n={r[0]} size={16}/></div>
                <div className="col grow" style={{lineHeight:1.25}}>
                  <div style={{fontSize:14,fontWeight:600}}>{r[1]}</div>
                  <div className="xs muted">{r[3]}</div>
                </div>
                <span className="kbd">{r[2]}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="row center between" style={{padding:'10px 20px',borderTop:'1px solid var(--line)',background:'var(--bg)'}}>
            <div className="row gap-14 small muted">
              <span><span className="kbd">↑↓</span> {Tr('pohyb','navigate')}</span>
              <span><span className="kbd">↵</span> {Tr('otvor','open')}</span>
              <span><span className="kbd">tab</span> {Tr('filter typu','filter type')}</span>
              <span><span className="kbd">⌘.</span> {Tr('akcie','actions')}</span>
            </div>
            <span className="xs muted">{Tr('Hľadá v: hostiach, rezerváciách, izbách, faktúrach, akciách','Searches: guests, res, rooms, invoices, actions')}</span>
          </div>
        </div>

        {/* Side card with shortcuts */}
        <div style={{position:'absolute',top:60,right:60,width:220}}>
          <div className="card pad-14" style={{background:'rgba(255,255,255,0.96)'}}>
            <div className="eyebrow">{Tr('GLOBÁLNE SKRATKY','GLOBAL SHORTCUTS')}</div>
            <div className="col gap-6 small" style={{marginTop:10}}>
              {[
                ['Command palette','⌘K'],
                [Tr('Nová rezervácia','New res'),'⌘N'],
                ['Check-in','⌘⇧I'],
                ['Check-out','⌘⇧O'],
                [Tr('Mriežka · dnes','Grid today'),'⌘T'],
                [Tr('Úlohy','Tasks'),'⌘J'],
                [Tr('Pomoc','Help'),'?'],
              ].map((r,i)=>(
                <div key={i} className="row between center">
                  <span>{r[0]}</span>
                  <span className="kbd">{r[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HFScreen>
  );
}
window.HFPalette = HFPalette;
