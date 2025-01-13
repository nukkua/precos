import { ErrorBoundary } from "@/components/error-boundary";
import { Cr } from "@/pages/cr-page";
import ErrorPage from "@/pages/error-page";
import { getApertura } from "@/services/getApertura";
import { getDivision } from "@/services/getDivisionByCentro";


export default function CrPage() {



	return (
		<>
			<ErrorBoundary fallback={<ErrorPage />}>
				<Cr getDivision={getDivision()} getApertura={getApertura()} />
			</ErrorBoundary>
		</>
	)
}

