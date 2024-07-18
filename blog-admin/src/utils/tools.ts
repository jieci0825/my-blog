import type { RouteRecordRaw } from 'vue-router'
import dayjs from 'dayjs'
import { MenuItem } from '@/apis/modules/menu/type'
import router from '@/routers'

// 格式化时间
export function formatTime(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(date).format(format)
}

// 检测是否为空
export function isEmpty(value: any): boolean {
	return value === null || value === undefined || value === ''
}

// 获取符合条件的动态路由
export function getDynamicRoutes(routes: RouteRecordRaw[], menus: MenuItem[], routeList: RouteRecordRaw[]) {
	menus.forEach(menu => {
		const route = routes.find(route => route.name === menu.menuName)
		if (menu.children && menu.children.length > 0) {
			getDynamicRoutes(routes, menu.children, routeList)
		}
		if (route) {
			route.meta = {
				title: menu.menuTitle,
				icon: menu.menuIcon,
				name: menu.menuName,
				id: menu.id
			}
			routeList.push(route)
		}
	})

	return routeList
}

// 注册动态路由
export function registerDynamicRoutes(routes: RouteRecordRaw[], menus: MenuItem[]) {
	const routeList: RouteRecordRaw[] = []
	getDynamicRoutes(routes, menus, routeList)
	// 添加路由配置
	routeList.forEach(route => {
		router.addRoute('layout', route)
	})
}

// 获取在 tree 数据中一个节点的所有祖先元素
export function getAncestorNodes<T extends { [key: string]: any }>(tree: T[], value: any, field: keyof T): T[] {
	const getNodes = (list: T[]) => {
		for (const item of list) {
			if (item[field] === value) {
				return [item]
			}
			if (item.children && item.children.length > 0) {
				const result: any = getNodes(item.children)
				if (result && result.length) {
					result.push(item)
					return result
				}
			}
		}
		return undefined
	}
	return getNodes(tree)
}

// 转换文件大小单位
const units = ['B', 'KB', 'MB', 'GB'] as const
type ByteUnit = (typeof units)[number]
export function convertBytes(bytes: number, toUnit: ByteUnit = 'MB') {
	const index = units.indexOf(toUnit.toUpperCase() as ByteUnit)

	if (index === -1) {
		throw new Error(`无效的单位。请使用以下其中之一: ${units.join(', ')}`)
	}

	let result = bytes
	for (let i = 0; i < index; i++) {
		result /= 1024
	}

	return result.toFixed(2) + ' ' + units[index]
}
