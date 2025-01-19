'use client'
import EmptyState from "@/pages/empty-page";
import { useEffect } from "react";
import { useUnidadesStore } from "@/providers/unidades-store-provider";
import { UeConfirmarGrid } from "./ue-confirmar-grid";

interface Props {
	currentPage: number;
	setCurrentPage: (value: number) => void;
}


export const UeConfirmarTable = ({ currentPage, setCurrentPage }: Props) => {
	const unidadesFiltered = useUnidadesStore(state => state.unidadesFiltered);
	const setUnidadesFiltered = useUnidadesStore(state => state.setUnidadesFiltered);

	const itemsPerPage = 10
	const totalPages = Math.ceil((unidadesFiltered?.length || 0) / itemsPerPage);
	const currentUnidades = unidadesFiltered?.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)


	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(totalPages);
		} else if (totalPages === 0 && currentPage !== 1) {
			setCurrentPage(1);
		}
	}, [unidadesFiltered, currentPage, totalPages, setCurrentPage, setUnidadesFiltered]);


	if (unidadesFiltered?.length === 0) {
		return (
			<>
				<EmptyState
					title="No se encontraron unidades educativas"
					message="No hay unidades educativas registradas en el sistema."
					suggestion="Puedes probar buscando con otro nombre, o seleccionando otro centro de reclutamiento."
				/>
			</>
		)
	}



	return (
		<>

			<UeConfirmarGrid unidades={currentUnidades} />
			{
				totalPages > 1 && (
					<div className="flex justify-center gap-2">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => setCurrentPage(page)}
								className={`px-3 py-1 rounded-md ${currentPage === page
									? 'bg-[#007934] text-white'
									: 'bg-white text-gray-700 hover:bg-gray-50'
									}`}
							>
								{page}
							</button>
						))}
					</div>
				)
			}
		</>
	)
}
