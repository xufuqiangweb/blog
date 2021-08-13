// 首页
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Carousel from "@/components/Carousel";
import Article from "@/components/Article/Article";
import Popular from "@/components/Popular/Popular";
import Recommend from "@/components/Recommend/Recommend";
import Rank from "@/components/Rank/Rank";
import Footer from "@/components/Footer/Footer";
// 引入封装的axios
import { getHome } from "@/api/Api";
// 引入redux的connect和action
import { original, classify, paging } from "@/redux/actions";

import "@/common/font/iconfont.css";

class Home extends Component {
  state = {
    headline: "最新博文",
    currentPage: 1,
  };

  componentDidMount() {
    this.props.classify(this.state.headline);
    let obj = { params: { currentPage: this.state.currentPage } };
    getHome("home", obj).then((res) => {
      // console.log(res.data)
      let data = res.data.data;
      let total = res.data.total;
      this.props.paging(data, total);
    });
  }

  render() {
    return (
      <>
        {/* 主体 */}
        <main>
          <div className="inner">
            {/* 主栏 */}
            <div className="column">
              {/* 轮播图 */}
              <Carousel />
              {/* 最新博文 */}
              <div className="article-module mt20">
                <h1 className="h1">{this.props.headline}</h1>
                {/* 文章 */}
                <Article />
              </div>
            </div>
            {/* 侧栏 */}
            <div className="sidebar">
              {/* 名片 */}
              <div className="card">
                <h1>我的名片</h1>
                <p>网名：雨落</p>
                <p>职业：Web前端开发工程师</p>
                <p>现居：江西省-南昌市</p>
                <p>Email：1145152143@qq.com</p>
                {/* 联系方式 */}
                <ul className="contact">
                  <li>
                    <NavLink to="/">
                      <img src="img/c01.png" alt="首页" title="首页" />
                    </NavLink>
                  </li>
                  <li>
                    <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=opOTlpeTl5CTlpHi09OMwc3P">
                      <img src="img/c02.png" alt="我的邮箱" title="我的邮箱" />
                    </a>
                  </li>
                  <li>
                    <a href="tencent://message/?Menu=yes&uin=1927560385&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45">
                      <img src="img/c03.png" alt="QQ联系我" title="QQ联系我" />
                    </a>
                  </li>
                  <li>
                    <img className="weixin" src="/img/weixin.png" alt="微信" />
                    <a href="/">
                      <img
                        src="img/c04.png"
                        alt="关注我的微信"
                        title="关注我的微信"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              {/* 热门标签 */}
              <Popular />
              {/* 推荐文章 */}
              <Recommend />
              {/* 点击排名 */}
              <Rank />
              {/* 赞助开发 */}
              <div className="sponsor mt20">
                <span>赞助开发</span>
                <h2>支持一下作者</h2>
                <div className="sponsor-txt">
                  <p>
                    请留下赞助人姓名和联系人方式，如需帮助，我会优先解决您的问题！
                  </p>
                  <p>您的支持是我最大的动力！</p>
                  <img src="img/sponsor.png" alt="图片" />
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* 底部 */}
        <Footer />
      </>
    );
  }
}

export default connect((state) => ({ data: state.backData }), {
  original,
  classify,
  paging,
})(Home);
