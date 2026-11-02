import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { colors, type } from '../theme';

const topics = [
  'Пользовательский интерфейс',
  'Пользовательский опыт',
  'Исследования пользователей',
  'UX-тексты',
  'Тестирование',
  'Сервисный дизайн',
  'Стратегия',
  'Дизайн-системы',
];

export default function Interests({ go }) {
  const { top, bottom } = useSafeAreaInsets();
  const [picked, setPicked] = useState([0, 2, 6, 7]);

  const toggle = (i) =>
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <View style={[s.root, { paddingTop: top + 14 }]}>
      <View style={s.track}>
        <View style={s.fill} />
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={type.title}>Персонализируйте свой опыт</Text>
        <Text style={[type.sub, s.sub]}>Выберите свои интересы.</Text>

        <View style={s.list}>
          {topics.map((name, i) => {
            const on = picked.includes(i);
            return (
              <Pressable key={name} onPress={() => toggle(i)} style={[s.item, on && s.itemOn]}>
                <Text style={s.itemText}>{name}</Text>
                {on && <Ionicons name="checkmark" size={16} color={colors.primary} />}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={[s.footer, { paddingBottom: bottom + 16 }]}>
        <Button title="Далее" onPress={() => go('plans')} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E6E9EF',
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  fill: { width: '33%', height: 4, backgroundColor: colors.primary },
  scroll: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 16 },
  sub: { marginTop: 6, marginBottom: 24 },
  list: { gap: 10 },
  item: {
    height: 46,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemOn: { backgroundColor: colors.tint, borderColor: colors.tint },
  itemText: { fontSize: 14, color: colors.text },
  footer: { paddingHorizontal: 20, paddingTop: 8 },
});
