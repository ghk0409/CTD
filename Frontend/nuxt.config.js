import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: 'CTD - AI Coach To Do',
    title: 'Coach To Do',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/css/main.css',
    '@/assets/css/main.scss',
    '@/assets/css/font.css'
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    //auth-next 대체
    '@nuxtjs/auth'
  ],
  axios: {
    // API URL 구성
    baseURL: 'http://localhost:3001',
  },
  // 인증 전략
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: false,
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        autoFetchUser: true,
        globalToken: true,
      },
      redirect: {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: '/'
      },

    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {
  },
  //loading: '~/assets/loading.vue',
}
