'use client'

import { useAperturaStore } from "@/providers/apertura-store-provider"
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";

export const CrHeader = () => {
	const centros = useCentrosReclutamientoStore(state => state.centros);
	const cantidadApertura = useAperturaStore(state => state.apertura.cantidad);
	const cantidadSumCentros = useCentrosReclutamientoStore(state =>
		state.centros
			?.reduce((sum, centro) => sum + centro.cupos, 0));






	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div className="bg-gray-50 p-4 rounded-lg fade-in">
				<div className="text-sm text-gray-600">Cantidad de Centros de Reclutamiento</div>
				<div className="text-2xl font-bold">{centros?.length}</div>
			</div>
			<div className="bg-gray-50 p-4 rounded-lg fade-in">
				<div className="text-sm text-gray-600">Cupos Disponibles Totales</div>
				<div className="text-2xl font-bold">
					{cantidadApertura || 0}
				</div>
			</div>
			<div className="bg-gray-50 p-4 rounded-lg fade-in">
				<div className="text-sm text-gray-600">Cupos Asignados a Centros</div>
				<div className="text-2xl font-bold">
					{cantidadSumCentros || 0}
				</div>
			</div>
		</div>
	)
}
