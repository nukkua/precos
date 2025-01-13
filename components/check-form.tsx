'use client'

import { getInvited, type InvitedResponse } from "@/services/getInvited";
import { useState } from "react";
import { SuccessMessage } from "./success-message";
import { ErrorMessage } from "./error-message";


export const CheckForm = () => {
	const [ci, setCI] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState<'invited' | 'not-invited' | 'not-found' | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [invitedResponse, setInvitedResponse] = useState<InvitedResponse | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const invited = await getInvited(ci);
			setCI('');
			setInvitedResponse(invited);



			if (invited.data?.invitado) {
				setResult('invited');
			} else {
				setResult('not-invited');
			}
		} catch (error) {
			setResult('not-found');
			setErrorMessage(error.message);
			setCI('');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<section className="p-10 pt-0">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-1">
					<label htmlFor="ci" className="block text-sm font-medium text-gray-700 fade-in">
						Carnet de Identidad:
					</label>
					<input
						id="ci"
						type="text"
						placeholder="Ingrese su numero de carnet de identidad"
						value={ci}
						onChange={(e) => setCI(e.target.value)}
						className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007934] focus:border-[#007934] placeholder-gray-400 text-black fade-in"
						required
						pattern="[0-9]*"
						maxLength={10}
					/>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-[#007934] disabled:hover:bg-[#007934] hover:bg-[#006024] text-white font-bold h-14 rounded-md transition-colors duration-200 ease-in-out disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007934] flex items-center justify-center fade-in"
				>
					{isLoading ? <span className="loader"></span> : 'Verificar'}
				</button>
			</form>
			{result === 'not-found' && (
				<ErrorMessage errorMessage={errorMessage} />
			)}
			{result === 'invited' && (
				<SuccessMessage />
			)}
			{result === 'not-invited' && (
				<div className="mt-4 p-4 rounded-md border border-[#	CE1126] bg-[#CE1126]/10 text-[#CE1126] slide-up">
					<h3 className="text-lg font-semibold mb-1">Error</h3>
					<p className="text-sm">
						En esta oportunidad usted no ha sido invitado por que {invitedResponse?.message}. Agradecemos su interés en servir a la patria.
					</p>
				</div>
			)}
		</section>

	)
}
