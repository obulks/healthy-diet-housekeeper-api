const { customAlphabet } = require('nanoid')

const username = () => {
  return  `用户${customAlphabet('1234567890', 9)()}`
}

module.exports = {
  username
}
