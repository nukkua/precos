'use client'

import { useDivisionsStore } from "@/providers/division-store-provider";
import { DivisionCard } from "./division-card";
import { DangerMessage } from "@/components/danger-message";

export const DivisionGrid = () => {
	const divisiones = useDivisionsStore(state => state.divisions);
	const error = useDivisionsStore(state => state.errors);

	return (
		<div className="overflow-x-auto">
			{error && <DangerMessage errors={{ 'gestion': ['Ya se asignaron todos los cupos para las divisiones en la presente gestion', 'Actualice la cantidad de cupos, no puede asignar'] }} />}

			<table className="divide-y divide-gray-200 w-full text-left rtl:text-right">
				<thead>
					<tr>
						<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
							División
						</th>
						<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
							Cupos Asignados
						</th>
						<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
							Cupos a asignar
						</th>
						<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{
						Object.keys(divisiones).map((division) => (
							<DivisionCard key={division} divisionKey={division} divisionValue={divisiones[division]} />
						))}
				</tbody>
			</table>
		</div>
	)
}
