const express = require('express')
const router = express.Router()
const CategoryModel = require('../model/category')
const dayjs = require('dayjs')

// 所有品类
router.get('/category', (req, res, next) => {
    CategoryModel.find({}).then(data => {
        data.forEach(item => {
            item._doc.createTime = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        })
        res.json({
            code: 1,
            data
        })
    }).catch(next)
})

// 根据id查询品类
router.get('/category/:id', (req, res, next) => {
    CategoryModel.findOne({ _id: req.params.id }).then(data => {
        res.json({
            code: data ? 1 : 0,
            data
        })
    }).catch(next)
})

// 新增品类
router.post('/category', async (req, res, next) => {
    const { name } = req.body;
    const findCategory = await CategoryModel.find({ name })
    if (findCategory.length > 0) return res.status(500).json({ msg: `重复添加类型：${name}` })
    new CategoryModel(req.body).save().then(data => {
        res.json({
            code: 1,
            data
        })
    }).catch(next)
})

// 更新品类
router.put('/category/:id', (req, res, next) => {
    CategoryModel.updateOne({ _id: req.params.id }, req.body).then(() => {
        res.json({
            code: 1
        })
    }).catch(next)
})

// 删除品类
router.delete('/category/:id', (req, res, next) => {
    CategoryModel.remove({
        _id: req.params.id,
    }).then(() => {
        res.json({
            code: 1
        })
    }).catch(next)
})

module.exports = router
