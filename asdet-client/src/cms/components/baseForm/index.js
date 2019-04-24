import React, { Component } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import Utils from '../../../utils'
const FormItem = Form.Item

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
                    const INPUT = <FormItem label={label}>
                        {
                            getFieldDecorator([field])(
                                <Input placeholder={placeholder} style={{width:width}} key={i}/>                        
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                } else if (type == 'SELECT') {
                    const SELECT = <FormItem label={label}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Select style={{width:width}} key={i}>
                                {
                                    Utils.getOptionList(item.list)
                                }  
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                } else if (type == 'TIME_SELECT') {
                    const BEGIN_TIME = <FormItem label={label}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker placeholder='开始时间' showTime={true} format='YYYY-MM-DD HH:mm:ss'/>
                            )
                        }
                    </FormItem>
                    const END_TIME = <FormItem label='~' colon={false} >
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