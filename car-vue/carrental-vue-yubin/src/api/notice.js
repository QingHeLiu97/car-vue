import request from '@src/plugins/request'

//  查看消息列表
export const getNoticeList = function (data) {
    return request({
        url: '/notice/pages',
        method: 'GET',
        params: data
    })
}
// 添加公告
export const insetNotice = function (data) {
    return request({
        url: '/notice/insert',
        method: 'POST',
        data
    })
}
// 更新
export const updateNotice = function (data) {
    return request({
        url: '/notice/update',
        method: 'POST',
        data
    })
}
// 删除
export const deleteNotice = function (data) {
    return request({
        url: '/notice/delete',
        method: 'GET',
        params: data
    })
}
