'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
	type CentrosReclutamientoStore,
	createCentrosReclutamientoStore,
	initCentrosReclutamientoStore,
} from '@/store/centros-reclutamiento-store'

export type CentrosReclutamientoStoreApi = ReturnType<typeof createCentrosReclutamientoStore>

export const CentrosReclutamientoStoreContext = createContext<CentrosReclutamientoStoreApi | undefined>(
	undefined,
)

export interface CentrosReclutamientoStoreProviderProps {
	children: ReactNode
}

export const CentrosReclutamientoStoreProvider = ({
	children,
}: CentrosReclutamientoStoreProviderProps) => {
	const storeRef = useRef<CentrosReclutamientoStoreApi | null>(null)
	if (!storeRef.current) {
		storeRef.current = createCentrosReclutamientoStore(initCentrosReclutamientoStore())
	}

	return (
		<CentrosReclutamientoStoreContext.Provider value={storeRef.current}>
			{children}
		</CentrosReclutamientoStoreContext.Provider>
	)
}

export const useCentrosReclutamientoStore = <T,>(
	selector: (store: CentrosReclutamientoStore) => T,
): T => {
	const centrosReclutamientoStoreContext = useContext(CentrosReclutamientoStoreContext)

	if (!centrosReclutamientoStoreContext) {
		throw new Error(`use divisions must be used within centros provider `)
	}

	return useStore(centrosReclutamientoStoreContext, selector)
}
