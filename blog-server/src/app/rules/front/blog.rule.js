const { Rule } = require('@/validator')

const getBlogRankRules = {
	type: new Rule().enum(['hot', 'latest'])
}

module.exports = {
	getBlogRankRules
}
