interface EmptyStateProps {
	title?: string;
	message?: string;
	suggestion?: string;
	button?: React.ReactNode;
}

export default function EmptyState({
	title = "No se encontraron centros",
	message = "No hay centros de reclutamiento registrados en el sistema.",
	suggestion = "Puedes probar buscando con otro nombre, o seleccionando otra region militar.",
	button,
}: EmptyStateProps) {
	return (
		<div className="min-h-[55vh] flex flex-col items-center justify-center p-4">
			<div className="relative mb-8">
				<div className="absolute -inset-1 bg-blue-500/20 blur-xl rounded-full" />
				<div className="relative bg-white p-4 rounded-full shadow-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-16 h-16 text-blue-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M3 21h18" />
						<path d="M5 21V7l8-4v18" />
						<path d="M19 21V11l-6-4" />
						<path d="M9 9h1" />
						<path d="M9 13h1" />
						<path d="M9 17h1" />
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
				{button}

				<div className="mt-8 bg-blue-50/50 border border-blue-200/70 rounded-xl p-4">
					<div className="flex gap-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M12 16v-4" />
							<path d="M12 8h.01" />
						</svg>
						<div className="text-left">
							<p className="text-sm text-blue-900">
								{suggestion}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-8 flex justify-center gap-2">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="w-8 h-1 rounded-full bg-blue-200/50" />
					))}
				</div>
			</div>
		</div>
	)
}

