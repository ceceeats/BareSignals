/* Bare Signals Blood Work v5 core: palette, test-group meanings, the words that become test chips, and the reverse indexes
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
 ['MK-677','c:mk-677'],['tesamorelin','c:tesamorelin'],['BPC-157','c:bpc-157'],['GHK-Cu','c:ghk-cu'],['MOTS-C','c:mots-c'],['TB-500','c:thymosin-beta-4']
];
const KWS=KW.map(([p,t,cs])=>({p,t,cs:!!cs,lp:p.toLowerCase()})).filter(k=>(k.t[0]==='t'&&TI[k.t.slice(2)])||(k.t[0]==='g'&&GROUP[k.t.slice(2)])||(k.t[0]==='c'&&CI[k.t.slice(2)])).sort((a,b)=>b.p.length-a.p.length);
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const KRE=new RegExp('(^|[^A-Za-z0-9-])('+KWS.map(k=>reEsc(esc(k.p))).join('|')+')(?![A-Za-z0-9-])','gi');
const look=m=>{const l=m.toLowerCase();return KWS.find(k=>esc(k.lp)===l&&(!k.cs||esc(k.p)===m))};
const expand=tg=>tg[0]==='t'?[tg.slice(2)]:tg[0]==='g'?GROUP[tg.slice(2)]:[];
/* reverse indexes: which compounds test for a test, which compounds move it */
function scan(text){const s=new Set();esc(text||'').replace(KRE,(a,pre,m)=>{const k=look(m);if(k)s.add(k.t);return a});return s}
const SAME={semaglutide:'semaglutide',ipamorelin:'ipamorelin','ghrp-2':'ghrp-2','no-dac':'cjc-1295-no-dac'};
function proto(c,seen){seen=seen||new Set();const out=new Map();if(!c||!c.pep||seen.has(c.id))return out;seen.add(c.id);
  [['before',c.pep.before],['monitor',c.pep.monitor]].forEach(([w,txt])=>{
    scan(txt).forEach(tg=>expand(tg).forEach(id=>{if(TI[id]&&!out.has(id))out.set(id,w)}));
    const re=/same as (semaglutide|ipamorelin|ghrp-2|no-dac)/gi;let m;
    while((m=re.exec(txt)))proto(CI[SAME[m[1].toLowerCase()]],seen).forEach((v,id)=>{if(!out.has(id))out.set(id,v)})});
  return out}
const PROTO={},TESTBY={},MOVE={};
C.forEach(c=>{PROTO[c.id]=proto(c);PROTO[c.id].forEach((w,id)=>(TESTBY[id]=TESTBY[id]||[]).push(c))});
C.forEach(c=>{if(c.mx)Object.entries(c.mx).forEach(([j,[sy,note]])=>{if(sy!=='=')MK[j].t.forEach(id=>(MOVE[id]=MOVE[id]||[]).push({c,sy,note,m:MK[j].n}))})});
const SYO={'⚡':0,'⚠':1,'🔍':2,'↑':3,'↓':4,'=':5,'•':6};
const SYL={'⚡':'Danger, must test','⚠':'Monitor for safety','🔍':'Tracks if it is working','↑':'Raises this marker','↓':'Lowers this marker','=':'Is this substance','•':'Named in the notes'};
return {T,C,MK,TI,CI,esc,PAL,MAP,tagOf,tcol,GROUP,GCAT,GNAME,KWS,KRE,look,expand,scan,proto,PROTO,TESTBY,MOVE,SYO,SYL};
}
if(typeof module!=='undefined'&&module.exports)module.exports=BWCore;else root.BWCore=BWCore;
})(typeof window!=='undefined'?window:this);
