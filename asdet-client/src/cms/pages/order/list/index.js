import React, { Component } from 'react'
import Moment from 'moment'
import OrdersApi from '../../../../axios/api/ordersApi'
import { Card, Table, Modal, Button, notification } from 'antd'
import Utils from '../../../../utils'
import BaseForm from '../../../components/baseForm'

class List extends Component {

    state = {
        params: {}
    }

    levelList = [
        {id: '1', name: '顾客'},
        {id: '2', name: '部长'},
        {id: '3', name: '理事'},
        {id: '4', name: '社长'}
    ]
    searchFormList = [
        {type: 'INPUT',label: '收件人',field: 'consignee',placeholder: '请输入收件人',width: 180},
        {type: 'SELECT',label: '收货人级别',field: 'level',placeholder: '全部',initialValue: '0',width: 180,list: this.levelList},
        {type: 'INPUT',label: '代理商姓名',field: 'agent',placeholder: '请输入代理商姓名',width: 180},
        {type: 'TIME_SELECT'},
        {type: 'BUTTON',label: '查询'}
    ]

    componentWillMount() {
        this.getOrderList()
    }

    getOrderList = () => {
        OrdersApi.getAllList(this.state.params)
            .then( (res) => {
                if (res.success === true) {
                    this.setState({
                        orderData: res.data
                    })
                }
            })
    }

    orderDetail = (record) => {
        let felidList = this.searchFormList
        let orderDetailList = []
        felidList.map( (item) => {
            for (const key in record) {
                if (item.field === key) {
                    item.type = 'SPAN'
                    if (key === 'level') {
                        item.initialValue = Utils.formateAttribute(record[key],this.levelList)
                    } else {
                        item.initialValue = record[key]
                    }
                    
                    orderDetailList.push(item)
                }
            }
            
        })
        this.setState({
            visible: true,
            orderDetailList,
            productData: JSON.parse(record.orderData)
        })
    }

    handleOk = (e) => {
        this.setState({
            visible: false
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    }

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
        const productColumns = [
            {
                title: '商品名称', width: 150, dataIndex: 'name', key: 'name', align: 'center', render: renderContent
            },
            {
                title: '商品属性', width: 150, dataIndex: 'attribute', key: 'attribute', align: 'center', render: renderContent
            },
            {
                title: '商品数量(件)', width: 100, dataIndex: 'buy_num', key: 'buy_num', align: 'center', render: renderContent
            },
            {
                title: '商品金额(元)', width: 100, dataIndex: 'realPrice', key: 'relPrice', align: 'center', render: renderContent
            },
            {
                title: '商品总金额(元)', width: 100, dataIndex: 'totalAmount', key: 'totalAmount', align: 'center',
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
            },
            
        ]
        const orderColumns = [
            {
                title: '订单编号', width: 80, dataIndex: 'id', key: 'id', align: 'center'
            },
            {
                title: '收件人姓名', width: 150, dataIndex: 'consignee', key: 'consignee', align: 'center'
            },
            {
                title: '收件人级别', width: 150, dataIndex: 'level', key: 'level', align: 'center', 
                render: ( item, row, index ) => {
                    return Utils.formateAttribute(item,this.levelList)
                }
            },
            {
                title: '上级代理商姓名', width: 100, dataIndex: 'agent', key: 'agent', align: 'center'
            },
            {
                title: '订单总金额（元）', width: 100, dataIndex: 'orderData', key: 'orderData', align: 'center',
                render: ( text, row, index ) => {
                    let data = text ? JSON.parse(text) : []
                    if (data.length > 0) {
                        let totalAmount = data[data.length - 1].totalAmount
                        return (totalAmount || "").split('：')[1]
                    } else {
                        return '0'
                    }
                    
                }
            },
            {
                title: '下单时间', width: 100, dataIndex: 'created_at', key: 'created_at', align: 'center',
                render: (text) => 
                    <span>{Moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
                title: '操作',
                key: 'operation',
                width: 100,
                align: 'center',
                render: ( text, row, index ) => {
                        return  <span>
                                    <Button size="small" onClick={ () => { this.orderDetail(text) }}>查看详情</Button>
                                </span>
                    
                    
                }
            },
            
        ]
        return (
            <div>
                <Card className="search_condition">
                    <BaseForm formList={this.searchFormList} key={this.searchFormList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card title="订单列表">
                    <Table columns={orderColumns} dataSource={this.state.orderData} scroll={{y: 300 }} style={{marginTop: "20px"}}/>
                </Card>
                <Modal title="订单详情" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null} width='100'>
                    <BaseForm formList={this.state.orderDetailList} key={this.state.orderDetailList}/>
                    <Table columns={productColumns} dataSource={this.state.productData} scroll={{y: 300 }} style={{marginTop: "20px"}}/>
                </Modal>
            </div>
            
        )
    }
}

export default List