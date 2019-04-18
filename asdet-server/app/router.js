'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    //products
    router.get('/asdet/api/products/search', controller.products.findAllList);
    router.get('/asdet/api/products/search/:id', controller.products.findById);
    router.post('/asdet/api/products/add', controller.products.addProduct);
};