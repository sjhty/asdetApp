const Service = require('egg').Service;
class UserService extends Service {
    async list({ offset = 0, limit = 10}) {
        const result = await this.ctx.model.Users.findAndCountAll({
            offset,
            limit
        });
        
        const data = this.ctx.helper.formatData(result);

        return data;
    }

    async find(id) {
        const result = await this.ctx.model.Users.findById(id);

        const data = this.ctx.helper.formatData(result);

        return data;
    }
}

module.exports = UserService;