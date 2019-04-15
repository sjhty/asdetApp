import {get} from '../config'

const getCountAndProducts = (params) => {
    return get('/products',params);
}

const getProductsById = (params) => {
    return get('/products/search/',params);
}

const ProductsApi = {
    getCountAndProducts,
    getProductsById
}

export default ProductsApi