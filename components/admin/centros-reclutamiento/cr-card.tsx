import { CentrosReclutamiento } from "@/interfaces/centros-reclutamiento/centros-reclutamiento"

interface Props {
	centro: CentrosReclutamiento
}
export const CrCard = ({ centro }: Props) => {
	return (
		<tr className="hover:bg-gray-50">
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{centro.codigo_division}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{centro.regimiento}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
				{centro.cupos}
			</td>
		</tr>
	)
}
