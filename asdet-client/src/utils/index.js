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
    }
}
