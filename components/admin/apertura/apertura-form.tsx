'use client';

import { AssignCuppon } from '@/components/assign-cuppon';
import { DangerMessage } from '@/components/danger-message';
import { ErrorModal } from '@/components/error-modal';
import { useAperturaStore } from '@/providers/apertura-store-provider';
import { toast, Toaster } from 'sonner';

const currentYear = new Date().getFullYear() + 1;
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export const AperturaForm = () => {


	const postApertura = useAperturaStore(state => state.postApertura);

	const apertura = useAperturaStore(state => state.apertura);
	const error = useAperturaStore(state => state.errors);
	const isLoading = useAperturaStore(state => state.isLoading);

	const gestion = useAperturaStore(state => state.apertura.gestion);
	const cantidad = useAperturaStore(state => state.apertura.cantidad);
	const fechaLimiteEdad = useAperturaStore(state => state.apertura.fechaLimiteEdad);
	const fechaLimiteApertura = useAperturaStore(state => state.apertura.fechaLimiteApertura);
	const edadMinima = useAperturaStore(state => state.apertura.edadMinima);
	const edadMaxima = useAperturaStore(state => state.apertura.edadMaxima);

	const setApertura = useAperturaStore(state => state.setApertura);




	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const success = await postApertura(apertura);

			if (success) {
				toast.success('Cupos para la apertura asignados con exito!', {
					duration: 5000,
				});
			} else {
				toast.error('Hubo un problema en la asignacion!', {
					duration: 5000,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setApertura(e.target.name, e.target.value);
	};
	const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setApertura(e.target.name, Number(e.target.value));
	};


	return (
		<form onSubmit={handleSubmit} className="space-y-2">
			<Toaster richColors position="top-right" />

			{error && <ErrorModal />}
			{error && <DangerMessage errors={error} />}

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2 slide-in">
						Fecha Límite de Edad
					</label>
					<input
						type="date"
						name="fechaLimiteEdad"
						value={fechaLimiteEdad}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934] fade-in"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2 slide-in-reverse">
						Fecha Límite de Apertura
					</label>
					<input
						type="date"
						name="fechaLimiteApertura"
						value={fechaLimiteApertura}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934] fade-in"
						required
					/>
				</div>


				<div className="relative">
					<label className="block text-sm font-medium text-gray-700 mb-2 slide-in">Edad Minima</label>
					<input
						type="number"
						min="15"
						max="25"
						name="edadMinima"
						value={edadMinima}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934] fade-in"
						required
					/>

					<input id="labels-range-input" type="range" min="15" max="25" className="w-full h-2.5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg appearance-none cursor-pointer fade-in"

						name="edadMinima"
						value={edadMinima}
						onChange={handleChange}
					/>
					<span className="text-sm text-gray-500 absolute start-0 -bottom-6 fade-in">Minimo: 14 años</span>
					<span className="text-sm text-gray-500 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 fade-in">20 años</span>
					<span className="text-sm text-gray-500 absolute end-0 -bottom-6 fade-in">Maximo: 24 años</span>
				</div>

				<div className="relative">
					<label className="block text-sm font-medium text-gray-700 mb-2 slide-in-reverse">Edad Maxima</label>
					<input
						type="number"
						min="15"
						max="25"
						name="edadMaxima"
						value={edadMaxima}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934] fade-in"
						required
					/>

					<input id="labels-range-input" type="range" min="15" max="25" className="w-full h-2.5 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg appearance-none cursor-pointer fade-in"

						name="edadMaxima"
						value={edadMaxima}
						onChange={handleChange}
					/>
					<span className="text-sm text-gray-500 absolute start-0 -bottom-6 fade-in">Minimo: 14 años</span>
					<span className="text-sm text-gray-500 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 fade-in">20 años</span>
					<span className="text-sm text-gray-500 absolute end-0 -bottom-6 fade-in">Maximo: 24 años</span>
				</div>
				<div className="relative inline-block">
					<label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2 slide-in">
						Seleccionar la presente Gestion
					</label>
					<select
						id="year"
						name="gestion"
						value={gestion}
						onChange={handleChangeSelect}
						className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md fade-in"
					>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
					<p className="text-sm mt-2 text-gray-500 slide-in">Gestion: {gestion}</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2 slide-in-reverse">
						Cantidad de Estudiantes
					</label>
					<input
						type="number"
						name="cantidad"
						value={cantidad}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007934]/20 focus:border-[#007934] fade-in"
						required
					/>
				</div>
			</div>
			<AssignCuppon isLoading={isLoading} />
		</form >
	);
};
