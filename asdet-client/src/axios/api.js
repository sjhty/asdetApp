import instance from './instance';

const getCountAndProducts = (data) => {
    return instance.get('/products',data);
}

exports = {
    getCountAndProducts
}