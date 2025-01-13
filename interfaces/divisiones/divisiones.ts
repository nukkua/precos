export interface DivisionResponse {
	success: boolean;
	data?: Division[];
	error?: string | null;
	message: string;
}

export interface Division {
	codigo: number;
	division: string;
	codigo_departamento: number;
	codigo_division: number;
	created_at: Date;
	updated_at: Date;

	cupos_divisiones: Cupo[];
	cupos: number;
}
export interface Cupo {
	id: number;
	codigo_division: number;
	cupos: number;
	gestion_apertura: number;
	created_at: Date;
	updated_at: Date;
}
