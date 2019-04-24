import React, { Component } from 'react'
import { Card, Form, Input } from 'antd'

class List extends Component {

    FormList = [
        {
            type: 'INPUT',
            label: '商品名称',
            field: 'name',
            placeholder: '请输入商品名称',
            width: 100
        },
        {
            type: 'SELECT',
            label: '款式',
            field: 'style',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: 'A款'},
                {id: 2, name: 'B款'}
            ]
        },
        {
            type: 'TIME_SELECT',
            label: '入库时间'
        }
    ]

    render () {
        return (
            <Card>
                <Form>
                    <Form.Item label="客户名称">
                        <Input />
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default List;