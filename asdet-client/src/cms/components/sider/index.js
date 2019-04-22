import React, { Component } from 'react'
import { Row, Col, Menu, Icon } from 'antd'
import '../sider/index.less'

const SubMenu = Menu.SubMenu

class Sider extends Component {
    render () {
        return (
            <Col span={4} className="nav_sider">
                <Row className="asdet_logo">
                    {/* <Col>
                        <span className="logo chin_logo">雅茜•优艾</span>
                        <span className="logo eng_logo">ASDET</span>
                    </Col> */}
                </Row>
                <Row>
                    <Col>
                        <Menu theme="dark">
                            <Menu.Item><span><Icon type="home"/><span>首页</span></span></Menu.Item>
                            <SubMenu title={<span><Icon type="user"/><span>商品管理</span></span>}>
                                <Menu.Item>商品列表</Menu.Item>
                                <Menu.Item>商品分类</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default Sider