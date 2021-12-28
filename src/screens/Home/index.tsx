import React from 'react';
import { View } from 'react-native';
import RecommendPlaylist from './PlayList/RecommendPlaylist';

const Home: any = ({}) => {
  return (
    <View>
      <RecommendPlaylist />
    </View>
  );
};

Home.options = {
  topBar: {
    visible: false,
  },
};

export default Home;
