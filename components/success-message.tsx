export const SuccessMessage = (
	{
		title = '¡Felicitaciones!',
		description = 'Usted ha sido invitado para formar parte de las Fuerzas Armadas de Bolivia por su gran desempeño academico. Próximamente recibirá más información.'

	}) => {
	return (

		<div className="mt-4 p-4 rounded-md border border-[#007934] bg-[#007934]/10 text-[#007934] fade-in">
			<h3 className="text-lg font-semibold mb-1">{title}</h3>
			<p className="text-sm">
				{description}
			</p>
		</div>
	)
}


