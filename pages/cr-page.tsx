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
}


export const Cr = ({ getDivision, getApertura }: Props) => {
	const division = use(getDivision);
	const apertura = use(getApertura);

	const setDivisionResponse = useDivisionsStore(state => state.setDivisionResponse);
	const setAperturaResponse = useAperturaStore(state => state.setAperturaResponse);
	const getCentros = useCentrosReclutamientoStore(state => state.getCentros);


	useEffect(() => {
		setDivisionResponse(division);
		setAperturaResponse(apertura);
		getCentros()
	}, [setDivisionResponse, division, setAperturaResponse, apertura, getCentros])



	return (
		<>
			<h2 className="title mb-5 slide-in">
				Asignacion de Cupos por Centros de Reclutamiento
			</h2>
			<CrMain />
		</>
	)
}

