import { useUnidadesStore } from "@/providers/unidades-store-provider"
import { RegimientoSelector } from "./regimiento-selector"
import { CentrosSelector } from "./centros-selector";
import { UeSelector } from "./ue-selector";
import { AssignCuppon } from "@/components/assign-cuppon";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { ErrorModal } from "@/components/error-modal";
import { SuccessModal } from "@/components/success-modal";
import { useRouter } from "next/navigation";

export const UeMain = () => {
	const router = useRouter();
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isModalVisibleError, setIsModalVisibleError] = useState<boolean>(false);


	const departamentoSelected = useUnidadesStore(state => state.departamentoSelected);
	const centroSelected = useUnidadesStore(state => state.centroSelected);
	const isLoading = useUnidadesStore(state => state.isLoading);

	const unidades = useUnidadesStore(state => state.unidades);
	const setUnidadesConfirmButton = useUnidadesStore(state => state.setUnidadesConfirmButton);

	const validCentroWithDepartamento = departamentoSelected === centroSelected?.codigo_division;


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!unidades) {
			console.error("Unidades are undefined");
			setIsModalVisibleError(true);
			return;
		};
		toast.success('Unidades educativas vinculadas correctamente', {
			duration: 5000,
		})
		setUnidadesConfirmButton(true);
		setIsModalVisible(true);
	}

	return (
		<div className="space-y-6">
			<Toaster richColors position="top-right" />

			{isModalVisibleError && <ErrorModal
				title="Error"
				message="Los cupos no han sido asignados correctamente."
			/>}
			{isModalVisible && <SuccessModal
				onClose={() => router.push('/admin/unidades-educativas-confirmar')}
			/>}

			<RegimientoSelector />
			{departamentoSelected !== 0 && (
				<CentrosSelector />
			)}
			{validCentroWithDepartamento && (
				<>
					<UeSelector />
					<form onSubmit={handleSubmit}>
						<AssignCuppon isLoading={isLoading} />
					</form>
				</>
			)}

		</div>
	)
}
