const express = require('express')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index.js')
const usersRouter = require('./routes/users.js')
const dietsRouter = require('./routes/diets.js')
const smsRouter = require('./routes/sms.js')
const newsRouter = require('./routes/news.js')
const foodsRouter = require('./routes/foods.js')

const port = 10001
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/diets', dietsRouter)
app.use('/sms', smsRouter)
app.use('/news', newsRouter)
app.use('/foods', foodsRouter)

app.listen(port, () => {
  console.log(`express server listening at http://localhost:${port}`)
})
