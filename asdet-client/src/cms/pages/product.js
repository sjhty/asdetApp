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

    async addProduct() {
        let params = {
            name: "测试1",
            category_id: 2,
            attribute: "ceshi 2",
            imgUrl: "imgUrl",
            stock: 5
        }

         await Api.addProduct(params)

        //console.log(response)
    }

    async updateProduct() {
        let params = {
            id: 30,
            name: "测试1测试1测试1测试1测试1",
            category_id: 2,
            attribute: "ceshi 2",
            imgUrl: "imgUrl",
            stock: 5
        }

        await Api.updateProduct(params)
    }

    async deleteProduct() {
        let params = {
            id: 30
        }

        await Api.deleteProduct(params)
    }

    render () {
        return (
            <div>
                <input type="text" />
                当前数据：{this.state.result}
                <button onClick={() => this.deleteProduct()}>增加</button>
            </div>
        )
    }
}

export default Products;