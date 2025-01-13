'use client'

import { useState } from "react"
import { CrFilterAndSearch } from "./cr-filter-and-search"

import { CrForm } from "./cr-form"
import { CrHeader } from "./cr-header"

import { CrTable } from "./cr-table"

export const CrMain = () => {
	const [showForm, setShowForm] = useState(false)
	const [currentPage, setCurrentPage] = useState(1);




	return (

		<div className="space-y-6">
			<CrHeader />
			<CrFilterAndSearch setShowForm={setShowForm} />


			{
				showForm && (
					<CrForm setShowForm={setShowForm} />
				)
			}
			<CrTable currentPage={currentPage} setCurrentPage={setCurrentPage} />

		</div>

	)
}
