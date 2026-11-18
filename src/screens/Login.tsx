import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Hero from '../components/Hero';
import Field from '../components/Field';
import Button from '../components/Button';
import { colors, typo } from '../theme';
import type { ScreenProps } from '../types';

export default function Login({ go, reset }: ScreenProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Hero style={s.hero} />
        <View style={[s.body, { paddingBottom: bottom + 24 }]}>
          <Text style={[typo.title, s.title]}>Добро пожаловать!</Text>

          <Field
            placeholder="Электронная почта"
            keyboardType="email-address"
            autoCapitalize="none"
            style={s.field}
          />
          <Field placeholder="Пароль" secure style={s.field} />

          <Text style={s.forgot}>Забыли пароль?</Text>

          <Button title="Войти" onPress={() => reset('chats')} />

          <Text style={s.member}>
            Нет аккаунта?{' '}
            <Text style={s.link} onPress={() => go('signup')}>
              Зарегистрируйтесь
            </Text>
          </Text>

          <View style={s.divider} />
          <Text style={s.or}>Или продолжить через</Text>

          <View style={s.social}>
            <View style={[s.circle, { backgroundColor: '#DB4437' }]}>
              <Text style={s.letter}>G</Text>
            </View>
            <View style={[s.circle, { backgroundColor: '#14171C' }]}>
              <Ionicons name="logo-apple" size={18} color="#fff" />
            </View>
            <View style={[s.circle, { backgroundColor: colors.primary }]}>
              <Text style={s.letter}>f</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  hero: { height: 300 },
  body: { paddingHorizontal: 20, paddingTop: 24 },
  title: { marginBottom: 20 },
  field: { marginBottom: 12 },
  forgot: { fontSize: 12, fontWeight: '600', color: colors.primary, marginBottom: 20 },
  member: { textAlign: 'center', fontSize: 12, color: colors.muted, marginTop: 16 },
  link: { color: colors.primary, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.line, marginTop: 20, marginBottom: 18 },
  or: { textAlign: 'center', fontSize: 11, color: colors.muted },
  social: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 14 },
  circle: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  letter: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
