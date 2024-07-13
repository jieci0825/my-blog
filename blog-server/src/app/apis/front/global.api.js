const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('global') })
const { getAuthorInfo } = require('@con-front/global.controller')

// 获取作者信息
router.get('/auhtor', getAuthorInfo)

module.exports = router
