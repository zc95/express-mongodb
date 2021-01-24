const express = require('express')
const router = express.Router()
const fs = require('fs')

console.log('\n正在自动注册路由...')
fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    router.use('/api', require('./' + file))
    console.log('- ' + file)
})
console.log('OK\n')

module.exports = router