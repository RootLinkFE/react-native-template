import { Button } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppBar from 'src/components/AppBar';
import NavigationService from 'src/navigation/NavigationService';
import styles from './styles';

const Home: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Button
        leftIcon={<Icon name="keyboard-backspace" color="white" />}
        onPress={goBack}>
        返回上一页
      </Button>
    </View>
  );
};

export default Home;
