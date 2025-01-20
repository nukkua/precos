import { CentrosReclutamientoResponse, type CentrosReclutamiento } from '@/interfaces/centros-reclutamiento/centros-reclutamiento';
import { LaravelErrorResponse, LaravelValidationError } from '@/interfaces/globals';
import { getCentrosReclutamiento } from '@/services/getCentrosReclutamiento';
import { postsCentros } from '@/services/postsCentros';

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
	calledOnce: boolean;
}

export interface CentrosReclutamientoActions {
	setCentros: (centros?: CentrosReclutamiento[]) => void;
	setCentrosResponse: (centrosResponse: CentrosReclutamientoResponse) => void;

	postsCentros: (token: string) => Promise<boolean>;
	getCentros: (token: string) => Promise<void>;

	setCentrosFiltered: (selector: number | string, query: string) => void;

	setSearch: (search: string) => void;
	assignCupo: (centroId: number, cupo: number) => void;


	setDivisionSelected: (division: number) => void;
	setDivisionSelectedToSearch: (division: number) => void;
	setCentroSelected: (centroId: number) => void;

	handleReset: (centroId: number) => void;
	allConfirmed: () => boolean;

	setUnidad: (unidadId: number, centroId: number) => void;
	removeUnidad: (unidadId: number) => void;
	existsUnidad: (unidadId: number) => boolean;

}

export type CentrosReclutamientoStore = CentrosReclutamientoState & CentrosReclutamientoActions;


export const initCentrosReclutamientoStore = (): CentrosReclutamientoState => {
	return {
		search: '',
		isLoading: false,
		divisionSelected: 1,
		divisionSelectedToSearch: 1,
		centroSelected: 1,
		calledOnce: false,
	}
}

export const defaultInitState: CentrosReclutamientoState = {
	search: '',
	isLoading: false,
	divisionSelected: 1,
	divisionSelectedToSearch: 1,
	centroSelected: 1,
	calledOnce: false,
}

export const createCentrosReclutamientoStore = (
	initState: CentrosReclutamientoState = defaultInitState,
) => {
	return createStore<CentrosReclutamientoStore>()(
		(set, get) => ({
			...initState,
			setCentros: (centros?: CentrosReclutamiento[]) => {
				set((state) => ({ ...state, centros }));

			},
			setCentrosResponse: (centrosResponse: CentrosReclutamientoResponse) => {
				if (get().centros) {
					return;
				}

				set({
					...centrosResponse,
					centros: centrosResponse.data?.map(centro => ({
						...centro,
						cupos: !centro.cupos ? 1000 : centro.cupos,
						unidades: !centro.unidades ? [] : centro.unidades,
					})),
					isLoading: false,
				});

			},
			postsCentros: async (token: string) => {
				set({ isLoading: true });
				try {
					const centros = get().centros;

					if (!centros || centros.length === 0) {
						throw new Error('No hay centros disponibles para procesar.');
					}
					for (const centro of centros) {
						await postsCentros({
							id_centros_reclutamiento: centro.id,
							codigo_division: centro.codigo_division,
							cupo: centro.cupos,
							gestion: new Date().getFullYear(),
						}, token);
					}
					set(state => ({
						...state,
						success: true,
						message: 'Centros creada con éxito.',
						errors: undefined,
					}));

					return true;
				} catch (error: unknown) {
					if (error instanceof Error) {
						try {
							const errorData = JSON.parse(error.message) as LaravelErrorResponse;
							console.log(errorData);

							set(state => ({
								...state,
								success: false,
								errors: errorData.error,
								message: Object.values(errorData.error)[0]?.[0] || 'Error desconocido.',
							}));
						} catch {
							set(state => ({
								...state,
								success: false,
								message: error.message,
								errors: { general: [error.message] },
							}));
						}
					} else {
						set(state => ({
							...state,
							success: false,
							message: 'Error desconocido.',
							errors: { general: ['Error desconocido.'] },
						}));
					}

					return false;
				} finally {
					set({ isLoading: false });
				}
			},
			getCentros: async (token: string) => {
				if (get().centros) {
					return;
				}

				set({ isLoading: true });

				try {
					const centros = await getCentrosReclutamiento(new Date().getFullYear().toString(), token);
					set({
						success: true,
						centros: centros.data?.map(centro => ({
							...centro,
							cupos: !centro.cupos ? 1000 : centro.cupos,
							unidades: !centro.unidades ? [] : centro.unidades,
						})),
						message: centros.message,
						isLoading: false,
						errors: undefined,
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
						centrosFiltered: state.centros?.filter(centro => centro.regimiento.toLowerCase().includes(query.toLowerCase())),
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

				const centrosFiltered = get().centrosFiltered?.map((centro) => {
					if (centro.id === centroId) {
						return {
							...centro,
							cupos: cupo,
						};
					}
					return centro;
				});
				set((state) => ({ ...state, centros, centrosFiltered }));

			},
			handleReset: (centroId: number) => {

				const centrosFiltered = get().centrosFiltered?.map((centro) => {
					if (centro.id === centroId) {
						return {
							...centro,
							cupos: 0,
						};
					}
					return centro;
				});

				const centros = get().centros?.map((centro) => {
					if (centro.id === centroId) {
						return {
							...centro,
							cupos: 0,
						};
					}
					return centro;
				});
				set((state) => ({ ...state, centros, centrosFiltered }));
			},
			allConfirmed: () => {
				return get().centros?.every((centro) => centro.cupos > 0) || false;
			},

			setUnidad: (unidadId: number, centroId: number) => {
				const centro = get().centros?.find(c => c.id === centroId);
				if (!centro) {
					console.error(`Centro con ID ${centroId} no encontrado.`);
					return;
				}


				set((state) => ({
					...state,
					centros: state.centros?.map(centro =>
						centro.id === centroId ?
							{
								...centro,
								unidades:
									[...(centro.unidades || [])
										, unidadId]
							}
							: centro

					),
				}));
			},
			removeUnidad: (unidadId: number) => {
				set((state) => ({
					...state,
					centros: state.centros?.map(centro => ({
						...centro,
						unidades: centro.unidades.filter(unidad => unidad !== unidadId)

					})),
				}));
			},

			existsUnidad: (unidadId: number) => {
				return get().centros?.some(centro => centro.unidades.includes(unidadId)) ?? false;
			},

		}),

	)
}
