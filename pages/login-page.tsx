'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import Image from 'next/image'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [error, submitAction, isPending] = useActionState(
		async (prevState: string | null, formData: FormData) => {
			'use server'

			const email = formData.get('email') as string
			const password = formData.get('password') as string

			// Validaciones
			if (!email) return 'El correo es requerido'
			if (!/\S+@\S+\.\S+/.test(email)) return 'Correo inválido'
			if (!password) return 'La contraseña es requerida'
			if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres'

			try {
				// Simular llamada a API
				await new Promise(resolve => setTimeout(resolve, 1500))
				// Aquí iría la lógica real de autenticación
				return null
			} catch (e) {
				return 'Credenciales inválidas'
			}
		},
		null
	)

	return (
		<div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
			<div className="w-full max-w-[400px]">
				<div className="text-center mb-8">
					<h1 className="text-2xl font-semibold text-gray-900">Sistema Militar</h1>
					<p className="text-gray-600 text-sm">Control de Acceso</p>
				</div>

				{/* Formulario usando Actions */}
				<form
					action={submitAction}
					className="bg-white rounded-lg shadow-md p-6 space-y-5"
				>
					{/* Campo de email */}
					<div className="space-y-1.5">
						<label className="block text-sm font-medium text-gray-700">
							Correo Electrónico
						</label>
						<input
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'
								} rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007934] focus:border-transparent transition-colors`}
							placeholder="usuario@ejercito.mil"
						/>
					</div>

					{/* Campo de contraseña */}
					<div className="space-y-1.5">
						<label className="block text-sm font-medium text-gray-700">
							Contraseña
						</label>
						<input
							name="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={`w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'
								} rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007934] focus:border-transparent transition-colors`}
							placeholder="••••••••"
						/>
					</div>

					{/* Mensaje de error general */}
					{error && (
						<p className="text-red-500 text-sm">
							{error}
						</p>
					)}

					{/* Botón de submit */}
					<button
						type="submit"
						disabled={isPending}
						className="w-full bg-[#007934] hover:bg-[#006228] text-white rounded-md px-4 py-2.5 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
								<span>Ingresando...</span>
							</div>
						) : (
							'Iniciar Sesión'
						)}
					</button>

					{/* Enlaces adicionales */}
					<div className="flex justify-between text-sm pt-2">
						<a href="#" className="text-[#007934] hover:text-[#006228] transition-colors">
							¿Olvidaste tu contraseña?
						</a>
						<a href="#" className="text-[#007934] hover:text-[#006228] transition-colors">
							Soporte técnico
						</a>
					</div>
				</form>

				{/* Footer */}
				<footer className="mt-6 text-center text-sm text-gray-500">
					<p>Sistema Militar de Control © {new Date().getFullYear()}</p>
					<p className="mt-1">Fuerzas Armadas</p>
				</footer>
			</div>
		</div>
	)
}

