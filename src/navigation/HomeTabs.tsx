import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'src/config/theme';
import Home from 'src/screens/Home';
import Mine from 'src/screens/Mine';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Icon
            name={`${route.name}${focused ? '-outline' : ''}`}
            size={size}
            color={color}
          />
        ),
        tabBarActiveTintColor: theme.colors.primary['500'],
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="account" component={Mine} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
