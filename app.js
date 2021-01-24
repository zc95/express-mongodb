const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodbUrl = 'mongodb://localhost/ninja';

// 启动 express
const app = express()

// 连接 mongodb
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('连接数据库成功：' + mongodbUrl)
}).catch(err => {
    console.log('连接数据库失败：' + err);
})

// body 解析中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// 注册路由
app.use(require('./routes'))

// 错误处理中间件
app.use((err, req, res, next) => {
    let error = err.message || '请求失败';

    if (err.errors) {
        console.log('\n' + JSON.stringify(err.errors))
        const eKeys = Object.keys(err.errors)
        error = err.errors[eKeys[eKeys.length - 1]].message
    }

    res.status(500).json({ msg: error })
})

// 监听端口
const port = process.env.port || 4000
app.listen(port, () => {
    console.log('listening on: ' + port)
})