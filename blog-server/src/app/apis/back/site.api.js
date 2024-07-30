const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('site') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { getSiteHomeInfo, getSiteVisits } = require('@con-back/site.controller')

// 获取站点首页信息
router.get('/home-info', verifyToken, getSiteHomeInfo)

// 获取站点访问数据
router.get('/visits', verifyToken, verifySuperAdmin, getSiteVisits)

module.exports = router
