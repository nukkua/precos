'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
	type UnidadesStore,
	createUnidadesStore,
	initUnidadesStore,
} from '@/store/unidades-store'

export type UnidadesStoreApi = ReturnType<typeof createUnidadesStore>

export const UnidadesStoreContext = createContext<UnidadesStoreApi | undefined>(
	undefined,
)

export interface UnidadesStoreProviderProps {
	children: ReactNode
}

export const UnidadesStoreProvider = ({
	children,
}: UnidadesStoreProviderProps) => {
	const storeRef = useRef<UnidadesStoreApi | null>(null)
	if (!storeRef.current) {
		storeRef.current = createUnidadesStore(initUnidadesStore())
	}

	return (
		<UnidadesStoreContext.Provider value={storeRef.current}>
			{children}
		</UnidadesStoreContext.Provider>
	)
}

export const useUnidadesStore = <T,>(
	selector: (store: UnidadesStore) => T,
): T => {
	const unidadesStoreContext = useContext(UnidadesStoreContext)

	if (!unidadesStoreContext) {
		throw new Error(`use divisions must be used within centros provider `)
	}

	return useStore(unidadesStoreContext, selector)
}
