import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";

export const CrSelector = () => {
	const divisionSelectedToCreate = useCentrosReclutamientoStore((state) => state.divisionSelected);
	const allCentros = useCentrosReclutamientoStore((state) => state.centros);
	const centros = allCentros?.filter((centro) => centro.codigo_division === divisionSelectedToCreate);

	const centroSelected = useCentrosReclutamientoStore((state) => state.centroSelected);
	const setCentroSelected = useCentrosReclutamientoStore((state) => state.setCentroSelected);

	return (
		<select
			value={centroSelected}
			onChange={(e) => setCentroSelected(Number(e.target.value))}
			className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]"
			disabled={centros?.length === 0}
		>
			{centros?.map((centro) => (
				<option key={centro.id} value={centro.id}>
					{centro.regimiento}
				</option>
			))}
		</select>
	);
};
