import { url } from "./url";


interface LogoutResponse {
	message: string;
}

export const logout = async (token?: string): Promise<LogoutResponse> => {
	const res = await fetch(`${url}/auth/logout`, {
		method: 'POST',
		headers: {

			'Authorization': `Bearer ${token}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	});

	const data: LogoutResponse = await res.json();

	if (!res.ok || !data) {
		if (!data) {
			throw new Error(JSON.stringify(data));
		}
		throw new Error(data.message || 'Error desconocido');
	}

	return data;
};
