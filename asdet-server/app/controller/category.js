const Controller = require('egg').Controller;

class CategoryController extends Controller {
    //查询所有商品分类
    async findAllList() {
        const { ctx } = this;
        console.log(ctx.request.body)
        ctx.body = await ctx.service.category.findList();
    }
}

module.exports = CategoryController;