const express = require('express');
const router = express.Router();
const SMS = require('../util/SMS.js')
const smsDao = require('../dao/smsDao.js')
const { phoneFormatError } = require('../middleware/phoneErrorHandle.js')

router.get('/', function (req, res) {
  res.send('/sms api')
})

// router.get('/has', function (req, res, next) {
//   userDao.hasUser(req, res, next)
// })

router.post('/code', phoneFormatError, async (req, res, next) => {
  const phone = req.body.phone

  const sendResult = await SMS.send(phone)
  // 如果短信发送成功则把手机号和验证码保存到数据库中的sms集合
  if (Object.keys(sendResult).length > 0) {
    await smsDao.update(sendResult.phone, sendResult.code)
    res.json({
      code: 200,
      msg: '短信发送成功',
      data: {
        phone: phone,
        // 不应该把验证码响应给前端，仅在测试接口时暴露验证码
        // code: sendResult.code
      },
    })
  } else {
    res.json({
      code: 400,
      msg: '短信发送失败，请稍后再试',
      data: {}
    })
  }
})

router.get('/mock-code', phoneFormatError, async (req, res, next) => {
  const phone = req.query.phone
  const code = Math.random().toString().slice(-6);
  await smsDao.update(phone, code)
  res.json({
    code: 200,
    msg: '短信发送成功',
    data: {
      phone: phone,
      code: code
    },
  })
})

router.get('/ttl', phoneFormatError, async (req, res, next) => {
  let phone = req.query.phone

  const ttlResult = await smsDao.ttl(phone)
  if (ttlResult) {
    res.json({
      code: 200,
      msg: '查询成功',
      data: ttlResult
    })
    return
  }
  res.json({
    code: 200,
    msg: '未找到记录',
    data: {}
  })
})

module.exports = router;
