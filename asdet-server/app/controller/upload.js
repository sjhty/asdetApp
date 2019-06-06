const Controller = require('egg').Controller
const fs = require('fs')
const path = require('path')
const mkdirs = require('jm-mkdirs')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const md5 = require('md5')

class UploadController extends Controller {
    async upload() {
        const { ctx, app } = this;
        const stream = await ctx.getFileStream();
        const fileName = md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
        let month = (new Date().getMonth() + 1) < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1);
        let uploadPath = '',imgUrl = '';
        if (app.config.env === 'local') {
            uploadPath = '../../../../AppServ/www/uploads/' + new Date().getFullYear() + month;
            imgUrl = 'http://localhost/uploads/' + new Date().getFullYear() + month + '/' + fileName;
        } else {
            uploadPath = '../uploads/' + new Date().getFullYear() + month;
            imgUrl = 'http://49.234.12.142/uploads/' + new Date().getFullYear() + month + '/' + fileName;
        }

        if (!fs.existsSync(uploadPath)) {
            mkdirs.sync(uploadPath);
        }

        const target = path.join(this.config.baseDir, uploadPath, fileName);
        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        console.log(writeStream)
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            console.log(err)
            await sendToWormhole(stream);
            throw err;
        }

        //文件响应
        ctx.body = {
            url: imgUrl
        };
    }
}

module.exports = UploadController;