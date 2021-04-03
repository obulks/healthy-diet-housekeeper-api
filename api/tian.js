// 天行数据api，网址：https://www.tianapi.com/

const axios = require('axios')
const key = process.env.TIANAPI_KEY

/**
 * 根据食物类型查询食物列表
 * @param word 类型名称
 * @param page 翻页
 * @returns {Promise<null|{foods: *, page: *}>}
 */
const getFoodList = async (word, page) => {
  const url = 'http://api.tianapi.com/txapi/nutrient/index'

  const response = await axios.get(url, {
    params: {
      key: key,
      mode: 1,
      num: 20,
      page: page,
      word: word,
    }
  })

  if (response.data.code === 200) {
    return {
      code: 200,
      page: page,
      foods: response.data.newslist,
    }
  } else if (response.data.code === 250) {
    return {
      code: 210,
      msg: response.data.msg,
    }
  } else {
    return null
  }
}

const searchFood = async (word, page) => {
  const url = 'http://api.tianapi.com/txapi/nutrient/index'

  const response = await axios.get(url, {
    params: {
      key: key,
      mode: 0,
      num: 20,
      page: page,
      word: word,
    }
  })

  if (response.data.code === 200) {
    return {
      code: 200,
      page: page,
      foods: response.data.newslist,
    }
  } else if (response.data.code === 250) {
    return {
      code: 210,
      msg: response.data.msg,
    }
  } else {
    return null
  }
}

module.exports = {
  getFoodList,
  searchFood
}