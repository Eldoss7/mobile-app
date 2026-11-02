import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { colors, type } from '../theme';

export default function Welcome({ go }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={s.root}>
      <Hero style={s.hero} />
      <View style={[s.body, { paddingBottom: bottom + 20 }]}>
        <View style={s.dots}>
          <View style={[s.dot, s.dotOn]} />
          <View style={s.dot} />
          <View style={s.dot} />
        </View>
        <Text style={type.title}>Создайте прототип всего за несколько минут</Text>
        <Text style={[type.sub, s.text]}>
          Пользуйтесь готовыми компонентами и думайте только о том, как сделать лучший продукт.
        </Text>
        <Button title="Далее" onPress={() => go('interests')} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  hero: { flex: 1 },
  body: { paddingHorizontal: 20, paddingTop: 22 },
  dots: { flexDirection: 'row', gap: 5, marginBottom: 16 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DDE3EE' },
  dotOn: { backgroundColor: colors.primary },
  text: { marginTop: 8, marginBottom: 28 },
});
