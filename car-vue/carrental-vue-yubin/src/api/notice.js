import request from '@src/plugins/request'

//  查看消息列表
export const getNoticeList = function (data) {
    return request({
        url: '/notice/list',
        method: 'POST',
        params: data
    })
}
// 添加公告
export const insertNotice = function (data) {
    return request({
        url: '/notice/insert',
        method: 'POST',
        params: data
    })
}
// 更新
export const updateNotice = function (data) {
    return request({
        url: '/notice/update',
        method: 'POST',
        params: data
    })
}
// 删除
export const deleteNotice = function (data) {
    return request({
        url: '/notice/delete',
        method: 'POST',
        params: data
    })
}
