const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export function validateNombre(value: string): string {
  const nombre = value.trim();
  if (!nombre) return "Ingresa tu nombre.";
  if (nombre.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  return "";
}

export function validateCorreo(value: string): string {
  const correo = value.trim();
  if (!correo) return "Ingresa tu correo.";
  if (!correo.includes("@") || !emailPattern.test(correo)) {
    return "Ingresa un correo válido, debe incluir @.";
  }
  return "";
}

export function validateFecha(value: string): string {
  const fecha = value.trim();
  if (!fecha) return "Ingresa una fecha.";

  const match = datePattern.exec(fecha);
  if (!match) return "Usa el formato DD/MM/AAAA.";

  const [, dayText, monthText, yearText] = match;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return "Ingresa una fecha real.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return "La fecha no puede estar en el pasado.";
  return "";
}

export function validateMotivo(value: string): string {
  const motivo = value.trim();
  if (!motivo) return "Ingresa el motivo de la cita.";
  if (motivo.length < 10) {
    return "El motivo debe tener al menos 10 caracteres.";
  }
  return "";
}