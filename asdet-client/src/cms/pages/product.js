import React, { Component } from 'react';
import Api from '../../axios/api'

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: ''
        }
    }

    async getAll() {
        let response = await Api.getCountAndProducts();

        console.log(response)

        this.setState({
            result: response
        })
    }

    render () {
        return (
            <div>
                当前数据：{this.state.result}
                <button onClick={() => this.getAll()}>增加</button>
            </div>
        )
    }
}

export default Products;