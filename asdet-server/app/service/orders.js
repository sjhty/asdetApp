const Service = require('egg').Service
const OrdersCondition = require('./condition/ordersCondition')

class OrdersService extends Service {

    /**
     * 增加订单
     * @param {*} orderParams 
     */
    async addOrder(orderParams) {
        const { ctx } = this;

        const result = await ctx.model.Orders.create(orderParams);
        return ctx.helper.formatData(result);
    }

    async findList(query) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        const whereObj = OrdersCondition.sqlCondition(Op,query);

        let categoryObj = {
                where: whereObj,
                order: [['id', 'DESC'],]
            };
        const result = ctx.helper.formatData(await ctx.model.Orders.findAll(categoryObj))

        return result;
    }
}

module.exports = OrdersService