/* Antibiotics & your gut, story v1 (22 Nov 2026). Scene: a cross-section of the colon wall.
   Five timeline stages of one course in a healthy adult, then the studies that measured it.
   Runs on the shared engine (/library/anim.js). Built by tools/build_anim_abx.py from tools/_abx_tmpl.js.txt. */
BSAnim.define('antibiotics',function(H,INK){
 var GREEN='#4C7A38',RED='#C02626',TEAL='#2E8F82',SOFT='#6B76A8';
 var resid='<g class="d1" transform="translate(322.3 62.5) rotate(0)"><rect x="-6.5" y="-2.8" width="13.0" height="5.6" rx="2.8" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d1" transform="translate(212.7 77.5) rotate(10)"><rect x="-6.2" y="-2.7" width="12.3" height="5.3" rx="2.7" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d1" transform="translate(27.4 73.8) rotate(2)"><rect x="-7.2" y="-3.1" width="14.4" height="6.2" rx="3.1" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d1" transform="translate(268.5 31.8) rotate(16)"><rect x="-6.5" y="-2.8" width="13.0" height="5.6" rx="2.8" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d2" transform="translate(300.7 47.0) rotate(-21)"><rect x="-6.7" y="-2.9" width="13.4" height="5.8" rx="2.9" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d2" transform="translate(178.9 50.0) rotate(-17)"><rect x="-6.0" y="-2.6" width="12.1" height="5.2" rx="2.6" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d2" transform="translate(233.3 56.2) rotate(0)"><rect x="-6.0" y="-2.6" width="12.1" height="5.2" rx="2.6" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="keep" transform="translate(206.5 40.1) rotate(4)"><rect x="-6.9" y="-3.0" width="13.8" height="5.9" rx="3.0" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="keep" transform="translate(124.1 33.2) rotate(32)"><rect x="-6.1" y="-2.6" width="12.2" height="5.3" rx="2.6" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="lost" transform="translate(185.0 27.8) rotate(27)"><rect x="-6.2" y="-2.7" width="12.5" height="5.4" rx="2.7" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="lost" transform="translate(149.3 68.9) rotate(-28)"><rect x="-6.4" y="-2.8" width="12.9" height="5.5" rx="2.8" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="lost" transform="translate(84.5 23.6) rotate(5)"><rect x="-6.3" y="-2.7" width="12.6" height="5.4" rx="2.7" fill="#AACC96" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d1" transform="translate(152.2 30.9) rotate(-3)"><rect x="-6.1" y="-2.6" width="12.2" height="5.3" rx="2.6" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d1" transform="translate(103.5 24.8) rotate(-25)"><rect x="-6.4" y="-2.7" width="12.7" height="5.5" rx="2.7" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d1" transform="translate(73.5 60.9) rotate(-24)"><rect x="-5.9" y="-2.5" width="11.8" height="5.1" rx="2.5" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d1" transform="translate(105.0 94.2) rotate(-2)"><rect x="-6.8" y="-2.9" width="13.5" height="5.8" rx="2.9" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d2" transform="translate(238.6 21.1) rotate(9)"><rect x="-6.8" y="-2.9" width="13.5" height="5.8" rx="2.9" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d2" transform="translate(322.0 22.3) rotate(16)"><rect x="-5.7" y="-2.5" width="11.4" height="4.9" rx="2.5" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="keep" transform="translate(271.9 106.5) rotate(7)"><rect x="-5.8" y="-2.5" width="11.6" height="5.0" rx="2.5" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="lost" transform="translate(194.0 68.1) rotate(-33)"><rect x="-7.0" y="-3.0" width="13.9" height="6.0" rx="3.0" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="lost" transform="translate(306.1 91.4) rotate(-15)"><rect x="-6.2" y="-2.7" width="12.5" height="5.4" rx="2.7" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="lost" transform="translate(32.4 54.2) rotate(-17)"><rect x="-6.5" y="-2.8" width="13.0" height="5.6" rx="2.8" fill="#E1DE62" stroke="#5E6B3F" stroke-width=".7"/></g><g class="d1" transform="translate(81.7 85.4) rotate(20)"><ellipse rx="6.1" ry="4.2" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="d1" transform="translate(125.9 74.3) rotate(33)"><ellipse rx="6.4" ry="4.4" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="d1" transform="translate(252.8 51.6) rotate(-26)"><ellipse rx="6.3" ry="4.4" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="d1" transform="translate(187.5 88.1) rotate(-21)"><ellipse rx="6.5" ry="4.4" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="d2" transform="translate(138.0 16.3) rotate(16)"><ellipse rx="6.7" ry="4.6" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="d2" transform="translate(169.2 97.2) rotate(26)"><ellipse rx="5.8" ry="4.0" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="d2" transform="translate(50.0 84.8) rotate(6)"><ellipse rx="6.5" ry="4.5" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="d2" transform="translate(52.8 47.1) rotate(1)"><ellipse rx="6.3" ry="4.3" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="keep" transform="translate(217.6 18.1) rotate(-32)"><ellipse rx="6.1" ry="4.2" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="keep" transform="translate(240.9 105.7) rotate(22)"><ellipse rx="7.1" ry="4.9" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="keep" transform="translate(51.6 26.2) rotate(0)"><ellipse rx="7.0" ry="4.8" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="keep" transform="translate(98.3 65.7) rotate(-20)"><ellipse rx="6.3" ry="4.3" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="keep" transform="translate(257.0 88.4) rotate(-28)"><ellipse rx="6.5" ry="4.4" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="lost" transform="translate(218.2 105.4) rotate(-34)"><ellipse rx="6.1" ry="4.2" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="lost" transform="translate(168.6 74.7) rotate(-18)"><ellipse rx="6.5" ry="4.4" fill="#99ACFF" stroke="#4A5790" stroke-width=".7"/></g><g class="d1" transform="translate(152.2 106.9) rotate(21)"><circle r="5.2" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="d1" transform="translate(96.8 42.7) rotate(8)"><circle r="4.9" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="d1" transform="translate(16.9 33.8) rotate(36)"><circle r="4.2" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="d2" transform="translate(88.7 104.2) rotate(19)"><circle r="5.1" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="d2" transform="translate(281.6 47.0) rotate(15)"><circle r="4.7" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="d2" transform="translate(24.6 97.4) rotate(-29)"><circle r="4.1" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="d2" transform="translate(140.0 49.1) rotate(-36)"><circle r="4.5" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="keep" transform="translate(269.7 67.9) rotate(-20)"><circle r="4.5" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="keep" transform="translate(302.9 24.2) rotate(11)"><circle r="4.9" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="keep" transform="translate(167.2 18.0) rotate(-22)"><circle r="4.7" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="keep" transform="translate(65.5 97.0) rotate(35)"><circle r="4.8" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g><g class="lost" transform="translate(236.5 78.5) rotate(-34)"><circle r="4.8" fill="#87CFC5" stroke="#3E7A72" stroke-width=".7"/></g>';
 var blooms='<g transform="translate(233.6 37.9) rotate(-21)"><rect x="-7.6" y="-3.2" width="15.2" height="6.5" rx="3.2" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(79.2 41.2) rotate(35)"><rect x="-7.8" y="-3.3" width="15.5" height="6.6" rx="3.3" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(317.7 39.9) rotate(-21)"><rect x="-7.8" y="-3.3" width="15.6" height="6.7" rx="3.3" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(325.4 99.1) rotate(-10)"><rect x="-6.2" y="-2.6" width="12.4" height="5.3" rx="2.6" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(155.0 87.2) rotate(-15)"><rect x="-6.2" y="-2.6" width="12.4" height="5.3" rx="2.6" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(283.2 86.6) rotate(19)"><rect x="-6.9" y="-2.9" width="13.7" height="5.9" rx="2.9" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(42.3 103.4) rotate(-24)"><rect x="-6.6" y="-2.8" width="13.2" height="5.6" rx="2.8" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(193.9 105.4) rotate(-10)"><rect x="-6.2" y="-2.6" width="12.4" height="5.3" rx="2.6" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(44.9 68.3) rotate(0)"><rect x="-7.3" y="-3.1" width="14.6" height="6.2" rx="3.1" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(285.7 24.3) rotate(6)"><rect x="-6.4" y="-2.7" width="12.8" height="5.5" rx="2.7" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(213.1 60.2) rotate(-17)"><rect x="-6.9" y="-2.9" width="13.7" height="5.9" rx="2.9" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(135.6 94.6) rotate(-25)"><rect x="-7.8" y="-3.3" width="15.5" height="6.6" rx="3.3" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(116.1 57.5) rotate(-26)"><rect x="-6.5" y="-2.8" width="13.1" height="5.6" rx="2.8" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(287.3 66.4) rotate(20)"><rect x="-7.5" y="-3.2" width="15.1" height="6.4" rx="3.2" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g><g transform="translate(308.4 72.3) rotate(-36)"><rect x="-6.4" y="-2.7" width="12.8" height="5.5" rx="2.7" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g>';
 var yeast='';
 var ghosts='<g transform="translate(185.0 27.8) rotate(27)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g><g transform="translate(149.3 68.9) rotate(-28)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g><g transform="translate(84.5 23.6) rotate(5)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g><g transform="translate(194.0 68.1) rotate(-33)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g><g transform="translate(306.1 91.4) rotate(-15)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g><g transform="translate(32.4 54.2) rotate(-17)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g><g transform="translate(218.2 105.4) rotate(-34)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g><g transform="translate(168.6 74.7) rotate(-18)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g><g transform="translate(236.5 78.5) rotate(-34)"><rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g>';
 var cells='<rect x="0" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="13" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="26" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="39" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="52" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="65" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="78" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="91" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="104" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="117" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="130" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="143" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="156" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="169" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="182" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="195" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="208" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="221" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="234" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="247" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="312" y="142" width="26" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="325" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/><rect x="338" y="142" width="22" height="56" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><ellipse cx="349" cy="184" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/>';
 var crypt='<path d="M254 142 C254 224 268 232 280 232 C292 232 306 224 306 142 Z" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/><path d="M262 148 C262 218 272 224 280 224 C288 224 298 218 298 148" fill="none" stroke="#E7B4A2" stroke-width=".9"/>';
 var brush='<path d="M5 142v-5"/><path d="M12 142v-5"/><path d="M19 142v-5"/><path d="M26 142v-5"/><path d="M33 142v-5"/><path d="M40 142v-5"/><path d="M47 142v-5"/><path d="M54 142v-5"/><path d="M61 142v-5"/><path d="M68 142v-5"/><path d="M75 142v-5"/><path d="M82 142v-5"/><path d="M89 142v-5"/><path d="M96 142v-5"/><path d="M103 142v-5"/><path d="M110 142v-5"/><path d="M117 142v-5"/><path d="M124 142v-5"/><path d="M131 142v-5"/><path d="M138 142v-5"/><path d="M145 142v-5"/><path d="M152 142v-5"/><path d="M159 142v-5"/><path d="M166 142v-5"/><path d="M173 142v-5"/><path d="M180 142v-5"/><path d="M187 142v-5"/><path d="M194 142v-5"/><path d="M201 142v-5"/><path d="M208 142v-5"/><path d="M215 142v-5"/><path d="M222 142v-5"/><path d="M229 142v-5"/><path d="M236 142v-5"/><path d="M243 142v-5"/><path d="M250 142v-5"/><path d="M257 142v-5"/><path d="M264 142v-5"/><path d="M271 142v-5"/><path d="M278 142v-5"/><path d="M285 142v-5"/><path d="M292 142v-5"/><path d="M299 142v-5"/><path d="M306 142v-5"/><path d="M313 142v-5"/><path d="M320 142v-5"/><path d="M327 142v-5"/><path d="M334 142v-5"/><path d="M341 142v-5"/><path d="M348 142v-5"/><path d="M355 142v-5"/>';
 return {
  title:'One course of antibiotics',
  aria:'Animated cross-section of the colon wall. The resident bacteria thin out over the first days of a course, '
      +'drug-tolerant kinds fill the gap while the mucus coat thins and the fuel supply to the wall stops, most of the '
      +'community returns over the following weeks, and nine species are still missing at six months. Then the studies that measured it.',
  vb:[360,252],stepMs:5600,
  defs:'<marker id="abxArw" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">'
      +'<path d="M0 0L8 4L0 8z" fill="#6E9B52"/></marker>',
  parts:[
   {id:'tissue',name:'Gut wall tissue',info:'The layer under the lining, holding blood vessels and immune cells.',
     svg:'<rect x="0" y="198" width="360" height="54" fill="#FFFBE4"/>'},
   {id:'vessel',name:'Blood vessel',info:'Carries what the lining absorbs away into the body, and brings immune cells in.',
     svg:'<path d="M-4 236q45-11 90 0t90 0t90 0t98 0" fill="none" stroke="#F3B2B2" stroke-width="7" stroke-linecap="round"/>'
        +'<path d="M-4 236q45-11 90 0t90 0t90 0t98 0" fill="none" stroke="#FFE2E2" stroke-width="3" stroke-linecap="round"/>'},
   {id:'epi',name:'Lining cells',info:'One layer of cells, replaced every few days, that absorbs what you need and keeps the rest out.',
     svg:'<g>'+cells+'</g>'},
   {id:'crypt',name:'Crypt',info:'A pocket folded down into the wall. New lining cells are made at the bottom and travel up.',
     svg:crypt},
   {id:'brush',name:'Brush border',info:'The dense fringe on top of each lining cell that does the absorbing.',
     svg:'<g fill="none" stroke="#C98A7A" stroke-width="1.1" stroke-linecap="round">'+brush+'</g>'},
   {id:'mucFull',name:'Mucus coat',info:'A thick gel the wall secretes. Most bacteria never touch the cells themselves; they live in and above this.',
     svg:'<rect x="0" y="118" width="360" height="24" fill="#CAF5F7" opacity=".62"/><path d="M0 118q25-6 50 0t50 0t50 0t50 0t50 0t50 0t60 0" fill="none" stroke="#7CC6D0" stroke-width="1.3"/>'},
   {id:'mucThin',name:'Mucus coat, thinned',info:'With the fibre-fermenting bacteria gone, the wall makes less mucus and the gap between bugs and cells narrows.',
     svg:'<rect x="0" y="131" width="360" height="11" fill="#CAF5F7" opacity=".45"/><path d="M0 131q25-6 50 0t50 0t50 0t50 0t50 0t50 0t60 0" fill="none" stroke="#7CC6D0" stroke-width="1.3"/>'},
   {id:'resid',name:'The residents',info:'Roughly 38 trillion bacteria, almost all in the colon. Green ferment fibre into butyrate, yellow are Bifidobacterium, blue Bacteroides, teal everything else.',
     svg:'<g>'+resid+'</g>'},
   {id:'blooms',name:'The blooms',info:'Enterobacteriaceae such as E. coli and Klebsiella, and Enterococcus: drug-tolerant, fast-growing, and normally held to a few percent.',
     svg:'<g>'+blooms+'</g>'},
   {id:'yeast',name:'Yeast',info:'Candida. Normally kept down by bacterial competition rather than by your immune system.',
     svg:'<g>'+yeast+'</g>'},
   {id:'ghosts',name:'Nine that did not return',info:'Nine species every man in the 180-day study carried before the course, still undetectable in most of them six months later.',
     svg:'<g>'+ghosts+'</g>'},
   {id:'but6',name:'Butyrate reaching the wall',info:'Fibre fermented into butyrate, the main fuel of your colon lining cells. It also helps seal the wall and calms inflammation.',
     svg:'<g><path d="M28 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M86 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M144 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M202 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M260 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M318 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/></g>'},
   {id:'but2',name:'Butyrate, falling',info:'Fewer fermenters means less fuel arriving at the wall.',svg:'<g><path d="M28 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M86 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/></g>'},
   {id:'but4',name:'Butyrate, returning',info:'As the fermenters come back, so does the fuel supply.',svg:'<g><path d="M28 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M86 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M144 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/><path d="M202 104V148" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/></g>'},
   {id:'bile',name:'Secondary bile acids',info:'Bile acids that gut bacteria have converted. These are what stop C. difficile spores from sprouting.',
     svg:'<g><g transform="translate(28 128)"><circle r="4.2" fill="#F6E3A8" stroke="#A88400" stroke-width="1"/><path d="M-2 0h4M0 -2v4" stroke="#A88400" stroke-width="1.1" stroke-linecap="round"/></g><g transform="translate(86 128)"><circle r="4.2" fill="#F6E3A8" stroke="#A88400" stroke-width="1"/><path d="M-2 0h4M0 -2v4" stroke="#A88400" stroke-width="1.1" stroke-linecap="round"/></g><g transform="translate(144 128)"><circle r="4.2" fill="#F6E3A8" stroke="#A88400" stroke-width="1"/><path d="M-2 0h4M0 -2v4" stroke="#A88400" stroke-width="1.1" stroke-linecap="round"/></g><g transform="translate(202 128)"><circle r="4.2" fill="#F6E3A8" stroke="#A88400" stroke-width="1"/><path d="M-2 0h4M0 -2v4" stroke="#A88400" stroke-width="1.1" stroke-linecap="round"/></g><g transform="translate(260 128)"><circle r="4.2" fill="#F6E3A8" stroke="#A88400" stroke-width="1"/><path d="M-2 0h4M0 -2v4" stroke="#A88400" stroke-width="1.1" stroke-linecap="round"/></g><g transform="translate(318 128)"><circle r="4.2" fill="#F6E3A8" stroke="#A88400" stroke-width="1"/><path d="M-2 0h4M0 -2v4" stroke="#A88400" stroke-width="1.1" stroke-linecap="round"/></g></g>'},
   {id:'res',name:'Resistance genes',info:'Genes that make bacteria harder to kill. They rise after every course measured, often for drugs you never took, and stay up for months.',
     svg:'<g><g transform="translate(26 114)"><rect x="-6" y="-5" width="12" height="10" rx="1.6" fill="#F9DEDE" stroke="#C02626" stroke-width=".9"/><text x="0" y="3.4" font-family="JetBrains Mono,monospace" font-size="6.8" fill="#C02626" text-anchor="middle">R</text></g><g transform="translate(70 114)"><rect x="-6" y="-5" width="12" height="10" rx="1.6" fill="#F9DEDE" stroke="#C02626" stroke-width=".9"/><text x="0" y="3.4" font-family="JetBrains Mono,monospace" font-size="6.8" fill="#C02626" text-anchor="middle">R</text></g><g transform="translate(114 114)"><rect x="-6" y="-5" width="12" height="10" rx="1.6" fill="#F9DEDE" stroke="#C02626" stroke-width=".9"/><text x="0" y="3.4" font-family="JetBrains Mono,monospace" font-size="6.8" fill="#C02626" text-anchor="middle">R</text></g><g transform="translate(158 114)"><rect x="-6" y="-5" width="12" height="10" rx="1.6" fill="#F9DEDE" stroke="#C02626" stroke-width=".9"/><text x="0" y="3.4" font-family="JetBrains Mono,monospace" font-size="6.8" fill="#C02626" text-anchor="middle">R</text></g><g transform="translate(202 114)"><rect x="-6" y="-5" width="12" height="10" rx="1.6" fill="#F9DEDE" stroke="#C02626" stroke-width=".9"/><text x="0" y="3.4" font-family="JetBrains Mono,monospace" font-size="6.8" fill="#C02626" text-anchor="middle">R</text></g><g transform="translate(246 114)"><rect x="-6" y="-5" width="12" height="10" rx="1.6" fill="#F9DEDE" stroke="#C02626" stroke-width=".9"/><text x="0" y="3.4" font-family="JetBrains Mono,monospace" font-size="6.8" fill="#C02626" text-anchor="middle">R</text></g><g transform="translate(290 114)"><rect x="-6" y="-5" width="12" height="10" rx="1.6" fill="#F9DEDE" stroke="#C02626" stroke-width=".9"/><text x="0" y="3.4" font-family="JetBrains Mono,monospace" font-size="6.8" fill="#C02626" text-anchor="middle">R</text></g></g>'},
   {id:'pill',name:'The antibiotic',info:'Reaching the colon, whether swallowed or given by drip: many intravenous drugs arrive here through bile.',
     svg:'<g class="flowg"></g>',flow:{path:'M-18 -14L300 64',n:3,ms:3400,bead:'<g transform="rotate(-24)"><rect x="-10" y="-6" width="20" height="12" rx="6" fill="#FFFFF4" stroke="#3E4A80" stroke-width="1.4"/><path d="M0 -6v12" stroke="#3E4A80" stroke-width="1.4"/><path d="M-10 0a6 6 0 0 1 6-6h4v12h-4a6 6 0 0 1-6-6z" fill="#DB6830" opacity=".55"/></g>'}},
   {id:'sPall',name:'12 healthy men, 180 days',info:'Four days of three strong antibiotics together, then stool sequenced out to six months.',
     svg:'<path class="ln" d="M34 30V168H220" fill="none" stroke="#3E4A80" stroke-width="1.3"/><text class="tm" x="30" y="22">DIVERSITY</text><path d="M34 48H220" stroke="#6B76A8" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/><text class="tm" x="220" y="44" text-anchor="end">START LEVEL</text><path class="ln" d="M34 48C54 48 58 150 76 154C98 159 112 96 140 82C168 69 194 62 220 60" fill="none" stroke="#2E8F82" stroke-width="2.6" stroke-linecap="round"/><text class="tm" x="78" y="170">LOW POINT</text><text class="tm" x="150" y="76">~1.5 MONTHS</text><g class="gh"><text x="288" y="70" font-family="JetBrains Mono,monospace" font-size="38" font-weight="700" fill="#3E4A80" text-anchor="middle" data-from="0" data-to="9" data-dec="0">0</text><text class="tm" x="288" y="88" text-anchor="middle">SPECIES</text><text class="tm" x="288" y="100" text-anchor="middle">STILL GONE</text><text class="tm" x="288" y="112" text-anchor="middle">AT 6 MONTHS</text><g fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"><rect x="262" y="124" width="13" height="5.8" rx="2.9"/><rect x="280" y="124" width="13" height="5.8" rx="2.9"/><rect x="298" y="124" width="13" height="5.8" rx="2.9"/><rect x="262" y="136" width="13" height="5.8" rx="2.9"/><rect x="280" y="136" width="13" height="5.8" rx="2.9"/><rect x="298" y="136" width="13" height="5.8" rx="2.9"/><rect x="262" y="148" width="13" height="5.8" rx="2.9"/><rect x="280" y="148" width="13" height="5.8" rx="2.9"/><rect x="298" y="148" width="13" height="5.8" rx="2.9"/></g></g><text class="tm" x="12" y="240">12 MEN  ·  3 DRUGS, 4 DAYS  ·  180 DAYS WATCHED</text>'},
   {id:'sCipro',name:'3 people, two courses',info:'Ciprofloxacin twice, each person sampled more than fifty times over ten months.',
     svg:'<path class="ln" d="M34 40V168H326" fill="none" stroke="#3E4A80" stroke-width="1.3"/><path d="M34 56H326" stroke="#6B76A8" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/><text class="tm" x="36" y="52">START LEVEL</text><path class="ln" d="M34 56C58 56 62 140 80 144C104 149 120 72 150 66C176 61 186 62 192 64C200 140 214 146 232 148C258 151 276 104 300 98C314 95 322 94 326 94" fill="none" stroke="#2E8F82" stroke-width="2.6" stroke-linecap="round"/><g class="mk"><path d="M74 26v14" stroke="#DB6830" stroke-width="2"/><text class="tm" x="74" y="22" text-anchor="middle">DOSE 1</text><path d="M196 26v14" stroke="#DB6830" stroke-width="2"/><text class="tm" x="196" y="22" text-anchor="middle">DOSE 2</text></g><g class="mk"><path d="M262 86h58" stroke="#C02626" stroke-width="1" stroke-dasharray="3 3"/><text class="tm" x="320" y="82" text-anchor="end">A NEW STABLE STATE</text></g><text class="tm" x="12" y="240">3 PEOPLE  ·  2 COURSES  ·  OVER 10 MONTHS</text>'},
   {id:'sClin',name:'Clindamycin at 2 years',info:'Four people on clindamycin and four untreated controls, followed for two years.',
     svg:'<text class="tm" x="12" y="22">BACTEROIDES: BACK TO ITS ORIGINAL MIX?</text><path class="ln" d="M40 44V176H340" fill="none" stroke="#3E4A80" stroke-width="1.3"/><g class="g"><rect x="64" y="68" width="60" height="108" fill="#AACC96" stroke="#3E4A80" stroke-width="1.2"/></g><text class="tm" x="94" y="191" text-anchor="middle">CONTROLS</text><text class="tm" x="94" y="62" text-anchor="middle">ALMOST</text><g class="g"><rect x="168" y="132" width="60" height="44" fill="#FF5050" stroke="#3E4A80" stroke-width="1.2"/></g><text class="tm" x="198" y="191" text-anchor="middle">CLINDA.</text><text class="tm" x="198" y="126" text-anchor="middle">NO</text><g class="g"><rect x="268" y="106" width="60" height="70" fill="#F9DEDE" stroke="#C02626" stroke-width="1.2"/></g><text class="tm" x="298" y="191" text-anchor="middle">RESIST.</text><text class="tm" x="298" y="100" text-anchor="middle">HIGH</text><text class="tm" x="12" y="240">4 ON CLINDAMYCIN  ·  4 CONTROLS  ·  2 YEARS</text>'},
   {id:'sMice',name:'Mice carrying human gut bacteria',info:'The same antibiotic, two diets: the recovery went differently.',
     svg:'<path class="ln" d="M40 34V164H300" fill="none" stroke="#3E4A80" stroke-width="1.3"/><text class="tm" x="36" y="26">RECOVERY</text><text class="tm" x="300" y="180" text-anchor="end">TIME AFTER THE COURSE</text><path class="ln" d="M40 140C70 138 96 84 140 70C190 55 240 50 300 48" fill="none" stroke="#2E8F82" stroke-width="2.6" stroke-linecap="round"/><path class="ln" d="M40 144C72 143 100 128 142 118C196 106 244 102 300 100" fill="none" stroke="#C9A100" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="6 4"/><g class="mk"><text class="tm" x="298" y="42" text-anchor="end">FIBRE</text><text class="tm" x="298" y="94" text-anchor="end">FIBRE-POOR</text></g><text class="tm" x="12" y="240">MICE WITH A HUMAN MICROBIOTA  ·  SAME DRUG</text>'}
  ],
  steps:[
   {key:'full',btn:'DAY 0',title:'A full house',
    marks:[['h','Human anatomy']],
    text:'Every scrap of food, mucus and wall space is already held by a resident that got there first. That fullness is '
        +'itself the defence: there is no vacant job for an invader. The green rods ferment your fibre into butyrate, and '
        +'the arrows are that fuel arriving at the wall.',
    model:'Before the course',
    src:[{t:'Sender 2016, how many bacteria',u:'https://doi.org/10.1371/journal.pbio.1002533'}],
    show:['tissue','vessel','epi','crypt','brush','mucFull','resid','but6','bile'],
    anim:[{p:'resid',type:'fadeIn',dur:900,each:1,stagger:14},
          {p:'but6',type:'draw',dur:1100,delay:600},
          {p:'bile',type:'fadeIn',dur:700,delay:1200,each:1,stagger:90}],
    labels:[{p:'resid',t:'The residents',x:12,y:6,ax:72,ay:40},
            {p:'bile',t:'Bile acids block C. diff spores',x:150,y:88,ax:244,ay:127}]},

   {key:'drop',btn:'DAYS 1-4',title:'The drop',
    marks:[['h','Human']],
    text:'Diversity falls within three to four days of the first dose, and Bifidobacterium and the butyrate makers go first. '
        +'Nothing about this feels like anything: in the study where three people were sampled through two courses, they '
        +'reported their gut felt normal the whole way through.',
    model:'On the drug',
    src:[{t:'Dethlefsen 2008, ciprofloxacin, 3 adults',u:'https://doi.org/10.1371/journal.pbio.0060280'}],
    show:['tissue','vessel','epi','crypt','brush','mucFull','resid','but2','bile','pill'],
    anim:[{p:'resid',type:'shrink',sel:'.d1',to:0,dur:1500,stagger:55},
          {p:'bile',type:'fadeOut',dur:1400,delay:900,each:1,stagger:120},
          {p:'pill',type:'flow'}],
    labels:[{p:'pill',t:'The drug arrives',x:150,y:8,ax:120,ay:24},
            {p:'resid',t:'The sensitive ones go first',x:14,y:94,ax:72,ay:78}]},

   {key:'gap',btn:'DAYS 3-10',title:'The gap, and who fills it',
    marks:[['h','Human']],
    text:'Clearing the residents does not leave an empty gut, it leaves an opening, and what grows into it is whatever '
        +'tolerates the drug and grows fast. Three things fail at once: the fuel to the wall stops, the mucus coat thins, '
        +'and the bacteria that convert bile acids are gone, so the chemistry that stops C. difficile spores sprouting '
        +'falls away. That is why antibiotics cause C. diff, rather than it simply being caught.',
    model:'The low point',
    src:[{t:'Palleja 2018, 12 men',u:'https://doi.org/10.1038/s41564-018-0257-9'},
         {t:'Hagan 2019, bile acids down about 1,000-fold',u:'https://doi.org/10.1016/j.cell.2019.08.010'}],
    show:['tissue','vessel','epi','crypt','brush','mucThin','resid','blooms','yeast','res'],
    anim:[{p:'resid',type:'shrink',sel:'.d1,.d2,.lost',to:0,dur:200},
          {p:'blooms',type:'scale',from:0,to:1,dur:1500,each:1,stagger:85},
          {p:'yeast',type:'scale',from:0,to:1,dur:1400,delay:900,each:1,stagger:200},
          {p:'blooms',type:'pulse',to:1.1,dur:2600,delay:2000,each:1,stagger:120},
          {p:'res',type:'fadeIn',dur:900,delay:1500,each:1,stagger:110}],
    labels:[{p:'blooms',t:'Drug-tolerant kinds take the space',x:96,y:6,ax:170,ay:34},
            {p:'mucThin',t:'Mucus thins',x:12,y:102,ax:60,ay:136}]},

   {key:'back',btn:'WEEKS 2-8',title:'The rebound',
    marks:[['h','Human']],
    text:'Most of it comes back on its own, faster than people expect, and nothing was done to these people to make it '
        +'happen. Richness was back to baseline by day 19 for two common drugs. Azithromycin was the slow one, still low '
        +'at day 65. Even after four days of three last-resort drugs together, composition was near baseline in about six weeks.',
    model:'Coming back, with nothing done',
    src:[{t:'Anthony 2022, four drugs compared',u:'https://doi.org/10.1016/j.celrep.2022.110649'},
         {t:'Palleja 2018',u:'https://doi.org/10.1038/s41564-018-0257-9'}],
    show:['tissue','vessel','epi','crypt','brush','mucFull','resid','blooms','but4','bile','res'],
    anim:[{p:'resid',type:'shrink',sel:'.lost',to:0,dur:200},
          {p:'resid',type:'scale',sel:'.d1,.d2',from:0,to:1,dur:1700,stagger:50},
          {p:'blooms',type:'shrink',to:0,dur:1500,delay:400,each:1,stagger:70},
          {p:'but4',type:'draw',dur:1200,delay:1400},
          {p:'bile',type:'fadeIn',dur:1000,delay:1600,each:1,stagger:90}],
    labels:[{p:'resid',t:'The residents regrow',x:12,y:6,ax:80,ay:36},
            {p:'but4',t:'Fuel supply restarts',x:150,y:88,ax:232,ay:106}]},

   {key:'after',btn:'6 MONTHS',title:'Close, but not the same',
    marks:[['h','Human']],
    text:'This is the honest ending, and it is neither of the two stories usually told. Nine species that every single '
        +'man carried at the start were still undetectable in most of them at day 180, and the dashed outlines are those '
        +'gaps. In the ciprofloxacin study all three people settled into a stable state different from where they began. '
        +'Not worse in any way they could feel. Different.',
    model:'A new normal',
    src:[{t:'Palleja 2018, 9 species at day 180',u:'https://doi.org/10.1038/s41564-018-0257-9'},
         {t:'Dethlefsen & Relman 2011',u:'https://doi.org/10.1073/pnas.1000087107'}],
    show:['tissue','vessel','epi','crypt','brush','mucFull','resid','ghosts','but6','bile','res'],
    anim:[{p:'resid',type:'shrink',sel:'.lost',to:0,dur:200},
          {p:'ghosts',type:'fadeIn',dur:1500,delay:700,each:1,stagger:140},
          {p:'ghosts',type:'pulse',to:1.14,dur:3000,delay:2400,each:1,stagger:160}],
    labels:[{p:'ghosts',t:'Nine never came back',x:120,y:6,ax:170,ay:34},
            {p:'res',t:'Resistance genes still raised',x:120,y:126,ax:158,ay:114}]},

   {key:'pall',btn:'12 MEN',title:'The study that followed it to six months',study:1,
    marks:[['h','Human']],
    text:'Twelve healthy men were given meropenem, gentamicin and vancomycin together for four days, which is close to '
        +'the worst case on purpose, then had their stool sequenced out to 180 days. Blooms of Enterobacteriaceae and '
        +'Enterococcus early, Bifidobacterium and butyrate makers lost, composition near baseline in about 1.5 months, '
        +'and nine common species still undetectable in most of them at the end.',
    model:'12 healthy men, 4 days of 3 drugs, 180 days of follow-up',
    src:[{t:'Palleja 2018, Nature Microbiology',u:'https://doi.org/10.1038/s41564-018-0257-9'}],
    show:['sPall'],
    anim:[{p:'sPall',type:'draw',sel:'.ln',dur:2000,delay:300},
          {p:'sPall',type:'count',dur:1800,delay:1400},
          {p:'sPall',type:'fadeIn',sel:'.gh',dur:1200,delay:2200}]},

   {key:'cipro',btn:'3 PEOPLE',title:'What a second course does',study:1,
    marks:[['h','Human']],
    text:'Three people took ciprofloxacin twice, ten months apart, and were sampled more than fifty times each. Diversity '
        +'fell within three to four days both times, recovery began about a week after stopping and was incomplete both '
        +'times, and the second course did not play out like the first. Each person ended in a stable state that was not '
        +'the one they started in.',
    model:'3 adults, 2 courses, 52 to 56 samples each',
    src:[{t:'Dethlefsen & Relman 2011, PNAS',u:'https://doi.org/10.1073/pnas.1000087107'}],
    show:['sCipro'],
    anim:[{p:'sCipro',type:'draw',sel:'.ln',dur:2600,delay:300},
          {p:'sCipro',type:'fadeIn',sel:'.mk',dur:900,delay:2000,stagger:200}]},

   {key:'clin',btn:'2 YEARS',title:'The one that left a mark',study:1,
    marks:[['h','Human']],
    text:'Clindamycin is the harshest pill on record for the gut. In four people followed for two years, the Bacteroides '
        +'population never returned to the mix it started with, and resistance genes stayed raised the whole time. Four '
        +'untreated controls barely changed. This is the longest individual follow-up in the field.',
    model:'4 people on clindamycin, 4 controls, 2 years',
    src:[{t:'Jernberg 2007, The ISME Journal',u:'https://doi.org/10.1038/ismej.2007.3'}],
    show:['sClin'],
    anim:[{p:'sClin',type:'draw',sel:'.ln',dur:2400,delay:300},
          {p:'sClin',type:'grow',sel:'.g',dur:1200,delay:1800,stagger:180}]},

   {key:'mice',btn:'DIET',title:'What changed the recovery',study:1,
    marks:[['a','Mouse']],
    text:'Mice carrying human gut bacteria were given the same antibiotic on two different diets. On a fibre-poor diet '
        +'the collapse was deeper and the recovery slower; with fibre and ordinary exposure to their environment, more '
        +'of the community came back. It is the clearest mechanism anyone has for why diet might matter here, and it '
        +'has never been run as a diet trial in people after a course.',
    model:'Mice carrying a human microbiota, two diets',
    src:[{t:'Ng 2019, Cell Host & Microbe',u:'https://doi.org/10.1016/j.chom.2019.10.011'}],
    show:['sMice'],
    anim:[{p:'sMice',type:'draw',sel:'.ln',dur:2200,delay:300},
          {p:'sMice',type:'fadeIn',sel:'.mk',dur:900,delay:1900,stagger:220}]}
  ]
 }
});
