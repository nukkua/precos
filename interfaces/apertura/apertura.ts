export interface AperturaMapped {
	gestion: number;
	cantidad: number;
	fecha_limite: string;
	fecha_apertura: string | Date;
	edad_min: number;
	edad_max: number;
}

export interface AperturaResponse {
	success: boolean;
	data?: AperturaMapped;
	error?: string | null;
	message: string;
}
