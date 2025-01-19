import { url } from "./url";
import { UnidadesResponse } from "@/interfaces/unidades/unidades";


export const getUnidades = async (gestion: string = new Date().getFullYear().toString(), token: string): Promise<UnidadesResponse> => {
	try {
		const res = await fetch(`${url}/gestion/unidades-educativas/${gestion}`, {
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
		console.error('Error en getUnidades:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
