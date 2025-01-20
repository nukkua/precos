'use client'

import { UeMain } from "@/components/admin/unidades-educativas/ue-main";
import { AperturaResponse } from "@/interfaces/apertura/apertura";
import { CentrosReclutamientoResponse } from "@/interfaces/centros-reclutamiento/centros-reclutamiento";
import { DivisionResponse } from "@/interfaces/divisiones/divisiones";
import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";
import { useUnidadesStore } from "@/providers/unidades-store-provider";
import { use, useEffect } from "react";

interface Props {
	getDivision: Promise<DivisionResponse>;
	getApertura: Promise<AperturaResponse>;
	getCentros: Promise<CentrosReclutamientoResponse>;
	token: string;
}

export const Ue = ({ getDivision, getApertura, getCentros, token }: Props) => {

	const division = use(getDivision);
	const apertura = use(getApertura);
	const centros = use(getCentros);

	const setAperturaResponse = useAperturaStore(state => state.setAperturaResponse);
	const setDivisionResponse = useDivisionsStore(state => state.setDivisionResponse);
	const setCentrosResponse = useCentrosReclutamientoStore(state => state.setCentrosResponse);
	const getUnidades = useUnidadesStore(state => state.getUnidades);




	useEffect(() => {
		setDivisionResponse(division);
		setAperturaResponse(apertura);
		setCentrosResponse(centros);
		getUnidades(token);

	}, [
		setDivisionResponse,
		division,
		setAperturaResponse,
		apertura,
		setCentrosResponse,
		centros,
		getUnidades,
		token
	])

	return (
		<>
			<h2 className="title mb-5 slide-in">
				Vinculacion de Unidades Educativas
			</h2>
			<UeMain token={token} />
		</>

	)
}
