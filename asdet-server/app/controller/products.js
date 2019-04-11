const Controller = require('egg').Controller;

class ProductController extends Controller {
    async index() {
        const ctx = this.ctx;

        const query = {
            offset: ctx.helper.parseInt(ctx.query.offset),
            limit: ctx.helper.parseInt(ctx.query.limit)
        }

        ctx.body = await ctx.service.products.list(query);
    }

    async show() {
        const ctx = this.ctx;
        const result = await ctx.service.products.find(ctx.helper.parseInt(ctx.params.id));
        ctx.body = result;
    }

    async create() {
        const ctx = this.ctx;
        const result = await ctx.service.products.create(ctx.request.body);
        ctx.body = result;
    }
}

module.exports = ProductController;