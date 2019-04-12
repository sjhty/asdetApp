import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7001/asdet/api/';

// const instance = axios.create({
//     //当创建实例的时候配置默认配置
//     //xsrfCookieName: 'xsrf-token',
//     baseURL: 'http://localhost:7001/asdet/api/'
// });


//请求拦截处理
// instance.interceptors.request.use(function(config){
//     //添加当前请求到列表
//     requestList.push(config.url); 
//     //loading开始

// })


const request = function(url, params, method) {
    return new Promise((resolve,reject) => {
        axios[method](url, params)
        .then( response => {
            resolve(response.data)
        },err => {
            reject(err)
        }).catch( err => {
            reject(err)
        })
    })
}

const get = (url, params) => {
    return request(url, params, 'get');
}

const post = (url, params) => {
    return request(url, params, 'post');
}

export {get, post};