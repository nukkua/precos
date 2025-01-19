import { CentrosReclutamiento } from "@/interfaces/centros-reclutamiento/centros-reclutamiento"
import { useUnidadesStore } from "@/providers/unidades-store-provider"

interface Props {
	centro: CentrosReclutamiento
}
export const CentroCard = ({ centro }: Props) => {
	const centroSelected = useUnidadesStore(state => state.centroSelected);
	const setCentroSelected = useUnidadesStore(state => state.setCentroSelected);

	return (

		<button
			key={centro.id}
			onClick={() => setCentroSelected(centro)}
			className={`
              w-full p-4 rounded-lg text-left transition-all
              ${centroSelected?.id === centro.id
					? 'bg-[#0A3B2D] text-white'
					: 'hover:bg-gray-50'
				}
            `}
		>
			<h3 className={`font-medium mb-1 ${centroSelected?.id === centro.id ? 'text-white' : 'text-gray-900'
				}`}>
				{centro.regimiento}
			</h3>
			<p className={`text-sm ${centroSelected?.id === centro.id ? 'text-white/80' : 'text-gray-500'
				}`}>
				{centro.cupos} cupos
			</p>
		</button>
	)
}
