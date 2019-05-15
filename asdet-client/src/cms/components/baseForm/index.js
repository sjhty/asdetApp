import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Button, Upload, Icon } from 'antd'
import Utils from '../../../utils'
const FormItem = Form.Item

class BaseForm extends Component {

    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        console.log(fieldsValue)
        this.props.filterSubmit(fieldsValue);
    }

    normFile = (e) => {
        //console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
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
                let initialValue = item.initialValue;
                let width = item.width;
                let mode = item.mode;
                let disabled = item.isEdit;
                let btnClass = item.className;
                let resetBtnShow = item.resetBtn;
                let defaultValue = item.defaultValue;

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
                } else if (type === 'SPAN') {
                    const SPAN = <FormItem label={label} key={field}>
                        {
                            <span className="ant-form-text" dangerouslySetInnerHTML={{__html: initialValue}}></span>
                        }
                    </FormItem>
                    formItemList.push(SPAN);
                } else if (type === 'SELECT') {
                    
                    if (field === 'color') {
                        initialValue = (initialValue || "").split(',')
                    }
                    
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue: initialValue
                            })(
                                <Select style={{width:width}} key={field} mode={mode} disabled={disabled}>
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
                } else if (type === 'UPLOAD') {
                    const UPLOAD = <FormItem key={field} label={label}>
                        {
                            getFieldDecorator(field, {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile
                            })(
                                <Upload name="logo" action="http://127.0.0.1:7001/asdet/api/upload" listType="picture" disabled={disabled}> 
                                    <Button>
                                        <Icon type="upload" /> 点击上传
                                    </Button>
                                </Upload>
                            )
                        }
                    </FormItem>
                    formItemList.push(UPLOAD);
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