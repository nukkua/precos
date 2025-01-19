import { DivisionResponse } from '@/interfaces/divisiones/divisiones';
import { LaravelErrorResponse, LaravelValidationError } from '@/interfaces/globals';
import { getDivision } from '@/services/getDivision';
import { postsDivision } from '@/services/postsDivision';
import { createStore } from 'zustand/vanilla'


interface DivisionDescription {
	id: number;
	cupos: number;
	confirmed: boolean;
}

type Division = Record<string, DivisionDescription>;

export interface DivisionsState {
	success?: boolean;
	errors?: LaravelValidationError | string;
	message?: string;
	divisions: Division
	isLoading: boolean;
}
export interface DivisionsActions {
	setDivision: (key: string, value: number, confirmed?: boolean) => void;
	setDivisionResponse: (divisionResponse: DivisionResponse) => void;
	setDivisionConfirmed: (key: string, confirmed: boolean) => void;
	clearDivisions: () => void;
	clearByDivision: (key: string) => void;
	postsDivision: (division: Division) => Promise<boolean>;

	getDivision: (token: string) => Promise<void>;
}

export type DivisionsStore = DivisionsState & DivisionsActions;


export const initDivisionsStore = (): DivisionsState => {
	return {
		divisions: {
			"1ra División - Viacha": { id: 1, cupos: 0, confirmed: false },
			"2da División - Oruro": { id: 2, cupos: 0, confirmed: false },
			"3ra División - Camiri": { id: 3, cupos: 0, confirmed: false },
			"4ta División - Cochabamba": { id: 4, cupos: 0, confirmed: false },
			"5ta División - Robore": { id: 5, cupos: 0, confirmed: false },
			"6ta División - Trinidad": { id: 6, cupos: 0, confirmed: false },
			"7ma División - Tarija": { id: 7, cupos: 0, confirmed: false },
			"8va División - Santa Cruz": { id: 8, cupos: 0, confirmed: false },
			"9na División - La Paz": { id: 9, cupos: 0, confirmed: false },
			"10ma División - Tupiza": { id: 10, cupos: 0, confirmed: false },
		},
		isLoading: false,
	}
}

export const defaultInitState: DivisionsState = {
	divisions: {
		"1ra División - Viacha": { id: 1, cupos: 0, confirmed: false },
		"2da División - Oruro": { id: 2, cupos: 0, confirmed: false },
		"3ra División - Camiri": { id: 3, cupos: 0, confirmed: false },
		"4ta División - Cochabamba": { id: 4, cupos: 0, confirmed: false },
		"5ta División - Robore": { id: 5, cupos: 0, confirmed: false },
		"6ta División - Trinidad": { id: 6, cupos: 0, confirmed: false },
		"7ma División - Tarija": { id: 7, cupos: 0, confirmed: false },
		"8va División - Santa Cruz": { id: 8, cupos: 0, confirmed: false },
		"9na División - La Paz": { id: 9, cupos: 0, confirmed: false },
		"10ma División - Tupiza": { id: 10, cupos: 0, confirmed: false },
	},
	isLoading: false,
}

export const createDivisionsStore = (
	initState: DivisionsState = defaultInitState,
) => {
	return createStore<DivisionsStore>()((set) => ({
		...initState,
		setDivision: (key: string, value: number, confirmed: boolean = false) => set((state) => ({
			...state,
			divisions: {
				...state.divisions,
				[key]: {
					...state.divisions[key],
					cupos: value,
					confirmed,
				},
			}

		})),

		setDivisionResponse: (divisionResponse: DivisionResponse) => {
			const divisions = divisionResponse?.data?.reduce((acc, division) => {
				acc[division.division] = {
					id: division.codigo,
					cupos: division.cupos_divisiones
						.reduce((sum, cupo) => sum + cupo.cupos, 0),
					confirmed: true,
				};
				return acc;
			}, {} as Division);

			set({
				...divisionResponse,
				divisions: divisions,
				isLoading: false,
			})

		},

		setDivisionConfirmed: (key: string, confirmed: boolean) => set((state) => ({
			...state,
			divisions: {
				...state.divisions,
				[key]: {
					...state.divisions[key],
					confirmed,
				}

			}
		})),
		clearDivisions: () => set((state) => ({
			...state,
			divisions: {
				"1ra División - Viacha": { id: 1, cupos: 0, confirmed: false },
				"2da División - Oruro": { id: 2, cupos: 0, confirmed: false },
				"3ra División - Camiri": { id: 3, cupos: 0, confirmed: false },
				"4ta División - Cochabamba": { id: 4, cupos: 0, confirmed: false },
				"5ta División - Robore": { id: 5, cupos: 0, confirmed: false },
				"6ta División - Trinidad": { id: 6, cupos: 0, confirmed: false },
				"7ma División - Tarija": { id: 7, cupos: 0, confirmed: false },
				"8va División - Santa Cruz": { id: 8, cupos: 0, confirmed: false },
				"9na División - La Paz": { id: 9, cupos: 0, confirmed: false },
				"10ma División - Tupiza": { id: 10, cupos: 0, confirmed: false },
			}

		})),
		clearByDivision: (key: string) => set((state) => ({
			...state,
			divisions: {
				...state.divisions,
				[key]: {
					...state.divisions[key],
					cupos: 0,
					confirmed: false,
				},
			}
		})),

		postsDivision: async (division: Division) => {
			set({ isLoading: true });
			try {
				await Promise.all(
					Object.values(division).map(divisionItem =>
						postsDivision({
							codigo_division: divisionItem.id,
							cupos: divisionItem.cupos,
							gestion_apertura: new Date().getFullYear().toString(),
						})
					)
				);
				set(state => ({
					...state,
					success: true,
					message: 'Divisiones creada con éxito.',
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
		getDivision: async (token: string) => {
			set({ isLoading: true });
			try {
				const response = await getDivision(new Date().getFullYear().toString(), token);

				const divisions = response?.data?.reduce((acc, division) => {
					acc[division.division] = {
						id: division.codigo,
						cupos: division.cupos_divisiones.reduce((sum, cupo) => sum + cupo.cupos, 0), // Suma de cupos
						confirmed: true,
					};
					return acc;
				}, {} as Division);

				set({
					divisions,
					success: true,
					message: response.message,
					errors: undefined,
				});

			} catch (error: unknown) {

				if (error instanceof Error) {
					set({
						success: false,
						message: error.message,
						errors: error.message,
					});
				} else {
					set({
						success: false,
						message: 'Error desconocido.',
						errors: { general: ['Error desconocido.'] },
					});
				}
			} finally {
				set({ isLoading: false });
			}
		},
	}))
}
