import {get } from './config'

const getCountAndProducts = (params) => {
    return get('/asdet/api/products', params);
}

const api = {
    getCountAndProducts
}

export default api