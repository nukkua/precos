'use client'

import { ReportesMain } from "@/components/reportes/reportes-main";
import { AperturaResponse } from "@/interfaces/apertura/apertura";
import { CentrosReclutamientoResponse } from "@/interfaces/centros-reclutamiento/centros-reclutamiento";
import { DivisionResponse } from "@/interfaces/divisiones/divisiones";
import { Premilitares } from "@/interfaces/premilitares/premilitares";
import { UnidadesResponse } from "@/interfaces/unidades/unidades";
import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";
import { useUnidadesStore } from "@/providers/unidades-store-provider";
import { use, useEffect } from "react";

interface Props {
	getApertura: Promise<AperturaResponse>;
	getDivision: Promise<DivisionResponse>;
	getCentros: Promise<CentrosReclutamientoResponse>;
	getUnidades: Promise<UnidadesResponse>;
}
export const Reportes = ({ getApertura, getDivision, getCentros, getUnidades }: Props) => {

	const apertura = use(getApertura);
	const division = use(getDivision);
	const centros = use(getCentros);
	const unidades = use(getUnidades);

	const setAperturaResponse = useAperturaStore(state => state.setAperturaResponse);
	const setDivisionResponse = useDivisionsStore(state => state.setDivisionResponse);
	const setCentrosResponse = useCentrosReclutamientoStore(state => state.setCentrosResponse);
	const setUnidadesResponse = useUnidadesStore(state => state.setUnidadesResponse);



	useEffect(() => {
		setAperturaResponse(apertura);
		setDivisionResponse(division);
		setCentrosResponse(centros);
		setUnidadesResponse(unidades);
	}, [
		setAperturaResponse,
		setDivisionResponse,
		setCentrosResponse,
		setUnidadesResponse,
		apertura,
		division,
		centros,
		unidades,
	])



	return (
		<>
			<h2 className="title mb-5 slide-in">
				Unidades Educativas
			</h2>
			<ReportesMain />

		</>
	)
}
