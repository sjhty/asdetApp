import React, { Component } from 'react'
import { Card, Table } from 'antd'
import BaseForm from '../../../components/baseForm'
import Api from '../../../../axios/api/productsApi'

class List extends Component {
    state = {}
    componentWillMount() {
      this.getData()
    }

    getData = () => { 
      Api.getCountAndProducts()
      .then((res) => {
        let list = res.data.map((item, index) => {
            item.key = index;
            return item;
        });
        this.setState({
          data: list
        })
      }).catch((err) => {
        console.log(err)
      })
    }

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
              title: '商品名称', width: 100, dataIndex: 'name', key: 'name', fixed: 'left', align: 'center',
            },
            {
              title: '商品分类', width: 100, dataIndex: 'category', key: 'category', align: 'center',
            },
            {
              title: '商品颜色', dataIndex: 'color', key: 'color', width: 150, align: 'center',
            },
            {
              title: '商品型号', dataIndex: 'type', key: 'type', width: 150, align: 'center',
            },
            {
              title: '商品尺码', dataIndex: 'size', key: 'size', width: 150, align: 'center',
            },
            {
              title: '商品售价', dataIndex: 'category.price', key: 'category.price', width: 150, align: 'center',
            },
            {
              title: '部长拿货价', dataIndex: 'category.minister_price', key: 'category.minister_price', width: 150, align: 'center',
            },
            {
              title: '理事拿货价', dataIndex: 'category.director_price', key: 'category.director_price', width: 150, align: 'center',
            },
            {
              title: '社长拿货价', dataIndex: 'category.president_price', key: 'category.president_price', width: 150, align: 'center',
            },
            { title: '商品库存', dataIndex: 'stock', key: 'stock', width: 150, align: 'center', },
            { title: '创建时间', dataIndex: 'created_at', key: 'created_at', width: 150, align: 'center',},
            {
              title: '操作',
              key: 'operation',
              fixed: 'right',
              width: 100,
              render: () => <span><a href="">修改</a><a href="">添加库存</a></span>,
            },
          ];

        return (
            <div>
                <Card>
                    <BaseForm formList={this.FormList} key={this.FormList}/>
                </Card>
                <Card>
                    <Table columns={columns} dataSource={this.state.data} scroll={{ x: 1500, y: 350 }} />
                </Card>
            </div>
        )
    }
}

export default List;