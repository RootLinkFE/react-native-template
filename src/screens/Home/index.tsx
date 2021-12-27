import { Box, Divider, VStack, Button } from 'native-base';
import React from 'react';
import NavigationService from 'src/navigation/NavigationService';

const Home: React.FC = () => {
  return (
    <Box borderX="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          NativeBase
        </Box>
        <Box px="4">
          NativeBase is a free and open source framework that enable developers
          to build high-quality mobile apps using React Native iOS and Android
          apps with a fusion of ES6.
        </Box>
        <Box px="4" pb="4">
          <Button
            onPress={() => {
              NavigationService.navigate('Characters');
            }}>
            用户详情
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
