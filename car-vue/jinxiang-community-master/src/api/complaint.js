import request from '@src/plugins/request'

// 列表
export const getComplaintList = function (data) {
    return request({
        url: '/complaint/pages',
        method: 'GET',
        params: data
    })
}
// 列表
export const getMonthList = function () {
    return request({
        url: '/complaint/getMonthList',
        method: 'GET'
    })
}
// 添加
export const getComplaintInsert = function (data) {
    return request({
        url: '/complaint/insert',
        method: 'POST',
        // headers:{
        //     "Content-type":"multipart/form-data"
        // },
        data
    })
}
// 更新
export const getComplaintUpdate = function (data) {
    return request({
        url: '/complaint/update',
        method: 'POST',
        data
    })
}
// 删除
export const getComplaintDelete = function (data) {
    return request({
        url: '/complaint/delete',
        method: 'GET',
        params: data
    })
}
