import request from '@src/plugins/request'

export const getAdminList = function (data) {
    return request({
        url: '/admin/list',
        method: 'POST',
        data
    })
}


export const getNoticeList = function (data) {
    return request({
        url: '/admin/getNoticeList',
        method: 'POST',
        data
    })
}
