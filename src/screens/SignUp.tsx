import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Field from '../components/Field';
import Button from '../components/Button';
import { colors, typo } from '../theme';
import type { ScreenProps } from '../types';

export default function SignUp({ go, back }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const [agree, setAgree] = useState(false);

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[s.scroll, { paddingTop: top + 14, paddingBottom: bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={back} hitSlop={12} style={s.back}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>

        <Text style={typo.title}>Регистрация</Text>
        <Text style={[typo.sub, s.sub]}>Создайте аккаунт, чтобы начать</Text>

        <Field label="Имя" placeholder="Как вас зовут" style={s.field} />
        <Field
          label="Электронная почта"
          placeholder="name@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={s.field}
        />
        <Field label="Пароль" placeholder="Придумайте пароль" secure style={s.fieldTight} />
        <Field placeholder="Повторите пароль" secure style={s.field} />

        <Pressable style={s.agree} onPress={() => setAgree((a) => !a)}>
          <View style={[s.check, agree && s.checkOn]}>
            {agree && <Ionicons name="checkmark" size={12} color="#fff" />}
          </View>
          <Text style={s.agreeText}>
            Я прочитал(а) и принимаю <Text style={s.link}>Условия использования</Text> и{' '}
            <Text style={s.link}>Политику конфиденциальности</Text>.
          </Text>
        </Pressable>

        <Button title="Зарегистрироваться" disabled={!agree} onPress={() => go('code')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 20 },
  back: { width: 28, marginBottom: 14 },
  sub: { marginTop: 6, marginBottom: 24 },
  field: { marginBottom: 16 },
  fieldTight: { marginBottom: 10 },
  agree: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 4, marginBottom: 24 },
  check: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#C3C9D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  agreeText: { flex: 1, fontSize: 12, lineHeight: 17, color: colors.muted },
  link: { color: colors.primary, fontWeight: '600' },
});
