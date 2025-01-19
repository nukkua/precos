import { type CentrosReclutamientoResponse } from "@/interfaces/centros-reclutamiento/centros-reclutamiento";
import { url } from "./url";


export const getCentrosReclutamiento = async (gestion: string = new Date().getFullYear().toString(), token: string): Promise<CentrosReclutamientoResponse> => {
	try {
		const res = await fetch(`${url}/gestion/centros-reclutamiento/${gestion}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},

		});

		const data = await res.json();

		if (!data.success || !res.ok) {
			throw new Error(data.message || 'Error desconocido.');
		}

		return data;
	} catch (error) {
		console.error('Error en getCentros:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
