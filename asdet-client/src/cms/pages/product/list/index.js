import React, { Component } from 'react'
import { Card, Table, Modal, Button, notification } from 'antd'
import Moment from 'moment'
import BaseForm from '../../../components/baseForm'
import ProductApi from '../../../../axios/api/productsApi'
import CategoryApi from '../../../../axios/api/categoryApi'
import Utils from '../../../../utils'
import '../list/index.less'

class List extends Component {
    state = {
      params: {},
      visible: false,
      categoryList: [],
      productTypeList: [
          {id: '1', name: 'A款'},
          {id: '2', name: 'B款'}
      ],
      sizeList: [
        {id: '1', name: 'S'},
        {id: '2', name: 'M'},
        {id: '3', name: 'L'},
        {id: '4', name: 'XL'},
        {id: '5', name: 'XXL'},
        {id: '6', name: 'XXXL'},
      ],
      colorList: [
        {id: '1', name: '黑色'},
        {id: '2', name: '红色'},
        {id: '3', name: '蓝色'},
        {id: '4', name: '灰色'},
        {id: '5', name: '肤色'},
        {id: '6', name: '粉色'},
      ]
    }

    componentDidMount() {
      this.getProductList();
      this.getCategoryList();
    }

    AddFormList = [
      {type: 'INPUT',label: '商品编号',field: 'id',placeholder: '请输入商品编号',width: 300},
      {type: 'INPUT',label: '商品名称',field: 'name',placeholder: '请输入商品名称',width: 300},
      {type: 'SELECT',label: '商品分类',field: 'category_id',placeholder: '全部',initialValue: '0',width: 300,list: []},
      {type: 'SELECT',label: '商品型号',field: 'productType',placeholder: '全部',initialValue: '0',width: 300,list: this.state.productTypeList},
      {type: 'SELECT',label: '商品尺码',field: 'size',placeholder: '全部',initialValue: '0',width: 300,list: this.state.sizeList},
      {type: 'SELECT',label: '商品颜色',field: 'color',mode:'tags',placeholder: '请选择颜色',initialValue: '0',width: 300,list: this.state.colorList},
      {type: 'UPLOAD',label: '上传图片',field: 'imgUrl'},
      {type: 'SPAN',label: '商品图片',field: 'imgUrl'},
      {type: 'INPUT',label: '现有库存数量',field: 'newStock',placeholder: '请输入现有库存数量',width: 300},
      {type: 'INPUT',label: '入库数量',field: 'stock',placeholder: '请输入入库数量',width: 300},
      {type: 'BUTTON',label: '添加入库',className: 'modal_form_btn'}
    ]
    searchFormList = [
      {type: 'INPUT',label: '商品名称',field: 'name',placeholder: '请输入商品名称',width: 180},
      {type: 'SELECT',label: '商品型号',field: 'productType',placeholder: '全部',initialValue: '0',width: 150,list: this.state.productTypeList},
      {type: 'SELECT',label: '商品尺码',field: 'size',placeholder: '全部',initialValue: '0',width: 150,list: this.state.sizeList},
      {type: 'TIME_SELECT'},
      {type: 'BUTTON',label: '查询'}
    ];
    requestFormList = []

    /**
     * 获取商品列表
     */
    getProductList = () => { 
      ProductApi.getCountAndProducts(this.state.params)
        .then((res) => {
          res.data.map((item, index) => {
              item.key = index;
          })
          this.setState({
            data: res.data
          })
        }).catch((err) => {
          console.log(err)
        })
    }

    /**
     * 获取分类列表
     */
    getCategoryList = () => { 
      CategoryApi.getCategoryList()
      .then((res) => {
        let list = [];
        res.data.map((item, index) => {
            item.key = index;
            let obj = {
              id: item.id,
              name: item.name
            }
            list.push(obj)
        })
        this.setState({
            categoryList: list
        })
      }).catch((err) => {
        console.log(err)
      })
    }

    //根据操作按钮显示商品列表页表单组合
    setFieldToOption = (option, record) => {
      let fieldList = this.AddFormList;
      let newFieldList = [];
      if (option && record) {
        fieldList.map( (item, index) => {
          for (const key in record) {
            if (key === item.field) {
              if (item.field === 'category_id') {
                item.list = this.state.categoryList
              }
              if (item.type === 'SPAN') {
                let urlList = (record[key] || "").split(',')
                let imgUrl = '';
                urlList.map( (item, index) => {
                  imgUrl += '<img src='+ item +' style="width:50px;height:50px;"/>'
                })
                item.initialValue = imgUrl
              } else {
                item.initialValue = record[key];
              }
              if (option === 'edit') {
                item.isEdit = false;
                if (item.field === 'id') {
                  item.isEdit = true;
                }
                if (item.field !== 'newStock' && item.field !== 'stock' && item.type !== 'UPLOAD') {
                  newFieldList.push(item);
                }
                
              } else if (option === 'edit_stock' && item.type !== 'UPLOAD') {
                if (item.field !== 'stock') {
                  item.isEdit = true;
                }
                newFieldList.push(item);
              }
            }
            
          }

          if ( item.type === 'BUTTON' ) {
            item.resetBtn = 'hide';
            if (option === 'edit') {
              item.label = '修改'
            } else if (option === 'edit_stock') {
              item.label = '入库'
            }
            newFieldList.push(item);
          }
        })
      } else {
        fieldList.map( (item, index) => {
          if (item.type === 'SELECT') {
            item.initialValue = '0'
          } else {
            item.initialValue = ''
          }
          if (item.type === 'BUTTON') {
            item.label = '添加入库'
          }
          if (item.field === 'category_id') {
            item.list = this.state.categoryList
          }
          if (item.field !== 'newStock' && item.type !== 'SPAN' && item.field !== 'id') {
            newFieldList.push(item)
          }
        })
      }
      this.requestFormList = newFieldList;
    }

    handleFilter = (params) => {
      if (params.begin_time) {
        params.begin_time = Moment(params.begin_time).format('YYYY-MM-DD HH:mm:ss');
      }
      if (params.end_time) {
        params.end_time = Moment(params.end_time).format('YYYY-MM-DD HH:mm:ss');
      }
      this.setState({
        params:params
      })
      this.getProductList();
    }

    handleFilterUpdate = (params) => {
      params.stock = params.newStock ? Number(params.newStock) + Number(params.stock) : Number(params.stock);
      let url = '';
      if (params.imgUrl) {
        params.imgUrl.map( (item, index) => {
          url += item.response.url + ','
        })
        params.imgUrl = url.substring(0,url.length - 1);
      }

      ProductApi.updateProduct(params)
        .then( (res) => {
          if (res.success === true) {
            this.setState({
              visible: false,
            });
            if (this.state.option === 'edit') {
              notification['success']({
                message: '商品信息修改成功',
                description: '商品信息修改成功',
              });
            } else if (this.state.option === 'edit_stock') {
              notification['success']({
                message: '商品入库成功',
                description: '商品入库成功',
              });
            } else {
              notification['success']({
                message: '商品添加成功',
                description: '商品添加成功',
              });
            }
            this.setState({
              params:{}
            })
            this.getProductList();
          } else {
            alert('修改失败');
          }
        }).catch( (err) => {
          console.log(err);
        })
    }

    //显示modal表单弹框
    showModal = (option,record) => {
      this.setState({
        visible: true,
        option
      })
      this.setFieldToOption(option, record);

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
        const columns = [
          {
            title: '商品名称', width: 150, dataIndex: 'name', key: 'name', fixed: 'left', align: 'center',
          },
          {
            title: '商品图片', dataIndex: 'imgUrl', key: 'imgUrl', width: 150, align: 'center',
            render: (text) => {
              if (text !== '' && text !== 'null') {
                let urls = '',urlArr = (text || "").split(',');
                urlArr.map( (item) => {
                  urls += '<img src='+item+' class="table_img" alt='+item+'/>'
                })
                return <span dangerouslySetInnerHTML={{__html: urls}}></span>
              } else {
                return ''
              }
            }
          },
          {
            title: '商品分类', width: 150, dataIndex: 'category.name', key: 'category.name', align: 'center',
          },
          {
            title: '商品颜色', dataIndex: 'color', key: 'color', width: 100, align: 'center',
            render: (text) => {
              const new_text = Utils.formateAttribute((text || "").split(','), this.state.colorList)
              return new_text.substr(0, new_text.length - 1)
            }
          },
          {
            title: '商品型号', dataIndex: 'productType', key: 'productType', width: 100, align: 'center',
            render: (text) => {
              return Utils.formateAttribute(text,this.state.productTypeList)
            },
          },
          {
            title: '商品尺码', dataIndex: 'size', key: 'size', width: 100, align: 'center',
            render: (text) => {
              return Utils.formateAttribute(text,this.state.sizeList)
            }
          },
          {
            title: '商品售价', dataIndex: 'category.price', key: 'category.price', width: 100, align: 'center',
          },
          {
            title: '部长拿货价', dataIndex: 'category.minister_price', key: 'category.minister_price', width: 100, align: 'center',
          },
          {
            title: '理事拿货价', dataIndex: 'category.director_price', key: 'category.director_price', width: 100, align: 'center',
          },
          {
            title: '社长拿货价', dataIndex: 'category.president_price', key: 'category.president_price', width: 100, align: 'center',
          },
          { title: '商品库存', dataIndex: 'stock', key: 'stock', width: 100, align: 'center', },
          { 
            title: '创建时间', 
            dataIndex: 'created_at', 
            key: 'created_at', 
            width: 150, 
            align: 'center',
            render: (text) => 
              <span>{Moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
            
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            align: 'center',
            render: ( text, item ) => {
              return <span><Button size="small" onClick={ () => { this.showModal('edit',item) }}>修改</Button><Button size="small" onClick={ () => { this.showModal('edit_stock',item) }}>入库</Button></span>
            }
          },
        ]
        return (
            <div>
                <Card className="search_condition">
                    <BaseForm formList={this.searchFormList} key={this.searchFormList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card className="table_data">
                    <Button type="primary" onClick={ () => { this.showModal() }} >添加商品</Button>
                    <Table columns={columns} dataSource={this.state.data} scroll={{ x: 1400, y: 500 }}/>
                </Card>
                <Modal title="添加库存" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <BaseForm formList={this.requestFormList} key={this.requestFormList} filterSubmit={this.handleFilterUpdate}/>
                </Modal>
            </div>
        )
    }
}

export default List;