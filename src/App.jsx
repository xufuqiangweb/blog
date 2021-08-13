import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import router from "@/router/router";
import Backtop from "@/components/Backtop/Backtop";
import Detail from "@/pages/Detail/Detail";

import "@/common/css/common.css";
import "@/common/css/App.css";

export default class App extends Component {
  render() {
    return (
      <>
        {/* 导航条 */}
        <header>
          <nav className="inner">
            {/* logo */}
            <div className="logo">
              <img src="/img/yuluo.png" alt="图片" />
            </div>
            {/* 导航栏 */}
            <ul className="nav">
              {router.map((item) => {
                return (
                  <li key={item.title}>
                    <NavLink
                      activeClassName="selected"
                      exact={item.exact}
                      to={item.path}>
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
        <Switch>
          {router.map((item) => {
            return (
              <Route
                path={item.path}
                exact={item.exact}
                component={item.component}
                key={item.path}></Route>
            );
          })}
          <Route path="/detail" exact component={Detail} />
        </Switch>

        {/* 背景 */}
        <div className="bg" />

        {/* 返回顶部 */}
        <Backtop />
      </>
    );
  }
}
