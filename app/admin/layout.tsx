import NavbarAdmin from '@/components/admin/navbar-admin';
import TabsAdmin from '@/components/admin/tabs-admin';

import { AperturaStoreProvider } from '@/providers/apertura-store-provider';
import { DivisionsStoreProvider } from '@/providers/division-store-provider';
import { CentrosReclutamientoStoreProvider } from '@/providers/centros-reclutamiento-store-provider';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<html lang="en" >
			<body>
				<div className="min-h-screen bg-gradient-to-b from-[#1a2f1a] to-[#0f1f0f]">
					<NavbarAdmin />
					<div className="mx-auto mt-20 py-2">
						<h1 className="flex justify-center text-gray-50 text-2xl font-extrabold max-w-3xl mx-auto my-12 animate-fadeinleft">Pasos a seguir para la asignacion de cupos</h1>
						<AperturaStoreProvider>
							<DivisionsStoreProvider>
								<CentrosReclutamientoStoreProvider>
									<TabsAdmin />


									<div className="p-10 bg-white shadow-xl min-h-[calc(100vh-18rem)] justify-center flex flex-col">
										<div className="w-full max-w-4xl xl:max-w-6xl mx-auto">
											{children}
										</div>
									</div>
								</CentrosReclutamientoStoreProvider>
							</DivisionsStoreProvider>
						</AperturaStoreProvider>
					</div>
				</div>
			</body>
		</html>
	)
}
