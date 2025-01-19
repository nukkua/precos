'use client'

import { ButtonReset } from "@/components/button-reset"
import { CentrosReclutamiento } from "@/interfaces/centros-reclutamiento/centros-reclutamiento"
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider"

interface Props {
	centro: CentrosReclutamiento
}
export const CrCard = ({ centro }: Props) => {
	const handleReset = useCentrosReclutamientoStore(state => state.handleReset);
	return (
		<tr className="hover:bg-gray-50">
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{centro.codigo_division}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{centro.regimiento}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{centro.cupos}

			</td>

			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-center">
				<ButtonReset handleReset={handleReset} id={centro.id} />
			</td>

		</tr>
	)
}
