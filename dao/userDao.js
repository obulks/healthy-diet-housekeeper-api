const User = require('../models/user.js')

const find = async (phone) => {
  return await User.findOne({ phone })
}

const has = async (phone) => {
  return await find(phone) === null
}

const add = async (phone) => {
  const user = new User({
    username: null,
    phone: phone
  })
  return User.create(user)
}

const info = async (id) => {
  return User.findById(id)
}


module.exports = {
  find,
  has,
  add,
  info,
}
