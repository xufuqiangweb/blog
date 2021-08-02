var express = require('express');
var router = express.Router();
const sql = require('../db/mysql')

// 登录
router.post('/login', async function (req, res, next) {
    // console.log(req.body)
    const {
        username,
        password
    } = req.body
    var data = await sql(`select * from user`)
    if (data[0].username === username && data[0].password === password) {
        sql(`update user set state="true"`)
        res.send("登录成功")
    } else {
        res.send("密码错误")
    }
});

// 登录状态
router.get('/loginstate', async function (req, res, next) {
    var data = await sql(`select * from user`)
    state = data[0].state
    res.send(state)
});

// 获取文章数据和总数(分页)
router.get('/article', async function (req, res, next) {
    // console.log(req.query)
    var num = req.query.current
    var n = (num - 1) * 10
    var data = await sql(`select * from alldata order by id desc limit ${n},10`)
    var total = await sql(`select count(*)as m from alldata`)
    total = total[0].m
    // data.reverse()
    var obj = {
        data,
        total
    }
    res.send(obj);
});

// 所有评论的文章标题(分页)
router.get('/commentTitle', async function (req, res, next) {
    // console.log(req.query)
    var num = req.query.current
    var n = (num - 1) * 10
    var data = await sql(`select id,title from comments group by id,title limit ${n},10`)
    var total = await sql(`select distinct title from comments`)
    total = total.length
    var obj = {
        data,
        total
    }
    res.send(obj);
});

// 指定文章的评论 (分页)
router.get('/comment', async function (req, res, next) {
    // console.log(req.query)
    var id = req.query.id
    var num = req.query.current2
    var n = (num - 1) * 5
    var data = await sql(`select * from comments where id='${id}' order by num desc limit ${n},5`)
    var total = await sql(`select * from comments where id='${id}'`)
    total = total.length
    var obj = {
        data,
        total
    }
    res.send(obj);
});

// 删除评论
router.get('/delete', async function (req, res, next) {
    // console.log(req.query)
    // console.log(req.query)
    var {
        num
    } = req.query
    var data = await sql(`delete from comments where num='${num}'`)
    res.send("删除成功");
});

// 所有留言
router.get('/message', async function (req, res, next) {
    // console.log(req.query)
    var num = req.query.current
    var n = (num - 1) * 10
    var total = await sql(`select count(*)as m from messages`)
    total = total[0].m
    var data = await sql(`select * from messages limit ${n},10`)
    // data.reverse()
    var obj = {
        data,
        total
    }
    res.send(obj);
});

// 添加文章
router.post('/add', async function (req, res, next) {
    // console.log(req.body)
    var {
        img,
        tag,
        title,
        summary,
        state,
        date,
        datetime,
        popularity,
        good,
        comment,
        article
    } = req.body
    var data = await sql(`insert into alldata(img,tag,title,summary,state,date,datetime,popularity,good,comment,article) values('${img}','${tag}','${title}','${summary}','${state}','${date}','${datetime}','${popularity}','${good}','${comment}','${article}')`)
    res.send("发布成功")
});

// 修改文章
router.get('/update', async function (req, res, next) {
    // console.log(req.query)
    var {
        id
    } = req.query
    var data = await sql(`select * from alldata where id='${id}'`)
    // console.log(data)
    res.send(data)
});

// 保存
router.post('/save', async function (req, res, next) {
    // console.log(req.body)
    var {
        id,
        img,
        tag,
        title,
        summary,
        article
    } = req.body
    var data = await sql(`update alldata set img='${img}',tag='${tag}',title='${title}',state="已发布",summary='${summary}',article='${article}' where id='${id}'`)
    res.send("修改成功")
});

// 文章下架
router.get('/unshelves', async function (req, res, next) {
    // console.log(req.query)
    var {
        id
    } = req.query
    var data = await sql(`update alldata set state="已下架" where id='${id}'`)
    res.send("下架成功")
});

// 获取文章总数
router.get('/amount1', async function (req, res, next) {
    // console.log(req.query)
    var data = await sql(`select count(*)as num from alldata`)
    data = data[0].num
    res.send({
        data
    });
});

// 获取评论总数
router.get('/amount2', async function (req, res, next) {
    // console.log(req.query)
    var data = await sql(`select count(*)as num from comments`)
    data = data[0].num
    res.send({
        data
    });
});

// echarts6
router.get('/echarts6', async function (req, res, next) {
    var data = await sql(`select count(*)as value,tag as name from alldata group by tag`);
    // console.log(data)
    res.send(data)
});

// echarts2
router.get('/echarts2', async function (req, res, next) {
    var data = await sql(`select userName,userContent,datetime from comments order by num desc`);
    // 将数组对象变为二维数组
    let arr = [];
    data.forEach(item => {
        arr.push(Object.values(item))
    });
    // console.log(arr)
    arr.forEach(item => {
        item[2] = (item[2].split(" "))[0]
    })
    res.send(arr)
});

module.exports = router;