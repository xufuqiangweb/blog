// 推荐文章
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { getHome } from '../../api/Api'

// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'
import { recommend, detail } from '../../redux/actions'

import './Recommend.css'

class Recommend extends Component {

    componentDidMount() {
        getHome('recommend').then((res) => {
            // console.log(res.data)
            let result = res.data
            this.props.recommend(result)
        })
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

    render() {
        const { list } = this.props
        return (
            <div className="recommend mt20">
                <h2 className="h2">推荐文章</h2>
                <ul className="essay">
                    {
                        list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink to={`/detail?id=${item.id}`} onClick={this.handleGood(item.id)}>
                                        <div className="essay-img">
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <div className="essay-txt">
                                            <p>{item.title}</p>
                                            <span>{item.date}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    // key表示传给UI组件的属性名 this.props.key    value表示从store拿到的数据
    (state) => ({
        list: state.recommend,
    }), // 映射状态
    // key表示操作状态的名字 this.props.key()    value表示操作状态的方法 action
    { recommend, detail }// 映射操作状态的方法
)(Recommend)