// 轮播图
import React, { Component } from "react";

export default class Swiper extends Component {
  state = {
    currentIndex: 0,
    imgs: [
      "/img/carousel1.jpeg",
      "/img/carousel2.jpeg",
      "/img/carousel3.jpg",
      "/img/carousel4.jpeg",
    ],
  };

  // 渲染结束后，设置定时器
  componentDidMount() {
    this.startTimer();
  }
  //  销毁前清除定时器
  componentWillUnmount() {
    this.stopTimer();
  }

  //  设置定时任务
  startTimer = () => {
    this.timerId = setInterval(() => {
      this.swtichToSpecifyImg(1);
    }, 4000);
  };
  //  清除定时任务
  stopTimer = () => {
    clearInterval(this.timerId);
  };
  //  重启定时器
  restartTimer = () => {
    this.stopTimer();
    this.startTimer();
  };
  //  根据自定义的步长跳转到指定图片，是对切换图片功能的抽象
  //  delta:目标图片和当前显示图片的索引的差值,如delta=1代表切换到下一张，delta=-1切换到上一张
  swtichToSpecifyImg = (delta) => {
    this.setState({
      currentIndex:
        (this.state.currentIndex + delta + this.state.imgs.length) %
        this.state.imgs.length,
    });
  };

  //  用户手动切换到下一张图片
  swtichToNextImg = (e) => {
    this.swtichToSpecifyImg(1);
    this.restartTimer(); //  重启定时器，防止短时间内切换了2张图片，影响用户体验
    e.preventDefault(); //   阻止a标签默认刷新
  };
  //  用户手动切换到上一张图片
  swtichToprevImg = (e) => {
    e.preventDefault(); //   阻止a标签默认刷新
    this.restartTimer(); //  重启定时器，防止短时间内切换了2张图片，影响用户体验
    this.swtichToSpecifyImg(-1);
  };
  //  用户点击小圆点后切换到指定图片
  swtichToImg = (index) => {
    this.swtichToSpecifyImg(index - this.state.currentIndex);
  };

  render() {
    return (
      <div className="swiper">
        {this.state.imgs.map((value, index) => {
          return (
            <div
              className={
                index === this.state.currentIndex
                  ? "swiper-img-show"
                  : "swiper-img"
              }
              key={index}>
              <img src={value} alt="" />
            </div>
          );
        })}

        <a
          href="http://baidu.com"
          className={"swiper-left-button"}
          onClick={this.swtichToprevImg.bind(this)}>
          &lt;
        </a>
        <a
          href="http://baidu.com"
          className={"swiper-right-button"}
          onClick={this.swtichToNextImg.bind(this)}>
          &gt;
        </a>

        <div className="swiper-pagination">
          <ul>
            {this.state.imgs.map((value, index) => {
              return (
                <li
                  className={
                    index === this.state.currentIndex
                      ? "swiper-dot-show"
                      : "swiper-dot"
                  }
                  key={index}
                  onClick={() => {
                    this.swtichToImg(index);
                  }} // 用匿名函数包装一下，使得既可以传参又不会无限循环
                ></li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
