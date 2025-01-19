import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider"

export const CrSelector = () => {
	const divisionSelectedToCreate = useCentrosReclutamientoStore((state) => state.divisionSelected)
	const allCentros = useCentrosReclutamientoStore((state) => state.centros)
	const centros = allCentros?.filter((centro) => centro.codigo_division === divisionSelectedToCreate)
	const centroSelected = useCentrosReclutamientoStore((state) => state.centroSelected)
	const setCentroSelected = useCentrosReclutamientoStore((state) => state.setCentroSelected)

	const getColorClass = (cupos: number) => {
		if (cupos === 0) return "text-red-600 bg-red-50"
		if (cupos <= 5) return "text-amber-600 bg-amber-50"
		return "text-[#007934] bg-green-50"
	}

	return (
		<div className="relative">
			<select
				value={centroSelected}
				onChange={(e) => setCentroSelected(Number(e.target.value))}
				className={`
					w-full px-4 py-2 border appearance-none
					focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]
					transition-all duration-200 hover:shadow-md rounded-lg
					disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed"
					${centros?.length === 0 ? "border-gray-200" : "border-[#007934]/20"}
				`}
				disabled={centros?.length === 0}
			>
				{centros?.length === 0 ? (
					<option value="">No hay centros disponibles</option>
				) : (
					centros?.map((centro) => (
						<option
							key={centro.id}
							value={centro.id}
							className={`
								"py-2 px-4",
								${getColorClass(centro.cupos)}
							`}
						>
							{centro.regimiento} • {centro.cupos} {centro.cupos === 1 ? "Asignado" : "Asignados"}
						</option>
					))
				)}
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
				<div className={`
					"h-4 w-4 border-l-2 border-b-2 transform rotate-45 -translate-y-1",
					${centros?.length === 0
						? "border-gray-300"
						: "border-[#007934]"}
				`} />
			</div>
			{centros?.length === 0 && (
				<p className="mt-1.5 text-sm text-gray-500">
					Seleccione una división disponible primero
				</p>
			)}
		</div>
	)
}

