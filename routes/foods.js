const express = require('express');
const router = express.Router();
const tian = require('../api/tian.js')

router.get('/', async (req, res) => {
  const word = req.query.word
  const page = req.query.page

  let result = await tian.searchFood(word, page)
  if (result) {
    switch (result.code) {
      case 200:
        res.json({
          code: 200,
          msg: '查询成功',
          data: {
            page: result.page,
            foods: result.foods
          },
        })
        break
      case 210:
        res.json({
          code: 210,
          msg: '查询结果为空',
          data: {},
        })
        break
    }
  } else {
    res.json({
      code: 400,
      msg: 'failed',
      data: {},
    })
  }
})

router.get('/list', async (req, res) => {
  const word = req.query.word
  const page = req.query.page

  let result = await tian.getFoodList(word, page)
  if (result) {
    switch (result.code) {
      case 200:
        res.json({
          code: 200,
          msg: '查询成功',
          data: {
            page: result.page,
            foods: result.foods
          },
        })
        break
      case 210:
        res.json({
          code: 210,
          msg: '查询结果为空',
          data: {},
        })
        break
    }
  } else {
    res.json({
      code: 400,
      msg: 'failed',
      data: {},
    })
  }
})

router.get('/content', async (req, res) => {
  const uniquekey = req.query.uniquekey

  const result = await juhe.getContent(uniquekey)
  if (result) {
    res.json({
      code: 200,
      msg: "success",
      data: result
    })
  } else {
    res.json({
      code: 400,
      msg: 'failed',
      data: {}
    })
  }
})

module.exports = router;