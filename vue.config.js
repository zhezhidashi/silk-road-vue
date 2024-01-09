const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://apsr.pku.edu.cn/api-service',
                // target: 'https://dev.pacificsilkroad.cn/api-service',
                pathRewrite: {'^/api': ''},
                ws: true,
                changeOrigin: true
            },
        },
    },
})
