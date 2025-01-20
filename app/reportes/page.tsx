'use server'
import { verifySession } from "@/auth/dal";

import { ErrorBoundary } from "@/components/error-boundary";
import ErrorPage from "@/pages/error-page";

import { Reportes } from "@/pages/reportes-page";

import { getApertura } from "@/services/getApertura";
import { getCentrosReclutamiento } from "@/services/getCentrosReclutamiento";
import { getDivision } from "@/services/getDivisionByCentro";
import { getUnidades } from "@/services/getUnidades";


export default async function ReportesPage() {
	const session = await verifySession();


	return (
		<>

			<ErrorBoundary fallback={<ErrorPage />} >
				<Reportes
					getApertura={getApertura(new Date().getFullYear().toString(), session.token)}
					getDivision={getDivision(new Date().getFullYear().toString(), session.token)}
					getCentros={getCentrosReclutamiento(new Date().getFullYear().toString(), session.token)}
					getUnidades={getUnidades(new Date().getFullYear().toString(), session.token)}
				/>
			</ErrorBoundary>


		</>
	);
}
