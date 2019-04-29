import React, { Component } from 'react'
import { Card, Table } from 'antd'
import BaseForm from '../../../components/baseForm'
import ProductsApi from '../../../../axios/api/productsApi'

class Cart extends Component {
    state = {}
    params = {}
    componentWillMount() {
        this.getProductData()
    }

    orderInfoList = [
        {
            type: 'INPUT',
            label: '收货人姓名',
            field: 'consignee',
            placeholder: '请输入收货人姓名',
            width: 150
        },
        {
            type: 'SELECT',
            label: '收货人级别',
            field: 'level',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [
                {id: '1', name: '顾客'},
                {id: '2', name: '部长'},
                {id: '3', name: '理事'},
                {id: '4', name: '社长'}
            ]
        },
        {
            type: 'INPUT',
            label: '代理商姓名',
            field: 'agent',
            placeholder: '请输入代理商姓名',
            width: 150
        },
        {
            type: 'BUTTON',
            label: '提交订单'
        }
    ]
    
    productInfoList = [
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
            initialValue: '0',
            width: 80,
            list: [
                {id: '1', name: 'A款'},
                {id: '2', name: 'B款'}
            ]
        },
        {
            type: 'SELECT',
            label: '尺码',
            field: 'size',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [
                {id: '1', name: 'S'},
                {id: '2', name: 'M'},
                {id: '3', name: 'L'},
                {id: '4', name: 'XL'},
                {id: '5', name: 'XXL'},
                {id: '6', name: 'XXXL'}
            ]
        },
        {
            type: 'BUTTON',
            label: '查询'
        }
    ]
    
    /**
     * 获取商品列表
     */
    getProductData = () => {
        ProductsApi.getCountAndProducts(this.params)
            .then((res) => {
                let list = [],type='',size='';
                res.data.map((item, index) => {
                    if (item.productType === '1') {
                        type = 'A款'
                    } else {
                        type = 'B款'
                    }
                    if (item.size === '1') {
                        size = 'S'
                    } else if (item.size === '2') {
                        size = 'M'
                    } else if (item.size === '3') {
                        size = 'L'
                    } else if (item.size === '4') {
                        size = 'XL'
                    } else if (item.size === '5') {
                        size = 'XXL'
                    } else if (item.size === '6') {
                        size = 'XXXL'
                    }
                    let dataObj = {
                        key: index,
                        name: item.name,
                        attribute: '【'+item.color+'】,'+type+' '+size,
                        stock: item.stock,
                        price: item.category.price,
                        minister_price: item.category.minister_price,
                        director_price: item.category.director_price,
                        president_price: item.category.president_price
                    }
                    list.push(dataObj)
                });
                this.setState({
                    productData: list
                })
            })
    }

    handleFilter = (params) => {
        this.params = params;
        this.getProductData();
    }

    
    render () {
        const orderColumns = [
            {
                title: '商品名称', width: 150, dataIndex: 'name', key: 'name', align: 'center',
            },
            {
                title: '商品属性', width: 150, dataIndex: 'attribute', key: 'attribute', align: 'center',
            },
            {
                title: '商品数量(件)', width: 100, dataIndex: 'num', key: 'num', align: 'center',
            },
            {
                title: '商品金额(元)', width: 100, dataIndex: 'price', key: 'price', align: 'center',
            },
            {
                title: '商品总金额(元)', width: 100, dataIndex: 'totalAmount', key: 'totalAmount', align: 'center',
            },
            {
                title: '操作',
                key: 'operation',
                width: 100,
                align: 'center',
                render: () => (<span><a href="###">修改</a><br></br><a href="###">删除</a></span>),
              },
        ]
        const productColumns = [
            {
                title: '商品名称', width: 150, dataIndex: 'name', key: 'name', align: 'center',
            },
            {
                title: '商品属性', width: 150, dataIndex: 'attribute', key: 'attribute', align: 'center',
            },
            {
                title: '商品库存(件)', width: 100, dataIndex: 'stock', key: 'stock', align: 'center',
            },
            {
                title: '商品售价(元)', width: 100, dataIndex: 'price', key: 'price', align: 'center',
            },
            {
                title: '部长拿货价(元)', dataIndex: 'minister_price', key: 'minister_price', width: 100, align: 'center',
            },
            {
                title: '理事拿货价(元)', dataIndex: 'director_price', key: 'director_price', width: 100, align: 'center',
            },
            {
                title: '社长拿货价(元)', dataIndex: 'president_price', key: 'president_price', width: 100, align: 'center',
            },
            {
                title: '操作',
                key: 'operation',
                width: 100,
                align: 'center',
                render: () => (<span><a href="###">加入购物车</a></span>),
              },
        ]
        return (
            <div>
                <Card title="【购物车】-订单信息">
                    <BaseForm formList={this.orderInfoList} key={this.orderInfoList}/>
                    <Table columns={orderColumns} dataSource={this.state.data} scroll={{y: 300 }} style={{marginTop: "20px"}}/>
                </Card>
                <Card title="下单商品列表">
                    <BaseForm formList={this.productInfoList} key={this.productInfoList} filterSubmit={this.handleFilter}/>
                    <Table columns={productColumns} dataSource={this.state.productData} scroll={{y: 300 }} style={{marginTop: "20px"}}/>
                </Card>
            </div>
        )
    }
}

export default Cart;