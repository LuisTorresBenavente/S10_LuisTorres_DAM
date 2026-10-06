import { StyleSheet, Text, View } from "react-native";
import { AppButton, AppHeader, AppInput, ScreenContainer } from "../../components/common";
import { colors } from "../../constants/colors";
import { dimensions, radii, spacing, typography } from "../../constants/theme";
import { useCitaForm } from "../../hooks/use-cita-form";
import { CitaField } from "../../types";

export default function Index() {
  const {
    values,
    errors,
    touched,
    isValid,
    reservedCita,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useCitaForm();

  const renderError = (field: CitaField) =>
    touched[field] ? errors[field] : "";

  return (
    <ScreenContainer>
      <AppHeader
        title="Reserva de Cita"
        subtitle="Completa tus datos para agendar tu atención."
      />
      <View style={styles.card}>
        <AppInput
          autoCapitalize="words"
          label="Nombre"
          onBlur={() => handleBlur("nombre")}
          onChangeText={(value) => handleChange("nombre", value)}
          error={renderError("nombre")}
          isValid={touched.nombre && !errors.nombre && values.nombre.trim().length > 0}
          placeholder="Tu nombre completo"
          value={values.nombre}
        />
        <AppInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          label="Correo"
          onBlur={() => handleBlur("correo")}
          onChangeText={(value) => handleChange("correo", value)}
          error={renderError("correo")}
          isValid={touched.correo && !errors.correo && values.correo.trim().length > 0}
          placeholder="tu@correo.com"
          value={values.correo}
        />
        <AppInput
          keyboardType="numbers-and-punctuation"
          label="Fecha"
          onBlur={() => handleBlur("fecha")}
          onChangeText={(value) => handleChange("fecha", value)}
          error={renderError("fecha")}
          isValid={touched.fecha && !errors.fecha && values.fecha.trim().length > 0}
          placeholder="DD/MM/AAAA"
          value={values.fecha}
        />
        <AppInput
          label="Motivo"
          multiline
          onBlur={() => handleBlur("motivo")}
          onChangeText={(value) => handleChange("motivo", value)}
          error={renderError("motivo")}
          isValid={touched.motivo && !errors.motivo && values.motivo.trim().length > 0}
          placeholder="Cuéntanos brevemente el motivo de tu cita"
          style={styles.motivo}
          textAlignVertical="top"
          value={values.motivo}
        />
        <AppButton disabled={!isValid} onPress={handleSubmit} title="Reservar cita" />
      </View>
      {reservedCita ? (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>¡Cita reservada con éxito!</Text>
          <Text style={styles.successText}>
            {reservedCita.nombre}, tu cita quedó registrada para el {reservedCita.fecha}.
          </Text>
          <Text style={styles.successText}>Motivo: {reservedCita.motivo}</Text>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    elevation: dimensions.elevation,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: dimensions.shadowOpacity,
    shadowRadius: dimensions.shadowRadius,
  },
  motivo: { minHeight: dimensions.inputHeight * 2 },
  successCard: {
    backgroundColor: colors.successBackground,
    borderColor: colors.success,
    borderRadius: radii.card,
    borderWidth: dimensions.borderWidth,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  successTitle: {
    color: colors.success,
    fontSize: typography.body,
    fontWeight: "800",
    marginBottom: spacing.sm,
  },
  successText: {
    color: colors.text,
    fontSize: typography.caption,
    lineHeight: typography.caption * 1.5,
    marginBottom: spacing.xs,
  },
});
