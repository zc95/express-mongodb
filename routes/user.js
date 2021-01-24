const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')

// 所有账号
router.get('/user', (req, res, next) => {
    UserModel.find({}).then(data => {
        res.json({
            code: 1,
            data
        })
    }).catch(next)
})

// 根据id查询账号
router.get('/user/:id', (req, res, next) => {
    UserModel.findOne({ _id: req.params.id }).then(data => {
        res.json({
            code: data ? 1 : 0,
            data
        })
    }).catch(next)
})

// 新增账号
router.post('/user', async (req, res, next) => {
    const { nickName } = req.body;
    const findUser = await UserModel.find({ nickName })
    if (findUser.length > 0) return res.status(500).json({ msg: `重复添加类型：${nickName}` })
    new UserModel(req.body).save().then(data => {
        res.json({
            code: 1,
            data
        })
    }).catch(next)
})

// 更新账号
router.put('/user/:id', (req, res, next) => {
    UserModel.updateOne({ _id: req.params.id }, req.body).then(() => {
        res.json({
            code: 1
        })
    }).catch(next)
})

// 删除账号
router.delete('/user/:id', (req, res, next) => {
    UserModel.remove({
        _id: req.params.id,
    }).then(() => {
        res.json({
            code: 1
        })
    }).catch(next)
})

module.exports = router
