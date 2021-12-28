import { Box, Button, Container, Text } from 'native-base';
import React, { useRef } from 'react';
import {
  Image,
  NativeEventSubscription,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import images from 'src/config/images';
import { useStore } from 'src/store';
import RecommendPlaylist from './PlayList/RecommendPlaylist';

interface Props {}
const Home: any = ({}) => {
  const isLoggedIn = useStore(state => state.isLoggedIn);
  const backHanlder = useRef<NativeEventSubscription>();
  const backTimer = useRef<number>(0);

  const profile = { avatarUrl: '' };

  const [refreshing, setRefreshing] = React.useState(false);

  const goLoginPage = () => {};
  const goCategory = () => {};
  const showMusicPage = () => {};

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // await loadFm();
    // await loadMyPlaylist();
    // await loadRecommendPlaylist();
    setRefreshing(false);
  }, [setRefreshing]);

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="#e70625"
            colors={['#e70625']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <RecommendPlaylist />
      </ScrollView>
    </View>
  );
};

Home.options = {
  topBar: {
    visible: false,
  },
};

export default Home;
