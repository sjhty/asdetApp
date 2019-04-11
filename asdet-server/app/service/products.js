const Service = require('egg').Service;
class ProductService extends Service {
    async list({ offset = 0, limit = 10}) {
        const result = await this.ctx.model.Products.findAndCountAll({
            offset,
            limit
        });
        
        const data = this.ctx.helper.formatData(result);

        return data;
    }

    async find(id) {
        const result = await this.ctx.model.Products.findById(id,{
            include: [{
                model: this.ctx.model.Category,
                as: 'category',
                attributes: ['name','price','minister_price','director_price','president_price']
            }]
        });

        const data = this.ctx.helper.formatData(result);

        return data;
    }

    async create(pro) {
        const result = await this.ctx.model.Products.create(pro);
        const data = this.ctx.header.formatData(result);
        return data;
    }
}

module.exports = ProductService;