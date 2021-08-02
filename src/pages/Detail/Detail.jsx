// 博文详情
import React, { Component } from 'react'

import Comment from '../../components/Comment/Comment'
import Recommend from '../../components/Recommend/Recommend'
import Rank from '../../components/Rank/Rank'
import Footer from '../../components/Footer/Footer'

import { getHome } from '../../Api/Api'
import ReactMarkdown from 'react-markdown'

import qs from 'querystring'
import { connect } from 'react-redux'
import { detail, comment } from '../../redux/actions'

import './Detail.css'

class Detail extends Component {

    state = {
        id: "",
        article: "",
        title: ""
    }

    componentDidMount() {
        let ordId = this.props.location.search
        let newId = qs.parse(ordId.slice(1))
        let id = newId.id
        this.setState({ id })
        let obj = { params: { id } }
        getHome("detail", obj).then((res) => {
            let result = res.data
            // console.log(result[0].article)
            this.setState({
                article: result[0].article,
                title: result[0].title
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        let ordId = nextProps.location.search
        let newId = qs.parse(ordId.slice(1))
        let id = newId.id
        this.setState({ id })
        let obj = { params: { id } }
        getHome("detail", obj).then((res) => {
            let result = res.data
            // console.log(result[0].article)
            this.setState({
                article: result[0].article,
                title: result[0].title
            })
        })
    }

    render() {
        return (
            <>
                {/* 主体 */}
                <main>
                    <div className="inner">
                        {/* 栏目 */}
                        <div className="column" style={{ background: "#fff" }}>
                            <div className="article-header">
                                <h2>{this.state.title}</h2>
                            </div>
                            <div className="article-content">
                                <ReactMarkdown>
                                    {this.state.article}
                                </ReactMarkdown>
                            </div>
                            {/* 评论 */}
                            <Comment sid={this.state.id} title={this.state.title} />
                        </div>
                        {/* 侧栏 */}
                        <div className="sidebar detail-sidebar">
                            {/* 推荐文章 */}
                            <Recommend />
                            {/* 点击排行 */}
                            <Rank />
                        </div>
                    </div>
                </main>
                {/* 底部 */}
                <Footer />
            </>
        )
    }
}

export default connect(
    state => ({ id: state.detail }),
    { detail, comment }
)(Detail)