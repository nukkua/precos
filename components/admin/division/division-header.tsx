'use client'

import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";

export const DivisionHeader = () => {
	const cantidadApertura = useAperturaStore(state => state.apertura.cantidad);

	const cupponsAssigned = useDivisionsStore((state) =>
		Object.values(state.divisions)
			.filter((division) => division.confirmed)
			.reduce((total, division) => total + division.cupos, 0)
	);

	const cupponsAvailable = cantidadApertura! - cupponsAssigned;


	return (
		<>
			<header className="flex justify-between items-center mb-5">
				<h2 className="title slide-in">Asignación de Cupos por División</h2>
				<span className="text-sm text-gray-600 slide-in-reverse">
					Cupos Disponibles: {cupponsAvailable} de {cantidadApertura}
				</span>
			</header>

		</>

	);
}
