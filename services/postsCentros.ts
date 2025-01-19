import { url } from "./url";

export interface CentrosMapped {
	id_centros_reclutamiento: number;
	codigo_division: number;
	cupo: number;
	gestion: number;
}

export const postsCentros = async (centro: CentrosMapped) => {
	const res = await fetch(`${url}/cupos/centros-reclutamiento`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(centro)
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
