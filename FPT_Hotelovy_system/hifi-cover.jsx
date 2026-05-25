function HFCover(){
  return (
    <div className="hf" style={{position:'absolute',inset:0,padding:48,background:'linear-gradient(160deg,#fff 0%,#F5F7FB 100%)',overflow:'hidden'}}>
      {/* Decorative circles (FPT brand pattern) */}
      <svg width="600" height="600" style={{position:'absolute',top:-180,right:-180,opacity:0.12}}>
        <circle cx="300" cy="300" r="280" fill="none" stroke="#0F1F4D" strokeWidth="60"/>
        <circle cx="360" cy="180" r="200" fill="none" stroke="#2E5BFF" strokeWidth="40"/>
        <circle cx="180" cy="360" r="160" fill="none" stroke="#5DD3E8" strokeWidth="34"/>
      </svg>

      <div className="row between" style={{position:'relative',zIndex:1}}>
        <div className="col">
          <div className="eyebrow" style={{color:'var(--blue)'}}>Hi-fi v1 · Hackathon</div>
          <h1 style={{fontSize:56,lineHeight:1.05,marginTop:12,letterSpacing:'-0.025em'}}>Front Office<br/><span style={{color:'var(--blue)'}}>Kúpele Bardejov</span></h1>
          <div className="muted" style={{fontSize:16,maxWidth:580,marginTop:18,lineHeight:1.5}}>
            Modul 2 hotelového systému pre recepčného. Náhrada za GUBI Front Office —
            rýchlejšie, čistejšie, s pochopením kúpeľnej domény: ZP poukazy,
            indikácie, dlhé pobyty, skupinové autobusy a väzba na lekára (M4) + procedúry (M5).
          </div>
        </div>
        <div className="col gap-8" style={{alignItems:'flex-end'}}>
          <span className="pill navy lg">FPT Digital Brand</span>
          <span className="pill outline lg">8 obrazoviek + user flow</span>
          <span className="pill outline lg">1440px desktop · SK/EN</span>
        </div>
      </div>

      <div className="row gap-24" style={{marginTop:40,position:'relative',zIndex:1}}>
        <div className="card pad-24" style={{flex:'1 1 0'}}>
          <div className="eyebrow">GUBI bolesti</div>
          <h3 style={{marginTop:6,marginBottom:14}}>Čo recepční nenávidia</h3>
          <div className="col gap-8 small">
            {['Veľa klikov na check-in','Funkcie schované v podmenu','Pomalá zmena rezervácie','Nepreh. skupinové príchody','Drobné písmo, slabé ikony','Komplikované platby a depozity','Príliš veľa povinných polí'].map((t,i)=>(
              <div key={i} className="row gap-10 center">
                <div style={{width:6,height:6,background:'var(--bad)',borderRadius:99}}></div>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card pad-24" style={{flex:'1 1 0',background:'var(--navy)',color:'#fff'}}>
          <div className="eyebrow" style={{color:'var(--cyan)'}}>Naše riešenie</div>
          <h3 style={{marginTop:6,marginBottom:14,color:'#fff'}}>Princípy nového dizajnu</h3>
          <div className="col gap-8 small" style={{color:'rgba(255,255,255,0.86)'}}>
            {[
              ['One-screen flows','Check-in pod 90s, žiadne 5 záložiek'],
              ['⌘K command palette','Globálne hľadanie, akcie, skratky'],
              ['Drag-and-drop mriežka','Zmena izby/dátumu priamo myšou'],
              ['Spa kontext vidieť','Dx, alergie, VIP, diéta — všade'],
              ['Paralelný skupinový mod','Dvaja recepční bez kolízií'],
              ['Split-pay + depozit + faktúra','V jednej kasse, žiadne modály'],
              ['M4/M5 integrácia','Konflikty zachytené automaticky'],
            ].map(([t,d],i)=>(
              <div key={i}>
                <div className="row gap-10 center">
                  <div style={{width:6,height:6,background:'var(--cyan)',borderRadius:99}}></div>
                  <b style={{color:'#fff'}}>{t}</b>
                </div>
                <div style={{paddingLeft:16,color:'rgba(255,255,255,0.62)',fontSize:11.5,marginTop:2}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card pad-24" style={{flex:'1 1 0'}}>
          <div className="eyebrow">Brand · FPT Digital</div>
          <h3 style={{marginTop:6,marginBottom:14}}>Color & type</h3>
          <div className="row gap-6" style={{flexWrap:'wrap',marginBottom:14}}>
            {[
              ['#0F1F4D','Navy'],
              ['#061230','Maastricht'],
              ['#2E5BFF','FDX Blue'],
              ['#8AB0FF','Light Blue'],
              ['#5DD3E8','Cyan'],
              ['#F5F7FB','Smoke'],
              ['#0A1126','Eerie'],
            ].map(([c,n],i)=>(
              <div key={i} className="col gap-4" style={{flex:'0 0 calc(33.3% - 4px)'}}>
                <div style={{height:42,background:c,borderRadius:8,border:'1px solid rgba(10,17,38,0.08)'}}></div>
                <div className="xs"><b>{n}</b><div className="muted mono">{c}</div></div>
              </div>
            ))}
          </div>
          <hr/>
          <div className="col gap-2">
            <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:26,letterSpacing:'-0.02em'}}>Plus Jakarta Sans</div>
            <div className="xs muted">Headings · stand-in za Gilroy</div>
            <div style={{fontFamily:'Inter',fontWeight:500,fontSize:14,marginTop:8}}>Inter — UI text, tabuľky, dáta</div>
            <div className="xs muted">Body · stand-in za Graphik</div>
          </div>
        </div>
      </div>

      <div className="row gap-12 center" style={{marginTop:36,position:'relative',zIndex:1}}>
        <div className="pill outline lg"><Icon n="arrow" size={14}/> Posúvaj kanvas · ↓ ďalej user flow + 8 hi-fi obrazoviek</div>
        <span className="grow"/>
        <span className="muted small">FPT · Kúpele Bardejov · Hackathon 2026 · UX/UI Design</span>
      </div>
    </div>
  );
}
window.HFCover = HFCover;
