import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { SiteHomeInfo, SiteVisitData, SiteOtherStatisticData } from './type'

/**
 * 获取站点首页信息
 */
export function reqGetSiteHomeInfo() {
	return request.get<IBaseType<SiteHomeInfo>>({ url: '/site/home-info' })
}

/**
 * 获取站点访问数据
 */
export function reqGetSiteVisitData() {
	return request.get<IBaseType<SiteVisitData>>({ url: '/site/visits' })
}

/**
 * 获取站点其他统计数据
 */
export function reqGetSiteOtherStatisticData() {
	return request.get<IBaseType<SiteOtherStatisticData>>({ url: '/site/other-statistics' })
}
