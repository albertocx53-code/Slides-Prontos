import pathlib
root = pathlib.Path(__file__).parent
src = root / 'src'
lessons = ['lessons/lote1a.js', 'lessons/lote1b.js'] + ['lessons/' + f for f in ['ano1.js','ano2.js','ano3.js','ano4.js','ano5.js','ano6.js','ano7.js','ano8.js','ano9.js','em1.js','em2.js','em3.js']]
order = ['catalog.js', 'bncc.js', 'illustrations.js'] + lessons + ['engine.js', 'exports.js', 'app.js']
js = '\n'.join((src / f).read_text() for f in order)
css = (src / 'style.css').read_text()
html = f'''<title>Slides Prontos</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Aulas de Língua Portuguesa alinhadas à BNCC, prontas para apresentar, editar e baixar.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap">
<style>
{css}
</style>
<div id="app"></div>
<script>
{js}
</script>
'''
out = root / 'dist'
out.mkdir(exist_ok=True)
(out / 'slides-prontos.html').write_text(html)
head = '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'
(out / 'index.html').write_text(head + html + '\n</body>\n</html>\n')
print(len(html))
