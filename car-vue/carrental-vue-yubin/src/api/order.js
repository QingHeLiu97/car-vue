import request from '@src/plugins/request'

export const getOrderList = function (data) {
    return request({
        url: '/order/list',
        method: 'POST',
        params: data
    })
}
export const insertOrder = function (data) {
    return request({
        url: '/order/insert',
        method: 'POST',
        params: data
    })
}
export const deleteOrder = function (data) {
    return request({
        url: '/order/delete',
        method: 'POST',
        params: data
    })
}
export const updateOrder = function (data) {
    return request({
        url: '/order/update',
        method: 'POST',
        params: data
    })
}
export const getOrderListByPhone = function (data) {
    return request({
        url: '/order/getOrderByPhone',
        method: 'POST',
        params: data
    })
}
