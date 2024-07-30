const { SiteData } = require('@/app/models/site-data.model')
const schedule = require('node-schedule')
const { formatDateTime } = require('.')
/**
 * 每天0点给 site_datas 表增加一条数据
 */
async function createSiteData() {
	// 每天的 0 点执行
	schedule.scheduleJob('0 0 0 * * *', async function () {
		const today = formatDateTime(new Date())
		// 如果今天的日期存在，则不创建
		const data = await SiteData.findOne({ date: today })
		console.log('🚢 ~ 当前打印的内容 ~ data:', data)
		if (!data) {
			SiteData.create({ date: today })
		}
	})
}

module.exports = {
	createSiteData
}
