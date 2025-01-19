import { url } from "./url";
import { DivisionResponse } from "@/interfaces/divisiones/divisiones";


export const getDivision = async (gestion: string = new Date().getFullYear().toString(), token: string): Promise<DivisionResponse> => {
	try {
		const res = await fetch(`${url}/gestion/division/${gestion}`, {
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
		console.error('Error en getDivision:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
