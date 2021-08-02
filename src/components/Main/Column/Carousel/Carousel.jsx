// banner部分
import React, { Component } from 'react'

import Swiper from './Swiper/Swiper'

import './Carousel.css'
export default class Carousel extends Component {
    render() {
        return (
            <div className="carousel">
                <Swiper />
                {/* banner */}
                <div className="headline">
                    <ul>
                        <li>
                            <a href="http://baidu.com" title="为什么说10月24日是程序员的节日？">
                                <img src="img/h1.jpg" alt="为什么说10月24日是程序员的节日？" />
                                <span>为什么说10月24日是程序员的节日？</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://baidu.com" title="个人网站做好了，百度不收录怎么办？来，看看他们怎么做的">
                                <img src="img/h2.jpg" alt="个人网站做好了，百度不收录怎么办？来，看看他们怎么做的。" />
                                <span>个人网站做好了，百度不收录怎么办？来，看看他们怎么做的。</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
