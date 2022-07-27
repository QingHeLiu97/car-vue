import request from '@src/plugins/request'

export const getAdminList = function (data) {
    return request({
        url: '/common/login',
        method: 'POST',
        data
    })
}

export const updateUser = function (data) {
    return request({
        url: '/common/login',
        method: 'POST',
        data
    })
}
