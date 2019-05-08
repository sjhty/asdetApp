const Controller = require('egg').Controller;

class ProductController extends Controller {
    //增加商品
    async addProduct() {
        const { ctx } = this;

        const { name, category_id, attribute, imgUrl, stock, color, productType, size } = ctx.request.body;
        
        let newProduct = {
            name: name,
            category_id: category_id,
            attribute: attribute,
            imgUrl: imgUrl,
            stock: stock,
            color: color.join(","),
            productType: productType,
            size: size
        }

        ctx.body = await ctx.service.products.addProduct(newProduct);
    }

    //查询所有商品列表
    async findAllList() {
        const { ctx } = this;
        console.log(ctx.request.body)
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
        const { id, name, category_id, color, productType, size, imgUrl, stock } = ctx.request.body;
        const newProduct = {
            name: name,
            category_id: category_id,
            color: color.join(","),
            productType: productType,
            size: size,
            imgUrl: imgUrl,
            stock: stock
        }
        if (id) {
            ctx.body = await ctx.service.products.updateProduct(id,newProduct);
        } else {
            ctx.body = await ctx.service.products.addProduct(newProduct);
        }
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