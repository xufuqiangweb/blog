// 侧边栏
import React, { Component } from 'react'
import Card from './Card/Card'
import Popular from '../../Popular/Popular'
import Recommend from '../../Recommend/Recommend'
import Rank from '../../Rank/Rank'
import { getHome } from '../../../Api/Api'
import { connect } from 'react-redux'
import { search, original, classify, paging } from '../../../redux/actions'

class Sidebar extends Component {

    state = {
        value: '',
        currentPage: 1,
    }
    // 搜索框受控组件的value获取事件
    HandleSearch = (e) => {
        // console.log(value)
        this.setState({ value: e.target.value })
    }

    // 搜索框键盘事件
    HandleConfirmSearch = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value.trim() === "") {
                alert('搜索框不能为空')
            } else {
                let obj = {
                    params: {
                        search: this.state.value,
                        currentPage: 1,
                    }
                }
                this.props.classify('搜索结果')
                getHome('search', obj).then((res) => {
                    // console.log(res.data)
                    let data = res.data.data
                    let total = res.data.total
                    this.props.paging(data, total)
                })
                this.setState({
                    value: ''
                })
            }
        }
    }

    render() {
        return (
            <div className="sidebar">
                {/* 名片 */}
                <Card />
                {/* 关注博客 */}
                <div className="attention mt20">
                    <h1 className="h1">关注博客</h1>
                </div>
                {/* 搜索 */}
                <div className="search">
                    <input type="search" placeholder="请输入关键词" value={this.state.value} onChange={this.HandleSearch} onKeyDown={this.HandleConfirmSearch} />
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
                        <p>请留下赞助人姓名和联系人方式，如需帮助，我会优先解决您的问题！</p>
                        <p>您的支持是我最大的动力！</p>
                        <img src='img/sponsor.png' alt="图片" />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ value: state.search }),
    { search, original, classify, paging }
)(Sidebar)