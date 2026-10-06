import { useMemo, useState } from "react";
import {
  CitaErrors,
  CitaField,
  CitaForm,
  CitaTouched,
} from "../types";
import {
  validateCorreo,
  validateFecha,
  validateMotivo,
  validateNombre,
} from "../utils/validators";

const initialValues: CitaForm = {
  nombre: "",
  correo: "",
  fecha: "",
  motivo: "",
};

const initialErrors: CitaErrors = {
  nombre: "",
  correo: "",
  fecha: "",
  motivo: "",
};

const initialTouched: CitaTouched = {
  nombre: false,
  correo: false,
  fecha: false,
  motivo: false,
};

const validators: Record<CitaField, (value: string) => string> = {
  nombre: validateNombre,
  correo: validateCorreo,
  fecha: validateFecha,
  motivo: validateMotivo,
};

export function useCitaForm() {
  const [values, setValues] = useState<CitaForm>(initialValues);
  const [errors, setErrors] = useState<CitaErrors>(initialErrors);
  const [touched, setTouched] = useState<CitaTouched>(initialTouched);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservedCita, setReservedCita] = useState<CitaForm | null>(null);

  const isValid = useMemo(
    () => Object.values(errors).every((error) => !error) &&
      Object.values(values).every((value) => value.trim().length > 0),
    [errors, values],
  );

  const handleChange = (field: CitaField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: validators[field](value) }));
  };

  const handleBlur = (field: CitaField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validators[field](values[field]) }));
  };

  const handleSubmit = () => {
    const nextErrors = Object.keys(validators).reduce(
      (current, field) => {
        const typedField = field as CitaField;
        current[typedField] = validators[typedField](values[typedField]);
        return current;
      },
      { ...initialErrors },
    );
    setErrors(nextErrors);
    setTouched({ nombre: true, correo: true, fecha: true, motivo: true });
    setIsSubmitted(true);

    if (Object.values(nextErrors).some((error) => error)) return false;

    setReservedCita(values);
    reset();
    return true;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors(initialErrors);
    setTouched(initialTouched);
    setIsSubmitted(false);
  };

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitted,
    reservedCita,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}