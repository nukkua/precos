import { type AperturaResponse } from "@/interfaces/apertura/apertura";
import { url } from "./url";


export const getApertura = async (gestion: string = new Date().getFullYear().toString()): Promise<AperturaResponse> => {
	try {
		const res = await fetch(`${url}/gestion/aperturas/${gestion}`);

		const data = await res.json();

		if (!data.success || !res.ok) {
			throw new Error(data.message || 'Error desconocido.');
		}

		return data;
	} catch (error) {
		console.error('Error en getApertura:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
