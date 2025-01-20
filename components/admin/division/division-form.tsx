'use client'

import { AssignCuppon } from "@/components/assign-cuppon"
import { SuccessModal } from "@/components/success-modal";
import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

interface Props {
	token: string;
}

export const DivisionForm = ({ token }: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
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

		if (divisionsConfirmed != 10) {
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
			const success = await postsDivision(divisions, token);

			if (success) {
				toast.success('Cupos para la apertura asignados con exito!', {
					duration: 5000,
				});
			} else {
				toast.error('Hubo un problema en la asignacion!', {
					duration: 5000,
				});
			}
		}
		catch (error: unknown) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (success) {
			setIsModalVisible(true);
		}
	}, [success]);

	return (

		<form onSubmit={handleSubmit}>
			<SuccessModal
				isVisible={isModalVisible}
				title="¡Éxito!"
				message="Los cupos han sido asignados correctamente."
			/>
			<Toaster richColors position="top-right" />
			<AssignCuppon isLoading={isLoading} />
		</form>
	)
}
