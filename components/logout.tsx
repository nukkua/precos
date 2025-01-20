'use client'

import { logoutAction } from '@/actions/logout'
import { useActionState } from 'react'

export default function Logout() {

	const [error, submitAction, isPending] = useActionState(logoutAction, null)
	return (

		<form
			action={submitAction}
			className="bg-white rounded-lg"
		>

			{isPending ? (
				<div className="flex items-center justify-center gap-2">
					<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					<span>Cerrando Sesion...</span>
				</div>
			) : (
				<button type="submit">Cerrar Sesion</button>
			)}

		</form>

	)
}

