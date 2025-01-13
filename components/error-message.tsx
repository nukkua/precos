interface Props {
	errorMessage?: string | null;
}
export const ErrorMessage = ({ errorMessage }: Props) => {
	return (

		<div className="mt-4 p-4 rounded-md border border-[#CE1126] bg-[#CE1126]/10 text-[#CE1126] slide-up">
			<h3 className="text-lg font-semibold mb-1">Error</h3>
			<p className="text-sm">{errorMessage || 'Ha ocurrido un error inesperado.'}</p>
		</div>
	)
}
