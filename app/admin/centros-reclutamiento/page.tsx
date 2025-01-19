import { verifySession } from "@/auth/dal";
import { ErrorBoundary } from "@/components/error-boundary";
import { Cr } from "@/pages/cr-page";
import ErrorPage from "@/pages/error-page";
import { getApertura } from "@/services/getApertura";
import { getDivision } from "@/services/getDivisionByCentro";


export default async function CrPage() {
	const session = await verifySession();



	return (
		<>
			<ErrorBoundary fallback={<ErrorPage />}>
				<Cr getDivision={getDivision(new Date().getFullYear().toString(), session.token)} getApertura={getApertura(new Date().getFullYear().toString(), session.token)} token={session.token} />
			</ErrorBoundary>
		</>
	)
}

