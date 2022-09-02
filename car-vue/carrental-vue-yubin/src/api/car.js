import request from '@src/plugins/request'

export const insertCar = function (data) {
    return request({
        url: '/car/add',
        method: 'POST',
        params: data
    })
}

export const deleteCar = function (data) {
    return request({
        url: '/car/delete',
        method: 'POST',
        params: data
    })
}

// 获取汽车列表
export const getCarList = function (data) {
    return request({
        url: '/car/list',
        method: 'POST',
        params: data
    })
}

export const updateCar = function (data) {
    return request({
        url: '/car/update',
        method: 'POST',
        params: data
    })
}
