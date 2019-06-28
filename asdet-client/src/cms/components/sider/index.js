import React, { Component } from 'react'
import { Row, Col, Menu, Icon } from 'antd'
import MenuConfig from './menuConfig'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../../store/home/action'
import './index.less'

const SubMenu = Menu.SubMenu

class Sider extends Component {

    state = {
        currentKey: ''
    }

    handleLink = ( { item, key } ) => {
        if (key === this.state.currentKey) {
            return false;
        }

        const { dispatch } = this.props;
        //console.log(item)
        dispatch(switchMenu(item.props.title));

        this.setState({
            currentKey: key
        })
    }


    componentWillMount() {
        const menuTree = this.renderMenu(MenuConfig);

        this.setState({
            menuTree
        })
    }

    /**
     * 渲染左侧菜单导航
     */
    renderMenu = (data) => {
        return data.map((item) =>{
            if (item.children) {
                return (
                    <SubMenu title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} key={item.url}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }

            return  <Menu.Item key={item.url} title={item.title}>
                        <NavLink to={item.url}>
                        {
                            item.icon ? 
                                <span><Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span> : 
                                <span>{item.title}</span>
                        }
                        </NavLink>
                    </Menu.Item>
        })
    }

    render () {
        return (
            <Col span={4} style={{position: "fixed"}}>
                <Row className="asdet_logo">
                    <Col>
                        <span className="logo chin_logo">雅茜•优艾</span>
                        <span className="logo eng_logo">ASDET</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Menu theme="dark" onClick={this.handleLink}>
                            {this.state.menuTree}
                        </Menu>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default connect()(Sider)