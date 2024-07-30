const { getHistoryDateRange } = require('@/utils')
const { SiteData } = require('@model/site-data.model')
const { Sequelize, Op } = require('sequelize')

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
		totalVisits: _calcSumVisits(totalVisits),
		...othereVisits
	}
}

function _calcSumVisits(visits) {
	return visits.reduce((acc, cur) => Math.floor(acc + cur.dataValues.site_day_visits), 0)
}

module.exports = {
	getSiteVisits
}
