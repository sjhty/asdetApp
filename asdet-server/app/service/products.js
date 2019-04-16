const Service = require('egg').Service;
class ProductService extends Service {
    /**
     * 添加商品
     * @param {*} productPramas 
     */
    async addProduct(productPramas) {
        let { ctx } = this;

        let result = await ctx.model.Products.create(productPramas);
        return ctx.helper.formatData(result);
    }

    /**
     * 获取所有商品和商品分类下的价格
     * @param {*} id id=undefined 查询所有
     */
    async findList(id) {
        let { ctx } = this;

        let categoryObj = {
            include: [{
                model: this.ctx.model.Category,
                as: 'category',
                attributes: ['name', 'price', 'minister_price', 'director_price', 'president_price']
            }]
        }

        if (typeof(id) == "undefined") {
            return ctx.helper.formatData(await ctx.model.Products.findAll(categoryObj));
        } else {
            return ctx.helper.formatData(await ctx.model.Products.findById(id, categoryObj));
        }
    }
}

module.exports = ProductService;