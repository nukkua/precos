import { useState } from "react";
import { ReportesFilterAndSearch } from "./reportes-filter-and-search";
import { ReportesTable } from "./reportes-table";

export const ReportesMain = () => {
	const [currentPage, setCurrentPage] = useState(1);


	return (
		<div className="space-y-6">

			<ReportesFilterAndSearch />
			<ReportesTable currentPage={currentPage} setCurrentPage={setCurrentPage} />


		</div>
	)



}
