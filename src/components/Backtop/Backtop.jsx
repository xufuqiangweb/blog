import React, { Component } from 'react'

export default class index extends Component {
    state = {
        showBack: 'none'
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY >= 100) {
            this.setState({ showBack: 'block' })
        } else {
            this.setState({ showBack: 'none' })
        }
    }

    scrollToTop = () => {
        const scrollToTop = window.setInterval(() => {
            let hight = window.pageYOffset;
            if (hight > 0) {
                window.scrollTo(0, hight - 15);
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 1);
    }

    render() {
        const { showBack } = this.state
        return (
            // <!-- 返回顶部 -->
            <div className="back" style={{ display: showBack }}>
                <p onClick={this.scrollToTop}></p>
            </div>

        )
    }
}