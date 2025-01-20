export interface Premilitar {
	regimiento: string;
	id: number;
	codigo_unidad_educativa: number;
	rude: number;
	apellido_paterno: string;
	apellido_materno: string;
	nombres: string;
	ci: number;
	complemento: string | null;
	expedido: string | null;
	fecha_nacimiento: Date;
	sexo: string;
	segip: string;
	nota_promedio: number;
	edad_actual: number;
	edad_estimada: number;
	gestion: number;
	correlativo: number;
	fase: number;
	oficio: string;
}

export type Premilitares = Premilitar[];
