"use client"

import { useUnidadesStore } from "@/providers/unidades-store-provider"
import { UeList } from "./ue-list";
import { DEPARTAMENTOS } from "./regimiento-selector";
import { UeSearch } from "./ue-search";

interface Props {
	token: string;
}

export const UeSelector = ({ token }: Props) => {
	const departamentoSelected = useUnidadesStore(state => state.departamentoSelected);
	const departamento = DEPARTAMENTOS.find(departamento => departamento.id === departamentoSelected);


	const unidadSearchTerm = useUnidadesStore(state => state.unidadSearch);
	const unidades = useUnidadesStore(state => state.unidades);

	const unidadesFiltered = unidades?.filter(unidad => unidad.codigo_departamento === departamento?.id_departamento && unidad.unidad_educativa.toLowerCase().includes(unidadSearchTerm.toLowerCase()));


	return (
		<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
			<UeSearch />
			<UeList unidadesFiltered={unidadesFiltered} token={token} />

		</div>
	)
}

