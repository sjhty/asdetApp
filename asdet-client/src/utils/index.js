import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {
    getOptionList(data) {
        if (data) {
            const Options = [];
            data.map((item) => {
                Options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
            })
            return Options;
        } else {
            return []
        }
    },

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

    formateTime(str) {
        if (str < 10) {
            return "0" + str;
        } else {
            return str;
        }
    }
}
