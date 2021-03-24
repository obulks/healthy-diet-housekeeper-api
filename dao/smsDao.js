const Sms = require('../models/Sms.js')

/**
 * 对手机号、验证码进行更新，如果记录存在则更新，不存在则创建
 * @param phone
 * @param code
 * @returns {QueryWithHelpers<FindAndModifyWriteOpResultObject<Document>, Document, {}> | Query<FindAndModifyWriteOpResultObject<Document>, Document, {}> | void | QueryWithHelpers<Document, Document, {}> | QueryWithHelpers<Document | null, Document, {}> | Query<Document, Document, {}> | Query<Document | null, Document, {}> | Promise<FindAndModifyWriteOpResultObject<DefaultSchema>>}
 */
const update = (phone, code) => {
  let sms = {
    phone: phone,
    code: code,
    createdAt: Date.now()
  }

  return Sms.findOneAndUpdate({ phone: phone }, sms, { upsert: true })
}

/**
 * 查询缓存记录
 * @param phone
 * @returns {Promise<{createdAt: number | {default: number, index: {expires: number}, type: DateConstructor} | boolean | string, code: *, phone: ({type: *}|string)}|null>}
 */
const find = async (phone) => {
  const result = await Sms.findOne({ phone })
  if (result) {
    return {
      phone: result.phone,
      code: result.code,
      createdAt: result.createdAt
    }
  } else {
    return null
  }
}

// 查询验证码的存活时间和销毁倒计时
const ttl = async (phone) => {
  const smsResult = await find(phone)
  if (smsResult) {
    const createdAt = smsResult.createdAt
    const now = new Date()
    const surviveTime = Math.round((now - createdAt) / 1000)
    return {
      phone: smsResult.phone,
      code: smsResult.code,
      survive: surviveTime,
      remaining: 300 - surviveTime,
    }
  }
  return null
}

module.exports = {
  find,
  update,
  ttl
}
