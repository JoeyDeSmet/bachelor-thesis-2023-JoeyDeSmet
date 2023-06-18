import { path } from '@vuepress/utils'
import { viteBundler } from 'vuepress';
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default';
import { containerPlugin } from '@vuepress/plugin-container';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Ontwikkeling van een plannings- en opvolgingsapplicatie voor logistieke taken',
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
      '/03-chapter-crash-report/README.md',
      '/04-chapter-jwt/README.md',
      '/05-chapter-signal-r/README.md',
      '/06-chapter-statistics/README.md',
      '/07-chapter-user-logging/README.md',
      '/08-chapter-reflectie/README.md',
      '/conclusion/README.md',
      // '/attachments/README.md',
      '/abbreviations/README.md',
      '/bibliography/README.md',
    ],
    sidebarDepth: 1,
    repo: 'https://github.com/vives-elektronics-ict-bachelor-thesis/bachelor-thesis-2023-JoeyDeSmet',
    docsDir: 'docs',
    docsBranch: 'master'
  }),

  bundler: viteBundler({
    viteOptions: {
      ssr: {
        noExternal: ['vuetify'],
      },
    },
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
});
