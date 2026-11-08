import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'solid' | 'outline';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ title, onPress, variant = 'solid', disabled, style }: Props) {
  const outline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        s.base,
        outline ? s.outline : s.solid,
        (pressed || disabled) && { opacity: disabled ? 0.45 : 0.85 },
        style,
      ]}
    >
      <Text style={[s.label, outline && { color: colors.primary }]}>{title}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: { backgroundColor: colors.primary },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  label: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
