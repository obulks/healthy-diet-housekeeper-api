const User = require('../models/user.js')

const find = (phone) => {
  return User.findOne({ phone })
}

const has = async (phone) => {
  return await find(phone) === null
}

const add = (phone) => {
  const user = new User({
    username: null,
    phone: phone
  })
  return User.create(user)
}

const info = (id) => {
  return User.findById(id)
}

const update = (id, doc) => {
  return User.findByIdAndUpdate({ _id: id }, doc)
}

const remove = () => {
}


module.exports = {
  find,
  has,
  add,
  info,
  update,
}
