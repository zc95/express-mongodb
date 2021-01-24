const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '品类名称不能为空'],
        minlength: [2, '品类名称最小长度为2'],
        maxlength: [10, '品类名称最大长度为10'],
        trim: true
    },
    createTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Category', CategorySchema, 'category')