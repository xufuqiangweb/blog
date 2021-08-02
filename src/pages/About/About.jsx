// 关于&留言
import React, { Component } from 'react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'
import Blogger from '../../components/Blogger/Blogger'
import Message from '../../components/Message/Message'

import './about.css'

export default class About extends Component {

    render() {
        return (
            <div className="about">
                <div className="inner">
                    {/* 页面左侧 */}
                    <Switch>
                        <Route path="/about/blogger" component={Blogger} />
                        <Route path="/about/message" component={Message} />
                        <Redirect to="/about/blogger"></Redirect>
                    </Switch>
                    {/* <Blogger /> */}
                    {/* <Message /> */}
                    <div className="page-right">
                        <NavLink activeClassName="cyan" to="/about/blogger">关于博主</NavLink>
                        <NavLink activeClassName="cyan" to="/about/message">留言联系</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
