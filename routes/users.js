const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao.js')
const smsDao = require('../dao/smsDao.js')
const { phoneFormatError } = require('../middleware/phoneErrorHandle.js')
const { auth } = require('../middleware/auth.js')
const jwt = require('../util/jwt.js')

router.get('/', function (req, res) {
  res.send('/users api')
})

router.post('/login', phoneFormatError, async (req, res, next) => {
  const body = req.body
  const phone = body.phone
  const code = body.code

  const userResult = await userDao.find(phone)
  // 如果用户存在则登录，不存在则注册
  if (userResult) {
    // 处理登录
    const smsResult = await smsDao.find(phone)
    // 将用户请求过来的信息与数据库信息进行比对
    if (smsResult.phone === phone && smsResult.code === code) {
      const token = jwt.token(userResult._id)
      res.json({
        code: 200,
        msg: '登录成功',
        data: {
          username: userResult.username,
          token: token
        }
      })
    } else {
      res.json({
        code: 400,
        msg: '手机或验证码错误',
        data: {}
      })
    }
  } else {
    // 处理注册
    res.json({
      code: 200,
      msg: '注册',
      data: {}
    })
  }
})

router.post('/profile', auth, async (req, res, next) => {
  // req.userID 是在auth中间件中加入的
  const id = req.userID
  if (id) {
    res.json({
      code: 200,
      msg: '',
      data: await userDao.info(id)
    })
  } else {
    res.json({
      code: 400,
      msg: '无效的token',
      data: {}
    })
  }
})

router.post('/token', auth, async (req, res, next) => {
  const id = req.userID
  res.json(await userDao.info(id))
})

module.exports = router
