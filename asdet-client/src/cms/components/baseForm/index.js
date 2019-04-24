import React, { Component } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import Utils from '../../../utils'
const FormItem = Form.Item
const Options = Select.Option

class BaseForm extends Component {

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
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
                }
            });
        }
    }

    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Form.create({})(BaseForm)