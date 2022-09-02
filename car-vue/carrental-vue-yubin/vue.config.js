// import Setting from "./src/setting.env.js"
const Setting = require('./src/setting.env.js')
const { resolve } = require('path')
module.exports = {
    outputDir: Setting.outputDir,
    assetsDir: Setting.assetsDir,
    lintOnSave: false,
    publicPath: Setting.publicPath,
    devServer: {
        port: 8002,
        open: true,
        publicPath: Setting.publicPath,
        proxy: {
            '/localhost': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: true, // 如果是HTTP请求则配置这个参数
                pathRewrite: {
                    '^/localhost': ''
                }
            }
        }
    },
    productionSourceMap: true,
    chainWebpack: (config) => {
        config.resolve.alias
        .set('@src', resolve('./src'))
        .set('@api', resolve('./src/api'))
        .set('@view', resolve('./src/views'))
        .set('@com', resolve('./src/components'))
        config.plugin('html').tap(args => {
            args[0].title = Setting.title;
            return args;
        })
    }
}
