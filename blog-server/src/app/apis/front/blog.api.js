const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('blog') })
const { getBlogCategoryList, getBlogRank, getBlogList, getBlogDetail } = require('@con-front/blog.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')
const { verifyFrontToken } = require('@/middleware/auth.middleware')

// 获取博客列表
router.get('/', parsePageInfo, getBlogList)

// 获取博客分类列表
router.get('/category', verifyFrontToken, getBlogCategoryList)

// 获取博客排行榜
router.get('/rank', getBlogRank)

// 获取博客详情
router.get('/:id', getBlogDetail)

module.exports = router
