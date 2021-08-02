// 我的名片
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <h1>我的名片</h1>
                <p>网名：雨落</p>
                <p>职业：Web前端开发工程师</p>
                <p>现居：江西省-南昌市</p>
                <p>Email：1145152143@qq.com</p>
                {/* 联系方式 */}
                <ul className="contact">
                    <li><NavLink to="/"><img src='img/c01.png' alt="首页" title="首页" /></NavLink></li>
                    <li><a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=opOTlpeTl5CTlpHi09OMwc3P"><img src='img/c02.png' alt="我的邮箱" title="我的邮箱" /></a></li>
                    <li><a href="tencent://message/?Menu=yes&uin=1927560385&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45"><img src='img/c03.png' alt="QQ联系我" title="QQ联系我" /></a></li>
                    <li>
                        <img className="weixin" src="/img/weixin.png" alt="微信" />
                        <a href="/"><img src='img/c04.png' alt="关注我的微信" title="关注我的微信" /></a>
                    </li>
                </ul>
            </div>
        )
    }
}
