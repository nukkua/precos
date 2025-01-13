'use client'

import { LaravelValidationError } from '@/interfaces/globals';
import { useState, useEffect } from 'react';

export const DangerMessage = ({ errors }: { errors?: LaravelValidationError }) => {
	const [isVisible, setIsVisible] = useState(true);
	const [shouldRender, setShouldRender] = useState(true);

	useEffect(() => {
		setIsVisible(true);
		setShouldRender(true);

		const fadeTimer = setTimeout(() => {
			setIsVisible(false);
		}, 6790);

		const removeTimer = setTimeout(() => {
			setShouldRender(false);
		}, 8000);

		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(removeTimer);
		};

	}, [errors]);

	if (!errors || !shouldRender) return null;


	if (Object.entries(errors).length > 1) {
		return (
			<div className={`flex mb-2 p-4 text-sm text-red-800 rounded-lg bg-red-50 ${isVisible ? 'slide-in' : 'animate-fadeoutright'}`} role="alert">
				<svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
				</svg>
				<span className="sr-only">Danger</span>
				<div>
					<span className="font-medium uppercase">Asegurate de cumplir con los siguientes requerimientos:</span>
					<ul className="mt-1.5 list-disc list-inside">
						{Object.entries(errors).map(([field, messages]) =>
							messages.map((message, index) => (
								<li className="uppercase" key={`${field}-${index}`}>{message}</li>
							))
						)}
					</ul>
				</div>
			</div>
		);
	}

	return (
		<ul className={`list-disc list-inside flex flex-col gap-1 ${isVisible ? '' : 'animate-fadeoutright'}`}>
			{Object.entries(errors).map(([field, messages]) =>
				messages.map((message, index) => (
					<div key={`${field}-${index}`} className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
						<svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
						</svg>
						<span className="sr-only">Info</span>
						<div className="mt-1 uppercase">
							<span className="font-medium">Alerta: </span> {message}
						</div>
					</div>
				))
			)}
		</ul>
	);
};

