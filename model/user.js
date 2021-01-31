const mongoose = require('mongoose')
const crypto = require('../utils/crypto')

const UserSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: [true, '昵称不能为空'],
        minlength: [1, '昵称最小长度为1'],
        maxlength: [10, '昵称最大长度为10'],
        trim: true
    },
    phone: {
        type: Number,
        required: [true, '手机号码不能为空'],
        validate: {
            validator: function (v) {
                return crypto.checkPhone(v);
            },
            message: '请输入正确格式的手机号'
        },
        trim: true
    },
    password: {
        type: String,
        required: [true, '密码不能为空'],
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema, 'user')