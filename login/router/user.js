const express = require('express')
const router = express.Router()

//导入用户路由处理模块
const userHandler = require('../router_handler/user')

//导入验证表单数据中间件
const expressJoi = require('@escook/express-joi')
//验证对象
const { reg_login_schema } = require('../schema/user')

//局部中间件
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)


router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router