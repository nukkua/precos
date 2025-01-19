import { verifySession } from "@/auth/dal";
import { ErrorBoundary } from "@/components/error-boundary";
import ErrorPage from "@/pages/error-page";
import { Ue } from "@/pages/ue-page";
import { getApertura } from "@/services/getApertura";
import { getCentrosReclutamiento } from "@/services/getCentrosReclutamiento";
import { getDivision } from "@/services/getDivisionByCentro";


export default async function UePage() {
	const session = await verifySession();



	return (
		<>
			<ErrorBoundary fallback={<ErrorPage />} >
				<Ue
					getApertura={getApertura(new Date().getFullYear().toString(), session.token)}
					getDivision={getDivision(new Date().getFullYear().toString(), session.token)}
					getCentros={getCentrosReclutamiento(new Date().getFullYear().toString(), session.token)}
					token={session.token}
				/>
			</ErrorBoundary>
		</>
	)
}


