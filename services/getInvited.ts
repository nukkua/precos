import { url } from "./url";

interface Premilitar {
	id: number;
	codigo_unidad_educativa: number;
	rude: string;
	apellido_paterno: string;
	apellido_materno: string;
	nombres: string;
	ci: number;
	complemento: string;
	expedido: string;
	fecha_nacimiento: string;
	sexo: string;
	segip: string;
	nota_promedio: string;
	edad_actual: number;
	edad_estimada: number;
	gestion: number;
	correlativo: number;
	fase: number;
	oficio: string;
	fecha_presentacion: string;
	hora_presentacion: string;
	habilitado_edad: boolean;
	habilitado_notas: boolean;
	invitado: boolean;
	descripcion: string;
	fecha_registro: string;
	created_at: string;
	updated_at: string;
}

export interface InvitedResponse {
	success: boolean;
	data?: Premilitar;
	error?: string | null;
	message: string;
}

export const getInvited = async (ci: string): Promise<InvitedResponse> => {
	try {
		const res = await fetch(`${url}/premilitar/estoy-invitado/${ci}`);
		if (!res.ok) {
			throw new Error('En esta oportunidad usted no ha sido invitado por que su carnet de identidad no se encuentra registrado en el SEGIP. Agradecemos su interés en servir a la patria.');

		}

		const data: InvitedResponse = await res.json();

		if (!data.success) {
			throw new Error(data.message || 'Error desconocido.');
		}

		return data;
	} catch (error) {
		console.error('Error en getInvited:', error);
		throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
	}
};
