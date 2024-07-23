<script setup lang="ts">
import { useTheme } from '@/hooks'
import { useGlobalActions, useGlobalGetters } from '@/store'

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

const { getCollapse, getAccordion, getRouteAnimation, getAsideWidth, getColorWeakness, getGrayMode } =
	useGlobalGetters()
const { toggleCollapse, toggleAccordion, toggleColorWeakness, toggleGrayMode, setRouteAnimation, setMenuWidth } =
	useGlobalActions()

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
		<!-- other -->
		<!-- 路由动画、折叠菜单、菜单手风琴、菜单宽度、灰色模式、色弱模式 -->
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
	width: 100%;
	.primary-box {
		margin-bottom: 20px;
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
	.config-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20px;
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
