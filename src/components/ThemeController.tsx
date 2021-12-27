import { Switch, useColorMode } from 'native-base';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStore } from '../store';

const ThemeController: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toggleTheme = useStore(state => state.toggleTheme);

  const iconName = useMemo(() => {
    return colorMode === 'dark' ? 'weather-night' : 'white-balance-sunny';
  }, [colorMode]);

  const iconColor = useMemo(() => {
    return colorMode === 'dark' ? 'white' : 'orange';
  }, [colorMode]);

  return (
    <View style={styles.container}>
      <Switch
        isChecked={colorMode === 'dark'}
        onToggle={() => {
          const currentModeFlag = colorMode === 'dark';
          toggleTheme(!currentModeFlag);
          toggleColorMode();
        }}
      />
      <Icon name={iconName} size={20} style={styles.icon} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 12,
  },
  icon: { marginLeft: 4 },
});

export default ThemeController;
