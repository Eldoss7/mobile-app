import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { colors } from '../theme';
import type { IconName, ScreenProps } from '../types';

const segments = ['К выполнению', 'В процессе', 'Завершённые'];

const tabs: { label: string; icon: IconName }[] = [
  { label: 'Обзор', icon: 'compass' },
  { label: 'Проекты', icon: 'pencil' },
  { label: 'Входящие', icon: 'mail' },
  { label: 'Профиль', icon: 'person' },
];

export default function EmptyState({ go, back }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const [seg, setSeg] = useState(2);

  return (
    <View style={[s.root, { paddingTop: top + 14 }]}>
      <View style={s.head}>
        <Pressable onPress={back} hitSlop={12} style={s.side}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>
        <Text style={s.title}>Проекты</Text>
        <Pressable onPress={() => go('search')} hitSlop={12} style={[s.side, { alignItems: 'flex-end' }]}>
          <Ionicons name="search" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={s.segments}>
        {segments.map((name, i) => (
          <Pressable key={name} onPress={() => setSeg(i)} style={[s.seg, seg === i && s.segOn]}>
            <Text style={[s.segText, seg === i && s.segTextOn]}>{name}</Text>
          </Pressable>
        ))}
      </View>

      <View style={s.center}>
        <View style={s.iconBox}>
          <Ionicons name="image-outline" size={30} color={colors.tintDeep} />
        </View>
        <Text style={s.emptyTitle}>Пока здесь пусто.</Text>
        <Text style={s.emptyText}>Здесь появятся ваши{'\n'}завершённые проекты.</Text>
        <Button title="Начать проект" onPress={() => go('feedback')} style={s.cta} />
      </View>

      <View style={[s.bar, { paddingBottom: bottom + 6 }]}>
        {tabs.map((t, i) => (
          <View key={t.label} style={s.tab}>
            <Ionicons name={t.icon} size={20} color={i === 1 ? colors.primary : '#C3C8D3'} />
            <Text style={[s.tabLabel, i === 1 && { color: colors.text, fontWeight: '600' }]}>{t.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  head: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  side: { width: 32 },
  title: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '700', color: colors.text },
  segments: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 18,
    padding: 3,
    borderRadius: 10,
    backgroundColor: colors.card,
  },
  seg: { flex: 1, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  segOn: { backgroundColor: '#fff' },
  segText: { fontSize: 12, color: colors.muted },
  segTextOn: { color: colors.text, fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  iconBox: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  emptyText: { fontSize: 13, lineHeight: 19, color: colors.muted, textAlign: 'center', marginTop: 6 },
  cta: { height: 40, paddingHorizontal: 22, marginTop: 22 },
  bar: { flexDirection: 'row', paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.line },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  tabLabel: { fontSize: 10, color: colors.muted },
});
