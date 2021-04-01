// 聚合数据api，网址：https://www.juhe.cn/
// 每日 100次

const axios = require('axios')
const key = process.env.JUHE_235_KEY

/**
 * 获取新闻列表
 * @param page 当前页数，默认1，最大50
 * @param pageSize 每页返回条数，默认30，最大30
 * @returns {Promise<{news: *, page: number, page_size: number}|null>}
 */
const getNews = async (page = 1, pageSize = 30) => {
  const url = 'http://v.juhe.cn/toutiao/index'

  const response = await axios.get(url, {
    params: {
      key: key,
      type: 'jiankang',
      page: page,
      page_size: pageSize
    }
  })

  // error_code 为 0 表示成功请求到数据
  if (response.data.error_code === 0) {
    return {
      page: page,
      page_size: pageSize,
      news: response.data.result.data,
    }
  } else {
    return null
  }
}

/**
 * 获取新闻内容
 * @param uniquekey 新闻ID
 * @returns {Promise<{uniquekey: *, detail: *, content: *}|null>}
 */
const getContent = async (uniquekey) => {
  const url = 'http://v.juhe.cn/toutiao/content'

  const response = await axios.get(url, {
    params: {
      key: key,
      uniquekey: uniquekey
    }
  })

  // error_code 为 0 表示成功请求到数据
  if (response.data.error_code === 0) {
    const detail = response.data.result.detail
    const content = response.data.result.content
    return {
      uniquekey: response.data.result.uniquekey,
      detail: detail,
      content: content
    }
  } else {
    return null
  }
}

module.exports = {
  getNews,
  getContent
}