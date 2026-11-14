/* Bare Signals brain3d v1 (14 Nov 2026)
   Rotatable 3D brain for the Brain goal page. Reuses the Organs mesh
   (/curious/organs/data/brain.wasm, MNI ICBM152 2009 template, McGill licence)
   and the same shaders and quantised-mesh format as /curious/organs/.
   Adds cortical lobe sub-buffers, split by triangle centroid in model space,
   so prefrontal, frontal, parietal, temporal and occipital can light separately.
   API: BSBRAIN.init(opts) -> BSBRAIN.light({t1:[],t2:[],t3:[],off:[]}), .clear(), .focus(bool)
*/
(function(){
var DATA="/curious/organs/data/brain.wasm", CACHE="bs-organs-v1";
var gl,cv,prog,loc={},parts=[],lobes={},anch=null,raf=0,ready=false;
var yaw=0.55,pitch=0.10,auto=true,drag=null,pulse=0,lastDrag=-1e9,onPick=null,focus=false;
var TIER={},peel=false,deepLit=false;
var DEEP={hippoL:1,hippoR:1,amyL:1,amyR:1,thalL:1,thalR:1,hypothal:1,pituitary:1,pineal:1,midbrain:1,pons:1};

/* region key -> mesh part names (lobes are virtual parts) */
var MAP={
 brain:["ctxL","ctxR"], cortex:["ctxL","ctxR"],
 pfc:["lobe:pfc"], frontal:["lobe:frontal"], parietal:["lobe:parietal"],
 occipital:["lobe:occipital"], temporal:["lobe:temporal"],
 hippo:["hippoL","hippoR"], amygdala:["amyL","amyR"], thalamus:["thalL","thalR"],
 hypothal:["hypothal"], pituitary:["pituitary"], pineal:["pineal"],
 cerebellum:["cbl"], brainstem:["midbrain","pons","medulla"],
 vta:["midbrain"], raphe:["midbrain","pons","medulla"], lc:["pons"],
 cord:["medulla"]
};
/* deep structures the template mesh does not carry */
var ABSENT={accumbens:1,basal:1,insula:1};

var VS="attribute vec3 p;attribute vec3 n;attribute float s;uniform mat3 R;uniform float S;uniform vec3 T;uniform float A;uniform vec2 O2;varying vec3 vn;varying float vs;"+
"void main(){vec3 q=R*(p*S+T);vn=R*n;vs=s;gl_Position=vec4(q.x*A+O2.x,q.y+O2.y,-q.z*.4,1.0);}";
var FS="precision mediump float;varying vec3 vn;varying float vs;uniform vec3 C;uniform float G;uniform float Al;uniform float H;uniform float BF;uniform float RA;uniform float PK;"+
"void main(){if(PK>.5){gl_FragColor=vec4(C,1.0);return;}vec3 N=normalize(vn);if(N.z<0.0)N=-N;vec3 L=normalize(vec3(-.45,.6,.75));float d=max(dot(N,L),0.);float f=max(dot(N,normalize(vec3(.6,-.2,.5))),0.);"+
"float rim=pow(1.-abs(N.z),3.4);vec3 paper=vec3(1.,1.,.92);vec3 col=mix(C,vec3(.86,.41,.19),H*.62)*mix(.66,1.06,vs);"+
"vec3 c=col*(.54+.44*d+.14*f)+paper*rim*(.13+G*.26+H*.34);c=mix(c,paper,.10);if(Al<1.)c=mix(c,col*(.5+.5*d),.4);float a=Al<1.?Al+rim*RA:1.;gl_FragColor=vec4(c,a);}";

function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o}
function hex(h){return [1,3,5].map(function(i){return parseInt(h.substr(i,2),16)/255})}
function gunzip(ab){var u=new Uint8Array(ab);if(!(u[0]===0x1f&&u[1]===0x8b))return Promise.resolve(ab);
 return new Response(new Blob([ab]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();}
function parseBin(ab){var dv=new DataView(ab),hl=dv.getUint32(0,true),H=JSON.parse(new TextDecoder().decode(new Uint8Array(ab,4,hl)));var o=4+hl;
 function al(){o=(o+3)&~3}
 H.parts.forEach(function(p){p.q=new Int16Array(ab.slice(o,o+p.nv*6));o+=p.nv*6;al();
  var d=new Int32Array(ab.slice(o,o+p.ni*4));o+=p.ni*4;
  var ix=p.nv>=65536?new Uint32Array(p.ni):new Uint16Array(p.ni),s=0;
  for(var k=0;k<p.ni;k++){s+=d[k];ix[k]=s}p.ix=ix;p.i32=p.nv>=65536;
  if(p.s){p.sh=new Uint8Array(ab.slice(o,o+p.nv));o+=p.nv;al()}});
 return H}

/* Lobe of a cortical triangle, by direction from the brain's centre rather than
   by raw position: a triangle deep in a sulcus points the same way as the gyrus
   above it, so it gets the same label and lit regions come out solid, no pepper.
   Nearest prototype wins, so every triangle is labelled and no holes are left. */
var PROTO=[["pfc",0,0.22,0.97],["frontal",0,0.60,0.66],["parietal",0,0.97,-0.12],
           ["occipital",0,0.30,-0.95],["temporal",0.86,-0.46,0.18]];
function lobeOf(x,y,z){
 var cy=y-0.05,L=Math.sqrt(x*x+cy*cy+z*z)||1,dx=x/L,dy=cy/L,dz=z/L;
 var best=-2,lab=null;
 for(var i=0;i<PROTO.length;i++){var p=PROTO[i];
  var px=p[1],py=p[2],pz=p[3];
  if(p[0]==="temporal")px=dx<0?-px:px;
  var m=Math.sqrt(px*px+py*py+pz*pz);
  var s=(dx*px+dy*py+dz*pz)/m;
  if(s>best){best=s;lab=p[0]}}
 return lab}

function buildPart(pt){
 var q=pt.q,ix=pt.ix,nv=q.length/3,P=new Float32Array(q.length),N=new Float32Array(q.length),i,t;
 for(i=0;i<q.length;i++)P[i]=q[i]/32767;
 for(t=0;t<ix.length;t+=3){var a=ix[t]*3,b=ix[t+1]*3,c=ix[t+2]*3;
  var ux=P[b]-P[a],uy=P[b+1]-P[a+1],uz=P[b+2]-P[a+2],vx=P[c]-P[a],vy=P[c+1]-P[a+1],vz=P[c+2]-P[a+2];
  var nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
  [a,b,c].forEach(function(k){N[k]+=nx;N[k+1]+=ny;N[k+2]+=nz})}
 var P2=new Float32Array(P.length),N2=new Float32Array(N.length);
 for(i=0;i<nv;i++){P2[i*3]=P[i*3];P2[i*3+1]=P[i*3+2];P2[i*3+2]=-P[i*3+1];
  N2[i*3]=N[i*3];N2[i*3+1]=N[i*3+2];N2[i*3+2]=-N[i*3+1]}
 var vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,P2,gl.STATIC_DRAW);
 var nb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,N2,gl.STATIC_DRAW);
 var ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,ix,gl.STATIC_DRAW);
 var sb=null;if(pt.sh){var sf=new Float32Array(pt.sh.length);for(i=0;i<sf.length;i++)sf[i]=pt.sh[i]/255;
  sb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,sb);gl.bufferData(gl.ARRAY_BUFFER,sf,gl.STATIC_DRAW)}
 var ty=pt.i32?gl.UNSIGNED_INT:gl.UNSIGNED_SHORT;
 var out={n:pt.n,c:hex(pt.c),vb:vb,nb:nb,ib:ib,sb:sb,cnt:ix.length,ty:ty,P2:P2,ix:ix};
 /* cortex: build per-lobe index buffers from triangle centroids */
 if(pt.n==="ctxL"||pt.n==="ctxR"){
  var bins={rest:[]};
  for(t=0;t<ix.length;t+=3){
   var i0=ix[t]*3,i1=ix[t+1]*3,i2=ix[t+2]*3;
   var cx=(P2[i0]+P2[i1]+P2[i2])/3, cy=(P2[i0+1]+P2[i1+1]+P2[i2+1])/3, cz=(P2[i0+2]+P2[i1+2]+P2[i2+2])/3;
   var L=lobeOf(cx,cy,cz)||"rest";
   (bins[L]=bins[L]||[]).push(ix[t],ix[t+1],ix[t+2])}
  /* every cortex triangle belongs to exactly one bucket, so the lit and unlit
     draws never overlap and there is nothing to z-fight */
  out.bins=[];
  Object.keys(bins).forEach(function(L){
   if(!bins[L].length)return;
   var arr=pt.i32?new Uint32Array(bins[L]):new Uint16Array(bins[L]);
   var lb=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,lb);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,arr,gl.STATIC_DRAW);
   var sub={key:L==="rest"?null:"lobe:"+L,vb:vb,nb:nb,sb:sb,ib:lb,cnt:arr.length,ty:ty,c:hex(pt.c),n:pt.n};
   out.bins.push(sub);
   if(sub.key)(lobes[sub.key]=lobes[sub.key]||[]).push(sub)})}
 return out}

function rotm(){var cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
 return [cy,sp*sy,-cp*sy, 0,cp,sp, sy,-sp*cy,cp*cy]}

function tierOf(name){ return TIER[name]||null }

/* pale ghost for parts a compound does not touch: mix the part's own
   colour most of the way to paper, so it stays readable without blending */
function ghost(c){return [c[0]*.26+.74,c[1]*.26+.73,c[2]*.26+.68]}

function drawOne(o,tier,alpha){
 var H=0,G=0,C=o.c,Al=alpha===undefined?1:alpha;
 if(focus){
  if(tier==="t1"){H=1.0;G=.55}
  else if(tier==="t2"){H=.72;G=.3}
  else if(tier==="t3"){H=.30+.18*pulse;G=.70}
  else if(tier==="off"){C=[.84,.46,.46];H=0;G=0}
  else C=ghost(o.c);
 }
 gl.uniform3fv(loc.C,C);gl.uniform1f(loc.H,H);gl.uniform1f(loc.G,G);
 gl.uniform1f(loc.Al,Al);gl.uniform1f(loc.RA,Al<1?.34:0);gl.uniform1f(loc.BF,1);gl.uniform1f(loc.PK,0);
 gl.bindBuffer(gl.ARRAY_BUFFER,o.vb);gl.vertexAttribPointer(loc.p,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(loc.p);
 gl.bindBuffer(gl.ARRAY_BUFFER,o.nb);gl.vertexAttribPointer(loc.n,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(loc.n);
 if(o.sb){gl.bindBuffer(gl.ARRAY_BUFFER,o.sb);gl.vertexAttribPointer(loc.s,1,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(loc.s)}
 else {gl.disableVertexAttribArray(loc.s);gl.vertexAttrib1f(loc.s,.8)}
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,o.ib);gl.drawElements(gl.TRIANGLES,o.cnt,o.ty,0)}

function frame(t){
 raf=requestAnimationFrame(frame);
 if(!ready)return;
 if(auto&&t-lastDrag>4000&&!drag)yaw+=0.0022;
 pulse=0.5+0.5*Math.sin(t/430);
 var w=cv.clientWidth,h=cv.clientHeight,dpr=Math.min(2,devicePixelRatio||1);
 if(cv.width!==(w*dpr|0)||cv.height!==(h*dpr|0)){cv.width=w*dpr|0;cv.height=h*dpr|0}
 gl.viewport(0,0,cv.width,cv.height);
 gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 gl.useProgram(prog);
 gl.uniformMatrix3fv(loc.R,false,rotm());
 gl.uniform1f(loc.S,0.80);gl.uniform3f(loc.T,0,-0.08,0);
 gl.uniform1f(loc.A,Math.min(1,h/w));gl.uniform2f(loc.O2,0,0);
 gl.enable(gl.DEPTH_TEST);gl.disable(gl.BLEND);
 var glass=peel||(focus&&deepLit);
 /* interior and surface parts, opaque. Unlit parts go pale, never translucent. */
 parts.forEach(function(o){
  if(o.n==="ctxL"||o.n==="ctxR")return;
  drawOne(o,tierOf(o.n))});
 /* the cortex last, so it can be glass when something inside it is lit.
    Its triangles are split into disjoint lobe buckets: each is drawn once. */
 function cortex(wantLit,alpha){
  parts.forEach(function(o){
   if(o.n!=="ctxL"&&o.n!=="ctxR")return;
   var whole=tierOf(o.n);
   if(!o.bins){if(!!whole===wantLit)drawOne(o,whole,alpha);return}
   o.bins.forEach(function(s){var tr=whole||(s.key?TIER[s.key]:null);
    if(!!tr===wantLit)drawOne(s,tr,alpha)})})}
 cortex(true,1);              /* lit cortex stays solid even behind glass */
 if(glass){gl.enable(gl.BLEND);gl.depthMask(false);cortex(false,0.17);gl.depthMask(true);gl.disable(gl.BLEND)}
 else cortex(false,1)}

function attach(){
 cv.addEventListener("pointerdown",function(e){drag={x:e.clientX,y:e.clientY,yaw:yaw,pitch:pitch};
  try{cv.setPointerCapture(e.pointerId)}catch(_){}});
 cv.addEventListener("pointermove",function(e){if(!drag)return;
  var k=4.2/cv.clientWidth;yaw=drag.yaw+(e.clientX-drag.x)*k;
  pitch=Math.max(-.9,Math.min(.9,drag.pitch+(e.clientY-drag.y)*k));lastDrag=performance.now()});
 cv.addEventListener("pointerup",function(e){
  var moved=drag&&(Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y))>6;
  drag=null;lastDrag=performance.now();
  if(!moved&&onPick){var r=cv.getBoundingClientRect();
   onPick(pick(e.clientX-r.left,e.clientY-r.top))}});
 cv.addEventListener("pointercancel",function(){drag=null});
 cv.addEventListener("dblclick",function(){yaw=0.55;pitch=0.10;lastDrag=-1e9});
 cv.addEventListener("keydown",function(e){
  var k=e.key;if(k==="ArrowLeft")yaw-=.12;else if(k==="ArrowRight")yaw+=.12;
  else if(k==="ArrowUp")pitch=Math.max(-.9,pitch-.1);else if(k==="ArrowDown")pitch=Math.min(.9,pitch+.1);
  else return;e.preventDefault();lastDrag=performance.now()});
}

/* Tap picking: redraw every pickable surface into an off-screen buffer in a
   flat id colour, then read the one pixel under the finger. */
var fbo=null,rbo=null,tex=null,fbW=0,fbH=0,PICKLIST=[];
function pickTargets(){
 if(PICKLIST.length)return PICKLIST;
 parts.forEach(function(o){
  if(o.n==="ctxL"||o.n==="ctxR"){(o.bins||[]).forEach(function(s){
    PICKLIST.push({id:s.key||"cortex",o:s})});return}
  PICKLIST.push({id:o.n,o:o})});
 return PICKLIST}
function pick(px,py){
 if(!ready)return null;
 var dpr=Math.min(2,devicePixelRatio||1),W=cv.width,Hh=cv.height;
 if(!fbo||fbW!==W||fbH!==Hh){
  if(fbo){gl.deleteFramebuffer(fbo);gl.deleteRenderbuffer(rbo);gl.deleteTexture(tex)}
  fbo=gl.createFramebuffer();tex=gl.createTexture();rbo=gl.createRenderbuffer();
  gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,W,Hh,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.bindRenderbuffer(gl.RENDERBUFFER,rbo);
  gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,W,Hh);
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,rbo);
  fbW=W;fbH=Hh}
 gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
 gl.viewport(0,0,W,Hh);gl.clearColor(0,0,0,0);
 gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 gl.useProgram(prog);gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);
 gl.uniformMatrix3fv(loc.R,false,rotm());
 gl.uniform1f(loc.S,0.80);gl.uniform3f(loc.T,0,-0.08,0);
 gl.uniform1f(loc.A,Math.min(1,cv.clientHeight/cv.clientWidth));gl.uniform2f(loc.O2,0,0);
 gl.uniform1f(loc.G,0);gl.uniform1f(loc.H,0);gl.uniform1f(loc.Al,1);gl.uniform1f(loc.RA,0);gl.uniform1f(loc.BF,1);gl.uniform1f(loc.PK,1);
 var list=pickTargets(),skin=peel||(focus&&deepLit);
 list.forEach(function(it,i){
  /* when the cortex is glass the finger should reach what is behind it */
  if(skin&&(it.id==="cortex"||it.id.indexOf("lobe:")===0))return;
  var n=i+1;
  gl.uniform3f(loc.C,((n>>5)&7)/7,((n>>2)&7)/7,(n&3)/3);
  var o=it.o;
  gl.bindBuffer(gl.ARRAY_BUFFER,o.vb);gl.vertexAttribPointer(loc.p,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(loc.p);
  gl.bindBuffer(gl.ARRAY_BUFFER,o.nb);gl.vertexAttribPointer(loc.n,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(loc.n);
  gl.disableVertexAttribArray(loc.s);gl.vertexAttrib1f(loc.s,1);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,o.ib);gl.drawElements(gl.TRIANGLES,o.cnt,o.ty,0)});
 var buf=new Uint8Array(4);
 gl.readPixels(Math.round(px*dpr),Math.round(Hh-py*dpr),1,1,gl.RGBA,gl.UNSIGNED_BYTE,buf);
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.uniform1f(loc.PK,0);
 if(!buf[3])return null;
 var n=(Math.round(buf[0]/255*7)<<5)|(Math.round(buf[1]/255*7)<<2)|Math.round(buf[2]/255*3);
 var hit=list[n-1];return hit?hit.id:null}

var API={
 init:function(opts){
  cv=opts.canvas; onPick=opts.onPick||null;
  gl=cv.getContext("webgl",{antialias:true,alpha:true,premultipliedAlpha:false});
  if(!gl){if(opts.onFail)opts.onFail("nogl");return false}
  gl.getExtension("OES_element_index_uint");
  prog=gl.createProgram();gl.attachShader(prog,sh(gl.VERTEX_SHADER,VS));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,FS));
  gl.linkProgram(prog);gl.useProgram(prog);
  ["p","n","s"].forEach(function(k){loc[k]=gl.getAttribLocation(prog,k)});
  ["R","S","T","A","C","G","Al","H","O2","BF","RA","PK"].forEach(function(k){loc[k]=gl.getUniformLocation(prog,k)});
  gl.enable(gl.DEPTH_TEST);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
  attach();raf=requestAnimationFrame(frame);
  (function(){
   var go=function(ab){return gunzip(ab).then(function(b){
     var H=parseBin(b);anch=H.anch;
     H.parts.forEach(function(pt){parts.push(buildPart(pt))});
     ready=true;if(opts.onReady)opts.onReady()})};
   caches.open(CACHE).then(function(c){return c.match(DATA).then(function(r){
     if(r)return r.arrayBuffer();
     return fetch(DATA).then(function(rr){if(rr.ok){try{c.put(DATA,rr.clone())}catch(_){}}return rr.arrayBuffer()})})})
    .then(go).catch(function(){fetch(DATA).then(function(r){return r.arrayBuffer()}).then(go)
      .catch(function(){if(opts.onFail)opts.onFail("load")})});
  })();
  return true},
 light:function(t){
  TIER={};focus=true;
  ["t1","t2","t3","off"].forEach(function(k){(t[k]||[]).forEach(function(region){
   (MAP[region]||[]).forEach(function(part){TIER[part]=k})})});
  deepLit=Object.keys(TIER).some(function(p){return DEEP[p]&&TIER[p]!=="off"});
  lastDrag=performance.now()-3200;
  return {deep:deepLit,missing:API.absent([].concat(t.t1||[],t.t2||[],t.t3||[],t.off||[]))}},
 clear:function(){TIER={};focus=false;deepLit=false},
 peel:function(on){peel=!!on},
 isPeeled:function(){return peel||(focus&&deepLit)},
 reset:function(){yaw=0.55;pitch=0.10;lastDrag=-1e9},
 absent:function(regions){return (regions||[]).filter(function(r){return ABSENT[r]})},
 spin:function(on){auto=!!on},
 names:function(){return parts.map(function(o){return o.n}).concat(Object.keys(lobes))},
 view:function(y,p){yaw=y;pitch=p;lastDrag=performance.now()},
 regions:function(){return Object.keys(MAP)}
};
window.BSBRAIN=API;
})();
