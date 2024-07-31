const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('tag') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { createTags, getTagList, editTag, deleteTag } = require('@con-back/tag.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 创建标签
router.post('/', verifyToken, verifySuperAdmin, createTags)

// 获取标签列表
router.get('/', verifyToken, parsePageInfo, getTagList)

// 编辑标签
router.put('/', verifyToken, verifySuperAdmin, editTag)

// 删除标签
router.delete('/:id', verifyToken, verifySuperAdmin, deleteTag)

module.exports = router
