/* Bare Signals Blood Work v9 core (same as v8): palette, test-group meanings, the words that become test chips, and the reverse indexes
   (which compounds test for a test, which compounds move it). Shared by /blood/v5/ and the Library cross-link file (lib.js),
   so both always agree. No DOM. */
(function(root){
function BWCore(BW){
const T=BW.tests,C=BW.comps,MK=BW.markers;
const TI={},CI={};T.forEach((t,i)=>{t.i=i;TI[t.id]=t});C.forEach((c,i)=>{c.i=i;CI[c.id]=c});
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* the 30 Bare Signals colours, same hexes as Library and Stripe v3 */
const PAL={Appetite:['Appetite & satiety','#DDD0F6'],Glucose:['Glucose & insulin','#FFCBAA'],Fat:['Fat metabolism','#FFA51F'],Energy:['Cellular energy','#DBFAB3'],Endocrine:['Endocrine & growth','#FFDE59'],Muscle:['Muscle & performance','#F28E79'],Bone:['Bone & cartilage','#C782A5'],Repair:['Tissue repair','#E1DE62'],Inflammation:['Inflammatory signaling','#FF5050'],Immunity:['Immunity','#6777B6'],Skin:['Skin & aesthetics','#FFEEEE'],Hair:['Hair','#924C1C'],Cognition:['Cognition','#C2DCFF'],Drive:['Drive & mental stamina','#B493E8'],Mood:['Mood','#CC007E'],Plasticity:['Neural plasticity','#BAB802'],Neuroprotection:['Neural protection','#CAF5F7'],Sleep:['Sleep & rhythms','#5271FF'],Desire:['Connection & desire','#BE5103'],Reproductive:['Reproductive','#FF99D8'],Protection:['Cellular protection','#99ACFF'],Aging:['Aging & senescence','#CCA300'],Organ:['Organ function','#FCB0B4'],Cancer:['Cancer biology','#79A54D'],Tanning:['Tanning','#B27205'],DNA:['DNA & telomeres','#74BCFF'],Pain:['Pain & sensory','#87CFC5'],Gut:['Digestive & gut','#AACC96'],Reward:['Reward & urges','#EA5E86'],Heart:['Heart & vessels','#9E1B32']};
const MAP={
 'WEIGHT LOSS':'Appetite','ORAL GLP-1':'Appetite','REPAIR':'Repair','SKIN/LONGEVITY':'Skin','SKIN':'Skin','LONGEVITY':'Aging',
 'GH SECRETAGOGUE':'Endocrine','GH AMPLIFIER':'Endocrine','GH (LONG-ACTING)':'Endocrine','GROWTH HORMONE':'Endocrine','GH (VISCERAL FAT)':'Endocrine','GH (ORAL)':'Endocrine',
 'IMMUNE':'Immunity','SEXUAL':'Desire','COGNITIVE':'Cognition','TANNING/LIBIDO':'Tanning','PERFORMANCE':'Muscle','ANTIOXIDANT':'Protection','METABOLIC':'Fat',
 'SUGAR & ENERGY':'Glucose','HEART & CHOLESTEROL':'Heart','BLOOD CELLS':'Heart','THYROID':'Endocrine','HORMONES':'Endocrine',
 'LIVER':'Organ','KIDNEY':'Organ','INFLAMMATION':'Inflammation','VITAMINS':'Energy','IRON':'Energy','INFECTIOUS':'Immunity',
 'CANCER MARKERS':'Cancer','GUT HEALTH':'Gut','DNA & GENETICS':'DNA','WOMEN-SPECIFIC':'Reproductive','BODY SCANS':'Protection','PREVENTIVE':'Protection'
};
const tagOf=c=>{const k=MAP[String(c).toUpperCase()];return k?{k:k,name:PAL[k][0],hex:PAL[k][1]}:{k:null,name:'',hex:'#E3E0BF'}};
const tcol=id=>tagOf(TI[id].cat).hex;

/* groups: what a protocol usually means by "liver", "thyroid", "CBC" and so on */
const GROUP={LIVER:['alt','ast','ggt'],THYROID:['tsh','free-t3','free-t4'],KIDNEY:['creatinine-egfr','bun'],'BLOOD CELLS':['hemoglobin','hematocrit','white-blood-cells','platelets'],LIPIDS:['total-cholesterol','ldl-cholesterol','hdl-cholesterol','triglycerides','apob']};
const GCAT={LIPIDS:'HEART & CHOLESTEROL'};
const GNAME={LIVER:'Liver',THYROID:'Thyroid',KIDNEY:'Kidney','BLOOD CELLS':'Blood count (CBC)',LIPIDS:'Lipids'};

/* words in the text that become chips: test (t:), group (g:) or compound (c:). Third value 1 = match exact case only. */
const KW=[
 ['pancreas (amylase/lipase)','t:amylase-lipase'],['amylase/lipase','t:amylase-lipase'],['amylase','t:amylase-lipase'],['lipase','t:amylase-lipase'],
 ['fasting glucose','t:fasting-glucose'],['blood glucose','t:fasting-glucose'],['blood sugar','t:fasting-glucose'],['glucose','t:fasting-glucose'],
 ['fasting insulin','t:fasting-insulin'],['insulin','t:fasting-insulin'],['HbA1C','t:hba1c'],['C-peptide','t:c-peptide'],['HOMA-IR','t:homa-ir',1],
 ['ApoB','t:apob'],['ApoA-1','t:apoa-1'],['Lp(a)','t:lipoprotein-lp'],['LDL','t:ldl-cholesterol',1],['HDL','t:hdl-cholesterol',1],['triglycerides','t:triglycerides'],
 ['lipid panel','g:LIPIDS'],['lipids','g:LIPIDS'],['cholesterol','g:LIPIDS'],
 ['liver enzymes','g:LIVER'],['liver function','g:LIVER'],['liver','g:LIVER'],['ALT','t:alt',1],['AST','t:ast',1],['GGT','t:ggt',1],['ALP','t:alkaline-phosphatase',1],['bilirubin','t:bilirubin'],['albumin','t:albumin'],
 ['thyroid panel','g:THYROID'],['full thyroid','g:THYROID'],['thyroid function','g:THYROID'],['thyroid','g:THYROID'],['TSH','t:tsh',1],['FT3','t:free-t3',1],['free T3','t:free-t3'],['FT4','t:free-t4',1],['free T4','t:free-t4'],['rT3','t:reverse-t3',1],['reverse T3','t:reverse-t3'],
 ['B12','t:vitamin-b12'],['vitamin D','t:vitamin-d'],['folate','t:folic-acid'],['electrolytes','t:electrolytes'],
 ['kidney function','g:KIDNEY'],['kidney','g:KIDNEY'],['creatinine','t:creatinine-egfr'],['eGFR','t:creatinine-egfr'],['cystatin C','t:cystatin-c'],['BUN','t:bun',1],['uric acid','t:uric-acid'],
 ['IGF-1','t:igf-1'],['cortisol','t:cortisol'],['prolactin','t:prolactin'],['estradiol','t:estradiol'],['progesterone','t:progesterone'],['testosterone','t:free-total-testosterone'],['SHBG','t:shbg',1],['DHEA-S','t:dhea-s'],['AMH','t:amh',1],
 ['CBC with differential','g:BLOOD CELLS'],['CBC with hematocrit','g:BLOOD CELLS'],['CBC','g:BLOOD CELLS',1],['WBC differential','t:white-blood-cells'],['WBC','t:white-blood-cells',1],['white blood cells','t:white-blood-cells'],
 ['hematocrit','t:hematocrit'],['hemoglobin','t:hemoglobin'],['platelets','t:platelets'],['platelet','t:platelets'],['eosinophils','t:eosinophils'],['NLR','t:nlr',1],['ESR','t:esr',1],['MCV','t:mcv',1],
 ['hs-CRP','t:hs-crp'],['CRP','t:hs-crp',1],
 ['iron + ferritin','t:ferritin'],['iron/ferritin','t:ferritin'],['ferritin','t:ferritin'],['serum iron','t:serum-iron-tibc-transferrin'],['TIBC','t:serum-iron-tibc-transferrin',1],['iron','t:serum-iron-tibc-transferrin'],
 ['zinc','t:zinc'],['selenium','t:selenium'],['copper levels','t:zinc-selenium-rbc-magnesium-copper'],['magnesium','t:zinc-selenium-rbc-magnesium-copper'],['phosphorus','t:calcium-phosphate'],['phosphate','t:calcium-phosphate'],['calcium','t:calcium-phosphate'],
 ['DEXA','t:dexa-scan',1],['VO2 max','t:vo2-max'],['ECG','t:ecg-cac-score',1],['GI-MAP','t:gi-map'],['stool PCR','t:gi-map'],['H. pylori','t:h-pylori'],
 ['full skin check','t:skin-check'],['skin check','t:skin-check'],['mole mapping','t:skin-check'],['telomere length','t:biological-age'],['biological age','t:biological-age'],
 ['hepatitis B','t:hepatitis-b'],['hepatitis C','t:hepatitis-c'],['CA-125','t:ca-125'],['CEA','t:ca-125-cea-afp',1],
 ['semaglutide','c:semaglutide'],['tirzepatide','c:tirzepatide'],['retatrutide','c:retatrutide'],['ipamorelin','c:ipamorelin'],['GHRP-2','c:ghrp-2'],['GHRP-6','c:ghrp-6'],['no-DAC','c:cjc-1295-no-dac'],
 ['MK-677','c:mk-677'],['tesamorelin','c:tesamorelin'],['BPC-157','c:bpc-157'],['GHK-Cu','c:ghk-cu'],['MOTS-C','c:mots-c'],['TB-500','c:tb-500-frag-17-23'],['thymosin beta-4','c:thymosin-beta-4']
];
const KWS=KW.map(([p,t,cs])=>({p,t,cs:!!cs,lp:p.toLowerCase()})).filter(k=>(k.t[0]==='t'&&TI[k.t.slice(2)])||(k.t[0]==='g'&&GROUP[k.t.slice(2)])||(k.t[0]==='c'&&CI[k.t.slice(2)])).sort((a,b)=>b.p.length-a.p.length);
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const KRE=new RegExp('(^|[^A-Za-z0-9-])('+KWS.map(k=>reEsc(esc(k.p))).join('|')+')(?![A-Za-z0-9-])','gi');
const look=m=>{const l=m.toLowerCase();return KWS.find(k=>esc(k.lp)===l&&(!k.cs||esc(k.p)===m))};
const expand=tg=>tg[0]==='t'?[tg.slice(2)]:tg[0]==='g'?GROUP[tg.slice(2)]:[];
/* reverse indexes: which compounds test for a test, which compounds move it */
function scan(text){const s=new Set();esc(text||'').replace(KRE,(a,pre,m)=>{const k=look(m);if(k)s.add(k.t);return a});return s}
/* ordered list of test ids a text asks for (groups expanded to their usual tests) */
function testsIn(text){const out=[];scan(text).forEach(tg=>expand(tg).forEach(id=>{if(TI[id]&&!out.includes(id))out.push(id)}));return out}
function proto(c){const out=new Map();if(!c)return out;
  if(c.ids){c.ids.before.forEach(id=>{if(TI[id]&&!out.has(id))out.set(id,'before')});c.ids.monitor.forEach(id=>{if(TI[id]&&!out.has(id))out.set(id,'monitor')});return out}
  if(!c.pep)return out;
  testsIn(c.pep.before).forEach(id=>{if(!out.has(id))out.set(id,'before')});
  testsIn(c.pep.monitor).forEach(id=>{if(!out.has(id))out.set(id,'monitor')});
  return out}
/* marker effects: keys are a Matrix marker index, or t:<test id> for researched tests outside the 26 markers */
const mxTests=k=>k.slice(0,2)==='t:'?[k.slice(2)]:MK[k].t;
const mxName=k=>k.slice(0,2)==='t:'?TI[k.slice(2)].n:MK[k].n;
const PROTO={},TESTBY={},MOVE={};
C.forEach(c=>{PROTO[c.id]=proto(c);PROTO[c.id].forEach((w,id)=>(TESTBY[id]=TESTBY[id]||[]).push(c))});
C.forEach(c=>{if(c.mx)Object.entries(c.mx).forEach(([k,v])=>{const sy=v[0],note=v[1];if(sy!=='=')mxTests(k).forEach(id=>{if(TI[id])(MOVE[id]=MOVE[id]||[]).push({c,sy,note,m:mxName(k)})})})});
const SYO={'⚡':0,'⚠':1,'🔍':2,'↑':3,'↓':4,'=':5,'•':6};
const SYL={'⚡':'Danger, must test','⚠':'Watch for safety','🔍':'Tracks if it is working','↑':'Raises this marker','↓':'Lowers this marker','=':'Is this substance','•':'Named in the notes'};
/* ranges: "LABEL: value" rows plus the notes underneath */
const LBL=/^\s*([A-Za-z][^:]{0,44}?):\s*(.*)$/;
function parseRange(r){
  const rows=[],notes=[];let notesMode=false;
  String(r||'').split('\n').forEach(line=>{const l=line.trim();
    if(!l){if(rows.length)notesMode=true;return}
    const m=!notesMode&&l.match(LBL);
    if(m&&!/^https?$/i.test(m[1]))rows.push({l:m[1].trim(),v:m[2].trim()});
    else if(!notesMode&&rows.length&&!rows[rows.length-1].v)rows[rows.length-1].v=l;
    else if(!notesMode&&rows.length&&!/[.!?]$/.test(rows[rows.length-1].v)&&l.length<60)rows[rows.length-1].v+=' '+l;
    else notes.push(l)});
  rows.forEach(x=>{const L=x.l.toUpperCase();x.k=/^LAB\b/.test(L)?'':/RED FLAG|BAD|DANGER|HIGH|LOW|DEFICIEN|POOR|CONCERN|ELEVATED|ABNORMAL|INVESTIGATE|POSITIVE|RISK|ALARM|ACT|URGENT|PROBLEM|WORRY|DIABETIC|DEFICIENT/.test(L)?'w':/OPTIMAL|GOOD|EXCELLENT|IDEAL|DESIRABLE|ELITE|NEGATIVE|NORMAL|ACCEPTABLE|OKAY|OK\b|AVERAGE|TARGET|HEALTHY|FINE/.test(L)?'g':''});
  return{rows,notes};
}
function target(t){const R=parseRange(t.range);const g=R.rows.find(x=>x.k==='g'&&/OPTIMAL|GOOD|EXCELLENT|IDEAL|DESIRABLE|TARGET|HEALTHY|NEGATIVE/i.test(x.l))||R.rows.find(x=>x.k==='g')||R.rows[0];
  if(g)return(g.l+': '+g.v).slice(0,90);const f=String(t.range||'').replace(/\s*\n\s*/g,' ').trim();return f?f.slice(0,70)+(f.length>70?'…':''):''}
/* the two numbers shown on the right of a marker row: what to aim for and where it turns bad */
const short=v=>{v=String(v||'').replace(/\s*\(.*?\)\s*/g,' ').replace(/\s+/g,' ').trim();return v.length>22?v.slice(0,21).trim()+'…':v};
function nums(id,dir){const t=TI[id];if(!t)return null;const R=parseRange(t.range);const rows=R.rows.filter(x=>/\d/.test(x.v));if(!rows.length)return null;
  const isLow=x=>/DEFICIEN|LOW|BELOW/i.test(x.l+' '+x.v.slice(0,6));
  const g=rows.find(x=>x.k==='g'&&/OPTIMAL|GOOD|EXCELLENT|IDEAL|DESIRABLE|TARGET|HEALTHY/i.test(x.l))||rows.find(x=>x.k==='g');
  const n=!g&&rows.find(x=>x.k===''&&!/^LAB\b/i.test(x.l));
  const lbl=l=>/^[A-Z]{1,3}\b/.test(l)?l:l.charAt(0)+l.slice(1).toLowerCase();
  const labRow=rows.find(x=>/^LAB\b/i.test(x.l));
  const aim=g?short(g.v):n?short((n.l.length<12?lbl(n.l)+' ':'')+n.v):labRow?short('lab '+labRow.v):'';
  const ws=rows.filter(x=>x.k==='w');
  let w=(dir==='↓'?ws.find(isLow):dir==='↑'?ws.find(x=>!isLow(x)):null)||ws[0],bad='',kind='';
  if(w){bad=short(w.v);kind=isLow(w)?'low':'high'}
  else{const lab=rows.find(x=>/^LAB\b/i.test(x.l))||g||n;const m=lab&&lab.v.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
    if(m){if(dir==='↓'){bad='below '+m[1];kind='low'}else{bad='above '+m[2];kind='high'}}}
  if(!aim&&!bad)return null;return{aim,bad,kind}}
/* per compound: what each of its tests is doing, for the chip icons. Matrix direction wins; the owner's bracket notes give the words. */
const DANGERW=/pancreatitis|cancer|stroke|critical|emergency|melanoma|gout|must stay|must track|stop/i;
function annotate(c){
  const A={};const P=PROTO[c.id];
  const put=(id,k,v)=>{(A[id]=A[id]||{})[k]=A[id][k]||v};
  if(c.pep)['before','monitor','flags'].forEach(f=>{const txt=c.pep[f]||'';
    esc(txt).replace(KRE,(all,pre,m,off)=>{const k=look(m);if(!k)return all;
      const after=esc(txt).slice(off+all.length,off+all.length+90);const pm=after.match(/^\s*\(([^)]{2,80})\)/);
      if(pm){let n=pm[1].replace(/!+/g,'').replace(/&amp;/g,'&').trim();const d=/deplet|drop|lower|decreas|fall/i.test(n)?'↓':/rais|rise|increas|elevat|spike|chronically/i.test(n)?'↑':'';
        n=n.split(/\s+[—–-]\s+|;\s*/)[0];if(n.length>34)n=n.slice(0,33).trim()+'…';
        const rest=n.replace(KRE,'$1').replace(/[^A-Za-z]/g,'');if(n&&(scan(n).size&&rest.length<4))n='';
        expand(k.t).forEach(id=>{if(P.has(id)){if(n)put(id,'note',n);if(d)put(id,'dir',d);if(DANGERW.test(pm[1]))put(id,'danger',true)}})}
      return all})});
  if(c.mx)Object.entries(c.mx).forEach(([k,v])=>{const sy=v[0];mxTests(k).forEach(id=>{if(!TI[id])return;
    if(sy==='↑'||sy==='↓')(A[id]=A[id]||{}).dir=sy;
    if(sy==='⚡'){(A[id]=A[id]||{}).danger=true}
    if(sy==='⚠')put(id,'watch',true);if(sy==='🔍')put(id,'track',true);
    if(!(A[id]&&A[id].note)&&v[1])put(id,'mnote',v[1])})});
  return A}
function markerRows(c){
  if(!c.mx)return[];
  return Object.entries(c.mx).filter(([k,v])=>v[0]!=='=').map(([k,v])=>{const ts=mxTests(k).filter(id=>TI[id]);
    return{k,sy:v[0],note:v[1]||'',conf:v[2]||'',name:mxName(k),tests:ts,nums:ts.length?nums(ts[0],v[0]):null,mag:(c.mag||{})[k]||null}})
   .sort((a,b)=>SYO[a.sy]-SYO[b.sy]||(a.tests.length?0:1)-(b.tests.length?0:1))}
const TIER={common:'',ask:'Ask your lab',specialty:'Specialty, pricier'};
return {T,C,MK,TI,CI,esc,PAL,MAP,tagOf,tcol,GROUP,GCAT,GNAME,KWS,KRE,look,expand,scan,testsIn,proto,PROTO,TESTBY,MOVE,SYO,SYL,parseRange,target,nums,annotate,markerRows,mxTests,mxName,TIER};
}
if(typeof module!=='undefined'&&module.exports)module.exports=BWCore;else root.BWCore=BWCore;
})(typeof window!=='undefined'?window:this);
