# Portfolio de Santino Aued - Reglas del proyecto

Este archivo lo lee Claude Code en cada sesión. Contiene las reglas fijas del proyecto. El contenido y las especificaciones del sitio están en BRIEF.md.

## Stack
- HTML, CSS y JavaScript puros. Sin frameworks, sin build step, sin dependencias de npm.
- Sitio estático, se publica en Vercel desde GitHub tal cual está.
- Fuentes desde Google Fonts. Nada más externo.

## Estructura de archivos
- index.html
- css/styles.css
- js/main.js (lógica de switches)
- js/content.js (todos los textos en ES y EN, separados de la lógica)
- assets/img/ (imágenes; usar placeholders hasta que haya material real)

## Reglas de código
- Nombres de variables, funciones, clases y comentarios en inglés.
- Código simple y legible antes que ingenioso. Nada de abstracciones innecesarias.
- Todos los textos visibles salen de js/content.js. Nunca texto hardcodeado en el HTML que dependa de idioma o modo.
- Colores, tipografías y espaciados definidos como variables CSS en :root. Nunca valores sueltos repetidos.
- Mobile first. Tiene que verse bien desde 360px de ancho, sin scroll horizontal.
- HTML semántico (header, main, section, footer) y accesible: contraste suficiente, alt en imágenes, switches operables con teclado y con aria-pressed o aria-checked.
- Commits con conventional commits (feat:, fix:, style:, docs:, refactor:).

## Reglas de diseño
- Estética outdoor: verde bosque, marrones, tonos tierra. Debe sentirse natural y cálido, no corporativo ni "plantilla de IA".
- Sin emojis. Sin íconos decorativos de relleno. Íconos solo donde aportan (links a plataformas).
- Pocas negritas. Jerarquía con tamaño y tipografía, no con negrita en todos lados.
- Animaciones sutiles y cortas. Respetar prefers-reduced-motion.

## Forma de trabajar
- Antes de cambios grandes, explicar el plan en pocas líneas y esperar confirmación.
- Después de cada cambio, decir qué archivos se tocaron.
- No inventar datos personales. Si falta algo, dejar un placeholder claro tipo [COMPLETAR: email].
