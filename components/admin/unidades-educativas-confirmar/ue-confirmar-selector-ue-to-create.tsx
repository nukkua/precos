import { useUnidadesStore } from "@/providers/unidades-store-provider"
import { useEffect } from "react"

export const UeConfirmarSelectorUeToCreate = () => {
	const centroSelected = useUnidadesStore((state) => state.centroConfirmSelectedToCreate)

	const allUnidades = useUnidadesStore((state) => state.unidades)
	const unidades = allUnidades?.filter((unidad) => unidad.centroId === centroSelected)

	const unidadSelected = useUnidadesStore((state) => state.unidadConfirmSelectedToCreate)
	const setUnidadSelected = useUnidadesStore((state) => state.setUnidadConfirmSelectedToCreate)

	const getColorClass = (cupos: number) => {
		if (cupos === 0) return "text-red-600 bg-red-50"
		if (cupos <= 5) return "text-amber-600 bg-amber-50"
		return "text-[#007934] bg-green-50"
	}
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUnidadSelected(Number(e.target.value))
	}
	useEffect(() => {
		setUnidadSelected(unidades![0]!.codigo)
	}, [])



	return (
		<div className="relative">
			<select
				value={unidadSelected}
				onChange={handleSelect}
				className={`
					w-full px-4 py-2 border appearance-none
					focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]
					transition-all duration-200 hover:shadow-md rounded-lg
					disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed"
					${unidades?.length === 0 ? "border-gray-200" : "border-[#007934]/20"}
				`}
				disabled={unidades?.length === 0}
			>
				{unidades?.length === 0 ? (
					<option value="">No hay unidades educativas disponibles</option>
				) : (
					unidades?.map((unidad) => (
						<option
							key={unidad.codigo}
							value={unidad.codigo}
							className={`
								"py-2 px-4",
								${getColorClass(unidad.cupos)}
							`}
						>
							{unidad.unidad_educativa} • {unidad.cupos} {unidad.cupos === 1 ? "Asignado" : "Asignados"}
						</option>
					))
				)}
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
				<div className={`
					"h-4 w-4 border-l-2 border-b-2 transform rotate-45 -translate-y-1",
					${unidades?.length === 0
						? "border-gray-300"
						: "border-[#007934]"}
				`} />
			</div>
			{unidades?.length === 0 && (
				<p className="mt-1.5 text-sm text-gray-500">
					Seleccione un centro de reclutamiento valido primero
				</p>
			)}
		</div>
	)
}

