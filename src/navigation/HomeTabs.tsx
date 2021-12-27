import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/config/theme-config';
import Home from 'src/screens/Home';
import Mine from 'src/screens/Mine';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === '首页') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === '我的') {
            iconName = focused ? 'account' : 'account-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary['500'],
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="首页" component={Home} />
      <Tab.Screen name="我的" component={Mine} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
