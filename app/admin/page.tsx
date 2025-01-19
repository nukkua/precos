import { verifySession } from "@/auth/dal";
import { redirect } from "next/navigation"

export default async function AdminPage() {
	const session = await verifySession();
	if (!session) redirect('/auth/login');


	redirect('/admin/apertura');
}
