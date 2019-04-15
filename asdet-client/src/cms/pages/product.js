import React, { Component } from 'react';
import Api from '../../axios/api/productsApi'

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
            result: response.data.count
        })
    }

    async getProductById() {
        let params = {
            id: 1
        }
        let response = await Api.getProductsById(params);

        console.log(response)

        // this.setState({
        //     result: response.data.count
        // })
    }

    render () {
        return (
            <div>
                当前数据：{this.state.result}
                <button onClick={() => this.getProductById()}>增加</button>
            </div>
        )
    }
}

export default Products;