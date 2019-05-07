'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    //products
    router.post('/asdet/api/products/search', controller.products.findAllList);
    router.get('/asdet/api/products/search/:id', controller.products.findById);
    router.post('/asdet/api/products/add', controller.products.addProduct);
    router.post('/asdet/api/products/update', controller.products.updateProduct);
    router.post('/asdet/api/products/destory/:id', controller.products.destroyProduct);

    //category
    router.get('/asdet/api/category/search', controller.category.findAllList);

    //upload
    router.post('/asdet/api/upload', controller.upload.upload);
};