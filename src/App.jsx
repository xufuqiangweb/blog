import React, { Component } from 'react'

import Header from './Router/Header/Header'
import Backtop from './components/Backtop/Backtop'

import './common/css/Home.css'

export default class App extends Component {
    render() {
        return (
            <>
                {/* 背景 */}
                <div className="bg" />
                {/* 页头 */}
                <Header />
                {/* 返回顶部 */}
                <Backtop />
            </>
        )
    }
}
