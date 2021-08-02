// 1.引入msyql模块
var mysql = require('mysql');
// 2.创建mysql数据库连接配置
var config = {
    // 主机名
    host: 'localhost',
    // msyql 登录名
    user: 'root',
    // msyql 登录密码
    password: '123456',
    // 数据库名称
    database: 'blog'
};

function sql(sql) {  // 形参sql ： 表示 sql指令，比如 select * from 表名
    return new Promise((resolve, reject) => {
        // 2.创建mysql数据库连接配置
        var connection = mysql.createConnection(config);
        // 3.连接MySQL数据库
        connection.connect();
        console.log(`-------- MySQL数据库连接成功! --------`);
        // 4.操作MySQL数据库
        connection.query(sql, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
                // console.log('users的数据是: ' + results);
                // 5.断开MySQL数据库连接
                connection.end();
            }
        });
    });
}

module.exports = sql;
