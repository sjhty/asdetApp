import { post} from '../config'

const getCountAndProducts = (params) => {
    return post('/products/search',params);
}

const getProductsById = (params) => {
    let url = "/products/"+params.id
    return post(url,params);
}

const addProduct = (params) => {
    return post('/products/add',params);
}

const updateProduct = (params) => {
    return post('/products/update',params);
}

const deleteProduct = (params) => {
    let url = "/products/destory/"+params.id
    return post(url,params);
}

const ProductsApi = {
    getCountAndProducts,
    getProductsById,
    addProduct,
    updateProduct,
    deleteProduct
}

export default ProductsApi