export interface UnidadesResponse {
	success: boolean;
	data?: UnidadesEducativas[];
	error?: string | null;
	message: string;
}

export interface UnidadEducativaInformationResponse {
	success: boolean;
	data?: UnidadEducativaInformation;
	error?: string | null;
	message: string;
}



export interface UnidadesEducativas {
	codigo: number;
	unidad_educativa: string;
	distrito: string;
	zona: string;
	direccion: string;
	codigo_departamento: number;
	created_at: Date;
	updated_at: Date;
	cupos_unidades_educativa?: unknown; // si viene
	centroId: number;
	centroName: string;
	cupos: number;
	porcentajeHombre: number;
	porcentajeMujeres: number;

	totalEstudiantes: number;
	totalEstudiantesHabilitados: number;
	totalHombres: number;
	totalMujeres: number;
	cuposHombres: number;
	cuposMujeres: number;
}
export interface Cupo {
	id: number;
	id_centros_reclutamiento: number;
	codigo_division: number;
	gestion: number;
	cupo: number;
	created_at: Date;
	updated_at: Date;
}

export interface UnidadEducativaInformation {
	codigo_unidad_educativa: number;
	total_estudiantes: number;
	total_estudiantes_habilitados: number
	total_hombres: number;
	total_mujeres: number;
	gestion: number;

}
