import { ComponentType, useEffect, useState } from 'react';
import { BackHandler, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from './src/screens/Welcome';
import Interests from './src/screens/Interests';
import Plans from './src/screens/Plans';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Code from './src/screens/Code';
import Chats from './src/screens/Chats';
import Chat from './src/screens/Chat';
import Settings from './src/screens/Settings';
import NewAccount from './src/screens/NewAccount';
import SetPassword from './src/screens/SetPassword';
import Home from './src/screens/Home';
import Gallery from './src/screens/Gallery';
import type { Params, Route, ScreenProps } from './src/types';

const screens: Record<Route, ComponentType<ScreenProps>> = {
  welcome: Welcome,
  interests: Interests,
  plans: Plans,
  login: Login,
  signup: SignUp,
  code: Code,
  chats: Chats,
  chat: Chat,
  settings: Settings,
  account: NewAccount,
  password: SetPassword,
  home: Home,
  gallery: Gallery,
};

type Entry = { route: Route; params?: Params };

export default function App() {
  const [stack, setStack] = useState<Entry[]>([{ route: 'welcome' }]);

  const go = (route: Route, params?: Params) => setStack((s) => [...s, { route, params }]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const reset = (route: Route) => setStack([{ route }]);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) {
        back();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [stack]);

  const { route, params } = stack[stack.length - 1];
  const Current = screens[route];

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Current go={go} back={back} reset={reset} params={params} />
      </View>
    </SafeAreaProvider>
  );
}
