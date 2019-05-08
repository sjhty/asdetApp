'use strict';

module.exports = {
    sqlCondition(Op,query) {
        let whereObj = {};
        let name = query.name ? query.name : null;
        let type = query.productType && query.productType !== '0' ? query.productType : null;
        let size= query.size && query.size !== '0' ? query.size : null;
        let begin_time = query.begin_time ? query.begin_time : null;
        let end_time = query.end_time ? query.end_time : null;

        if (name !== null) {
            whereObj['$products.name$'] = {
                [Op.like]:'%'+name+'%'
            }
        } 
        if (type !== null) {
            whereObj['$products.productType$'] = type
        } 
        if (size !== null) {
            whereObj['$products.size$'] = size
        } 
        if (begin_time !== null && end_time !== null) {
            whereObj['$products.created_at$'] = {
                [Op.between]: [begin_time, end_time]
            }
        } 
        if (begin_time !== null && end_time === null) {
            whereObj['$products.created_at$'] = {
                [Op.gte]: begin_time
            }
        } 
        if (begin_time === null && end_time !== null) {
            whereObj['$products.created_at$'] = {
                [Op.lte]: end_time
            }
        }

        return whereObj;
    }
}