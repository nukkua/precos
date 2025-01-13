import { DivisionsSelector } from "./divisions-selector";

import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";

export const DivisionSelectorToSearch = () => {
	const divisionSelectedToSearch = useCentrosReclutamientoStore(state => state.divisionSelectedToSearch);
	const setDivisionSelectedToSearch = useCentrosReclutamientoStore(state => state.setDivisionSelectedToSearch);
	const setCentrosFiltered = useCentrosReclutamientoStore(state => state.setCentrosFiltered);

	return (
		<DivisionsSelector divisionSelected={divisionSelectedToSearch} setDivisionSelected={setDivisionSelectedToSearch} setCentrosFiltered={setCentrosFiltered} />

	)
}
