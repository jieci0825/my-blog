const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { getCredential, createFileRecord } = require('@con-back/file.controller')
const router = new Router({ prefix: genBackPrefix('file') })

// 获取临时凭证
router.post('/credential', verifyToken, verifySuperAdmin, getCredential)

// 添加文件记录
router.post('/record', verifyToken, verifySuperAdmin, createFileRecord)

module.exports = router
