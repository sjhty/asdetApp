import React, { Component } from 'react'
import { Card, Table, Button, Modal } from 'antd'
import BaseForm from '../../../components/baseForm'
import ProductsApi from '../../../../axios/api/productsApi'
import Utile from '../../../../utils'

class Cart extends Component {
    state = {}
    params = {}
    componentWillMount() {
        this.getProductData()
    }

    levelList = [
        {id: '1', name: '顾客'},
        {id: '2', name: '部长'},
        {id: '3', name: '理事'},
        {id: '4', name: '社长'}
    ]

    typeList = [
        {id: '1', name: 'A款'},
        {id: '2', name: 'B款'}
    ]

    sizeList = [
        {id: '1', name: 'S'},
        {id: '2', name: 'M'},
        {id: '3', name: 'L'},
        {id: '4', name: 'XL'},
        {id: '5', name: 'XXL'},
        {id: '6', name: 'XXXL'}
    ]

    colorList = [
        {id: '1', name: '黑色'},
        {id: '2', name: '红色'},
        {id: '3', name: '蓝色'},
        {id: '4', name: '灰色'},
        {id: '5', name: '肤色'},
        {id: '6', name: '粉色'},
    ]

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
            list: this.levelList
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
            field: 'productType',
            placeholder: '全部',
            initialValue: '0',
            width: 100,
            list: this.typeList
        },
        {
            type: 'SELECT',
            label: '尺码',
            field: 'size',
            placeholder: '全部',
            initialValue: '0',
            width: 100,
            list: this.sizeList
        },
        {
            type: 'BUTTON',
            label: '查询'
        }
    ]

    AddFormList = [
        {type: 'INPUT',label: '商品编号',field: 'id',placeholder: '请输入商品编号',width: 300,isEdit: true},
        {type: 'INPUT',label: '商品名称',field: 'name',placeholder: '请输入商品名称',width: 300,isEdit: true},
        {type: 'SELECT',label: '商品分类',field: 'category_id',placeholder: '全部',initialValue: '0',width: 300,list: [],isEdit: true},
        {type: 'SELECT',label: '商品型号',field: 'productType',placeholder: '全部',initialValue: '0',width: 300,list: this.state.productTypeList,isEdit: true},
        {type: 'SELECT',label: '商品尺码',field: 'size',placeholder: '全部',initialValue: '0',width: 300,list: this.state.sizeList,isEdit: true},
        {type: 'SELECT',label: '商品颜色',field: 'color',mode:'tags',placeholder: '请选择颜色',initialValue: '0',width: 300,list: this.state.colorList,isEdit: true},
        {type: 'SPAN',label: '商品图片',field: 'imgUrl'},
        {type: 'INPUT',label: '现有库存数量',field: 'newStock',placeholder: '请输入现有库存数量',width: 300,isEdit: true},
        {type: 'INPUT',label: '下单数量',field: 'stock',placeholder: '请输入下单数量',width: 300},
        {type: 'BUTTON',label: '添加',className: 'modal_form_btn'}
    ]
    
    /**
     * 获取商品列表
     */
    getProductData = () => {
        ProductsApi.getCountAndProducts(this.params)
            .then((res) => {
                let list = [];
                res.data.map((item, index) => {
                    let color = '',type = '',size = '';
                    let new_color = Utile.formateAttribute((item.color || "").split(','),this.colorList)
                    color = new_color.substr(0,new_color.length - 1)
                    type = Utile.formateAttribute(item.productType,this.typeList);
                    size = Utile.formateAttribute(item.size,this.sizeList);
                    let dataObj = {
                        key: index,
                        name: item.name,
                        attribute: '【'+color+'】,'+type+' '+size,
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


    //显示modal表单弹框
    showModal = (option,record) => {
        this.setState({
          visible: true,
          option
        })
        
    }
  
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
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
                render: ( text, item ) => {
                    return <span><Button size="small" onClick={ () => { this.showModal('edit',item) }}>加入购物车</Button></span>
                }
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
                <Modal title="购物车" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <BaseForm formList={this.AddFormList} key={this.AddFormList} filterSubmit={this.handleFilterUpdate}/>
                </Modal>
            </div>
        )
    }
}

export default Cart;