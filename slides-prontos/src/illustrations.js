// Ilustrações próprias da plataforma (SVG, livres de direitos autorais)
(function(){
const K='#1D2B44', O='#F0883E', T='#1A9A96', R='#D24C6E', Y='#FFD25A', S='#8EC9F0', W='#FFFFFF', G='#E9EDF2';
const st = `stroke="${K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="480" height="480">${body}</svg>`;
const txt = (x,y,s,c,t,w=900) => `<text x="${x}" y="${y}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="${w}" font-size="${s}" fill="${c}" text-anchor="middle" dominant-baseline="central">${t}</text>`;

const I = {};
I.abc = svg(`
  <rect x="22" y="112" width="70" height="70" rx="10" fill="${O}" ${st} transform="rotate(-8 57 147)"/>
  ${txt(57,149,44,W,'A')}
  <rect x="86" y="58" width="70" height="70" rx="10" fill="${T}" ${st} transform="rotate(6 121 93)"/>
  ${txt(121,95,44,W,'B')}
  <rect x="146" y="118" width="70" height="70" rx="10" fill="${R}" ${st} transform="rotate(-4 181 153)"/>
  ${txt(181,155,44,W,'C')}
  <rect x="84" y="140" width="62" height="62" rx="10" fill="${Y}" ${st}/>
  ${txt(115,172,36,K,'D')}
  <circle cx="200" cy="58" r="8" fill="${Y}" ${st}/><circle cx="40" cy="70" r="5" fill="${K}"/>`);
I.balao = svg(`
  <path d="M30 50 h120 a16 16 0 0 1 16 16 v56 a16 16 0 0 1 -16 16 h-74 l-26 24 v-24 h-20 a16 16 0 0 1 -16 -16 v-56 a16 16 0 0 1 16 -16z" fill="${S}" ${st}/>
  ${txt(90,95,52,K,'?')}
  <path d="M120 120 h88 a14 14 0 0 1 14 14 v42 a14 14 0 0 1 -14 14 h-14 v20 l-22 -20 h-52 a14 14 0 0 1 -14 -14 v-42 a14 14 0 0 1 14 -14z" fill="${Y}" ${st}/>
  ${txt(164,156,40,K,'!')}`);
I.blocos = svg(`
  <rect x="18" y="98" width="62" height="56" rx="10" fill="${T}" ${st}/>${txt(49,127,26,W,'CA')}
  <rect x="88" y="98" width="62" height="56" rx="10" fill="${O}" ${st}/>${txt(119,127,26,W,'NE')}
  <rect x="158" y="98" width="62" height="56" rx="10" fill="${R}" ${st}/>${txt(189,127,26,W,'CA')}
  <path d="M40 72 q20 -24 40 0" fill="none" ${st}/><path d="M110 72 q20 -24 40 0" fill="none" ${st}/><path d="M180 72 q20 -24 40 0" fill="none" ${st}/>
  <rect x="58" y="176" width="124" height="28" rx="14" fill="${Y}" ${st}/>${txt(120,190,16,K,'1  2  3')}`);
I.pontuacao = svg(`
  <circle cx="60" cy="180" r="18" fill="${O}" ${st}/>
  <path d="M100 70 q0 -36 34 -36 q34 0 34 32 q0 22 -26 34 q-10 5 -10 24 v8" fill="none" stroke="${K}" stroke-width="22" stroke-linecap="round"/>
  <path d="M100 70 q0 -36 34 -36 q34 0 34 32 q0 22 -26 34 q-10 5 -10 24 v8" fill="none" stroke="${T}" stroke-width="10" stroke-linecap="round"/>
  <circle cx="132" cy="176" r="14" fill="${T}" ${st}/>
  <rect x="190" y="40" width="26" height="100" rx="13" fill="${R}" ${st}/>
  <circle cx="203" cy="176" r="14" fill="${R}" ${st}/>`);
I.jornal = svg(`
  <rect x="34" y="40" width="160" height="170" rx="8" fill="${W}" ${st}/>
  <rect x="50" y="56" width="128" height="22" rx="4" fill="${K}"/>
  <rect x="50" y="90" width="58" height="50" rx="4" fill="${S}" ${st}/>
  <path d="M120 94 h58 M120 110 h58 M120 126 h44 M50 156 h128 M50 172 h128 M50 188 h96" ${st} fill="none"/>
  <path d="M194 70 h16 v130 a10 10 0 0 1 -10 10 h-6" fill="${O}" ${st}/>`);
I.livro = svg(`
  <path d="M120 66 q-40 -22 -94 -12 v136 q54 -10 94 12z" fill="${T}" ${st}/>
  <path d="M120 66 q40 -22 94 -12 v136 q-54 -10 -94 12z" fill="${O}" ${st}/>
  <path d="M120 66 v136" ${st}/>
  <path d="M46 84 q30 -6 56 4 M46 106 q30 -6 56 4 M46 128 q30 -6 56 4" stroke="${W}" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M138 88 q30 -10 56 -4 M138 110 q30 -10 56 -4" stroke="${W}" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M160 30 l6 14 l15 2 l-11 10 l3 15 l-13 -7 l-13 7 l3 -15 l-11 -10 l15 -2z" fill="${Y}" ${st}/>`);
I.quebracabeca = svg(`
  <path d="M30 60 h56 a16 16 0 1 1 30 0 h14 v52 a16 16 0 1 0 0 30 v52 h-100z" fill="${T}" ${st}/>
  <path d="M130 60 h80 v134 h-80 v-52 a16 16 0 1 1 0 -30z" fill="${O}" ${st}/>
  <circle cx="72" cy="120" r="7" fill="${W}"/><circle cx="172" cy="120" r="7" fill="${W}"/>
  <path d="M150 26 l8 10 M178 20 v14 M204 28 l-8 10" ${st} fill="none"/>`);
I.lampada = svg(`
  <path d="M120 30 a62 62 0 0 1 36 112 q-8 8 -8 22 h-56 q0 -14 -8 -22 a62 62 0 0 1 36 -112z" fill="${Y}" ${st}/>
  <rect x="92" y="170" width="56" height="16" rx="6" fill="${S}" ${st}/>
  <rect x="98" y="190" width="44" height="16" rx="6" fill="${S}" ${st}/>
  <path d="M104 132 l16 -30 l16 30" fill="none" ${st}/>
  <path d="M30 92 h18 M192 92 h18 M50 40 l12 12 M190 40 l-12 12" ${st} fill="none"/>`);
I.balanca = svg(`
  <path d="M120 40 v150 M80 200 h80" ${st} fill="none"/>
  <path d="M40 70 h160" ${st} fill="none"/><circle cx="120" cy="40" r="10" fill="${Y}" ${st}/>
  <path d="M40 70 l-24 60 h48z" fill="${T}" ${st}/><path d="M200 70 l-24 60 h48z" fill="${R}" ${st}/>
  <path d="M16 130 a24 14 0 0 0 48 0z" fill="${T}" ${st}/><path d="M176 130 a24 14 0 0 0 48 0z" fill="${R}" ${st}/>
  ${txt(40,112,22,W,'+')}${txt(200,112,22,W,'-')}`);
I.alerta = svg(`
  <rect x="62" y="24" width="116" height="196" rx="18" fill="${K}" ${st}/>
  <rect x="74" y="44" width="92" height="150" rx="6" fill="${W}"/>
  <path d="M120 70 l40 70 h-80z" fill="${Y}" ${st}/>
  <path d="M120 94 v22" ${st}/><circle cx="120" cy="128" r="4" fill="${K}"/>
  <path d="M84 160 h72 M84 176 h48" stroke="${G}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="186" cy="38" r="20" fill="${R}" ${st}/>${txt(186,39,22,W,'!')}`);
I.vozes = svg(`
  <circle cx="64" cy="150" r="34" fill="${O}" ${st}/><circle cx="176" cy="150" r="34" fill="${T}" ${st}/>
  <circle cx="54" cy="146" r="4" fill="${K}"/><circle cx="74" cy="146" r="4" fill="${K}"/><path d="M54 162 q10 8 20 0" ${st} fill="none"/>
  <circle cx="166" cy="146" r="4" fill="${K}"/><circle cx="186" cy="146" r="4" fill="${K}"/><path d="M166 162 q10 8 20 0" ${st} fill="none"/>
  <rect x="20" y="30" width="96" height="56" rx="14" fill="${Y}" ${st}/>${txt(68,58,15,K,'AIPIM')}
  <rect x="124" y="30" width="104" height="56" rx="14" fill="${S}" ${st}/>${txt(176,58,13,K,'MACAXEIRA')}
  <path d="M60 86 l6 24 M180 86 l-6 24" ${st} fill="none"/>`);
I.lapis = svg(`
  <path d="M50 190 l20 -60 l100 -100 l40 40 l-100 100z" fill="${Y}" ${st}/>
  <path d="M50 190 l20 -60 l40 40z" fill="${W}" ${st}/>
  <path d="M50 190 l8 -24 l16 16z" fill="${K}"/>
  <path d="M150 50 l40 40" ${st}/><path d="M170 30 l40 40 l-20 20 l-40 -40z" fill="${R}" ${st}/>
  <path d="M30 220 h120" stroke="${T}" stroke-width="8" stroke-linecap="round"/>`);
I.megafone = svg(`
  <path d="M40 100 h30 l90 -50 v140 l-90 -50 h-30z" fill="${O}" ${st}/>
  <rect x="22" y="96" width="24" height="48" rx="6" fill="${T}" ${st}/>
  <path d="M74 140 l14 56 h22 l-10 -46" fill="${S}" ${st}/>
  <path d="M184 90 q14 30 0 60 M200 74 q26 46 0 92" ${st} fill="none"/>`);
I.trofeu = svg(`
  <path d="M74 40 h92 v40 a46 46 0 0 1 -92 0z" fill="${Y}" ${st}/>
  <path d="M74 54 h-24 q0 40 32 44 M166 54 h24 q0 40 -32 44" ${st} fill="none"/>
  <rect x="108" y="124" width="24" height="34" fill="${O}" ${st}/>
  <rect x="78" y="158" width="84" height="30" rx="6" fill="${T}" ${st}/>
  <path d="M120 58 l5 10 l11 1 l-8 8 l2 11 l-10 -5 l-10 5 l2 -11 l-8 -8 l11 -1z" fill="${W}"/>
  <circle cx="40" cy="190" r="6" fill="${R}"/><circle cx="204" cy="30" r="6" fill="${S}"/><circle cx="210" cy="190" r="5" fill="${O}"/>`);
I.lupa = svg(`
  <circle cx="102" cy="100" r="60" fill="${S}" ${st}/>
  <circle cx="102" cy="100" r="40" fill="${W}" ${st}/>
  <path d="M146 144 l56 56" stroke="${K}" stroke-width="26" stroke-linecap="round"/>
  <path d="M146 144 l56 56" stroke="${O}" stroke-width="14" stroke-linecap="round"/>
  ${txt(102,101,30,K,'Aa')}`);
I.check = svg(`
  <rect x="44" y="28" width="152" height="190" rx="14" fill="${W}" ${st}/>
  <rect x="92" y="16" width="56" height="26" rx="8" fill="${T}" ${st}/>
  <path d="M70 84 l12 12 l22 -24 M70 134 l12 12 l22 -24" stroke="${T}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M120 86 h52 M120 136 h52 M70 186 h102" ${st} fill="none"/>`);
I.mapa = svg(`
  <path d="M120 120 L50 56 M120 120 L190 56 M120 120 L44 180 M120 120 L196 180" ${st}/>
  <circle cx="50" cy="56" r="24" fill="${O}" ${st}/><circle cx="190" cy="56" r="24" fill="${T}" ${st}/>
  <circle cx="44" cy="180" r="24" fill="${R}" ${st}/><circle cx="196" cy="180" r="24" fill="${S}" ${st}/>
  <circle cx="120" cy="120" r="36" fill="${Y}" ${st}/>`);

I.carta = svg(`
  <rect x="30" y="64" width="180" height="124" rx="10" fill="${W}" ${st}/>
  <path d="M30 74 l90 66 l90 -66" fill="${S}" ${st}/>
  <path d="M30 188 l70 -56 M210 188 l-70 -56" ${st} fill="none"/>
  <circle cx="184" cy="64" r="22" fill="${R}" ${st}/>
  <path d="M176 64 l6 6 l10 -12" stroke="${W}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
I.teatro = svg(`
  <path d="M28 46 h92 v60 a46 46 0 0 1 -92 0z" fill="${Y}" ${st}/>
  <circle cx="56" cy="88" r="7" fill="${K}"/><circle cx="92" cy="88" r="7" fill="${K}"/>
  <path d="M52 118 q22 22 44 0" ${st} fill="none"/>
  <path d="M120 86 h92 v60 a46 46 0 0 1 -92 0z" fill="${T}" ${st}/>
  <circle cx="148" cy="124" r="7" fill="${K}"/><circle cx="184" cy="124" r="7" fill="${K}"/>
  <path d="M146 164 q20 -18 40 0" ${st} fill="none"/>`);
I.microfone = svg(`
  <rect x="88" y="26" width="64" height="104" rx="32" fill="${R}" ${st}/>
  <path d="M100 58 h40 M100 80 h40 M100 102 h40" stroke="${W}" stroke-width="5" stroke-linecap="round"/>
  <path d="M64 104 a56 56 0 0 0 112 0" ${st} fill="none"/>
  <path d="M120 160 v36 M84 204 h72" ${st} fill="none"/>
  <path d="M30 70 q-12 30 0 60 M210 70 q12 30 0 60" stroke="${O}" stroke-width="6" stroke-linecap="round" fill="none"/>`);
I.celular = svg(`
  <rect x="70" y="20" width="100" height="200" rx="18" fill="${K}" ${st}/>
  <rect x="80" y="40" width="80" height="150" rx="6" fill="${W}"/>
  <rect x="88" y="52" width="64" height="40" rx="6" fill="${S}"/>
  <path d="M90 108 h60 M90 124 h44 M90 140 h56" stroke="${G}" stroke-width="6" stroke-linecap="round"/>
  <path d="M176 70 a14 14 0 1 1 28 0 q0 10 -14 22 q-14 -12 -14 -22z" fill="${R}" ${st}/>
  <path d="M36 150 h28 v-22 l20 26 l-20 26 v-22 h-28z" fill="${Y}" ${st}/>`);
I.pena = svg(`
  <path d="M190 30 q-110 20 -130 150 l20 -10 q30 -90 110 -140z" fill="${S}" ${st}/>
  <path d="M60 180 l-14 40" ${st} fill="none"/>
  <path d="M120 80 l-26 -10 M104 112 l-22 -8 M146 58 l-24 -12" stroke="${K}" stroke-width="4" stroke-linecap="round"/>
  <rect x="140" y="160" width="70" height="56" rx="8" fill="${O}" ${st}/>
  <path d="M150 160 v-10 h50 v10" ${st} fill="${K}"/>`);
I.grafico = svg(`
  <path d="M34 30 v172 h176" ${st} fill="none"/>
  <rect x="56" y="130" width="30" height="72" fill="${T}" ${st}/>
  <rect x="100" y="96" width="30" height="106" fill="${O}" ${st}/>
  <rect x="144" y="60" width="30" height="142" fill="${R}" ${st}/>
  <path d="M56 110 l44 -36 l44 -30 l50 -20" stroke="${Y}" stroke-width="8" stroke-linecap="round" fill="none"/>
  <circle cx="194" cy="24" r="10" fill="${Y}" ${st}/>`);
I.globo = svg(`
  <circle cx="120" cy="116" r="84" fill="${S}" ${st}/>
  <path d="M78 64 q30 10 24 40 q-6 26 -36 30 q-20 -20 -16 -50z" fill="${T}" ${st}/>
  <path d="M140 52 q34 14 42 50 q-26 -4 -36 18 q-22 -6 -20 -34z" fill="${T}" ${st}/>
  <path d="M120 150 q30 0 36 26 q-20 14 -44 10z" fill="${T}" ${st}/>
  <path d="M84 214 h72" ${st}/>`);
I.musica = svg(`
  <path d="M90 170 v-120 l100 -20 v120" ${st} fill="none"/>
  <path d="M90 74 l100 -20" stroke="${K}" stroke-width="14"/>
  <ellipse cx="70" cy="172" rx="26" ry="20" fill="${O}" ${st}/>
  <ellipse cx="170" cy="152" rx="26" ry="20" fill="${R}" ${st}/>
  <circle cx="44" cy="60" r="8" fill="${Y}" ${st}/><circle cx="210" cy="200" r="7" fill="${T}" ${st}/>`);

window.ILUSTRACOES = I;
window.ILUSTRACAO_NOMES = {abc:'Letras',balao:'Balões de fala',blocos:'Sílabas',pontuacao:'Pontuação',jornal:'Jornal',livro:'Livro',quebracabeca:'Quebra-cabeça',lampada:'Ideia',balanca:'Balança',alerta:'Alerta',vozes:'Vozes',lapis:'Lápis',megafone:'Megafone',trofeu:'Troféu',lupa:'Lupa',check:'Checklist',mapa:'Mapa mental',carta:'Carta',teatro:'Teatro',microfone:'Microfone',celular:'Celular',pena:'Pena e tinteiro',grafico:'Gráfico',globo:'Globo',musica:'Música'};
window.ILUSTRACAO_EIXO = {L:'livro', P:'lapis', O:'megafone', A:'lupa'};
})();
