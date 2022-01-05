import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box, Center, HStack, IconButton, StatusBar, Text } from 'native-base';
import React, { useCallback } from 'react';
import NavigationService from 'src/navigation/NavigationService';

function AppBar({ title = '' }) {
  const goBack = useCallback(() => {
    NavigationService.goBack();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#6200ee" />
      <HStack bg="#6200ee">
        <HStack space="2">
          <IconButton
            onPress={goBack}
            icon={<Icon color="white" size={18} name="arrow-left" />}
          />
        </HStack>
        {/* <HStack
        bg="#6200ee"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center">
        
      </HStack> */}
        <HStack space={3} alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
      </HStack>
    </>
  );
}

export default AppBar;
