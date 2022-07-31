import request from '@src/plugins/request'

export const insertCar = function (data) {
    return request({
        url: '/car/add',
        method: 'POST',
        data
    })
}

export const deleteCar = function (data) {
    return request({
        url: '/car/delete',
        method: 'POST',
        data
    })
}

// 获取汽车列表
export const getCarList = function (data) {
    return request({
        url: '/car/list',
        method: 'POST',
        data
    })
}

export const updateCar = function (data) {
    return request({
        url: '/car/update',
        method: 'POST',
        data
    })
}
