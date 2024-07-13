const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('token') })
const { token } = require('@con-back/token.controller')

// 获取token
router.post('/', token)

module.exports = router
