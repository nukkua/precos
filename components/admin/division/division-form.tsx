'use client'

import { AssignCuppon } from "@/components/assign-cuppon"
import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";
import { toast, Toaster } from "sonner";

export const DivisionForm = () => {
	const cantidadApertura = useAperturaStore(state => state.apertura.cantidad);
	const cupponsAssigned = useDivisionsStore((state) =>
		Object.values(state.divisions)
			.filter((division) => division.confirmed)
			.reduce((total, division) => total + division.cupos, 0)
	);


	const postsDivision = useDivisionsStore(state => state.postsDivision);
	const divisions = useDivisionsStore(state => state.divisions);

	const divisionsConfirmed = useDivisionsStore((state) =>
		Object.values(state.divisions)
			.filter(division => division.confirmed)
			.length
	);

	const success = useDivisionsStore(state => state.success);
	const isLoading = useDivisionsStore(state => state.isLoading);


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (divisionsConfirmed != 9) {
			toast.error('Hubo un problema en la asignacion! Debe confirmar todas las divisiones para poder asignar los cupos', {
				duration: 5000,
			});
			return;
		}
		if (cupponsAssigned != cantidadApertura) {
			toast.error('Hubo un problema en la asignacion! Debe asignar el total de los cupos. Aun quedan cupos por asignar', {
				duration: 5000,
			});
			return;

		}
		try {
			await postsDivision(divisions);
			if (success) {
				toast.success('Cupos para las divisiones asignados con exito!', {
					duration: 5000,
				});
			}
			else {
				toast.error('Hubo un problema en la asignacion!', {
					duration: 5000,
				});
			}
		}
		catch (error: unknown) {
			console.error(error);
		}



	}
	return (

		<form onSubmit={handleSubmit}>
			<Toaster richColors position="top-right" />
			<AssignCuppon isLoading={isLoading} />
		</form>
	)
}
