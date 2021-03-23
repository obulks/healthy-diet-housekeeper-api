// const User = require('./models/user.js')
// const Diet = require('./models/diet.js')
// const Book = require('./models/book.js')
const Sms = require('../models/sms.js')
let v = require('../util/validator')


let phone = "15778664829"
// let phone = "19114592569"
// let phone = "114"

let sms = {
  phone: phone,
  code: "888888",
  createdAt: Date.now()
}

const findOneAndUpdate = () => {
  Sms.findOneAndUpdate({ phone: phone }, sms, { upsert: true }, (err, doc) => {
    if (err) {
      throw Error('userDao.cacheAutoCode')
    }
    console.log('sms update')
    return doc
  })
}


const findOne = (phone, code) => {
  Sms.findOne({ phone, code }, (err, doc) => {
    if (err) {
      console.log(err)
    }
    console.log(doc)
    return doc
  })
}
// console.log(findOne(phone))
findOneAndUpdate()
