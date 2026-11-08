import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { IconName, Route } from '../types';

type Tab = 'chats' | 'friends' | 'settings';

const tabs: { key: Tab; label: string; icon: IconName }[] = [
  { key: 'chats', label: 'Чаты', icon: 'chatbubble' },
  { key: 'friends', label: 'Друзья', icon: 'person' },
  { key: 'settings', label: 'Настройки', icon: 'settings-sharp' },
];

type Props = {
  active: Tab;
  reset: (route: Route) => void;
};

export default function TabBar({ active, reset }: Props) {
  const { bottom } = useSafeAreaInsets();

  const open = (tab: Tab) => {
    if (tab === 'chats') reset('chats');
    if (tab === 'settings') reset('settings');
  };

  return (
    <View style={[s.bar, { paddingBottom: bottom + 6 }]}>
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Pressable key={t.key} style={s.tab} onPress={() => open(t.key)}>
            <Ionicons name={t.icon} size={20} color={on ? colors.primary : '#C3C8D3'} />
            <Text style={[s.label, on && s.labelOn]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 10, color: colors.muted },
  labelOn: { color: colors.text, fontWeight: '600' },
});
