import { AperturaResponse } from '@/interfaces/apertura/apertura';
import { LaravelValidationError, LaravelErrorResponse } from '@/interfaces/globals';
import { getApertura } from '@/services/getApertura';
import { postApertura } from '@/services/postApertura';
import { createStore } from 'zustand/vanilla'

export interface AperturaState {
	success?: boolean;
	errors?: LaravelValidationError;
	message?: string;
	apertura: Apertura;
	isLoading: boolean;
}
export interface Apertura {
	gestion?: number;
	cantidad?: number;
	fechaLimiteEdad?: string;
	fechaLimiteApertura?: string;
	edadMinima?: number;
	edadMaxima?: number;
}

export interface AperturaActions {
	setApertura: (name: string, value: string | number) => void;
	setAperturaResponse: (aperturaResponse: AperturaResponse) => void;
	clearApertura: () => void;
	postApertura: (apertura: Apertura) => Promise<boolean>;
	getApertura: (token: string) => Promise<void>;
}

export type AperturaStore = AperturaState & AperturaActions


export const initAperturaStore = (): AperturaState => {
	return {
		apertura: {
			gestion: new Date().getFullYear(),
			cantidad: 50000,
			fechaLimiteEdad: '',
			fechaLimiteApertura: '',
			edadMinima: 16,
			edadMaxima: 19,
		},
		isLoading: false,
	}
}

export const defaultInitState: AperturaState = {
	apertura: {
		gestion: new Date().getFullYear(),
		cantidad: 0,
		fechaLimiteEdad: '',
		fechaLimiteApertura: '',
		edadMinima: 14,
		edadMaxima: 24,
	},
	isLoading: false,
}

export const createAperturaStore = (
	initState: AperturaState = defaultInitState,
) => {
	return createStore<AperturaStore>()
		(
			((set) => ({
				...initState,

				setApertura: (name: string, value: string | number) => set((state) => ({
					...state,
					apertura: {
						...state.apertura,
						[name]: value,
					},
				})),

				setAperturaResponse: (aperturaResponse: AperturaResponse) => {
					set({
						...aperturaResponse,
						apertura: aperturaResponse.data,
						isLoading: false,

					})
				},
				clearApertura: () => set((state) => ({
					...state,
					apertura: {
						...initState.apertura,
					}
				})),
				postApertura: async (apertura: Apertura) => {
					set({ isLoading: true });
					try {
						await postApertura({
							...apertura,
							edad_max: apertura.edadMaxima,
							edad_min: apertura.edadMinima,
							fecha_limite: apertura.fechaLimiteEdad,
							fecha_apertura: apertura.fechaLimiteApertura,
						});
						set(state => ({
							...state,
							success: true,
							message: 'Apertura creada con éxito.',
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
				getApertura: async (token: string) => {
					try {
						const apertura = await getApertura(token, new Date().getFullYear().toString());
						const fechaApertura = apertura.data?.fecha_apertura ? new Date(apertura.data.fecha_apertura) : null;

						set({
							apertura: {
								...apertura?.data,
								edadMaxima: apertura.data?.edad_max,
								edadMinima: apertura.data?.edad_min,
								fechaLimiteEdad: apertura.data?.fecha_limite,
								fechaLimiteApertura: fechaApertura
									? `${fechaApertura.getMonth() + 1}/${fechaApertura.getDate()}/${fechaApertura.getFullYear()}`
									: '',
							},
							success: true,
							message: 'Apertura obtenida correctamente',
							errors: undefined,
						});

					} catch (error: unknown) {
						set({
							success: false,
							message: 'Error desconocido.',
							errors: undefined,
						});

					}
				},
			})
			)
		)
}
