// 热门标签
import React, { Component } from 'react'
import { getHome } from '../../Api/Api'

import './Popular.css'
import { connect } from 'react-redux'
import { original, popular, classify, paging } from '../../redux/actions'

class Popular extends Component {
    state = {
        currentPage: 1,
    }

    componentDidMount() {
        getHome('popular').then((res) => {
            // console.log(res.data)
            let result = res.data
            this.props.popular(result)
        })
    }

    // 点击按钮搜索
    HandleSearch = (e) => {
        let tag = e.target.innerHTML
        // console.log(tag)
        let obj = {
            params: { tag, currentPage: 1, }
        }
        getHome('tagSearch', obj).then((res) => {
            // console.log(res.data)
            let data = res.data.data
            let total = res.data.total
            this.props.paging(data, total)
            this.props.classify(tag)
        })
    }

    render() {
        const { tag_list } = this.props
        return (
            <div className="popular mt20">
                <h2 className="h2">热门标签</h2>
                <ul className="tag-list">
                    {
                        tag_list.map((item, index) => {
                            return (
                                <li key={index}><button href={item.url} onClick={this.HandleSearch}>{item.tag}</button></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({ tag_list: state.popular }),
    { popular, original, classify, paging }
)(Popular)