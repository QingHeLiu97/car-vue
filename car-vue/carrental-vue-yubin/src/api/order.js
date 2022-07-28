import request from '@src/plugins/request'

export const getOrderList = function (data) {
    return request({
        url: '/order/list',
        method: 'POST',
        data
    })
}
export const insertOrder = function (data) {
    return request({
        url: '/order/insert',
        method: 'POST',
        data
    })
}
export const deleteOrder = function (data) {
    return request({
        url: '/order/delete',
        method: 'POST',
        data
    })
}
export const updateOrder = function (data) {
    return request({
        url: '/order/update',
        method: 'POST',
        data
    })
}
