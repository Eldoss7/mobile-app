import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import TabBar from '../components/TabBar';
import { chats } from '../data/chats';
import { colors } from '../theme';
import type { ScreenProps } from '../types';

export default function Chats({ go, reset }: ScreenProps) {
  const { top } = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const shown = chats.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <View style={s.root}>
      <View style={[s.head, { paddingTop: top + 12 }]}>
        <Text style={s.edit}>Изм.</Text>
        <Text style={s.title}>Чаты</Text>
        <View style={s.compose}>
          <Ionicons name="create-outline" size={20} color={colors.primary} />
        </View>
      </View>

      <View style={s.search}>
        <Ionicons name="search" size={15} color="#7C8496" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Поиск"
          placeholderTextColor="#8C93A3"
          style={s.input}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.list}>
        {shown.map((c) => (
          <Pressable key={c.id} style={s.row} onPress={() => go('chat', { chatId: c.id })}>
            <Avatar size={44} />
            <View style={s.body}>
              <Text style={s.name}>{c.name}</Text>
              <Text style={s.text} numberOfLines={2}>
                {c.text}
              </Text>
            </View>
            {c.unread ? (
              <View style={s.badge}>
                <Text style={s.badgeText}>{c.unread}</Text>
              </View>
            ) : null}
          </Pressable>
        ))}
      </ScrollView>

      <TabBar active="chats" reset={reset} />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  edit: { width: 48, fontSize: 14, fontWeight: '600', color: colors.primary },
  title: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '700', color: colors.text },
  compose: { width: 48, alignItems: 'flex-end' },
  search: {
    height: 38,
    marginHorizontal: 20,
    marginBottom: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 19,
    backgroundColor: '#F2F4F8',
  },
  input: { flex: 1, fontSize: 13, color: colors.text, padding: 0 },
  list: { paddingHorizontal: 20, paddingBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  body: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: colors.text },
  text: { fontSize: 12, lineHeight: 16, color: colors.muted, marginTop: 2 },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 6,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#fff' },
});
