const {Schema} = require('mongoose')
const {mongoClient} = require('../conf/mongo.js')

const foodSchema = new Schema({
  name: String,
  intake: String,
  rl: Number,
  type: String
})

const dietSchema = new Schema({
  date: {type: String},
  user: Schema.Types.ObjectId,
  foods: [foodSchema]
}, {
  collection: 'diets'
})

const Diet = mongoClient.model('Diet', dietSchema)

module.exports = Diet
