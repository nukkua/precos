import { ErrorBoundary } from "@/components/error-boundary";
import ErrorPage from "@/pages/error-page";
import { UeConfirmar } from "@/pages/ue-confirmar-page";


export default function UeConfimarPage() {



	return (
		<>
			<ErrorBoundary fallback={<ErrorPage />} >
				<UeConfirmar />
			</ErrorBoundary>
		</>
	)
}


