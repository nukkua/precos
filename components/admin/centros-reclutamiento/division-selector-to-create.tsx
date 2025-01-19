import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";

import { DivisionsSelector } from "./divisions-selector";
import { useDivisionsStore } from "@/providers/division-store-provider";


export const DivisionSelectorToCreate = () => {
	const divisionSelected = useCentrosReclutamientoStore(state => state.divisionSelected);
	const setDivisionSelected = useCentrosReclutamientoStore(state => state.setDivisionSelected);




	return (
		<>
			<DivisionsSelector divisionSelected={divisionSelected} setDivisionSelected={setDivisionSelected} />
		</>

	)
}
