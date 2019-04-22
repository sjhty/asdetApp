import React, { Component } from 'react'
import { Row, Col, Breadcrumb } from 'antd'
import Sider from '../../components/sider'
import Header from '../../components/header'
import Footer from '../../components/footer'
import '../home/index.less'

class Home extends Component {
    render () {
        return (
            <div>
                <Row>
                    <Sider></Sider>
                    <Col span={20} className="main_content">
                        <Header></Header>
                        <Breadcrumb separator=">" className="bread_nav">
                            <span>当前位置：</span>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row className="con_box">
                            <Col>内容</Col>
                        </Row>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home
