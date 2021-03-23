const v = require('../util/validator.js')
/**
 * 手机号格式错误处理
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const phoneFormatError = async (req, res, next) => {
  let phone = ''

  switch (req.method) {
    case 'GET':
      phone = req.query.phone
      break
    case 'POST':
      phone = req.body.phone
  }
  if (!v.isPhone(phone)) {
    res.json({
      code: 400,
      msg: '手机号有误！',
      data: {},
    })
    return
  }
  next()
}

module.exports = {
  phoneFormatError
}
