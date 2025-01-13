'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
	type AperturaStore,
	createAperturaStore,
	initAperturaStore,
} from '@/store/apertura-store'

export type AperturaStoreApi = ReturnType<typeof createAperturaStore>

export const AperturaStoreContext = createContext<AperturaStoreApi | undefined>(
	undefined,
)

export interface AperturaStoreProviderProps {
	children: ReactNode
}

export const AperturaStoreProvider = ({
	children,
}: AperturaStoreProviderProps) => {
	const storeRef = useRef<AperturaStoreApi | null>(null)
	if (!storeRef.current) {
		storeRef.current = createAperturaStore(initAperturaStore())
	}

	return (
		<AperturaStoreContext.Provider value={storeRef.current}>
			{children}
		</AperturaStoreContext.Provider>
	)
}

export const useAperturaStore = <T,>(
	selector: (store: AperturaStore) => T,
): T => {
	const aperturaStoreContext = useContext(AperturaStoreContext)

	if (!aperturaStoreContext) {
		throw new Error(`useCounterStore must be used within CounterStoreProvider`)
	}

	return useStore(aperturaStoreContext, selector)
}
