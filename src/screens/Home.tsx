import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { soft } from '../components/SoftField';
import type { IconName, Route, ScreenProps } from '../types';

const days = [
  { n: 9, d: 'ПН' },
  { n: 10, d: 'ВТ' },
  { n: 11, d: 'СР', busy: true },
  { n: 12, d: 'ЧТ' },
  { n: 13, d: 'ПТ', busy: true },
  { n: 14, d: 'СБ', busy: true },
];

const doctors = [
  { name: 'Др. Оливия Тёрнер', spec: 'Дерматоэндокринология', rating: '5', count: '60', fav: true, ini: 'ОТ' },
  { name: 'Др. Александр Беннетт', spec: 'Дерматогенетика', rating: '4,5', count: '40', fav: false, ini: 'АБ' },
  { name: 'Др. София Мартинес', spec: 'Косметическая биоинженерия', rating: '5', count: '150', fav: false, ini: 'СМ' },
  { name: 'Др. Михаил Дэвидсон', spec: 'Нанодерматология', rating: '4,8', count: '90', fav: true, ini: 'МД' },
];

const nav: { icon: IconName; target: Route | null }[] = [
  { icon: 'home', target: null },
  { icon: 'chatbubble-outline', target: null },
  { icon: 'person-outline', target: 'settings' },
  { icon: 'calendar-outline', target: null },
];

export default function Home({ go }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const [favs, setFavs] = useState(doctors.map((d) => d.fav));

  const toggleFav = (i: number) => setFavs((f) => f.map((v, k) => (k === i ? !v : v)));

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottom + 96 }}>
        <View style={[s.header, { paddingTop: top + 12 }]}>
          <View style={s.topRow}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>ДД</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.hi}>Добро пожаловать,</Text>
              <Text style={s.user}>Джон Доу</Text>
            </View>
            <View style={s.round}>
              <Ionicons name="notifications-outline" size={17} color={soft.blue} />
            </View>
            <View style={[s.round, { marginLeft: 10 }]}>
              <Ionicons name="settings-outline" size={17} color={soft.blue} />
            </View>
          </View>

          <View style={s.quick}>
            <View style={s.quickItem}>
              <Ionicons name="medkit-outline" size={20} color={soft.blue} />
              <Text style={s.quickText}>Врачи</Text>
            </View>
            <View style={s.quickItem}>
              <Ionicons name="heart-outline" size={20} color={soft.blue} />
              <Text style={s.quickText}>Избранное</Text>
            </View>
            <View style={s.search}>
              <Ionicons name="options-outline" size={16} color={soft.blue} />
              <TextInput placeholder="Поиск" placeholderTextColor={soft.hint} style={s.searchInput} />
              <Ionicons name="search" size={16} color={soft.blue} />
            </View>
          </View>
        </View>

        <View style={s.band}>
          <View style={s.days}>
            {days.map((d) => (
              <View key={d.n} style={[s.day, d.busy && s.dayBusy]}>
                <Text style={[s.dayNum, d.busy && s.onBlue]}>{d.n}</Text>
                <Text style={[s.dayName, d.busy && s.onBlue]}>{d.d}</Text>
              </View>
            ))}
          </View>

          <View style={s.schedule}>
            <Text style={s.today}>11, среда — сегодня</Text>

            <View style={s.line}>
              <Text style={s.time}>09:00</Text>
              <View style={s.rule} />
            </View>

            <View style={s.line}>
              <Text style={s.time}>10:00</Text>
              <View style={s.visit}>
                <View style={s.visitHead}>
                  <Text style={s.visitName}>Др. Оливия Тёрнер</Text>
                  <Ionicons name="checkmark-circle-outline" size={12} color={soft.blue} />
                </View>
                <Text style={s.visitText}>
                  Лечение и профилактика кожных заболеваний и фотодерматитов
                </Text>
              </View>
            </View>

            <View style={s.line}>
              <Text style={s.time}>11:00</Text>
              <View style={s.rule} />
            </View>
            <View style={s.line}>
              <Text style={s.time}>12:00</Text>
              <View style={s.rule} />
            </View>
          </View>
        </View>

        <View style={s.list}>
          {doctors.map((doc, i) => (
            <View key={doc.name} style={s.card}>
              <View style={s.photo}>
                <Text style={s.photoText}>{doc.ini}</Text>
              </View>
              <View style={s.info}>
                <Text style={s.docName}>{doc.name}</Text>
                <Text style={s.docSpec}>{doc.spec}</Text>
                <View style={s.meta}>
                  <View style={s.chip}>
                    <Ionicons name="star" size={9} color={soft.blue} />
                    <Text style={s.chipText}>{doc.rating}</Text>
                  </View>
                  <View style={s.chip}>
                    <Ionicons name="search" size={9} color={soft.blue} />
                    <Text style={s.chipText}>{doc.count}</Text>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View style={s.chip}>
                    <Text style={s.chipText}>?</Text>
                  </View>
                  <Pressable onPress={() => toggleFav(i)} hitSlop={8} style={s.chip}>
                    <Ionicons
                      name={favs[i] ? 'heart' : 'heart-outline'}
                      size={10}
                      color={soft.blue}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[s.nav, { bottom: bottom + 10 }]}>
        {nav.map((n, i) => (
          <Pressable
            key={n.icon}
            onPress={() => n.target && go(n.target)}
            style={[s.navItem, i === 0 && s.navActive]}
          >
            <Ionicons name={n.icon} size={21} color="#fff" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: soft.page, paddingHorizontal: 18, paddingBottom: 16 },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: soft.band,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { fontSize: 13, fontWeight: '700', color: soft.blue },
  hi: { fontSize: 10, color: soft.blue },
  user: { fontSize: 14, fontWeight: '700', color: soft.text },
  round: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: soft.band,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quick: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 14 },
  quickItem: { alignItems: 'center', gap: 2 },
  quickText: { fontSize: 9, color: soft.text },
  search: {
    flex: 1,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: soft.band,
  },
  searchInput: { flex: 1, fontSize: 12, color: soft.text, padding: 0 },
  band: { backgroundColor: soft.band, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 18 },
  days: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  day: {
    width: 46,
    height: 58,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBusy: { backgroundColor: soft.blue },
  dayNum: { fontSize: 17, fontWeight: '700', color: soft.text },
  dayName: { fontSize: 9, color: soft.text, marginTop: 1 },
  onBlue: { color: '#fff' },
  schedule: { backgroundColor: '#fff', borderRadius: 14, padding: 14 },
  today: { textAlign: 'right', fontSize: 10, color: soft.blue, marginBottom: 6 },
  line: { flexDirection: 'row', alignItems: 'center', minHeight: 30 },
  time: { width: 44, fontSize: 9, color: '#8A93A8' },
  rule: { flex: 1, height: 1, backgroundColor: soft.band },
  visit: { flex: 1, backgroundColor: soft.band, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10 },
  visitHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  visitName: { fontSize: 11, fontWeight: '700', color: soft.blue },
  visitText: { fontSize: 9, lineHeight: 12, color: soft.text, marginTop: 2 },
  list: { paddingHorizontal: 16, paddingTop: 16, gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: soft.band,
    borderRadius: 18,
    padding: 8,
    gap: 8,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: { fontSize: 14, fontWeight: '700', color: soft.blue },
  info: { flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10 },
  docName: { fontSize: 12, fontWeight: '700', color: soft.blue },
  docSpec: { fontSize: 10, color: soft.text, marginTop: 1 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  chip: {
    minWidth: 22,
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 6,
    borderRadius: 9,
    backgroundColor: soft.field,
  },
  chipText: { fontSize: 9, color: soft.text },
  nav: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 54,
    borderRadius: 27,
    backgroundColor: soft.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  navItem: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  navActive: { backgroundColor: 'rgba(255,255,255,0.22)' },
});
