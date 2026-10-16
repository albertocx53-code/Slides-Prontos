(function(){
const SP = window.SP, CAT = window.CATALOGO, AULAS = window.AULAS;
const $ = (s, r=document) => r.querySelector(s);
const h = (tag, attrs={}, ...kids) => { const e = document.createElement(tag); for (const [k,v] of Object.entries(attrs)){ if (v == null || v === false) continue; if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (k === 'html') e.innerHTML = v; else e.setAttribute(k, v === true ? '' : v); } kids.flat().forEach(k => { if (k == null || k === false) return; e.append(k.nodeType ? k : document.createTextNode(k)); }); return e; };

// ---------- dados ----------
const READY = Object.keys(AULAS).map(Number).sort((a,b)=>a-b);
const LOTE = {}; READY.forEach(id => LOTE[id] = 1);
CAT.map(c=>c[0]).filter(id => !LOTE[id]).forEach((id,i) => LOTE[id] = 2 + Math.floor(i/10));
const META = {}; CAT.forEach(c => META[c[0]] = SP.meta(c));
const KEY = (id) => 'sp:aula:' + id;
const store = {
  get(id){ try { const v = localStorage.getItem(KEY(id)); return v ? JSON.parse(v) : null; } catch(_) { return null; } },
  set(id, data){ try { localStorage.setItem(KEY(id), JSON.stringify(data)); return true; } catch(_) { return false; } },
  del(id){ try { localStorage.removeItem(KEY(id)); } catch(_) {} }
};
const clone = (o) => JSON.parse(JSON.stringify(o));
function lessonOf(id){ if (!AULAS[id]) return null; return store.get(id) || AULAS[id]; }
function isEdited(id){ return !!store.get(id); }
function placeholder(id){ const m = META[id]; return {ill: (window.ILUSTRACAO_EIXO||{})[m.eixo] || 'livro', slides:[{type:'capa', title:m.titulo, sub:''}]}; }
const PLANO = ['Capa','Objetivos e habilidades BNCC','Aquecimento: pergunta para a turma','Conceito principal','Exemplos comentados','Leitura de texto','Comparação ou passo a passo','Mapa mental','Atividade 1','Atividade 2 ou desafio','Quiz: pergunta 1','Quiz: pergunta 2','Quiz: pergunta 3','Gabarito','O que aprendemos','Autoavaliação','Para casa e encerramento'];

// ---------- molduras de slide ----------
const ro = new ResizeObserver(en => en.forEach(e => e.target.style.setProperty('--s', (e.contentRect.width/1280).toFixed(5))));
let fontsReady = false;
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { fontsReady = true; document.querySelectorAll('.frame>.sl').forEach(SP.shrink); });
function frame(meta, lesson, idx, opts={}){
  const f = h('div', {class:'frame'});
  ro.observe(f);
  const paint = () => { f.innerHTML = ''; const sl = SP.renderHTML(meta, lesson, idx, opts); f.append(sl); requestAnimationFrame(() => SP.shrink(sl)); };
  if (opts.lazy){ lazyIO.observe(f); f._paint = paint; } else paint();
  return f;
}
const lazyIO = new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting && e.target._paint){ e.target._paint(); e.target._paint = null; lazyIO.unobserve(e.target); } }), {rootMargin:'400px'});

// ---------- avisos ----------
let toastEl = null, toastTimer;
function toast(msg, pct){
  if (!toastEl){ toastEl = h('div', {class:'toast', role:'status', 'aria-live':'polite'}); document.body.append(toastEl); }
  toastEl.hidden = false; toastEl.innerHTML = '';
  toastEl.append(h('div', {}, msg));
  if (pct != null){ const bar = h('div', {class:'bar'}, h('i')); bar.firstChild.style.width = Math.round(pct*100) + '%'; toastEl.append(bar); }
  clearTimeout(toastTimer); if (pct == null) toastTimer = setTimeout(() => toastEl.hidden = true, 4200);
}

// ---------- downloads e bibliotecas ----------
let downloads = null, dlChecked = false;
const dlReady = (async () => {
  const inFrame = (() => { try { return window.self !== window.top; } catch(_) { return true; } })();
  for (let i = 0; i < (inFrame ? 40 : 0) && !(window.claude && window.claude.use); i++) await new Promise(r => setTimeout(r, 250));
  try { downloads = window.claude && window.claude.use ? await window.claude.use('downloads') : null; } catch(_) { downloads = null; }
  dlChecked = true; return downloads;
})();
const LIBS = [
  ['PptxGenJS','https://cdn.jsdelivr.net/npm/pptxgenjs@4.0.1/dist/pptxgen.bundle.js'],
  ['PDFLib','https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js'],
  ['JSZip','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js']
];
let libsP = null;
function loadLibs(){
  if (libsP) return libsP;
  libsP = Promise.all(LIBS.map(([g,src]) => window[g] ? 1 : new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('lib')); document.head.append(s); })));
  libsP.catch(() => libsP = null);
  return libsP;
}
async function save(filename, blob){
  const d = await dlReady;
  if (!d){
    // fora do Claude (site próprio): download comum do navegador
    try {
      const url = URL.createObjectURL(blob); const a = document.createElement('a');
      a.href = url; a.download = filename; document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000); toast('Pronto: ' + filename); return true;
    } catch(_) { toast('Não foi possível baixar este arquivo neste navegador.'); return false; }
  }
  try { await d.save({filename, data: blob}); toast('Pronto: ' + filename); return true; }
  catch(e){
    const c = e && e.code;
    if (c === 'declined') toast('Download cancelado.');
    else if (c === 'rate_limited') toast('Já existe um download aguardando confirmação. Confirme ou cancele e tente de novo.');
    else toast('Não foi possível baixar este arquivo agora. Tente novamente em instantes.');
    return false;
  }
}
async function exportar(id, kind){
  const meta = META[id], lesson = lessonOf(id); if (!lesson) return;
  const base = SP.baseName(meta);
  try {
    toast('Preparando o arquivo...', .05);
    await loadLibs();
    let blob, name;
    if (kind === 'pptx'){ toast('Gerando o PowerPoint editável...', .4); blob = await SP.buildPPTX(meta, lesson); name = base + '.pptx'; }
    if (kind === 'pdf'){ toast('Gerando o PDF dos slides...', .4); blob = await SP.buildPDF(meta, lesson); name = base + '-slides.pdf'; }
    if (kind === 'folha'){ toast('Gerando a folha de atividades...', .4); blob = await SP.buildFolha(meta, lesson); name = base + '-atividades.pdf'; }
    if (kind === 'zip'){ blob = await SP.buildZip([{meta, lesson}], (d,t) => toast(`Montando o pacote... ${d} de ${t}`, d/t)); name = base + '.zip'; }
    toast('Arquivo pronto. Confirme o download.', 1);
    await save(name, blob);
  } catch(e){ console.error(e); toast('Não foi possível gerar o arquivo. Verifique a conexão e tente de novo.'); }
}
let zipBusy = false;
async function exportarAno(ano){
  if (zipBusy){ toast('Já existe um pacote sendo gerado. Aguarde terminar.'); return; }
  zipBusy = true;
  try {
    toast(`Preparando o pacote do ${SP.anoCurto(ano)}...`, .02);
    await loadLibs();
    const list = READY.filter(id => META[id].ano === ano).map(id => ({meta: META[id], lesson: lessonOf(id)}));
    const blob = await SP.buildZip(list, (d,t) => toast(`${SP.anoCurto(ano)}: gerando arquivos... ${d} de ${t}`, d/t));
    toast('Pacote pronto. Confirme o download.', 1);
    await save(`slides-prontos-portugues-${SP.slug(SP.anoCurto(ano).replace(/[ºª]/g,''))}.zip`, blob);
  } catch(e){ console.error(e); toast('Não foi possível gerar o pacote. Verifique a conexão e tente de novo.'); }
  finally { zipBusy = false; }
}
function anoMenu(){
  const wrap = h('div', {class:'menu'});
  const list = h('div', {class:'menu-list', hidden:true, role:'menu'},
    h('p', {style:'margin:6px 10px 8px;color:var(--muted);font-size:13px'}, 'Escolha o ano. O pacote traz PowerPoint, PDF e folha de atividades de todas as aulas.'),
    h('div', {class:'ano-grid'}, ANOS.all.map(a => h('button', {role:'menuitem', class:'chip', onclick:()=>{list.hidden = true; exportarAno(a);}}, SP.anoCurto(a)))));
  const btn = h('button', {class:'btn mark', 'aria-haspopup':'menu', title:'Baixar todas as aulas de um ano', onclick:(e)=>{e.stopPropagation(); list.hidden = !list.hidden;}}, icon('down'), h('span', {class:'lbl-long'}, 'Baixar por ano'));
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) list.hidden = true; });
  wrap.append(btn, list);
  return wrap;
}

// ---------- ícones ----------
const ico = {
  search:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  play:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>',
  down:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
  edit:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
  left:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  right:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  x:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  full:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'
};
const icon = (k) => { const s = h('span', {'aria-hidden':'true', style:'display:inline-flex'}); s.innerHTML = ico[k]; return s; };
const logoSVG = '<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect x="2" y="5" width="30" height="22" rx="5" fill="currentColor"/><rect x="7" y="15" width="14" height="5" rx="2" fill="#FFD25A"/><rect x="7" y="10" width="20" height="3" rx="1.5" fill="var(--bg)" opacity=".9"/><path d="M13 27l-3 5M21 27l3 5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';

// ---------- catálogo ----------
const F = {etapa:'all', ano:'', eixo:'', prontas:false, q:''};
try { const sv = JSON.parse(localStorage.getItem('sp:filtros')||'null'); if (sv) Object.assign(F, sv, {q:''}); } catch(_) {}
const norm = (t) => String(t).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const ANOS = {all:['1','2','3','4','5','6','7','8','9','EM1','EM2','EM3'], ini:['1','2','3','4','5'], fin:['6','7','8','9'], med:['EM1','EM2','EM3']};

function renderShell(){
  const app = $('#app'); app.innerHTML = '';
  const top = h('header', {class:'top'}, h('div', {class:'wrap'},
    h('a', {class:'logo', href:'#', onclick:(e)=>{e.preventDefault(); closeView(); window.scrollTo({top:0});}, html: logoSVG + '<span>Slides Prontos</span>'}),
    h('label', {class:'search'}, h('span', {html:ico.search}), h('input', {id:'q', type:'search', placeholder:'Buscar por tema, ano ou código BNCC (ex.: EF06LP06)', 'aria-label':'Buscar conteúdos', oninput:(e)=>{F.q = e.target.value; renderGrid();}})),
    anoMenu()
  ));
  const totalSlides = READY.reduce((a,id)=>a+AULAS[id].slides.length,0);
  const hero = h('section', {class:'wrap hero'},
    h('div', {},
      h('h1', {}, 'Aulas de Língua Portuguesa ', h('span', {class:'mk'}, 'prontas para projetar'), ', editar e baixar.'),
      h('p', {class:'lead'}, 'Do 1º ano do Fundamental à 3ª série do Ensino Médio, com habilidades da BNCC, mapas mentais, atividades, quiz e gabarito em cada aula. Apresente direto daqui ou leve para o PowerPoint e edite o que quiser.'),
      h('ul', {class:'facts'},
        h('li', {}, h('b', {}, '200'), 'conteúdos da BNCC'),
        h('li', {}, h('b', {}, String(READY.length)), 'aulas completas'),
        h('li', {}, h('b', {}, String(totalSlides)), 'slides prontos')
      ),
      h('div', {class:'hero-actions'},
        h('button', {class:'btn primary', onclick:()=>openView(READY[0])}, icon('play'), 'Ver uma aula de exemplo'),
        h('button', {class:'btn', onclick:()=>{$('#catalogo').scrollIntoView({behavior:'smooth'});}}, 'Explorar o catálogo')
      )
    ),
    h('div', {class:'stack', 'aria-hidden':'true'}, [19,109,163].filter(id=>AULAS[id]).map(id => frame(META[id], lessonOf(id), 0)))
  );
  const filters = h('div', {class:'filters', id:'catalogo'}, h('div', {class:'wrap row'},
    h('div', {class:'seg', role:'group', 'aria-label':'Etapa'}, [['all','Todas'],['ini','Anos iniciais'],['fin','Anos finais'],['med','Ensino Médio']].map(([k,l]) => h('button', {'data-etapa':k, onclick:()=>{F.etapa=k; F.ano=''; syncFilters(); renderGrid();}}, l))),
    h('div', {class:'chips', id:'anos', role:'group', 'aria-label':'Ano ou série'}),
    h('select', {class:'sel', id:'eixo', 'aria-label':'Eixo', onchange:(e)=>{F.eixo=e.target.value; renderGrid();}}, h('option', {value:''}, 'Todos os eixos'), Object.entries(SP.EIXOS).map(([k,v]) => h('option', {value:k}, v))),
    h('span', {class:'count', id:'count'})
  ));
  app.append(top, hero, filters, h('main', {class:'wrap', id:'grid-wrap'}));
  syncFilters(); renderGrid();
}
function syncFilters(){
  document.querySelectorAll('[data-etapa]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.etapa === F.etapa)));
  const an = $('#anos'); an.innerHTML = '';
  ANOS[F.etapa].forEach(a => an.append(h('button', {class:'chip', 'aria-pressed':String(F.ano===a), onclick:()=>{F.ano = F.ano===a?'':a; syncFilters(); renderGrid();}}, SP.anoCurto(a))));
  $('#eixo').value = F.eixo; F.prontas = false;
}
function renderGrid(){
  try { localStorage.setItem('sp:filtros', JSON.stringify({etapa:F.etapa, ano:F.ano, eixo:F.eixo, prontas:F.prontas})); } catch(_) {}
  const q = norm(F.q.trim());
  const list = CAT.filter(c => {
    const m = META[c[0]];
    if (F.etapa !== 'all' && m.etapa !== F.etapa) return false;
    if (F.ano && m.ano !== F.ano) return false;
    if (F.eixo && m.eixo !== F.eixo) return false;
    if (F.prontas && !AULAS[m.id]) return false;
    if (q && !norm(`${m.titulo} ${m.anoCurto} ${m.anoLabel} ${m.eixoNome} ${m.codes.join(' ')}`).includes(q)) return false;
    return true;
  });
  $('#count').textContent = `${list.length} de ${CAT.length} conteúdos`;
  const wrap = $('#grid-wrap'); wrap.innerHTML = '';
  if (!list.length){ wrap.append(h('p', {class:'empty'}, 'Nenhum conteúdo encontrado. Tente outro termo ou limpe os filtros.')); return; }
  const groups = {};
  list.forEach(c => (groups[c[1]] = groups[c[1]] || []).push(c));
  Object.entries(groups).sort((a,b) => ANOS.all.indexOf(a[0]) - ANOS.all.indexOf(b[0])).forEach(([ano, items]) => {
    const prontas = items.filter(c => AULAS[c[0]]).length;
    wrap.append(h('div', {class:'section-h'}, h('h2', {}, SP.anoLabel(ano)), h('span', {class:'codes'}, `${items.length} conteúdos`), h('button', {class:'btn sm', style:'margin-left:auto', onclick:()=>exportarAno(ano)}, icon('down'), 'Baixar o ano (.zip)')));
    wrap.append(h('div', {class:'grid'}, items.map(c => card(c[0]))));
  });
}
function card(id){
  const m = META[id], ready = !!AULAS[id];
  const l = ready ? lessonOf(id) : placeholder(id);
  return h('button', {class:'card' + (ready ? '' : ' wait'), onclick:()=>openView(id), 'aria-label':`${m.titulo}, ${m.anoLabel}`},
    frame(m, l, 0, {lazy:true}),
    h('div', {class:'meta'},
      ready ? h('span', {class:'pill ok'}, h('i', {class:'dot', style:'background:currentColor'}), `Pronta · ${l.slides.length} slides`) : h('span', {class:'pill wait'}, `Lote ${LOTE[id]} · em produção`),
      ready && isEdited(id) ? h('span', {class:'pill ed'}, 'Editada por você') : null
    ),
    h('h3', {}, m.titulo),
    h('div', {class:'meta'}, h('i', {class:'dot', style:`background:${m.accent}`}), `${m.anoCurto} · ${m.eixoNome}`),
    h('div', {class:'codes'}, m.codes.join('  ·  '))
  );
}

// ---------- visualizador ----------
let V = null; // {id, idx, editing}
function closeView(){ if ($('#view')) $('#view').remove(); V = null; document.body.style.overflow = ''; if (location.hash) history.replaceState(null, '', location.pathname + location.search); renderGrid(); }
function openView(id, idx=0, editing=false){
  V = {id, idx, editing};
  document.body.style.overflow = 'hidden';
  try { if (location.hash !== '#aula-' + id) history.replaceState(null, '', '#aula-' + id); } catch(_) {}
  renderView();
}
function downloadMenu(id){
  const wrap = h('div', {class:'menu'});
  const list = h('div', {class:'menu-list', hidden:true, role:'menu'});
  const items = [
    ['pptx','PPTX','#C4511F','PowerPoint editável (.pptx)','Abre no PowerPoint, Google Slides e Keynote. Tudo editável.'],
    ['pdf','PDF','#B02E55','PDF dos slides','Para projetar, imprimir ou enviar aos alunos.'],
    ['folha','A4','#0B7C7A','Folha de atividades (PDF)','Atividades, quiz, mapa para completar e gabarito.'],
    ['zip','ZIP','#17233B','Pacote completo (.zip)','Os três arquivos acima juntos.']
  ];
  items.forEach(([k,ext,c,t,d]) => list.append(h('button', {role:'menuitem', onclick:()=>{list.hidden = true; exportar(id, k);}}, h('span', {class:'ext', style:`background:${c}`}, ext), h('span', {}, h('b', {}, t), h('small', {}, d)))));
  const btn = h('button', {class:'btn mark', 'aria-haspopup':'menu', onclick:(e)=>{e.stopPropagation(); list.hidden = !list.hidden;}}, icon('down'), 'Baixar');
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) list.hidden = true; });
  wrap.append(btn, list);
  return wrap;
}
function renderView(){
  const {id} = V; const m = META[id]; const ready = !!AULAS[id];
  let view = $('#view');
  if (!view){ view = h('div', {class:'view', id:'view', role:'dialog', 'aria-label':m.titulo}); document.body.append(view); }
  view.innerHTML = '';
  const l = ready ? lessonOf(id) : placeholder(id);
  V.idx = Math.min(V.idx, l.slides.length - 1);
  const bar = h('div', {class:'vbar'}, h('div', {class:'wrap'},
    h('button', {class:'btn icon', onclick:closeView, 'aria-label':'Voltar ao catálogo', title:'Voltar ao catálogo'}, icon('left')),
    h('div', {class:'t'}, h('h2', {}, m.titulo), h('div', {class:'sub'}, `${m.anoLabel} · ${m.eixoNome} · ${m.codes.join(', ')}`)),
    ready ? h('div', {class:'acts'},
      h('button', {class:'btn primary', onclick:()=>present(id, V.idx)}, icon('play'), 'Apresentar'),
      h('button', {class:'btn', 'aria-pressed':String(V.editing), onclick:()=>{V.editing = !V.editing; renderView();}}, icon('edit'), V.editing ? 'Concluir edição' : 'Editar'),
      downloadMenu(id)
    ) : h('span', {class:'pill wait'}, `Em produção · lote ${LOTE[id]}`)
  ));
  view.append(bar);

  const main = h('div', {class:'wrap vmain'});
  const stage = h('div', {class:'stage' + (V.editing ? ' editing' : '')});
  if (V.editing && ready) stage.append(editBar(id, l));
  const big = frame(m, l, V.idx, {editable: V.editing && ready});
  stage.append(big);
  if (V.editing && ready) wireEditing(big, id);
  const s = l.slides[V.idx];
  stage.append(h('div', {class:'stage-nav'},
    h('button', {class:'btn icon', 'aria-label':'Slide anterior', disabled: V.idx === 0, onclick:()=>{V.idx--; renderView();}}, icon('left')),
    h('span', {class:'n'}, `${V.idx+1} / ${l.slides.length}`),
    h('button', {class:'btn icon', 'aria-label':'Próximo slide', disabled: V.idx >= l.slides.length-1, onclick:()=>{V.idx++; renderView();}}, icon('right')),
    h('span', {class:'ty'}, SP.TYPE_NAMES[s.type] || '')
  ));
  if (V.editing && ready){
    stage.append(h('div', {class:'panel', style:'margin-top:14px'}, h('h4', {}, 'Notas do professor deste slide'),
      h('textarea', {class:'notes', id:'nota-' + V.idx, placeholder:'Escreva orientações para você ver durante a apresentação. Elas também vão para as anotações do PowerPoint.', oninput:(e)=>{ const L2 = editable(id); L2.slides[V.idx].nota = e.target.value; persist(id, L2); }}, s.nota || '')));
  }
  main.append(stage);

  const side = h('aside', {class:'side'});
  if (!ready){
    side.append(h('div', {class:'panel'}, h('h4', {}, 'Esta aula está em produção'), h('p', {}, `Ela chega no lote ${LOTE[id]}, com o mesmo padrão das aulas prontas: 19 a 20 slides, PowerPoint editável, PDF e folha de atividades.`)));
  } else {
    side.append(h('div', {class:'panel'}, h('h4', {}, 'Como usar'), h('p', {}, `${l.slides.length} slides para cerca de 2 aulas de 50 minutos. Em "Apresentar", clique nas alternativas do quiz para revelar a resposta e use o botão "Respostas" nas atividades.`)));
  }
  side.append(h('div', {class:'panel'}, h('h4', {}, 'Habilidades da BNCC'), m.codes.map(c => h('div', {class:'bncc-item'}, h('b', {}, c), h('p', {}, (window.BNCC||{})[c] || '')))));
  main.append(side);
  view.append(main);

  const below = h('div', {class:'wrap'});
  if (ready){
    below.append(h('div', {class:'section-h', style:'margin-bottom:12px'}, h('h2', {}, 'Todos os slides'), h('span', {class:'codes'}, isEdited(id) ? 'Versão editada por você' : 'Versão original')));
    below.append(h('div', {class:'thumbs'}, l.slides.map((sl, k) => h('button', {class:'thumb', 'aria-current':String(k===V.idx), onclick:()=>{V.idx = k; renderView(); view.scrollTo({top:0, behavior:'smooth'});}}, frame(m, l, k, {lazy:true}), h('span', {}, `${String(k+1).padStart(2,'0')} · ${SP.TYPE_NAMES[sl.type]||''}`)))));
  } else {
    below.append(h('div', {class:'panel', style:'margin-bottom:48px'}, h('h4', {}, 'Estrutura planejada da aula'), h('ol', {class:'plan'}, PLANO.map(p => h('li', {}, p)))));
  }
  view.append(below);
}

// ---------- edição ----------
function editable(id){ return store.get(id) || clone(AULAS[id]); }
function persist(id, data){ if (!store.set(id, data)) toast('Não há espaço neste navegador para salvar a edição. Tente uma foto menor.'); }
function wireEditing(fr, id){
  fr.addEventListener('focusout', (e) => {
    const el = e.target.closest('[data-edit]'); if (!el || el.tagName === 'IMG') return;
    const L2 = editable(id); const s = L2.slides[V.idx];
    const val = SP.fromHTML(el);
    if (SP.getPath(s, el.dataset.edit) === val) return;
    SP.setPath(s, el.dataset.edit, val); persist(id, L2);
    SP.shrink(fr.querySelector('.sl'));
    refreshThumbs(id);
  });
  fr.addEventListener('keydown', (e) => { if (e.key === 'Escape') e.target.blur(); e.stopPropagation(); });
  fr.addEventListener('click', (e) => { if (e.target.tagName === 'IMG' && e.target.dataset.edit) pickImage(id); });
}
function refreshThumbs(id){
  const m = META[id], l = lessonOf(id);
  document.querySelectorAll('.thumbs .thumb').forEach((t,k) => { const old = t.querySelector('.frame'); if (old && l.slides[k]) old.replaceWith(frame(m, l, k)); });
  const sub = document.querySelector('.view .section-h .codes'); if (sub) sub.textContent = 'Versão editada por você';
}
let confirmDel = false, confirmReset = false;
function editBar(id, l){
  const s = l.slides[V.idx]; const hasImg = SP.layout(META[id], l, V.idx).some(e => e.k === 'img');
  const act = (fn) => () => { const L2 = editable(id); fn(L2); persist(id, L2); renderView(); };
  return h('div', {class:'editbar'},
    h('span', {class:'lbl'}, 'Modo edição:'), h('span', {}, 'clique em qualquer texto para alterar.'),
    hasImg ? h('button', {class:'btn sm', onclick:()=>pickImage(id)}, 'Trocar imagem') : null,
    h('button', {class:'btn sm', onclick:act(L2 => { L2.slides.splice(V.idx+1, 0, clone(L2.slides[V.idx])); V.idx++; })}, 'Duplicar slide'),
    h('button', {class:'btn sm', disabled: V.idx === 0, onclick:act(L2 => { const [x] = L2.slides.splice(V.idx,1); L2.slides.splice(V.idx-1,0,x); V.idx--; })}, 'Mover para trás'),
    h('button', {class:'btn sm', disabled: V.idx >= l.slides.length-1, onclick:act(L2 => { const [x] = L2.slides.splice(V.idx,1); L2.slides.splice(V.idx+1,0,x); V.idx++; })}, 'Mover para frente'),
    h('button', {class:'btn sm', disabled: l.slides.length <= 1, onclick:(e)=>{ if (!confirmDel){ confirmDel = true; e.target.textContent = 'Confirmar exclusão'; setTimeout(()=>{confirmDel=false; if (e.target.isConnected) e.target.textContent='Excluir slide';}, 3500); return; } confirmDel = false; act(L2 => { L2.slides.splice(V.idx,1); V.idx = Math.max(0, V.idx-1); })(); }}, 'Excluir slide'),
    isEdited(id) ? h('button', {class:'btn sm', onclick:(e)=>{ if (!confirmReset){ confirmReset = true; e.target.textContent = 'Confirmar: voltar ao original'; setTimeout(()=>{confirmReset=false; if (e.target.isConnected) e.target.textContent='Restaurar original';}, 3500); return; } confirmReset = false; store.del(id); toast('Aula restaurada para a versão original.'); renderView(); }}, 'Restaurar original') : null
  );
}
function pickImage(id){
  const close = () => modal.remove();
  const setImg = (fn) => { const L2 = editable(id); fn(L2.slides[V.idx]); persist(id, L2); close(); renderView(); };
  const file = h('input', {type:'file', accept:'image/*', hidden:true, onchange: async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const url = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(f); });
      const im = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
      const max = 900, sc = Math.min(1, max/Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = Math.round(im.width*sc); c.height = Math.round(im.height*sc);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      setImg(s => { s.photo = c.toDataURL('image/jpeg', 0.82); });
    } catch(_) { toast('Não foi possível abrir essa imagem. Use um arquivo JPG ou PNG.'); }
  }});
  const s = lessonOf(id).slides[V.idx];
  const modal = h('div', {class:'modal', onclick:(e)=>{ if (e.target === modal) close(); }},
    h('div', {class:'box', role:'dialog', 'aria-label':'Trocar imagem'},
      h('h3', {}, 'Trocar imagem do slide'),
      h('p', {style:'color:var(--muted);margin:0'}, 'Envie uma foto do seu computador ou celular, ou escolha uma das ilustrações da plataforma.'),
      h('div', {style:'display:flex;gap:8px;flex-wrap:wrap;margin-top:12px'},
        h('button', {class:'btn mark', onclick:()=>file.click()}, 'Enviar foto'), file,
        s.photo ? h('button', {class:'btn', onclick:()=>setImg(x => { delete x.photo; })}, 'Remover foto') : null,
        h('button', {class:'btn', onclick:close}, 'Cancelar')),
      h('div', {class:'ill-grid'}, Object.entries(window.ILUSTRACAO_NOMES).map(([k,n]) => h('button', {onclick:()=>setImg(x => { delete x.photo; x.ill = k; })}, h('img', {src:SP.illURL(k), alt:''}), n)))
    ));
  document.body.append(modal);
}

// ---------- apresentação ----------
let P = null;
function present(id, idx=0){
  const m = META[id], l = lessonOf(id);
  P = {id, idx, answers:false, notes:false};
  const el = h('div', {class:'present', id:'present', role:'dialog', 'aria-label':'Apresentação'});
  document.body.append(el);
  const draw = () => {
    el.innerHTML = '';
    const s = l.slides[P.idx];
    const fr = frame(m, l, P.idx, {answers:P.answers});
    const st = h('div', {class:'pstage'}, fr);
    fr.addEventListener('click', (e) => {
      const opt = e.target.closest('.sl-opt') || [...fr.querySelectorAll('.sl-opt')].find(o => { const r = o.getBoundingClientRect(); return e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom; });
      if (!opt || s.type !== 'quiz' || fr.dataset.done) return;
      const k = +opt.dataset.opt; fr.dataset.done = '1';
      fr.querySelectorAll('.sl-opt').forEach(o => { if (+o.dataset.opt === s.c) o.classList.add('right'); else if (o === opt) o.classList.add('wrong'); });
      const sl = fr.querySelector('.sl'); sl.append(h('div', {class:'why'}, (k === s.c ? 'Correto! ' : `Resposta: ${'ABCD'[s.c]}. `) + SP.plain(s.why || '')));
    });
    const prog = h('div', {class:'prog'}, h('i')); prog.firstChild.style.width = ((P.idx+1)/l.slides.length*100) + '%';
    const bar = h('div', {class:'pbar'},
      h('button', {class:'btn icon', 'aria-label':'Sair da apresentação', title:'Sair (Esc)', onclick:exit}, icon('x')),
      h('button', {class:'btn icon', 'aria-label':'Slide anterior', onclick:()=>go(-1)}, icon('left')),
      h('span', {class:'n'}, `${P.idx+1} / ${l.slides.length}`),
      h('button', {class:'btn icon', 'aria-label':'Próximo slide', onclick:()=>go(1)}, icon('right')),
      prog,
      h('button', {class:'btn sm', 'aria-pressed':String(P.answers), onclick:()=>{P.answers=!P.answers; draw();}}, 'Respostas'),
      h('button', {class:'btn sm', 'aria-pressed':String(P.notes), onclick:()=>{P.notes=!P.notes; draw();}}, 'Notas'),
      h('button', {class:'btn icon', 'aria-label':'Tela cheia', title:'Tela cheia', onclick:()=>{ try { document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen().catch(()=>{}); } catch(_) {} }}, icon('full'))
    );
    el.append(st);
    if (P.notes){
      const n = [s.nota && SP.plain(s.nota), s.type === 'quiz' && `Resposta: ${'ABCD'[s.c]}) ${SP.plain(s.opts[s.c])}. ${SP.plain(s.why||'')}`, s.type === 'atividade' && 'Respostas: ' + s.items.map((it,k)=>`${k+1}) ${SP.plain(it.r)}`).join('   ')].filter(Boolean);
      el.append(h('div', {class:'pnotes'}, n.length ? n.join('\n') : 'Sem notas para este slide.'));
    }
    el.append(bar);
  };
  const go = (d) => { const n = P.idx + d; if (n < 0 || n >= l.slides.length) return; P.idx = n; draw(); };
  const key = (e) => { if (['ArrowRight','PageDown',' '].includes(e.key)){ e.preventDefault(); go(1); } else if (['ArrowLeft','PageUp'].includes(e.key)){ e.preventDefault(); go(-1); } else if (e.key === 'Escape' && !document.fullscreenElement){ e.stopPropagation(); exit(); } e.stopPropagation(); };
  function exit(){ document.removeEventListener('keydown', key); try { if (document.fullscreenElement) document.exitFullscreen(); } catch(_) {} el.remove(); if (V){ V.idx = P.idx; renderView(); } P = null; }
  document.addEventListener('keydown', key);
  draw();
}

// ---------- início ----------
renderShell();
const fromHash = () => { const mh = /^#aula-(\d+)$/.exec(location.hash||''); if (mh && META[+mh[1]]){ if (!V || V.id !== +mh[1]) openView(+mh[1]); } else if (V && !location.hash) closeView(); };
fromHash(); window.addEventListener('hashchange', fromHash);
window.addEventListener('keydown', (e) => { if (!P && V && !V.editing && !e.target.closest('input,textarea,[contenteditable="true"]')){ const l = lessonOf(V.id) || placeholder(V.id); if (e.key === 'ArrowRight' && V.idx < l.slides.length-1){ V.idx++; renderView(); } if (e.key === 'ArrowLeft' && V.idx > 0){ V.idx--; renderView(); } if (e.key === 'Escape') closeView(); } });
})();
