import axios from 'axios'
import router from '@src/router'
import store from '@src/store'
import Setting from '@src/setting.js'
import { Message, Notification, Dialog } from 'element-ui'

function errMessageModal (errorMsg) {
    if (Setting.errorModalType == 'Message') {
        Message({
            type: 'error',
            showClose: true,
            message: errorMsg || '未知错误',
            duration: Setting.errorModalDuration
        })
        // return Promise.reject(errorMsg)
    }
    if (Setting.errorModalType == 'Notice') {
        Notification({
            type: 'error',
            title: '系统错误',
            message: errorMsg || '未知错误'
        })
        // return Promise.reject(errorMsg)
    }
}

const service = axios.create({
    baseURL: Setting.apiBaseURL,
    timeout: 30000
})
// 请求拦截
service.interceptors.request.use(
    config => {
        const token = store.state.account.token;
        config.headers = Setting.apiHeaders
        config.headers['X-Litemall-Admin-Token'] = token || ''
        return config;
    },
    error => {
        // 发送失败
        console.log(error);
        return Promise.reject(error);
    }
)
// 响应拦截
service.interceptors.response.use(
    response => {
        // 请求完成
        var responseData = response.data;
        const fullPath = ""
        switch (responseData.code) {
            case "200": return responseData;
            case "430":// 登陆失效
                store.dispatch('account/accountClearCache', '', { root: true })
                fullPath = router.history.current.fullPath;
                router.redirect({ name: 'login', query: { redirect: fullPath } })
                break;
            case "401":// 用户不存在
                store.dispatch('account/accountClearCache', '', { root: true })
                fullPath = router.history.current.fullPath;
                router.redirect({ name: 'login', query: { redirect: fullPath } })
                break;
            default: break;
        }
        errMessageModal(responseData.message)
        return Promise.reject(responseData)
    },
    error => {
        // 请求失败
        if (error && error.response) {
            switch (error.response.status) {
            case 400: error.message = '请求错误'; break;
            case 401: error.message = '未授权，请登录'; break;
            case 403: error.message = '拒绝访问'; break;
            case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
            case 408: error.message = '请求超时'; break;
            case 500: error.message = '服务器内部错误'; break;
            case 501: error.message = '服务未实现'; break;
            case 502: error.message = '服务器未响应'; break;
            case 503: error.message = '服务不可用'; break;
            case 504: error.message = '网关超时'; break;
            case 505: error.message = 'HTTP版本不受支持'; break;
            default: break;
            }
        }
        errMessageModal(error.message);
        return Promise.reject(error)
    }
)

export default service
