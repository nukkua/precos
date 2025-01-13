import { CheckForm } from "@/components/check-form";
import { FooterForm } from "@/components/footer-form";

import HeaderForm from "@/components/header-form";

import Image from "next/image";





export default function PremilitaresPage() {

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#1a2f1a] to-[#0f1f0f] flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-lg xl:max-w-xl space-y-5 xl:space-y-8">
				<main className="bg-white border-2 border-[#007934]/20 rounded-lg shadow-lg overflow-hidden">
					<header>
						<Image
							src="https://sistemas.mindef.gob.bo/assets/img/portfolio/logo2.jpg"
							alt="Inicio"
							width={330}
							height={100}
							className="pt-5 px-5 m-auto "
						/>
						<HeaderForm />

					</header>
					<CheckForm />
				</main>
				<FooterForm />
			</div>
		</div >
	);
}
