import { verifySession } from "@/auth/dal";

import { ErrorBoundary } from "@/components/error-boundary";
import { Division } from "@/pages/division-page";

import ErrorPage from "@/pages/error-page";

import { getApertura } from "@/services/getApertura";


export default async function DivisionPage() {
	const session = await verifySession();




	return (
		<>
			<ErrorBoundary fallback={<ErrorPage />} >
				<Division getApertura={getApertura(new Date().getFullYear().toString(), session.token)} token={session.token} />
			</ErrorBoundary>
		</>
	)
}


