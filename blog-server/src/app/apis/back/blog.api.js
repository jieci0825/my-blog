const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('blog') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { createBlog, getBlogList } = require('@con-back/blog.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 创建文章
router.post('/', verifyToken, verifySuperAdmin, createBlog)

// 获取博客列表
router.get('/', verifyToken, parsePageInfo, getBlogList)

module.exports = router
