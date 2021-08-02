// 留言
import React, { Component } from 'react'
import { getHome } from '../../Api/Api'

export default class Message extends Component {
    // 初始化状态
    state = {
        name: "",
        email: "",
        type: "",
        message: ""
    }

    // 姓名输入框
    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    // 邮箱输入框
    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    // 改变问题类型
    changeType = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    // 留言输入框
    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    // 提交按钮
    HandleSubmit = (e) => {
        e.preventDefault()
        if (this.state.name.trim() === "") return alert('请输入姓名！！！')
        if (this.state.email.trim() === "") return alert('请输入邮箱！！！')
        if (this.state.type.trim() === "") return alert('请输入问题类型！！！')
        if (this.state.message.trim() === "") return alert('请输入留言！！！')
        let obj = {
            params: {
                name: this.state.name,
                datetime: new Date().toLocaleString('chinese', { hour12: false }),
                email: this.state.email,
                type: this.state.type,
                message: this.state.message,
            }
        }
        getHome('form', obj).then((res) => {
            alert(res.data)
            this.setState({
                name: "",
                email: "",
                type: "",
                message: ""
            })
        })
    }

    render() {
        return (
            <div className="page-left">
                <h1 className="h1">留言联系</h1>
                <form action="" method="get" onSubmit={this.HandleSubmit}>
                    <h2 className="message-title">留言联系</h2>
                    <div className="inputbox">
                        <label className="label-input" htmlFor="name">姓名</label>
                        <input onChange={this.changeName} value={this.state.name} id="name" className="input100" type="text" name="name" placeholder="请输入姓名" />
                        <span className="focus-input" />
                    </div>
                    <div className="inputbox">
                        <label className="label-input" htmlFor="email">电子邮箱</label>
                        <input onChange={this.changeEmail} value={this.state.email} id="email" className="input100" type="email" name="email" placeholder="请输入您的真实邮箱，以便博主回复" pattern="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$" />
                        <span className="focus-input" />
                    </div>
                    <div className="inputbox">
                        <div className="label-input">需要咨询的问题类型</div>
                        <div className="input-select">
                            <select className="select" name="type" value={this.state.type} onChange={this.changeType}>
                                <option>请选择</option>
                                <option>Web前端</option>
                                <option>前端工程化</option>
                                <option>服务端</option>
                                <option>数据库</option>
                                <option>软件&工具</option>
                                <option>其他</option>
                            </select>
                        </div>
                        <span className="focus-input" />
                    </div>
                    <div className="inputbox">
                        <label className="label-input" htmlFor="message">留言</label>
                        <textarea value={this.state.message} onChange={this.changeMessage} id="message" className="input100" name="message" placeholder="请输入留言" />
                        <span className="focus-input" />
                    </div>
                    <button className="submitbtn">提 交</button>
                </form>
                <div className="message-foot">
                    <h2>留言须知</h2>
                    <p>请在上面填写您遇到的问题或意见建议，并留下您的联系方式，感谢您</p>
                    <span>对博主的支持!</span>
                </div>
            </div >
        )
    }
}
