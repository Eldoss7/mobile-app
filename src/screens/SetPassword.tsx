import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import SoftField, { soft } from '../components/SoftField';
import TopBar from '../components/TopBar';
import type { ScreenProps } from '../types';

export default function SetPassword({ reset, back }: ScreenProps) {
  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TopBar title="Установка пароля" onBack={back} />

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.scroll}>
        <Text style={s.hint}>
          Придумайте надёжный пароль: не менее 8 символов, с буквами и цифрами. Не передавайте его другим людям.
        </Text>

        <SoftField label="Пароль" placeholder="••••••••••••" secure style={s.field} />
        <SoftField label="Подтвердите пароль" placeholder="••••••••••••" secure style={s.field} />

        <Pressable
          style={({ pressed }) => [s.button, pressed && { opacity: 0.85 }]}
          onPress={() => reset('home')}
        >
          <Text style={s.buttonText}>Создать новый пароль</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 22, paddingTop: 18 },
  hint: { fontSize: 10, lineHeight: 15, color: soft.text, marginBottom: 26 },
  field: { marginBottom: 22 },
  button: {
    alignSelf: 'center',
    marginTop: 12,
    height: 46,
    paddingHorizontal: 32,
    borderRadius: 23,
    backgroundColor: soft.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
