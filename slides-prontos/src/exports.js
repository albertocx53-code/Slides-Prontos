// Exportação: PowerPoint editável (.pptx), PDF dos slides, folha de atividades (PDF) e pacotes .zip
(function(){
const SP = window.SP;
const hex = (c) => String(c||'#000000').replace('#','').toUpperCase();
const PX = 96; // px por polegada no slide de 1280x720 (13,333 x 7,5 pol)

// ---------- imagens ----------
const rasterCache = {};
function loadImage(src){
  return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}
SP.rasterIll = async function(key, size=600){
  const k = key + '@' + size; if (rasterCache[k]) return rasterCache[k];
  const im = await loadImage(SP.illURL(key));
  const c = document.createElement('canvas'); c.width = c.height = size;
  c.getContext('2d').drawImage(im, 0, 0, size, size);
  return (rasterCache[k] = c.toDataURL('image/png'));
};
SP.photoCircle = async function(src, size=700){
  const k = 'p:' + src.length + ':' + src.slice(-40) + size; if (rasterCache[k]) return rasterCache[k];
  const im = await loadImage(src);
  const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d');
  g.beginPath(); g.arc(size/2, size/2, size/2, 0, Math.PI*2); g.clip();
  const sc = Math.max(size/im.width, size/im.height); const w = im.width*sc, h = im.height*sc;
  g.drawImage(im, (size-w)/2, (size-h)/2, w, h);
  return (rasterCache[k] = c.toDataURL('image/png'));
};
async function imgData(e){ return e.src ? SP.photoCircle(e.src) : SP.rasterIll(e.ill); }

// ---------- medida de texto para o PowerPoint ----------
const mctx = document.createElement('canvas').getContext('2d');
const PPT_FONT = {h:'Trebuchet MS', b:'Calibri'};
function pptMeasure(font){
  const fam = font === 'h' ? '"Trebuchet MS", Arial, sans-serif' : 'Calibri, Carlito, Arial, sans-serif';
  return (t, b, size) => { mctx.font = `${b?'bold ':''}${size}px ${fam}`; return mctx.measureText(t).width * 1.04; };
}

// ---------- PowerPoint ----------
SP.buildPPTX = async function(meta, lesson){
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Slides Prontos'; pptx.company = 'Slides Prontos'; pptx.title = meta.titulo;
  pptx.subject = `Língua Portuguesa · ${meta.anoLabel} · BNCC ${meta.codes.join(', ')}`;
  for (let idx = 0; idx < lesson.slides.length; idx++){
    const s = lesson.slides[idx];
    const slide = pptx.addSlide();
    const els = SP.layout(meta, lesson, idx);
    for (const e of els){
      if (e.k === 'rect'){
        slide.addShape(e.r ? pptx.ShapeType.roundRect : pptx.ShapeType.rect, {x:e.x/PX, y:e.y/PX, w:e.w/PX, h:e.h/PX, fill:{color:hex(e.fill)}, line: e.sw ? {color:hex(e.stroke), width:e.sw*0.75} : {type:'none'}, rectRadius: e.r ? e.r/PX : undefined});
      } else if (e.k === 'ell'){
        slide.addShape(pptx.ShapeType.ellipse, {x:e.x/PX, y:e.y/PX, w:e.w/PX, h:e.h/PX, fill:{color:hex(e.fill)}, line: e.sw ? {color:hex(e.stroke), width:e.sw*0.75} : {type:'none'}});
      } else if (e.k === 'line'){
        const x = Math.min(e.x1,e.x2), y = Math.min(e.y1,e.y2), w = Math.abs(e.x2-e.x1), h = Math.abs(e.y2-e.y1);
        const flipV = (e.x2 - e.x1) * (e.y2 - e.y1) < 0;
        slide.addShape(pptx.ShapeType.line, {x:x/PX, y:y/PX, w:Math.max(w,0.5)/PX, h:Math.max(h,0)/PX, flipV, line:{color:hex(e.stroke), width:e.sw*0.75}});
      } else if (e.k === 'img'){
        const data = await imgData(e);
        slide.addImage({data: data.replace(/^data:/,''), x:e.x/PX, y:e.y/PX, w:e.w/PX, h:e.h/PX});
      } else if (e.k === 'text'){
        if (!SP.plain(e.text).trim()) continue;
        const f = SP.fit(e, pptMeasure(e.font));
        const paras = SP.parse(e.text); const runs = [];
        paras.forEach((p, pi) => p.forEach((r, ri) => runs.push({text: r.t, options: {bold: r.b || e.bold, breakLine: ri === p.length-1 && pi < paras.length-1}})));
        slide.addText(runs, {x:e.x/PX, y:e.y/PX, w:e.w/PX, h:e.h/PX, margin:0, fontFace: PPT_FONT[e.font], fontSize: Math.max(8, Math.round(f.size*0.75*10)/10), color: hex(e.color), bold: e.bold,
          align: e.align==='c'?'center':e.align==='r'?'right':'left', valign: e.valign==='m'?'middle':e.valign==='b'?'bottom':'top',
          lineSpacingMultiple: Math.max(0.8, (e.lh||1.2)/1.18), charSpacing: e.spacing ? e.spacing*0.75 : undefined, paraSpaceBefore:0, paraSpaceAfter:0, fit:'none', wrap:true});
      }
    }
    const notas = [];
    if (s.nota) notas.push(SP.plain(s.nota));
    if (s.type === 'quiz') notas.push(`Resposta: ${'ABCD'[s.c]}) ${SP.plain((s.opts||[])[s.c]||'')}. ${SP.plain(s.why||'')}`);
    if (s.type === 'atividade') notas.push('Respostas: ' + (s.items||[]).map((it,k)=>`${k+1}) ${SP.plain(it.r||'')}`).join('  '));
    if (notas.length) slide.addNotes(notas.join('\n'));
  }
  return pptx.write({outputType:'blob'});
};

// ---------- PDF ----------
let pdfFonts = null;
const winAnsiOK = {};
function sanitizer(font){
  return (t) => { let out = ''; for (const ch of String(t)){ if (winAnsiOK[ch] === undefined){ try { font.encodeText(ch); winAnsiOK[ch] = true; } catch(_) { winAnsiOK[ch] = false; } } out += winAnsiOK[ch] ? ch : (ch === '→' ? '->' : '?'); } return out; };
}
function rgbOf(c){ const n = parseInt(hex(c), 16); return PDFLib.rgb(((n>>16)&255)/255, ((n>>8)&255)/255, (n&255)/255); }
function rrPath(w, h, r){ r = Math.min(r, w/2, h/2); return `M ${r} 0 L ${w-r} 0 Q ${w} 0 ${w} ${r} L ${w} ${h-r} Q ${w} ${h} ${w-r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h-r} L 0 ${r} Q 0 0 ${r} 0 Z`; }

async function pdfSetup(doc){
  const reg = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  const bold = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  return {reg, bold, clean: sanitizer(reg)};
}
function drawTextBox(page, F, e, s, pageH){
  const measure = (t, b, size) => (b ? F.bold : F.reg).widthOfTextAtSize(F.clean(t), size);
  const f = SP.fit(e, measure);
  const lh = f.size * f.lh, total = f.lines.length * lh;
  let y0 = e.y + (e.valign === 'm' ? (e.h - total)/2 : e.valign === 'b' ? e.h - total : 0);
  for (const ln of f.lines){
    let x = e.x + (e.align === 'c' ? (e.w - ln.w)/2 : e.align === 'r' ? e.w - ln.w : 0);
    const base = y0 + (lh - f.size)/2 + f.size*0.8;
    for (const sg of ln.segs){
      const t = F.clean(sg.t);
      if (t.trim()) page.drawText(t, {x: x*s, y: pageH - base*s, size: f.size*s, font: sg.b ? F.bold : F.reg, color: rgbOf(e.color)});
      x += sg.w;
    }
    y0 += lh;
  }
}
async function drawEls(doc, page, F, els, s, pageH, ox=0, oy=0){
  for (const e0 of els){
    const e = {...e0, x:(e0.x||0)+ox, y:(e0.y||0)+oy, x1:(e0.x1||0)+ox, x2:(e0.x2||0)+ox, y1:(e0.y1||0)+oy, y2:(e0.y2||0)+oy};
    if (e.k === 'rect'){
      const o = {color: rgbOf(e.fill)}; if (e.sw){ o.borderColor = rgbOf(e.stroke); o.borderWidth = e.sw*s; }
      if (e.r) page.drawSvgPath(rrPath(e.w*s, e.h*s, e.r*s), {x: e.x*s, y: pageH - e.y*s, ...o});
      else page.drawRectangle({x: e.x*s, y: pageH - (e.y+e.h)*s, width: e.w*s, height: e.h*s, ...o});
    } else if (e.k === 'ell'){
      const o = {color: rgbOf(e.fill)}; if (e.sw){ o.borderColor = rgbOf(e.stroke); o.borderWidth = e.sw*s; }
      page.drawEllipse({x: (e.x+e.w/2)*s, y: pageH - (e.y+e.h/2)*s, xScale: e.w/2*s, yScale: e.h/2*s, ...o});
    } else if (e.k === 'line'){
      page.drawLine({start:{x:e.x1*s, y:pageH-e.y1*s}, end:{x:e.x2*s, y:pageH-e.y2*s}, thickness: e.sw*s, color: rgbOf(e.stroke)});
    } else if (e.k === 'img'){
      const im = await doc.embedPng(await imgData(e));
      page.drawImage(im, {x: e.x*s, y: pageH - (e.y+e.h)*s, width: e.w*s, height: e.h*s});
    } else if (e.k === 'text'){
      if (SP.plain(e.text).trim()) drawTextBox(page, F, e, s, pageH);
    }
  }
}
SP.buildPDF = async function(meta, lesson){
  const doc = await PDFLib.PDFDocument.create();
  doc.setTitle(meta.titulo); doc.setAuthor('Slides Prontos'); doc.setSubject(`Língua Portuguesa - ${meta.anoLabel}`);
  const F = await pdfSetup(doc);
  for (let idx = 0; idx < lesson.slides.length; idx++){
    const page = doc.addPage([960, 540]);
    await drawEls(doc, page, F, SP.layout(meta, lesson, idx), 0.75, 540);
  }
  return new Blob([await doc.save()], {type:'application/pdf'});
};

// ---------- folha de atividades (A4) ----------
SP.buildFolha = async function(meta, lesson){
  const doc = await PDFLib.PDFDocument.create();
  doc.setTitle(`${meta.titulo} - atividades`); doc.setAuthor('Slides Prontos');
  const F = await pdfSetup(doc);
  const PW = 595, PH = 842, M = 48, CW = PW - 2*M; // pontos
  let page, y;
  const newPage = () => {
    page = doc.addPage([PW, PH]); y = M;
    page.drawRectangle({x:0, y:PH-6, width:PW, height:6, color: rgbOf(meta.accent)});
    drawTextBox(page, F, {x:M, y:PH-30, w:CW, h:14, text:`Slides Prontos  ·  Língua Portuguesa  ·  ${meta.anoLabel}  ·  ${meta.titulo}`, size:8, color:'#5C6678', valign:'m', align:'l'}, 1, PH);
  };
  const tb = (t, o) => { const e = {x:M+(o.dx||0), y, w:CW-(o.dx||0), h:2000, text:t, size:o.size||11, bold:!!o.bold, color:o.color||'#17233B', lh:o.lh||1.35, valign:'t', align:o.align||'l', min:o.size||11};
    const f = SP.fit(e, (tt,b,sz) => (b?F.bold:F.reg).widthOfTextAtSize(F.clean(tt), sz));
    const hgt = f.lines.length * f.size * f.lh; return {e:{...e, h:hgt+2}, hgt}; };
  const ensure = (need) => { if (y + need > PH - M) newPage(); };
  const write = (t, o={}) => { const {e, hgt} = tb(t, o); ensure(hgt + (o.after||6)); e.y = y; drawTextBox(page, F, e, 1, PH); y += hgt + (o.after||6); };
  const lines = (n, dx=0) => { for (let i=0;i<n;i++){ ensure(24); y += 20; page.drawLine({start:{x:M+dx, y:PH-y}, end:{x:PW-M, y:PH-y}, thickness:0.6, color: rgbOf('#AEB8C6')}); } y += 10; };
  const heading = (t) => { ensure(60); y += 8; page.drawRectangle({x:M, y:PH-y-22, width:CW, height:22, color: rgbOf(meta.soft)}); drawTextBox(page, F, {x:M+8, y:PH-(PH-y)-0, w:CW-16, h:22, text:t, size:12, bold:true, color:meta.deep, valign:'m'}, 1, PH); y += 32; };

  newPage();
  y = 36;
  page.drawRectangle({x:M, y:PH-y-96, width:CW, height:96, color: rgbOf(meta.accent)});
  drawTextBox(page, F, {x:M+18, y:y+14, w:CW-36, h:16, text:`FOLHA DE ATIVIDADES  ·  ${meta.anoCurto.toUpperCase()}`, size:9, bold:true, color:'#FFFFFF'}, 1, PH);
  drawTextBox(page, F, {x:M+18, y:y+32, w:CW-36, h:30, text:meta.titulo, size:20, bold:true, color:'#FFFFFF', valign:'m', min:12}, 1, PH);
  drawTextBox(page, F, {x:M+18, y:y+66, w:CW-36, h:20, text:`Habilidades BNCC: ${meta.codes.join(', ')}`, size:9, color:'#FFFFFF', valign:'m'}, 1, PH);
  y += 116;
  write('Nome: ________________________________________   Turma: ________   Data: ____/____/______', {size:10.5, after:14});

  let na = 0, nq = 0;
  for (const s of lesson.slides){
    if (s.type === 'atividade'){
      na++; heading(SP.plain(s.title || `Atividade ${na}`));
      write(SP.plain(s.instr||''), {size:10.5, color:'#5C6678', after:8});
      (s.items||[]).forEach((it,k) => { write(`${k+1})  ${SP.plain(it.q)}`, {size:11.5, after:2}); lines(it.q.length > 40 || (it.r||'').length > 30 ? 2 : 1, 16); });
    }
  }
  const quizzes = lesson.slides.filter(s => s.type === 'quiz');
  if (quizzes.length){
    heading('Teste seus conhecimentos');
    write('Marque um X na alternativa correta.', {size:10.5, color:'#5C6678', after:8});
    quizzes.forEach(s => { nq++; ensure(40 + (s.opts||[]).length*20); write(`${nq})  ${SP.plain(s.q)}`, {size:11.5, bold:true, after:4}); (s.opts||[]).forEach((o,k) => write(`(   )  ${'abcd'[k]}) ${SP.plain(o)}`, {size:11, dx:16, after:3})); y += 8; });
  }
  const mapa = lesson.slides.find(s => s.type === 'mapa');
  if (mapa){
    heading('Mapa mental para completar');
    write('Escreva, em cada caixa, uma explicação ou um exemplo.', {size:10.5, color:'#5C6678', after:8});
    ensure(250);
    const top = y, cx = PW/2, cy = top + 115;
    const nodes = (mapa.nodes||[]).slice(0,6); const bw = 150, bh = 62;
    const pos = nodes.map((_,k) => { const col = k < Math.ceil(nodes.length/2) ? 0 : 1; const row = col === 0 ? k : k - Math.ceil(nodes.length/2); const rowsInCol = col === 0 ? Math.ceil(nodes.length/2) : Math.floor(nodes.length/2); const gy = 230/Math.max(1,rowsInCol); return [col === 0 ? M : PW - M - bw, top + row*gy + (gy-bh)/2]; });
    pos.forEach(([x,yy]) => page.drawLine({start:{x:cx, y:PH-cy}, end:{x: x < cx ? x+bw : x, y:PH-(yy+bh/2)}, thickness:1.2, color: rgbOf(meta.accent)}));
    page.drawEllipse({x:cx, y:PH-cy, xScale:78, yScale:30, color: rgbOf(meta.accent)});
    drawTextBox(page, F, {x:cx-70, y:cy-26, w:140, h:52, text:SP.plain(mapa.center), size:11, bold:true, color:'#FFFFFF', align:'c', valign:'m', min:7}, 1, PH);
    nodes.forEach(([h],k) => { const [x,yy] = pos[k];
      page.drawSvgPath(rrPath(bw, bh, 8), {x, y:PH-yy, color: rgbOf('#FFFFFF'), borderColor: rgbOf(meta.accent), borderWidth:1});
      drawTextBox(page, F, {x:x+8, y:yy+6, w:bw-16, h:14, text:SP.plain(h), size:10, bold:true, color:meta.deep, min:7}, 1, PH);
      page.drawLine({start:{x:x+8, y:PH-(yy+40)}, end:{x:x+bw-8, y:PH-(yy+40)}, thickness:0.5, color: rgbOf('#AEB8C6')});
      page.drawLine({start:{x:x+8, y:PH-(yy+54)}, end:{x:x+bw-8, y:PH-(yy+54)}, thickness:0.5, color: rgbOf('#AEB8C6')}); });
    y = top + 250;
  }
  const auto = lesson.slides.find(s => s.type === 'auto');
  if (auto){
    heading('Autoavaliação');
    write('Pinte a opção que mostra como você se sente:   Já sei   |   Quase lá   |   Preciso rever', {size:10, color:'#5C6678', after:8});
    (auto.items||[]).forEach(t => { ensure(26); drawTextBox(page, F, {x:M, y, w:330, h:22, text:SP.plain(t), size:10.5, valign:'m', min:7}, 1, PH);
      ['Já sei','Quase lá','Preciso rever'].forEach((c,j) => { const x = M + 340 + j*62; page.drawSvgPath(rrPath(56, 20, 6), {x, y:PH-y-1, borderColor: rgbOf('#5C6678'), borderWidth:0.8}); drawTextBox(page, F, {x, y:y+1, w:56, h:20, text:c, size:7.5, color:'#5C6678', align:'c', valign:'m'}, 1, PH); });
      y += 28; });
  }
  // gabarito
  newPage();
  write('Gabarito do professor', {size:18, bold:true, color:meta.deep, after:4});
  write(meta.titulo + '  ·  ' + meta.anoLabel, {size:10.5, color:'#5C6678', after:14});
  const g = SP.gabaritoTextos(lesson);
  heading('Atividades'); g.a.split('\n').forEach(l => write(l, {size:11, after:3}));
  heading('Teste seus conhecimentos'); g.q.split('\n').forEach(l => write(l, {size:11, after:3}));
  return new Blob([await doc.save()], {type:'application/pdf'});
};

// ---------- pacotes ----------
SP.slug = (t) => SP.plain(t).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60);
SP.baseName = (meta) => `${String(meta.id).padStart(3,'0')}-${SP.slug(meta.anoCurto.replace(/[ºª]/g,''))}-${SP.slug(meta.titulo)}`;
SP.buildZip = async function(list, onProgress){
  const zip = new JSZip(); let done = 0; const total = list.length * 3;
  for (const {meta, lesson} of list){
    const base = SP.baseName(meta); const folder = list.length > 1 ? zip.folder(base) : zip;
    folder.file(`${base}.pptx`, await SP.buildPPTX(meta, lesson)); onProgress && onProgress(++done, total);
    folder.file(`${base}-slides.pdf`, await SP.buildPDF(meta, lesson)); onProgress && onProgress(++done, total);
    folder.file(`${base}-atividades.pdf`, await SP.buildFolha(meta, lesson)); onProgress && onProgress(++done, total);
  }
  return zip.generateAsync({type:'blob'});
};
})();
