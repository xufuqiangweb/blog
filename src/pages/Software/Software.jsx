// 软件&工具
import React, { Component } from 'react'
import List from '../../components/List/List'
import Footer from '../../components/Footer/Footer'
// 引入封装的axios
import { getHome } from '../../Api/Api';
// 引入redux的connect和action
import { connect } from 'react-redux'
import { original, classify,paging } from '../../redux/actions'

class Software extends Component {

    state = {
        headline: '软件&工具',
        currentPage: 1,
    }

    componentDidMount() {
        this.props.classify(this.state.headline)
        let obj = { params: { currentPage: this.state.currentPage } }
        getHome('software',obj).then((res) => {
            // console.log(res.data)
            let data = res.data.data
            let total = res.data.total
            this.props.paging(data,total)
        })
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
        )
    }
}

export default connect(
    state => ({ address: state.backData }),
    { original, classify,paging }
)(Software)