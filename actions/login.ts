'use server'

import { createSession } from "@/auth/session"
import { redirect } from "next/navigation"

export const loginAction = async (prevState: string | null, formData: FormData) => {
	let redirectPath: string = '/'
	const email = formData.get('email') as string
	const password = formData.get('password') as string

	if (!email) return 'El correo es requerido'
	if (!/\S+@\S+\.\S+/.test(email)) return 'Correo inválido'
	if (!password) return 'La contraseña es requerida'
	if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres'


	try {
		await createSession(email, password);
		redirectPath = '/admin/apertura';

	} catch (e) {
		console.error(e);
		redirectPath = '/auth/login';

		return 'Credenciales inválidas'
	} finally {
		redirect(redirectPath);
	}
}
