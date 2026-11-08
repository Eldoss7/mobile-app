import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SoftField, { soft } from '../components/SoftField';
import TopBar from '../components/TopBar';
import type { IconName, ScreenProps } from '../types';

const social: IconName[] = ['logo-google', 'logo-facebook', 'finger-print'];

export default function NewAccount({ go, back }: ScreenProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TopBar title="Новый аккаунт" onBack={back} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scroll, { paddingBottom: bottom + 24 }]}
      >
        <SoftField label="Полное имя" placeholder="Иван Иванов" style={s.field} />
        <SoftField label="Пароль" placeholder="••••••••••••" secure style={s.field} />
        <SoftField
          label="Электронная почта"
          placeholder="example@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={s.field}
        />
        <SoftField
          label="Номер телефона"
          placeholder="+7 700 000 00 00"
          keyboardType="phone-pad"
          style={s.field}
        />
        <SoftField
          label="Дата рождения"
          placeholder="ДД / ММ / ГГГГ"
          keyboardType="number-pad"
          style={s.field}
        />

        <Text style={s.terms}>
          Продолжая, вы соглашаетесь с{' '}
          <Text style={s.link}>Условиями использования</Text> и{' '}
          <Text style={s.link}>Политикой конфиденциальности</Text>
        </Text>

        <Pressable style={({ pressed }) => [s.button, pressed && { opacity: 0.85 }]} onPress={() => go('password')}>
          <Text style={s.buttonText}>Зарегистрироваться</Text>
        </Pressable>

        <Text style={s.or}>или зарегистрируйтесь через</Text>
        <View style={s.social}>
          {social.map((name) => (
            <View key={name} style={s.circle}>
              <Ionicons name={name} size={18} color={soft.blue} />
            </View>
          ))}
        </View>

        <Text style={s.login}>
          Уже есть аккаунт?{' '}
          <Text style={s.link} onPress={back}>
            Войти
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 22, paddingTop: 20 },
  field: { marginBottom: 18 },
  terms: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 15,
    color: soft.text,
    marginTop: 4,
    marginBottom: 14,
  },
  link: { color: soft.blue, fontWeight: '700' },
  button: {
    alignSelf: 'center',
    minWidth: 220,
    height: 46,
    paddingHorizontal: 28,
    borderRadius: 23,
    backgroundColor: soft.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  or: { textAlign: 'center', fontSize: 10, color: soft.text, marginTop: 18, marginBottom: 12 },
  social: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: soft.band,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: { textAlign: 'center', fontSize: 11, color: soft.text, marginTop: 24 },
});
