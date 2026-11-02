import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function Field({ label, secure, style, ...rest }) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secure);

  return (
    <View style={style}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <View style={[s.box, focused && s.boxFocused]}>
        <TextInput
          {...rest}
          secureTextEntry={hidden}
          placeholderTextColor={colors.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={s.input}
        />
        {secure ? (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={12}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={colors.muted}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  box: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  boxFocused: { borderColor: colors.primary },
  input: { flex: 1, fontSize: 14, color: colors.text, padding: 0 },
});
