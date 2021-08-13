// 点击排名
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { getHome } from '../../api/Api'

// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'
import { rank, detail } from '../../redux/actions'

class Rank extends Component {

    componentDidMount() {
        getHome('rank').then((res) => {
            // console.log(res.data)
            let result = res.data
            this.props.rank(result)
        })
    }

    // 点击阅读量
    handleGood = (id) => {
        return () => {
            this.props.detail(id)
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
            <div className="rank mt20">
                <h2 className="h2">点击排名</h2>
                <ul>
                    {
                        list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <i>{index + 1}</i>
                                    <NavLink to={`/detail?id=${item.id}`} onClick={this.handleGood(item.id)}>{item.title}</NavLink>
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
    state => ({ list: state.rank }),
    { rank, detail }
)(Rank)