import { Button } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationService from 'src/navigation/NavigationService';
import { useStore } from 'src/store';
import styles from './styles';

const Login: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const onForgot = () => NavigationService.navigate('忘记密码');

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Button
          leftIcon={<Icon name="login" color="white" />}
          onPress={onLogin}>
          登录
        </Button>
        <Button style={styles.forgot} onPress={onForgot}>
          忘记密码
        </Button>
      </View>
    </View>
  );
};

export default Login;
