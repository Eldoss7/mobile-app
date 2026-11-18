import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '../components/TabBar';
import { filterStore, recent } from '../data/filters';
import { colors } from '../theme';
import type { ScreenProps } from '../types';

export default function Search({ go, back, reset }: ScreenProps) {
  const { top } = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(recent);

  const submit = (q: string) => {
    if (!q.trim()) return;
    filterStore.query = q.trim();
    go('results');
  };

  return (
    <View style={[s.root, { paddingTop: top + 12 }]}>
      <View style={s.row}>
        <Pressable onPress={back} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>
        <View style={s.field}>
          <Ionicons name="search" size={16} color={colors.text} />
          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => submit(query)}
            returnKeyType="search"
            placeholder="Поиск"
            placeholderTextColor={colors.placeholder}
            style={s.input}
          />
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.list}>
        <Text style={s.caption}>НЕДАВНИЕ ЗАПРОСЫ</Text>
        {items.map((r) => (
          <Pressable key={r} style={s.item} onPress={() => submit(r)}>
            <Text style={s.itemText}>{r}</Text>
            <Pressable hitSlop={10} onPress={() => setItems((p) => p.filter((x) => x !== r))}>
              <Ionicons name="close-circle" size={16} color="#9AA1AF" />
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
      <TabBar active="search" reset={reset} />
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
  input: { flex: 1, fontSize: 14, color: colors.text, padding: 0 },
  list: { paddingHorizontal: 20, paddingTop: 24, flexGrow: 1 },
  caption: { fontSize: 10, color: colors.muted, letterSpacing: 0.6, marginBottom: 6 },
  item: { height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemText: { fontSize: 14, color: colors.text },
});
