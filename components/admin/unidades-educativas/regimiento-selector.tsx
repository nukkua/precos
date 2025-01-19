'use client'

import { useUnidadesStore } from "@/providers/unidades-store-provider";

export const DEPARTAMENTOS = [
	{ id: 1, name: "La Paz", color: "bg-blue-500", id_departamento: 2 },
	{ id: 2, name: "Oruro", color: "bg-red-500", id_departamento: 4 },
	{ id: 3, name: "Tarija", color: "bg-pink-500", id_departamento: 6 },
	{ id: 4, name: "Sucre", color: "bg-purple-500", id_departamento: 1 },
	{ id: 6, name: "Beni", color: "bg-indigo-500", id_departamento: 8 },
	{ id: 7, name: "Cochabamba", color: "bg-yellow-500", id_departamento: 3 },
	{ id: 8, name: "Santa Cruz", color: "bg-green-500", id_departamento: 7 },
	{ id: 9, name: "Potosí", color: "bg-teal-500", id_departamento: 5 },
	{ id: 10, name: "Pando", color: "bg-orange-500", id_departamento: 9 },
]

export const RegimientoSelector = () => {
	const departamentoSelected = useUnidadesStore(state => state.departamentoSelected);
	const setDepartamentoSelected = useUnidadesStore(state => state.setDepartamentoSelected);
	return (
		<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
			<h2 className="font-semibold sm:text-3xl md:text-2xl text-gray-800">
				Departamentos
			</h2>
			<div className="mt-3 grid grid-cols-3 gap-2">
				{DEPARTAMENTOS.map(dep => (
					<button
						key={dep.id}
						onClick={() => setDepartamentoSelected(dep.id)}
						className={`
              relative p-4 rounded-lg border-2 transition-all
              ${departamentoSelected === dep.id
								? 'border-[#0A3B2D] bg-[#0A3B2D]/5'
								: 'border-gray-100 hover:border-gray-300'
							}
            `}
					>
						<div className={`w-3 h-3 rounded-full ${dep.color} mb-2`} />
						<span className="text-sm font-medium text-gray-700">
							{dep.name}
						</span>
					</button>
				))}
			</div>
		</div>
	)
}

