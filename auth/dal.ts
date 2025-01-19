import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const verifySession = async () => {
	const cookie = (await cookies()).get('session')?.value

	if (!cookie) {
		redirect('/auth/login')
	}

	return { isAuth: true, token: cookie };
}

