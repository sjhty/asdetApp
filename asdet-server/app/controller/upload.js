const Controller = require('egg').Controller
const fs = require('fs')
const path = require('path')
const mkdirs = require('jm-mkdirs')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const md5 = require('md5')

class UploadController extends Controller {
    async upload() {
        const { ctx } = this;
        const stream = await ctx.getFileStream();
        console.log(stream)
        const fileName = md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
        let month = (new Date().getMonth() + 1) < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1)
        const uploadPath = '../../../../AppServ/www/uploads/' + new Date().getFullYear() + month;
        if (!fs.existsSync(uploadPath)) {
            mkdirs.sync(uploadPath);
        }

        const target = path.join(this.config.baseDir, uploadPath, fileName);
        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }
        //文件响应
        ctx.body = {
            url: 'http://localhost/uploads/' + new Date().getFullYear() + month + '/' + fileName
        };
    }
}

module.exports = UploadController;