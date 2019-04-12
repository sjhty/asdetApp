import React, { Component } from 'react';
const API = require('../../axios/api')

class Products extends Component {
    // constructor(props) {
    //     this.getAll();
    // };

    async getAll() {
        let response = await API.getCountAndProducts()

        console.log(response)

        let productList = response.data.map((item) => {
            //item.hasFollow = false
            return item
        });
        this.setState({
            productList
        })
    }

    render () {
        return (
            <div>
                {this.state.productList}
            </div>
        )
    }
}

export default Products;