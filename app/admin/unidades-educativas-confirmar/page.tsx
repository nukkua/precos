import { verifySession } from "@/auth/dal";
import { ErrorBoundary } from "@/components/error-boundary";
import ErrorPage from "@/pages/error-page";
import { UeConfirmar } from "@/pages/ue-confirmar-page";


export default async function UeConfimarPage() {
	const session = await verifySession();





	return (
		<>
			<ErrorBoundary fallback={<ErrorPage />} >
				<UeConfirmar token={session.token} />
			</ErrorBoundary>
		</>
	)
}


