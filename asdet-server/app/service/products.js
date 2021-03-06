const Service = require('egg').Service;
const ProductCondition = require('./condition/productsCondition')
class ProductService extends Service {
    /**
     * 添加商品
     * @param {*} productPramas 
     */
    async addProduct(productPramas) {
        const { ctx } = this;

        const result = await ctx.model.Products.create(productPramas);
        return ctx.helper.formatData(result);
    }

    /**
     * 获取所有商品和商品分类下的价格
     * @param {*} id id=undefined 查询所有
     */
    async findList(query) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        const whereObj = ProductCondition.sqlCondition(Op,query);

        let categoryObj = {
                include: [{
                    model: this.ctx.model.Category,
                    as: 'category',
                    attributes: ['name', 'price', 'minister_price', 'director_price', 'president_price'],
                    where: whereObj
                }]
            };
        const result = ctx.helper.formatData(await ctx.model.Products.findAll(categoryObj))

        return result;
    }

    /**
     * 查询商品详情
     * @param {*} id 
     */
    async findById(id) {
        const { ctx } = this;

        const categoryObj = {
            include: [{
                model: this.ctx.model.Category,
                as: 'category',
                attributes: ['name', 'price', 'minister_price', 'director_price', 'president_price']
            }]
        }

        return ctx.helper.formatData(await ctx.model.Products.findById(id, categoryObj));
    }

    /**
     * 修改商品属性
     * @param {*} query 
     * @param {*} product 
     */
    async updateProduct( id, info) {
        const { ctx } = this;
        const product = await ctx.model.Products.findById(id);
        let result='';

        if (!product) {
            ctx.status = 404;
        } else {
            result = ctx.helper.formatData(await product.update(info));
        }

        return result;
    }


    /**
     * 删除商品
     * @param {*} id 
     */
    async deleteProduct(id) {
        const { ctx } = this;
        const product = await ctx.model.Products.findById(id);
        let result='';

        if (!product) {
            ctx.status = 404;
        } else {
            result = ctx.helper.formatData(await product.destroy());
        }

        return result;
    }
}

module.exports = ProductService;