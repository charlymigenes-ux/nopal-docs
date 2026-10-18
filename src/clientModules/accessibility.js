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

// Buscador local (WCAG 4.1.2): el cuadro de búsqueda es un «combobox» que apunta a su lista con
// `aria-owns`, pero axe exige `aria-controls`; y la lista (`role="listbox"`) contiene enlaces
// y las opciones están envueltas en enlaces y contenedores, que se marcan como presentacionales.
function fixSearchAria() {
  document.querySelectorAll('input[role="combobox"][aria-owns]:not([aria-controls])').forEach((input) => {
    input.setAttribute('aria-controls', input.getAttribute('aria-owns'));
  });
  // El enlace «Ver todos los resultados» está dentro de la lista: se declara como opción.
  document.querySelectorAll('[role="listbox"] a:not([role])').forEach((link) => link.setAttribute('role', 'option'));
  document.querySelectorAll('[role="listbox"] [role="option"]').forEach((option) => {
    for (let node = option.parentElement; node && node.getAttribute('role') !== 'listbox'; node = node.parentElement) {
      if (!node.hasAttribute('role')) node.setAttribute('role', 'presentation');
    }
  });
}

if (typeof window !== 'undefined') {
  const observer = new MutationObserver(fixSearchAria);
  const start = () => observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-owns'] });
  if (document.body) start();
  else window.addEventListener('DOMContentLoaded', start);
}
