import React, { Component } from 'react'
import { HashRouter as Router, Route} from 'react-router-dom'
import App from './App'
import Manage from './cms'
import UserList from './cms/pages/user/list'
import ProductList from './cms/pages/product/list'

class Routers extends Component {
    render () {
        return (
            <Router>
                <App>
                    <Route path="/manage" render={() => 
                        <Manage>
                            <Route path="/manage/users/list" component={UserList}/>
                            <Route path="/manage/products/list" component={ProductList}/>
                        </Manage>
                    }/>
                </App>
            </Router>
        )
    }
}

export default Routers;