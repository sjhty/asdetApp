import React, { Component } from 'react'
import { Row, Col } from 'antd'
import '../footer/index.less'

class Footer extends Component {
    render () {
        return (
            <Row className="main_footer">
                <Col>
                Ant Design ©2018 Created by Ant UED
                </Col>
            </Row>
        )
    }
}

export default Footer