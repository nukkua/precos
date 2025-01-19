'use client'

import { useUnidadesStore } from "@/providers/unidades-store-provider";

export const UeSearch = () => {

	const unidadSearchTerm = useUnidadesStore(state => state.unidadSearch);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUnidadSearchTerm(e.target.value);
	}
	const setUnidadSearchTerm = useUnidadesStore(state => state.setUnidadSearch);
	return (

		<div className="flex justify-between items-center mb-6">
			<h2 className="title">
				Unidades Educativas
			</h2>
			<div className="flex items-center gap-2">
				<div className="relative">
					<svg
						className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						value={unidadSearchTerm}
						onChange={handleChange}
						placeholder="Buscar unidad..."
						className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B2D]/20"
					/>
				</div>
			</div>
		</div>
	)
}
