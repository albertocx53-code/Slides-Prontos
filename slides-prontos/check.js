// Validação das aulas: node check.js
global.window = global;
const fs = require('fs'), path = require('path');
require('./src/catalog.js'); require('./src/bncc.js');
global.document = undefined;
const illSrc = fs.readFileSync('./src/illustrations.js', 'utf8');
const ILLS = new Set([...illSrc.matchAll(/^I\.(\w+) = svg/gm)].map(m => m[1]));
for (const f of fs.readdirSync('./src/lessons').sort()) require('./src/lessons/' + f);
const types = new Set(['capa','objetivos','pergunta','conceito','grade','exemplos','comparacao','texto','passos','mapa','atividade','quiz','gabarito','resumo','auto','desafio','encerramento']);
let errs = [], total = 0, done = 0;
for (const [id] of CATALOGO){
  const L = AULAS[id]; if (!L){ continue; } done++;
  const e = (m) => errs.push(`#${id}: ${m}`);
  if (!ILLS.has(L.ill)) e('ill inválida ' + L.ill);
  const n = L.slides.length; total += n;
  if (n < 15 || n > 20) e('slides ' + n);
  const t = L.slides.map(s => s.type);
  for (const need of ['capa','objetivos','mapa','atividade','quiz','gabarito','resumo','encerramento']) if (!t.includes(need)) e('falta ' + need);
  L.slides.forEach((s, k) => {
    const w = (m) => e(`slide ${k+1} (${s.type}): ${m}`);
    if (!types.has(s.type)) w('tipo desconhecido');
    if (s.ill && !ILLS.has(s.ill)) w('ill ' + s.ill);
    if (s.type === 'quiz'){ if (!Array.isArray(s.opts) || s.opts.length !== 4) w('opts'); if (!(s.c >= 0 && s.c < 4)) w('c'); if (!s.why) w('why'); if (new Set(s.opts).size !== s.opts.length) w('opts repetidas'); }
    if (s.type === 'atividade'){ if (!s.items || !s.items.length || s.items.some(i => !i.q || !i.r)) w('items'); if (s.items && s.items.length > 4) w('mais de 4 itens'); }
    if (s.type === 'exemplos' && (!s.cards || s.cards.length < 2 || s.cards.length > 4)) w('cards ' + (s.cards||[]).length);
    if (s.type === 'mapa' && (!s.nodes || s.nodes.length < 3 || s.nodes.length > 6)) w('nodes');
    if (s.type === 'passos' && (!s.steps || s.steps.length < 2 || s.steps.length > 5)) w('steps');
    if (s.type === 'comparacao' && (!s.left || !s.right)) w('lados');
    if (s.type === 'texto' && (!s.text || !s.side)) w('texto/side');
    if (['objetivos','resumo','auto','desafio'].includes(s.type) && (!s.items || s.items.length > 6)) w('items');
    if (s.type === 'grade' && (!s.cells || s.cells.length > 30)) w('cells');
    if (['conceito','exemplos','comparacao','texto','passos','grade','atividade','desafio'].includes(s.type) && !s.title) w('sem título');
  });
}
console.log(`${done} aulas, ${total} slides`);
const missing = CATALOGO.filter(c => !AULAS[c[0]]).map(c => c[0]);
console.log('faltam:', missing.length ? missing.join(',') : 'nenhuma');
console.log(errs.length ? errs.join('\n') : 'sem erros');
