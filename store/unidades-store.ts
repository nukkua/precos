import { CentrosReclutamiento } from '@/interfaces/centros-reclutamiento/centros-reclutamiento';
import { LaravelErrorResponse, LaravelValidationError } from '@/interfaces/globals';
import { UnidadEducativaInformationResponse, UnidadesEducativas, UnidadesResponse } from '@/interfaces/unidades/unidades';
import { getUnidadEducativaInformation } from '@/services/getUnidadEducativaInformation';
import { getUnidades } from '@/services/getUnidades';
import { postsUnidades } from '@/services/postsUnidades';
import { createStore } from 'zustand/vanilla'

export interface Unidades {
	success?: boolean;
	errors?: LaravelValidationError;
	message?: string;

	unidades?: UnidadesEducativas[];

	isLoading: boolean;
	departamentoSelected: number;

	centroSearch: string;
	centroSelected?: CentrosReclutamiento;

	unidadSearch: string;

}
export interface UnidadesConfirmar {
	unidadesFiltered?: UnidadesEducativas[];

	unidadConfirmarSearch: string;

	unidadesConfirmButton: boolean;

	centroConfirmarSelected: number;

	unidadConfirmSelectedToCreate: number;
	centroConfirmSelectedToCreate: number;
}
export type UnidadesState = Unidades & UnidadesConfirmar;

export interface UnidadesActions {
	getUnidades: (token: string) => Promise<void>;
	postUnidades: (unidades: UnidadesEducativas[], token: string) => Promise<boolean>;

	getUnidadEducativaInformation: (unidadId: number, token: string) => Promise<void>;

	setDepartamentoSelected: (departamentoId: number) => void;

	setCentroSelected: (centro: CentrosReclutamiento) => void; // selector
	setCentroConfirmarSelected: (centroId: number) => void; // selector page ue confirmar

	setUnidadSearch: (unidadSearch: string) => void;
	setUnidadConfirmarSearch: (unidadConfirmarSearch: string) => void;
	setCentroSearch: (centroSearch: string) => void;

	setCentroId: (ueId: number, centro: CentrosReclutamiento) => void;
	removeCentroId: (ueId: number) => void;

	isLinked: (ueId: number) => boolean;
	setUnidadesFiltered: (selector: number | string, query: string) => void;

	setUnidadesConfirmButton: (value: boolean) => void;

	assignCuppon: (ueId: number, cupos: number, cuposMujeres: number, cuposHombres: number, porcentajeMujeres: number, porcentajeHombre: number)
		=> void;

	handleReset: (ueId: number) => void;


	setUnidadConfirmSelectedToCreate: (ueId: number) => void;
	setCentroConfirmSelectedToCreate: (ueId: number) => void;

	setUnidadesResponse: (unidadesResponse: UnidadesResponse) => void;
}

export type UnidadesStore = UnidadesState & UnidadesActions;


export const initUnidadesStore = (): UnidadesState => {
	return {


		isLoading: false,
		departamentoSelected: 0,
		unidadSearch: '',
		unidadConfirmarSearch: '',
		centroSearch: '',
		centroConfirmarSelected: 1,
		unidadesConfirmButton: false,
		unidadConfirmSelectedToCreate: 1,
		centroConfirmSelectedToCreate: 1,

	}
}

export const defaultInitState: UnidadesState = {
	isLoading: false,
	departamentoSelected: 0,
	unidadSearch: '',
	unidadConfirmarSearch: '',
	centroSearch: '',
	centroConfirmarSelected: 1,
	unidadesConfirmButton: false,
	unidadConfirmSelectedToCreate: 1,
	centroConfirmSelectedToCreate: 1,
}

export const createUnidadesStore = (
	initState: UnidadesState = defaultInitState,
) => {
	return createStore<UnidadesStore>()(
		(set, get) => ({
			...initState,

			setUnidadesResponse: (unidadesResponse: UnidadesResponse) => {

				const unidades = unidadesResponse.data?.filter(unidad => unidad?.cupos_unidades_educativa[0])?.map(unidad => {
					return {
						...unidad,
						cupos: (unidad?.cupos_unidades_educativa?.[0]?.cupos || 0),
						centroId: (unidad?.cupos_unidades_educativa?.[0]?.centros_reclutamiento_id || 0)

					}
				})
				set((state) => ({
					unidades: unidades,
					unidadesFiltered: unidades,
					isLoading: false,

				}))

			},
			getUnidades: async (token: string) => {
				if (get().unidades) {
					return;
				}

				set({ isLoading: true });
				try {
					const unidades = await getUnidades(new Date().getFullYear().toString(), token);

					set({
						success: true,
						unidades: unidades.data?.map(unidad => ({
							...unidad,
							cupos: 0,
							centroId: -1,
							centroName: '',
							porcentajeHombre: 0,
							porcentajeMujeres: 0,
							totalHombres: 0,
							totalMujeres: 0,
							totalEstudiantes: 0,
							totalEstudiantesHabilitados: 0,
							cuposMujeres: 0,
							cuposHombres: 0,
						})),
						message: unidades.message,
						isLoading: false,
						errors: undefined,
					});

				} catch (error: unknown) {
					console.error(error);
				} finally {
					set({ isLoading: false });
				}
			},
			postUnidades: async (unidades?: UnidadesEducativas[], token: string) => {
				set({ isLoading: true });
				try {

					if (!unidades) {
						throw new Error('No hay unidades disponibles para procesar.');
					}
					for (const unidad of unidades) {
						await postsUnidades({
							centros_reclutamiento_id: unidad.centroId,
							unidades_educativa_codigo: unidad.codigo,
							cupos: unidad.cupos,
							porcentaje_hombres: unidad.porcentajeHombre,
							porcentaje_mujeres: unidad.porcentajeMujeres,
							gestion: new Date().getFullYear(),
						}, token)
					}
					set(state => ({
						...state,
						success: true,
						message: 'Unidades creadas con éxito.',
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
			setDepartamentoSelected: (departamentoId: number) => {
				set({ departamentoSelected: departamentoId });
			},
			setCentroSelected: (centro: CentrosReclutamiento) => {
				set({ centroSelected: centro });
			},
			setCentroConfirmarSelected: (centroId: number = 1) => {
				set({ centroConfirmarSelected: centroId });
			},

			setCentroId: (ueId: number, centro: CentrosReclutamiento) => {
				const unidades = get().unidades?.map((unidad) =>
					unidad.codigo === ueId
						? { ...unidad, centroId: centro.id, centroName: centro.regimiento }
						: unidad
				);
				set({ unidades });
			},
			removeCentroId: (ueId: number) => {
				const unidades = get().unidades?.map((unidad) =>
					unidad.codigo === ueId
						? { ...unidad, centroId: -1, centroName: '' }
						: unidad
				);
				set({ unidades });
			},
			setUnidadSearch: (unidadSearch: string) => { set({ unidadSearch }) },
			setUnidadConfirmarSearch: (unidadConfirmarSearch: string) => { set({ unidadConfirmarSearch }) },
			setCentroSearch: (centroSearch: string) => { set({ centroSearch }) },
			isLinked: (ueId: number) => {
				const unidad = get().unidades?.find((unidad) => unidad.codigo === ueId);

				return unidad?.codigo === -1;
			},

			setUnidadesFiltered: (selector: number | string = -1, query: string = '') => {
				if (selector === -1) {
					set((state) => ({
						...state,
						unidadesFiltered: state.unidades
							?.filter(unidad => unidad.unidad_educativa.toLowerCase().includes(query.toLowerCase())
								&& unidad.centroId !== -1),
					}));
					return;
				}

				const unidadesFiltered = get().unidades
					?.filter(unidad => unidad.centroId === Number(selector)
						&& unidad.unidad_educativa.toLowerCase().includes(query.toLowerCase()))

				set((state) => ({
					...state,
					unidadesFiltered,
				}));

			},


			setUnidadesConfirmButton: (value: boolean) => {
				set({ unidadesConfirmButton: value, });
			},


			assignCuppon: (ueId: number, cupos: number, cuposMujeres: number, cuposHombres: number, porcentajeMujeres: number, porcentajeHombre: number) => {

				// assignCupo(unidadSelectedToCreate, cuposParsed, calcularDistribucionSugerida().cuposMujeres, calcularDistribucionSugerida().cuposHombres, Number(porcentajeMujeres), Number(porcentajeHombres));
				const unidades = get().unidades?.map((unidad) => {
					if (unidad.codigo === ueId) {
						return {
							...unidad,
							cupos,
							cuposMujeres,
							cuposHombres,
							porcentajeMujeres,
							porcentajeHombre,
						}

					}
					return unidad;
				})
				const unidadesFiltered = get().unidadesFiltered?.map((unidad) => {
					if (unidad.codigo === ueId) {
						return {
							...unidad,
							cupos,
							cuposMujeres,
							cuposHombres,
						}

					}
					return unidad;
				})

				set((state) => ({
					...state,
					unidades,
					unidadesFiltered,
				}))

			},
			handleReset: (ueId: number) => {
				const unidades = get().unidades?.map((unidad) => {
					if (unidad.codigo === ueId) {
						return {
							...unidad,
							cupos: 0,
							cuposHombres: 0,
							cuposMujeres: 0,

						}

					}
					return unidad;
				})
				const unidadesFiltered = get().unidadesFiltered?.map((unidad) => {
					if (unidad.codigo === ueId) {
						return {
							...unidad,
							cupos: 0,
							cuposHombres: 0,
							cuposMujeres: 0,
						}

					}
					return unidad;
				})

				set((state) => ({
					...state,
					unidades,
					unidadesFiltered,
				}))
			},

			setUnidadConfirmSelectedToCreate: (ueId: number) => {
				set({ unidadConfirmSelectedToCreate: ueId })

			},
			setCentroConfirmSelectedToCreate: (ueId: number) => {
				set({ centroConfirmSelectedToCreate: ueId })
			},
			getUnidadEducativaInformation: async (unidadId: number, token: string) => {
				if (unidadId === 1) return;

				set({ isLoading: true });
				try {
					const unidadInformation = await getUnidadEducativaInformation(new Date().getFullYear().toString(), unidadId, token);

					set({
						success: true,
						unidades: get().unidades?.map(unidad => {
							if (unidad.codigo === unidadId) {
								return {
									...unidad,
									totalEstudiantes: unidadInformation?.data?.total_estudiantes || 0,
									totalEstudiantesHabilitados: unidadInformation.data?.total_estudiantes_habilitados || 0,
									totalHombres: unidadInformation?.data?.total_hombres || 0,
									totalMujeres: unidadInformation?.data?.total_mujeres || 0,
								}
							}
							return unidad;
						}),
						message: unidadInformation.message,
						isLoading: false,
						errors: undefined,
					});

				} catch (error: unknown) {
					console.error(error);
				} finally {
					set({ isLoading: false });
				}
			}
		}),
	)
}
