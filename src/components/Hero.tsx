import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function Hero({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[s.hero, style]}>
      <Ionicons name="image-outline" size={34} color={colors.tintDeep} />
    </View>
  );
}

const s = StyleSheet.create({
  hero: {
    backgroundColor: colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
