import React, { Component } from 'react'

import "./paging.css"
export default class Paging extends Component {
    state = {
        currentPage: 1, //当前页码
        groupCount: 3, //页码分组，显示5个页码，其余用省略号显示
        startPage: 1,  //分组开始页码
        totalPage: 5, //总页数
    }

    // 获取从父组件传来的总页数与当前页数
    componentDidMount() {
        this.setState({
            // currentPage: this.props.currentPage,
            totalPage: this.props.totalPage
        })
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.totalPage)
        this.setState({
            totalPage: nextProps.totalPage
        })
    }

    // 点击页码
    pageClick(currentPage) {
        const { groupCount } = this.state
        const getCurrentPage = this.props.pageCallbackFn;
        //当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
        let startPage = currentPage >= groupCount ? currentPage - 2 : 1
        this.setState({
            startPage,
            currentPage
        })
        //将当前页码返回父组件
        getCurrentPage(currentPage)
    }

    //上一页事件
    prePageHandeler() {
        let { currentPage } = this.state
        this.pageClick(--currentPage)
    }

    //下一页事件
    nextPageHandeler() {
        let { currentPage } = this.state
        this.pageClick(++currentPage)
    }

    render() {
        let { groupCount, startPage, currentPage, totalPage } = this.state;
        let pages = []
        // 如果当前面不是第一页 则添加上一页
        // if (currentPage !== 1) {
        pages.push(<button disabled={currentPage <= 1 ? true : false} onClick={this.prePageHandeler.bind(this)} key={0}> 上一页</button>)
        // }

        /*总页码小于等于5时，全部显示出来*/
        if (totalPage <= 5) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(<button key={i} onClick={this.pageClick.bind(this, i)}
                    className={currentPage === i ? "activePage" : null}>{i}</button>)
            }
        } else {/*总页码大于5时，部分显示*/
            //第一页
            pages.push(<button className={currentPage === 1 ? "activePage" : null} key={1}
                onClick={this.pageClick.bind(this, 1)}>1</button>)
            //前面省略号(当当前页码比分组的页码大时显示省略号)
            if (currentPage > groupCount) {
                pages.push(<button className="" key={-1}>···</button>)
            }
            //非第一页和最后一页显示
            for (let i = currentPage - 1; i < currentPage + 2; i++) {
                if (i <= totalPage - 1 && i > 1) {
                    pages.push(<button className={currentPage === i ? "activePage" : null} key={i}
                        onClick={this.pageClick.bind(this, i)}>{i}</button>)
                }
            }
            //后面省略号
            if (totalPage - startPage >= groupCount + 1) {
                pages.push(<button className="" key={-2}>···</button>)
            }
            //最后一页
            pages.push(<button className={currentPage + 1 > totalPage ? "activePage" : null} key={totalPage}
                onClick={this.pageClick.bind(this, totalPage)}>{totalPage}</button>)
        }
        //如果当前面不是最后一页 则添加下一页
        // if (currentPage < totalPage) {
        pages.push(<button disabled={currentPage >= totalPage ? true : false} onClick={this.nextPageHandeler.bind(this)} key={totalPage + 1}>下一页</button>)
        // }
        return (
            <div className="paging">
                <div className="g-page">
                    {pages}
                </div>
            </div>
        )
    }
}
