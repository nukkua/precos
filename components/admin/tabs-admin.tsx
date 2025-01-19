'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';


const stepsInit = [
	{ id: '/admin/apertura', label: '1. Asignar a Aperturas', access: true },
	{ id: '/admin/divisiones', label: '2. Asignar a Regiones', access: false },
	{ id: '/admin/centros-reclutamiento', label: '3. Centros Reclutamiento', access: false },
	{ id: '/admin/unidades-educativas', label: '4. Unidades Educativas 1', access: false },
	{ id: '/admin/unidades-educativas-confirmar', label: '5. Unidades Educativas 2', access: false },
];

export default function TabsAdmin() {
	const pathname = usePathname();
	const [steps, setSteps] = useState(stepsInit);


	const currentStepIndex = steps.findIndex((step) => step.id === pathname);

	useEffect(() => {
		setSteps((prevSteps) =>
			prevSteps.map((step) => {
				if (step.id === '/admin/divisiones') {
					return { ...step, access: true };
				}
				if (step.id === '/admin/centros-reclutamiento') {
					return { ...step, access: true };
				}
				if (step.id === '/admin/unidades-educativas') {
					return { ...step, access: true };
				}
				if (step.id === '/admin/unidades-educativas-confirmar') {
					return { ...step, access: true };
				}
				return step;
			})
		);
	}, []);

	return (
		<div className="my-12">
			<div className="max-w-4xl mx-auto relative animate-fadeinleft">
				<div className="absolute top-5 left-0 w-full h-[5px] bg-gray-200 rounded-lg" />
				<div
					className="absolute top-5 left-0 h-[5px] bg-[#007934] transition-all duration-500 rounded-lg"
					style={{ width: `${8.869 + (currentStepIndex / (steps.length)) * 100}%` }}
				/>
				<div className="relative flex justify-between mt-5 max-w-5xl">
					{steps.map((step, index) => {
						const isCompleted = index < currentStepIndex;
						const isCurrent = index === currentStepIndex;

						return (
							<div key={step.id} className="flex flex-col items-center">
								<Link
									href={step.access ? step.id : '#'} // Deshabilitar enlace si no hay acceso
									onClick={(e) => {
										if (!step.access) {
											e.preventDefault(); // Bloquear navegación
										}
									}}
									className={`w-11 h-11 rounded-full flex items-center justify-center transition-all
                    ${isCompleted ? 'bg-[#007934] text-white' : ''}
                    ${isCurrent ? 'border-2 border-[#007934] bg-white text-[#007934]' : ''}
                    ${!isCompleted && !isCurrent && step.access ? 'bg-gray-200 text-gray-300' : ''}
                    ${!step.access ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : ''}
                  `}
								>
									{isCompleted ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
										>
											<path
												className="text-green"
												fill="currentColor"
												d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
											/>
										</svg>
									) : (
										<div
											className={`w-3 h-3 rounded-full
                      ${isCurrent ? 'bg-[#007934]' : 'bg-gray-400'}
                    `}
										/>
									)}
								</Link>
								<span
									className={`mt-2 text-sm font-medium
                  ${isCurrent ? 'text-green-500/90' : 'text-gray-200'}
                  ${!step.access ? 'text-gray-400' : ''}
                `}
								>
									{step.label}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
