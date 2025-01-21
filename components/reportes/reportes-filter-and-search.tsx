'use client'

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { Premilitar } from "@/interfaces/premilitares/premilitares";
import { getReportePremilitaresByCentroId } from "@/services/getReportePremilitaresByCentroId";
import { useUnidadesStore } from "@/providers/unidades-store-provider";
import { ReportesCrSelector } from "./reportes-cr-selector";

export const ReportesFilterAndSearch = () => {
	const [premilitares, setPremilitares] = useState<Premilitar[]>([]);
	const unidadesFiltered = useUnidadesStore((state) => state.unidadesFiltered);
	const centroSelected = useCentrosReclutamientoStore((state) => state.centroSelected);

	useEffect(() => {
		if (centroSelected) {
			getReportePremilitaresByCentroId(centroSelected).then((premilitares) => setPremilitares(premilitares.data));
		}
	}, [centroSelected]);

	const generatePDF = () => {
		const doc = new jsPDF();
		console.log(doc.getFontList());

		premilitares.forEach((premilitar, index) => {
			if (index > 0) doc.addPage();
			const unidad = unidadesFiltered?.find(unidad => unidad.codigo === premilitar.codigo_unidad_educativa);
			doc.setFontSize(12);

			doc.setFont("Bookman Old Style", "italic",);
			doc.text("La Paz, Julio 22 de 2024", 146, 50);
			doc.setFont("Bookman Old Style", "bold");
			doc.text(`MD-SD-VIDECODI-DGTM-UOT. PREMIL Nº ${premilitar.oficio}/${new Date().getFullYear().toString().substring(2, 4)}`, 86, 55);

			doc.setFont("Bookman Old Style", "normal");
			doc.text(`Estudiante:`, 32, 65);
			doc.setFont("Bookman Old Style", "bold");
			doc.text(`${premilitar.nombres} ${premilitar.apellido_paterno} ${premilitar.apellido_materno}`, 32, 70);
			doc.text(`Unidad Educativa: "${unidad?.unidad_educativa}"`, 32, 75);
			doc.setFont("Bookman Old Style", "italic");
			doc.text("Presente.-", 32, 80);

			doc.text(
				`A nombre del Ministerio de Defensa del Estado Plurinacional de Bolivia, en concordancia con la Ley Nº 954, de 9 de Junio de 2017 y considerando su excelente desempeño académico en la gestión escolar del ${new Date().getFullYear()}, tengo el agrado de invitarle al proceso de selección del SERVICIO PREMILITAR VOLUNTARIO de la categoría ${new Date().getFullYear()}-${new Date().getFullYear() + 1}, y a ser parte integrante de las Fuerzas Armadas del Estado. En este sentido, a fin de cumplir con los requisitos establecidos en el Artículo 108º (numeral 12) y el Art. 249º de la Constitución Política del Estado, le comunico la información para su presentación voluntaria, correspondiente al período de Conscripción:`,
				32,
				90,
				{ maxWidth: 155, align: 'justify' }
			);

			doc.setFont("Bookman Old Style", "bold");
			doc.setFillColor(255, 0, 0);
			doc.rect(32, 130, 155, 10, "F");
			doc.setTextColor(255, 255, 255);
			doc.text("INFORMACIÓN DE PRESENTACIÓN", 105, 137, { maxWidth: 155, align: "center" });

			doc.setFont("Bookman Old Style", "bold");
			doc.setTextColor(0, 0, 0);
			doc.text("Unidad Militar:", 32, 146);
			doc.text("Fecha:", 32, 152);
			doc.text("Hora:", 32, 158);
			doc.text("Acreditación:", 32, 164);

			doc.setFont("Bookman Old Style", "normal");
			doc.text(`${premilitar.regimiento}`, 100, 146);
			doc.text(`${premilitar.fecha_presentacion}`, 100, 152);
			doc.text(`${premilitar.hora_presentacion.toString().substring(0, 8)}`, 100, 158);
			doc.text("Cédula de Identidad", 100, 164);

			doc.text(
				`Con este especial motivo y a tiempo de agradecer la recepción de la presente invitación, me despido de Usted con toda atención.`,
				32,
				180,
				{ maxWidth: 155, align: 'justify' }
			);


			doc.text(
				"AAGL / ECU/ NADG / wrc.",
				32,
				245,
				{ maxWidth: 155, align: 'left' }
			);
			doc.text(
				"CC Arc",
				32,
				250,
				{ maxWidth: 155, align: 'left' }
			);


			doc.setFont("Bookman Old Style", "bold");
			doc.setFontSize(8);
			doc.text(
				"NOTA.- ",
				32,
				270,
				{ maxWidth: 155, align: 'justify' }
			);
			doc.setFont("Bookman Old Style", "italic");
			doc.text(
				"Estudiantes invitados (as) al proceso de selección del Servicio Premilitar, NO están exentos del depósito por matrículas.",
				45,
				270,
				{ maxWidth: 155, align: 'justify' }
			)

		});

		doc.save(`Invitaciones_Premilitares.pdf`);
	};

	const generatePDFUnidades = () => {
		const doc = new jsPDF();

		// Cabeceras de la tabla
		const headers = [
			["Nro", "Codigo", "Unidad Educativa", "Aceptados Hombres", "Aceptados Mujeres", "Total",],
		];

		const data = unidadesFiltered?.map((unidad, index) => [
			index + 1,
			unidad.codigo,
			unidad.unidad_educativa,
			unidad.cupos_unidades_educativa[0]?.aceptado_hombres || 0,
			unidad.cupos_unidades_educativa[0]?.aceptado_mujeres || 0,
			unidad.cupos,
		]) || [];


		doc.addImage('/_next/image?url=https%3A%2F%2Fsistemas.mindef.gob.bo%2Fassets%2Fimg%2Fportfolio%2Flogo2.jpg&w=640&q=75', 'PNG', 10, 10, 55, 15);
		doc.text(`Unidades Educativas`, 75, 35);
		autoTable(doc, {
			head: headers,
			body: data,
			startY: 40,
			theme: "grid",
			styles: { font: "helvetica", fontSize: 10 },
			headStyles: { fillColor: [41, 128, 185], textColor: 255 },
		});

		doc.save(`Reporte_UnidadesEducativas.pdf`);
	};
	const generatePDFPremilitares = () => {
		const doc = new jsPDF();

		const headers = [
			["Nro", "Nombre", "Carnet de Identidad", "Fecha de Nacimiento", "Edad Estimada"],
		];

		const sortedPremilitares = premilitares?.slice().sort((a, b) => {
			if (a.apellido_paterno.toLowerCase() < b.apellido_paterno.toLowerCase()) return -1;
			if (a.apellido_paterno.toLowerCase() > b.apellido_paterno.toLowerCase()) return 1;

			if (a.apellido_materno.toLowerCase() < b.apellido_materno.toLowerCase()) return -1;
			if (a.apellido_materno.toLowerCase() > b.apellido_materno.toLowerCase()) return 1;

			if (a.nombres.toLowerCase() < b.nombres.toLowerCase()) return -1;
			if (a.nombres.toLowerCase() > b.nombres.toLowerCase()) return 1;

			return 0;
		}) || [];

		const data = sortedPremilitares.map((premilitar, index) => [
			index + 1,
			`${premilitar.apellido_paterno} ${premilitar.apellido_materno} ${premilitar.nombres}`,
			premilitar.ci,
			premilitar.fecha_nacimiento.toString(),
			premilitar.edad_estimada,
		]);

		doc.addImage('/_next/image?url=https%3A%2F%2Fsistemas.mindef.gob.bo%2Fassets%2Fimg%2Fportfolio%2Flogo2.jpg&w=640&q=75', 'PNG', 10, 10, 55, 15);
		doc.text(`Relacion nominal de ${premilitares?.[0]?.regimiento}`, 32, 35);

		autoTable(doc, {
			head: headers,
			body: data,
			startY: 40,
			theme: "grid",
			styles: { font: "helvetica", fontSize: 10 },
			headStyles: { fillColor: [41, 128, 185], textColor: 255 },
		});

		// Guardar el archivo PDF
		doc.save(`Reporte_UnidadesEducativas.pdf`);
	};

	return (
		<div className="flex flex-col md:flex-row gap-4 items-center">
			<ReportesCrSelector />

			<button
				className="py-2 px-2 bg-blue-900 rounded-lg text-white"
				onClick={generatePDF}
			>
				Invitaciones Estudiantes (Premilitares)
			</button>

			<button
				className="py-2 px-2 bg-blue-700 rounded-lg text-white"
				onClick={generatePDFPremilitares}
			>
				Reporte Estudiantes Invitados (Premilitares)
			</button>
			<button
				className="py-2 px-2 bg-blue-500 rounded-lg text-white"
				onClick={generatePDFUnidades}
			>
				Reporte de Unidades Educativas
			</button>
		</div>
	);
};
