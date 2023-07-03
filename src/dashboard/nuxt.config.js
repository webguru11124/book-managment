export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'DC Full Stack Code Challenge',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap-vue/dist/bootstrap-vue.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/bootstrap-vue.js', mode: 'client' },
        { src: "~/plugins/vue-notification.js", mode: 'client', ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        'bootstrap-vue/nuxt',
    ],


    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
    ],
    serverMiddleware: [
        // ...
        { path: '/api', handler: '~/server/middleware/cors.js' },
        // ...
    ],

    // routes: { '/': { prerender: true }, '/*': { cors: true } },
    router: {
        middleware: ['auth'],
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8100' : process.env.BASEURL,
        // baseURL: '<%= options.publicRuntimeConfig.axios.baseURL %>',
        // proxy: true, // Enable proxying,

        // proxyHeaders: false,
        // credentials: false
    },
    // routeRules: {
    //     '/api/**': {
    //         proxy: { to: "http://127.0.0.1:8100/api/**", },
    //     }
    // },

    // proxy: {
    //     '/api': {
    //         target: 'https://127.0.0.1:8100', // Specify the target URL of your API server
    //         pathRewrite: {
    //             '^/api': '',
    //         },
    //     },
    // },

    // Build Configuration: https://go.nuxtjs.dev/config-build

    build: {},
    env: {
        API_URL:
            process.env.API_URL || '/api',
    }
};
