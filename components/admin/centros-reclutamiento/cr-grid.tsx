'use client'

import { CentrosReclutamiento } from "@/interfaces/centros-reclutamiento/centros-reclutamiento"
import { CrCard } from "./cr-card"

export const CrGrid = ({ centros }: {
	centros?: CentrosReclutamiento[]
}) => {

	return (
		<>
			<div className="overflow-x-auto rounded-lg border border-gray-200 fade-in">
				<table className="min-w-full divide-y divide-gray-200">

					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Region Militar
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Centro
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Cupos Asignados
							</th>
							<th className="px-6 py-3 textleft text-xs font-medium text-gray-500 uppercase tracking-wider">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{centros?.map((centro) => (
							<CrCard key={centro.id} centro={centro} />
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
