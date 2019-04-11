import React, { Component } from 'react';
import API from '../../axios/api'

class Products extends Component {

    async getAll() {
        let response = await API.getCountAndProducts()

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