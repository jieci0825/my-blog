import type { InjectionKey } from 'vue'
import type { TocNode } from './toc.type'

interface ITocKey {
	clickEvent: (tocItem: TocNode, evt: MouseEvent) => void
}

export const TocKey: InjectionKey<ITocKey> = Symbol('TocKey')
