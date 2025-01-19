'use client'

import { useAperturaStore } from "@/providers/apertura-store-provider"
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { useUnidadesStore } from "@/providers/unidades-store-provider";

export const UeConfirmarHeader = () => {
	const unidades = useUnidadesStore(state => state.unidades);
	const cantidadApertura = useAperturaStore(state => state.apertura.cantidad);
	const cantidadSumCentros = useCentrosReclutamientoStore(state =>
		state.centros
			?.reduce((sum, centro) => sum + centro.cupos, 0));






	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-[#007934]/10 rounded-lg">
						<svg className="w-5 h-5" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#007934" d="M127.596 26.436C111.219 26.126 90.368 38.184 78 32v64c16.008 8.004 48.437-15.563 64 0 16 16 40.004 7.996 48 0V32c-7.755 7.755-32 16-48 0-3.985-3.985-8.946-5.462-14.404-5.564zM39 32v254.373c5.412-12.05 11.43-23.452 18-34.172V32H39zm217 121C135.23 153 28.575 256.151 25.162 439H208V336c0-32 96-32 96 0v103h182.838C483.425 256.151 376.769 153 256 153zm0 26.938l36.025 18.011-8.05 16.102L256 200.063l-27.975 13.988-8.05-16.102L256 179.937zm0 38l36.025 18.011-8.05 16.102L256 238.063l-27.975 13.988-8.05-16.102L256 217.937zm0 38l36.025 18.011-8.05 16.102L256 276.063l-27.975 13.988-8.05-16.102L256 255.937zM80 336h96v48H80v-48zm256 0h96v48h-96v-48zm-80 39v18h32v-18h-32zM25 457v16h158v-16H25zm176 0v16h110v-16H201zm128 0v16h158v-16H329z"></path></g></svg>
					</div>
					<div>
						<p className="text-sm text-gray-600">Cantidad de Unidades Educativas</p>
						<p className="text-2xl font-bold text-gray-900">{unidades?.length}</p>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-[#007934]/10 rounded-lg">
						<svg className="w-5 h-5 text-[#007934]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
					</div>
					<div>
						<p className="text-sm text-gray-600">Cupos Aperturados</p>
						<p className="text-2xl font-bold text-gray-900">{cantidadApertura}</p>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-[#007934]/10 rounded-lg">
						<svg className="w-5 h-5 text-[#007934]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<p className="text-sm text-gray-600">Cupos Asignados</p>
						<p className="text-2xl font-bold text-gray-900">{cantidadSumCentros}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
