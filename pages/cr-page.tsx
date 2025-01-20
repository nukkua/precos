'use client'

import { CrMain } from "@/components/admin/centros-reclutamiento/cr-main";
import { AperturaResponse } from "@/interfaces/apertura/apertura";
import { DivisionResponse } from "@/interfaces/divisiones/divisiones";
import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";
import { use, useEffect } from "react";

interface Props {
	getDivision: Promise<DivisionResponse>;
	getApertura: Promise<AperturaResponse>;
	token: string;
}


export const Cr = ({ getDivision, getApertura, token }: Props) => {
	const division = use(getDivision);
	const apertura = use(getApertura);

	const setAperturaResponse = useAperturaStore(state => state.setAperturaResponse);
	const setDivisionResponse = useDivisionsStore(state => state.setDivisionResponse);
	const getCentros = useCentrosReclutamientoStore(state => state.getCentros);


	useEffect(() => {
		setDivisionResponse(division);
		setAperturaResponse(apertura);
		getCentros(token)
	}, [setDivisionResponse, division, setAperturaResponse, apertura, getCentros, token])




	return (
		<>
			<h2 className="title mb-5 slide-in">
				Asignacion de Cupos por Centros de Reclutamiento
			</h2>
			<CrMain token={token} />
		</>
	)
}

