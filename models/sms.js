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
    index: {expires: 60}
    // index: {expires: 300}
  }
}, {collection: 'sms'})

smsSchema.methods.validator = function () {
}

const Sms = mongoClient.model('Sms', smsSchema)

module.exports = Sms