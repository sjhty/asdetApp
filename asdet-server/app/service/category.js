const Service = require('egg').Service

class CategoryService extends Service {
    /**
     * 获取商品分类
     * @param {*} id id=undefined 查询所有
     */
    async findList() {
        const { ctx } = this;

        const result = ctx.helper.formatData(await ctx.model.Category.findAll())

        return result;
    }
}


module.exports = CategoryService;