import { path } from '@vuepress/utils'
import { defaultTheme } from '@vuepress/theme-default';
import { containerPlugin } from '@vuepress/plugin-container';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

module.exports = {
  lang: 'en-US',
  title: 'Ontwikkeling van een plannings- en opvolgingsapllicatie voor logistieke taken',
  description: 'Onwikkeling van de HS Todo App',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }]
  ],
  
  theme: defaultTheme({
    logo: '/vives-logo.png',
    colorMode: 'dark',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'VIVES', link: 'https://www.vives.be' },
    ],
    sidebar: [
      '/introduction/README.md',
      '/01-chapter-technologien/README.md',
      '/02-chapter-terugkerende-taken/README.md',
      '/03-chapter-jwt/README.md',
      '/04-chapter-crash-report/README.md',
      '/05-chapter-signal-r/README.md',
      '/06-chapter-statistics/README.md',
      '/07-chapter-optimalization/README.md',
      '/08-chapter-user-logging/README.md',
      '/09-chapter-reflectie/README.md',
      '/conclusion/README.md',
      '/attachments/README.md',
      '/abbreviations/README.md',
      '/bibliography/README.md',
      '/pdf-generation/README.md',
      '/netlify/README.md',
    ],
    sidebarDepth: 1,
    repo: 'https://github.com/vives-elektronics-ict-bachelor-thesis/bachelor-thesis-2023-JoeyDeSmet',
    docsDir: 'docs',
    docsBranch: 'master'
  }),

  serviceWorker: true,

  plugins: [
    containerPlugin({
      type: 'codeoutput',
      locales: {
        '/': {
          defaultInfo: 'Output',
        },
      },
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
}