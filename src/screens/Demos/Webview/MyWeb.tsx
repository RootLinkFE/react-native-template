import { Box, View } from 'native-base';
import React from 'react';
import { WebView } from 'react-native-webview';
import AppBar from 'src/components/AppBar';

function MyWeb() {
  return (
    <View>
      <AppBar title={'WebView Demo'} />
      <Box h={'100%'}>
        <WebView source={{ uri: 'https://baidu.com' }} />
      </Box>
    </View>
  );
}

export default MyWeb;
