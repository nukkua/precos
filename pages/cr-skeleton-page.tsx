export const CrSkeletonPage = () => {
	return (
		<>

			<h2 className="title mb-5 h-7 bg-gray-100 animate-pulse rounded-lg max-w-2xl">
			</h2>
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="bg-gray-100 rounded-xl shadow-sm border border-gray-100 p-4 h-20 animate-pulse"></div>

					<div className="bg-gray-100 rounded-xl shadow-sm border border-gray-100 p-4 h-20 animate-pulse"></div>

					<div className="bg-gray-100 rounded-xl shadow-sm border border-gray-100 p-4 h-20 animate-pulse"></div>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1">
					<div className="relative">
						<p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-gray-100 animate-pulse w-7 h-7 rounded-lg">
						</p>
						<input
							type="text"
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934]"
						/>
					</div>
				</div>
				<div className="bg-gray-100 animate-pulse rounded-lg w-40"></div>
				<button
					className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors bg-gray-100 animate-pulse w-36"
				>
				</button>
			</div>

			<div className="mt-5 overflow-x-auto rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-100 animate-pulse">
						<tr>
							{["Región Militar", "Centro", "Cupos Asignados", "Acciones"].map((header, index) => (
								<th
									key={index}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white">
						{[...Array(5)].map((_, index) => (
							<tr key={index} className="bg-gray-100 animate-pulse">
								{[...Array(4)].map((_, cellIndex) => (
									<td
										key={cellIndex}
										className="px-6 py-4 whitespace-nowrap text-sm bg-gray-100 animate-pulse h-8"
									></td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
