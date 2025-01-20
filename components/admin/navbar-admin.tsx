'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logout from "../logout";


export default function NavbarAdmin() {
	const [isVisible, setIsVisible] = useState(true);
	const [prevScrollPos, setPrevScrollPos] = useState(0);

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;

		if (prevScrollPos > currentScrollPos) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}

		setPrevScrollPos(currentScrollPos);
	};


	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [prevScrollPos, handleScroll]);

	return (
		<header
			className={`bg-white border-b border-[#007934]/20 fixed w-full top-0 transition-transform duration-300 z-10 ${isVisible ? "translate-y-0" : "-translate-y-full"
				}`}
		>
			<div className="container mx-auto px-4 py-4 flex justify-between items-center h-20">
				<Link className="flex items-center gap-6 "
					href="/admin"
				>
					<Image
						src="https://sistemas.mindef.gob.bo/assets/img/portfolio/logo2.jpg"
						alt="Ministerio de Defensa"
						width={200}
						height={60}
						className="h-12 w-auto slide-in"
					/>
					<h1 className="mt-2 text-xl font-bold text-gray-900 fade-in md:block transition-all duration-200 hover:text-green-700">
						Sistema de Asignación de Cupos - Servicio Premilitar
					</h1>
				</Link>
				<div className="flex text-sm text-gray-600 slide-in-reverse gap-4">
					<Link href='/reportes'>
						Reportes
					</Link>
					<Logout />
					Gestión: {new Date().getFullYear()}
				</div>
			</div>
		</header>
	);
}
