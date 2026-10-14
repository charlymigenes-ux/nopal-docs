// Accesibilidad del contenido (WCAG 2.1.1, regla axe «scrollable-region-focusable»):
// una tabla más ancha que la pantalla se desplaza horizontalmente, y quien navega con teclado
// debe poder enfocarla para desplazarla. Se añade tabindex="0" solo a las tablas que desbordan.
const SELECTOR = '.theme-doc-markdown table';

function mark() {
  document.querySelectorAll(SELECTOR).forEach((table) => {
    const overflows = table.scrollWidth > table.clientWidth;
    if (overflows) {
      table.setAttribute('tabindex', '0');
    } else {
      table.removeAttribute('tabindex');
    }
  });
}

let timer;
function onResize() {
  clearTimeout(timer);
  timer = setTimeout(mark, 150);
}

export function onRouteDidUpdate() {
  // Tras pintar la página.
  setTimeout(mark, 0);
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', onResize);
}
