const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('global') })
const { getAuthorInfo, getSiteHomeInfo } = require('@con-front/global.controller')

// 获取作者信息
router.get('/auhtor', getAuthorInfo)

// 获取站点首页信息
router.get('/site-home-info', getSiteHomeInfo)

module.exports = router
