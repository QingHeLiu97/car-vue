import request from '@src/plugins/request'

// 用户登录
export const accountAuthLogin = function (data) {
    return request({
        url: '/common/login',
        method: 'POST',
        data
    })
}

// 用户信息修改
export const accountAuthUpdate = function (data) {
    return request({
        url: '/admin/auth/updateAdmin',
        method: 'POST',
        data
    })
}
