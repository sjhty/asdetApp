import React, { Component } from 'react'
import { Card, Table, Modal, Button, notification } from 'antd'
import Moment from 'moment'
import BaseForm from '../../../components/baseForm'
import Api from '../../../../axios/api/productsApi'
import '../list/index.less'

class List extends Component {
    state = {
      params: {},
      visible: false,
    }
    requestFormList = []
    FormList = [
        {
            type: 'INPUT',
            label: '商品名称',
            field: 'name',
            placeholder: '请输入商品名称',
            width: 180
        },
        {
            type: 'SELECT',
            label: '商品型号',
            field: 'productType',
            placeholder: '全部',
            initialValue: '0',
            width: 150,
            list: [
                {id: '1', name: 'A款'},
                {id: '2', name: 'B款'}
            ]
        },
        {
            type: 'SELECT',
            label: '商品尺码',
            field: 'size',
            placeholder: '全部',
            initialValue: '0',
            width: 150,
            list: [
              {id: '1', name: 'S'},
              {id: '2', name: 'M'},
              {id: '3', name: 'L'},
              {id: '4', name: 'XL'},
              {id: '5', name: 'XXL'},
              {id: '6', name: 'XXXL'},
            ]
        },
        {
            type: 'TIME_SELECT'
        },
        {
            type: 'BUTTON',
            label: '查询'
        }
    ];
    componentDidMount() {
      this.getData()
    }

    getData = () => { 
      Api.getCountAndProducts(this.state.params)
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

    handleFilter = (params) => {
      this.state.params = params;
      this.getData();
    }

    handleFilterUpdate = (params) => {
      this.state.params = params;
      Api.updateProduct(this.state.params)
        .then( (res) => {
          if (res.success === true) {
            this.setState({
              visible: false,
            });
            notification['success']({
              message: '商品入库成功',
              description: '新入库商品【'+this.state.params.newStock+'】件，现有库存【'+res.data.stock+'】件',
            });
            this.getData();
          } else {
            alert('修改失败');
          }
        }).catch( (err) => {
          console.log(err);
        })
    }

    showModal = (record) => {
      this.requestFormList = [];
      this.setState({
        visible: true,
      });

      for (const key in record) {
        let formObj = {
            type: '',
            label: '',
            field: '',
            width: 300
        }
        if (key === 'id') {
          formObj.type = 'INPUT';
          formObj.label = '商品编号';
          formObj.field = key;
          formObj.disabled = true;
          formObj.initialValue = record[key];
          this.requestFormList.push(formObj)
        }
        if (key === 'name') {
          formObj.type = 'INPUT';
          formObj.label = '商品名称';
          formObj.field = key;
          formObj.disabled = true;
          formObj.initialValue = record[key];
          this.requestFormList.push(formObj)
        }
        if (key === 'productType') {
          formObj.type = 'SELECT';
          formObj.label = '商品型号';
          formObj.field = key;
          formObj.disabled = true;
          formObj.initialValue = record[key];
          formObj.list = [
            {id: '1', name: 'A款'},
            {id: '2', name: 'B款'}
          ]
          this.requestFormList.push(formObj)
        }
        if (key === 'size') {
          formObj.type = 'SELECT';
          formObj.label = '商品尺码';
          formObj.field = key;
          formObj.disabled = true;
          formObj.initialValue = record[key];
          formObj.list = [
            {id: '1', name: 'S'},
            {id: '2', name: 'M'},
            {id: '3', name: 'L'},
            {id: '4', name: 'XL'},
            {id: '5', name: 'XXL'},
            {id: '6', name: 'XXXL'},
          ]
          this.requestFormList.push(formObj)
        }
        if (key === 'stock') {
          formObj.type = 'INPUT';
          formObj.label = '商品现有库存';
          formObj.field = key;
          formObj.disabled = true;
          formObj.initialValue = record[key];
          this.requestFormList.push(formObj)
        }
      }

      this.requestFormList.push({
          type: 'INPUT',
          label: '入库数量',
          field: 'newStock',
          placeholder: '请输入入库数量',
          width: 300
      },{
          type: 'BUTTON',
          label: '添加入库',
          resetBtn: 'hide',
          className: 'modal_form_btn' 
      })

      console.log(this.requestFormList)
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
            title: '商品分类', width: 150, dataIndex: 'category.name', key: 'category.name', align: 'center',
          },
          {
            title: '商品颜色', dataIndex: 'color', key: 'color', width: 100, align: 'center',
          },
          {
            title: '商品型号', dataIndex: 'productType', key: 'productType', width: 100, align: 'center',
            render: (text) => {

              if (text === '1') {
                  return 'A款';
              } else {
                  return 'B款';
              }
            },
          },
          {
            title: '商品尺码', dataIndex: 'size', key: 'size', width: 100, align: 'center',
            render: (text) => {
              if (text === '1') {
                  return 'S'
              } else if (text === '2'){
                  return 'M'
              } else if (text === '3'){
                  return 'L'
              } else if (text === '4'){
                  return 'XL'
              } else if (text === '5'){
                  return 'XXL'
              } else if (text === '6'){
                  return 'XXXL'
              }
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
              return <span><Button size="small" onClick={ () => { this.showModal(item) }}>修改</Button><Button size="small" onClick={ () => { this.showModal(item) }}>入库</Button></span>
            }
          },
        ]
        return (
            <div>
                <Card className="search_condition">
                    <BaseForm formList={this.FormList} key={this.FormList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card className="table_data">
                    <Button type="primary">添加商品</Button>
                    <Table columns={columns} dataSource={this.state.data} scroll={{ x: 1250, y: 500 }}/>
                </Card>
                <Modal title="添加库存" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <BaseForm formList={this.requestFormList} key={this.requestFormList} filterSubmit={this.handleFilterUpdate}/>
                </Modal>
            </div>
        )
    }
}

export default List;