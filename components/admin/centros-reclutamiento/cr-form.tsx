'use client'

import { useState } from "react"

import { CrSelector } from "./cr-selector"
import { DivisionSelectorToCreate } from "./division-selector-to-create"
import { useDivisionsStore } from "@/providers/division-store-provider"
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider"
import { toast, Toaster } from "sonner"

export const CrForm = ({ setShowForm }: {
	setShowForm: (value: boolean) => void
}) => {
	const [cupos, setCupos] = useState<string>('')

	const divisions = useDivisionsStore(state => state.divisions)
	const divisionSelectedToCreate = useCentrosReclutamientoStore(state => state.divisionSelected)
	const centros = useCentrosReclutamientoStore(state => state.centros)
	const centroSelectedToCreate = useCentrosReclutamientoStore(state => state.centroSelected)

	const assignCupo = useCentrosReclutamientoStore(state => state.assignCupo)
	const handleReset = useCentrosReclutamientoStore(state => state.handleReset);


	const maxCuposDivision = (divisionId: number) => {
		return Object.values(divisions)
			.filter(division => division.confirmed && division.id === Number(divisionId))
			.reduce((total, division) => total + division.cupos, 0)
	}

	const sumCuposCentroByDivision = (divisionId: number) => {
		return centros
			?.filter(centro => centro.codigo_division === Number(divisionId))
			?.reduce((total, centro) => total + centro.cupos, 0) || 0
	}

	const cuposAvailable = maxCuposDivision(divisionSelectedToCreate) - sumCuposCentroByDivision(divisionSelectedToCreate)
	const noCuposAvailable = cuposAvailable <= 0

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const cuposParsed = parseInt(cupos)
		if (cuposParsed > cuposAvailable) {
			toast.error('Hubo un problema en la asignacion! Debe haber cupos disponibles para la division seleccionada', {
				duration: 5000,
			})
			return
		}
		assignCupo(centroSelectedToCreate, cuposParsed)
		setCupos('');
		toast.success('Cupos para el centro de reclutamiento asignado con exito!', {
			duration: 5000,
		})
	}
	const handleClear = () => {
		setCupos('');
		handleReset(centroSelectedToCreate);

	}

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100 transition-all duration-200 hover:shadow-xl fade-in"
		>
			<Toaster richColors position="top-right" />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						División:
					</label>
					<DivisionSelectorToCreate />
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Centro
					</label>
					<CrSelector />
				</div>

				<div className="space-y-2">
					<label className="flex text-sm font-medium text-gray-700 mb-1 items-center gap-2">
						Cupos Disponibles:
						<span className={`
							"ml-2 px-3 py-1 rounded-full text-sm font-semibold",
							${noCuposAvailable
								? "bg-red-50 text-red-700"
								: "bg-green-50 text-[#007934]"}
						`}>
							{cuposAvailable}
						</span>
					</label>

					<div className={`flex items-center max-w-[300px] rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[#007934]/20 focus-within:border-[#007934]
						${noCuposAvailable || Number(cupos) > cuposAvailable
							? "border-red-200 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500"
							: "border-gray-200 focus-within:ring-2 focus-within:ring-[#007934]/20 focus-within:border-[#007934]"}
						`}>
						<input
							type="number"
							value={cupos}
							onChange={(e) => setCupos(e.target.value)}
							className="flex-1 px-4 py-2.5 focus:outline-none rounded-l-lg text-gray-700"
							required
							placeholder="Ingrese cupos..."
						/>
						<button
							type="button"
							onClick={() => handleClear()}
							className="px-4 py-2.5 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-r-lg transition-colors duration-200"
						>
							✖
						</button>
					</div>
					{noCuposAvailable && (
						<p className="text-sm text-red-600">
							No hay cupos disponibles para esta división
						</p>
					)}

					{Number(cupos) > cuposAvailable && (
						<p className="text-sm text-red-600">
							Los cupos a asignar exceden la cantidad de cupos disponibles
						</p>

					)}
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
					disabled={noCuposAvailable}
					type="submit"
					className={`px-4 py-2 bg-[#007934] text-white rounded-md hover:bg-[#006228] ${noCuposAvailable
						? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
						: "bg-[#007934] hover:bg-[#006228] focus:ring-[#007934]"}`}
				>
					Guardar Centro
				</button>
			</div>
		</form>
	)
}

