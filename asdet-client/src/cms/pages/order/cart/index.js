import React, { Component } from 'react'
import { Card, Table, Modal, Button, notification } from 'antd'
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

    requestFormList = []

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
            width: 100,
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
        {type: 'SPAN',label: '商品图片',field: 'imgUrl'},
        {type: 'INPUT',label: '商品名称',field: 'name',placeholder: '请输入商品名称',width: 300,isEdit: true},
        {type: 'INPUT',label: '商品规格',field: 'attribute',placeholder: '请输入商品规格',width: 300,isEdit: true},
        {type: 'INPUT',label: '商品价格',field: 'realPrice',placeholder: '请输入商品价格',width: 300,isEdit: true},
        {type: 'INPUT',label: '可售库存数量',field: 'stock',placeholder: '请输入现有库存数量',width: 300,isEdit: true},
        {type: 'INPUT',label: '下单数量',field: 'buy_num',placeholder: '请输入下单数量',width: 300},
        {type: 'BUTTON',label: '添加',className: 'modal_form_btn',resetBtn: 'hide'}
    ]

    orderData = []
    
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
                        imgUrl: item.imgUrl,
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

    addCart = (params) => {
        if (params.buy_num > params.stock) {
            notification['error']({
                message: '库存不足',
                description: '库存不足',
            });
        } else {
            let total = 0;
            params.totalAmount = Number(params.buy_num) * Number(params.realPrice);
            //params.stock = Number(params.stock) - Number(params.buy_num);
            if (this.orderData.length > 1) {
                this.orderData.splice(this.orderData.length - 1, 1);
            }
            this.orderData.push(params)
            this.orderData.map( (item) => {
                total += Number(item.totalAmount)
            })

            this.orderData.push({
                totalAmount: '总计：' + total
            })
            
            this.setState({
                orderData: this.orderData
            })

            this.params = params;
            this.handleCancel();
        }
        
    }

    deleteOrder = (index) => {
        debugger
        let total = 0;
        this.orderData.splice(index,1);
        if (this.orderData.length <= 1) {
            this.orderData = []
        } else {
            this.orderData.splice(this.orderData.length - 1, 1);
            this.orderData.map( (item) => {
                total += Number(item.totalAmount)
            })
    
            this.orderData.push({
                totalAmount: '总计：' + total
            })

        }
        this.setState({
            orderData: this.orderData
        })
    }

    setFieldToOption = (option,record) => {
        //debugger
        let fieldList = this.AddFormList;
        let level = this.formRef.getItemsValue()['level'];
        let newFieldList = [];
        if (record) {
          fieldList.map( (item, index) => {
            for (const key in record) {
                if (key === item.field) {
                    if (item.type === 'SPAN') {
                        let urlList = (record[key] || "").split(',')
                        item.initialValue = '<img src='+ urlList[0] +' style="width:50px;height:50px;"/>'
                    } else {
                        item.initialValue = record[key];
                    }
                    newFieldList.push(item);
                } 
            }
            if (!option) {
                if (item.field === 'realPrice') {
                    if (level === '1') {
                        item.initialValue = record['price'];
                    } else if (level === '2') {
                        item.initialValue = record['minister_price'];
                    } else if (level === '3') {
                        item.initialValue = record['director_price'];
                    } else {
                        item.initialValue = record['president_price'];
                    }
                    newFieldList.push(item);
                }
                if (item.field === 'buy_num' || item.type === 'BUTTON') {
                    newFieldList.push(item);
                }
            } else {
                if (item.type === 'BUTTON') {
                    item.label = '修改'
                    newFieldList.push(item);
                }
            }
            
            
          })
        }
        this.requestFormList = newFieldList;
      }

    //显示modal表单弹框
    showModal = (option,record) => {
        if (this.formRef.getItemsValue()['level'] === '0') {
            notification['info']({
                message: '请先填写收件人信息',
                description: '请先填写收件人信息',
            });
        } else {
            this.setState({
                visible: true
            })
            this.setFieldToOption(option,record)
        } 
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
        const orderColumns = [
            {
                title: '商品名称', width: 150, dataIndex: 'name', key: 'name', align: 'center', render: renderContent
            },
            {
                title: '商品属性', width: 150, dataIndex: 'attribute', key: 'attribute', align: 'center', render: renderContent
            },
            {
                title: '商品库存(件)', width: 100, dataIndex: 'stock', key: 'stock', align: 'center', render: renderContent
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
            {
                title: '操作',
                key: 'operation',
                width: 100,
                align: 'center',
                render: ( item, row, index ) => {
                    if (item.name) {
                        return <span>
                                <Button size="small" onClick={ () => { this.deleteOrder(index) }}>删除</Button>
                                <Button size="small" onClick={ () => { this.showModal('eidt',item) }}>修改</Button>
                            </span>
                    } else {
                        return ''
                    }
                    
                }
            },
            
        ]
        const productColumns = [
            {
                title: '商品图片', dataIndex: 'imgUrl', key: 'imgUrl', width: 150, align: 'center',
                render: (text) => {
                  if (text !== '' && text !== 'null') {
                    let urls = '',urlArr = (text || "").split(',');
                    urlArr.map( (item, index) => {
                      urls += '<img src='+item+' class="table_img" alt='+item+'/>'
                    })
                    return <span dangerouslySetInnerHTML={{__html: urls}}></span>
                  } else {
                    return ''
                  }
                }
            },
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
                    let isClick = false,buttonName = '加入购物车';
                    if (Number(item.stock) <= 0) {
                        isClick = true;
                        buttonName = '售罄'
                    }
                    return <span><Button size="small" disabled={isClick} onClick={ () => { this.showModal('',item) }}>{buttonName}</Button></span>
                }
              },
        ]
        return (
            <div>
                <Card title="【购物车】-订单信息">
                    <BaseForm formList={this.orderInfoList} key={this.orderInfoList} wrappedComponentRef={(form) => this.formRef = form}/>
                    <Table columns={orderColumns} dataSource={this.state.orderData} scroll={{y: 300 }} style={{marginTop: "20px"}}/>
                </Card>
                <Card title="下单商品列表">
                    <BaseForm formList={this.productInfoList} key={this.productInfoList} filterSubmit={this.handleFilter}/>
                    <Table columns={productColumns} dataSource={this.state.productData} scroll={{y: 300 }} style={{marginTop: "20px"}}/>
                </Card>
                <Modal title="购物车" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <BaseForm formList={this.requestFormList} key={this.requestFormList} filterSubmit={this.addCart} />
                </Modal>
            </div>
        )
    }
}

export default Cart;