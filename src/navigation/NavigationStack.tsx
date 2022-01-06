import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StatusBar } from 'react-native';
import Characters from 'src/screens/Characters';
import ForgotPassword from 'src/screens/ForgotPassword';
import PlayListDetail from 'src/screens/Home/PlayList/PlayListDetail';
import Login from 'src/screens/Login';
import ThemeController from '../components/ThemeController';
import { useStore } from '../store';
import HomeTabs from './HomeTabs';
import { navigationRef } from './NavigationService';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

interface IProps {
  theme: Theme;
}

const AuthNavigator = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  return (
    <AuthStack.Navigator>
      <Stack.Screen
        name="登录"
        component={Login}
        options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="忘记密码"
        component={ForgotPassword}
        options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigatorList: React.ReactNode[] = [
  <Stack.Screen key="Characters" name="Characters" component={Characters} />,
  <Stack.Screen
    key="PlayListDetail"
    name="PlayListDetail"
    component={PlayListDetail}
  />,
];

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useStore(state => state.isLoggedIn);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      {isLoggedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeTabs} />
          {LoggedInNavigatorList.map(screenPage => screenPage)}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="登陆页"
            component={AuthNavigator}
            options={{
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              headerRight: () => <ThemeController />,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
