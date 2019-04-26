import React, { Component } from 'react'
import { Row, Col, Breadcrumb } from 'antd'
import Sider from './components/sider'
import Header from './components/header'
import Footer from './components/footer'
import './index.less'

class Home extends Component {
    render () {
        return (
            <Row>
                <Sider />
                <Col span={20} offset={4} className="main_content">
                    <Header />
                    <Row className="con_box">
                        {this.props.children}
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        )
    }
}

export default Home
