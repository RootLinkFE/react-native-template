/**
 * React Native App
 * Everything starts from the Entry-point
 */
import { NativeBaseProvider } from 'native-base';
import React, { useMemo } from 'react';
import { QueryClientProvider } from 'react-query';
import theme, {
  NavigationDarkTheme,
  NavigationDefaultTheme,
} from 'src/config/theme-config';
import Navigator from 'src/navigation';
import colorModeManager from './config/colorModeManager';
import { RNQueryClient } from './services/query-client';
import { useStore } from './store';

const EntryPoint: React.FC = () => {
  const isDarkMode = useStore(state => state.isDarkMode);

  const navThemeColors = useMemo(() => {
    const themeColor = isDarkMode
      ? NavigationDarkTheme.colors
      : NavigationDefaultTheme.colors;
    return themeColor;
  }, [isDarkMode]);

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <QueryClientProvider client={RNQueryClient}>
        <Navigator
          theme={{
            dark: isDarkMode,
            colors: {
              ...navThemeColors,
            },
          }}
        />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default EntryPoint;
