const Controller = require('egg').Controller;

class ProductController extends Controller {
    //增加商品
    async addProduct() {
        const { ctx } = this;

        const { name, category_id, attribute, imgUrl, stock } = ctx.request.body;
        let newProduct = {
            name: name,
            category_id: category_id,
            attribute: attribute,
            imgUrl: imgUrl,
            stock: stock
        }

        await ctx.service.addProduct(newProduct);

        //ctx.returnBody(200, "发帖成功");
    }

    //查询所有商品列表
    async findAllList() {
        const { ctx } = this;
        
        await ctx.service.findList();
    }

    //通过ID查询商品
    async findById() {
        const { ctx } = this;
        
        await ctx.service.findList(ctx.params.id);
    }
}

module.exports = ProductController;