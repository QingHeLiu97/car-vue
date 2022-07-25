 const env = process.env.NODE_ENV;

 const Setting = {
    title: '汽车租赁管理系统',
     publicPath: env === 'development' ? '/' : './',
     outputDir: 'dist',
     assetsDir: 'static',
     lintOnSave: true
 };

 module.exports = Setting;
