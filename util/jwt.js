const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

/**
 * 接收用户id，生成token
 * @param id
 * @returns {Promise<void>}
 */
const token = (id) => {
  return jwt.sign({ id: id.toString() }, SECRET)
}

/**
 * 对token进行解析，返回用户id
 * @returns {*}
 * @param token
 */
const parse = (token) => {
  return jwt.verify(token, SECRET).id
}

module.exports = {
  token,
  parse
}