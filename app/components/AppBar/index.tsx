import { Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base';
import React from 'react';

function AppBar({ onLogOut = () => {} }) {
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#6200ee" />

      <HStack
        bg="#6200ee"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center">
        <HStack space="4" alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            Rick and Morty
          </Text>
        </HStack>
        <HStack space="2">
          <IconButton
            onPress={onLogOut}
            icon={<Icon color="white" size="sm" name="home" />}
          />
        </HStack>
      </HStack>
    </>
  );
}

export default AppBar;
