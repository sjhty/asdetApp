import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {
    /**
     * 遍历select options
     * @param {*} data 
     */
    getOptionList(data) {
        if (data) {
            const Options = [<Option value='0' key='0'>请选择</Option>];
            data.map((item) => {
                Options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
            })
            return Options;
        } else {
            return []
        }
        
    },

    /**
     * 格式化日期，YYYY-MM-DD HH:mm:ss
     */
    formateDate(time) {
        if (time) {
            let year = time.getFullYear();
            let month = this.formateTime(time.getMonth() + 1);
            let day = this.formateTime(time.getDate());
            let hour = this.formateTime(time.getHours());
            let minute = this.formateTime(time.getMinutes());
            let second = this.formateTime(time.getSeconds());
            return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        } else {
            return "";
        }
    },

    /**
     * 格式化时分秒，个位数加0
     */
    formateTime(str) {
        if (str < 10) {
            return "0" + str;
        } else {
            return str;
        }
    }
}
