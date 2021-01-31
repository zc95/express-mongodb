const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')
const crypto = require('../utils/crypto')
const dayjs = require('dayjs')
const jwt = require("jsonwebtoken")

// 所有账号
router.get('/user', (req, res, next) => {
    UserModel.find({}).then(data => {
        data.forEach(item => {
            item._doc.createTime = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        })
        res.json({
            code: 1,
            data
        })
    }).catch(next)
})

// 注册
router.post('/user/register', async (req, res, next) => {
    let { phone, password } = req.body

    // 根据手机号码判断是否注册过
    const findUser = await getUserInfoById({ phone })
    if (findUser) return res.status(500).json({ msg: `此手机号已被注册：${phone}` })

    // 验证密码是否规范
    if (!crypto.checkPassword(password)) return res.status(500).json({ msg: "密码必须是16位字母和数字的组合" })

    // 将密码加密
    req.body.password = crypto.aesEncrypt(password, 'PASSWORD')

    new UserModel(req.body).save().then(data => {
        res.json({
            code: 1,
            msg: '注册成功'
        })
    }).catch(next)
})

// 登录
router.post('/user/login', async (req, res, next) => {
    let { phone, password } = req.body

    // 根据手机号码判断是否注册过
    const findUserByPhone = await getUserInfoById({ phone })
    if (!findUserByPhone) return res.status(500).json({ msg: `账号不存在：${phone}` })

    // 将密码加密
    password = crypto.aesEncrypt(password, 'PASSWORD')

    // 校验密码
    const findUserByPhoneAndPwd = await getUserInfoById({ phone, password })
    if (!findUserByPhoneAndPwd) return res.status(500).json({ msg: "密码错误" })

    console.log()

    // 生成 token
    const payload = {
        _id: findUserByPhoneAndPwd._id,
        phone: findUserByPhoneAndPwd.phone
    }
    const token = 'Bearer ' + jwt.sign(payload, 'secret', { expiresIn: 20 })

    res.json({
        code: 1,
        token,
        msg: "登录成功"
    })
})

// 根据id查询用户信息
router.get('/user/:id', async (req, res, next) => {
    const findUser = await getUserInfoById({ _id: req.params.id })
    res.json({
        code: findUser ? 1 : 0,
        data: findUser
    })
})

// 根据条件查询用户信息
function getUserInfoById (params) {
    return new Promise((resolve, reject) => {
        UserModel.findOne(params).then(data => {
            resolve(data)
        }).catch(err => {
            resolve(null)
        })
    })
}

module.exports = router
