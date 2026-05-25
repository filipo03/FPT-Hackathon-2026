/* ── User flow diagram (single big artboard, 2800×1500) ──────── */

const FlowBox = ({ x, y, w=170, h=58, t, sub, k='step', onClick, kbd }) => {
  const styles = {
    step:    { bg:'#fff', stroke:'#C7CBDB', text:'#0A1126', sub:'#5C6481' },
    user:    { bg:'#fff', stroke:'#2E5BFF', text:'#0A1126', sub:'#5C6481' },
    sys:     { bg:'#0F1F4D', stroke:'#0F1F4D', text:'#fff', sub:'rgba(255,255,255,0.7)' },
    int:     { bg:'#DCE5FF', stroke:'#2E5BFF', text:'#0A1126', sub:'#3A4B85' },
    int2:    { bg:'#D9F4FA', stroke:'#5DD3E8', text:'#0E3640', sub:'#2E5C66' },
    int3:    { bg:'#ECE3F8', stroke:'#7857C7', text:'#3A2A78', sub:'#5C448A' },
    start:   { bg:'#0F1F4D', stroke:'#0F1F4D', text:'#fff', sub:'rgba(255,255,255,0.7)' },
    end:     { bg:'#2E5BFF', stroke:'#2E5BFF', text:'#fff', sub:'rgba(255,255,255,0.85)' },
    decision:{ bg:'#FBE8C9', stroke:'#E8930B', text:'#3A2402', sub:'#7A4B07' },
    warn:    { bg:'#FBE2DF', stroke:'#DA3B33', text:'#7A1F1A', sub:'#7A1F1A' },
  };
  const s = styles[k];
  const radius = k==='decision' ? 4 : 10;
  return (
    <div style={{
      position:'absolute', left:x, top:y, width:w, height:h,
      background:s.bg, color:s.text, border:`1.5px solid ${s.stroke}`,
      borderRadius:radius, padding:'9px 12px',
      display:'flex', flexDirection:'column', justifyContent:'center', gap:2,
      boxShadow:'0 2px 5px rgba(10,17,38,0.06)',
      transform: k==='decision' ? 'skewX(-10deg)' : 'none',
    }}>
      <div style={{ transform: k==='decision' ? 'skewX(10deg)' : 'none' }}>
        <div style={{ fontWeight:700, fontSize:13, lineHeight:1.2 }}>{t}</div>
        {sub && <div style={{ fontSize:11, color:s.sub, marginTop:2, lineHeight:1.2 }}>{sub}</div>}
        {kbd && <div style={{position:'absolute',top:5,right:7,fontFamily:'JetBrains Mono',fontSize:9,fontWeight:600,color:s.sub,background:'rgba(255,255,255,0.5)',padding:'1px 5px',borderRadius:3}}>{kbd}</div>}
      </div>
    </div>
  );
};

// Arrow as SVG line with arrowhead between two points
const Arrow = ({ from, to, dashed=false, color='#0F1F4D', label, bend=0, labelOffset=[0,-10] }) => {
  // bend: 0 = straight, otherwise curve via cubic
  const dx = to.x - from.x, dy = to.y - from.y;
  let path;
  if (bend === 0) {
    path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  } else {
    const mx = (from.x + to.x)/2, my = (from.y + to.y)/2 + bend;
    path = `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  }
  const id = 'ah-' + Math.random().toString(36).slice(2,8);
  return (
    <g>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={color}/>
        </marker>
      </defs>
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" strokeDasharray={dashed?'5 4':'none'} markerEnd={`url(#${id})`}/>
      {label && (() => {
        const lx = (from.x + to.x)/2 + labelOffset[0];
        const ly = (from.y + to.y)/2 + labelOffset[1];
        return (
          <g>
            <rect x={lx-label.length*3.4-6} y={ly-9} width={label.length*6.8+12} height={18} rx="9" fill="#fff" stroke={color} strokeWidth="1"/>
            <text x={lx} y={ly+4} fontSize="11" fontWeight="600" fill={color} textAnchor="middle">{label}</text>
          </g>
        );
      })()}
    </g>
  );
};

// Lane label
const Lane = ({ y, h, label, sub, color='#5C6481' }) => (
  <div style={{position:'absolute', left:24, top:y, width:130, height:h,
    background:'rgba(255,255,255,0.5)', borderLeft:`4px solid ${color}`,
    padding:'12px 14px', borderRadius:'0 8px 8px 0'}}>
    <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:14,letterSpacing:'-0.01em',color:color}}>{label}</div>
    <div style={{fontSize:11.5,color:'#5C6481',marginTop:4,lineHeight:1.3}}>{sub}</div>
  </div>
);

// Phase header
const Phase = ({ x, w, label, num }) => (
  <div style={{position:'absolute', left:x, top:64, width:w, padding:'8px 12px',
    background:'#fff', border:'1px solid #E1E4EE', borderRadius:8, textAlign:'center'}}>
    <div style={{fontSize:10,fontWeight:700,letterSpacing:'.12em',color:'#2E5BFF',textTransform:'uppercase'}}>Fáza {num}</div>
    <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:700,fontSize:13,marginTop:2}}>{label}</div>
  </div>
);

function HFFlow(){
  // Lane y-anchors
  const yUser = 220;
  const ySys  = 540;
  const yInt  = 900;
  const yInt2 = 1080;
  const yInt3 = 1260;

  // Phase x positions
  const P = {
    pre:    { x:170,  w:280 },
    arrival:{ x:470,  w:280 },
    checkin:{ x:770,  w:520 },
    stay:   { x:1310, w:600 },
    change: { x:1930, w:420 },
    out:    { x:2370, w:330 },
  };

  // helper coords
  const cx = (b) => ({ x: b.x + (b.w||170)/2, y: b.y + (b.h||58)/2 });
  const right = (b) => ({ x: b.x + (b.w||170), y: b.y + (b.h||58)/2 });
  const left  = (b) => ({ x: b.x, y: b.y + (b.h||58)/2 });
  const top   = (b) => ({ x: b.x + (b.w||170)/2, y: b.y });
  const bottom= (b) => ({ x: b.x + (b.w||170)/2, y: b.y + (b.h||58) });

  // Define every node with coords
  // USER lane
  const u = {
    start:   { x:170,  y:yUser, w:120, h:58, t:'Štart zmeny', sub:'06:00 · Jana K.', k:'start' },
    review:  { x:310,  y:yUser, w:140, t:'Prehľad dňa', sub:'18 príchodov, 11 odchodov' },
    decide:  { x:470,  y:yUser, w:180, h:70, t:'Typ príchodu?', sub:'single · walk-in · skupina', k:'decision' },
    // 3 branches
    single:  { x:670,  y:yUser-110, w:160, t:'Hosť pri pulte', sub:'objednaný · ID + meno' },
    walkin:  { x:670,  y:yUser,     w:160, t:'Walk-in', sub:'rezervácia neexistuje' },
    group:   { x:670,  y:yUser+110, w:160, t:'Skupina · bus', sub:'avízo · CSV manifest' },
    // converge to check-in
    search:  { x:870,  y:yUser, w:150, h:58, t:'⌘K vyhľadať', sub:'meno / izba / rezerv.', kbd:'⌘K' },
    open:    { x:1040, y:yUser, w:150, t:'Otvoriť kartu', sub:'jedným klikom' },
    scan:    { x:1210, y:yUser, w:150, t:'Sken OP / ZP', sub:'auto-fill polí' },
    confirm: { x:870,  y:yUser+110, w:180, h:60, t:'Potvrdiť izbu', sub:'upgrade · podpis · diéta' },
    sign:    { x:1070, y:yUser+110, w:170, h:60, t:'Podpis registrácie', sub:'signpad alebo e-podpis' },
    key:     { x:1260, y:yUser+110, w:170, h:60, t:'Kľúč + náramok RFID', sub:'+ harmonogram procedúr' },
    // stay
    monitor: { x:1340, y:yUser, w:170, t:'Sledovanie pobytu', sub:'mriežka · timeline' },
    handle:  { x:1530, y:yUser, w:170, t:'Špec. požiadavky', sub:'káva, lieky, sťažnosti' },
    notes:   { x:1720, y:yUser, w:170, t:'Komunikácia s hosťom', sub:'SMS / email · poznámky' },
    // change branch
    changedec:{x:1960, y:yUser, w:180, h:70, t:'Zmena potrebná?', sub:'izba · dátum · balík · storno', k:'decision' },
    drag:    { x:2160, y:yUser-90, w:170, t:'Drag v mriežke', sub:'zmena izby/dátumu' },
    extend:  { x:2160, y:yUser, w:170, t:'Predĺžiť / skrátiť', sub:'kalkulácia rozdielu' },
    cancel:  { x:2160, y:yUser+90, w:170, t:'Storno · refund', sub:'storno-podmienky · vrátiť' },
    // checkout
    coStart: { x:2370, y:yUser, w:170, h:60, t:'Check-out 10:00', sub:'auto-otv. folio' },
    coPay:   { x:2370, y:yUser+85, w:170, h:60, t:'Folio + split-pay', sub:'karta · hotov. · faktúra' },
    coClose: { x:2370, y:yUser+170, w:170, h:60, t:'Uzavrieť účet', sub:'tlač + email' },
    end:     { x:2560, y:yUser+170, w:130, h:60, t:'Hosť odchádza', sub:'pre-book ďalší pobyt', k:'end' },
  };

  // SYSTEM lane (M2)
  const s = {
    boot:    { x:170, y:ySys, w:140, h:54, t:'Načítať dnešok', sub:'arrivals · departures', k:'sys' },
    smart:   { x:330, y:ySys, w:160, h:54, t:'Predpripr. úlohy', sub:'priorita podľa typu hosťa', k:'sys' },
    avail:   { x:510, y:ySys, w:160, h:54, t:'Dostupnosť izieb', sub:'live, konflikt-aware', k:'sys' },
    folio:   { x:870, y:ySys, w:160, h:54, t:'Otvoriť folio', sub:'aktivovať RFID izba', k:'sys' },
    activate:{ x:1050,y:ySys, w:160, h:54, t:'Aktivovať pobyt', sub:'mriežka → checked-in', k:'sys' },
    audit:   { x:1230,y:ySys, w:160, h:54, t:'Audit log', sub:'každá akcia · autor · čas', k:'sys' },
    conflicts:{x:1430,y:ySys, w:170, h:54, t:'Konflikt-detektor', sub:'M5 ↔ check-out, dieta', k:'sys' },
    pricing: { x:1620,y:ySys, w:160, h:54, t:'Pricing engine', sub:'balík · ZP · zľavy', k:'sys' },
    bill:    { x:2160,y:ySys, w:160, h:54, t:'Generovať folio', sub:'položky + DPH + storno', k:'sys' },
    invoice: { x:2370,y:ySys, w:160, h:54, t:'eKasa + faktúra', sub:'fiškál. doklad', k:'sys' },
    archive: { x:2550,y:ySys, w:150, h:54, t:'Archív · history', sub:'+ NPS pozvánka', k:'sys' },
  };

  // INTEGRATIONS (3 sublanes)
  const i1 = {  // M1/M3 + ZP (bookings / insurance)
    web:     { x:170, y:yInt, w:140, h:50, t:'M1/M3 · Rezerv.', sub:'web kanál, partneri', k:'int' },
    zp:      { x:330, y:yInt, w:140, h:50, t:'ZP rozhranie', sub:'VšZP, Dôvera, Union…', k:'int' },
    voucher: { x:510, y:yInt, w:140, h:50, t:'Overiť poukaz', sub:'autorizácia · status', k:'int' },
    refund:  { x:2370,y:yInt, w:140, h:50, t:'ZP fakturácia', sub:'vykázanie pobytu', k:'int' },
  };
  const i2 = {  // M4 lekár
    intake:  { x:1050,y:yInt2, w:160, h:50, t:'M4 · vstupná prehl.', sub:'D+1 · ord. 8', k:'int3' },
    contra:  { x:1230,y:yInt2, w:160, h:50, t:'Indikácie · KI', sub:'auto z karty pacienta', k:'int3' },
    medChg:  { x:1430,y:yInt2, w:170, h:50, t:'Zmena indikácie', sub:'→ upraví procedúry', k:'int3' },
    outExam: { x:2370,y:yInt2, w:160, h:50, t:'M4 · výstupná', sub:'záver · odporúčania', k:'int3' },
  };
  const i3 = {  // M5 procedúry + reštaurácia + HK
    procActiv:{x:1230,y:yInt3, w:170, h:50, t:'M5 · aktivovať', sub:'plán 21d × 3 procedúry', k:'int2' },
    procRun: { x:1430,y:yInt3, w:170, h:50, t:'M5 · denné procedúry', sub:'check-in/out RFID', k:'int2' },
    procChg: { x:1620,y:yInt3, w:170, h:50, t:'M5 · presun', sub:'konflikt s hosťom', k:'int2' },
    diet:    { x:870, y:yInt3, w:140, h:50, t:'Reštaurácia · diéta', sub:'D1/D2/D3 hromad.', k:'int' },
    hk:      { x:1050,y:yInt3, w:140, h:50, t:'HK · izba pripr.', sub:'PUSH zo M2', k:'int' },
    hkOut:   { x:2370,y:yInt3, w:160, h:50, t:'HK · uvoľnenie', sub:'space + obrat', k:'int' },
  };

  return (
    <div style={{position:'absolute',inset:0,background:'#F5F7FB',overflow:'hidden',padding:0}} className="hf">
      {/* Pattern dots subtly */}
      <div className="bg-pattern"/>

      {/* Title strip */}
      <div style={{position:'absolute',top:12,left:24,right:24,display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
        <div>
          <div className="eyebrow" style={{color:'var(--blue)'}}>User flow · Recepčný · Front Office M2</div>
          <h1 style={{fontSize:30}}>Kompletná mapa workflow — od štartu zmeny po odchod hosťa</h1>
        </div>
        <div className="row gap-8">
          <div className="pill outline"><Icon n="user" size={11}/> Recepčný</div>
          <div className="pill navy"><Icon n="dash" size={11}/> Systém M2</div>
          <div className="pill" style={{background:'var(--blue-soft)',color:'#2A3F86'}}>M1/M3 · ZP</div>
          <div className="pill plum">M4 Lekár</div>
          <div className="pill cyan">M5 + HK + Reštaurácia</div>
          <div className="pill warn"><Icon n="warn" size={11}/> Rozhodnutie</div>
        </div>
      </div>

      {/* Phase headers */}
      <Phase x={P.pre.x}     w={P.pre.w}     num="1" label="Pred-príchod"/>
      <Phase x={P.arrival.x} w={P.arrival.w} num="2" label="Príchod · rozhodnutie"/>
      <Phase x={P.checkin.x} w={P.checkin.w} num="3" label="Check-in"/>
      <Phase x={P.stay.x}    w={P.stay.w}    num="4" label="Pobyt"/>
      <Phase x={P.change.x}  w={P.change.w}  num="5" label="Zmeny"/>
      <Phase x={P.out.x}     w={P.out.w}     num="6" label="Check-out & after"/>

      {/* Lanes labels */}
      <Lane y={yUser-30} h={300} label="Recepčný" sub="Akcie pri pulte · obrazovky" color="#2E5BFF"/>
      <Lane y={ySys-40}  h={140} label="Systém M2" sub="Automatické úlohy · audit log" color="#0F1F4D"/>
      <Lane y={yInt-40}  h={400} label="Integrácie" sub="M1/M3 · ZP · M4 · M5 · HK · reštaurácia" color="#5DD3E8"/>

      {/* Connectors via SVG */}
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}>
        {/* Phase 1 → Phase 2 */}
        <Arrow from={right(u.start)} to={left(u.review)}/>
        <Arrow from={right(u.review)} to={left(u.decide)}/>

        {/* decision → 3 branches */}
        <Arrow from={right(u.decide)} to={left(u.single)} label="objednaný" labelOffset={[0,-12]}/>
        <Arrow from={right(u.decide)} to={left(u.walkin)} label="walk-in"/>
        <Arrow from={right(u.decide)} to={left(u.group)}  label="skupina"/>

        {/* branches → ⌘K */}
        <Arrow from={right(u.single)} to={left(u.search)}/>
        <Arrow from={right(u.walkin)} to={left(u.search)} dashed/>
        <Arrow from={right(u.group)}  to={{x:u.confirm.x-20, y:u.group.y+30}}/>

        {/* search → open → scan → confirm row */}
        <Arrow from={right(u.search)} to={left(u.open)}/>
        <Arrow from={right(u.open)} to={left(u.scan)}/>
        <Arrow from={bottom(u.scan)} to={{x:u.scan.x-30, y:u.confirm.y}} bend={20}/>

        {/* confirm → sign → key */}
        <Arrow from={right(u.confirm)} to={left(u.sign)}/>
        <Arrow from={right(u.sign)} to={left(u.key)}/>

        {/* key → monitor (loop up + right) */}
        <Arrow from={right(u.key)} to={left(u.monitor)} bend={-30}/>

        {/* monitor row */}
        <Arrow from={right(u.monitor)} to={left(u.handle)}/>
        <Arrow from={right(u.handle)} to={left(u.notes)}/>
        <Arrow from={right(u.notes)} to={left(u.changedec)}/>

        {/* change decision → 3 actions */}
        <Arrow from={right(u.changedec)} to={left(u.drag)} label="izba"/>
        <Arrow from={right(u.changedec)} to={left(u.extend)} label="dátum"/>
        <Arrow from={right(u.changedec)} to={left(u.cancel)} label="storno"/>

        {/* loop back to monitor */}
        <Arrow from={top(u.drag)} to={{x:u.drag.x+85, y:u.monitor.y-10}} bend={-15} dashed color="#5C6481"/>

        {/* end of changes → check-out (only when stay ends) */}
        <Arrow from={right(u.extend)} to={left(u.coStart)} dashed label="koniec pobytu" labelOffset={[0,-14]}/>
        <Arrow from={right(u.cancel)} to={{x:u.coStart.x, y:u.coStart.y+90}} dashed/>

        {/* checkout sequence */}
        <Arrow from={bottom(u.coStart)} to={top(u.coPay)}/>
        <Arrow from={bottom(u.coPay)} to={top(u.coClose)}/>
        <Arrow from={right(u.coClose)} to={left(u.end)}/>

        {/* User → System couplings */}
        <Arrow from={bottom(u.start)} to={top(s.boot)} color="#0F1F4D" dashed/>
        <Arrow from={bottom(u.review)} to={top(s.smart)} color="#0F1F4D" dashed/>
        <Arrow from={bottom(u.search)} to={top(s.folio)} color="#0F1F4D" dashed/>
        <Arrow from={bottom(u.key)} to={top(s.activate)} color="#0F1F4D" dashed/>
        <Arrow from={bottom(u.notes)} to={top(s.audit)} color="#0F1F4D" dashed/>
        <Arrow from={bottom(u.handle)} to={top(s.conflicts)} color="#0F1F4D" dashed/>
        <Arrow from={bottom(u.extend)} to={top(s.pricing)} color="#0F1F4D" dashed/>
        <Arrow from={bottom(u.coPay)} to={top(s.bill)} color="#0F1F4D" dashed/>
        <Arrow from={bottom(u.coClose)} to={top(s.invoice)} color="#0F1F4D" dashed/>
        <Arrow from={right(s.invoice)} to={left(s.archive)} color="#0F1F4D"/>

        {/* system → integration */}
        <Arrow from={bottom(s.boot)} to={top(i1.web)} color="#2E5BFF" dashed/>
        <Arrow from={right(i1.web)} to={left(i1.zp)} color="#2E5BFF"/>
        <Arrow from={right(i1.zp)} to={left(i1.voucher)} color="#2E5BFF"/>
        <Arrow from={bottom(s.invoice)} to={top(i1.refund)} color="#2E5BFF" dashed/>

        {/* checkin → M4 + HK + Reštaurácia */}
        <Arrow from={bottom(s.activate)} to={top(i2.intake)} color="#7857C7" dashed/>
        <Arrow from={right(i2.intake)} to={left(i2.contra)} color="#7857C7"/>
        <Arrow from={right(i2.contra)} to={left(i2.medChg)} color="#7857C7"/>

        <Arrow from={bottom(s.folio)} to={top(i3.diet)} color="#5DD3E8" dashed/>
        <Arrow from={bottom(s.activate)} to={top(i3.hk)} color="#5DD3E8" dashed/>

        <Arrow from={bottom(i2.contra)} to={top(i3.procActiv)} color="#5DD3E8"/>
        <Arrow from={right(i3.procActiv)} to={left(i3.procRun)} color="#5DD3E8"/>
        <Arrow from={right(i3.procRun)} to={left(i3.procChg)} color="#5DD3E8"/>

        <Arrow from={right(i2.medChg)} to={top(i3.procChg)} color="#7857C7" dashed label="auto" labelOffset={[40,5]}/>

        {/* checkout → m4 out, hk out */}
        <Arrow from={bottom(s.bill)} to={top(i2.outExam)} color="#7857C7" dashed/>
        <Arrow from={bottom(s.invoice)} to={top(i3.hkOut)} color="#5DD3E8" dashed/>
      </svg>

      {/* Render boxes ABOVE svg arrows */}
      <div style={{position:'absolute',inset:0,zIndex:1,pointerEvents:'none'}}>
        {Object.values(u).map((b,i)=> <FlowBox key={'u'+i} {...b}/>)}
        {Object.values(s).map((b,i)=> <FlowBox key={'s'+i} {...b}/>)}
        {Object.values(i1).map((b,i)=><FlowBox key={'i1'+i} {...b}/>)}
        {Object.values(i2).map((b,i)=><FlowBox key={'i2'+i} {...b}/>)}
        {Object.values(i3).map((b,i)=><FlowBox key={'i3'+i} {...b}/>)}
      </div>

      {/* Legend bottom */}
      <div style={{position:'absolute',bottom:30,left:170,right:30,display:'flex',gap:24,alignItems:'center',flexWrap:'wrap'}}>
        <div className="card pad-14" style={{flex:'0 0 auto'}}>
          <div className="eyebrow">Notácia</div>
          <div className="row gap-14 center" style={{marginTop:6,fontSize:11.5}}>
            <span className="row gap-6 center"><div style={{width:24,height:14,background:'#fff',border:'1.5px solid #C7CBDB',borderRadius:3}}/> Krok</span>
            <span className="row gap-6 center"><div style={{width:24,height:14,background:'#FBE8C9',border:'1.5px solid #E8930B',borderRadius:2,transform:'skewX(-10deg)'}}/> Rozhodnutie</span>
            <span className="row gap-6 center"><div style={{width:24,height:14,background:'#0F1F4D',borderRadius:3}}/> Systémová akcia</span>
            <span className="row gap-6 center"><svg width="32" height="6"><path d="M0 3 L30 3" stroke="#0F1F4D" strokeWidth="1.5" markerEnd=""/></svg> Prechod</span>
            <span className="row gap-6 center"><svg width="32" height="6"><path d="M0 3 L30 3" stroke="#5C6481" strokeWidth="1.5" strokeDasharray="5 4"/></svg> Asynchrónne / loop</span>
          </div>
        </div>
        <div className="card pad-14" style={{flex:'1 1 0',borderLeft:'4px solid var(--blue)'}}>
          <div className="eyebrow" style={{color:'var(--blue)'}}>Top princípy zachytené v toku</div>
          <div className="row gap-16" style={{marginTop:6,fontSize:11.5,color:'var(--ink-2)'}}>
            <span>① Jedna obrazovka = jedna úloha</span>
            <span>② ⌘K → akákoľvek akcia</span>
            <span>③ Zmena rezervácie cez drag, nie cez modál</span>
            <span>④ Konflikt M5 ↔ pobyt sa zachytí automaticky</span>
            <span>⑤ Skupinový check-in beží paralelne dvomi recepčnými</span>
          </div>
        </div>
      </div>
    </div>
  );
}
window.HFFlow = HFFlow;
