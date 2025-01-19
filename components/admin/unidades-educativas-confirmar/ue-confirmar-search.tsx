import { useUnidadesStore } from "@/providers/unidades-store-provider";

export const UeConfirmarSearch = () => {

	const search = useUnidadesStore(state => state.unidadConfirmarSearch);
	const setSearch = useUnidadesStore(state => state.setUnidadConfirmarSearch);


	const centroSelected = useUnidadesStore(state => state.centroConfirmarSelected);
	const setUnidadesFiltered = useUnidadesStore(state => state.setUnidadesFiltered);


	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setUnidadesFiltered(centroSelected!, e.target.value);
	}
	return (

		<div className="relative">
			<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
				🔍
			</span>
			<input
				type="text"
				placeholder="Buscar unidad educativa..."
				value={search}
				onChange={handleSearch}
				className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]"
			/>
		</div>
	)
}
