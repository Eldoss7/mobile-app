import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type Route =
  | 'welcome'
  | 'interests'
  | 'plans'
  | 'login'
  | 'signup'
  | 'code'
  | 'chats'
  | 'chat'
  | 'settings'
  | 'account'
  | 'password'
  | 'home'
  | 'gallery';

export type Params = { chatId?: string };

export type ScreenProps = {
  go: (route: Route, params?: Params) => void;
  back: () => void;
  reset: (route: Route) => void;
  params?: Params;
};
