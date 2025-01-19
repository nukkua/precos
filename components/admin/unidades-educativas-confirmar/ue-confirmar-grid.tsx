'use client'

import { UnidadesEducativas } from "@/interfaces/unidades/unidades"
import { UeConfirmarCard } from "./ue-confirmar-card"


export const UeConfirmarGrid = ({ unidades }: {
	unidades?: UnidadesEducativas[]
}) => {

	return (
		<>
			<div className="overflow-x-auto rounded-lg border border-gray-200 fade-in">
				<table className="min-w-full divide-y divide-gray-200">

					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Centro de Reclutamiento
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Unidades Educativas
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Cupos Asignados
							</th>
							<th className="px-6 py-3 textleft text-xs font-medium text-gray-500 uppercase tracking-wider">
								Cupos Por Genero
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{unidades?.map((unidad) => (
							<UeConfirmarCard key={unidad.codigo} unidad={unidad} />
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
