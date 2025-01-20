import { verifySession } from "@/auth/dal";
import { AperturaForm } from "@/components/admin/apertura/apertura-form";

export const Apertura = async () => {
	const session = await verifySession();

	return (
		<div className="">
			<h2 className="title mb-5 slide-in">
				Apertura de Cupos
			</h2>
			<AperturaForm token={session.token} />

		</div>
	)
}
