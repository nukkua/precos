'use client'


import { useState } from "react"

import { AssignCuppon } from "@/components/assign-cuppon"
import { SuccessModal } from "@/components/success-modal"
import { ErrorModal } from "@/components/error-modal"
import { toast, Toaster } from "sonner"
import { DangerMessage } from "@/components/danger-message"
import { useUnidadesStore } from "@/providers/unidades-store-provider"
import { UeConfirmarHeader } from "./ue-confirmar-header"
import { UeConfirmarFilterAndSearch } from "./ue-confirmar-filter-and-search"
import { UeConfirmarTable } from "./ue-confirmar-table"
import { UeConfirmarForm } from "./ue-confirmar-form"

export const UeConfirmarMain = () => {
	const [showForm, setShowForm] = useState(false)
	const [currentPage, setCurrentPage] = useState(1);

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isModalVisibleError, setIsModalVisibleError] = useState<boolean>(false);

	const unidades = useUnidadesStore(state => state.unidades);
	const postUnidadesEducativas = useUnidadesStore(state => state.postUnidades);
	const isLoading = useUnidadesStore(state => state.isLoading);
	const error = useUnidadesStore(state => state.errors);

	const unidadesConfirmed = unidades?.filter(unidad => unidad.centroId !== -1);
	const areAllConfirmed = unidadesConfirmed?.filter(unidad => unidad?.cupos > 0).length;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// valida que todas las unidades educativas esten asignadas a un centro
		// if (areAllConfirmed !== unidades?.length) {
		// 	toast.error('Hubo un problema en la asignacion!. Debe asignar a todas las unidades educativas ya sea 0', {
		// 		duration: 5000,
		// 	});
		// 	setIsModalVisibleError(true);
		// 	return;
		// }

		try {
			const success = await postUnidadesEducativas(unidadesConfirmed!);
			if (success) {
				toast.success('Asignado con exito', {
					duration: 5000,
				});
				setIsModalVisible(true);
			}
			else {
				toast.error('Hubo un error al asignar una unidad educativa, revise', {
					duration: 5000,
				});
				setIsModalVisibleError(true);
			}


		} catch (error: unknown) {
			console.error(error);
		}

	}



	return (

		<div className="space-y-6">
			{isModalVisibleError && <ErrorModal
				title="Error"
				message="Los cupos no han sido asignados correctamente."
			/>}
			{isModalVisible && <SuccessModal />}

			< Toaster richColors position="top-right" />
			<UeConfirmarHeader />

			<UeConfirmarFilterAndSearch setShowForm={setShowForm} />

			{
				showForm && (
					<UeConfirmarForm setShowForm={setShowForm} />
				)
			}

			{error && <DangerMessage errors={{ 'gestion': ['Ya se asignaron todos los cupos para los centros en la presente gestion', 'Actualice la cantidad de cupos, no puede asignar'] }} />}
			<UeConfirmarTable currentPage={currentPage} setCurrentPage={setCurrentPage} />
			<form onSubmit={handleSubmit}>
				<AssignCuppon isLoading={isLoading} />
			</form>


		</div>

	)
}
