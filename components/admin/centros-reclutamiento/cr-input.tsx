import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider"

export const CrInput = () => {


	const search = useCentrosReclutamientoStore(state => state.search);
	const setSearch = useCentrosReclutamientoStore(state => state.setSearch);


	const divisionSelectedToSearch = useCentrosReclutamientoStore(state => state.divisionSelectedToSearch);

	const setCentrosFiltered = useCentrosReclutamientoStore(state => state.setCentrosFiltered);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setCentrosFiltered(divisionSelectedToSearch, e.target.value);

	}
	return (

		<div className="relative">
			<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
				🔍
			</span>
			<input
				type="text"
				placeholder="Buscar centro de reclutamiento..."
				value={search}
				onChange={handleSearch}
				className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]"
			/>
		</div>
	)
}
