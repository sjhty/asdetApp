'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    // router.resources('users','/asdet/api/users',controller.users);
    // router.resources('products','/asdet/api/products',controller.products);

    router.get('/asdet/api/products', controller.products.findAllList);
};