'use client'

import { UnidadesEducativas } from "@/interfaces/unidades/unidades";
import { UeCard } from "./ue-card";

interface Props {
	unidadesFiltered?: UnidadesEducativas[];
}

export const UeList = ({ unidadesFiltered }: Props) => {




	return (

		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			{
				unidadesFiltered?.map(unidad => (
					<UeCard key={unidad.codigo} unidad={unidad} />

				))}
		</div>
	)
}
