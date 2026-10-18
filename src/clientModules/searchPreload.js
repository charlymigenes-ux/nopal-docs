// Buscador local: el plugin descarga su índice (~1,5 MB) al enfocar el cuadro o pasar el ratón por
// encima. Si alguien empieza a escribir antes de que termine, esas letras se pierden y no salen
// resultados. Se adelanta la descarga cuando el navegador está ocioso, simulando el paso del ratón.
function preload() {
  const input = document.querySelector('.navbar__search-input');
  if (!input || input.dataset.nopalPreloaded) return;
  input.dataset.nopalPreloaded = '1';
  input.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
}

function schedule() {
  const run = () => setTimeout(preload, 0);
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 2000);
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule);
}
