import { url } from "./url";

export interface UnidadesMapped {
	centros_reclutamiento_id: number;
	unidades_educativa_codigo: number;
	cupos: number;
	porcentaje_hombres: number;
	porcentaje_mujeres: number;
	gestion: number;
}

export const postsUnidades = async (unidad: UnidadesMapped) => {
	const res = await fetch(`${url}/cupos/unidades-educativas`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(unidad)
	});

	const data = await res.json();

	if (!res.ok || !data.success) {
		if (data.error) {
			throw new Error(JSON.stringify(data));
		}
		throw new Error(data.message || 'Error desconocido');
	}

	return data;
};
