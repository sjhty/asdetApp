import React, { Component } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import Utils from '../../../utils'
const FormItem = Form.Item
const Options = Select.Option

class BaseForm extends Component {

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item,i) => {
                let type = item.type;
                let field = item.field;
                let label = item.label;
                let placeholder = item.placeholder;
                let initialValue = item.initialValue;
                let width = item.width;

                if (type == 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field])(
                                <Input placeholder={placeholder} width={width}/>                        
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                } else if (type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Select width={width} placeholder={placeholder}>
                                {
                                    Utils.getOptionList(item.list)
                                }  
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                } else if (type == 'TIME_SELECT') {
                    const BEGIN_TIME = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker placeholder='开始时间' showTime={true} format='YYYY-MM-DD HH:mm:ss'/>
                            )
                        }
                    </FormItem>
                    const END_TIME = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker placeholder='结束时间' showTime={true} format='YYYY-MM-DD HH:mm:ss'/>
                            )
                        }
                    </FormItem>
                    formItemList.push(BEGIN_TIME,END_TIME);
                }
            });
        }

        return formItemList;
    }

    render () {
        return (
            <div>
                {this.initFormList()}
            </div>
        )
    }
}

export default Form.create({})(BaseForm)