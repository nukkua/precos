import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider"
import { useUnidadesStore } from "@/providers/unidades-store-provider"
import { useEffect } from "react";

export const UeCentrosConfirmarSelector = () => {
	const search = useUnidadesStore(state => state.unidadConfirmarSearch);
	const centros = useCentrosReclutamientoStore((state) => state.centros)
	const centroSelected = useUnidadesStore((state) => state.centroConfirmarSelected)

	const setCentroSelected = useUnidadesStore((state) => state.setCentroConfirmarSelected)
	const setUnidadesFiltered = useUnidadesStore(state => state.setUnidadesFiltered);


	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCentroSelected(Number(e.target.value));
		setUnidadesFiltered(Number(e.target.value), search);
	}

	useEffect(() => {
		setUnidadesFiltered(1, search || '');
	}, [setUnidadesFiltered, search])


	return (
		<div className="">
			<select
				value={centroSelected}
				onChange={handleSelect}
				className={`
					w-full px-4 py-2 border
					focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]
					transition-all duration-200 hover:shadow-md rounded-lg
					disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed"
					${centros?.length === 0 ? "border-gray-200" : "border-[#007934]/20"}
				`}
				disabled={centros?.length === 0}
			>

				<option
					value={-1}
				>Todos los centros</option>
				{centros?.length === 0 ? (
					<option value="">No hay centros disponibles</option>
				) : (

					centros?.map((centro) => (
						<option
							key={centro.id}
							value={centro.id}
							className={`
								"py-2 px-4",
							`}
						>
							{centro.regimiento} • {centro.unidades.length} UE
						</option>
					))
				)}
			</select>
		</div>
	)
}

