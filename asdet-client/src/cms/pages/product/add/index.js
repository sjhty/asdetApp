import React, { Component } from 'react'
import { Card, Form, Input, Select, Upload, Icon, Button } from 'antd'
import Utils from '../../../../utils'
import CategoryApi from '../../../../axios/api/categoryApi'

const FormItem = Form.Item

class AddProductForm extends Component {

    state = {}
    componentDidMount() {
        this.getCategory();
    }

    getCategory = () => {
        CategoryApi.getCategoryList()
            .then( (res) => {
                let list = [];
                res.data.map( (item, index) => {
                    item.key = index
                    list.push({
                        id: item.id,
                        name: item.name
                    })

                    return item
                })
                this.setState({
                    list
                })
            })
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 14 },
        };
        return (
            <Card title="添加商品">
                <Form {...formItemLayout}>
                    <FormItem label="商品名称">
                        {
                            getFieldDecorator('name')(
                                <Input type="text" placeholder='请输入商品名称' style={{width:300}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="商品分类">
                        {
                            getFieldDecorator('category_id',{
                                initialValue: '0'
                            })(
                                <Select style={{width:300}}>
                                {
                                    Utils.getOptionList(this.state.list)
                                }  
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="上传图片">
                    {
                        getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="logo" action="http://127.0.0.1:7001/asdet/api/upload" listType="picture">
                            <Button>
                                <Icon type="upload" /> 点击上传
                            </Button>
                            </Upload>
                        )
                    }
                    </FormItem>
                </Form>
            </Card>
        )
    }
}

export default Form.create({})(AddProductForm);