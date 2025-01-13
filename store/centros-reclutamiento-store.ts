import { type CentrosReclutamiento } from '@/interfaces/centros-reclutamiento/centros-reclutamiento';
import { LaravelValidationError } from '@/interfaces/globals';
import { getCentrosReclutamiento } from '@/services/getCentrosReclutamiento';
import { createStore } from 'zustand/vanilla'



export interface CentrosReclutamientoState {
	success?: boolean;
	errors?: LaravelValidationError;
	message?: string;
	centros?: CentrosReclutamiento[];
	centrosFiltered?: CentrosReclutamiento[];
	isLoading: boolean;
	search: string;
	divisionSelected: number;
	divisionSelectedToSearch: number;
	centroSelected: number;
}

export interface CentrosReclutamientoActions {
	setCentros: (centros?: CentrosReclutamiento[]) => void;
	postsCentros: (centro: CentrosReclutamiento) => Promise<void>;
	getCentros: () => Promise<void>;

	setCentrosFiltered: (selector: number | string, query: string) => void;

	setSearch: (search: string) => void;
	assignCupo: (centroId: number, cupo: number) => void;


	setDivisionSelected: (division: number) => void;
	setDivisionSelectedToSearch: (division: number) => void;
	setCentroSelected: (centroId: number) => void;

}

export type CentrosReclutamientoStore = CentrosReclutamientoState & CentrosReclutamientoActions;


export const initCentrosReclutamientoStore = (): CentrosReclutamientoState => {
	return {
		search: '',
		isLoading: false,
		divisionSelected: 1,
		divisionSelectedToSearch: 1,
		centroSelected: 1,
	}
}

export const defaultInitState: CentrosReclutamientoState = {
	search: '',
	isLoading: false,
	divisionSelected: 1,
	divisionSelectedToSearch: 1,
	centroSelected: 1,
}

export const createCentrosReclutamientoStore = (
	initState: CentrosReclutamientoState = defaultInitState,
) => {
	return createStore<CentrosReclutamientoStore>()((set, get) => ({
		...initState,
		setCentros: (centros?: CentrosReclutamiento[]) => {
			set((state) => ({ ...state, centros }));

		},
		postsCentros: async (centro: CentrosReclutamiento) => {

		},
		getCentros: async () => {

			set({ isLoading: true });

			try {
				const centros = await getCentrosReclutamiento();
				set({
					...centros,
					centros: centros.data,
					isLoading: false,
				});
				get().setCentrosFiltered(1, '');


			} catch (error: unknown) {
				console.error(error);
			}
		},
		setCentrosFiltered: (selector: number | string = -1, query: string = '') => {
			if (selector === -1) {
				set((state) => ({
					...state,
					centrosFiltered: state.centros,
				}));
				return;

			}

			const centrosFiltered = get().centros
				?.filter(centro => centro.codigo_division === Number(selector)
					&& centro.regimiento.toLowerCase().includes(query.toLowerCase()))


			set((state) => ({
				...state,
				centrosFiltered,
			}));

		},
		setSearch: (search: string) => {
			set(state => ({ ...state, search }))
		},
		setDivisionSelected: (division: number) => {
			const centrosFiltered = get().centros?.filter((centro) => centro.codigo_division === division) || [];
			const firstCentroId = centrosFiltered.length > 0 ? centrosFiltered[0].id : 0;

			set((state) => ({
				...state,
				divisionSelected: division,
				centroSelected: firstCentroId,
			}));
		},
		setDivisionSelectedToSearch: (division: number) => {
			set(state => ({ ...state, divisionSelectedToSearch: division }))
		},
		setCentroSelected: (centroId: number) => {
			set(state => ({ ...state, centroSelected: centroId }))
		},
		assignCupo: (centroId: number, cupo: number) => {
			const centros = get().centros?.map((centro) => {
				if (centro.id === centroId) {
					return {
						...centro,
						cupos: cupo,
					};
				}
				return centro;
			});
			set((state) => ({ ...state, centros, centrosFiltered: centros }));

		},

	}))
}
