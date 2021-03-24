const jwt = require('../util/jwt.js')

/**
 * 校验token，如果通过则把用户id保存在req对象的userID属性中
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop()
    req.userID = jwt.parse(token)
  } catch (e) {
    req.userID = null
    res.json({
      code: 400,
      msg: '无效的token',
      data: {}
    })
    return
  }
  next()
}

module.exports = {
  auth
}
