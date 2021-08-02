// 最新博文
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getHome } from '../../Api/Api'

// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'
import { original, paging } from '../../redux/actions'

import './Article.css'
import Paging from './Paging'

class Article extends Component {
    state = {
        total: 3,
        tag: "",
        // popluar: [],
    }
    // 点击阅读量
    handleGood = (id) => {
        return () => {
            let obj = { params: { id } }
            getHome("popularity", obj).then((res) => {
                // let result = res.data
                // console.log(result)
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            tag: nextProps.tag,
        })
    }
    // 传递当前页数
    getCurrentPage = (currentPage) => {
        var { tag } = this.props
        var route = ""
        if (tag === "最新博文") route = "home"
        else if (tag === "Web前端") route = "web"
        else if (tag === "前端工程化") route = "engineering"
        else if (tag === "服务端") route = "service"
        else if (tag === "数据库") route = "database"
        else if (tag === "软件&工具") route = "software"
        else route = "tagSearch"
        let obj = { params: { currentPage, tag } }
        getHome(route, obj).then((res) => {
            // console.log(res.data)
            let data = res.data.data
            let total = res.data.total
            this.props.paging(data, total)
        })
    }

    render() {
        var { data } = this.props
        if (data === undefined) data = []
        return (
            <>
                {data.length !== 0 ?
                    data.map((item, index) => {
                        return (
                            <div className="article" key={index}>
                                <NavLink to={`/detail?id=${item.id}`} className="article-img" onClick={this.handleGood(item.id)}>
                                    <img src={item.img} alt={item.tag} />
                                </NavLink>
                                <div className="article-content">
                                    <h2 className="article-title" >
                                        <NavLink to={`/detail?id=${item.id}`} onClick={this.handleGood(item.id)}>
                                            <span>{item.tag}</span>{item.title}
                                        </NavLink>
                                    </h2>
                                    <p className="article-paragraph">{item.summary}</p>
                                    <div className="article-info">
                                        <div className="info-data">
                                            <span><i className="iconfont icon-shijian" />{item.datetime}</span>
                                            <span><i className="iconfont icon-redu" />{item.popularity}</span>
                                            <span><i className="iconfont icon-dianzan" />{item.good}</span>
                                            <span><i className="iconfont icon-pinglun" />{item.comment}</span>
                                        </div>
                                        <button className="article-read">
                                            <NavLink to={`/detail?id=${item.id}`} onClick={this.handleGood(item.id)}>阅读全文 &gt;&gt;</NavLink>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="no-option">
                        <p>O(∩_∩)O哈哈~，暂无信息哦！！！</p>
                    </div>
                }
                {data.length !== 0 ?
                    <Paging totalPage={this.props.total} pageCallbackFn={this.getCurrentPage.bind(this)} /> : ""
                }
            </>
        )
    }
}

export default connect(
    // key表示传给UI组件的属性名 this.props.key    value表示从store拿到的数据
    (state, ownprops) => ({
        data: ownprops.data = state.paging.data,
        total: ownprops.total = state.paging.total,
        tag: state.classify,
        popular: state.popular
    }), // 映射状态
    // key表示操作状态的名字 this.props.key()    value表示操作状态的方法 action
    { original, paging }// 映射操作状态的方法
)(Article)