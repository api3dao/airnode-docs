export default {
  title: 'Airnode Docs',
  description: 'API3 technical documentation',
  markdown: {
    lineNumbers: true,
    toc: ['h2', 'h3', 'h4', 'h5'],
  },
  appearance: true,
  ignoreDeadLinks: true,
  head: [
    [
      'script',
      {},
      "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-PKWG7ZFR');",
    ],
    ['link', { rel: 'stylesheet', href: '/styles/api3.css' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/android-chrome-192x192.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/android-chrome-192x192.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/android-chrome-192x192.png',
      },
    ],
  ],
  themeConfig: {
    externalLinkIcon: true,
    logo: {
      light: '/img/api3-logo-light-theme.svg',
      dark: '/img/api3-logo-dark-theme.svg',
    },
    siteTitle: 'Documentation',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/api3dao/airnode-docs' },
      {
        icon: 'discord',
        link: 'https://discord.com/channels/758003776174030948/765618225144266793',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present API3',
    },
    sidebar: {
      '/reference/airnode/next/': require('../reference/airnode/next/sidebar.js'),
      '/reference/airnode/latest/': require('../reference/airnode/latest/sidebar.js'),
      '/reference/airnode/v0.13/': require('../reference/airnode/v0.13/sidebar.js'),
      '/reference/airnode/v0.12/': require('../reference/airnode/v0.12/sidebar.js'),
      '/reference/airnode/v0.11/': require('../reference/airnode/v0.11/sidebar.js'),
      '/reference/ois/next/': require('../reference/ois/next/sidebar.js'),
      '/reference/ois/latest/': require('../reference/ois/latest/sidebar.js'),
      '/reference/ois/2.2/': require('../reference/ois/2.2/sidebar.js'),
      '/reference/ois/2.1/': require('../reference/ois/2.1/sidebar.js'),
      '/reference/ois/2.0/': require('../reference/ois/2.0/sidebar.js'),
      '/guides/': require('../guides/sidebar.js'),
      '/dev/': require('../dev/sidebar.js'),
    },
    nav: nav(),
  },
};

function nav() {
  return [
    { text: 'Home', link: '/' },
    {
      text: 'Airnode',
      link: '/reference/airnode/latest/understand/',
    },
    { text: 'OIS', link: '/reference/ois/latest/' },
    {
      text: 'Guides',
      link: '/guides/',
      activeMatch: '/guides/.*',
    },
  ];
}
