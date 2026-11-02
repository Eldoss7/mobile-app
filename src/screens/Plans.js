import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { colors, type } from '../theme';

const plans = [
  { id: 'year', name: 'Год', note: '−66% скидка', price: '€ 94.80', per: 'в год' },
  { id: 'month', name: 'Месяц', note: '−53% скидка', price: '€ 10.90', per: 'в месяц' },
  { id: 'week', name: 'Неделя', price: '€ 5.90', per: 'в неделю' },
];

const perks = ['Безлимитный доступ', '200 ГБ хранилища', 'Синхронизация на всех устройствах'];

export default function Plans({ go }) {
  const { top, bottom } = useSafeAreaInsets();
  const [plan, setPlan] = useState('year');

  return (
    <View style={[s.root, { paddingTop: top + 28 }]}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={type.title}>Выберите тарифный план</Text>
        <Text style={[type.sub, s.sub]}>И получите 7 дней бесплатно</Text>

        <View style={s.cards}>
          {plans.map((p) => {
            const on = plan === p.id;
            return (
              <Pressable key={p.id} onPress={() => setPlan(p.id)} style={[s.card, on && s.cardOn]}>
                <View style={[s.radio, on && s.radioOn]}>{on && <View style={s.radioDot} />}</View>
                <View style={s.info}>
                  <Text style={s.name}>{p.name}</Text>
                  {p.note ? <Text style={s.note}>{p.note}</Text> : null}
                </View>
                <View style={s.right}>
                  <Text style={s.price}>{p.price}</Text>
                  <Text style={s.per}>{p.per}</Text>
                </View>
                {p.id === 'year' && (
                  <View style={s.badge}>
                    <Ionicons name="star" size={10} color="#fff" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        <View style={s.perks}>
          <Text style={s.perksTitle}>Вы получите:</Text>
          {perks.map((t) => (
            <View key={t} style={s.perk}>
              <Ionicons name="star" size={9} color={colors.primary} />
              <Text style={s.perkText}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[s.footer, { paddingBottom: bottom + 16 }]}>
        <Button title="Подписаться" onPress={() => go('login')} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 20, paddingBottom: 16 },
  sub: { marginTop: 6, marginBottom: 28 },
  cards: { gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: '#fff',
  },
  cardOn: { backgroundColor: colors.tint, borderColor: '#D5E1FB' },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C3C9D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOn: { borderColor: colors.primary, backgroundColor: colors.primary },
  radioDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: colors.text },
  note: { fontSize: 11, color: colors.primary, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  price: { fontSize: 14, fontWeight: '700', color: colors.text },
  per: { fontSize: 11, color: colors.muted, marginTop: 2 },
  badge: {
    position: 'absolute',
    top: -8,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perks: {
    marginTop: 22,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  perksTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 10 },
  perk: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  perkText: { fontSize: 12, color: colors.muted },
  footer: { paddingHorizontal: 20, paddingTop: 8 },
});
