import { AperturaMapped } from "@/interfaces/apertura/apertura";
import { url } from "./url";

export const postApertura = async (apertura: AperturaMapped) => {
	const res = await fetch(`${url}/cupos/aperturas`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(apertura)
	});

	const data = await res.json();

	if (!res.ok || !data.success) {
		if (data.error) {
			throw new Error(JSON.stringify(data));
		}
		throw new Error(data.message || 'Error en get apertura');
	}

	return data;
};
