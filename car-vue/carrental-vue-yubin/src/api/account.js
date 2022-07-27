import request from '@src/plugins/request'

// 用户登录
export const accountAuthLogin = function (data) {
    return request({
        url: '/common/login',
        method: 'POST',
        data
    })
}
