import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { FilterKey, Filters, filterSections, filterStore } from '../data/filters';
import { colors } from '../theme';
import type { ScreenProps } from '../types';

export default function Filter({ back }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const [filters, setFilters] = useState<Filters>(filterStore.value);
  const [open, setOpen] = useState<FilterKey | null>('color');

  const toggle = (key: FilterKey, v: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(v) ? f[key].filter((x) => x !== v) : [...f[key], v] }));

  const clear = () => setFilters({ category: [], price: [], color: [], size: [], review: [] });

  const apply = () => {
    filterStore.value = filters;
    back();
  };

  return (
    <View style={[s.root, { paddingTop: top + 12 }]}>
      <View style={s.head}>
        <Pressable onPress={back} hitSlop={10} style={s.side}>
          <Text style={s.link}>Отмена</Text>
        </Pressable>
        <Text style={s.title}>Фильтр</Text>
        <Pressable onPress={clear} hitSlop={10} style={[s.side, { alignItems: 'flex-end' }]}>
          <Text style={s.link}>Сбросить</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={s.list} showsVerticalScrollIndicator={false}>
        {filterSections.map((sec) => {
          const n = filters[sec.key].length;
          const isOpen = open === sec.key;
          return (
            <View key={sec.key} style={s.section}>
              <Pressable style={s.row} onPress={() => setOpen(isOpen ? null : sec.key)}>
                <Text style={s.rowText}>{sec.title}</Text>
                {n > 0 ? (
                  <View style={s.badge}>
                    <Text style={s.badgeText}>{n}</Text>
                  </View>
                ) : (
                  <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color={colors.muted} />
                )}
              </Pressable>
              {isOpen && (
                <View style={s.chips}>
                  {sec.options.map((o) => {
                    const on = filters[sec.key].includes(o);
                    return (
                      <Pressable key={o} onPress={() => toggle(sec.key, o)} style={[s.chip, on && s.chipOn]}>
                        <Text style={[s.chipText, on && { color: '#fff' }]}>{o}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={[s.footer, { paddingBottom: bottom + 16 }]}>
        <Button title="Применить фильтры" onPress={apply} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  head: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 36 },
  side: { width: 80 },
  title: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '700', color: colors.text },
  link: { fontSize: 12, fontWeight: '600', color: colors.primary },
  list: { paddingHorizontal: 20, paddingTop: 16 },
  section: { borderBottomWidth: 1, borderBottomColor: colors.line },
  row: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowText: { fontSize: 13, color: colors.text },
  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingBottom: 14 },
  chip: { paddingHorizontal: 11, height: 24, borderRadius: 12, backgroundColor: colors.tint, justifyContent: 'center' },
  chipOn: { backgroundColor: colors.primary },
  chipText: { fontSize: 9, fontWeight: '700', color: colors.primary, letterSpacing: 0.3 },
  footer: { paddingHorizontal: 20, paddingTop: 8 },
});
