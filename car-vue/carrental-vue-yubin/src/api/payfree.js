import request from '../plugins/request';
export const insertPayfree = function (data) {
    return request({
        url: '/pay/insert',
        method: 'POST',
        headers: {
            'Content-type': 'multipart/form-data'
        },
        params: data,
        data
    })
}

export const deletePayFree = function (data) {
    return request({
        url: '/pay/delete',
        method: 'GET',
        params: {
            id: data
        }
    })
}

export const updatePayFree = function (data) {
    return request({
        url: '/pay/update',
        method: 'POST',
        params: data,
        data
    })
}

export const getPayFree = function (data) {
    return request({
        url: '/pay/select',
        method: 'GET',
        param: data
    })
}
export const getPayFreeById = function (data) {
    return request({
        url: '/pay/seletById',
        method: 'GET',
        params: {
            id: data
        }
    })
}
