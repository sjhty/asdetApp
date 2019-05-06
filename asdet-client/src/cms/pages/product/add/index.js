import React, { Component } from 'react'
import { Card, Form } from 'antd'


const FormItem = Form.Item

class AddProduct extends Component {
    render () {
        return (
            <Card title="添加商品">
                <Form>
                    <FormItem label="商品名称">
                        
                    </FormItem>
                </Form>
            </Card>
        )
    }
}