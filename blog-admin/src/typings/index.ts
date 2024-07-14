export type ExtractFields<T extends { field: string }[]> = {
	[K in T[number]['field']]: any
}
