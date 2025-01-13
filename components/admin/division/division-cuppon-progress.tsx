'use client'
import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";


export const DivisionCupponProgress = () => {
	const cantidadApertura = useAperturaStore(state => state.apertura.cantidad);
	const cupponsAssigned = useDivisionsStore((state) =>
		Object.values(state.divisions)
			.filter(division => division.confirmed)
			.reduce((total, division) => total + division.cupos, 0)
	);

	const cupponsAvailable = cantidadApertura - cupponsAssigned;


	return (

		<div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
			<div
				className={`h-2.5 rounded-full transition-all
					${cupponsAvailable > (cantidadApertura * 2 / 3)
						? 'bg-[#007934]'
						: cupponsAvailable > (cantidadApertura * 1 / 3)
							? 'bg-yellow-400'
							: 'bg-red-500'
					}
					`}
				style={{ width: `${(cupponsAvailable / cantidadApertura) * 100}%` }}
			/>
		</div>
	)
}
