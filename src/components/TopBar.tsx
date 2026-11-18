import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { soft } from './SoftField';

type Props = { title: string; onBack: () => void };

export default function TopBar({ title, onBack }: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[s.bar, { paddingTop: top + 10 }]}>
      <Pressable onPress={onBack} hitSlop={12} style={s.side}>
        <Ionicons name="chevron-back" size={24} color={soft.blue} />
      </Pressable>
      <Text style={s.title}>{title}</Text>
      <View style={s.side} />
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: soft.page,
  },
  side: { width: 32 },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: soft.blue,
  },
});
