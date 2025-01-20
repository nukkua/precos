'use client'

import { DivisionCupponProgress } from "@/components/admin/division/division-cuppon-progress";
import { DivisionForm } from "@/components/admin/division/division-form";
import { DivisionGrid } from "@/components/admin/division/division-grid";
import { DivisionHeader } from "@/components/admin/division/division-header";
import { AperturaResponse } from "@/interfaces/apertura/apertura";

import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";

import { use, useEffect } from "react";

interface Props {
	getApertura: Promise<AperturaResponse>;
	token: string;
}

export const Division = ({ getApertura, token }: Props) => {
	const apertura = use(getApertura)
	const getDivision = useDivisionsStore(state => state.getDivision);
	const setAperturaResponse = useAperturaStore(state => state.setAperturaResponse);


	useEffect(() => {
		setAperturaResponse(apertura);
		getDivision(token);
	}, [setAperturaResponse, getDivision, apertura, token])


	return (
		<div className="">
			<DivisionHeader />
			<DivisionCupponProgress />

			<DivisionGrid />
			<DivisionForm token={token} />

		</div>
	)
}


