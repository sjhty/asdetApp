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
              title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
            },
            {
              title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left',
            },
            {
              title: 'Column 1', dataIndex: 'address', key: '1', width: 150,
            },
            {
              title: 'Column 2', dataIndex: 'address', key: '2', width: 150,
            },
            {
              title: 'Column 3', dataIndex: 'address', key: '3', width: 150,
            },
            {
              title: 'Column 4', dataIndex: 'address', key: '4', width: 150,
            },
            {
              title: 'Column 5', dataIndex: 'address', key: '5', width: 150,
            },
            {
              title: 'Column 6', dataIndex: 'address', key: '6', width: 150,
            },
            {
              title: 'Column 7', dataIndex: 'address', key: '7', width: 150,
            },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
              title: 'Action',
              key: 'operation',
              fixed: 'right',
              width: 100,
              render: () => <a href="javascript:;">action</a>,
            },
          ];
          
          const data = [];
          for (let i = 0; i < 100; i++) {
            data.push({
              key: i,
              name: `Edrward ${i}`,
              age: 32,
              address: `London Park no. ${i}`,
            });
          }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.FormList} key={this.FormList}/>
                </Card>
                <Card>
                    <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 250 }} />
                </Card>
            </div>
        )
    }
}

export default List;