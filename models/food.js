const {Schema} = require('mongoose')

const foodSchema = new Schema({
  name: {
    type: String,
    description: '食品名称',
  },
  type: {
    type: String,
    description: '食品种类'
  },
  rl: {
    type: Number,
    description: '热量(大卡)',
  },
  dbz: {
    type: Number,
    description: '蛋白质',
  },
  zf: {
    type: Number,
    description: '脂肪',
  },
  shhf: {
    type: Number,
    description: '碳水化合物',
  },
  ssxw: {
    type: Number,
    description: '膳食纤维',
  },
  dgc: {
    type: Number,
    description: '胆固醇',
  },
  las: {
    type: Number,
    description: '硫胺素（维生素B1）',
  },
  su: {
    type: Number,
    description: '核黄素（维生素B2）',
  },
  wsfc: {
    type: Number,
    description: '维生素C',
  },
  ys: {
    type: Number,
    description: '烟酸',
  },
  wsse: {
    type: Number,
    description: '维生素E',
  },
  wssa: {
    type: Number,
    description: '维生素A',
  },
  lb: {
    type: Number,
    description: '胡罗卜素',
  },
  shc: {
    type: Number,
    description: '视黄醇当量',
  },
  gai: {
    type: Number,
    description: '钙(毫克)',
  },
  mei: {
    type: Number,
    description: '镁',
  },
  tei: {
    type: Number,
    description: '铁',
  },
  meng: {
    type: Number,
    description: '锰',
  },
  xin: {
    type: Number,
    description: '锌',
  },
  tong: {
    type: Number,
    description: '铜',
  },
  jia: {
    type: Number,
    description: '钾',
  },
  ling: {
    type: Number,
    description: '磷',
  },
  la: {
    type: Number,
    description: '钠',
  },
  xi: {
    type: Number,
    description: '硒',
  },
})

module.exports = foodSchema;