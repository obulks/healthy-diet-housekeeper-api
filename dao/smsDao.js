const Sms = require('../models/Sms.js')

const update = (phone, code) => {
  let sms = {
    phone: phone,
    code: code,
    createdAt: Date.now()
  }

  Sms.findOneAndUpdate({ phone: phone }, sms, { upsert: true }, (err, doc) => {
    if (err) {
      console.log('error: smsDao.findOneUpdate')
    }
    console.log('success: findOneAndUpdate')
  })
}

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
