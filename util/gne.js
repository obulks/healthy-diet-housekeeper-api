const GeneralNewsExtractor = require('general-news-extractor')
const axios = require('axios')
const gne = new GeneralNewsExtractor()

const extract = async (url) => {
  if (url === undefined) {
    return ''
  }
  try {
    let response = await axios.get(url)
    const htmlString = `${response.data}`
    const result = gne.extract(htmlString, {})

    return result.content
  } catch (e) {
    console.log(`Axios ${e}`)
    return ''
  }

}

module.exports = {
  extract
}