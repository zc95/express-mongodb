const crypto = require("crypto")

// 验证手机号
function checkPhone(phone) {
  return /^1[3456789]\d{9}$/.test(phone)
}

// 验证密码
function checkPassword(pw) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(pw)
}

// 加密
function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key)
  var crypted = cipher.update(data, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

// 解密
function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key)
  var decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

aesEncrypt

module.exports = {
  checkPhone,
  checkPassword,
  aesEncrypt,
  aesDecrypt
}