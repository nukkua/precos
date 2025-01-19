import { url } from "./url";
import { type UnidadEducativaInformationResponse } from "@/interfaces/unidades/unidades";


export const getUnidadEducativaInformation = async (gestion: string = new Date().getFullYear().toString(), unidadId: number): Promise<UnidadEducativaInformationResponse> => {
	try {
		const res = await fetch(`${url}/porcentajes/${unidadId}/${gestion}`);

		const data = await res.json();

		if (!data.success || !res.ok) {
			throw new Error(data.message || 'Error desconocido.');
		}

		return data;
	} catch (error) {
		console.error('Error en getUnidadEducativaInformation:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
