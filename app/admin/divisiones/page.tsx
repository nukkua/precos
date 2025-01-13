import { ErrorBoundary } from "@/components/error-boundary";
import { Division } from "@/pages/division-page";
import ErrorPage from "@/pages/error-page";
import { getApertura } from "@/services/getApertura";


export default function DivisionPage() {



	return (
		<>
			<ErrorBoundary fallback={<ErrorPage />} >
				<Division getApertura={getApertura()} />
			</ErrorBoundary>
		</>
	)
}


