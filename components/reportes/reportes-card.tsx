'use client'

import { UnidadesEducativas } from "@/interfaces/unidades/unidades"

interface Props {
	unidad: UnidadesEducativas
}

export const ReportesCard = ({ unidad }: Props) => {
	const totalCupos = unidad.cupos

	return (
		<tr className="hover:bg-gray-50">
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{unidad.unidad_educativa}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{totalCupos}
			</td>
			<td className="px-6 py-4 text-sm text-gray-900 text-center">
				{unidad.cupos_unidades_educativa[0].aceptado_hombres}
			</td>
			<td className="px-6 py-4 text-sm text-gray-900 text-center">
				{unidad.cupos_unidades_educativa[0].aceptado_mujeres}
			</td>
		</tr>
	)
}

