import React, { Component } from 'react'
import { Row, Col } from 'antd'
import '../sider/index.less'

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
                    
                </Row>
            </Col>
        )
    }
}

export default Sider