<script setup lang="ts">
import { inject, ref } from 'vue'
import { Plus, Edit, Delete, ZoomIn } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import type { UploadFile, UploadFiles, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { convertBytes, previewImage } from '@/utils'
import { JcUploadKey } from './constants'

const jcUploadInject = inject(JcUploadKey, undefined)

// 图片预览数组
const previewImages = ref<string[]>([jcUploadInject?.initPreviewImage])
// 单文件上传组件实例
const oneUploadRef = ref<UploadInstance>()
// 单文件上传组件预览图
const onePreviewImage = ref((jcUploadInject?.initPreviewImage as string) || '')
// 替换上一个文件-保持单个文件上传
const handleExceed: UploadProps['onExceed'] = files => {
	oneUploadRef.value!.clearFiles()
	const file = files[0] as UploadRawFile
	file.uid = genFileId()
	oneUploadRef.value!.handleStart(file)
}
// 监听单文件变化
const onOneChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	// 校验文件格式
	const types = jcUploadInject?.accept!.split(',')
	if (types && !types.includes(uploadFile.raw?.type!)) {
		ElMessage.error(`文件格式不正确，当前文件格式${uploadFile.raw?.type}`)
		return
	}

	// 校验文件大小
	if (uploadFile.size! > jcUploadInject?.fileSize!) {
		ElMessage.error(`文件大小超过限制，当前文件大小${convertBytes(uploadFile.size!)}`)
		return
	}

	// 读取文件数据，转为本地预览图
	const reader = new FileReader()
	reader.onload = res => {
		if (res?.target?.result) {
			const dataUrl = res.target.result as string
			onePreviewImage.value = dataUrl
			previewImages.value = [dataUrl]
		}
	}
	reader.readAsDataURL(uploadFile.raw!)

	jcUploadInject?.setModelValue(uploadFile.raw!)

	jcUploadInject?.uploadFileVerify && jcUploadInject.uploadFileVerify(uploadFile, uploadFiles)
}
// 单文件编辑方法
const handleOneEdit = () => {
	const container = oneUploadRef.value?.$el
	container && container.querySelector('.el-upload__input')?.click()
}
// 单文件删除方法
const handleOneDelete = () => {
	onePreviewImage.value = ''
}
// 单文件预览方法
const handleOnePreview = () => {
	previewImage({ initialIndex: 0, urlList: previewImages.value })
}
</script>

<template>
	<div
		class="one-upload-wrapper"
		v-if="jcUploadInject?.model === 'one'">
		<div
			class="one-upload"
			:style="jcUploadInject?.oneStyle">
			<el-upload
				:show-file-list="false"
				ref="oneUploadRef"
				action="#"
				:limit="1"
				:accept="jcUploadInject?.accept"
				:on-change="onOneChange"
				:on-exceed="handleExceed"
				v-bind="jcUploadInject?.otherELConfig"
				:auto-upload="false">
				<el-icon :size="25"><Plus /></el-icon>
			</el-upload>

			<!-- 预览 -->
			<div
				v-if="onePreviewImage"
				class="preview-box">
				<div class="mask">
					<div class="actions">
						<div
							class="action-item"
							@click="handleOneEdit">
							<el-icon :size="18">
								<Edit />
							</el-icon>
							<span>编辑</span>
						</div>
						<div
							class="action-item"
							@click="handleOnePreview">
							<el-icon :size="18">
								<ZoomIn />
							</el-icon>
							<span>预览</span>
						</div>
						<div
							class="action-item"
							@click="handleOneDelete">
							<el-icon :size="18">
								<Delete />
							</el-icon>
							<span>删除</span>
						</div>
					</div>
				</div>
				<img
					:src="onePreviewImage"
					alt="加载失败" />
			</div>
		</div>
		<template v-if="jcUploadInject?.oneTip">
			<div class="tip-box">
				<span>{{ jcUploadInject?.oneTip }}</span>
			</div>
		</template>
	</div>
</template>

<style lang="less" scoped>
.one-upload-wrapper {
	.one-upload {
		width: 140px;
		height: 140px;
		border: 2px dashed var(--text-color-3);
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border-color 0.25s;
		position: relative;
		&:hover {
			cursor: pointer;
			border-color: var(--primary-color);
		}
		& > div {
			width: 100%;
			height: 100%;
		}
		:deep(.el-upload) {
			width: 100%;
			height: 100%;
		}
		.preview-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 6px;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			.mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.3);
				opacity: 0;
				transition: opacity 0.25s;
				.actions {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 5px;
					.action-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						cursor: pointer;
						color: #fff;
						transition: color 0.25s;
						&:hover {
							color: var(--primary-color);
						}
						span {
							font-size: 14px;
						}
					}
				}
			}
			&:hover .mask {
				opacity: 1;
			}
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
	.tip-box {
		color: var(--text-color-3);
	}
}
</style>
