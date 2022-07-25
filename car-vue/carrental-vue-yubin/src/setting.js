/**
 * 业务配置
 * **/
const env = process.env.NODE_ENV;

const Setting = {
    // 网页标题的后缀
    titleSuffix: '汽车租赁管理系统',
    // 路由模式
    routerMode: 'hash',
    // 应用的基路径
    routerBase: '/',
    // 接口请求地址
    // eslint-disable-next-line eqeqeq
    apiBaseURL: env == 'development' ? '/localhost:8001' : '/',
    // 腾讯地图接口请求地址
    // eslint-disable-next-line eqeqeq
    mapApiURL: env == 'development' ? '/mapApi' : 'https://apis.map.qq.com',
    // 接口统一请求头
    apiHeaders: { 'X-Requested-With': 'XMLHttpRequest' },
    // 腾讯地图定位的Key
    tencentKey: 'GQNBZ-MKFKU-637VL-4XQ7O-4UXH7-HUFGC',
    // 腾讯地图定位的name
    tencentName: 'photo-Andro',
    // 接口请求返回错误时，弹窗的类型，可选值为 Message 或 Notice
    errorModalType: 'Message',
    // 弹窗显示时间
    errorModalDuration: 5000,
    // Cookies 缓存token后缀
    tokenKey: 'shiro-Session'

}

module.exports = Setting;
