// 首页
import React, { Component } from 'react'
import Main from '../../components/Main/Main'
import Footer from '../../components/Footer/Footer'
// 引入封装的axios
import { getHome } from '../../Api/Api';
// 引入redux的connect和action
import { connect } from 'react-redux'
import { original, classify, paging } from '../../redux/actions'

import '../../common/font/iconfont.css'

class Home extends Component {

    state = {
        headline: '最新博文',
        currentPage: 1,
    }

    componentDidMount() {
        this.props.classify(this.state.headline)
        let obj = { params: { currentPage: this.state.currentPage } }
        getHome('home',obj).then((res) => {
            // console.log(res.data)
            let data = res.data.data
            let total = res.data.total
            this.props.paging(data, total)
        })
    }

    render() {

        return (
            <>
                {/* 主体 */}
                <Main />
                {/* 底部 */}
                <Footer />
            </>
        )
    }
}

export default connect(
    state => ({ data: state.backData }),
    { original, classify, paging }
)(Home)