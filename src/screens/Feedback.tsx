import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { colors } from '../theme';
import type { ScreenProps } from '../types';

const likes = ['ПРОСТО ИСПОЛЬЗОВАТЬ', 'ПОЛНЫЙ', 'ПОЛЕЗНЫЙ', 'УДОБНЫЙ', 'ХОРОШО ВЫГЛЯДИТ'];
const dislikes = ['МАЛО КОМПОНЕНТОВ', 'СЛОЖНЫЙ', 'НЕ ИНТЕРАКТИВНЫЙ', 'ТОЛЬКО АНГЛИЙСКИЙ'];

function Chips({ items, picked, onToggle }: { items: string[]; picked: string[]; onToggle: (v: string) => void }) {
  return (
    <View style={s.chips}>
      {items.map((c) => {
        const on = picked.includes(c);
        return (
          <Pressable key={c} onPress={() => onToggle(c)} style={[s.chip, on && s.chipOn]}>
            <Text style={[s.chipText, on && s.chipTextOn]}>{c}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function Feedback({ back }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const [rating, setRating] = useState(4);
  const [liked, setLiked] = useState<string[]>(['ПОЛЕЗНЫЙ', 'УДОБНЫЙ']);
  const [disliked, setDisliked] = useState<string[]>(['ТОЛЬКО АНГЛИЙСКИЙ']);
  const [text, setText] = useState('');

  const toggle = (set: typeof setLiked) => (v: string) =>
    set((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  return (
    <View style={[s.root, { paddingTop: top + 14 }]}>
      <Pressable onPress={back} hitSlop={12} style={s.back}>
        <Ionicons name="chevron-back" size={24} color={colors.primary} />
      </Pressable>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={s.title}>Ваш проект завершён.</Text>
        <Text style={s.sub}>Как бы вы оценили набор для прототипирования?</Text>

        <View style={s.stars}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable key={n} onPress={() => setRating(n)} hitSlop={6}>
              <Ionicons name={n <= rating ? 'star' : 'star-outline'} size={22} color={colors.primary} />
            </Pressable>
          ))}
        </View>

        <Text style={s.q}>Что вам понравилось?</Text>
        <Chips items={likes} picked={liked} onToggle={toggle(setLiked)} />

        <Text style={s.q}>Что можно улучшить?</Text>
        <Chips items={dislikes} picked={disliked} onToggle={toggle(setDisliked)} />

        <Text style={s.q}>Что-нибудь ещё?</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Расскажите всё."
          placeholderTextColor={colors.placeholder}
          multiline
          textAlignVertical="top"
          style={s.area}
        />
      </ScrollView>

      <View style={[s.footer, { paddingBottom: bottom + 16 }]}>
        <Button title="Отправить" onPress={back} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  back: { paddingHorizontal: 16, alignSelf: 'flex-start' },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  sub: { fontSize: 13, color: colors.muted, marginTop: 6 },
  stars: { flexDirection: 'row', gap: 4, marginTop: 14 },
  q: { fontSize: 12, fontWeight: '700', color: colors.text, marginTop: 26, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, height: 28, borderRadius: 14, backgroundColor: colors.tint, justifyContent: 'center' },
  chipOn: { backgroundColor: colors.primary },
  chipText: { fontSize: 10, fontWeight: '600', color: colors.primary, letterSpacing: 0.3 },
  chipTextOn: { color: '#fff' },
  area: {
    height: 90,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 12,
    fontSize: 13,
    color: colors.text,
  },
  footer: { paddingHorizontal: 20, paddingTop: 8 },
});
