'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
	type DivisionsStore,
	createDivisionsStore,
	initDivisionsStore,
} from '@/store/division-store'

export type DivisionsStoreApi = ReturnType<typeof createDivisionsStore>

export const DivisionsStoreContext = createContext<DivisionsStoreApi | undefined>(
	undefined,
)

export interface DivisionsStoreProviderProps {
	children: ReactNode
}

export const DivisionsStoreProvider = ({
	children,
}: DivisionsStoreProviderProps) => {
	const storeRef = useRef<DivisionsStoreApi | null>(null)
	if (!storeRef.current) {
		storeRef.current = createDivisionsStore(initDivisionsStore())
	}

	return (
		<DivisionsStoreContext.Provider value={storeRef.current}>
			{children}
		</DivisionsStoreContext.Provider>
	)
}

export const useDivisionsStore = <T,>(
	selector: (store: DivisionsStore) => T,
): T => {
	const divisionsStoreContext = useContext(DivisionsStoreContext)

	if (!divisionsStoreContext) {
		throw new Error(`use divisions must be used within divisioncontextprovider `)
	}

	return useStore(divisionsStoreContext, selector)
}
