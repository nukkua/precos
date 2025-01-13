export default function HeaderForm() {
	return (
		<section className="p-5 text-center">
			<h1 className="title tracking-tight text-black mb-1 slide-in text-center uppercase">
				Ministerio de Defensa
			</h1>
			<p className="text-base text-gray-600 slide-in-reverse">
				Verificación de Convocatoria para el servicio Premilitar
			</p>
			<p className="font-bold text-gray-600 slide-in-reverse">
				{new Date().getFullYear()} - {new Date().getFullYear() + 1}
			</p>
		</section>
	)
}
