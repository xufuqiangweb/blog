// 头部
import React, { Component } from 'react'

import { NavLink, Route, Switch } from 'react-router-dom'

import Home from '../../pages/Home/Home'
import Web from '../../pages/Web/Web'
import Engineering from '../../pages/Engineering/Engineering'
import Service from '../../pages/Service/Service'
import Database from '../../pages/Database/Database'
import Software from '../../pages/Software/Software'
import About from '../../pages/About/About'
import Detail from '../../pages/Detail/Detail'

import './Header.css'
export default class Header extends Component {
    render() {
        return (
            <>
                <header>
                    {/* 导航条 */}
                    <nav className="inner">
                        {/* logo */}
                        <div className="logo">
                            <img src="/img/yuluo.png" alt="图片" />
                        </div>
                        {/* 导航栏 */}
                        <ul className="nav">
                            <li><NavLink activeClassName="selected" exact to="/">首页</NavLink></li>
                            <li><NavLink activeClassName="selected" exact to="/web">Web前端</NavLink></li>
                            <li><NavLink activeClassName="selected" exact to="/engineering">前端工程化</NavLink></li>
                            <li><NavLink activeClassName="selected" exact to="/service">服务端</NavLink></li>
                            <li><NavLink activeClassName="selected" exact to="/database">数据库</NavLink></li>
                            <li><NavLink activeClassName="selected" exact to="/software">软件&amp;工具</NavLink></li>
                            <li><NavLink activeClassName="selected" to="/about">关于&amp;留言</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/web" exact component={Web} />
                    <Route path="/engineering" exact component={Engineering} />
                    <Route path="/service" exact component={Service} />
                    <Route path="/database" exact component={Database} />
                    <Route path="/software" exact component={Software} />
                    <Route path="/about" component={About} />
                    <Route path="/detail" exact component={Detail} />
                </Switch>
            </>
        )
    }
}
