import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider"

interface Props {
	divisionSelected: number;
	setDivisionSelected: (value: number) => void;
	setCentrosFiltered?: (value: number, search: string) => void;
}

export const DivisionsSelector = ({ divisionSelected, setDivisionSelected, setCentrosFiltered }: Props) => {
	const divisiones = useDivisionsStore(state => state.divisions);

	const search = useCentrosReclutamientoStore(state => state.search);


	const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDivisionSelected(Number(e.target.value));
		if (setCentrosFiltered) {
			setCentrosFiltered(Number(e.target.value), search);
		}
	}

	return (

		<>

			<select
				value={divisionSelected}
				onChange={handleSelected}
				className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934] transition-all duration-200 hover:shadow-md rounded-lg"
			>
				{setCentrosFiltered && (
					<option value={-1}>
						Todas las regiones
					</option>
				)}
				{Object.keys(divisiones).map((division) => (
					<option key={division} value={divisiones[division].id}>
						{division}
					</option>
				))}
			</select>

		</>
	)
}
