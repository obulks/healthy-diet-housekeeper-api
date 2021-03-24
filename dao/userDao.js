const User = require('../models/user.js')
const nanoid = require('../util/nanoid.js')

/**
 * 根据手机号查询用户
 * @param {String} phone 手机号
 * @returns {QueryWithHelpers<Document | null, Document, {}> | Query<Document | null, Document, {}> | void | Promise<DefaultSchema | null>}
 */
const find = (phone) => {
  return User.findOne({ phone })
}

/**
 * 根据手机号查询用户是否存在
 * @param phone {String} 手机号
 * @returns {Promise<boolean>}
 */
const has = async (phone) => {
  return await find(phone) === null
}

/**
 * 创建用户
 * @param phone {String} 手机号
 * @returns {Promise<this> | void | Promise<WriteOpResult>}
 */
const add = (phone) => {
  // 设置用户默认信息
  const user = new User({
    username: nanoid.username(),
    phone: phone,
    body_info: {
      sex: '保密',
      birthday: new Date('2000'),
      height: 160,
      weight: 50,
    }
  })

  return user.save()
}

/**
 * 获取用户信息
 * @param id {String} 用户的_id
 * @returns {QueryWithHelpers<Document | null, Document, {}>}
 */
const info = (id) => {
  return User.findById(id)
}

/**
 * 更新个人信息
 * @param id {String} 用户的_id
 * @param doc {Object} 需要更新的内容
 * @returns {QueryWithHelpers<FindAndModifyWriteOpResultObject<Document>, Document, {}> | Query<FindAndModifyWriteOpResultObject<Document>, Document, {}> | QueryWithHelpers<Document, Document, {}> | QueryWithHelpers<Document | null, Document, {}> | Query<Document, Document, {}> | Query<Document | null, Document, {}>}
 */
const update = (id, doc) => {
  return User.findByIdAndUpdate(id, doc, { new: true })
}

/**
 * 删除用户
 * @param id
 * @returns {QueryWithHelpers<Document | null, Document, {}>}
 */
const remove = (id) => {
  return User.findByIdAndRemove(id)
}


module.exports = {
  find,
  has,
  add,
  info,
  update,
  remove,
}
