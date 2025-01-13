import './globals.css';

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'SACPremilitar',
	description: 'Sistema de Asignacion de cupos para los premilitares de Bolivia',
	icons: {
		icon: [
			{ url: 'https://www.mindef.gob.bo/sites/default/files/chamin.png', type: 'image/png', sizes: '32x32' },
			{ url: 'https://www.mindef.gob.bo/sites/default/files/chamin.png', type: 'image/png', sizes: '192x192' },
		],
		apple: 'https://www.mindef.gob.bo/sites/default/files/chamin.png',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" >
			<body>{children}</body>
		</html>
	)
}
