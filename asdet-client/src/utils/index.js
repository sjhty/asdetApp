import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {
    getOptionList(data) {
        if (data) {
            const Options = [<Option value="0" key="0"></Option>];
            data.map((item) => {
                Options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
            })
            return Options;
        } else {
            return []
        }
    }
}
