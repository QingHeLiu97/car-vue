import request from '@src/plugins/request'

export const getOrderList = function (data) {
    return request({
        url: '/order/list',
        method: 'POST',
        data
    })
}
