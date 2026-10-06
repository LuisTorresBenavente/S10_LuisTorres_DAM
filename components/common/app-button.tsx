import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../constants/colors";
import { dimensions, radii, spacing, typography } from "../../constants/theme";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function AppButton({ title, onPress, disabled = false }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radii.button,
    justifyContent: "center",
    minHeight: dimensions.buttonHeight,
    paddingHorizontal: spacing.lg,
  },
  disabled: { backgroundColor: colors.disabled, opacity: 0.65 },
  pressed: { backgroundColor: colors.primaryPressed, transform: [{ scale: 0.98 }] },
  label: {
    color: colors.white,
    fontSize: typography.button,
    fontWeight: "700",
  },
});