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

// 登录和注册接口
router.post('/login', phoneFormatError, async (req, res, next) => {
  const body = req.body
  const phone = body.phone
  const code = body.code

  const userResult = await userDao.find(phone)
  const smsResult = await smsDao.find(phone)

  // 如果用户还没有获取验证码直接登录则进行错误返回
  if (!smsResult) {
    res.json({
      code: 400,
      msg: '请先获取验证码再登录',
      data: {}
    })
    return
  }

  // 如果用户存在则登录，不存在则注册
  if (userResult) {
    // 处理登录
    // 将用户发送过来的手机号、验证码与数据库储存的手机号、验证码进行比对，信息正确则签发token给用户
    if (smsResult.phone === phone && smsResult.code === code) {
      const token = jwt.token(userResult._id)
      res.json({
        code: 200,
        msg: '登录成功',
        data: {
          token: token
        }
      })
      // 登录成功后删除数据库缓存验证码
      smsDao.remove(phone)
    } else {
      res.json({
        code: 400,
        msg: '手机或验证码错误',
        data: {}
      })
    }
  } else {
    // 处理注册
    const newUserResult = await userDao.add(phone)
    // 创建完账号后签发token给用户，完成注册并登录操作
    const token = jwt.token(newUserResult._id)
    res.json({
      code: 200,
      msg: '账号注册成功',
      data: {
        token: token
      }
    })
  }
})

// 获取用户个人信息接口
router.get('/profile', auth, async (req, res, next) => {
  // req.userID 是在auth中间件中加入的
  const id = req.userID
  const doc = await userDao.info(id)
  res.json({
    code: 200,
    msg: '',
    data: doc
  })
})

// 更新用户个人信息接口，注意请求的body要将数据
router.post('/update', auth, async (req, res, next) => {
  const id = req.userID
  const doc = req.body
  // 更新后返回最新的用户信息供前端使用
  const userInfo = await userDao.update(id, doc)
  res.json({
    code: 200,
    msg: '更新信息成功',
    data: userInfo
  })
})

router.delete('/', auth, async (req, res, next) => {
  const id = req.userID
  const removeResult = await userDao.remove(id)
  console.log(removeResult)
  if (removeResult) {
    res.json({
      code: 200,
      msg: '删除用户成功',
      data: {}
    })
  } else {
    res.json({
      code: 400,
      msg: '用户不存在',
      data: {}
    })
  }
})

// 模拟注册用户
router.get('/create', async (req, res, next) => {
  const phone = req.query.phone
  const newUserResult = await userDao.add(phone)
  res.json(newUserResult)
})

// 测试token
router.post('/token', auth, async (req, res, next) => {
  const id = req.userID
  res.json(await userDao.info(id))
})

module.exports = router
