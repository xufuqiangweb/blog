var express = require('express');
var router = express.Router();
const sql = require('../db/mysql')

// 首页
router.get('/home', async function (req, res, next) {
    // console.log(req.query)
    var num = req.query.currentPage
    var n = (num - 1) * 8
    var data = await sql(`select * from alldata order by id desc limit ${n},8`)
    var total = await sql(`select count(*)as m from alldata`)
    total = Math.ceil(total[0].m / 8)
    res.send({
        data,
        total
    })
});
// Web前端
router.get('/web', async function (req, res, next) {
    var num = req.query.currentPage
    var n = (num - 1) * 8
    var data = await sql(`select * from alldata where tag in ('React','TypeScript','Vue','小程序','JavaScript','HTML5','CSS3') order by id desc limit ${n},8`)
    var total = await sql(`select count(*)as m from alldata where tag in ('React','TypeScript','Vue','小程序','JavaScript','HTML5','CSS3')`)
    // console.log(data)
    total = Math.ceil(total[0].m / 8)
    // console.log(total)
    res.send({
        data,
        total
    })
});
// 前端工程化
router.get('/engineering', async function (req, res, next) {
    var num = req.query.currentPage
    var n = (num - 1) * 8
    var data = await sql(`select * from alldata where tag in ('WebPack','Glup','Sass','Git','SVN') order by id desc limit ${n},8`)
    var total = await sql(`select count(*)as m from alldata where tag in ('WebPack','Glup','Sass','Git','SVN')`)
    total = Math.ceil(total[0].m / 8)
    // console.log(data)
    res.send({data,total})
});
// 服务端
router.get('/service', async function (req, res, next) {
    var num = req.query.currentPage
    var n = (num - 1) * 8
    var data = await sql(`select * from alldata where tag in ('NodeJs','PHP') order by id desc limit ${n},8`)
    var total = await sql(`select count(*)as m from alldata where tag in ('NodeJs','PHP')`)
    total = Math.ceil(total[0].m / 8)
    // console.log(data)
    res.send({data,total})
});
// 数据库
router.get('/database', async function (req, res, next) {
    // console.log(req.query)
    var num = req.query.currentPage
    var n = (num - 1) * 8
    var data = await sql(`select * from alldata where tag in ('MongoDB','MySQL') order by id desc limit ${n},8`)
    var total = await sql(`select count(*)as m from alldata where tag in ('MongoDB','MySQL')`)
    total = Math.ceil(total[0].m / 8)
    // console.log(data)
    res.send({data,total})
});
// 软件和工具
router.get('/software', async function (req, res, next) {
    var num = req.query.currentPage
    var n = (num - 1) * 8
    var data = await sql(`select * from alldata where tag in ('软件工具') order by id desc limit ${n},8`)
    var total = await sql(`select count(*)as m from alldata where tag in ('软件工具')`)
    total = Math.ceil(total[0].m / 8)
    // console.log(data)
    res.send({data,total})
});
// 热门标签
router.get('/popular', async function (req, res, next) {
    var data = await sql(`select distinct tag from alldata`)
    res.send(data)
});
// 推荐文章(降序)
router.get('/recommend', async function (req, res, next) {
    var data = await sql(`select * from alldata order by good desc limit 8`)
    res.send(data)
});
// 点击排名(降序)
router.get('/rank', async function (req, res, next) {
    var data = await sql(`select * from alldata order by popularity desc limit 8`)
    res.send(data)
});

// 标签搜索
router.get('/tagSearch', async function (req, res, next) {
    // console.log(req.query)
    let {
        tag
    } = req.query
    tag = JSON.stringify(tag)
    var num = req.query.currentPage
    var n = (num - 1) * 8
    // console.log(tag, typeof tag)
    var data = await sql(`select * from alldata where (tag =${tag}) order by id desc limit ${n},8`)
    var total = await sql(`select count(*)as m from alldata where (tag =${tag})`)
    total = Math.ceil(total[0].m / 8)
    res.send({data,total})
});
// 搜索
router.get('/search', async function (req, res, next) {
    // console.log(req.query)
    let {
        search
    } = req.query
    if (search == "%") {
        search = "\\%"
    }
    // console.log(search, typeof search)
    var num = req.query.currentPage
    var n = (num - 1) * 8
    var data = await sql(`select * from alldata where (tag like '%${search}%')||(title like '%${search}%')||(summary like '%${search}%') limit ${n},8`)
    var total = await sql(`select count(*)as m from alldata where (tag like '%${search}%')||(title like '%${search}%')||(summary like '%${search}%')`)
    total = Math.ceil(total[0].m / 8)
    res.send({data,total})
});
// 留言
router.get('/form', async function (req, res, next) {
    // console.log(req.query)
    let {
        name,
        datetime,
        email,
        type,
        message
    } = req.query
    var data = await sql(`insert into messages(name,datetime,email,type,message) values('${name}','${datetime}','${email}','${type}','${message}')`)
    // console.log(data)
    res.send('留言成功，请等待博主回复')
});
// 详情页
router.get('/detail', async function (req, res, next) {
    // console.log(req.query)
    const {
        id
    } = req.query
    // console.log(id)
    var data = await sql(`select * from alldata where id='${id}'`)
    res.send(data)
});
// 当前页面所有评论
router.get('/comments', async function (req, res, next) {
    // console.log(req.query)
    const {
        id
    } = req.query
    console.log(id)
    var data = await sql(`select * from comments where id='${id}'`)
    data.reverse()
    // console.log(data)
    res.send(data)
});
// 添加评论
router.get('/comment', async function (req, res, next) {
    // console.log(req.query)
    let {
        id,
        title,
        datetime,
        userName,
        userContent
    } = req.query
    var data = await sql(`insert into comments(id,title,datetime,userName,userContent) values('${id}','${title}','${datetime}','${userName}','${userContent}')`)
    // console.log(data)
    res.send("评论成功")
});
// 点击阅读量
router.get('/popularity', async function (req, res, next) {
    // console.log(req.query)
    let {
        id
    } = req.query
    var data = await sql(`update alldata set popularity=popularity+1 where id = '${id}'`)
    // console.log(data)
    res.send("ok")
});
// 点赞
// 分页
module.exports = router;