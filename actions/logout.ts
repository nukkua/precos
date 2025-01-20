'use server'
import { deleteSession } from "@/auth/session"
import { redirect } from "next/navigation"

export const logoutAction = async (prevState: string | null, formData: FormData) => {
	try {
		await deleteSession();

	} catch (e) {
		console.error(e);

	} finally {
		redirect('/auth/login');
	}
}
