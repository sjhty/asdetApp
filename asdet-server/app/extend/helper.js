'use strict';

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  formatData(result) {
    const conObj = {
        success: true,
        data:[]
    };
    if (result) {
        conObj.success = true;
        conObj.data = result;
    } else {
        conObj.success = false;
        conObj.message = "未查到相关数据"
    }

    return conObj;
  }
};