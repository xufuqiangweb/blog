// 引入react核心库
import React from 'react'
// 引入ReactDom
import ReactDom from 'react-dom'
// 引入HashRouter，用于路由
import { HashRouter as Router } from 'react-router-dom'
// 引入App组件
import App from './App'
// 引入store
import { Provider } from 'react-redux'
import store from './redux/store'

// 渲染App到页面
ReactDom.render(
    /* 此处需要用到Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
    <Provider store={store}>
        <Router><App /></Router>
    </Provider>,
    document.getElementById('root')
)