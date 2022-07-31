import request from '@src/plugins/request'

export const insertUser = function (data) {
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
export const updateUser = function (data) {
    return request({
        url: '/user/update',
        method: 'POST',
        data
    })
}
// 删除
export const deleteUser = function (data) {
    return request({
        url: '/user/delete',
        method: 'POST',
        params: data
    })
}
export const getUserList = function (data) {
    return request({
        url: '/user/list',
        method: 'POST',
        params: data
    })
}

