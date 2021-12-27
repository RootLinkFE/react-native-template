import React from 'react';
import Home from 'src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mine from 'src/screens/Mine';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="首页" component={Home} />
      <Tab.Screen name="我的" component={Mine} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
