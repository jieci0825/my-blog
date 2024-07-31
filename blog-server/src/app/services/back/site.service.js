const { getHistoryDateRange } = require('@/utils')
const { SiteData } = require('@model/site-data.model')
const { User } = require('@model/user.model')
const { Op, where } = require('sequelize')

/**
 * 获取站点访问数据
 */
async function getSiteVisits() {
	// 总访问量
	const totalVisits = await SiteData.findAll({})

	const othereVisits = {}

	const hoistoryDateRange = getHistoryDateRange(new Date())
	try {
		for (const key in hoistoryDateRange) {
			const range = hoistoryDateRange[key]
			const visits = await SiteData.findAll({ where: { date: { [Op.in]: range } } })
			othereVisits[key] = _calcSumVisits(visits)
		}
	} catch (error) {
		console.log(error.message)
	}

	return {
		total: _calcSumVisits(totalVisits),
		...othereVisits
	}
}

/**
 * 获取站点其他统计数据
 */
async function getSiteOtherStatistics() {
	// 总用户数量、点赞数量、评论数量
	const statisticData = {
		totalUser: 0,
		totalLike: 234,
		totalComment: 128
	}

	const userCount = await User.findAll({ where: { status: 1 } })
	statisticData.totalUser = userCount.length

	// todo: 获取点赞数量、评论数量

	return statisticData
}

function _calcSumVisits(visits) {
	return visits.reduce((acc, cur) => Math.floor(acc + cur.dataValues.site_day_visits), 0)
}

module.exports = {
	getSiteVisits,
	getSiteOtherStatistics
}
