import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { colors, type } from '../theme';

const LENGTH = 4;

export default function Code({ reset, back }) {
  const { top, bottom } = useSafeAreaInsets();
  const [value, setValue] = useState('');
  const input = useRef(null);
  const active = Math.min(value.length, LENGTH - 1);

  return (
    <KeyboardAvoidingView
      style={[s.root, { paddingTop: top + 14 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable onPress={back} hitSlop={12} style={s.back}>
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </Pressable>

      <View style={s.top}>
        <Text style={[type.title, s.center]}>Введите код подтверждения</Text>
        <Text style={[type.sub, s.center, s.sub]}>
          4-значный код отправлен на{'\n'}lucasscott3@email.com
        </Text>

        <Pressable style={s.boxes} onPress={() => input.current?.focus()}>
          {Array.from({ length: LENGTH }).map((_, i) => (
            <View key={i} style={[s.box, i === active && s.boxActive]}>
              <Text style={s.digit}>{value[i] ?? ''}</Text>
            </View>
          ))}
          <TextInput
            ref={input}
            value={value}
            onChangeText={(t) => setValue(t.replace(/\D/g, '').slice(0, LENGTH))}
            keyboardType="number-pad"
            maxLength={LENGTH}
            autoFocus
            caretHidden
            style={s.hidden}
          />
        </Pressable>
      </View>

      <View style={[s.footer, { paddingBottom: bottom + 16 }]}>
        <Text style={s.resend}>Отправить код повторно</Text>
        <Button
          title="Продолжить"
          disabled={value.length < LENGTH}
          onPress={() => reset('settings')}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  back: { width: 28 },
  top: { flex: 1, paddingTop: 28 },
  center: { textAlign: 'center' },
  sub: { marginTop: 8, marginBottom: 32 },
  boxes: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  box: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: { borderColor: colors.primary },
  digit: { fontSize: 18, fontWeight: '600', color: colors.text },
  hidden: { position: 'absolute', width: '100%', height: '100%', opacity: 0 },
  footer: { gap: 18 },
  resend: { textAlign: 'center', fontSize: 12, fontWeight: '600', color: colors.primary },
});
