const Controller = require('egg').Controller

class OrdersController extends Controller {

    /**
     * 增加订单
     */
    async addOrder() {
        const { ctx } = this;

        const orders = ctx.request.body;
        console.log(orders)

        ctx.body = await ctx.service.orders.addOrder(orders);
    }

    async findAllList() {
        const { ctx } = this;
        console.log(ctx.request.body)
        ctx.body = await ctx.service.orders.findList(ctx.request.body);
    }
}

module.exports = OrdersController