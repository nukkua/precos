import { url } from "./url";
import { DivisionResponse } from "@/interfaces/divisiones/divisiones";


export const getDivision = async (gestion: string = new Date().getFullYear().toString()): Promise<DivisionResponse> => {
	try {
		const res = await fetch(`${url}/gestion/division/${gestion}`);

		const data = await res.json();

		if (!data.success || !res.ok) {
			throw new Error(data.message || 'Error desconocido.');
		}

		return data;

	} catch (error) {
		console.error('Error en getDivision:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
