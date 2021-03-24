const { Schema } = require('mongoose')
const { mongoClient } = require('../conf/mongo.js')

const bodyInfoSchema = new Schema({
  sex: { type: String },
  birthday: { type: Date },
  height: { type: Number },
  weight: { type: Number },
}, { _id: false })

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  phone: { type: String },
  body_info: { type: bodyInfoSchema }
}, {
  collection: 'users'
})

const User = mongoClient.model('User', userSchema)

module.exports = User