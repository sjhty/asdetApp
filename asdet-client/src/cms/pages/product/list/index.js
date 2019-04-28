import React, { Component } from 'react'
import { Card, Table } from 'antd'
import BaseForm from '../../../components/baseForm'

class List extends Component {

    FormList = [
        {
            type: 'INPUT',
            label: '商品名称',
            field: 'name',
            placeholder: '请输入商品名称',
            width: 130
        },
        {
            type: 'SELECT',
            label: '款式',
            field: 'style',
            placeholder: '全部',
            initialValue: 1,
            width: 80,
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: 'A款'},
                {id: 2, name: 'B款'}
            ]
        },
        {
            type: 'TIME_SELECT'
        }
    ];

    render () {
        const columns = [
            {
              title: '商品名称', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
            },
            {
              title: '商品分类', width: 100, dataIndex: 'category', key: 'category', 
            },
            {
              title: '商品颜色', dataIndex: 'color', key: 'color', width: 150,
            },
            {
              title: '商品型号', dataIndex: 'type', key: 'type', width: 150,
            },
            {
              title: '商品尺码', dataIndex: 'size', key: 'size', width: 150,
            },
            {
              title: '商品售价', dataIndex: 'price', key: 'price', width: 150,
            },
            {
              title: '部长拿货价', dataIndex: 'address', key: '5', width: 150,
            },
            {
              title: '理事拿货价', dataIndex: 'address', key: '6', width: 150,
            },
            {
              title: '社长拿货价', dataIndex: 'address', key: '7', width: 150,
            },
            { title: '商品库存', dataIndex: 'stock', key: 'stock' },
            {
              title: '操作',
              key: 'operation',
              fixed: 'right',
              width: 100,
              render: () => <span><a href="javascript:;">修改</a><a href="javascript:;">添加库存</a></span>,
            },
          ];
          
          const data = [];
        return (
            <div>
                <Card>
                    <BaseForm formList={this.FormList} key={this.FormList}/>
                </Card>
                <Card>
                    <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 350 }} />
                </Card>
            </div>
        )
    }
}

export default List;