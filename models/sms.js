const {Schema} = require('mongoose')
const {mongoClient} = require('../conf/mongo.js')

const smsSchema = new Schema({
  phone: {
    type: String,
  },
  code: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // ttl索引设置为4分50秒，是因为mongodb每60秒触发一次删除任务，如果设置了5钟，则会在6分时才删除
    index: {expires: 290}
  }
}, {collection: 'sms'})

smsSchema.methods.validator = function () {
}

const Sms = mongoClient.model('Sms', smsSchema)

module.exports = Sms