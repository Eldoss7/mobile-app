import type { TextStyle } from 'react-native';

export const colors = {
  primary: '#2D6AEF',
  tint: '#EAF0FD',
  tintDeep: '#A9BFF2',
  line: '#E4E8F0',
  text: '#12151C',
  muted: '#8B93A3',
  placeholder: '#A5ACBA',
  card: '#F4F6FA',
  danger: '#E5484D',
};

export const typo: Record<'title' | 'sub', TextStyle> = {
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: colors.text,
  },
  sub: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
  },
};
