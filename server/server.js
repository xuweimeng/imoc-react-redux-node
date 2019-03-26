const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./user');

const app = express()
app.use(cookieParser()) // 解析cookie
app.use(bodyParser.json()) // 接受post参数
app.use('/user', userRouter)

app.listen(9093, function() {
    console.log('Node app start at port 9093...')
})