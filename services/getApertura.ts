import { type AperturaResponse } from "@/interfaces/apertura/apertura";
import { url } from "./url";


export const getApertura = async (gestion: string = new Date().getFullYear().toString(), token?: string): Promise<AperturaResponse> => {
	try {
		const res = await fetch(`${url}/gestion/aperturas/${gestion}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		const data = await res.json();

		if (!data.success || !res.ok) {
			throw new Error(JSON.stringify(data.message) || 'Error desconocido.');
		}

		return data;
	} catch (error) {
		console.error('Error en getApertura:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
