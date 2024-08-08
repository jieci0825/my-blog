const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('user') })
const { verifyFrontToken, verifyCaptcha } = require('@/middleware/auth.middleware')
const { getLoginUserInfo, register } = require('@con-front/user.controller')

// 获取登录用户的信息
router.get('/', verifyFrontToken, getLoginUserInfo)

// 注册用户
router.post('/register', verifyCaptcha, register)

module.exports = router
