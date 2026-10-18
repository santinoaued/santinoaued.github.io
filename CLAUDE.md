Contexto de alto nivel y estado: ver nota en C:\Cerebro\Cerebro\Wiki\Trabajo y carrera\Portfolio personal.md

# Portfolio de Santino Aued - Reglas del proyecto

Este archivo lo lee Claude Code en cada sesión. Contiene las reglas fijas del proyecto. El contenido y las especificaciones originales del sitio están en BRIEF.md.

## Stack
- HTML, CSS y JavaScript puros. Sin frameworks, sin build step, sin dependencias de npm.
- Sitio estático publicado con GitHub Pages desde la rama main del repo santinoaued/santinoaued.github.io (https://santinoaued.github.io/). Cada push a main se publica en 1 o 2 minutos.
- Fuentes desde Google Fonts (Fraunces, Source Sans 3, JetBrains Mono). Nada más externo.

## Estructura de archivos
- index.html (incluye SEO: canonical, Open Graph, datos estructurados WebSite y ProfilePage)
- css/styles.css
- js/content.js (todos los textos en ES y EN, links, logos y proyectos destacados; separados de la lógica)
- js/main.js (switches, URL/localStorage, render, slider de proyectos, header, tipeo del hero, reveal al hacer scroll)
- js/scene.js (escena del hero en canvas: bosque con niebla, lluvia, parallax con el mouse)
- assets/img/ (foto, logos, íconos, favicons, og-image)
- favicon.ico, robots.txt, sitemap.xml y google299cdf76353a0734.html (verificación de Search Console, no borrar) en la raíz

## Reglas de código
- Nombres de variables, funciones, clases y comentarios en inglés.
- Código simple y legible antes que ingenioso. Nada de abstracciones innecesarias.
- Todos los textos visibles salen de js/content.js. Nunca texto hardcodeado en el HTML que dependa de idioma o modo.
- Colores, tipografías y espaciados definidos como variables CSS en :root. Nunca valores sueltos repetidos.
- Mobile first. Tiene que verse bien desde 360px de ancho, sin scroll horizontal.
- HTML semántico (header, main, section, footer) y accesible: contraste suficiente, alt en imágenes, switches operables con teclado y con aria-pressed o aria-checked.
- Commits con conventional commits (feat:, fix:, style:, docs:, refactor:, perf:).
- Al cambiar CSS o JS, subir el ?v= de los links en index.html para que los navegadores no mezclen archivos viejos de caché con HTML nuevo.

## Reglas de diseño
- Estética outdoor: verde bosque, marrones, tonos tierra. Debe sentirse natural y cálido, no corporativo ni "plantilla de IA".
- Sin emojis. Sin íconos decorativos de relleno. Íconos solo donde aportan (links a plataformas).
- Pocas negritas. Jerarquía con tamaño y tipografía, no con negrita en todos lados.
- Respetar prefers-reduced-motion en todas las animaciones (intro, tipeo, escena, reveal).

## Aprendizajes técnicos
- Firefox: la unidad ch no coincide con el ancho real de JetBrains Mono y no recalcula anchos medidos cuando carga la webfont. Por eso el tipeo del hero agrega letras con JS en vez de animar un ancho.
- Canvas del hero: dibujar a 1x, estampar un sprite de niebla prerenderizado con globalAlpha y hornear el cielo en la capa lejana. Rellenar degradados de pantalla completa en cada frame lo hacía ir lento, sobre todo en Firefox.
- Google Search toma el favicon de un raster cuadrado múltiplo de 48px (favicon.ico de 48 y PNG de 192); el SVG es solo para la pestaña.
- No hay Node ni Python instalados. Para previsualizar se usó un servidor HttpListener en PowerShell, o abrir index.html directo.
- Capturas de prueba en Firefox: firefox.exe -headless -no-remote -profile <perfil temporal> --screenshot. Con ui.prefersReducedMotion=1 en el user.js del perfil se evita que la intro tape la captura.

## Forma de trabajar
- Antes de cambios grandes, explicar el plan en pocas líneas y esperar confirmación.
- Después de cada cambio, decir qué archivos se tocaron.
- No inventar datos personales. Si falta algo, dejar un placeholder claro tipo [COMPLETAR: email].
