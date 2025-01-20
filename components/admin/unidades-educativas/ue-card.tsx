'use client'

import { CentrosReclutamiento } from "@/interfaces/centros-reclutamiento/centros-reclutamiento";
import { UnidadesEducativas } from "@/interfaces/unidades/unidades"
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { useUnidadesStore } from "@/providers/unidades-store-provider";

interface Props {
	unidad: UnidadesEducativas;
	token: string;
}
export const UeCard = ({ unidad, token }: Props) => {
	const centroSelected = useUnidadesStore(state => state.centroSelected);
	const existsUnidadInCentro = useCentrosReclutamientoStore(state => state.existsUnidad);

	const linkUnidadesToCentro = useCentrosReclutamientoStore(state => state.setUnidad);
	const linkCentroToUnidad = useUnidadesStore(state => state.setCentroId);

	const unlinkUnidadesToCentro = useCentrosReclutamientoStore(state => state.removeUnidad);
	const unlinkCentroToUnidad = useUnidadesStore(state => state.removeCentroId);

	const getUnidadEducativaInformation = useUnidadesStore(state => state.getUnidadEducativaInformation);




	const linkUe = (ueId: number, centro?: CentrosReclutamiento) => {
		if (existsUnidadInCentro(ueId)) return;

		linkUnidadesToCentro(ueId, centro!.id);
		linkCentroToUnidad(ueId, centro!);
		getUnidadEducativaInformation(ueId, token);


		// console.log("Enlazando unidad", ueId, "con centro", centro!.id);
	}
	const unlinkUe = (ueId: number) => {
		if (!existsUnidadInCentro(ueId)) return;
		unlinkUnidadesToCentro(ueId);
		unlinkCentroToUnidad(ueId);

		// console.log("Desenlazando unidad", ueId);
	}
	return (
		<div
			className={`
                relative p-4 rounded-lg border-2 transition-all
                ${unidad.centroId !== -1 ? 'border-[#0A3B2D] bg-[#0A3B2D]/5'
					: 'border-gray-200 hover:border-[#0A3B2D]/30'
				}
              `}
		>
			<div className="flex justify-between items-start mb-2">
				<h3 className="font-medium text-gray-900">
					{unidad.unidad_educativa}
				</h3>
				<button
					onClick={() => unidad.centroId === -1
						? linkUe(unidad.codigo, centroSelected)
						: unlinkUe(unidad.codigo)
					}
					className={`
                    p-1.5 rounded-full transition-colors
                    ${unidad.centroId !== -1
							? 'text-red-500 hover:bg-red-50'
							: 'text-[#0A3B2D] hover:bg-[#0A3B2D]/10'
						}
                  `}
				>
					{unidad.centroId !== -1 ? (
						<svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
							<path d="M18 6L6 18M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					) : (
						<svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
							<path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" strokeWidth={2} />
						</svg>
					)}
				</button>
			</div>
			<div className="space-y-1">
				<p className="text-sm text-gray-500">
					Zona: {unidad.zona}
				</p>
				<p className="text-sm text-gray-500">
					Direccion: {unidad.direccion}
				</p>
			</div>
			{unidad.centroName ?
				<p className="text-blue-800">Vinculado con el centro de reclutamiento: <span className="font-semibold">{unidad.centroName}</span></p>
				:
				<p className="text-red-600">Por vincular</p>
			}
		</div>
	)
}
