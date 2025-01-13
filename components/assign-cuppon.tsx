import { Arrow } from "@/icons/arrow";
import CreateCupponButton from "./create-cuppon-button";

interface AssignCupponProps {
	isLoading: boolean;
}
export const AssignCuppon = ({ isLoading }: AssignCupponProps) => {
	return (

		<div className="flex justify-end items-center gap-1">
			{isLoading ? <span className="loader mr-1"></span> :
				<Arrow />
			}
			<CreateCupponButton />
		</div>
	)
}
