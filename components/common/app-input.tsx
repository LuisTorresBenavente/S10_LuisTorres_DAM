import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import { dimensions, radii, spacing, typography } from "../../constants/theme";

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
  isValid?: boolean;
}

export function AppInput({ label, error, isValid, style, ...props }: AppInputProps) {
  const borderColor = error
    ? colors.error
    : props.focusable === false
      ? colors.border
      : isValid
        ? colors.success
        : colors.border;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={colors.mutedText}
        style={[styles.input, { borderColor }, style]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: spacing.md },
  label: {
    color: colors.text,
    fontSize: typography.label,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.input,
    borderWidth: dimensions.borderWidth,
    color: colors.text,
    fontSize: typography.body,
    minHeight: dimensions.inputHeight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  error: {
    color: colors.error,
    fontSize: typography.error,
    marginTop: spacing.xs,
  },
});