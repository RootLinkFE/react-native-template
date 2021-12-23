/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { QueryClientProvider } from 'react-query';
import theme, { NavigationDefaultTheme } from 'app/config/theme-config';
import Navigator from 'app/navigation';
import { useStore } from './store';
import { RNQueryClient } from './services/react-query/query-client';

const EntryPoint: React.FC = () => {
  const isDark = useStore(state => state.isDarkMode);
  console.log('theme====================================');
  console.log(isDark);
  console.log('====================================');
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={RNQueryClient}>
        <Navigator
          theme={{
            dark: isDark,
            colors: {
              ...NavigationDefaultTheme.colors,
            },
          }}
        />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default EntryPoint;
