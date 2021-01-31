const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const mongodbUrl = 'mongodb://localhost/ninja'

// 启动 express
const app = express()

// 连接 mongodb
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('连接数据库成功：' + mongodbUrl)
}).catch(err => {
    console.log('连接数据库失败：' + err);
})

/**
 * 使用中间件验证token合法性
 * Headers 中 需要加入 { Authorization: `Bearer ${token}` }
 */
app.use(expressJwt({
    secret: 'secret',
    algorithms: ['HS256'],
    credentialsRequired: true
}).unless({
    path: [
        '/api/user/login',
        '/api/user/register'
    ] // 权鉴白名单
}))

// body 解析中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// 注册路由
app.use(require('./routes'))

// 错误处理中间件
app.use((err, req, res, next) => {
    let code = 500;
    let msg = err.message || '请求失败';

    // token 过期
    if (err.name === 'UnauthorizedError') {
        code = 401;
        msg = "登录信息已过期，请重新登录"
    }

    // schema 验证
    if (err.errors) {
        const eKeys = Object.keys(err.errors)
        msg = err.errors[eKeys[eKeys.length - 1]].message
    }

    res.status(code).json({ msg })
})

// 监听端口
const port = process.env.port || 4000
app.listen(port, () => {
    console.log('listening on: ' + port)
})