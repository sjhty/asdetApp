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

        ctx.body = await ctx.service.products.addProduct(newProduct);

        //ctx.returnBody(200, "发帖成功");
    }

    //查询所有商品列表
    async findAllList() {
        const { ctx } = this;

        ctx.body = await ctx.service.products.findList(ctx.request.body);
    }

    //通过ID查询商品
    async findById() {
        const { ctx } = this;

        ctx.body = await ctx.service.products.findById(ctx.params.id);
    }

    /**
     * 修改商品
     */
    async updateProduct() {
        const { ctx } = this;

        const id = ctx.request.body.id;

        ctx.body = await ctx.service.products.updateProduct(id,ctx.request.body);

    }

    /**
     * 删除商品
     */
    async destroyProduct() {
        const { ctx } = this;

        ctx.body = await ctx.service.products.deleteProduct(ctx.params.id);

    }
}

module.exports = ProductController;