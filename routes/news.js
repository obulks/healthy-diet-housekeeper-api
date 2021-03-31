const express = require('express');
const router = express.Router();
const gne = require('../util/gne.js')
const juhe = require('../api/juhe.js')

router.get('/', async (req, res) => {
  const page = req.query.page
  const pageSize = req.query.page_size

  let result = await juhe.getNews(page, pageSize)
  if (result) {
    res.json({
      code: 200,
      msg: 'ok',
      data: result,
    })
  } else {
    res.json({
      code: 400,
      msg: 'error',
      data: {}
    })
  }
})

router.get('/content', async (req, res) => {
  const url = req.query.url
  url
  const content = await gne.extract(url)

  res.json({
    code: 200,
    msg: "ok",
    data: {
      content: content
    }
  })
})

module.exports = router;