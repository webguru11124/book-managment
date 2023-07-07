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
        '@fortawesome/fontawesome-svg-core/styles.css',
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap-vue/dist/bootstrap-vue.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/fontawesome.js',
        '~/plugins/bootstrap-vue.js',
        "~/plugins/vue-notification.js",
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
        'bootstrap-vue/nuxt',
    ],
    serverMiddleware: [
        { path: '/api', handler: '~/server/middleware/cors.js' },
    ],

    router: {
        middleware: ['auth'],
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8100' : process.env.BASEURL,

    },


    build: {
    },
    env: {
        API_URL:
            process.env.API_URL || '/api',
    },
    ssr: false,
    loading: false,
    loadingIndicator: false,

    pageTransition: "page",
};
