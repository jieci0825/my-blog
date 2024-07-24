<script setup lang="ts">
import { LAYOUT_MODE } from '@/constants'
import { useTheme } from '@/hooks'
import { useGlobalActions, useGlobalGetters } from '@/store'
import { Notification, Ship, Setting, CircleCheckFilled } from '@element-plus/icons-vue'

defineOptions({ name: 'GlobalSetting' })

const primaryColor = [
	{ name: '水龙吟', hex: '#84a729' },
	{ name: '苍苍', hex: '#526efa' },
	{ name: '霁青', hex: '#63bbd0' },
	{ name: '天水碧', hex: '#55a3ae' },
	{ name: '琥珀', hex: '#ff7400' },
	{ name: '鹤顶', hex: '#d50021' }
]

const { curPrimaryColor, setPrimaryColor } = useTheme()

const { getCollapse, getAccordion, getRouteAnimation, getAsideWidth, getColorWeakness, getGrayMode, getLayoutMode } =
	useGlobalGetters()
const {
	toggleCollapse,
	toggleAccordion,
	toggleColorWeakness,
	toggleGrayMode,
	setRouteAnimation,
	setMenuWidth,
	setLayoutMode
} = useGlobalActions()

const routerAnimation = [
	{ name: '淡入淡出', value: 'fade' },
	{ name: '滑动', value: 'slide' },
	{ name: '卷帘门', value: 'fade-in' },
	{ name: '滑动+淡入淡出', value: 'slide-fade' }
]
</script>

<template>
	<div class="global-setting-wrapper">
		<!-- primary -->
		<el-divider>
			<div class="divider-box">
				<el-icon><Ship /></el-icon>
				主题色彩
			</div>
		</el-divider>
		<div class="primary-box">
			<div
				@click="setPrimaryColor(item.hex)"
				class="primary-box-item"
				v-for="item in primaryColor"
				:key="item.hex"
				:style="{ '--c': item.hex }">
				<div class="preview"></div>
				<div class="info">
					<span class="color-name">{{ item.name }}</span>
					<span class="color-value">{{ item.hex }}</span>
				</div>
				<div
					class="select"
					v-if="item.hex === curPrimaryColor">
					<JcLogo></JcLogo>
				</div>
			</div>
		</div>
		<!-- layout -->
		<el-divider>
			<div class="divider-box">
				<el-icon><Notification /></el-icon>
				布局模式
			</div>
		</el-divider>
		<div class="layout-box">
			<el-tooltip
				placement="top"
				content="纵向">
				<div
					@click="setLayoutMode(LAYOUT_MODE.VERTICAL)"
					:class="['layout-item', getLayoutMode === LAYOUT_MODE.VERTICAL ? 'is-active' : '']">
					<div class="layout-horizontal">
						<div class="layout-aside light"></div>
						<div class="layout-vertical">
							<div class="layout-header dark"></div>
							<div class="layout-main"></div>
						</div>
					</div>
					<el-icon :size="18">
						<CircleCheckFilled />
					</el-icon>
				</div>
			</el-tooltip>
			<el-tooltip
				placement="top"
				content="横向">
				<div
					@click="setLayoutMode(LAYOUT_MODE.HORIZONTAL)"
					:class="['layout-item', getLayoutMode === LAYOUT_MODE.HORIZONTAL ? 'is-active' : '']">
					<div class="layout-vertical">
						<div class="layout-header dark"></div>
						<div class="layout-main"></div>
					</div>
					<el-icon :size="18">
						<CircleCheckFilled />
					</el-icon>
				</div>
			</el-tooltip>
		</div>
		<!-- other -->
		<el-divider>
			<div class="divider-box">
				<el-icon><Setting /></el-icon>
				其他设置
			</div>
		</el-divider>
		<div class="config-box">
			<div class="config-item">
				<div class="label">折叠菜单</div>
				<div class="content">
					<el-switch
						@change="toggleCollapse"
						:model-value="getCollapse"
						inline-prompt
						active-text="开启"
						inactive-text="关闭" />
				</div>
			</div>
			<div class="config-item">
				<div class="label">菜单手风琴</div>
				<div class="content">
					<el-switch
						@change="toggleAccordion"
						:model-value="getAccordion"
						inline-prompt
						active-text="开启"
						inactive-text="关闭" />
				</div>
			</div>
			<div class="config-item">
				<div class="label">路由动画</div>
				<div class="content">
					<el-select
						@change="setRouteAnimation"
						:model-value="getRouteAnimation"
						placeholder="Select"
						style="width: 180px">
						<el-option
							v-for="item in routerAnimation"
							:key="item.value"
							:label="item.name"
							:value="item.value" />
					</el-select>
				</div>
			</div>
			<div class="config-item">
				<div class="label">菜单宽度</div>
				<div class="content">
					<el-input-number
						:model-value="getAsideWidth"
						:min="200"
						:max="300"
						@change="setMenuWidth" />
				</div>
			</div>
			<div class="config-item">
				<div class="label">灰色模式</div>
				<div class="content">
					<el-switch
						@change="toggleGrayMode"
						:model-value="getGrayMode"
						inline-prompt
						active-text="开启"
						inactive-text="关闭" />
				</div>
			</div>
			<div class="config-item">
				<div class="label">色弱模式</div>
				<div class="content">
					<el-switch
						@change="toggleColorWeakness"
						:model-value="getColorWeakness"
						inline-prompt
						active-text="开启"
						inactive-text="关闭" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.global-setting-wrapper {
	margin-top: -20px;
	width: 100%;
	.primary-box {
		margin-bottom: 30px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20px;
		.primary-box-item {
			width: calc((100% - 20px) / 2);
			height: 60px;
			padding: 5px 10px 5px 5px;
			border-radius: 8px;
			cursor: pointer;
			border: 2px dashed var(--c);
			display: flex;
			align-items: center;
			.preview {
				width: 8px;
				height: 100%;
				background-color: var(--c);
				border-radius: 8px;
			}
			.info {
				flex: 1;
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				color: var(--c);
				font-size: 16px;
				.color-name {
					font-weight: bold;
				}
				.color-value {
					margin-top: 5px;
				}
			}
			.select {
				svg {
					width: 30px;
					height: 30px;
					fill: var(--c);
					margin-left: 10px;
				}
			}
		}
	}
	.divider-box {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 18px;
	}
	.layout-box {
		margin-bottom: 30px;
		display: flex;
		gap: 50px;
		justify-content: center;
		.layout-item {
			position: relative;
			width: 120px;
			height: 80px;
			border-radius: 6px;
			cursor: pointer;
			padding: 8px;
			transition: box-shadow 0.25s;
			box-shadow: 0 0 5px 1px var(--el-border-color-dark);
			display: flex;
			flex-direction: column;
			gap: 8px;
			&:hover {
				box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
			}
			:deep(.el-icon) {
				display: none;
				position: absolute;
				right: 10px;
				bottom: 10px;
				width: 20px;
				height: 20px;
				color: var(--el-color-primary);
			}
			&.is-active {
				box-shadow: none;
				border: 2px solid var(--el-color-primary);
				:deep(.el-icon) {
					display: block;
				}
			}
			.layout-horizontal {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				gap: 8px;
			}
			.layout-vertical {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				gap: 8px;
			}
			.layout-header,
			.layout-aside,
			.layout-main {
				background-color: var(--el-color-primary-light-8);
				border-radius: 4px;
			}
			.layout-header {
				height: 15px;
			}
			.layout-aside {
				width: 20px;
				height: 100%;
			}
			.layout-main {
				flex: 1;
				border: 1px dashed var(--el-color-primary);
			}
			.dark {
				background-color: var(--el-color-primary);
			}
			.light {
				background-color: var(--el-color-primary-light-5);
			}
		}
	}
	.config-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 10px;
		.config-item {
			width: calc((100% - 20px) / 2);
			display: flex;
			align-items: center;
			.label {
				width: 100px;
				font-size: 16px;
			}
		}
	}
}
</style>
