const mongoose = require('mongoose');

// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chart'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    'avator': {type: String}, // 头像
    'desc': {type: String}, // 个人简介、职位简介
    'title': {type: String}, // 职位名
    'company': {type: String},
    'money': {type: String}
  },
  chat: {
    
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}