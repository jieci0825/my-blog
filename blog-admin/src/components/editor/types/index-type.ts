export type IUploadFileType = 'image' | 'video'

export type InsertFnType = (url: string, name: string) => void

export type TUploadFile = ((file: File, insertFn: InsertFnType) => any) | null

export interface IProps {
	uploadFile?: null | TUploadFile
}

export interface IUseInitEditorConfigOptions {
	uploadFile?: TUploadFile
}
