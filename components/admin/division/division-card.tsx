import { BlockedSvg } from "@/icons/blocked-svg";
import { useAperturaStore } from "@/providers/apertura-store-provider";
import { useDivisionsStore } from "@/providers/division-store-provider";

import { useRef, useState } from "react";

interface DivisionCardProps {
	divisionKey: string;
	divisionValue: { id: number, cupos: number, confirmed: boolean };
}

export const DivisionCard = ({ divisionKey, divisionValue }: DivisionCardProps) => {
	const [disableInput, setDisableInput] = useState(false);
	const [cupos, setCupos] = useState(0);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const cantidadApertura = useAperturaStore((state) => state.apertura.cantidad);
	const cupponsAssigned = useDivisionsStore((state) =>
		Object.values(state.divisions).reduce((total, division) => total + division.cupos, 0)
	);

	const cupponsAvailable = cantidadApertura! - cupponsAssigned;

	const setDivision = useDivisionsStore((state) => state.setDivision);

	const handleAsignacion = (cupos: number) => {
		if (isNaN(cupos) || cupos < 0) return;
		if (cupos > cantidadApertura!) return;
		if (cupponsAssigned > cantidadApertura!) return;
		if (cupponsAvailable <= 0) return;
		if (cupos > cupponsAvailable + parseInt(cupos.toString().substring(0, cupos.toString().length - 1))) return;

		setCupos(cupos);
	};

	const handleBlur = () => {
		if (isNaN(cupos) || cupos < 0) return;
		if (cupos > cantidadApertura!) return;
		if (cupponsAssigned > cantidadApertura!) return;
		if (cupponsAvailable <= 0) return;
		if (cupos > cupponsAvailable + parseInt(cupos.toString().substring(0, cupos.toString().length - 1))) return;
		if (cupos + cupponsAssigned > cantidadApertura!) return;

		setDivision(divisionKey, cupos, true);
		setDisableInput(true);
	};

	const handleClickReset = () => {
		setCupos(0);
		setDivision(divisionKey, 0);
		setDisableInput(false);
	};


	return (
		<tr className={`border-b hover:bg-gray-50 fade-in ${disableInput || divisionValue.id === 5 ? 'bg-gray-50' : 'bg-white'}`}>
			<th scope="row" className={`px-6 py-4 font-medium whitespace-nowrap capitalize ${disableInput ? 'text-green-700' : 'text-red-700'}`}>
				{divisionKey}
			</th>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center fade-in">
				{divisionValue.cupos}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center gap-2">
				<input
					ref={inputRef}
					type="text"
					value={cupos}
					onChange={(e) => handleAsignacion(parseInt(e.target.value))}
					className={`w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#007934] ${disableInput ? 'cursor-not-allowed' : ''}`}
					min="1"
					max={cantidadApertura}
					onBlur={handleBlur}
					disabled={disableInput || divisionValue.id === 5}
				/>
				{(disableInput || divisionValue.id === 5) && <BlockedSvg />}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 gap-2">
				<button
					onClick={handleClickReset}
					className="px-3.5 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex"
				>
					Resetear
				</button>
			</td>
		</tr>
	);
};
