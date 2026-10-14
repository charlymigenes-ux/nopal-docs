// Temas de resaltado de código con contraste >= 4.5:1 (WCAG AA).
// Modo claro: tema propio. Modo oscuro: «dracula» con los comentarios aclarados.
//
// Tema de resaltado de código para el modo claro, con contraste >= 4.5:1 sobre #f6f8fa (WCAG AA).
// Sustituye al tema «github» de prism-react-renderer, cuyos colores (#d73a49, #36acaa…) no llegan.
/** @type {import('prism-react-renderer').PrismTheme} */
export const prismLight = {
  plain: { color: '#1e293b', backgroundColor: '#f6f8fa' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#5a6573', fontStyle: 'italic' } },
    { types: ['punctuation'], style: { color: '#394150' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'], style: { color: '#0b5cad' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'], style: { color: '#0a6228' } },
    { types: ['operator', 'entity', 'url', 'variable'], style: { color: '#7a4a00' } },
    { types: ['atrule', 'attr-value', 'keyword'], style: { color: '#b31d28' } },
    { types: ['function', 'class-name'], style: { color: '#5a32a3' } },
    { types: ['regex', 'important'], style: { color: '#8a4b00' } },
  ],
};

import { themes } from 'prism-react-renderer';

/** @type {import('prism-react-renderer').PrismTheme} */
export const prismDark = {
  ...themes.dracula,
  styles: themes.dracula.styles.map((s) =>
    s.types.includes('comment') ? { ...s, style: { ...s.style, color: '#9aa8d6' } } : s,
  ),
};

