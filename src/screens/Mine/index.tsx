import { Box, Divider, VStack, Button } from 'native-base';
import React from 'react';
import { useStore } from 'src/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationService from 'src/navigation/NavigationService';

const Mine: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);

  const onLogOut = () => {
    setIsLoggedIn(false);
  };
  return (
    <Box borderX="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          我的
        </Box>
        <Box px="4">
          <Button
            onPress={() => {
              NavigationService.navigate('Characters');
            }}>
            用户详情
          </Button>
          <Button
            mt="4"
            onPress={() => {
              NavigationService.navigate('MyWeb');
            }}>
            WebView 测试
          </Button>
          <Button
            mt="4"
            leftIcon={<Icon name="logout" color="white" />}
            onPress={onLogOut}>
            退出登陆
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Mine;
