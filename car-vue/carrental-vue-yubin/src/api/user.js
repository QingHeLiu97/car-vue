import request from '@src/plugins/request'

// 用户列表
export const getUserInfo = function (data) {
    return request({
        url: '/user/getUserInfo',
        method: 'GET',
        params: data
    })
}
// 添加
export const getUserInsert = function (data) {
    return request({
        url: '/user/insert',
        method: 'POST',
        headers: {
            'Content-type': 'multipart/form-data'
        },
        data
    })
}
// 更新
export const getUserUpdate = function (data) {
    return request({
        url: '/user/update',
        method: 'POST',
        data
    })
}
// 删除
export const getUserDelete = function (data) {
    return request({
        url: '/user/delete',
        method: 'GET',
        params: data
    })
}
