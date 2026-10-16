// Motor de slides: um único layout alimenta a tela, o PowerPoint e o PDF.
(function(){
const SP = window.SP = {};
const W = 1280, H = 720;
SP.W = W; SP.H = H;

const INK = '#17233B', MUTED = '#5C6678', PAPER = '#F8F9FB', LINE = '#D6DDE6', WHITE = '#FFFFFF', MARK = '#FFF1BF', MARK_INK = '#7A5A00', OK = '#1E8E4E', BAD = '#C2413B';
SP.colors = {INK, MUTED, PAPER, LINE, WHITE, MARK, OK, BAD};

const ETAPAS = {
  ini: {nome:'Anos iniciais', accent:'#D2601A', soft:'#FCE8D9', deep:'#83360A'},
  fin: {nome:'Anos finais',   accent:'#0B7C7A', soft:'#DAF0EE', deep:'#05514F'},
  med: {nome:'Ensino Médio',  accent:'#B02E55', soft:'#F7DFE7', deep:'#6E1532'}
};
SP.ETAPAS = ETAPAS;
const EIXOS = {L:'Leitura', P:'Produção de textos', O:'Oralidade', A:'Análise linguística'};
SP.EIXOS = EIXOS;

SP.etapaDe = (ano) => ano.startsWith('EM') ? 'med' : (+ano <= 5 ? 'ini' : 'fin');
SP.anoLabel = (ano) => ano.startsWith('EM') ? ano.slice(2) + 'ª série · Ensino Médio' : ano + 'º ano';
SP.anoCurto = (ano) => ano.startsWith('EM') ? ano.slice(2) + 'ª série EM' : ano + 'º ano';

SP.meta = function(item){
  const [id, ano, eixo, titulo, codes] = item;
  const et = SP.etapaDe(ano);
  return {id, ano, eixo, titulo, codes, etapa: et, ...ETAPAS[et], anoLabel: SP.anoLabel(ano), anoCurto: SP.anoCurto(ano), eixoNome: EIXOS[eixo]};
};

const DEFAULT_TITLES = {objetivos:'Objetivos da aula', pergunta:'Para começar', mapa:'Mapa mental', quiz:'Quiz', gabarito:'Gabarito', resumo:'O que aprendemos', auto:'Autoavaliação', encerramento:'Parabéns, turma!'};
SP.DEFAULT_TITLES = DEFAULT_TITLES;
SP.TYPE_NAMES = {capa:'Capa', objetivos:'Objetivos', pergunta:'Aquecimento', conceito:'Conceito', grade:'Quadro', exemplos:'Exemplos', comparacao:'Comparação', texto:'Leitura', passos:'Passo a passo', mapa:'Mapa mental', atividade:'Atividade', quiz:'Quiz', gabarito:'Gabarito', resumo:'Resumo', auto:'Autoavaliação', desafio:'Desafio', encerramento:'Encerramento'};

// ---------- texto com **negrito** ----------
SP.parse = function(text){
  return String(text ?? '').split('\n').map(par => {
    const runs = []; const parts = par.split('**');
    parts.forEach((p, i) => { if (p) runs.push({t: p, b: i % 2 === 1}); });
    return runs.length ? runs : [{t:'', b:false}];
  });
};
SP.plain = (text) => String(text ?? '').replace(/\*\*/g, '');

// quebra em linhas com uma função de medida (usada no PDF e no PowerPoint)
SP.wrap = function(paras, maxW, size, bold, measure){
  const lines = [];
  for (const runs of paras){
    let line = [], lw = 0;
    const tokens = [];
    for (const r of runs){
      r.t.split(/(\s+)/).forEach(tok => { if (tok !== '') tokens.push({t: tok, b: r.b || bold}); });
    }
    if (!tokens.length){ lines.push({segs: [], w: 0}); continue; }
    for (const tok of tokens){
      const space = /^\s+$/.test(tok.t);
      const tw = measure(tok.t, tok.b, size);
      if (!space && lw + tw > maxW && line.length){
        while (line.length && /^\s+$/.test(line[line.length-1].t)) { lw -= line[line.length-1].w; line.pop(); }
        lines.push({segs: line, w: lw}); line = []; lw = 0;
      }
      if (space && !line.length) continue;
      line.push({t: tok.t, b: tok.b, w: tw}); lw += tw;
    }
    while (line.length && /^\s+$/.test(line[line.length-1].t)) { lw -= line[line.length-1].w; line.pop(); }
    lines.push({segs: line, w: lw});
  }
  return lines;
};
SP.fit = function(el, measure){
  const paras = SP.parse(el.text);
  const lh = el.lh || 1.2;
  let size = el.size;
  const min = el.min || Math.max(9, Math.round(el.size * 0.45));
  let lines;
  while (true){
    lines = SP.wrap(paras, el.w, size, el.bold, measure);
    const tooWide = lines.some(l => l.segs.length === 1 && l.w > el.w * 1.01);
    if ((lines.length * size * lh <= el.h && !tooWide) || size <= min) break;
    size -= 1;
  }
  return {size, lines, lh};
};

// ---------- montagem dos elementos de cada slide ----------
const rect = (x,y,w,h,fill,o={}) => ({k:'rect', x,y,w,h,fill, r:o.r||0, stroke:o.stroke, sw:o.sw||0});
const ell = (x,y,w,h,fill,o={}) => ({k:'ell', x,y,w,h,fill, stroke:o.stroke, sw:o.sw||0});
const line = (x1,y1,x2,y2,stroke,sw=3) => ({k:'line', x1,y1,x2,y2,stroke,sw});
const text = (x,y,w,h,t,o={}) => ({k:'text', x,y,w,h, text:t, size:o.size||24, font:o.font||'b', bold:!!o.bold, color:o.color||INK, align:o.align||'l', valign:o.valign||'t', lh:o.lh, edit:o.edit, min:o.min, spacing:o.spacing});
const img = (x,y,w,h,o={}) => ({k:'img', x,y,w,h, ill:o.ill, src:o.src, edit:'img'});

function chrome(E, m, s, idx, total, titleDefault){
  E.push(rect(0,0,W,H,PAPER));
  E.push(rect(0,0,16,H,m.accent));
  E.push(text(64,30,900,24,`LÍNGUA PORTUGUESA  ·  ${m.anoCurto.toUpperCase()}`,{size:15,bold:true,color:m.accent,spacing:2}));
  E.push(text(64,58,1150,80,s.title ?? titleDefault ?? '',{size:44,font:'h',bold:true,valign:'m',edit:'title',min:26}));
  E.push(line(64,678,1216,678,LINE,2));
  E.push(text(64,688,900,22,m.titulo,{size:14,color:MUTED}));
  E.push(text(1016,688,200,22,`${String(idx+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`,{size:14,bold:true,color:m.accent,align:'r'}));
}
function illus(E, m, s, x, y, d, fallback){
  E.push(ell(x,y,d,d,m.soft));
  const pad = d*0.12;
  if (s.photo) E.push(img(x+pad*0.5,y+pad*0.5,d-pad,d-pad,{src:s.photo}));
  else E.push(img(x+pad,y+pad,d-pad*2,d-pad*2,{ill:s.ill||fallback}));
}

const L = {};
L.capa = (E,m,s,i,n,lesson) => {
  E.push(rect(0,0,W,H,m.accent));
  E.push(ell(740,70,560,560,m.deep));
  E.push(ell(770,100,500,500,m.soft));
  if (s.photo) E.push(img(830,160,380,380,{src:s.photo})); else E.push(img(830,160,380,380,{ill:s.ill||lesson.ill}));
  E.push(text(80,72,640,26,`LÍNGUA PORTUGUESA  ·  ${m.anoCurto.toUpperCase()}  ·  ${m.eixoNome.toUpperCase()}`,{size:16,bold:true,color:WHITE,spacing:2}));
  E.push(text(80,140,640,290,s.title ?? m.titulo,{size:76,font:'h',bold:true,color:WHITE,valign:'b',lh:1.05,edit:'title',min:40}));
  E.push(text(80,450,620,100,s.sub ?? '',{size:28,color:WHITE,edit:'sub',lh:1.25}));
  let cx = 80;
  m.codes.slice(0,3).forEach(c => { E.push(rect(cx,592,150,44,m.deep,{r:22})); E.push(text(cx,592,150,44,c,{size:17,bold:true,color:WHITE,align:'c',valign:'m'})); cx += 162; });
};
L.objetivos = (E,m,s,i,n) => {
  chrome(E,m,s,i,n,DEFAULT_TITLES.objetivos);
  const items = s.items||[]; const step = Math.min(110, 470/Math.max(1,items.length));
  items.forEach((t,k) => {
    const y = 170 + k*step;
    E.push(rect(64,y+8,34,34,m.soft,{r:8,stroke:m.accent,sw:3}));
    E.push(rect(74,y+18,14,14,m.accent,{r:3}));
    E.push(text(120,y,600,step-12,t,{size:29,valign:'t',edit:`items.${k}`,lh:1.2}));
  });
  E.push(rect(760,158,456,490,WHITE,{r:18,stroke:LINE,sw:2}));
  E.push(text(792,180,400,30,'Habilidades da BNCC',{size:20,bold:true,color:m.accent}));
  const cs = m.codes.slice(0,3); const ch = 400/Math.max(1,cs.length);
  cs.forEach((c,k) => {
    const y = 226 + k*ch;
    E.push(text(792,y,400,30,c,{size:22,bold:true,font:'h'}));
    E.push(text(792,y+34,394,ch-46,(window.BNCC||{})[c]||'',{size:16,color:MUTED,lh:1.3}));
  });
};
L.pergunta = (E,m,s,i,n) => {
  chrome(E,m,s,i,n,DEFAULT_TITLES.pergunta);
  E.push(rect(64,160,780,380,m.soft,{r:30}));
  E.push(text(110,190,690,320,s.q,{size:40,font:'h',bold:true,valign:'m',edit:'q',lh:1.18}));
  E.push(rect(64,566,780,84,WHITE,{r:16,stroke:LINE,sw:2}));
  E.push(text(92,566,110,84,'Dica',{size:18,bold:true,color:m.accent,valign:'m'}));
  E.push(text(170,566,650,84,s.hint,{size:23,color:MUTED,valign:'m',edit:'hint'}));
  illus(E,m,s,880,200,340,'balao');
};
L.conceito = (E,m,s,i,n,lesson) => {
  chrome(E,m,s,i,n);
  E.push(text(64,168,720,270,s.text,{size:33,edit:'text',lh:1.32}));
  E.push(rect(64,462,720,180,MARK,{r:18}));
  E.push(text(96,482,300,24,'IMPORTANTE',{size:15,bold:true,color:MARK_INK,spacing:2}));
  E.push(text(96,512,660,116,s.box,{size:25,edit:'box',lh:1.28}));
  illus(E,m,s,830,180,380,lesson.ill);
};
L.grade = (E,m,s,i,n) => {
  chrome(E,m,s,i,n);
  const cells = s.cells||[]; const cols = s.cols || Math.min(4,cells.length); const rows = Math.ceil(cells.length/cols);
  const gap = 16, cw = (1152-(cols-1)*gap)/cols, chh = Math.min(130,(420-(rows-1)*gap)/rows);
  const top = 170 + (420 - (rows*chh+(rows-1)*gap))/2;
  cells.forEach((c,k) => {
    const hi = c.startsWith('*'); const t = hi ? c.slice(1) : c;
    const x = 64 + (k%cols)*(cw+gap), y = top + Math.floor(k/cols)*(chh+gap);
    E.push(rect(x,y,cw,chh,hi?m.accent:WHITE,{r:14,stroke:hi?m.accent:LINE,sw:2}));
    E.push(text(x+6,y,cw-12,chh,t,{size:Math.min(60,chh*0.55),font:'h',bold:true,color:hi?WHITE:INK,align:'c',valign:'m',edit:`cells.${k}`,min:14}));
  });
  E.push(text(64,604,1152,56,s.caption||'',{size:23,color:MUTED,align:'c',valign:'m',edit:'caption'}));
};
L.exemplos = (E,m,s,i,n) => {
  chrome(E,m,s,i,n);
  const cards = s.cards||[]; const nC = cards.length;
  const grid = nC === 4; const cols = grid ? 2 : nC; const gap = 24;
  const cw = (1152-(cols-1)*gap)/cols; const chh = grid ? 228 : 470;
  cards.forEach(([term,desc],k) => {
    const x = 64 + (k%cols)*(cw+gap), y = 166 + Math.floor(k/cols)*(chh+gap);
    E.push(rect(x,y,cw,chh,WHITE,{r:18,stroke:LINE,sw:2}));
    E.push(rect(x+28,y+28,40,8,m.accent,{r:4}));
    if (grid){
      E.push(text(x+28,y+48,cw-56,72,term,{size:34,font:'h',bold:true,color:m.accent,valign:'m',edit:`cards.${k}.0`,min:18}));
      E.push(text(x+28,y+124,cw-56,chh-140,desc,{size:26,edit:`cards.${k}.1`,lh:1.25}));
    } else {
      E.push(text(x+28,y+52,cw-56,140,term,{size:nC<=2?42:40,font:'h',bold:true,color:m.accent,valign:'m',edit:`cards.${k}.0`,min:18,lh:1.1}));
      E.push(text(x+28,y+206,cw-56,chh-230,desc,{size:28,edit:`cards.${k}.1`,lh:1.3}));
    }
  });
};
L.comparacao = (E,m,s,i,n) => {
  chrome(E,m,s,i,n);
  [[s.left,'left',64,m.accent],[s.right,'right',672,INK]].forEach(([col,key,x,c]) => {
    col = col || {h:'',items:[]};
    E.push(rect(x,166,544,76,c,{r:16}));
    E.push(text(x+20,166,504,76,col.h,{size:28,font:'h',bold:true,color:WHITE,align:'c',valign:'m',edit:`${key}.h`}));
    E.push(rect(x,254,544,392,WHITE,{r:16,stroke:LINE,sw:2}));
    const items = col.items||[]; const step = Math.min(120, 350/Math.max(1,items.length));
    items.forEach((t,k) => {
      const y = 278 + k*step;
      E.push(ell(x+28,y+12,14,14,c));
      E.push(text(x+58,y,460,step-10,t,{size:28,edit:`${key}.items.${k}`,lh:1.25}));
    });
  });
  E.push(ell(608,172,64,64,'#FFD25A',{stroke:INK,sw:3}));
  E.push(text(608,172,64,64,'x',{size:28,bold:true,align:'c',valign:'m'}));
};
L.texto = (E,m,s,i,n) => {
  chrome(E,m,s,i,n);
  E.push(rect(64,160,770,488,WHITE,{r:16,stroke:LINE,sw:2}));
  let t = s.text||''; const ps = t.split('\n');
  if (ps.length > 1 && ps[0].length < 70 && !/[.!?:,]$/.test(ps[0].trim()) && !ps[0].includes('**')) t = `**${ps[0]}**\n` + ps.slice(1).join('\n');
  E.push(text(100,188,700,400,t,{size:27,edit:'text',lh:1.42,min:14}));
  E.push(text(100,604,700,26,s.source||'',{size:14,color:MUTED,edit:'source'}));
  E.push(rect(858,160,358,488,m.soft,{r:16}));
  const side = s.side || {h:'',items:[]};
  E.push(text(888,186,300,60,side.h,{size:23,font:'h',bold:true,color:m.deep,edit:'side.h'}));
  const items = side.items||[]; const step = Math.min(124, 360/Math.max(1,items.length));
  items.forEach((q,k) => {
    const y = 262 + k*step;
    E.push(ell(888,y,40,40,m.accent));
    E.push(text(888,y,40,40,String(k+1),{size:19,bold:true,color:WHITE,align:'c',valign:'m'}));
    E.push(text(942,y+4,250,step-14,q,{size:21,edit:`side.items.${k}`,lh:1.25}));
  });
};
L.passos = (E,m,s,i,n) => {
  chrome(E,m,s,i,n);
  const st = s.steps||[]; const nS = st.length; const gap = 28; const cw = (1152-(nS-1)*gap)/nS;
  for (let k=0;k<nS-1;k++){ const x1 = 64+k*(cw+gap)+66, x2 = 64+(k+1)*(cw+gap)+30; E.push(line(x1,216,x2,216,m.accent,4)); }
  st.forEach(([h,d],k) => {
    const x = 64 + k*(cw+gap);
    E.push(rect(x,250,cw,390,WHITE,{r:18,stroke:LINE,sw:2}));
    E.push(ell(x,180,72,72,m.accent,{stroke:PAPER,sw:6}));
    E.push(text(x,180,72,72,String(k+1),{size:32,font:'h',bold:true,color:WHITE,align:'c',valign:'m'}));
    E.push(text(x+24,276,cw-48,120,h,{size:nS>3?27:30,font:'h',bold:true,edit:`steps.${k}.0`,lh:1.15,min:16}));
    E.push(text(x+24,404,cw-48,216,d,{size:nS>3?25:27,color:MUTED,edit:`steps.${k}.1`,lh:1.3}));
  });
};
const MAPA_POS = {
  6:[[64,168],[64,346],[64,524],[886,168],[886,346],[886,524]],
  5:[[64,168],[64,346],[64,524],[886,214],[886,460]],
  4:[[64,190],[64,470],[886,190],[886,470]],
  3:[[64,200],[886,200],[475,520]]
};
L.mapa = (E,m,s,i,n) => {
  chrome(E,m,s,i,n,DEFAULT_TITLES.mapa);
  const nodes = (s.nodes||[]).slice(0,6); const pos = MAPA_POS[Math.max(3,nodes.length)] || MAPA_POS[6];
  const cx = 640, cy = 404, nw = 330, nh = 124;
  nodes.forEach((nd,k) => { const [x,y] = pos[k]; const ex = x < 640 ? x+nw : x; E.push(line(cx,cy,ex,y+nh/2,m.accent,4)); });
  E.push(ell(cx-170,cy-78,340,156,m.accent,{stroke:m.deep,sw:4}));
  E.push(text(cx-140,cy-70,280,140,s.center||'',{size:30,font:'h',bold:true,color:WHITE,align:'c',valign:'m',edit:'center',min:16,lh:1.1}));
  nodes.forEach(([h,d],k) => {
    const [x,y] = pos[k];
    E.push(rect(x,y,nw,nh,WHITE,{r:18,stroke:m.accent,sw:3}));
    E.push(text(x+22,y+14,nw-44,40,h,{size:25,font:'h',bold:true,color:m.deep,edit:`nodes.${k}.0`,valign:'m',min:14}));
    E.push(text(x+22,y+58,nw-44,56,d,{size:21,color:MUTED,edit:`nodes.${k}.1`,lh:1.2}));
  });
};
L.atividade = (E,m,s,i,n) => {
  chrome(E,m,s,i,n);
  E.push(text(64,146,1152,40,s.instr||'',{size:23,color:MUTED,edit:'instr',valign:'m'}));
  const items = s.items||[]; const step = Math.min(116, 452/Math.max(1,items.length));
  items.forEach((it,k) => {
    const y = 200 + k*step;
    E.push(rect(64,y,1152,step-14,WHITE,{r:14,stroke:LINE,sw:2}));
    E.push(ell(84,y+(step-14)/2-22,44,44,m.accent));
    E.push(text(84,y+(step-14)/2-22,44,44,String(k+1),{size:20,bold:true,color:WHITE,align:'c',valign:'m'}));
    E.push(text(148,y+6,620,step-26,it.q,{size:28,valign:'m',edit:`items.${k}.q`,lh:1.2,min:13}));
    E.push(line(800,y+(step-14)/2+16,1188,y+(step-14)/2+16,'#AEB8C6',2));
    E.push({k:'answer', x:800, y:y+6, w:388, h:(step-14)/2+6, text:it.r, color:OK});
  });
};
L.quiz = (E,m,s,i,n,lesson) => {
  chrome(E,m,s,i,n,DEFAULT_TITLES.quiz);
  const quizzes = lesson.slides.filter(x=>x.type==='quiz'); const qi = quizzes.indexOf(s);
  E.push(rect(64,148,240,40,MARK,{r:20}));
  E.push(text(64,148,240,40,`Pergunta ${qi+1} de ${quizzes.length}`,{size:17,bold:true,color:MARK_INK,align:'c',valign:'m'}));
  E.push(text(64,200,1152,130,s.q,{size:35,font:'h',bold:true,valign:'m',edit:'q',lh:1.18,min:18}));
  (s.opts||[]).slice(0,4).forEach((o,k) => {
    const x = 64 + (k%2)*592, y = 352 + Math.floor(k/2)*150;
    E.push({...rect(x,y,560,132,WHITE,{r:18,stroke:LINE,sw:3}), opt:k});
    E.push(ell(x+24,y+34,64,64,m.accent));
    E.push(text(x+24,y+34,64,64,'ABCD'[k],{size:28,font:'h',bold:true,color:WHITE,align:'c',valign:'m'}));
    E.push(text(x+110,y+12,426,108,o,{size:28,valign:'m',edit:`opts.${k}`,lh:1.2,min:13}));
  });
};
SP.gabaritoTextos = function(lesson){
  let a = [], q = [], na = 0, nq = 0;
  lesson.slides.forEach(s => {
    if (s.type === 'atividade'){ na++; a.push(`**${SP.plain(s.title || 'Atividade ' + na)}**`); (s.items||[]).forEach((it,k)=> a.push(`${k+1}) ${SP.plain(it.r||'')}`)); }
    if (s.type === 'quiz'){ nq++; q.push(`**Pergunta ${nq}:** ${'ABCD'[s.c]}) ${SP.plain((s.opts||[])[s.c]||'')}`); }
  });
  return {a: a.join('\n'), q: q.join('\n')};
};
L.gabarito = (E,m,s,i,n,lesson) => {
  chrome(E,m,s,i,n,DEFAULT_TITLES.gabarito);
  const g = SP.gabaritoTextos(lesson);
  E.push(rect(64,160,740,488,WHITE,{r:16,stroke:LINE,sw:2}));
  E.push(text(96,178,600,32,'Atividades',{size:22,font:'h',bold:true,color:m.accent}));
  E.push(text(96,220,676,404,g.a,{size:21,lh:1.32,min:11}));
  E.push(rect(828,160,388,488,m.soft,{r:16}));
  E.push(text(856,178,330,32,'Quiz',{size:22,font:'h',bold:true,color:m.deep}));
  E.push(text(856,220,334,404,g.q,{size:21,lh:1.4,min:11}));
};
L.resumo = (E,m,s,i,n) => {
  chrome(E,m,s,i,n,DEFAULT_TITLES.resumo);
  const items = s.items||[]; const cols = 2, rows = Math.ceil(items.length/cols), gap = 24;
  const cw = (1152-gap)/2, chh = (480-(rows-1)*gap)/rows;
  items.forEach((t,k) => {
    const x = 64 + (k%cols)*(cw+gap), y = 166 + Math.floor(k/cols)*(chh+gap);
    E.push(rect(x,y,cw,chh,k%3===0?m.soft:WHITE,{r:18,stroke:k%3===0?m.soft:LINE,sw:2}));
    E.push(text(x+30,y+20,60,60,'"',{size:64,font:'h',bold:true,color:m.accent}));
    E.push(text(x+86,y+20,cw-116,chh-40,t,{size:30,font:'h',bold:true,valign:'m',edit:`items.${k}`,lh:1.22}));
  });
};
L.auto = (E,m,s,i,n) => {
  chrome(E,m,s,i,n,DEFAULT_TITLES.auto);
  const cols = ['Já sei','Quase lá','Preciso rever']; const cx = [700,872,1044], cw = 172;
  E.push(rect(64,160,1152,64,INK,{r:12}));
  E.push(text(92,160,560,64,'Eu consigo...',{size:22,bold:true,color:WHITE,valign:'m'}));
  cols.forEach((c,k) => E.push(text(cx[k],160,cw,64,c,{size:20,bold:true,color:WHITE,align:'c',valign:'m'})));
  const items = s.items||[]; const step = Math.min(104, 410/Math.max(1,items.length));
  items.forEach((t,k) => {
    const y = 236 + k*step;
    E.push(rect(64,y,1152,step-12,k%2?WHITE:m.soft,{r:12}));
    E.push(text(92,y,590,step-12,t,{size:26,valign:'m',edit:`items.${k}`}));
    cols.forEach((c,j) => E.push(ell(cx[j]+cw/2-18,y+(step-12)/2-18,36,36,WHITE,{stroke:j===0?OK:j===1?'#C9971B':BAD,sw:4})));
  });
};
L.desafio = (E,m,s,i,n) => {
  chrome(E,m,s,i,n);
  E.push(rect(64,160,790,488,WHITE,{r:22,stroke:m.accent,sw:4}));
  E.push(rect(96,188,170,40,m.accent,{r:20}));
  E.push(text(96,188,170,40,'DESAFIO',{size:17,bold:true,color:WHITE,align:'c',valign:'m',spacing:2}));
  E.push(text(96,246,726,130,s.text,{size:28,font:'h',bold:true,edit:'text',lh:1.22}));
  const items = s.items||[]; const step = Math.min(58, 240/Math.max(1,items.length));
  items.forEach((t,k) => {
    const y = 392 + k*step;
    E.push(rect(98,y+8,28,28,WHITE,{r:6,stroke:INK,sw:3}));
    E.push(text(144,y,670,step-6,t,{size:23,valign:'m',edit:`items.${k}`}));
  });
  illus(E,m,s,890,220,320,'lapis');
};
L.encerramento = (E,m,s,i,n) => {
  E.push(rect(0,0,W,H,m.accent));
  E.push(ell(820,120,420,420,m.soft));
  if (s.photo) E.push(img(860,160,340,340,{src:s.photo})); else E.push(img(880,180,300,300,{ill:s.ill||'trofeu'}));
  E.push(text(80,96,700,150,s.title ?? DEFAULT_TITLES.encerramento,{size:64,font:'h',bold:true,color:WHITE,valign:'b',edit:'title',lh:1.05,min:30}));
  E.push(rect(80,290,690,270,WHITE,{r:24}));
  E.push(text(116,316,400,28,'PARA CASA',{size:17,bold:true,color:m.accent,spacing:2}));
  E.push(text(116,356,620,184,s.casa||'',{size:28,edit:'casa',lh:1.3}));
  E.push(text(80,610,1100,30,`Língua Portuguesa  ·  ${m.anoLabel}  ·  ${m.titulo}`,{size:18,color:WHITE}));
};

SP.layout = function(meta, lesson, idx){
  const s = lesson.slides[idx]; const E = [];
  (L[s.type] || L.conceito)(E, meta, s, idx, lesson.slides.length, lesson);
  return E;
};

// ---------- utilidades de caminho (edição) ----------
SP.getPath = (obj, path) => path.split('.').reduce((o,k) => o == null ? o : o[k], obj);
SP.setPath = (obj, path, val) => { const ks = path.split('.'); let o = obj; ks.slice(0,-1).forEach(k => { if (o[k] == null) o[k] = {}; o = o[k]; }); o[ks[ks.length-1]] = val; };

// ---------- renderização em HTML ----------
const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
SP.toHTML = (t) => SP.parse(t).map(runs => runs.map(r => r.b ? `<b>${esc(r.t)}</b>` : esc(r.t)).join('')).join('<br>');
SP.fromHTML = function(el){
  // converte o conteúdo editado de volta para texto com **negrito**
  let out = '';
  const walk = (n, bold) => {
    n.childNodes.forEach(c => {
      if (c.nodeType === 3) out += bold ? `**${c.textContent}**` : c.textContent;
      else if (c.nodeName === 'BR') out += '\n';
      else if (c.nodeName === 'DIV' || c.nodeName === 'P'){ if (out && !out.endsWith('\n')) out += '\n'; walk(c, bold); }
      else walk(c, bold || c.nodeName === 'B' || c.nodeName === 'STRONG');
    });
  };
  walk(el, false);
  return out.replace(/\*\*\*\*/g,'').replace(/ /g,' ').replace(/\n+$/,'');
};

const illCache = {};
SP.illURL = (key) => illCache[key] || (illCache[key] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent((window.ILUSTRACOES||{})[key] || (window.ILUSTRACOES||{}).livro));

SP.renderHTML = function(meta, lesson, idx, opts={}){
  const els = SP.layout(meta, lesson, idx);
  const root = document.createElement('div');
  root.className = 'sl';
  for (const e of els){
    let d;
    if (e.k === 'rect' || e.k === 'ell'){
      d = document.createElement('div'); d.className = 'sl-shape';
      d.style.cssText = `left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;background:${e.fill};border-radius:${e.k==='ell'?'50%':e.r+'px'};${e.sw?`box-shadow:inset 0 0 0 ${e.sw}px ${e.stroke};`:''}`;
      if (e.opt !== undefined){ d.dataset.opt = e.opt; d.classList.add('sl-opt'); }
    } else if (e.k === 'line'){
      d = document.createElement('div'); d.className = 'sl-shape';
      const len = Math.hypot(e.x2-e.x1, e.y2-e.y1), ang = Math.atan2(e.y2-e.y1, e.x2-e.x1);
      d.style.cssText = `left:${e.x1}px;top:${e.y1-e.sw/2}px;width:${len}px;height:${e.sw}px;background:${e.stroke};transform-origin:0 50%;transform:rotate(${ang}rad);border-radius:${e.sw}px`;
    } else if (e.k === 'img'){
      d = document.createElement('img'); d.className = 'sl-img'; d.alt = '';
      d.src = e.src || SP.illURL(e.ill);
      d.style.cssText = `left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;${e.src?'object-fit:cover;border-radius:50%;':''}`;
      if (opts.editable) d.dataset.edit = 'img';
    } else if (e.k === 'answer'){
      if (!opts.answers) continue;
      d = document.createElement('div'); d.className = 'sl-answer';
      d.style.cssText = `left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;color:${e.color}`;
      d.textContent = e.text || '';
    } else if (e.k === 'text'){
      d = document.createElement('div'); d.className = 'sl-text ' + (e.font === 'h' ? 'f-h' : 'f-b');
      const jc = e.valign === 'm' ? 'center' : e.valign === 'b' ? 'flex-end' : 'flex-start';
      d.style.cssText = `left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;justify-content:${jc};text-align:${e.align==='c'?'center':e.align==='r'?'right':'left'};color:${e.color};font-weight:${e.bold?800:400};line-height:${e.lh||1.2};${e.spacing?`letter-spacing:${e.spacing}px;`:''}`;
      const inner = document.createElement('div'); inner.className = 'sl-in';
      inner.style.fontSize = e.size + 'px'; inner.dataset.size = e.size; inner.dataset.min = e.min || Math.max(9, Math.round(e.size*0.45));
      inner.innerHTML = SP.toHTML(e.text);
      if (opts.editable && e.edit){ inner.contentEditable = 'true'; inner.dataset.edit = e.edit; inner.spellcheck = true; d.classList.add('sl-editable'); }
      d.appendChild(inner);
    }
    if (d) root.appendChild(d);
  }
  return root;
};
// reduz o tamanho da fonte das caixas que transbordam (chamar depois de inserir no DOM)
SP.shrink = function(root){
  root.querySelectorAll('.sl-in').forEach(inner => {
    const box = inner.parentElement; let size = +inner.dataset.size; const min = +inner.dataset.min;
    inner.style.fontSize = size + 'px';
    let guard = 60;
    while (guard-- > 0 && size > min && (inner.scrollHeight > box.clientHeight + 1 || inner.scrollWidth > box.clientWidth + 1)){
      size -= 1; inner.style.fontSize = size + 'px';
    }
  });
};
})();
