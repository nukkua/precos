'use client'

import { useState } from "react"

import { CrFilterAndSearch } from "./cr-filter-and-search"
import { CrForm } from "./cr-form"
import { CrHeader } from "./cr-header"
import { CrTable } from "./cr-table"
import { AssignCuppon } from "@/components/assign-cuppon"
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider"
import { SuccessModal } from "@/components/success-modal"
import { ErrorModal } from "@/components/error-modal"
import { toast, Toaster } from "sonner"
import { DangerMessage } from "@/components/danger-message"

interface Props {
	token: string;
}

export const CrMain = ({ token }: Props) => {
	const [showForm, setShowForm] = useState(false)
	const [currentPage, setCurrentPage] = useState(1);

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isModalVisibleError, setIsModalVisibleError] = useState<boolean>(false);


	const error = useCentrosReclutamientoStore(state => state.errors);
	const postCentros = useCentrosReclutamientoStore(state => state.postsCentros);
	const isLoading = useCentrosReclutamientoStore(state => state.isLoading);


	const allConfirmed = useCentrosReclutamientoStore(state => state.allConfirmed);



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!allConfirmed()) {
			toast.error('Hubo un problema en la asignacion! Los centros deben tener minimo 1 cupo', {
				duration: 5000,
			});
			return;
		}

		try {
			const success = await postCentros(token);
			if (success) {
				toast.success('Cupos para las divisiones asignados con exito!', {
					duration: 5000,
				});
				setIsModalVisible(true);
			}
			else {
				toast.error('Hubo un problema en la asignacion! No se pudo asignar con exito!', {
					duration: 5000,
				});
				setIsModalVisibleError(true);
			}

		}
		catch {
		} finally {
		}
	}



	return (

		<div className="space-y-6">
			{isModalVisibleError && <ErrorModal
				title="Error"
				message="Los cupos no han sido asignados correctamente."
			/>}
			{isModalVisible && <SuccessModal />}

			<Toaster richColors position="top-right" />

			<CrHeader />
			<CrFilterAndSearch setShowForm={setShowForm} />


			{
				showForm && (
					<CrForm setShowForm={setShowForm} />
				)
			}

			{error && <DangerMessage errors={{ 'gestion': ['Ya se asignaron todos los cupos para los centros en la presente gestion', 'Actualice la cantidad de cupos, no puede asignar'] }} />}
			<CrTable currentPage={currentPage} setCurrentPage={setCurrentPage} />
			<form onSubmit={handleSubmit}>
				<AssignCuppon isLoading={isLoading} />
			</form>


		</div>

	)
}
