'use client'

import { useState } from "react"
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider"
import { toast, Toaster } from "sonner"
import { useUnidadesStore } from "@/providers/unidades-store-provider"
import { UeConfirmarCentroSelectorToCreate } from "./ue-confirmar-selector-centro-to-create"
import { UeConfirmarSelectorUeToCreate } from "./ue-confirmar-selector-ue-to-create"

export const UeConfirmarForm = ({ setShowForm }: {
	setShowForm: (value: boolean) => void
}) => {
	const [cupos, setCupos] = useState<string>('')
	const [porcentajeMujeres, setPorcentajeMujeres] = useState<string>('20')
	const [porcentajeHombres, setPorcentajeHombres] = useState<string>('80')

	const unidades = useUnidadesStore(state => state.unidades)
	const unidadSelectedToCreate = useUnidadesStore(state => state.unidadConfirmSelectedToCreate)
	const centros = useCentrosReclutamientoStore(state => state.centros)
	const centroSelectedToCreate = useUnidadesStore(state => state.centroConfirmSelectedToCreate)
	const assignCupo = useUnidadesStore(state => state.assignCuppon)
	const handleReset = useUnidadesStore(state => state.handleReset)

	const maxCuposCentro = (centroId: number) => {
		return centros
			?.filter(centro => centro.id === centroId)
			?.reduce((total, centro) => total + centro.cupos, 0) || 0
	}

	const sumCuposUnidadesByCentro = (centroId: number) => {
		return unidades
			?.filter(unidad => unidad.centroId === centroId)
			?.reduce((total, unidad) => total + unidad.cupos, 0) || 0
	}

	const cuposAvailable = maxCuposCentro(centroSelectedToCreate) - sumCuposUnidadesByCentro(centroSelectedToCreate!)


	const handleClear = () => {
		setCupos('')
		handleReset(unidadSelectedToCreate)
	}

	const unidadSelectedInformation = unidades
		?.find(unidad => unidad.codigo === unidadSelectedToCreate)

	const noCuposAvailable = cuposAvailable <= 0


	const handlePorcentajeMujeresChange = (value: string) => {
		const numValue = parseInt(value) || 0
		if (numValue <= 100) {
			setPorcentajeMujeres(value)
			setPorcentajeHombres((100 - numValue).toString())
		}
	}

	const handlePorcentajeHombresChange = (value: string) => {
		const numValue = parseInt(value) || 0
		if (numValue <= 100) {
			setPorcentajeHombres(value)
			setPorcentajeMujeres((100 - numValue).toString())
		}
	}
	const calcularDistribucionSugerida = () => {

		const cuposNum = parseInt(cupos) || 0
		const porcentajeHombresNum = parseInt(porcentajeHombres) || 0
		// const porcentajeMujeresNum = parseInt(porcentajeMujeres) || 0

		const cuposHombres = Math.round((cuposNum * porcentajeHombresNum) / 100)
		const cuposMujeres = cuposNum - cuposHombres

		return { cuposMujeres, cuposHombres }
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const cuposParsed = parseInt(cupos)
		if (cuposParsed > cuposAvailable) {
			toast.error('Hubo un problema en la asignacion! Debe haber cupos disponibles para la division seleccionada', {
				duration: 5000,
			})
			return
		}
		assignCupo(unidadSelectedToCreate, cuposParsed, calcularDistribucionSugerida().cuposMujeres, calcularDistribucionSugerida().cuposHombres, Number(porcentajeMujeres), Number(porcentajeHombres));
		setCupos('')
		toast.success('Cupos para el centro de reclutamiento asignado con exito!', {
			duration: 5000,
		})
	}
	const disableForm = noCuposAvailable || (calcularDistribucionSugerida().cuposHombres > (unidadSelectedInformation?.totalHombres || 0)) || (calcularDistribucionSugerida().cuposMujeres > (unidadSelectedInformation?.totalMujeres || 0)) || Number(cupos) > (unidadSelectedInformation?.totalEstudiantes || 0);

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100 transition-all duration-200 hover:shadow-xl fade-in"
		>
			<Toaster richColors position="top-right" />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Centro:
					</label>
					<UeConfirmarCentroSelectorToCreate />
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Unidades Educativas:
					</label>
					<UeConfirmarSelectorUeToCreate />
				</div>

				{unidadSelectedInformation && (
					<div className="md:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
						<h3 className="text-lg font-semibold mb-4">Distribución Actual</h3>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between mb-2">
									<span className="font-medium">Total Estudiantes: {unidadSelectedInformation.totalEstudiantes}</span>
									<span className="font-medium">Total Estudiantes Habilitados: {unidadSelectedInformation.totalEstudiantesHabilitados}</span>
								</div>
								<div className="space-y-4">
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Hombres: {unidadSelectedInformation.totalHombres}</span>
											<span>{((unidadSelectedInformation.totalHombres / unidadSelectedInformation.totalEstudiantes) * 100).toFixed(1)}%</span>
										</div>
										<div className="h-2 bg-blue-100 rounded-full overflow-hidden">
											<div
												className="h-full bg-blue-500 transition-all duration-300"
												style={{
													width: `${(unidadSelectedInformation.totalHombres / unidadSelectedInformation.totalEstudiantes) * 100}%`
												}}
											/>
										</div>
									</div>

									{/* Mujeres */}
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Mujeres: {unidadSelectedInformation.totalMujeres}</span>
											<span>{((unidadSelectedInformation.totalMujeres / unidadSelectedInformation.totalEstudiantes) * 100).toFixed(1)}%</span>
										</div>
										<div className="h-2 bg-pink-100 rounded-full overflow-hidden">
											<div
												className="h-full bg-pink-500 transition-all duration-300"
												style={{
													width: `${(unidadSelectedInformation.totalMujeres / unidadSelectedInformation.totalEstudiantes) * 100}%`
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="space-y-2">
					<label className="flex text-sm font-medium text-gray-700 mb-1 items-center gap-2">
						Cupos Disponibles:
						<span className={`
              ml-2 px-3 py-1 rounded-full text-sm font-semibold
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
					{disableForm && (
						<p className="text-sm text-red-600">
							La asignacion excede la cantidad de estudiantes disponibles segun genero
						</p>
					)}
					{noCuposAvailable && (
						<p className="text-sm text-red-600">
							No hay cupos disponibles para este centro
						</p>
					)}

					{Number(cupos) > cuposAvailable && (
						<p className="text-sm text-red-600">
							Los cupos a asignar exceden la cantidad de cupos disponibles
						</p>
					)}
					{Number(cupos) > (unidadSelectedInformation?.totalEstudiantes || 0) && (
						<p className="text-sm text-red-600">
							Los cupos a asignar exceden la cantidad de estudiantes que existen en la unidad educativa
						</p>
					)}
				</div>

				<div className="md:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
					<h3 className="text-lg font-semibold mb-4">Distribución de Cupos por Género</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor="porcentajeHombres" className="block text-sm font-medium text-gray-700">
								Porcentaje Hombres
							</label>
							<div className="flex items-center space-x-2">
								<input
									id="porcentajeHombres"
									type="number"
									value={porcentajeHombres}
									onChange={(e) => handlePorcentajeHombresChange(e.target.value)}
									min="0"
									max="100"
									className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]"
								/>
								<span>%</span>
							</div>
						</div>

						<div className="space-y-2">
							<label htmlFor="porcentajeMujeres" className="block text-sm font-medium text-gray-700">
								Porcentaje Mujeres
							</label>
							<div className="flex items-center space-x-2">
								<input
									id="porcentajeMujeres"
									type="number"
									value={porcentajeMujeres}
									onChange={(e) => handlePorcentajeMujeresChange(e.target.value)}
									min="0"
									max="100"
									className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]"
								/>
								<span>%</span>
							</div>
						</div>
					</div>

					{cupos && (
						<div className="mt-4 p-4 bg-gray-50 rounded-lg">
							<h4 className="font-medium mb-2">Distribución Sugerida:</h4>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<span className="text-sm text-blue-600">Cupos para Hombres:</span>
									<p className="font-semibold">{calcularDistribucionSugerida().cuposHombres}</p>
								</div>

								<div>
									<span className="text-sm text-pink-600">Cupos para Mujeres:</span>
									<p className="font-semibold">{calcularDistribucionSugerida().cuposMujeres}</p>
								</div>
							</div>
						</div>
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
					disabled={disableForm}
					type="submit"
					className={`px-4 py-2 bg-[#007934] text-white rounded-md hover:bg-[#006228] ${disableForm
						? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
						: "bg-[#007934] hover:bg-[#006228] focus:ring-[#007934]"}`}
				>
					Guardar Centro
				</button>
			</div>
		</form>
	)
}
