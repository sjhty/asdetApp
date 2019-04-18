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
    async findList(query) {
        let { ctx } = this;

        let categoryObj = {
            include: [{
                model: this.ctx.model.Category,
                as: 'category',
                attributes: ['name', 'price', 'minister_price', 'director_price', 'president_price']
            }]
        }

        console.log("【"+ query +"】")

        let result = ctx.helper.formatData(await ctx.model.Products.findAll(categoryObj,{
            where: query,
            order: [['created_at', 'DESC']]
        }))

        return result;
        // } else {
        //     return ctx.helper.formatData(await ctx.model.Products.findById(id, categoryObj));
        // }
    }

    /**
     * 查询商品详情
     * @param {*} id 
     */
    async findById(id) {
        let { ctx } = this;

        let categoryObj = {
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
    async updateProduct(query,product) {
        let { ctx } = this;

        let result = ctx.helper.formatData(await ctx.model.Products.update(product,{
            where: query
        }));

        return result;
    }
}

module.exports = ProductService;