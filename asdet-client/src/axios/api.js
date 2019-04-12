import {get} from './config'

const getCountAndProducts = (params) => {
    return get('/products',params);
}

const api = {
    getCountAndProducts
}

export default api