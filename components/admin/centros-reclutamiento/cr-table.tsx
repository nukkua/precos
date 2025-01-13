'use client'
import { CrGrid } from "./cr-grid"
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";

interface Props {
	currentPage: number;
	setCurrentPage: (value: number) => void;
}


export const CrTable = ({ currentPage, setCurrentPage }: Props) => {
	const centrosFiltered = useCentrosReclutamientoStore(state => state.centrosFiltered);

	const itemsPerPage = 10
	const totalPages = Math.ceil((centrosFiltered?.length || 0) / itemsPerPage);
	const currentCentros = centrosFiltered?.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)


	return (
		<>

			<CrGrid centros={currentCentros} />
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
