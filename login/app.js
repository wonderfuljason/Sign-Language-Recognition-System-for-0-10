const express = require('express')
const app = express()
const joi = require('@hapi/joi')
const config = require('./config')
const expressJWT = require('express-jwt')
//跨域
const cors = require('cors')
app.use(cors())

//解析表单数据（内部自带中间件）
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//配置解析token的中间件
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path: [/^\/api\//]}))


const userRouter = require('./router/user')
app.use('/api', userRouter)


// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)

    if (err.name ==='UnauthorizedError') return res.cc('身份认证失败')
    // 未知错误
    res.cc(err)
})

app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})