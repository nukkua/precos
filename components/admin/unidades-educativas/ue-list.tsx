'use client'

import { UnidadesEducativas } from "@/interfaces/unidades/unidades";
import { UeCard } from "./ue-card";

interface Props {
	unidadesFiltered?: UnidadesEducativas[];
	token: string;
}

export const UeList = ({ unidadesFiltered, token }: Props) => {




	return (

		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			{
				unidadesFiltered?.map(unidad => (
					<UeCard key={unidad.codigo} unidad={unidad} token={token} />

				))}
		</div>
	)
}
