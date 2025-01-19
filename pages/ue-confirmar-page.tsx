'use client'

import { UeConfirmarMain } from "@/components/admin/unidades-educativas-confirmar/ue-confirmar-main";
import { AperturaResponse } from "@/interfaces/apertura/apertura";
import { DivisionResponse } from "@/interfaces/divisiones/divisiones";
import { useUnidadesStore } from "@/providers/unidades-store-provider";

import EmptyState from "./empty-page";
import { useRouter } from "next/navigation";
import ErrorPage from "./error-page";

interface Props {
	getDivision: Promise<DivisionResponse>;
	getApertura: Promise<AperturaResponse>;
}

export const UeConfirmar = () => {
	const router = useRouter()


	const unidades = useUnidadesStore(state => state.unidades);
	const someConfirmed = unidades?.some(unidad => unidad.centroId !== -1);
	const unidadesConfirmedButton = useUnidadesStore(state => state.unidadesConfirmButton);





	if (!unidadesConfirmedButton) {
		return (
			<ErrorPage
			/>
		)
	}

	if (!someConfirmed) {
		return (
			<EmptyState
				title="No se encontraron unidades educativas vinculadas"
				message="No hay unidades educativas vinculadas registradas en el sistema."
				suggestion="Primero debes vincular unidades educativas a centros de reclutamiento"
				button={<button className="text-white bg-blue-500 px-5 py-2.5 rounded-lg shadow-xl"
					onClick={() => router.back()}
				>	Volver atras.
				</button>}
			/>

		)
	}

	return (
		<>
			<h2 className="title mb-5 slide-in">
				Asignacion de cupos en Unidades Educativas
			</h2>
			<UeConfirmarMain />
		</>

	)
}
