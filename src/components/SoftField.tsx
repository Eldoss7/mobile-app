import { useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const soft = {
  blue: '#2459F0',
  field: '#E9EEFF',
  band: '#D9E3FF',
  hint: '#8EA5EE',
  text: '#11141C',
  page: '#F1F4FF',
};

type Props = Omit<TextInputProps, 'style'> & {
  label?: string;
  secure?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function SoftField({ label, secure, style, ...rest }: Props) {
  const [hidden, setHidden] = useState(!!secure);

  return (
    <View style={style}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <View style={s.box}>
        <TextInput
          {...rest}
          secureTextEntry={hidden}
          placeholderTextColor={soft.hint}
          style={s.input}
        />
        {secure ? (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={12}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={soft.blue}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '700', color: soft.text, marginBottom: 8 },
  box: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: soft.field,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: { flex: 1, fontSize: 13, color: soft.text, padding: 0 },
});
