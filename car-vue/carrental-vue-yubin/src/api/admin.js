import request from '@src/plugins/request'

export const getAdminList = function (data) {
    return request({
        url: '/admin/list',
        method: 'POST',
        data
    })
}
export const insetAdmin = function (data) {
    return request({
        url: '/admin/insert',
        method: 'POST',
        data
    })
}
export const deleteAdmin = function (data) {
    return request({
        url: '/admin/delete',
        method: 'POST',
        data
    })
}
export const updateAdmin = function (data) {
    return request({
        url: '/admin/update',
        method: 'POST',
        data
    })
}
