import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import TabBar from '../components/TabBar';
import { colors } from '../theme';
import type { ScreenProps } from '../types';

const rows = [
  'Сохранённые сообщения',
  'Недавние звонки',
  'Устройства',
  'Уведомления',
  'Оформление',
  'Язык',
  'Конфиденциальность и безопасность',
  'Хранилище',
];

export default function Settings({ reset }: ScreenProps) {
  const { top } = useSafeAreaInsets();
  const [confirm, setConfirm] = useState(false);

  return (
    <View style={s.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: top + 14, paddingBottom: 16 }}
      >
        <Text style={s.head}>Настройки</Text>

        <View style={s.profile}>
          <View>
            <Avatar size={82} />
            <View style={s.edit}>
              <Ionicons name="pencil" size={10} color="#fff" />
            </View>
          </View>
          <Text style={s.name}>Лукас Скотт</Text>
          <Text style={s.handle}>@lucasscott3</Text>
        </View>

        <View style={s.list}>
          {rows.map((r) => (
            <View key={r} style={s.row}>
              <Text style={s.rowText}>{r}</Text>
              <Ionicons name="chevron-forward" size={16} color="#B5BBC7" />
            </View>
          ))}
          <Pressable style={s.row} onPress={() => setConfirm(true)}>
            <Text style={[s.rowText, { color: colors.danger }]}>Выйти</Text>
          </Pressable>
        </View>
      </ScrollView>

      <TabBar active="settings" reset={reset} />

      <Modal visible={confirm} transparent animationType="fade" onRequestClose={() => setConfirm(false)}>
        <View style={s.overlay}>
          <View style={s.dialog}>
            <Text style={s.dialogTitle}>Выход</Text>
            <Text style={s.dialogText}>
              Вы уверены, что хотите выйти? Чтобы снова пользоваться приложением, нужно будет войти в аккаунт.
            </Text>
            <View style={s.actions}>
              <Button title="Отмена" variant="outline" onPress={() => setConfirm(false)} style={s.action} />
              <Button
                title="Выйти"
                onPress={() => {
                  setConfirm(false);
                  reset('login');
                }}
                style={s.action}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  head: { textAlign: 'center', fontSize: 15, fontWeight: '700', color: colors.text },
  profile: { alignItems: 'center', marginTop: 24, marginBottom: 24 },
  edit: {
    position: 'absolute',
    right: -4,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 12 },
  handle: { fontSize: 12, color: colors.muted, marginTop: 2 },
  list: { paddingHorizontal: 20 },
  row: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  rowText: { fontSize: 14, color: colors.text, flex: 1, paddingRight: 12 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  dialog: { width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  dialogTitle: { textAlign: 'center', fontSize: 15, fontWeight: '700', color: colors.text },
  dialogText: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
    marginTop: 8,
    marginBottom: 20,
  },
  actions: { flexDirection: 'row', gap: 10 },
  action: { flex: 1, height: 42 },
});
