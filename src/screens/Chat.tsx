import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { brookeThread, chats, Message } from '../data/chats';
import { colors } from '../theme';
import type { ScreenProps } from '../types';

export default function Chat({ back, params }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const chat = chats.find((c) => c.id === params?.chatId) ?? chats[2];

  const [messages, setMessages] = useState<Message[]>(() =>
    chat.id === 'brooke'
      ? brookeThread
      : [{ id: 1, mine: false, label: chat.name.split(' ')[0], text: chat.text }]
  );
  const [draft, setDraft] = useState('');
  const list = useRef<ScrollView>(null);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      return [
        ...prev,
        { id: prev.length + 1, mine: true, text, label: last?.mine ? undefined : 'Лукас' },
      ];
    });
    setDraft('');
  };

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[s.head, { paddingTop: top + 10 }]}>
        <Pressable onPress={back} hitSlop={12} style={s.side}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>
        <Text style={s.title}>{chat.name}</Text>
        <View style={[s.side, { alignItems: 'flex-end' }]}>
          <Avatar size={34} />
        </View>
      </View>

      <ScrollView
        ref={list}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={s.messages}
        onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((m) => (
          <View key={m.id} style={[s.bubble, m.mine ? s.mine : s.theirs]}>
            {m.label ? <Text style={[s.label, m.mine && s.onBlue]}>{m.label}</Text> : null}
            <Text style={[s.text, m.mine && s.onBlue]}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={[s.inputRow, { paddingBottom: bottom + 8 }]}>
        <Ionicons name="add" size={24} color={colors.primary} />
        <View style={s.field}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Напишите сообщение…"
            placeholderTextColor="#8C93A3"
            style={s.input}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          {draft.trim() ? (
            <Pressable onPress={send} style={s.send} hitSlop={8}>
              <Ionicons name="send" size={13} color="#fff" />
            </Pressable>
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  side: { width: 44 },
  title: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '700', color: colors.text },
  messages: { paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  bubble: { maxWidth: '78%', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  theirs: { alignSelf: 'flex-start', backgroundColor: '#F3F5F9' },
  mine: { alignSelf: 'flex-end', backgroundColor: colors.primary },
  label: { fontSize: 10, fontWeight: '700', color: colors.text, marginBottom: 2 },
  text: { fontSize: 13, lineHeight: 18, color: colors.text },
  onBlue: { color: '#fff' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  field: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 6,
    borderRadius: 20,
    backgroundColor: '#F3F5F9',
  },
  input: { flex: 1, fontSize: 13, color: colors.text, padding: 0 },
  send: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
