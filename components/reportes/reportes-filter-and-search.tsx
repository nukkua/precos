'use client'

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCentrosReclutamientoStore } from "@/providers/centros-reclutamiento-store-provider";
import { Premilitar } from "@/interfaces/premilitares/premilitares";
import { getReportePremilitaresByCentroId } from "@/services/getReportePremilitaresByCentroId";
import { useUnidadesStore } from "@/providers/unidades-store-provider";

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

		premilitares.forEach((premilitar, index) => {
			if (index > 0) doc.addPage();
			doc.setFont("helvetica", "bold");
			doc.text(`Reporte Premilitar: ${premilitar.nombres}`, 10, 10);
			doc.setFont("helvetica", "normal");
			doc.text(`Edad: ${premilitar.edad_actual}`, 10, 20);
			doc.text(`Centro: ${premilitar.regimiento}`, 10, 30);
			doc.text(`Unidad: ${premilitar.codigo_unidad_educativa}`, 10, 40);
			doc.text(`Fase: ${premilitar.fase}`, 10, 50);
		});

		doc.save(`Reporte_Premilitares_${premilitares[0]?.regimiento}.pdf`);
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


		doc.text(`Unidades Educativas`, 75, 15);
		autoTable(doc, {
			head: headers,
			body: data,
			startY: 20,
			theme: "grid",
			styles: { font: "helvetica", fontSize: 10 },
			headStyles: { fillColor: [41, 128, 185], textColor: 255 },
		});

		doc.save(`Reporte_UnidadesEducativas.pdf`);
	};

	return (
		<div className="flex flex-col md:flex-row gap-4">
			<button
				className="py-2 px-5 bg-blue-900 rounded-lg text-white"
				onClick={generatePDF}
			>
				Reporte Estudiantes Invitados (Premilitares)
			</button>
			<button
				className="py-2 px-5 bg-blue-600 rounded-lg text-white"
				onClick={generatePDFUnidades}
			>
				Reporte de Unidades Educativas
			</button>
		</div>
	);
};
