import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/store'
import './index.css';
import Router from './router'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.less';

// 监听state变化
// store.subscribe(() => {
//   console.log('store发生了变化');
// });

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
