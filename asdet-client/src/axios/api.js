import react from 'react'
import instance from '../axios/instance';

const getCountAndProducts = (data) => {
    return instance.get('/products',data);
}

export default {
    getCountAndProducts
}