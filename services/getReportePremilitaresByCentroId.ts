import { url } from "./url";


export const getReportePremilitaresByCentroId = async (centroId: number) => {
	try {
		const res = await fetch(`${url}/reportes/premilitares/${centroId}`, {
			method: 'GET',
			// headers: {
			// 	'Authorization': `Bearer ${token}`,
			// 	'Content-Type': 'application/json',
			// },
		});

		const data = await res.json();

		if (!data.success || !res.ok) {
			throw new Error(JSON.stringify(data.message) || 'Error desconocido.');
		}

		return data;
	} catch (error) {
		console.error('Error en getReporte:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
