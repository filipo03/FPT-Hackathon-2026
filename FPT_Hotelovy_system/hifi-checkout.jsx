/* ── Hi-Fi · Check-out + Kasa ────────────────────────────────── */

function HFCheckout(){
  const nav = useNav();
  return (
    <HFScreen
      active="cash"
      title={Tr('Check-out · Ján Bobula','Check-out · Ján Bobula')}
      sub={Tr('Izba 401 · Premium Spa · 14n · folio 1248','Room 401 · Premium Spa · 14n · folio 1248')}
      actions={<>
        <button className="btn ghost" onClick={()=>nav.go('grid')}>{Tr('Predĺžiť pobyt','Extend stay')}</button>
        <button className="btn">{Tr('Predfaktúra','Pro-forma')}</button>
        <button className="btn accent" onClick={()=>{nav.toast(Tr('✓ Platba 1 936,50 € prijatá · Bobula · 401','✓ Payment received · Bobula · 401')); nav.go('dash');}}><Icon n="cash" size={14}/> {Tr('Prijať platbu','Process payment')}</button>
      </>}>

      <div className="col gap-16" style={{height:'100%'}}>
        {/* Hero */}
        <div className="card pad-16 row gap-16 center">
          <Av name="JB" sz="lg" tone="linear-gradient(135deg,#0F1F4D,#5C6481)"/>
          <div className="col" style={{lineHeight:1.2}}>
            <div className="row center gap-8"><h2>Ján Bobula</h2><P k="bad">VIP</P></div>
            <div className="muted small">1952 · Dôvera · Antistresový pobyt · 4. pobyt v 2026 · NPS 9/10</div>
          </div>
          <div className="grow"/>
          <div className="col" style={{textAlign:'right',lineHeight:1.3}}>
            <div className="eyebrow">{Tr('POBYT','STAY')}</div>
            <div style={{fontFamily:'Plus Jakarta Sans',fontWeight:700,fontSize:16}}>7. – 21. 5. 2026 · 14n</div>
            <div className="muted small">odchod do 10:00 · Premium Spa 401</div>
          </div>
          <div className="divider-v" style={{height:50}}/>
          <div className="col" style={{textAlign:'right',lineHeight:1.3}}>
            <div className="eyebrow">{Tr('STAV FOLIA','FOLIO STATUS')}</div>
            <div style={{fontFamily:'Plus Jakarta Sans',fontSize:22,fontWeight:800,color:'var(--bad)',letterSpacing:'-0.02em'}} className="num">1 936,50 €</div>
            <div className="muted xs">{Tr('do platby','to settle')}</div>
          </div>
        </div>

        <div className="row gap-16 grow" style={{minHeight:0}}>
          {/* Folio table */}
          <div className="card grow col" style={{minWidth:0}}>
            <CardHeader
              eyebrow={Tr('FOLIO · 1248','FOLIO · 1248')}
              title={Tr('Položky pobytu · 9','Stay items · 9')}
              action={
                <div className="row gap-6">
                  <button className="btn sm"><Icon n="plus" size={12}/> {Tr('Položka','Item')}</button>
                  <button className="btn sm">{Tr('Rozdeliť účet','Split bill')}</button>
                  <button className="btn sm"><Icon n="print" size={12}/></button>
                </div>}/>
            <div style={{overflowY:'auto'}}>
              <table className="t">
                <thead><tr>
                  <th>{Tr('Dátum','Date')}</th>
                  <th>{Tr('Položka','Item')}</th>
                  <th style={{textAlign:'right'}}>{Tr('Mn.','Qty')}</th>
                  <th style={{textAlign:'right'}}>{Tr('Cena','Unit')}</th>
                  <th style={{textAlign:'right'}}>{Tr('Suma','Amount')}</th>
                  <th>{Tr('Účet','Account')}</th>
                </tr></thead>
                <tbody>
                  {[
                    ['7. 5.','Pobyt · Premium Spa 401','14','148 €','2 072 €','guest'],
                    ['7. 5.','Diéta D2 · raň. + obed + večera','14','22 €','308 €','guest'],
                    ['9. 5.','Minibar · nealko','5','3,50 €','17,50 €','guest'],
                    ['10. 5.','Wellness Premium prístup','7','12 €','84 €','guest'],
                    ['11. 5.','Doplnková masáž (mimo balíka)','2','45 €','90 €','guest'],
                    ['12. 5.','Pranie bielizne','—','—','12 €','guest'],
                    ['15. 5.','Mestský poplatok','14','1,50 €','21 €','guest'],
                    ['18. 5.','Bar · večera s hosťami','1','64 €','64 €','company'],
                    ['—','Vernostná zľava (Gold)','—','—','– 80 €','guest'],
                  ].map((r,i)=>(
                    <tr key={i}>
                      <td className="num muted">{r[0]}</td>
                      <td><b>{r[1]}</b></td>
                      <td className="num" style={{textAlign:'right'}}>{r[2]}</td>
                      <td className="num muted" style={{textAlign:'right'}}>{r[3]}</td>
                      <td className="num" style={{textAlign:'right',fontWeight:700}}>{r[4]}</td>
                      <td>{r[5]==='guest'? <P>Hosť</P> : <P k="plum">Firma · LB</P>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: payment */}
          <div className="col gap-12" style={{flex:'0 0 380px'}}>
            {/* Split summary */}
            <div className="card pad-16 col gap-10">
              <div className="eyebrow">{Tr('ROZDELENIE ÚČTU','BILL SPLIT')}</div>
              <div style={{padding:12,background:'var(--blue-50)',borderLeft:'3px solid var(--blue)',borderRadius:8}}>
                <div className="row between center">
                  <div className="col"><div className="xs muted">Hosť</div><b>Ján Bobula</b></div>
                  <b className="num" style={{fontSize:18,fontFamily:'Plus Jakarta Sans'}}>1 872,50 €</b>
                </div>
                <div className="muted xs" style={{marginTop:4}}>7 položiek · zľava Gold − 80 € · záloha − 500 €</div>
              </div>
              <div style={{padding:12,background:'var(--plum-soft)',borderLeft:'3px solid var(--plum)',borderRadius:8}}>
                <div className="row between center">
                  <div className="col"><div className="xs muted">Firma</div><b>LB s.r.o.</b></div>
                  <b className="num" style={{fontSize:18,fontFamily:'Plus Jakarta Sans'}}>64 €</b>
                </div>
                <div className="muted xs" style={{marginTop:4}}>IČO 12345678 · fakt. splatnosť 14d</div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="card col">
              <CardHeader
                eyebrow={Tr('PRIJATIE PLATBY 1 936,50 €','PAYMENT €1,936.50')}
                title={Tr('Spôsoby — môžeš kombinovať','Methods — can combine')}/>
              <div className="col gap-8 pad-16">
                <div className="row gap-8">
                  <div style={{flex:1,padding:14,background:'var(--navy)',color:'#fff',borderRadius:10}}>
                    <div className="eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>Karta · pre-auth</div>
                    <div className="row between center" style={{marginTop:6}}>
                      <span style={{fontSize:11.5}}>VISA · 4242</span>
                      <b className="num" style={{fontSize:16}}>1 836,50 €</b>
                    </div>
                  </div>
                  <div style={{flex:'0 0 130px',padding:14,background:'#fff',border:'1px solid var(--line)',borderRadius:10}}>
                    <div className="eyebrow">Hotovosť</div>
                    <div className="num" style={{fontSize:16,fontWeight:700,marginTop:6,fontFamily:'Plus Jakarta Sans'}}>100 €</div>
                  </div>
                </div>
                <button className="btn ghost" style={{justifyContent:'center'}}>+ {Tr('Pridať spôsob (QR · prevod · body)','Add method')}</button>
                <hr style={{margin:'4px 0'}}/>
                <div className="row gap-8 center">
                  <span className="muted small">{Tr('Doklad','Document')}:</span>
                  <span className="seg">
                    <span className="s on">eKasa</span>
                    <span className="s">Faktúra</span>
                    <span className="s">Daňový</span>
                  </span>
                </div>
                <button className="btn accent lg" style={{justifyContent:'center',marginTop:4}} onClick={()=>{nav.toast(Tr('✓ Platba 1 936,50 € prijatá','✓ Payment received')); nav.go('dash');}}><Icon n="cash" size={16}/> {Tr('Spracovať platbu','Process payment')}</button>
              </div>
            </div>

            {/* After */}
            <div className="card pad-16">
              <div className="eyebrow">{Tr('PO PLATBE','AFTER PAYMENT')}</div>
              <div className="col gap-6 small" style={{marginTop:8}}>
                <div className="chk on"><div className="box"/><span>{Tr('Tlač / email faktúry','Print / email invoice')}</span></div>
                <div className="chk on"><div className="box"/><span>{Tr('Uvoľniť izbu pre HK','Release room to HK')}</span></div>
                <div className="chk on"><div className="box"/><span>{Tr('Vrátiť depozit (karta)','Refund deposit')}</span></div>
                <div className="chk on"><div className="box"/><span>{Tr('Notif. M5 · ukončiť pobyt','Notify M5 · close stay')}</span></div>
                <div className="chk"><div className="box"/><span>{Tr('Pozvánka NPS prieskum','NPS survey invite')}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HFScreen>
  );
}
window.HFCheckout = HFCheckout;
