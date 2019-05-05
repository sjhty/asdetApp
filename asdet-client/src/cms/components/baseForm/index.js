import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd'
import Moment from 'moment'
import Utils from '../../../utils'
const FormItem = Form.Item

class BaseForm extends Component {

    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        if (fieldsValue.begin_time) {
            fieldsValue.begin_time = Moment(fieldsValue.begin_time).format('YYYY-MM-DD HH:mm:ss');
        }
        if (fieldsValue.end_time) {
            fieldsValue.end_time = Moment(fieldsValue.end_time).format('YYYY-MM-DD HH:mm:ss');
        }
        if (fieldsValue.newStock) {
            fieldsValue.stock = Number(fieldsValue.newStock) + Number(fieldsValue.stock);
        }
        console.log(fieldsValue)
        this.props.filterSubmit(fieldsValue);
    }

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
                let initialValue = item.initialValue || '' || '0';
                let width = item.width;
                let mode = item.mode;
                let disabled = item.disabled;
                let btnClass = item.className;
                let resetBtnShow = item.resetBtn;

                if (type === 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue: initialValue
                            })(
                                <Input type="text" placeholder={placeholder} style={{width:width}} disabled={disabled}/>                        
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                } else if (type === 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue: initialValue
                            })(
                                <Select style={{width:width}} key={i} mode={mode} disabled={disabled}>
                                {
                                    Utils.getOptionList(item.list)
                                }  
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                } else if (type === 'TIME_SELECT') {
                    const BEGIN_TIME = <FormItem label="入库时间" key="begin_time" style={{marginRight: '10px'}}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker placeholder='开始时间' showTime={true} format='YYYY-MM-DD HH:mm:ss'/>
                            )
                        }
                    </FormItem>
                    const END_TIME = <FormItem label='~' colon={false} key="end_time">
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker placeholder='结束时间' showTime={true} format='YYYY-MM-DD HH:mm:ss'/>
                            )
                        }
                    </FormItem>
                    formItemList.push(BEGIN_TIME,END_TIME);
                } else if (type === 'BUTTON') {
                    const BUTTON = <FormItem key="btn" className={btnClass}>
                        <Button type="primary" style={{ marginRight: "10px" }} onClick={this.handleFilterSubmit}>{label}</Button>
                        <Button className={resetBtnShow}>重置</Button>
                    </FormItem>
                    formItemList.push(BUTTON);
                }
            });
        }
        return formItemList;
    }

    render () {
        return (
            <Form layout = 'inline'>
                {this.initFormList()}
            </Form>
        )
    }
}

export default Form.create({})(BaseForm)