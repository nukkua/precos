import { url } from "./url";

export const setOficio = async (token: string) => {
	try {
		const res = await fetch(`${url}/porcentajes/oficio`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},

		});

		if (!res.ok) {
			throw new Error('Hubo algun error');

		}

		const data = await res.json();

		if (!data.success) {
			throw new Error(data.message || 'Error desconocido.');
		}

		return data;
	} catch (error) {
		console.error('Error en setOficio:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
