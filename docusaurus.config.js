// @ts-check
import { prismLight, prismDark } from './src/theme/prismThemes.js';

// Hosting provisional: GitHub Pages (Architecture §12.1). Cambiar `url` y `baseUrl`
// cuando se defina el dominio definitivo.
const GH_USER = 'charlymigenes-ux';
const GH_REPO = 'nopal-docs';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NOPAL Docs',
  tagline: 'Documentación oficial de NOPAL y sus extensiones',
  favicon: 'img/favicon.png',

  url: `https://${GH_USER}.github.io`,
  baseUrl: `/${GH_REPO}/`,
  organizationName: GH_USER,
  projectName: GH_REPO,
  trailingSlash: false,

  // Standard §18: sin enlaces rotos.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  markdown: {
    format: 'detect',
    hooks: { onBrokenMarkdownLinks: 'throw' },
  },

  // Español es la fuente; inglés es traducción oficial (Standard §9).
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeConfigs: {
      es: { label: 'Español', htmlLang: 'es' },
      en: { label: 'English', htmlLang: 'en' },
    },
  },

  clientModules: ['./src/clientModules/accessibility.js', './src/clientModules/searchPreload.js'],

  // Búsqueda local con resultados mientras se escribe (sin servicio externo). El índice se
  // genera al compilar, uno por idioma.
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['es', 'en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
        searchResultContextMaxLength: 70,
        searchBarShortcutHint: true,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          // Conserva los prefijos 00-…08- en las URLs (coinciden con la arquitectura documental).
          numberPrefixParser: false,
          // Sin etiqueta de NOPAL no se congela ninguna versión (Standard §8): solo existe «Próxima».
          versions: { current: { label: 'Próxima (main)' } },
          sidebarPath: './sidebars.js',
          editUrl: `https://github.com/${GH_USER}/${GH_REPO}/edit/main/`,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'NOPAL',
        logo: { alt: '', src: 'img/logo.png' } /* decorativo: el título «NOPAL» ya está al lado */,
        items: [
          { to: '/01-usuario', label: 'Usuario', position: 'left' },
          { to: '/02-administracion', label: 'Administración', position: 'left' },
          { to: '/03-plugins', label: 'Plugins', position: 'left' },
          { to: '/04-hardware', label: 'Hardware', position: 'left' },
          { to: '/05-desarrolladores', label: 'Desarrolladores', position: 'left' },
          { to: '/06-referencia', label: 'Referencia', position: 'left' },
          { type: 'localeDropdown', position: 'right' },
          {
            href: `https://github.com/${GH_USER}/nopal`,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentación',
            items: [
              { label: 'Inicio', to: '/' },
              { label: 'Referencia', to: '/06-referencia' },
              { label: 'RFC', to: '/07-rfc' },
            ],
          },
          {
            title: 'Proyecto',
            items: [
              { label: 'NOPAL', href: `https://github.com/${GH_USER}/nopal` },
              { label: 'Demo en vivo', href: `https://${GH_USER}.github.io/nopal-demo/` },
            ],
          },
        ],
        copyright: 'NOPAL se distribuye bajo GPL-3.0. Esta documentación forma parte del proyecto.',
      },
      prism: {
        theme: prismLight,
        darkTheme: prismDark,
        additionalLanguages: ['bash', 'json', 'python', 'yaml', 'ini'],
      },
    }),
};

export default config;
