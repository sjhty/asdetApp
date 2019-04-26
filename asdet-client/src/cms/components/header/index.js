import React, { Component } from 'react'
import { Row, Col, Breadcrumb } from 'antd'
import Utils from '../../../utils'
import LoginImg from '../../assets/images/login_img.jpg'
import '../header/index.less'

class Header extends Component {
    state = {}
    componentWillMount() {
        setInterval(() => {
            let nowTime = Utils.formateDate(new Date())
            this.setState({
                nowTime
            })
        },1000)
    }

    render () {
        return (
            <Row className="main_header">
                <Col className="header_con">
                    <Row className="header_up">
                        <Col span={19}></Col>
                        <Col span={5} className="user_info">
                            <span className="welcome_note">欢迎您，<b>一叶孤舟</b></span>
                            <span className="user_img"><img src={LoginImg}/></span>
                        </Col>
                    </Row>
                    <Row className="heaser_down">
                        <Col span={19} className="breadCrumb">
                            <Breadcrumb separator=">" className="bread_nav">
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                            </Breadcrumb>
                            <label></label>
                        </Col>
                        <Col span={5} className="show_time">
                            <span className="time">
                                {this.state.nowTime}
                            </span>
                            <span className="weather"></span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Header