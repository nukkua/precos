import { url } from "./url";

export interface DivisionMapped {
	codigo_division: number;
	cupos: number;
	gestion_apertura: string;
}

export const postsDivision = async (division: DivisionMapped) => {
	const res = await fetch(`${url}/cupos/division`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(division)
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
