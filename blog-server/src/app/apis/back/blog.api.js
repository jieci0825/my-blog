const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('blog') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { createBlog } = require('@con-back/blog.controller')

// 创建文章
router.post('/', verifyToken, verifySuperAdmin, createBlog)

module.exports = router
