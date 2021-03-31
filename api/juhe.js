const axios = require('axios')

const key = process.env.JUHE_235_KEY

const getNews = async (page = 1, pageSize = 30) => {
  const url = 'http://v.juhe.cn/toutiao/index'

  const response = await axios.get(url, {
    params: {
      'key': key,
      type: 'jiankang',
      'page': page,
      'page_size': pageSize
    }
  })

  console.log(response.data)

  // error_code 为 0 表示成功请求到数据
  if (response.data.error_code === 0) {
    return {
      page: page,
      page_size: pageSize,
      news_list: response.data.result.data
    }
  } else {
    return null
  }
}

module.exports = {
  getNews
}