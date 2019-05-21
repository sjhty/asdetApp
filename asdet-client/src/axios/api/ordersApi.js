import { post} from '../config'

const addOrder = (params) => {
    return post('/orders/add',params);
}

const getAllList = (params) => {
    return post('/orders/search',params);
}

const OrdersApi = {
    addOrder,
    getAllList
}

export default OrdersApi