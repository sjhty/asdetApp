import React, { Component } from 'react'
import { Card, Table } from 'antd'

class Category extends Component {

    render () {
        const renderContent = (value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            if (index === 19) {
              obj.props.colSpan = 0;
            }
            return obj;
        };
        const columns = [
            {
                title: 'name', 
                width: 100, 
                dataIndex: 'name', 
                key: 'name', 
                align: 'right',
                render: renderContent,
            },
            {
                title: 'price', width: 100, dataIndex: 'price', key: 'price', align: 'right', render: renderContent,
            },
            {
                title: 'num', width: 100, dataIndex: 'num', key: 'num', align: 'right', render: renderContent,
            },
            {
                title: 'total', 
                width: 100,
                dataIndex: 'total', 
                key: 'total', 
                align: 'right', 
                render: (text, row, index) => {
                    if (index < 20) {
                      return <a href="###">{text}</a>;
                    }
                    return {
                      children: <a href="###">{text}</a>,
                      props: {
                        colSpan: 5,
                      },
                    };
                  },
            }
        ]
        const data = [];
        let total = 0;
        for (let i = 1; i < 20; i++) {
            const ObjDate = {
                key: i,
                name: `商品 ${i}`,
                price: i*100,
                num: i,
                total: 0
            }
            ObjDate.total = ObjDate.price * ObjDate.num
            total += ObjDate.total;
            data.push(ObjDate);
        }
        data.push({
            total: '合计：'+total
        })
        return (
            <Card>
                <Table columns={columns} dataSource={data} />
            </Card>
        )
    }
}

export default Category;