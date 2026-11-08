import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Avatar({ size = 44 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        backgroundColor: '#E6EDFC',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name="person" size={size * 0.58} color="#A9C3F7" />
    </View>
  );
}
