const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('user') })
const { verifyFrontToken } = require('@/middleware/auth.middleware')
const { getLoginUserInfo } = require('@con-front/user.controller')

// 获取登录用户的信息
router.get('/', verifyFrontToken, getLoginUserInfo)

module.exports = router
