import { useEffect, useState } from 'react';
import { BackHandler, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from './src/screens/Welcome';
import Interests from './src/screens/Interests';
import Plans from './src/screens/Plans';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Code from './src/screens/Code';
import Settings from './src/screens/Settings';

const screens = {
  welcome: Welcome,
  interests: Interests,
  plans: Plans,
  login: Login,
  signup: SignUp,
  code: Code,
  settings: Settings,
};

export default function App() {
  const [stack, setStack] = useState(['welcome']);

  const go = (name) => setStack((s) => [...s, name]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const reset = (name) => setStack([name]);

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

  const Current = screens[stack[stack.length - 1]];

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Current go={go} back={back} reset={reset} />
      </View>
    </SafeAreaProvider>
  );
}
