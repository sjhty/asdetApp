import { get } from '../config'

const getCategoryList = (params) => {
    return get('/category/search',params);
}

const CategoryApi = {
    getCategoryList
}

export default CategoryApi