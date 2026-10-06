export interface CitaForm {
  nombre: string;
  correo: string;
  fecha: string;
  motivo: string;
}

export type CitaField = keyof CitaForm;

export type CitaErrors = Record<CitaField, string>;
export type CitaTouched = Record<CitaField, boolean>;