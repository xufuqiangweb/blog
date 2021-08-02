// 栏目
import React, { Component } from 'react'
import Article from '../../Article/Article'
import Carousel from './Carousel/Carousel'
import { connect } from 'react-redux'
import { classify } from '../../../redux/actions'

class Column extends Component {
    render() {
        return (
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
        )
    }
}

export default connect(
    state => ({ headline: state.classify }),
    { classify }
)(Column)