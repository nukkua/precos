'use client'

import { useState } from 'react'

interface ErrorModalProps {
	isVisible?: boolean
	onClose?: () => void
	title?: string
	message?: string
	buttonText?: string
}

export const ErrorModal = ({
	isVisible = true,
	onClose,
	title = "Error!",
	message = "Oh no, algo salió mal.",
	buttonText = "Intentar de nuevo"
}: ErrorModalProps) => {
	const [isModalVisible, setIsModalVisible] = useState(isVisible)

	const handleClose = () => {
		setIsModalVisible(false)
		onClose?.()
	}


	if (!isModalVisible) return null

	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
			<div className="relative w-[90%] max-w-md bg-gradient-to-bl from-[#EF8D9C] to-[#FFC39E] rounded-2xl shadow-xl p-8 animate-[fadeIn_0.3s_ease-in-out]">
				<button
					onClick={handleClose}
					className="absolute top-4 right-7 text-white/80 hover:text-white transition-colors scale-150"
				>
					×
				</button>

				<div className="relative w-28 h-32 mx-auto mt-4 mb-12">
					{/* Quepi (Military Cap) */}
					<div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-10">
						<div className="absolute inset-0 bg-[#0A3B2D] rounded-t-lg" /> {/* Base del quepi */}
						<div className="absolute bottom-0 left-0 right-0 h-2 bg-[#0D4D3C]" /> {/* Visera */}
						<div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#B8860B]" /> {/* Banda dorada */}
						<div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4"> {/* Escudo */}
							<div className="absolute inset-0 bg-[#B8860B] rotate-45" />
							<div className="absolute inset-0 bg-[#B8860B] rotate-[22.5deg]" />
							<div className="absolute inset-0 bg-[#B8860B] rotate-[67.5deg]" />
						</div>
					</div>

					{/* Face with Uniform */}
					<div className="absolute top-6 w-full animate-[bounce_1s_ease-in_infinite]">
						{/* Uniform Collar */}
						<div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-8">
							<div className="absolute inset-0 bg-[#0A3B2D] rounded-b-lg" />
							{/* Insignias */}
							<div className="absolute top-1 left-4 w-2 h-2 bg-[#B8860B]" />
							<div className="absolute top-1 right-4 w-2 h-2 bg-[#B8860B]" />
						</div>

						{/* Face */}
						<div className="relative w-20 h-20 mx-auto bg-[#FFE4C4] rounded-full border-2 border-[#0A3B2D]">
							{/* Eyes */}
							<div className="absolute top-[40%] left-[25%] w-[5px] h-[5px] bg-[#0A3B2D] rounded-full" />
							<div className="absolute top-[40%] right-[25%] w-[5px] h-[5px] bg-[#0A3B2D] rounded-full" />
							{/* Sad */}
							<div className="absolute top-[70%] left-[41%] w-[7px] h-[7px] rounded-full border-2 border-b-transparent border-r-transparent border-[#777777] rotate-45" />
							{/* Mustache */}
							<div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-10 h-[2px]">
								<div className="absolute left-0 w-4 h-[2px] bg-[#0A3B2D] rotate-[15deg]" />
								<div className="absolute right-0 w-4 h-[2px] bg-[#0A3B2D] rotate-[-15deg]" />
							</div>
						</div>
					</div>

					{/* Shadow */}
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/20 rounded-full animate-[scale_1s_ease-in_infinite]" />
				</div>

				{/* Content */}
				<div className="text-center space-y-2">
					<h2 className="text-white font-bold tracking-[5px] uppercase">
						{title}
					</h2>
					<p className="text-gray-600 text-sm tracking-wider uppercase">
						{message}
					</p>
				</div>

				<button
					onClick={handleClose}
					className="mt-8 mx-auto block w-1/2 py-3 bg-white rounded-2xl shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
				>
					<span className="text-[#D47786] font-bold tracking-[3px] uppercase text-sm">
						{buttonText}
					</span>
				</button>
			</div>
		</div>
	)
}

