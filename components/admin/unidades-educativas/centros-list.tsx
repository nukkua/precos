import { CentrosReclutamiento } from "@/interfaces/centros-reclutamiento/centros-reclutamiento"
import { CentroCard } from "./centro-card"

interface Props {
	centrosFiltered?: CentrosReclutamiento[];
}

export const CentrosList = ({ centrosFiltered }: Props) => {

	return (

		<div className="space-y-2 grid grid-cols-3 gap-1">
			{centrosFiltered?.map(centro => (
				<CentroCard key={centro.id} centro={centro} />
			))}
		</div>
	)
}
