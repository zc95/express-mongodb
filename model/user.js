const mongoose = require('mongoose')

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
                return /^1[3456789]\d{9}$/.test(v);
            },
            message: '请输入正确格式的手机号'
        },
        trim: true
    },
    password: {
        type: String,
        required: [true, '密码不能为空'],
        validate: {
            validator: function (v) {
                return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(v);
            },
            message: '密码必须是16位字母和数字的组合'
        },
        trim: true
    },
    createTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema, 'user')