const express = require('express');
const router = express.Router();
const juhe = require('../api/juhe.js')

router.get('/', async (req, res) => {
  const page = req.query.page
  const pageSize = req.query.page_size

  let result = await juhe.getNews(page, pageSize)

  if (result) {
    res.json({
      code: 200,
      msg: 'success',
      data: result,
    })
  } else {
    res.json({
      code: 400,
      msg: 'filed',
      data: {}
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