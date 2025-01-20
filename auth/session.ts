import 'server-only'

import { cookies } from 'next/headers'
import { login } from '@/services/login';
import { logout } from '@/services/logout';

export async function createSession(email: string, password: string) {
	const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

	const session = await login({ email, password });
	const cookieStore = await cookies();

	cookieStore.set('session', session.access_token, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
}

export async function deleteSession() {

	const cookieStore = await cookies();
	const session = (await cookies()).get('session')?.value;

	await logout(session);
	cookieStore.delete('session');
}

