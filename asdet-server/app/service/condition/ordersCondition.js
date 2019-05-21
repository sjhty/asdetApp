'use strict';

module.exports = {
    sqlCondition(Op,query) {
        let whereObj = {};
        let consignee = query.consignee ? query.consignee : null;
        let level = query.level && query.level !== '0' ? query.level : null;
        let agent= query.agent ? query.agent : null;
        //let orderData = query.orderData ? query.orderData : null;
        let begin_time = query.begin_time ? query.begin_time : null;
        let end_time = query.end_time ? query.end_time : null;

        if (consignee !== null) {
            whereObj[consignee] = {
                [Op.like]:'%'+consignee+'%'
            }
        } 
        if (level !== null) {
            whereObj[level] = level
        } 
        if (agent !== null) {
            whereObj[agent] = {
                [Op.like]:'%'+agent+'%'
            }
        } 
        // if (orderData !== null) {
        //     whereObj[orderData] = orderData
        // } 
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