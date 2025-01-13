import { CrInput } from "./cr-input"

import { DivisionSelectorToSearch } from "./division-selector-to-search"

interface Props {
	setShowForm: (value: boolean) => void;
}



export const CrFilterAndSearch = ({ setShowForm }: Props) => {
	return (

		<div className="flex flex-col md:flex-row gap-4">
			<div className="flex-1">
				<CrInput />
			</div>
			<DivisionSelectorToSearch />
			<button
				onClick={() => setShowForm(true)}
				className="flex items-center gap-2 px-4 py-2 bg-[#007934] text-white rounded-lg hover:bg-[#006228] transition-colors"
			>
				<span className="text-xl">+</span>
				Asignar Cupos
			</button>
		</div>
	)
}
