import { containerPlugin } from '@vuepress/plugin-container';
import { defaultTheme } from '@vuepress/theme-default';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

module.exports = {
  lang: 'en-US',
  title: 'Place title here',
  description: 'Place a description here',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }]
  ],
  theme: defaultTheme({
    logo: '/vives-logo.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'VIVES', link: 'https://www.vives.be' },
    ],
    sidebar: [
      '/introduction/README.md',
      '/01-chapter-xxx/README.md',
      '/02-chapter-yyy/README.md',
      '/conclusion/README.md',
      '/attachments/README.md',
      '/abbreviations/README.md',
      '/bibliography/README.md',
      '/pdf-generation/README.md',
      '/blog/README.md',
      '/netlify/README.md',
    ],
    sidebarDepth: 1,
    repo: 'https://github.com/vives-elektronics-ict-bachelor-thesis/bachelor-thesis-vuepress-template',
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