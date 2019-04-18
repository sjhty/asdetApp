import { get, post} from '../config'

const getCountAndProducts = (params) => {
    return get('/products/search/',params);
}

const getProductsById = (params) => {
    console.log(params);
    let url = "/products/"+params.id
    return get(url,params);
}

const addProduct = (params) => {
    console.log(params);
    return post('/products/add',params);
}

const ProductsApi = {
    getCountAndProducts,
    getProductsById,
    addProduct
}

export default ProductsApi