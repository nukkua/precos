'use client'

import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider"
import { useUnidadesStore } from "@/providers/unidades-store-provider";
import { CentrosList } from "./centros-list";
import { CentrosSearch } from "./centros-search";

export const CentrosSelector = () => {

	// search
	const centroSearch = useUnidadesStore(state => state.centroSearch);

	// selected
	const departamentoSelected = useUnidadesStore(state => state.departamentoSelected);

	// centros
	const centros = useCentrosReclutamientoStore(state => state.centros);
	const centrosFiltered = centros
		?.filter(centro => centro.codigo_division === departamentoSelected
			&& centro.regimiento.toLowerCase().includes(centroSearch.toLowerCase()));

	return (
		<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
			<CentrosSearch />
			<CentrosList centrosFiltered={centrosFiltered} />

		</div>
	)
}

