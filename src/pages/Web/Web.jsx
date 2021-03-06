// Web前端
import React, { Component } from "react";
import { connect } from "react-redux";

import List from "@/components/List/List";
import Footer from "@/components/Footer/Footer";
// 引入封装的axios
import { getHome } from "@/api/Api";
// 引入redux的connect和action
import { original, classify, paging } from "@/redux/actions";

class Web extends Component {
  state = {
    headline: "Web前端",
    currentPage: 1,
  };

  componentDidMount() {
    this.props.classify(this.state.headline);
    let obj = { params: { currentPage: this.state.currentPage } };
    getHome("web", obj).then((res) => {
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
          <List />
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
})(Web);
