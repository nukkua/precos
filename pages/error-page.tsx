interface ErrorStateProps {
	title?: string
	message?: string
}

export default function ErrorPage({
	title = "Acceso Restringido",
	message = "No se puede proceder con la asignación. Primero se debe completar la asignacion de cupos del paso anterior"
}: ErrorStateProps) {
	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
			<div className="relative mb-8">
				<div className="absolute -inset-1 bg-red-500/20 blur-xl rounded-full" />
				<div className="relative bg-white p-4 rounded-full shadow-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-16 h-16 text-red-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
						<path d="M12 8v4" />
						<path d="M12 16h.01" />
					</svg>
				</div>
			</div>

			<div className="max-w-md mx-auto text-center space-y-4">
				<h2 className="text-2xl font-bold text-gray-900">
					{title}
				</h2>
				<p className="text-gray-600">
					{message}
				</p>

				{/* Info Box */}
				<div className="mt-8 bg-amber-50/50 border border-amber-200/70 rounded-xl p-4">
					<div className="flex gap-3">
						{/* Alert Circle Icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
						<div className="text-left">
							<p className="font-medium text-amber-900 mb-2">
								Proceso requerido:
							</p>
							<ol className="text-sm text-amber-800 space-y-2 list-decimal list-inside marker:text-amber-600">
								<li>La asignacion del paso anterior debe ser realizada por el administrador del sistema o similares</li>
								<li>Se deben definir los parámetros del anterior paso para la gestión actual</li>
								<li>Una vez completado el anterior paso, se habilitará la asignación</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
