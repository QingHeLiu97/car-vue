import request from '@src/plugins/request'

// 列表
export const getNoticeList = function (data) {
    return request({
        url: '/notice/pages',
        method: 'GET',
        params: data
    })
}
// 添加
export const getNoticeInsert = function (data) {
    return request({
        url: '/notice/insert',
        method: 'POST',
        // headers:{
        //     "Content-type":"multipart/form-data"
        // },
        data
    })
}
// 更新
export const getNoticeUpdate = function (data) {
    return request({
        url: '/notice/update',
        method: 'POST',
        data
    })
}
// 删除
export const getNoticeDelete = function (data) {
    return request({
        url: '/notice/delete',
        method: 'GET',
        params: data
    })
}
