import request from '@src/plugins/request'

export const getAdminList = function (data) {
    return request({
        url: '/admin/list',
        method: 'POST',
        params: data
    })
}
export const insetAdmin = function (data) {
    return request({
        url: '/admin/insert',
        method: 'POST',
        params: data
    })
}
export const deleteAdmin = function (data) {
    return request({
        url: '/admin/delete',
        method: 'POST',
        params: data
    })
}
export const updateAdmin = function (data) {
    return request({
        url: '/admin/update',
        method: 'POST',
        params: data
    })
}
