import { useState } from "react";

import { CrSelector } from "./cr-selector";
import { DivisionSelectorToCreate } from "./division-selector-to-create";
import { useDivisionsStore } from "@/providers/division-store-provider";
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { Toaster, toast } from "sonner";

export const CrForm = ({ setShowForm }: {
	setShowForm: (value: boolean) => void;

}) => {
	const [cupos, setCupos] = useState<string>('')

	const divisions = useDivisionsStore(state => state.divisions);
	const divisionSelectedToCreate = useCentrosReclutamientoStore(state => state.divisionSelected);

	const centros = useCentrosReclutamientoStore(state => state.centros);
	const centroSelectedToCreate = useCentrosReclutamientoStore(state => state.centroSelected);

	const assignCupo = useCentrosReclutamientoStore(state => state.assignCupo);


	const maxCuposDivision = (divisionId: number) => {
		return Object.values(divisions)
			.filter(division => division.confirmed && division.id === Number(divisionId))
			.reduce((total, division) => total + division.cupos, 0);
	}
	const sumCuposCentroByDivision = (divisionId: number) => {
		return centros
			?.filter(centro => centro.codigo_division === Number(divisionId))
			?.reduce((total, centro) => total + centro.cupos, 0) || 0;

	}
	const cuposAvailable = maxCuposDivision(divisionSelectedToCreate) - sumCuposCentroByDivision(divisionSelectedToCreate);




	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const cuposParsed = parseInt(cupos);
		if (cuposParsed > cuposAvailable) {
			toast.error('Hubo un problema en la asignacion! Debe haber cupos disponibles para la division seleccionada', {
				duration: 5000,
			});
			return;
		}
		assignCupo(centroSelectedToCreate, cuposParsed);
		toast.success('Cupos para el centro de reclutamiento asignado con exito!', {
			duration: 5000,
		});
	}




	return (

		<form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-5">
			<Toaster richColors position="top-right" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						División
					</label>
					<DivisionSelectorToCreate />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Centro
					</label>
					<CrSelector />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Cupos Disponibles: {cuposAvailable}
					</label>
					<input
						type="number"
						value={cupos}
						onChange={(e) => setCupos(e.target.value)}
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934] "
						required
					/>
				</div>

			</div>
			<div className="flex justify-end gap-2">
				<button
					type="button"
					onClick={() => setShowForm(false)}
					className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
				>
					Cancelar
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-[#007934] text-white rounded-md hover:bg-[#006228]"
				>
					Guardar Centro
				</button>
			</div>
		</form>
	)
}
