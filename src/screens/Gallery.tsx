import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typo } from '../theme';
import type { Route, ScreenProps } from '../types';

const items: { route: Route; title: string }[] = [
  { route: 'welcome', title: 'Онбординг' },
  { route: 'interests', title: 'Выбор интересов' },
  { route: 'plans', title: 'Тарифы' },
  { route: 'login', title: 'Вход' },
  { route: 'signup', title: 'Регистрация' },
  { route: 'code', title: 'Код подтверждения' },
  { route: 'chats', title: 'Чаты' },
  { route: 'chat', title: 'Переписка' },
  { route: 'settings', title: 'Настройки' },
  { route: 'account', title: 'Новый аккаунт' },
  { route: 'password', title: 'Установка пароля' },
  { route: 'home', title: 'Главная' },
];

export default function Gallery({ go, back }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[s.root, { paddingTop: top + 14 }]}>
      <View style={s.head}>
        <Pressable onPress={back} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>
        <Text style={[typo.title, s.title]}>Все экраны</Text>
      </View>

      <ScrollView contentContainerStyle={[s.list, { paddingBottom: bottom + 20 }]}>
        {items.map((item, i) => (
          <Pressable key={item.route} style={s.row} onPress={() => go(item.route)}>
            <Text style={s.num}>{i + 1}</Text>
            <Text style={s.name}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={16} color="#B5BBC7" />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  head: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 8 },
  title: { fontSize: 20 },
  list: { paddingHorizontal: 20, paddingTop: 16 },
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  num: { width: 28, fontSize: 13, color: colors.muted },
  name: { flex: 1, fontSize: 14, color: colors.text },
});
