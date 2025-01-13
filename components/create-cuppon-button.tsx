
export default function CreateCupponButton() {
	return (

		<button
			type="submit"
			className="group/button flex items-center justify-center gap-x-3 rounded-xl text-white transition duration-200 motion-reduce:transition-none px-8 py-3 bg-green-700 shadow-lg shadow-black/50"
		>
			<div className="mt-1 font-semibold capitalize">Asignar</div>
			<div className="transition duration-300 group-hover/button:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover/button:transform-none">
				<svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 12.992h2.5m13.5 0-6-6m6 6-6 6m6-6H9.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
				</svg>
			</div>
		</button>
	)
}
