const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const mongoClient = mongoose.connection;
mongoClient.on('error', console.error.bind(console, 'connection error:'))
mongoClient.on('connected', function () {
  console.log("mongodb connected!")
})

function close() {
  mongoClient.close()
}

module.exports = {
  mongoClient,
  close
}

