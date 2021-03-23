const { Schema } = require('mongoose')
const { mongoClient } = require('../conf/mongo.js')

const bodyInfoSchema = new Schema({
  sex: String,
  birthday: Date,
  height: Number,
  weight: Number,

})
const userSchema = new Schema({
  username: String,
  password: String,
  phone: String,
  body_info: [bodyInfoSchema]
}, { collection: 'users' })

const User = mongoClient.model('User', userSchema)

module.exports = User