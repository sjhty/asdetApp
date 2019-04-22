import React, { Component } from 'react'
import { Row, Col } from 'antd'
import '../header/index.less'

class Header extends Component {
    render () {
        return (
            <Row className="main_header">
                <Col className="header_con">
                    头部
                </Col>
            </Row>
        )
    }
}

export default Header