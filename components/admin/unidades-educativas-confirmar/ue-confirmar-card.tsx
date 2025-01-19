'use client'

import { FemaleSvg } from "@/icons/female-svg"
import { MaleSvg } from "@/icons/male-svg"
import { UnidadesEducativas } from "@/interfaces/unidades/unidades"

interface Props {
	unidad: UnidadesEducativas
}

export const UeConfirmarCard = ({ unidad }: Props) => {
	const totalCupos = unidad.cupos
	const porcentajeHombres = ((unidad.cuposHombres / totalCupos) * 100) || 0
	const porcentajeMujeres = ((unidad.cuposMujeres / totalCupos) * 100) || 0

	return (
		<tr className="hover:bg-gray-50">
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{unidad.centroName}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{unidad.unidad_educativa}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{totalCupos}
			</td>
			<td className="px-6 py-4 text-sm text-gray-900">
				<div className="min-w-[200px] flex items-center justify-between gap-2">
					<div className="space-y-1">
						<div className="flex items-center justify-between gap-2 text-xs">
							<div className="flex items-center gap-2 justify-center">
								<MaleSvg />
								<span className="text-blue-700 font-medium">Hombres: {unidad.cuposHombres}</span>

							</div>
							<span className="text-gray-600">{porcentajeHombres.toFixed(1)}%</span>
						</div>
						<div className="h-2 bg-blue-100 rounded-full overflow-hidden">
							<div
								className="h-full bg-blue-500 transition-all duration-300"
								style={{ width: `${porcentajeHombres}%` }}
							/>
						</div>
					</div>

					{/* Sección Mujeres */}
					<div className="space-y-1">
						<div className="flex items-center justify-between gap-2 text-xs">
							<div className="flex items-center gap-2 justify-center">
								<FemaleSvg />
								<span className="text-pink-700 font-medium">Mujeres: {unidad.cuposMujeres}</span>
							</div>

							<span className="text-gray-600">{porcentajeMujeres.toFixed(1)}%</span>
						</div>
						<div className="h-2 bg-pink-100 rounded-full overflow-hidden">
							<div
								className="h-full bg-pink-500 transition-all duration-300"
								style={{ width: `${porcentajeMujeres}%` }}
							/>
						</div>
					</div>
				</div>
			</td>
		</tr>
	)
}

