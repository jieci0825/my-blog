const { SiteData } = require('@/app/models/site-data.model')
const schedule = require('node-schedule')
const { formatDateTime } = require('.')
/**
 * 每天0点给 site_datas 表增加一条数据
 */
async function createSiteData() {
	// 每天的 0 点执行
	schedule.scheduleJob('0 0 0 * * *', function () {
		SiteData.create({ date: formatDateTime(new Date()) })
	})
}

module.exports = {
	createSiteData
}
