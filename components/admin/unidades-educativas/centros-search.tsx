import { useUnidadesStore } from "@/providers/unidades-store-provider";

export const CentrosSearch = () => {
	const centroSearch = useUnidadesStore(state => state.centroSearch);
	const setCentroSearch = useUnidadesStore(state => state.setCentroSearch);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCentroSearch(e.target.value);
	}
	return (
		<>


			<h2 className="font-semibold sm:text-3xl md:text-2xl text-gray-800">
				Centros de Reclutamiento
			</h2>

			<div className="relative my-4">
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
					placeholder="Buscar centro..."
					className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B2D]/20"
					value={centroSearch}
					onChange={handleChange}
				/>
			</div>
		</>

	)
}
