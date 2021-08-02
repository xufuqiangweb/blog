// 首页主体
import React, { Component } from 'react'
import Column from './Column/Column'
import Sidebar from './Sidebar/Sidebar'

export default class Main extends Component {
    render() {
        return (
            <main>
                <div className="inner">
                    {/* 栏目 */}
                    <Column />
                    {/* 侧栏 */}
                    <Sidebar />
                </div>
            </main>
        )
    }
}
