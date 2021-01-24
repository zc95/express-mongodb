const express = require('express')
const router = express.Router()

router.post('/uploadFile', async (req, res, next) => {
    console.log(req.files);
    res.json({
        code: 1,
    })
})

module.exports = router
