'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    //products
    router.get('/asdet/api/products', controller.products.findAllList);
    router.get('/asdet/api/products/:id', controller.products.findById);
};