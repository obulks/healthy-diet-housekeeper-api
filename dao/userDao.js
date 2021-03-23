const User = require('../models/user.js')

const find = async (phone) => {
  return await User.findOne({ phone })
}

const hasUser = async (phone) => {
  return await find(phone) === null
}

const addUser = async (user) => {
  User.create(user)
}

const info = async (id) => {
  return  User.findById(id)
}


module.exports = {
  find,
  hasUser,
  addUser,
  info,
}
