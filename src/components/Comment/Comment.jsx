// 评论
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { getHome } from '../../Api/Api'

import { connect } from 'react-redux';
import { detail, comment } from '../../redux/actions'

class Comment extends Component {
    // 初始化状态
    state = {
        userName: '',
        userContent: '',
        id: '',
        comments: []
    };

    // 获取当前输入框value
    handleForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    componentWillReceiveProps(nextProps) {
        let id = nextProps.sid
        let title = nextProps.title
        this.setState({ id, title })
        let obj = { params: { id } }
        getHome("comments", obj).then((res) => {
            let result = res.data
            // console.log(result)
            this.setState({
                comments: result
            })
        })
    }

    // 发表评论
    publishComments = () => {
        let { userName, userContent } = this.state;
        if (userName.trim() === '') {
            if (window.confirm('是否匿名发表')) {
                userName = "匿名"
            } else {
                return
            }
        }
        if (userContent.trim() === '') {
            return alert('请输入评论内容');
        }
        let id = this.state.id
        let title = this.state.title
        let datetime = new Date().toLocaleString('chinese', { hour12: false })
        let obj = {
            params: {
                id, title, datetime, userName, userContent
            }
        }
        // 发送评论
        getHome('comment', obj).then((res) => {
            // this.props.comment(this.props.comments)
            alert(res.data)
            const { comments } = this.props
            let newComments = [obj.params, ...comments]
            this.props.comment(newComments)
            this.setState({
                userName: '',
                userContent: ''
            })
        })
    };
    // 渲染评论
    renderList = () => {
        return this.state.comments.length === 0 ?
            (<div className="no-comments">暂无评论，快去抢沙发吧！</div>) :
            (
                <ul>
                    {
                        this.state.comments.map((item, index) => (
                            <li key={index}>
                                <h4>评论人: {item.userName}</h4>
                                <p>评论内容：{item.userContent}</p>
                                <span>{item.datetime}</span>
                            </li>
                        ))
                    }
                </ul>
            )
    };
    render() {
        const { userName, userContent } = this.state;
        return (
            <div className="comment mt20">
                <div className="comment-content">
                    <input type="text"
                        name="userName"
                        value={userName}
                        onChange={this.handleForm}
                        className="user"
                        placeholder="请输入评论人" />
                    <br />
                    <textarea name="userContent"
                        className="content"
                        value={userContent}
                        onChange={this.handleForm}
                        cols="30" rows="10"
                        placeholder="请输入评论内容">
                    </textarea>
                    <br />
                    <button onClick={this.publishComments}>发表评论</button>
                </div>
                {/*    渲染评论列表  使用三元表达式 */}
                <div className="comment-list">
                    <p className="comment-num">共<span>{this.state.comments.length}</span>条评论</p>
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        id: state.detail,
        comments: state.comment
    }),
    { detail, comment }
)(withRouter(Comment))