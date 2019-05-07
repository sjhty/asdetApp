import React, { Component } from 'react'
import { HashRouter as Router, Route} from 'react-router-dom'
import App from './App'
import Manage from './cms'
import Home from './cms/pages/home'
import UserList from './cms/pages/user/list'
import AddProduct from './cms/pages/product/add'
import ProductList from './cms/pages/product/list'
import ProductCategory from './cms/pages/product/category'
import Cart from './cms/pages/order/cart'

class Routers extends Component {
    render () {
        return (
            <Router>
                <App>
                    <Route path="/manage" render={() => (
                        <Manage>
                            <Route path="/manage/home" component={Home}/>
                            <Route path="/manage/users/list" component={UserList}/>
                            <Route path="/manage/products/add" component={AddProduct}/>
                            <Route path="/manage/products/list" component={ProductList}/>
                            <Route path="/manage/products/category" component={ProductCategory}/>
                            <Route path="/manage/orders/cart" component={Cart}/>
                        </Manage>
                    )}/>
                </App>
            </Router>
        )
    }
}

export default Routers;