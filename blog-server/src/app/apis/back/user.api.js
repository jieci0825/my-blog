const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('user') })
const {
	createUser,
	getLoginUserInfo,
	getUserList,
	assignRole,
	getLoginUserMenuList,
	editUser
} = require('@con-back/user.controller')
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 创建用户
router.post('/', verifyToken, createUser)

// 获取登录用户的信息
router.get('/', verifyToken, getLoginUserInfo)

// 获取用户列表
router.get('/list', verifyToken, parsePageInfo, getUserList)

// todo: 注销用户

// 给用户分配角色
router.post('/assign-role', verifyToken, assignRole)

// 获取登录用户的菜单列表
router.get('/menus', verifyToken, getLoginUserMenuList)

// 编辑用户信息
router.put('/', verifyToken, verifySuperAdmin, editUser)

module.exports = router
