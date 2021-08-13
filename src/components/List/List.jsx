// 其他页面主体
import React, { Component } from "react";
import { connect } from "react-redux";

import Article from "@/components/Article/Article";
import Popular from "@/components/Popular/Popular";
import Recommend from "@/components/Recommend/Recommend";
import Rank from "@/components/Rank/Rank";
import { getHome } from "@/api/Api";
import { original, classify, paging } from "@/redux/actions";

class List extends Component {
  state = {
    value: "",
    currentPage: 1,
  };

  // 搜索框受控组件的value获取事件
  HandleSearch = (e) => {
    // console.log(value)
    this.setState({ value: e.target.value });
  };

  // 搜索框键盘事件
  HandleConfirmSearch = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.trim() === "") {
        alert("搜索框不能为空");
      } else {
        let obj = {
          params: {
            search: this.state.value,
            currentPage: 1,
          },
        };
        this.props.classify("搜索结果");
        getHome("search", obj).then((res) => {
          // console.log(res.data)
          let data = res.data.data;
          let total = res.data.total;
          this.props.paging(data, total);
        });
        this.setState({
          value: "",
        });
      }
    }
  };

  render() {
    return (
      <div className="inner">
        {/* 文章 */}
        <div className="column">
          <div className="article-module">
            <h1 className="h1">{this.props.headline}</h1>
            {/* 文章 */}
            <Article />
          </div>
        </div>
        {/* 侧栏 */}
        <div className="sidebar">
          {/* 关注博客 */}
          <div className="attention">
            <h1 className="h1">关注博客</h1>
          </div>
          {/* 搜索 */}
          <div className="search">
            <input
              type="search"
              placeholder="请输入关键词"
              value={this.state.value}
              onChange={this.HandleSearch}
              onKeyDown={this.HandleConfirmSearch}
            />
          </div>
          {/* 热门标签 */}
          <Popular />
          {/* 推荐文章 */}
          <Recommend />
          {/* 点击排名 */}
          <Rank />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ headline: state.classify }), {
  original,
  classify,
  paging,
})(List);
