import { url } from "./url";

export interface UserMapped {
	email: string;
	password: string;
}
interface User {
	iduser: number;
	ci: string;
	nombres: string;
	appaterno: string;
	apmaterno: string;
	email: string;
	celular: number;
	usuario: string;
	status: boolean;
	last_login: string | null;
	created_at: Date | null;
	updated_at: Date | null;
}
export interface LoginResponse {
	status: boolean;
	message: string;
	access_token: string;
	token_type: string;
	expires_in: number;
	post: User
}


export const login = async (user: UserMapped): Promise<LoginResponse> => {
	const res = await fetch(`${url}/auth/login`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	});

	const data: LoginResponse = await res.json();

	if (!res.ok || !data.status) {
		if (!data) {
			throw new Error(JSON.stringify(data));
		}
		throw new Error(data.message || 'Error desconocido');
	}

	return data;
};
