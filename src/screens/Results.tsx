import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { activeCount, filterStore, products } from '../data/filters';
import { colors } from '../theme';
import type { ScreenProps } from '../types';

export default function Results({ go, back }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const count = activeCount(filterStore.value);

  return (
    <View style={[s.root, { paddingTop: top + 12 }]}>
      <View style={s.row}>
        <Pressable onPress={back} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>
        <View style={s.field}>
          <Ionicons name="search" size={16} color={colors.text} />
          <Text style={s.query}>{filterStore.query}</Text>
        </View>
      </View>

      <View style={s.tools}>
        <View style={s.tool}>
          <Ionicons name="swap-vertical" size={14} color={colors.text} />
          <Text style={s.toolText}>Сортировка</Text>
          <Ionicons name="chevron-down" size={12} color={colors.muted} />
        </View>
        <Pressable style={s.tool} onPress={() => go('filter')}>
          <Ionicons name="options-outline" size={14} color={colors.text} />
          <Text style={s.toolText}>Фильтр</Text>
          {count > 0 && (
            <View style={s.badge}>
              <Text style={s.badgeText}>{count}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[s.grid, { paddingBottom: bottom + 20 }]} showsVerticalScrollIndicator={false}>
        {products.map((p) => (
          <View key={p.name} style={s.card}>
            <View style={s.img}>
              <Ionicons name="image-outline" size={26} color={colors.tintDeep} />
            </View>
            <Text style={s.name} numberOfLines={1}>{p.name}</Text>
            <Text style={s.price}>€ {p.price}.00</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 6 },
  field: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  query: { fontSize: 14, color: colors.text },
  tools: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 14 },
  tool: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  toolText: { fontSize: 12, color: colors.text },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20, paddingTop: 16 },
  card: { width: '47.8%', backgroundColor: colors.card, borderRadius: 10, overflow: 'hidden', paddingBottom: 10 },
  img: { height: 100, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 11, color: colors.text, marginTop: 10, paddingHorizontal: 10 },
  price: { fontSize: 12, fontWeight: '700', color: colors.text, marginTop: 4, paddingHorizontal: 10 },
});
