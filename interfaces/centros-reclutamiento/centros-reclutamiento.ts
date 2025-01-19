export interface CentrosReclutamientoResponse {
	success: boolean;
	data?: CentrosReclutamiento[];
	error?: string | null;
	message: string;
}

export interface CentrosReclutamiento {
	id: number;
	codigo: string;
	regimiento: string;
	codigo_division: number;
	cupos_centros_reclutamiento_gestiones: Cupo[];
	id_fuerza: number;
	prioridad: number;
	created_at: Date;
	updated_at: Date;
	cupos: number;
	unidades: number[];
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
