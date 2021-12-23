import NavigationService from 'app/navigation/NavigationService';
import { useStore } from 'app/store';
import { Button, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const Login: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);

  const onLogin = () => {
    setIsLoggedIn(true);
  };
  const onForgot = () => NavigationService.navigate('ForgotPassword');
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.login}>Login Status </Text>
        <Button
          leftIcon={<Icon name="login" color="white" />}
          onPress={onLogin}>
          Login
        </Button>
        <Button style={styles.forgot} onPress={onForgot}>
          Forgot Password
        </Button>
      </View>
    </View>
  );
};

export default Login;
