const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const ctx = this.ctx;

        const query = {
            offset: ctx.helper.parseInt(ctx.query.offset),
            limit: ctx.helper.parseInt(ctx.query.limit)
        }

        ctx.body = await ctx.service.users.list(query);
    }

    async show() {
        const ctx = this.ctx;
        const result = await ctx.service.users.find(ctx.helper.parseInt(ctx.params.id));
        ctx.body = result;
    }
}

module.exports = UserController;